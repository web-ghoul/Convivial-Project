import { SpecialBox } from "mui/SpecialBox"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getLog } from "store/logSlice"

export const LogPage = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getLog({id}))
  },[id,dispatch])
  
  return (
    <SpecialBox></SpecialBox>
  )
}
