import { StarRounded } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"
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
            <LazyLoadImage src={hotel.photos[0]} alt={"hotel"} />
          </Box>
          <Typography variant="h5" className={`tac fw700 flex jcc aic flex_wrap`} >{`Price Per Night : $`}
          <Typography variant="h5" className={`fw700`} sx={{color:(theme)=>theme.palette.primary.main}}>{price}</Typography></Typography>
          <Typography variant="h6" sx={{color:(theme)=>theme.palette.gray}} >{hotel.description}</Typography>
          <Box className={`grid jcs aifs g20 ${styles.hotel_photos}`}>
            {hotel.photos.slice(1).map((ph ,i)=>(
              <LazyLoadImage src={ph} key={i} alt={"hotel photo"} />
            ))}
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