import { FiberManualRecordRounded, StarRounded } from "@mui/icons-material"
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"
import styles from "./HotelPDF.module.scss"

const HotelPDF = ({hotel,price}) => {
  return(
    <Box className={`${styles.hotel_pdf} pad20 br6 grid jcs aic g30`}>
      {
        hotel ? 
        (
          <>
            <Box className={`grid jcs aic g10`}>
              <Typography variant="h4" className={`tac fw700`} >{hotel.name}</Typography>
              <Typography variant="h6" className={`tac`} >{hotel.address}</Typography>
            </Box>
            <Box className={`flex jcc aic g5`}>
              {
                new Array(hotel.star_rating).fill(0).map((_,i)=>(
                  <StarRounded key={i} sx={{color:(theme)=>theme.palette.yellow}} />
                ))
              }
            </Box>
            <Box className={`flex jcc aic ${styles.main_photo_cover}`}>
              <img src={hotel.photos[0]} alt={"hotel"} />
            </Box>
            <Box className={`flex jcc aic flex_wrap`}>
              <Typography variant="h5" className={`tac fw700`} >{`Price Per Night : $`}
              </Typography>
              <Typography variant="h5" className={`fw700`} sx={{color:(theme)=>theme.palette.primary.main}}>{price}</Typography>
            </Box>
            <Typography variant="h6" sx={{color:(theme)=>theme.palette.gray}} >{hotel.description}</Typography>
            <Box className={`grid jcs aifs g20 ${styles.hotel_photos}`}>
              {hotel.photos.slice(1).map((ph ,i)=>(
                <img src={ph} key={i} alt={"hotel photo"} />
              ))}
            </Box>
            <Box className={`${styles.infos} grid jcs aifs g10`}>
              {hotel.Activities.length > 0 && (
                <Box className={`${styles.info} grid jcs aic g10`}>
                  <Typography variant="h5" className="fw700" >Activities</Typography>
                  <List className={`${styles.info_list}`}>
                    {
                      hotel.Activities.map((d,i)=>(
                        <ListItem  key={i} className={`flex jcc aic g5`}>
                          <FiberManualRecordRounded/>
                          <ListItemText>{d}</ListItemText>
                        </ListItem>
                      ))
                    }
                  </List>
                </Box>
              ) }
              {hotel.General.length > 0 && (
                <Box className={`${styles.info} grid jcs aic g10`}>
                  <Typography variant="h5" className={`fw700`} >General</Typography>
                  <List className={`${styles.info_list}`}>
                    {
                      hotel.General.map((d,i)=>(
                        <ListItem key={i} className={`flex jcc aic g5`}>
                          <FiberManualRecordRounded/>
                          <ListItemText>{d}</ListItemText>
                        </ListItem>
                      ))
                    }
                  </List>
                </Box>
              ) }
              {hotel.Services.length > 0 && (
                <Box className={`${styles.info} grid jcs aic g10`}>
                  <Typography variant="h5" className={`fw700`}>Services</Typography>
                  <List className={`${styles.info_list}`}>
                    {
                      hotel.Services.map((d,i)=>(
                        <ListItem key={i} className={`flex jcc aic g5`}>
                          <FiberManualRecordRounded/>
                          <ListItemText>{d}</ListItemText>
                        </ListItem>
                      ))
                    }
                  </List>
                </Box>
              ) }
              {hotel.Internet.length > 0 && (
                <Box className={`${styles.info} grid jcs aic g10`}>
                  <Typography variant="h5" className={`fw700`} >Internet</Typography>
                  <List className={`${styles.info_list}`}>
                    {
                      hotel.Internet.map((d,i)=>(
                        <ListItem key={i} className={`flex jcc aic g5`}>
                          <FiberManualRecordRounded/>
                          <ListItemText>{d}</ListItemText>
                        </ListItem>
                      ))
                    }
                  </List>
                </Box>
              ) }
              {hotel.Parking.length > 0 && (
                <Box className={`${styles.info} grid jcs aic g10`}>
                  <Typography variant="h5" className={`fw700`} >Parking</Typography>
                  <List className={`${styles.info_list}`}>
                    {
                      hotel.Parking.map((d,i)=>(
                        <ListItem key={i} className={`flex jcc aic g5`}>
                          <FiberManualRecordRounded/>
                          <ListItemText>{d}</ListItemText>
                        </ListItem>
                      ))
                    }
                  </List>
                </Box>
              ) }
            </Box>
          </>
        ):(
          <Typography variant="h5" className={`tac ${styles.no_chosen}`} >No Hotel Chosen Yet...</Typography>
        )
      }
    </Box>
  )
}

export default HotelPDF