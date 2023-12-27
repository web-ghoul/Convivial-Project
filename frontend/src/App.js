import { Box, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme= {theme}>
      <Box component={"main"}>
        <Header/>
        <Outlet />
        <Footer/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
