import { Pagination, Stack } from "@mui/material";
import { AppContext } from "context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLogs } from "store/logsSlice";

const Paginate = ({count}) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch()
  const {searchQuery} = useContext(AppContext)

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(()=>{
    dispatch(getLogs({count:page-1,search:searchQuery}))
  },[page,dispatch,searchQuery])

  return (
    <Stack spacing={2}>
      <Pagination count={count}  variant="outlined" color="primary" onChange={handleChange} />
    </Stack>
  )
}

export default Paginate