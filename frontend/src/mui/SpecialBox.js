import { Box, styled } from "@mui/material";

export const SpecialBox = styled(Box)(({ theme }) => ({
    paddingTop: "80px",
    [theme.breakpoints.down("lg")]: {
        paddingTop: "75px",
    },
    [theme.breakpoints.down("md")]: {
        paddingTop: "70px",
    },
    [theme.breakpoints.down("sm")]: {
        paddingTop: "65px",
    },
    [theme.breakpoints.down("xs")]: {
        paddingTop: "60px",
    },
}));