import { Box, Divider, Typography } from "@mui/material"
import { AppContext } from "context/AppContext"
import { useContext, useState } from "react"
import HotelPDF from "../../components/HotelPDF/HotelPDF"
import { PrimaryTextField } from "../../mui/PrimaryTextField"
import styles from "./AddLog.module.scss"

const Hotel = ({index}) => {
  const {chosenHotels , handleOpenChooseHotelDialog} = useContext(AppContext)
  const [price, setPrice] = useState("")
  const [link,setLink] = useState("")
  return (
    <Box className={`grid jcs aifs g30 ${styles.hotel}`}>
      <Box className={`grid jcs aic g30`}>
        <Box className={`grid jcs aic g10`}>
          <PrimaryTextField
            fullWidth
            variant="outlined"
            type="text"
            id="hotel"
            name="hotel"
            label={"Choose a Hotel"}
            value={chosenHotels[index] ? chosenHotels[index].name : ""}
            onClick={()=>handleOpenChooseHotelDialog(index)}
          />
          <Box className={`flex jcc aic relative`}>
            <Divider sx={{width:"100%", zIndex:0 , borderColor:(theme)=>theme.palette.primary.main}} className={`absolute`}/>
            <Typography variant="subtitle1" sx={{backgroundColor:(theme)=>theme.palette.white,zIndex:1}} className={`pad5`} >or</Typography>
          </Box>
          <PrimaryTextField
            fullWidth
            variant="outlined"
            type="text"
            id="hotel"
            name="hotel"
            label={"Find a Hotel By Link"}
            value={link}
            onChange={(e)=>setLink(e.target.value)}
          />
        </Box>
        <PrimaryTextField
          fullWidth
          variant="outlined"
          type="text"
          id="price"
          name="price"
          label={"Hotel Price"}
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
      </Box>
      <Box className={`grid jcs aic g20`}>
        <Typography variant="h5" className={`tac fw600`} >PDF View</Typography>
        <HotelPDF hotel={chosenHotels[index]}/>
      </Box>
    </Box>
  )
}

export default Hotel