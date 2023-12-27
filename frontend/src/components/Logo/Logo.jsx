import { Box } from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"
import logo from "../../assets/images/logo/BTB LOGO COLORED-01.png"
import styles from "./Logo.module.scss"

const Logo = () => {
  return (
    <Box className={`flex jcc aic ${styles.logo}`}>
      <LazyLoadImage src={logo} alt={"logo"} />
    </Box>
  )
}

export default Logo