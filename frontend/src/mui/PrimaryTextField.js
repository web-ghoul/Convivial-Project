import { TextField, styled } from "@mui/material";

export const PrimaryTextField = styled(TextField)(({ theme }) => ({
    "& input , & select , & option": {
        fontSize: "22px",
        backgroundColor:theme.palette.white
    },
    "& input": {
        padding: "10px"
    },
    "& svg": {
        fontSize: "25px"
    },
    [theme.breakpoints.down("lg")]: {
        "& input": {
            padding: "9px"
        },
        "& input , & select , & option": {
            fontSize: "20px"
        },
        "& svg": {
            fontSize: "22px"
        },
    },
    [theme.breakpoints.down("md")]: {
        "& input , & select , & option": {
            fontSize: "18px"
        }
    },
    [theme.breakpoints.down("sm")]: {
        "& input": {
            padding: "10px"
        },
        "& input , & select , & option": {
            fontSize: "16px"
        },
        "& svg": {
            fontSize: "20px"
        },
    },
    [theme.breakpoints.down("xs")]: {
        "& input , & select , & option": {
            fontSize: "14px"
        },
        "& svg": {
            fontSize: "18px"
        },
    },
}));