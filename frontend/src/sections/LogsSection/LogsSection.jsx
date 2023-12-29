import { Box, Typography } from "@mui/material"
import LoadingLog from "components/Log/LoadingLog"
import Paginate from "components/Paginate/Paginate"
import { useSelector } from "react-redux"
import Log from "../../components/Log/Log"
import { PrimaryBox } from "../../mui/PrimaryBox"
import { PrimaryContainer } from "../../mui/PrimaryContainer"

const LogsSection = () => {
  const {logs,totalLogs , isLoading} = useSelector((state)=> state.logs)

  return (
    <PrimaryBox>
      <PrimaryContainer>
        <Box className={`grid jcs aic g50`}>
          <Box className={`grid jcs aic g30 `}>
            {
              isLoading ? (new Array(Math.floor(Math.random()*6)+5).fill(0).map((_,i)=>(
                <LoadingLog key={i}/>
              ))):logs && logs.length > 0 ? 
                logs.map((log,i)=>(
                  <Log log={log} key={i}/>
                ))
              :(<Typography variant="h4" className={`tac`} sx={{color:(theme)=>theme.palette.gray}}>No Logs Yet...</Typography>)
            }
          </Box>
          {
            totalLogs > 20 &&  <Paginate count={totalLogs%20 +1}/>
          }
        </Box>
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default LogsSection