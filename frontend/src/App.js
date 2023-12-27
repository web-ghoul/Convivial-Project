import { Box, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme= {theme}>
      <Box component={"main"}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
