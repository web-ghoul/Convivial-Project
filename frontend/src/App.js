import { Box, ThemeProvider } from "@mui/material";
import AppProvider from "context/AppContext";
import ChooseHotelDialog from "dialogs/ChooseHotelDialog";
import { handleAlert } from "functions/handleAlert";
import Cookies from "js-cookie";
import ChooseNumberOfHotelModal from "modals/ChooseNumberOfHotelModal";
import DeleteLogModal from "modals/DeleteLogModal";
import DownloadLogModal from "modals/DownloadLogModal";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { login } from "store/authSlice";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { theme } from "./theme";

function App() {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const {isSigned} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    //Handle Token
    let token = null
    let userName = null
    try{
      token = Cookies.get(`${process.env.REACT_APP_TOKEN_COOKIE_NAME}`)
      userName = Cookies.get(`${process.env.REACT_APP_USERNAME_COOKIE_NAME}`)
      if(token && userName){
        dispatch(login({token,userName}))
      }
    }catch(err){
      handleAlert(err.message,"error")
    }

    //Handle LocalStorage
    if(!localStorage.getItem("numberOfHotel") && pathname !== `${process.env.REACT_APP_HOME_ROUTE}`){
      navigate(`${process.env.REACT_APP_HOME_ROUTE}`)
      handleAlert("Choose Number of Hotels","error")
    }

    //Protect Routes
    if(!token && !userName && (pathname === `${process.env.REACT_APP_LOG_ROUTE}` || pathname === `${process.env.REACT_APP_EDIT_LOG_ROUTE}`  || pathname === `${process.env.REACT_APP_ADD_LOG_ROUTE}`  || pathname === `${process.env.REACT_APP_HOME_ROUTE}`)) {
      navigate(`${process.env.REACT_APP_LOGIN_ROUTE}`)
    }
  },[pathname,navigate,isSigned,dispatch])

  return (
    <ThemeProvider theme= {theme}>
      <AppProvider>
        <Box component={"main"}>
          <Header/>
          <Outlet />
          {/* Modals */}
          <ChooseNumberOfHotelModal/>
          <DeleteLogModal/>
          <DownloadLogModal/>
          {/* Modals */}
          
          {/* Dialog */}
          <ChooseHotelDialog/>
          {/* Dialog */}
          <Toaster/>
          <Footer/>
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
