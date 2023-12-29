import axios from 'axios';
import { AppContext } from 'context/AppContext';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const {log} = useSelector((state)=>state.log)
  const {logId,chosenHotels , handleCloseDeleteLogModal} = useContext(AppContext)
  const navigate = useNavigate()

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
    name: yup
    .string('Enter Name').required("Name is Required"),
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
    name:log ? log.Name : "",
    startDate:log ? new Date(log.StartDate).toISOString().split('T')[0] : "",
    endDate: log ? new Date(log.EndDate).toISOString().split('T')[0] : "",
    closerName:log ? log.CloserName : "",
    customerName:log ? log.CustomerName : "",
    customerEmail:log ? log.CustomerEmail : "",
    agent:log ? log.Agent : "",
    agentNumber:log ? log.AgentNumber : "",
  }

  const addLogFormik = useFormik({
    initialValues: addLogInitialValues,
    validationSchema: addLogValidationSchema,
    onSubmit: async(values,{resetForm}) => {
      let done=true
      let hotels = []
      chosenHotels.map((h ,i)=>{
        if(h.data === null || h.price === null){
          if(h.data === null){
            handleAlert(`Please Choose Hotel ${i+1}`,"error")
          }
          if(h.price === null){
            handleAlert(`Please Choose Hotel Price ${i+1}`,"error")
          }
          done=false
        }else{
          hotels.push({Id:h.data._id,Price:h.price})
        }
        return 0;
      })
      if(!done){
        return
      }
      values.hotels = hotels
      setLoading(true)
      await axios.post(`${server_url}/addPDF`,values).then((res)=>{
        handleAlert(res.data.message,"success")
        resetForm()
        navigate(`${process.env.REACT_APP_HOME_ROUTE}`)
        dispatch(getLogs({count:0,search:""}))
      }).catch((err)=>{
        handleAlert(err.response.data.message,"success")
      }) 
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