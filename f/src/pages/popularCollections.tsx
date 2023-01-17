import React from "react"
import Collections from "../components/Collections"
import { Box, Typography } from "@mui/material"
import localFont from "@next/font/local"
import useTransitionHook from "../hooks/useTransitionHook"

const SubTitleFont = localFont({ src: "../fonts/aquire-bold.otf", display: "swap" })
const PopularCollections = () => {
  const { ref, styleTransition: st } = useTransitionHook({ delay: 1500 })
  return (
    <Box ref={ref} sx={st}>
      <Typography align="center" sx={{ m: "50px 0" }} fontSize="2rem" fontWeight="400" style={SubTitleFont.style}>
        Collections
      </Typography>
      <Collections />
    </Box>
  )
}

export default PopularCollections
