import { SearchRounded } from "@mui/icons-material"
import { Typography, useMediaQuery } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getLogs } from "store/logsSlice"
import LoadButton from "../../components/LoadButton/LoadButton"
import { PrimaryBox } from "../../mui/PrimaryBox"
import { PrimaryButton } from "../../mui/PrimaryButton"
import { PrimaryContainer } from "../../mui/PrimaryContainer"
import { PrimaryTextField } from "../../mui/PrimaryTextField"

const SearchForm = ({loading,formik}) => {
  const smSize = useMediaQuery("(max-width:768px)")
  const dispatch =useDispatch()

  useEffect(()=>{
    dispatch(getLogs({count:0,search:formik.values.search}))
  },[formik,dispatch])
  
  return (
    <PrimaryBox >
      <PrimaryContainer className={`flex jcsb aic g30 `}>
        <PrimaryTextField
          fullWidth
          variant="outlined"
          type="text"
          id="search"
          name="search"
          label={"Search..."}
          value={formik.values.search}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.search && Boolean(formik.errors.search)}
          helperText={formik.touched.search && formik.errors.search}
        />
        <LoadButton loading={loading}>
          <PrimaryButton type={"submit"} className={`flex jcc aic g5`}>
            <SearchRounded/>
            {!smSize && (<Typography variant="h6">Search</Typography>)}
          </PrimaryButton>
        </LoadButton>
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default SearchForm