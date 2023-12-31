import { DownloadRounded } from "@mui/icons-material"
import { Box, Modal, Skeleton, Typography } from "@mui/material"
import { AppContext } from "context/AppContext"
import { DeleteButton } from "mui/DeleteButton"
import { PrimaryButton } from "mui/PrimaryButton"
import { PrimaryTextField } from "mui/PrimaryTextField"
import { useContext, useRef, useState } from "react"
import { useSelector } from "react-redux"
import "./modal.scss"

const DownloadLogModal = () => {
  const [fileName, setFileName] = useState("BTB_Log")
  const {openDownloadLogModal,handleCloseDownloadLogModal} = useContext(AppContext)
  const {log ,isLoading} = useSelector((state)=>state.log)
  const componentRef = useRef()

  const handleDownload=()=>{
  
  }
  
  return (
    <Modal
      open={openDownloadLogModal}
      onClose={handleCloseDownloadLogModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box ref={componentRef} className="modal br10 pad20 grid jcs aic g30 center_abs_x_y">
        {
          isLoading ? (
            <Skeleton variant="rounded" sx={{ height: "300px" }} />
          ):(
            <>
              <Box className={`flex jcc aic g10`}>
                <DownloadRounded sx={{color:(theme)=>theme.palette.whatsapp}} />
                <Typography variant="h4" className={`tac`}>Download PDF</Typography>
              </Box>
              <PrimaryTextField
                fullWidth
                variant="outlined"
                type="text"
                id="fileName"
                name="fileName"
                label={"File Name"}
                value={fileName}
                onChange={(e)=>setFileName(e.target.value)}
              />
              <Box className={`flex jcsb aic g30`}>
                <DeleteButton onClick={handleCloseDownloadLogModal}>Cancel</DeleteButton>
                <PrimaryButton onClick={handleDownload}>Download</PrimaryButton>
              </Box>
            </>
          )
        }
        
      </Box>
    </Modal>
  )
}

export default DownloadLogModal