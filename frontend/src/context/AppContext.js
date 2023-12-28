import { createContext, useEffect, useState } from "react";
import { handleAlert } from "../functions/handleAlert";

export const AppContext = createContext()

const AppProvider = ({children}) => {

  //Choose Number of hotel
  const [openChooseNumberOfHotelModal , setOpenChooseNumberOfHotelModal] = useState(false)

  const handleOpenChooseNumberOfHotelModal=()=>{
    setOpenChooseNumberOfHotelModal(true)
  }

  const handleCloseChooseNumberOfHotelModal=()=>{
    setOpenChooseNumberOfHotelModal(false)
  }

  const [numberOfHotel , setNumberOfHotel] = useState(0)

  const handleChooseNumberOfHotel = (num)=>{
    localStorage.setItem("numberOfHotel" , JSON.stringify(num))
    setNumberOfHotel(num)
  }

  //Delete Log
  const [openDeleteLogModal,setOpenDeleteLogModal] = useState(false)
  const [logId,setLogId] = useState(null)

  const handleCloseDeleteLogModal = ()=>{
    setOpenDeleteLogModal(false)
  }

  const handleOpenDeleteLogModal = (id)=>{
    setOpenDeleteLogModal(true)
    setLogId(id)
  }

  //Add Logs Hotels
  const [chosenHotels , setChosenHotels] = useState([]) 

  const handleAddHotel =(hotel,index)=>{
    let isExist  = false
    chosenHotels.map((h,i)=>{
      if(h && i !== index && hotel._id === h._id){
        isExist = true
      }
      return ""
    })
    if(!isExist){
      chosenHotels[index] = hotel
      setChosenHotels(chosenHotels)
    }else{
      handleAlert("Hotel is Already Chosen","erorr")
    }
  }

  const handleHotelClear=(index)=>{
    chosenHotels[index] = null
    setChosenHotels(chosenHotels)
  }

  //Choose Hotel
  const [openChooseHotelDialog , setOpenChooseHotelDialog] = useState(false)
  const [hotelIndex , setHotelIndex] = useState(null)

  const handleCloseChooseHotelDialog=()=>{
    setOpenChooseHotelDialog(false)
  }

  const handleOpenChooseHotelDialog=(index)=>{
    setOpenChooseHotelDialog(true)
    setHotelIndex(index)
  }

  useEffect(()=>{
    let h = []
    let num=0
    if(localStorage.getItem("numberOfHotel")){
      num = JSON.parse(localStorage.getItem("numberOfHotel"))
    }
    new Array(+num).fill(0).map(()=>{
      h.push(null)
      return 0
    })
    setChosenHotels(h)
  },[numberOfHotel])

  return (
    <AppContext.Provider value={{openChooseNumberOfHotelModal,handleOpenChooseNumberOfHotelModal,numberOfHotel,handleChooseNumberOfHotel,handleCloseChooseNumberOfHotelModal,handleCloseDeleteLogModal,handleOpenDeleteLogModal,openDeleteLogModal,logId,handleAddHotel,chosenHotels,openChooseHotelDialog,handleCloseChooseHotelDialog,handleOpenChooseHotelDialog,hotelIndex,handleHotelClear}}>{children}</AppContext.Provider>
  )
}

export default AppProvider