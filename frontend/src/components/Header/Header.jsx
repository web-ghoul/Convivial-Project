import { AddRounded, ChevronLeftRounded, LoginRounded } from "@mui/icons-material"
import { AppBar, Typography } from "@mui/material"
import { AppContext } from "context/AppContext"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { PrimaryButton } from "../../mui/PrimaryButton"
import { PrimaryContainer } from "../../mui/PrimaryContainer"
import Logo from "../Logo/Logo"
import styles from "./Header.module.scss"

const Header = () => {
  const {handleOpenChooseNumberOfHotelModal} = useContext(AppContext)
  const {isSigned} = useSelector((state)=>state.auth)
  const {pathname} =useLocation()
  const navigate= useNavigate()
  return (
    <AppBar>
      <PrimaryContainer className={`flex jcsb aic g30 ${styles.header_contain}`}>
        <Logo/>
        {
          !isSigned ? 
            pathname === "/" ? <PrimaryButton onClick={handleOpenChooseNumberOfHotelModal} className={`flex jcc aic g5`}>
              <AddRounded/>
              <Typography variant="h6">Add</Typography>
            </PrimaryButton>:<PrimaryButton onClick={()=>navigate(`${process.env.REACT_APP_HOME_ROUTE}`)} className={`flex jcc aic g5`}>
              <ChevronLeftRounded/>
              <Typography variant="h6">Back Home</Typography>
            </PrimaryButton>
          :(
            <PrimaryButton onClick={()=>navigate(`${process.env.REACT_APP_LOGIN_ROUTE}`)} className={`flex jcc aic g5`}>
              <LoginRounded/>
              <Typography variant="h6">Login</Typography>
            </PrimaryButton>
          )
        }
      </PrimaryContainer>
    </AppBar>
  )
}

export default Header