import { StarRounded } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import styles from "./HotelPDF.module.scss"

const HotelPDF = ({hotel}) => {
  return(
    <Box className={`${styles.hotel_pdf} pad20 br6 grid jcs aic g30`}>
      {
        hotel ? 
        (
          <>
          <Box className={`grid jcs aic g10`}>
            <Typography variant="h4" className={`tac fw700`} >{hotel.name}</Typography>
            <Typography variant="h6" className={`tac`} >{hotel.addres}</Typography>
          </Box>
          <Box className={`flex jcc aic g5`}>
            {
              new Array(hotel.star_rating).fill(0).map((_,i)=>(
                <StarRounded key={i} sx={{color:(theme)=>theme.palette.yellow}} />
              ))
            }
          </Box>
          {/* <LazyLoadImage src={hotel.photos[0]} alt={"hotel"} /> */}
          </>
        ):(
          <Typography variant="h5" className={`tac ${styles.no_chosen}`} >No Hotel Chosen Yet...</Typography>
        )
      }
    </Box>
  )
}

export default HotelPDF