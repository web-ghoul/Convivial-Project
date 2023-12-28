import axios from 'axios';
import { AppContext } from 'context/AppContext';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { handleAlert } from '../functions/handleAlert';
import { getLogs } from '../store/logsSlice';
import AddLog from './AddLog/AddLog';
import DeleteLog from './DeleteLog/DeleteLog';
import SearchForm from './SearchForm/SearchForm';

const server_url = process.env.REACT_APP_SERVER_URL

const Forms = ({type}) => {
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch()
  const {logId , handleCloseDeleteLogModal} = useContext(AppContext)

  //Search
  const searchValidationSchema = yup.object({
    search: yup
      .string('Enter your Search')
  });

  const searchInitialValues={
    search:""
  }

  const searchFormik = useFormik({
    initialValues: searchInitialValues,
    validationSchema: searchValidationSchema,
    onSubmit: (values) => {
      setLoading(true)
      dispatch(getLogs({count:0,search:values.search}))
      setLoading(false)
    },
  });

  //Add Log
  const addLogValidationSchema = yup.object({
    startDate: yup
      .string('Enter Start Date').required("Start Date is Required"),
    endDate: yup
      .string('Enter End Date').required("End Date is Required"),
    closerName:yup.string('Enter Closer Name').required("Closer Name is Required"),
    customerName:yup.string('Enter Customer Name').required("Customer Name is Required"),
    customerEmail:yup.string('Enter End Date').required("End Date is Required"),
    agent:yup.string('Enter Agent Name').required("Agent Name Date is Required"),
    agentNumber:yup.string('Enter Agent Number').required("Agent Number Date is Required"),
  });

  const addLogInitialValues={
    startDate:"",
    endDate: "",
    closerName:"",
    customerName:"",
    customerEmail:"",
    agent:"",
    agentNumber:"",
  }

  const addLogFormik = useFormik({
    initialValues: addLogInitialValues,
    validationSchema: addLogValidationSchema,
    onSubmit: (values) => {
      setLoading(true)
      console.log(values)
      // dispatch(getLogs({count:0,search:values.search}))
      setLoading(false)
    },
  });

  //Delete Log
  const handleDeleteLog = async(e)=>{
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${server_url}/deletePDF/${logId}`).then((res)=>{
      handleAlert(res.data.message,"success")
      handleCloseDeleteLogModal()
      dispatch(getLogs({count:0,search:""}))
    }).catch((err)=>{
      handleAlert(err.response.data.message,"error")
    })
    setLoading(false)
  }

  return (
   <form onSubmit={type === "search" ? searchFormik.handleSubmit :type === "delete_log" ? handleDeleteLog : type === "add_log" && addLogFormik.handleSubmit} style={{width:"100%"}}> 
    {
      type === "search" ? <SearchForm loading={loading} formik={searchFormik} />  : type ==="delete_log" ? <DeleteLog loading={loading}/> : type === "add_log" && <AddLog loading={loading} formik={addLogFormik}/>
    }
   </form>
  )
}

export default Forms