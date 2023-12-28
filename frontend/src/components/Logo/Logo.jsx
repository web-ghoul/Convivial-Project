import { Box, IconButton } from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/images/logo/BTB LOGO COLORED-01.png"
import styles from "./Logo.module.scss"

const Logo = () => {
  const navigate = useNavigate()
  return (
    <Box className={`flex jcc aic ${styles.logo}`}>
      <IconButton className={`${styles.logo_button}`} onClick={()=>navigate(`${process.env.REACT_APP_HOME_ROUTE}`)}>
        <LazyLoadImage src={logo} alt={"logo"} />
      </IconButton>
    </Box>
  )
}

export default Logo