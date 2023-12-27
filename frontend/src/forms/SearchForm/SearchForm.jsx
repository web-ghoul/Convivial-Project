import { SearchRounded } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { PrimaryBox } from "../../mui/PrimaryBox"
import { PrimaryButton } from "../../mui/PrimaryButton"
import { PrimaryContainer } from "../../mui/PrimaryContainer"
import { PrimaryTextField } from "../../mui/PrimaryTextField"
import styles from "./SearchForm.module.scss"

const SearchForm = ({formik}) => {
  return (
    <PrimaryBox className={`${styles.search}`}>
      <PrimaryContainer className={`flex jcsb aic g30`}>
        <PrimaryTextField
          fullWidth
          variant="outlined"
          type="text"
          id="search"
          name="search"
          value={formik.values.search}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.search && Boolean(formik.errors.search)}
          helperText={formik.touched.search && formik.errors.search}
        />
        <PrimaryButton className={`flex jcc aic g5`}>
          <SearchRounded/>
          <Typography variant="h6">Search</Typography>
        </PrimaryButton>
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default SearchForm