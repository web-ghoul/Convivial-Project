import json
import sys
import argparse
import requests
from bs4 import BeautifulSoup
import gzip
import shutil
import os
import re


def scrape_data(urlHotel):
    link = urlHotel
    response = requests.get(link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'lxml')
        notAvailable = soup.find_all('span', {'class': 'a53cbfa6de'})
        notFound = soup.find('div', {'class': 'header-404'})
        if notAvailable:
            notAvailable = soup.find_all('span', {'class': 'a53cbfa6de'}).pop()

        if "These properties match your search but are outside" in notAvailable.text or notFound:
            print("Not valid link")
            sys.exit()
        else:
            address = soup.find('span', {'class': 'hp_address_subtitle js-hp_address_subtitle jq_tooltip'})
            name = soup.find('h2', {'class': 'd2fee87262 pp-header__title'})
            if not name:
                print("Not valid link")
                sys.exit()
            rating_stars_element = soup.find('span', attrs={"data-testid": "rating-stars"})
            rating_squares_element = soup.find('span', attrs={"data-testid": "rating-squares"})
            NoStars = 0
            if rating_stars_element:
                NoStars = len(rating_stars_element)
            elif rating_squares_element:
                NoStars = len(rating_squares_element)
            links_with_style = soup.find_all('a', class_='bh-photo-grid-item')
            img_links = [re.search(r'url\((.*?)\)', link['style']).group(1) for link in links_with_style if
                         "/images/hotel" in link['style']]
            hotelPhotos = img_links[:5]
            Descrption = soup.find('p', {'class': 'a53cbfa6de b3efd73f69'})
            # print(Descrption.text)
            About = soup.find('div', {'class': 'e50d7535fa'})
            AllContent = About.find_all('div', {'class': 'f1e6195c8b'})
            activities_list = []
            general_list = []
            parking_list = []
            internet_list = []
            services_list = []

            for tag in AllContent:
                ContentType = tag.find('div', {'class': 'd1ca9115fe'})
                expandContent = tag.find_all('span', {'class': 'a5a5a75131'})
                littleInfo = tag.find('div', {'class': 'a53cbfa6de f45d8e4c32 df64fda51b'})
                if ContentType.text == "Activities":
                    activities_content = [content.text for content in expandContent]
                    activities_list.extend(activities_content)

                elif ContentType.text == "General":
                    general_content = [content.text for content in expandContent]
                    general_list.extend(general_content)

                elif ContentType.text == "Parking":
                    parking_content = [content.text for content in expandContent]
                    if littleInfo:
                        parking_list.append(littleInfo.text)
                    parking_list.extend(parking_content)

                elif ContentType.text == "Internet":
                    interests_content = [content.text for content in expandContent]
                    if littleInfo:
                        internet_list.append(littleInfo.text)
                    internet_list.extend(interests_content)

                elif ContentType.text == "Services":
                    services_content = [content.text for content in expandContent]
                    services_list.extend(services_content)

            # print("Activities List:", activities_list)
            # print("General List:", general_list)
            # print("Parking List:", parking_list)
            # print("Internet List:", internet_list)
            # print("Services List:", services_list)
            name_str = name.text
            address_str = address.text
            hotelPhotos_first_5 = hotelPhotos[:5]
            Descrption_str = Descrption.text
            activities_list = [str(tag) for tag in activities_list]
            general_list = [str(tag) for tag in general_list]
            parking_list = [str(tag) for tag in parking_list]
            internet_list = [str(tag) for tag in internet_list]
            services_list = [str(tag) for tag in services_list]
            hotelPhotos_list = [str(tag) for tag in hotelPhotos_first_5]
            data = {
                "name": name_str,
                "address": address_str,
                "star_rating": NoStars,
                "photos": hotelPhotos_list,
                "description": Descrption_str,
                "Activities": activities_list,
                "General": general_list,
                "Parking": parking_list,
                "Internet": internet_list,
                "Services": services_list,
            }
            json_data = json.dumps(data, indent=2)
            print(json_data)


if __name__ == "__main__":
    # Create a parser object
    parser = argparse.ArgumentParser(description="Scrape data from a hotel URL")

    # Add the URL argument
    parser.add_argument("url", type=str, help="URL of the hotel")

    # Parse the command-line arguments
    args = parser.parse_args()

    # Get the URL from the command-line arguments
    hotel_url = args.url

    # Call the function to scrape data
    scrape_data(hotel_url)