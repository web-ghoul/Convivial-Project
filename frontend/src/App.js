import { Box, ThemeProvider } from "@mui/material";
import AppProvider from "context/AppContext";
import ChooseHotelDialog from "dialogs/ChooseHotelDialog";
import { handleAlert } from "functions/handleAlert";
import ChooseNumberOfHotelModal from "modals/ChooseNumberOfHotelModal";
import DeleteLogModal from "modals/DeleteLogModal";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { theme } from "./theme";

function App() {
  const navigate = useNavigate()
  const {pathname} = useLocation()

  useEffect(()=>{
    if(!localStorage.getItem("numberOfHotel") && pathname !== `${process.env.REACT_APP_HOME_ROUTE}`){
      navigate(`${process.env.REACT_APP_HOME_ROUTE}`)
      handleAlert("Choose Number of Hotels","error")
    }
  },[pathname,navigate])

  return (
    <ThemeProvider theme= {theme}>
      <AppProvider>
        <Box component={"main"}>
          <Header/>
          <Outlet />
          {/* Modals */}
          <ChooseNumberOfHotelModal/>
          <DeleteLogModal/>
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
