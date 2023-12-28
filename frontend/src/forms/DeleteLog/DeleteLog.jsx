import { Box, Typography } from "@mui/material"
import LoadButton from "components/LoadButton/LoadButton"
import { AppContext } from "context/AppContext"
import { useContext } from "react"
import { DeleteButton } from "../../mui/DeleteButton"
import { PrimaryButton } from "../../mui/PrimaryButton"

const DeleteLog = ({loading}) => {
  const {handleCloseDeleteLogModal} = useContext(AppContext)
  return (
    <Box className={`grid jcs aic g30`}>
      <Typography variant="h4" className="tac">Are Sure to Delete Log ?</Typography>
      <Box className={`flex jcsb aic g20`}>
        <LoadButton loading={loading}>
          <PrimaryButton type={"submit"} >Delete</PrimaryButton>
        </LoadButton>
        <DeleteButton onClick={handleCloseDeleteLogModal} >Cancel</DeleteButton>
      </Box>
    </Box>
  )
}

export default DeleteLog