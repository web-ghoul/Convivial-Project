import { Box, Typography } from "@mui/material";
import { formattedDate } from "functions/formattedDate";
import styles from "./LogInfo.module.scss";

const LogInfo = ({log}) => {
  
  return (
    <Box className={`grid jcs aic g20`}>
      <Typography variant='h5' className={`fw700`}>Info</Typography>
      <Box className={`${styles.infos} grid jcs aic g30 pad20 br10`}>
        <Box className={`flex_wrap flex jcfs aic g5 ${styles.info}`}>
          <Typography variant="h6">Start Date : </Typography>
          <Typography sx={{color:(theme)=>theme.palette.primary.main}} variant="h6">{formattedDate(log.StartDate)}</Typography>
        </Box>
        <Box className={`flex_wrap flex jcfs aic g5 ${styles.info}`}>
          <Typography variant="h6">End Date : </Typography>
          <Typography sx={{color:(theme)=>theme.palette.primary.main}} variant="h6">{formattedDate(log.EndDate)}</Typography>
        </Box>
        <Box className={`flex_wrap flex jcfs aic g5 ${styles.info}`}>
          <Typography variant="h6">Customer Name : </Typography>
          <Typography sx={{color:(theme)=>theme.palette.primary.main}} variant="h6">{log.CustomerName}</Typography>
        </Box>
        <Box className={`flex_wrap flex jcfs aic g5 ${styles.info}`}>
          <Typography variant="h6">Customer Email : </Typography>
          <Typography sx={{color:(theme)=>theme.palette.primary.main}} variant="h6">{log.CustomerEmail}</Typography>
        </Box>
        <Box className={`flex_wrap flex jcfs aic g5 ${styles.info}`}>
          <Typography variant="h6">Agent Name : </Typography>
          <Typography sx={{color:(theme)=>theme.palette.primary.main}} variant="h6">{log.Agent}</Typography>
        </Box>
        <Box className={`flex_wrap flex jcfs aic g5 ${styles.info}`}>
          <Typography variant="h6">Agent Number : </Typography>
          <Typography sx={{color:(theme)=>theme.palette.primary.main}} variant="h6">{log.AgentNumber}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LogInfo