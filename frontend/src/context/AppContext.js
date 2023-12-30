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
      if(h.data && i !== index && (hotel._id === h.data._id || (hotel.name === h.data.name && hotel.address === h.data.address && hotel.description === h.data.description))  ){
        isExist = true
      }
      return ""
    })
    if(!isExist){
      chosenHotels[index].data = hotel
      setChosenHotels(chosenHotels)
    }else{
      handleAlert("Hotel is Already Chosen","erorr")
    }
  }

  const handleAddPrice=(price,index)=>{
    chosenHotels[index].price=price
  }

  const handleReceiveEditableData =(hotels)=>{
    let h = []
    hotels.map((hotel)=>{
      let d = {data:hotel.Id , price:hotel.Price}
      h.push(d)
      return 0;
    })
    setChosenHotels(h)
  }

  const handleAddLink=(link,index)=>{
    chosenHotels[index].link=link
  }

  const handleHotelClear=(index)=>{
    chosenHotels[index] = {data:null,price:null}
    setChosenHotels(chosenHotels)
  }

  const handleResetChosenHotels=()=>{
    let h = []
    let num=0
    if(localStorage.getItem("numberOfHotel")){
      num = JSON.parse(localStorage.getItem("numberOfHotel"))
    }
    new Array(+num).fill(0).map(()=>{
      h.push({data:null,price:null ,link:null})
      return 0
    })
    setChosenHotels(h)
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

  //Edit Log
  const [logData,setLogData] = useState(null)


  //Search
  const [searchQuery,setSearchQuery] = useState("")

  useEffect(()=>{
    handleResetChosenHotels()
  },[numberOfHotel])

  //Download Log
  const [openDownloadLogModal,setOpenDownloadLogModal] = useState(false)

  const handleOpenDownloadLogModal=(log)=>{
    setOpenDownloadLogModal(true)
  }

  const handleCloseDownloadLogModal=()=>{
    setOpenDownloadLogModal(false)
  }

  return (
    <AppContext.Provider value={{openChooseNumberOfHotelModal,handleOpenChooseNumberOfHotelModal,numberOfHotel,handleChooseNumberOfHotel,handleCloseChooseNumberOfHotelModal,handleCloseDeleteLogModal,handleOpenDeleteLogModal,openDeleteLogModal,logId,handleAddHotel,chosenHotels,openChooseHotelDialog,handleCloseChooseHotelDialog,handleOpenChooseHotelDialog,hotelIndex,handleHotelClear,handleReceiveEditableData,logData,setLogData,handleAddPrice,handleAddLink,handleResetChosenHotels,setSearchQuery,searchQuery,openDownloadLogModal,handleOpenDownloadLogModal,handleCloseDownloadLogModal}}>{children}</AppContext.Provider>
  )
}

export default AppProvider