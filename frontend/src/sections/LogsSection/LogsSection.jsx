import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Log from "../../components/Log/Log"
import { PrimaryBox } from "../../mui/PrimaryBox"
import { PrimaryContainer } from "../../mui/PrimaryContainer"
import { getLogs } from "../../store/logsSlice"
import styles from "./LogsSection.module.scss"

const LogsSection = () => {
  const dispatch = useDispatch()
  const {logs , isLoading} = useSelector((state)=> state.logs)
  useEffect(()=>{
    dispatch(getLogs({count:0,search:""}))
  },[dispatch])
  return (
    <PrimaryBox>
      <PrimaryContainer>
        {
          isLoading ? (<></>):logs && logs.length > 0 ? (
            <Box className={`grid jcs aic g30 ${styles.logs}`}>
              {logs.map((log,i)=>(
            <Log log={log} key={i}/>
          ))}
            </Box>
          ) :(<></>)
        }
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default LogsSection