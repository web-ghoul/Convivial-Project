import { Box, Typography } from "@mui/material"
import { LogHotels } from "components/LogHotels/LogHotels"
import LogInfo from "components/LogInfo/LogInfo"
import { PrimaryBox } from "mui/PrimaryBox"
import { PrimaryContainer } from "mui/PrimaryContainer"
import { SpecialBox } from "mui/SpecialBox"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getLog } from "store/logSlice"

export const LogPage = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {log, isLoading} = useSelector((state)=>state.log)

  useEffect(()=>{
    dispatch(getLog({id}))
  },[id,dispatch])
  return (
    <SpecialBox>
      <PrimaryBox>
        <PrimaryContainer className={`grid jcs aic g50`}>
          {
            isLoading ?  
            (<></>):
            (
              <>
                <Typography variant="h4" className={`tac fw700`} sx={{color:(theme)=>theme.palette.primary.main}}>{log.Name}</Typography>
                <Box className={`grid jcs aic g30`}>
                  <LogHotels hotels={log.Hotels}/>
                  <LogInfo log={log}/>
                </Box>
              </>
            )
          }
        </PrimaryContainer>
      </PrimaryBox>
    </SpecialBox>
  )
}
