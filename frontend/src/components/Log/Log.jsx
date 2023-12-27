import { MoreVertRounded } from "@mui/icons-material"
import { IconButton, Paper, Typography } from "@mui/material"
import styles from "./Log.module.scss"

const Log = ({log}) => {
  console.log(log)
  return (
    <Paper className={`flex jcsb aic g30 pad20 ${styles.log}`}>
      <Typography variant="h5" className="fw700">{log.Name}</Typography>
      <IconButton>
        <MoreVertRounded/>
      </IconButton>
    </Paper>
  )
}

export default Log