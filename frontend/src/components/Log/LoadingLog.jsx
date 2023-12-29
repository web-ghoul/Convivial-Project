import { Skeleton } from "@mui/material"
import styles from "./Log.module.scss"

const LoadingLog = () => {
 
  return (
    <Skeleton className={`br10 ${styles.loading_log}`} variant="rounded"/>
  )
}

export default LoadingLog