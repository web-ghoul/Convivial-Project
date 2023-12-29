import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import HotelPDF from 'components/HotelPDF/HotelPDF'
import styles from "./LogHotels.module.scss"

export const LogHotels = ({hotels}) => {
  return (
    <Box className={`grid cjs aic g20 ${styles.log_hotels}`}>
      <Typography variant='h5' className={`fw700`} >Hotels</Typography>
      <Box className={`grid jcs aifs g20 ${styles.log_hotels_accordions}`}>
        {
          hotels.map((hotel,i)=>(
            <Accordion key={i} className={`br6 pad10 ${styles.accordion}`}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box className={`flex jcc aic g5`}>
                  <Typography variant='h6' className={`${styles.accordion_title}`}>{`${hotel.Id.name}`}</Typography>
                  (<Typography  variant='h6' className={`${styles.hotel_price}`}>{`$${hotel.Price}`}</Typography>)
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <HotelPDF hotel={hotel.Id} price={hotel.Price} />
              </AccordionDetails>
            </Accordion>
          ))
        }
      </Box>
    </Box>
  )
}
