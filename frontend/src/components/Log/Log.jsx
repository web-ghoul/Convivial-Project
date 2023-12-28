import { DeleteRounded, EditRounded } from "@mui/icons-material"
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import styles from "./Log.module.scss"

const Log = ({log}) => {
  const {handleOpenDeleteLogModal} = useContext(AppContext)

  return (
    <Paper className={`flex jcsb aic g30 pad20 br10 ${styles.log}`}>
      <Typography variant="h5" className="fw700">{log.Name}</Typography>
      <Box className={`flex jcfe aic g5`}>
        <Tooltip title={"Edit"}>
          <IconButton className={`${styles.option_button}`}>
            <EditRounded sx={{color:(theme)=>theme.palette.facebook}} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete"}>
          <IconButton onClick={()=>handleOpenDeleteLogModal(log._id)} className={`${styles.option_button}`}>
            <DeleteRounded sx={{color:(theme)=>theme.palette.youtube}} />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  )
}

export default Log