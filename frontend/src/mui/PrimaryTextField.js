import { TextField, styled } from "@mui/material";

export const PrimaryTextField = styled(TextField)(({ theme }) => ({
    "& input , & select , & option": {
        fontSize: "20px"
    },
    "& svg": {
        fontSize: "25px"
    },
    [theme.breakpoints.down("lg")]: {
        "& input": {
            padding: "15px"
        },
        "& input , & select , & option": {
            fontSize: "18px"
        },
        "& svg": {
            fontSize: "22px"
        },
    },
    [theme.breakpoints.down("md")]: {
        "& input": {
            padding: "14px"
        },
        "& input , & select , & option": {
            fontSize: "17px"
        }
    },
    [theme.breakpoints.down("sm")]: {
        "& input": {
            padding: "12px"
        },
        "& input , & select , & option": {
            fontSize: "14px"
        },
        "& svg": {
            fontSize: "20px"
        },
    },
    [theme.breakpoints.down("xs")]: {
        "& input , & select , & option": {
            fontSize: "12px"
        },
        "& svg": {
            fontSize: "18px"
        },
    },
}));