import { Box, Divider, Typography } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import HotelPDF from "../../components/HotelPDF/HotelPDF"
import LoadButton from "../../components/LoadButton/LoadButton"
import { AppContext } from "../../context/AppContext"
import { handleAlert } from "../../functions/handleAlert"
import { PrimaryButton } from "../../mui/PrimaryButton"
import { PrimaryTextField } from "../../mui/PrimaryTextField"
import styles from "./EditLog.module.scss"

const Hotel = ({index}) => {
  const {chosenHotels,handleAddLink ,handleAddPrice,handleAddHotel, handleOpenChooseHotelDialog} = useContext(AppContext)
  const [price, setPrice] = useState()
  const [link,setLink] = useState()
  const [loading,setLoading] = useState(false)

  const handleFindHotelByLink =async(l)=>{
    setLoading(true)
    await axios(`${process.env.REACT_APP_SERVER_URL}/scrape/?site=${l}`).then((res)=>{
      handleAddHotel(res.data.data,index)
      handleAddLink(link,index)
    }).catch((err)=>{
      handleAlert(err.response.data.message,"error")
    })
    setLoading(false)
  }

  useEffect(()=>{
    handleAddPrice(price,index)
  },[price,index,handleAddPrice])

  useEffect(()=>{
    setPrice(chosenHotels[index].price)
  },[chosenHotels])

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
            value={chosenHotels[index].data ? chosenHotels[index].data.name : ""}
            onClick={()=>handleOpenChooseHotelDialog(index)}
          />
          <Box className={`flex jcc aic relative`}>
            <Divider sx={{width:"100%", zIndex:0 , borderColor:(theme)=>theme.palette.primary.main}} className={`absolute`}/>
            <Typography variant="subtitle1" sx={{backgroundColor:(theme)=>theme.palette.white,zIndex:1}} className={`pad5`} >or</Typography>
          </Box>
          <Box className={`grid jcs aic g10`}>
            <PrimaryTextField
              fullWidth
              variant="outlined"
              type="text"
              id="hotel"
              name="hotel"
              label={"Find a Hotel By Link"}
              value={link ?link:""}
              onChange={(e)=>setLink(e.target.value)}
            />
            <LoadButton loading={loading}>
              <PrimaryButton onClick={()=>handleFindHotelByLink(link)}>Find</PrimaryButton>
            </LoadButton>
          </Box>
        </Box>
        <PrimaryTextField
          fullWidth
          variant="outlined"
          type="text"
          id="price"
          name="price"
          label={"Hotel Price"}
          value={price ? price:""}
          onChange={(e)=>setPrice(e.target.value)}
        />
      </Box>
      <Box className={`grid jcs aifs g20 ${styles.pdf_view}`}>
        <Typography variant="h5" className={`tac fw600`} >PDF View</Typography>
        <HotelPDF price={price} hotel={chosenHotels[index].data}/>
      </Box>
    </Box>
  )
}

export default Hotel