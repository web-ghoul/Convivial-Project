import { AddRounded, ChevronLeftRounded } from "@mui/icons-material"
import { AppBar, Typography } from "@mui/material"
import { AppContext } from "context/AppContext"
import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { PrimaryButton } from "../../mui/PrimaryButton"
import { PrimaryContainer } from "../../mui/PrimaryContainer"
import Logo from "../Logo/Logo"
import styles from "./Header.module.scss"

const Header = () => {
  const {handleOpenChooseNumberOfHotelModal} = useContext(AppContext)
  const {pathname} =useLocation()
  const navigate= useNavigate()
  return (
    <AppBar>
      <PrimaryContainer className={`flex jcsb aic g30 ${styles.header_contain}`}>
        <Logo/>
        {
          pathname === "/" ? <PrimaryButton onClick={handleOpenChooseNumberOfHotelModal} className={`flex jcc aic g5`}>
            <AddRounded/>
            <Typography variant="h6">Add</Typography>
          </PrimaryButton>:<PrimaryButton onClick={()=>navigate(`${process.env.REACT_APP_HOME_ROUTE}`)} className={`flex jcc aic g5`}>
            <ChevronLeftRounded/>
            <Typography variant="h6">Back Home</Typography>
          </PrimaryButton>
        }
      </PrimaryContainer>
    </AppBar>
  )
}

export default Header