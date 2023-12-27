import { AppBar } from "@mui/material"
import { PrimaryButton } from "../../mui/PrimaryButton"
import { PrimaryContainer } from "../../mui/PrimaryContainer"
import Logo from "../Logo/Logo"
import styles from "./Header.module.scss"

const Header = () => {
  return (
    <AppBar>
      <PrimaryContainer className={`flex jcsb aic g30 ${styles.header_contain}`}>
        <Logo/>
        <PrimaryButton>Add</PrimaryButton>
      </PrimaryContainer>
    </AppBar>
  )
}

export default Header