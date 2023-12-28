import { Box, Modal } from "@mui/material"
import { AppContext } from "context/AppContext"
import Forms from "forms/Forms"
import { useContext } from "react"
import "./modal.scss"

const DeleteLogModal = () => {
  const {openDeleteLogModal,handleCloseDeleteLogModal} = useContext(AppContext)
  return (
    <Modal
      open={openDeleteLogModal}
      onClose={handleCloseDeleteLogModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal br10 pad20 flex jcs aic center_abs_x_y">
        <Forms type={"delete_log"} />
      </Box>
    </Modal>
  )
}

export default DeleteLogModal