import { KeyboardArrowRightRounded } from "@mui/icons-material"
import { Box, Modal, Typography } from "@mui/material"
import { AppContext } from "context/AppContext"
import { DeleteButton } from "mui/DeleteButton"
import { PrimaryButton } from "mui/PrimaryButton"
import { PrimaryTextField } from "mui/PrimaryTextField"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./modal.scss"

const ChooseNumberOfHotelModal = () => {
  const {openChooseNumberOfHotelModal,handleChooseNumberOfHotel,handleCloseChooseNumberOfHotelModal} = useContext(AppContext)
  const [numberOfHotel, setNumberOfHotel] = useState("")
  const navigate = useNavigate()
  const handleNext=()=>{
    handleCloseChooseNumberOfHotelModal()
    handleChooseNumberOfHotel(numberOfHotel)
    navigate(`${process.env.REACT_APP_ADD_LOG_ROUTE}`)
    setNumberOfHotel("")
  }
  return (
    <Modal
      open={openChooseNumberOfHotelModal}
      onClose={handleCloseChooseNumberOfHotelModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal br10 pad20 grid g30 jcs aic center_abs_x_y">
        <Typography variant="h4" className="tac" >Choose Number of Hotels</Typography>
        <PrimaryTextField
          fullWidth
          variant="outlined"
          select
          SelectProps={{
            native: true,
          }}
          type="text"
          id="number_of_hotel"
          name="number_of_hotel"
          label={"Choose Number Of Hotels"}
          value={numberOfHotel}
          onChange={(e)=>setNumberOfHotel(e.target.value)}
        >
            <option key={-1} value={""}>
            </option>
            {
              [1,2,3,4].map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))
            }
        </PrimaryTextField>
        <Box className={`flex jcsb aic g30`}>
          <DeleteButton onClick={handleCloseChooseNumberOfHotelModal}>Cancel</DeleteButton>
          <PrimaryButton onClick={handleNext} className="flex jcc aic g5">
            <Typography variant="h6" >Next</Typography>
            <KeyboardArrowRightRounded/>
          </PrimaryButton>
        </Box>
      </Box>
    </Modal>
  )
}

export default ChooseNumberOfHotelModal