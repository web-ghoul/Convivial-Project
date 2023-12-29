import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";

export const PrimaryLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.white,
  borderWidth: "2px",
  borderColor: theme.palette.primary.main,
  borderStyle: "solid",
  padding: "22px !important",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px;",
  fontFamily: "Cairo",
  "& svg": {
    color: theme.palette.white
  },
  "&:hover": {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("lg")]: {
    borderRadius: "9px",
    padding: "18px",
  },
  [theme.breakpoints.down("md")]: {
    borderRadius: "8px",
    padding: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: "6px",
    padding: "14px",
  },
  [theme.breakpoints.down("sx")]: {
    borderRadius: "4px",
    padding: "10px",
  },
}));