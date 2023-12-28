import { styled } from "@mui/material";
import { PrimaryButton } from "./PrimaryButton";

export const DeleteButton = styled(PrimaryButton)(({ theme }) => ({
  backgroundColor: theme.palette.youtube,
  color: theme.palette.white,
  borderColor:theme.palette.youtube,
  "&:hover": {
    backgroundColor: theme.palette.white,
    color: theme.palette.youtube,
  },
}));