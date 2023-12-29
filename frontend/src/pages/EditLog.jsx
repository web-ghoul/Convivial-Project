import Forms from "forms/Forms"
import { SpecialBox } from "mui/SpecialBox"
import { useSelector } from "react-redux"

const EditLog = () => {
  const {isLoading} = useSelector((state)=>state.log)

  return (
    <SpecialBox>
      {
        isLoading ?(<></>) :(
          <Forms type={"add_log"}/>
        )
      }
    </SpecialBox>
  )
}

export default EditLog