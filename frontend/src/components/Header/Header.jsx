import { AddRounded, ChevronLeftRounded, LoginRounded, LogoutRounded } from "@mui/icons-material"
import { AppBar, Box, Typography } from "@mui/material"
import { AppContext } from "context/AppContext"
import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { logout } from "store/authSlice"
import { PrimaryButton } from "../../mui/PrimaryButton"
import { PrimaryContainer } from "../../mui/PrimaryContainer"
import Logo from "../Logo/Logo"
import styles from "./Header.module.scss"

const Header = () => {
  const {handleOpenChooseNumberOfHotelModal} = useContext(AppContext)
  const {isSigned} = useSelector((state)=>state.auth)
  const {pathname} =useLocation()
  const navigate= useNavigate()
  const dispatch = useDispatch()

  const handleLogout =()=>{
    dispatch(logout())
    navigate(`${process.env.REACT_APP_LOGIN_ROUTE}`)
  }
  return (
    <AppBar>
      <PrimaryContainer className={`flex jcsb aic g30 ${styles.header_contain}`}>
        <Logo/>
        {
          isSigned ? 
            (
              <Box className={`flex jcc aic g10`}>
                {
                  pathname === "/" ? <PrimaryButton onClick={handleOpenChooseNumberOfHotelModal} className={`flex jcc aic g5`}>
                    <AddRounded/>
                    <Typography variant="h6">Add</Typography>
                  </PrimaryButton>:<PrimaryButton onClick={()=>navigate(`${process.env.REACT_APP_HOME_ROUTE}`)} className={`flex jcc aic g5`}>
                    <ChevronLeftRounded/>
                    <Typography variant="h6">Back Home</Typography>
                  </PrimaryButton>
                }
                <PrimaryButton onClick={handleLogout} className={`flex jcc aic g5`}>
                  <LogoutRounded/>
                  <Typography variant="h6">Logout</Typography>
                </PrimaryButton>
              </Box>
            )
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