import { Box, styled } from "@mui/material";

export const PrimaryBox = styled(Box)(({ theme }) => ({
    paddingTop: "40px",
    paddingBottom: "40px",
    height:"100%",
    [theme.breakpoints.down("lg")]: {
        paddingTop: "35px",
        paddingBottom: "35px",
    },
    [theme.breakpoints.down("md")]: {
        paddingTop: "30px",
        paddingBottom: "30px",
    },
    [theme.breakpoints.down("sm")]: {
        paddingTop: "20px",
        paddingBottom: "20px",
    },
    [theme.breakpoints.down("xs")]: {
        paddingTop: "10px",
        paddingBottom: "10px",
    },
}));