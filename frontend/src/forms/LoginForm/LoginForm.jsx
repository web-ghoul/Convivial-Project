import { Box, Typography } from "@mui/material"
import LoadButton from "components/LoadButton/LoadButton"
import { PrimaryButton } from "mui/PrimaryButton"
import { PrimaryTextField } from "mui/PrimaryTextField"
import { LazyLoadImage } from "react-lazy-load-image-component"
import logo from "../../assets/images/logo/logo_black.png"
import styles from "./LoginForm.module.scss"

const LoginForm = ({formik , loading}) => {
  return (
    <Box className={`pad20 br10 grid jcs aic g50 ${styles.login_form}`}>
      <Box className={`center_rel_x flex jcc aic ${styles.logo_box}`}>
        <LazyLoadImage src={logo} alt={"Logo"} />
      </Box>
      <Box className={`grid jcs aic g30`}>
        <Typography variant="h4" className={`tac fw700`} >Login</Typography>
        <Box className={`grid jcs aic g20`}>
          <PrimaryTextField
            fullWidth
            variant="outlined"
            type="text"
            id="userName"
            name="userName"
            label={"username"}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <PrimaryTextField
            fullWidth
            variant="outlined"
            type="password"
            id="password"
            name="password"
            label={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <LoadButton loading={loading}>
            <PrimaryButton type={"submit"} className={`flex jcc aic g5`}>
              <Typography variant="h6">Login</Typography>
            </PrimaryButton>
          </LoadButton>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginForm