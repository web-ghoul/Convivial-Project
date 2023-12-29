import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { AppContext } from "context/AppContext";
import { useContext, useEffect, useState } from "react";
import LoadButton from "../../components/LoadButton/LoadButton";
import { PrimaryBox } from "../../mui/PrimaryBox";
import { PrimaryButton } from "../../mui/PrimaryButton";
import { PrimaryContainer } from "../../mui/PrimaryContainer";
import { PrimaryTextField } from "../../mui/PrimaryTextField";
import styles from "./AddLog.module.scss";
import Hotel from "./Hotel";

const AddLog = ({loading, formik}) => {
  const [value, setValue] = useState("0");
  const {numberOfHotel , handleChooseNumberOfHotel} = useContext(AppContext)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(()=>{
    let num = 0;
    if(localStorage.getItem("numberOfHotel")){
      num= JSON.parse(localStorage.getItem("numberOfHotel"))
    }
    handleChooseNumberOfHotel(num)
  },[handleChooseNumberOfHotel])

  return (
    <PrimaryBox>
      <PrimaryContainer className={`grid jcs aic g50`}>
        <Typography variant="h4" className={`tac fw700`}>Add Log</Typography>
        <Box className={`grid jcs aic g30`}> 
          <Box className={` br10 ${styles.add_log_form}`}>
            <TabContext value={value}>
              <TabList value={value} onChange={handleChange} centered className={`${styles.tabs}`}>
                {
                  new Array(+numberOfHotel).fill(0).map((_,i)=>(
                    <Tab key={i} label={`Hotel ${i+1}`} value={`${i}`}/>
                  ))
                }
              </TabList>
              {
                new Array(+numberOfHotel).fill(0).map((_,i)=>(
                  <TabPanel key={i} value={`${i}`}>
                      <Hotel index={i} />
                  </TabPanel>
                ))
              }
            </TabContext>
          </Box>

          <Box className={`pad20 br10 grid jcs aic g30 ${styles.add_log_form}`}>
            <PrimaryTextField
              fullWidth
              variant="outlined"
              type="text"
              id="name"
              name="name"
              label={"Name"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Box className={`flex jcsb aic g30 ${styles.md_wrap}`}>
              <Box className={`grid jcs aic g10`} sx={{width:"100%"}}>
                <Typography sx={{color:(theme)=>theme.palette.primary.main}} variant="h6">Start Date</Typography>
                <PrimaryTextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                  helperText={formik.touched.startDate && formik.errors.startDate}
                />
              </Box>
              <Box className={`grid jcs aic g10`} sx={{width:"100%"}}>
                <Typography sx={{color:(theme)=>theme.palette.primary.main}} variant="h6">End Date</Typography>
                <PrimaryTextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              </Box>
            </Box>
            <Box className={`flex jcsb aic g30 ${styles.md_wrap}`}>
              <PrimaryTextField
                fullWidth
                variant="outlined"
                type="text"
                id="customerName"
                name="customerName"
                label={"Customer Name"}
                value={formik.values.customerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                helperText={formik.touched.customerName && formik.errors.customerName}
              />
              <PrimaryTextField
                fullWidth
                variant="outlined"
                type="email"
                id="customerEmail"
                name="customerEmail"
                label={"Customer Email"}
                value={formik.values.customerEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
                helperText={formik.touched.customerEmail && formik.errors.customerEmail}
              />
            </Box>
            <Box className={`flex jcsb aic g30 ${styles.md_wrap}`}>
              <PrimaryTextField
                fullWidth
                variant="outlined"
                type="text"
                id="agent"
                name="agent"
                label={"Agent Name"}
                value={formik.values.agent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.agent && Boolean(formik.errors.agent)}
                helperText={formik.touched.agent && formik.errors.agent}
              />
              <PrimaryTextField
                fullWidth
                variant="outlined"
                type="text"
                id="agentNumber"
                name="agentNumber"
                label={"Agent Number"}
                value={formik.values.agentNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.agentNumber && Boolean(formik.errors.agentNumber)}
                helperText={formik.touched.agentNumber && formik.errors.agentNumber}
              />
            </Box>
          </Box>

          <LoadButton loading={loading}>
            <PrimaryButton type={"submit"}>Add Log</PrimaryButton>
          </LoadButton>
        </Box>
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default AddLog