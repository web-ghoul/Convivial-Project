import { DeleteRounded, DownloadRounded, EditRounded, EmailRounded } from "@mui/icons-material"
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material"
import { useContext } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getLog } from "store/logSlice"
import { AppContext } from "../../context/AppContext"
import styles from "./Log.module.scss"

const Log = ({log}) => {
  const generatePDF = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/generate-pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  const {handleOpenDeleteLogModal,handleOpenDownloadLogModal} = useContext(AppContext)
  const navigate=useNavigate()
  const dispatch = useDispatch()

  const handleEdit = ()=>{
    dispatch(getLog({id:log._id}))
    navigate(`${process.env.REACT_APP_EDIT_LOG_ROUTE}`)
  }

  const handleViewLog=()=>{
    navigate(`${process.env.REACT_APP_LOG_ROUTE}/${log._id}`)
  }

  const handleDownload =()=>{
    dispatch(getLog({id:log._id}))
    handleOpenDownloadLogModal()
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
          <IconButton onClick={handleDownload} className={`${styles.option_button}`}>
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
        <button onClick={generatePDF}>Generate PDF</button>
      </Box>
    </Paper>
    
  )
}

export default Log