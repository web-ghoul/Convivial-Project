import { Box, Skeleton } from "@mui/material"
import styles from "./EditLog.module.scss"

const LoadingEditLog = () => {
  return (
    <Box className={`grid jcs aic g30 ${styles.loading_add_log}`}> 
      <Skeleton className={` br10 ${styles.loading_add_log_form}`} variant="rounded" />

      <Skeleton  variant="rounded" className={`pad20 br10 grid jcs aic g30 ${styles.loading_add_log_form}`}/>

      <Skeleton  variant="text" className={`pad20 br10 grid jcs aic g30 ${styles.loading_add_log_form_button}`}/>
    </Box>
  )
}

export default LoadingEditLog