import { Button, styled } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.white,
  borderWidth: "2px",
  borderColor: theme.palette.primary.main,
  borderStyle: "solid",
  padding: "8px 20px",
  borderRadius: "10px",
  fontSize: "20px",
  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
  fontFamily: "Cairo",
  "&:hover": {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
  },
  "& svg":{
    fontSize:"26px"
  },
  [theme.breakpoints.down("lg")]: {
    padding: "6px 16px",
    fontSize: "17px",
    "& svg":{
      fontSize:"24px"
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: "6px 12px",
    fontSize: "16px",
    "& svg":{
      fontSize:"22px"
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 10px",
    fontSize: "15px",
    "& svg":{
      fontSize:"20px"
    },
  },
  [theme.breakpoints.down("xs")]: {
    padding: "4px 8px",
    fontSize: "14px",
  },
}));