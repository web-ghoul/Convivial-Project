import { DeleteRounded, DownloadRounded, EditRounded, EmailRounded } from "@mui/icons-material"
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material"
import { useContext } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getLog } from "store/logSlice"
import { AppContext } from "../../context/AppContext"
import styles from "./Log.module.scss"

const Log = ({log}) => {
  const {handleOpenDeleteLogModal} = useContext(AppContext)
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const handleEdit = ()=>{
    navigate(`${process.env.REACT_APP_EDIT_LOG_ROUTE}`)
    dispatch(getLog({id:log._id}))
  }

  const handleViewLog=()=>{
    navigate(`${process.env.REACT_APP_LOG_ROUTE}/${log._id}`)
  }
  return (
    <Paper className={`grid jcsb aic g30 br10 ${styles.log}`}>
      <Typography onClick={handleViewLog} variant="h5" className="pad20 fw700">{log.Name}</Typography>
      <Box className={`flex jcfe aic pad20 g5`}>
        <Tooltip title={"Edit"}>
          <IconButton onClick={handleEdit} className={`${styles.option_button}`}>
            <EditRounded sx={{color:(theme)=>theme.palette.facebook}} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Download PDF"}>
          <IconButton className={`${styles.option_button}`}>
            <DownloadRounded sx={{color:(theme)=>theme.palette.whatsapp}} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Email"}>
          <IconButton className={`${styles.option_button}`}>
            <EmailRounded sx={{color:(theme)=>theme.palette.yellow}} />
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