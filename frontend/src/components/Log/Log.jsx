import { MoreVertRounded } from "@mui/icons-material"
import { Paper, Typography } from "@mui/material"
import styles from "./Log.module.scss"

const Log = ({log}) => {
  console.log(log)
  return (
    <Paper className={`flex jcsb aic g30 pad10 ${styles.log}`}>
      <Typography variant="h5"></Typography>
      <MoreVertRounded/>
    </Paper>
  )
}

export default Log