import React from "react"
import Collections from "../components/Collections"
import { Box, Typography } from "@mui/material"
import localFont from "@next/font/local"
import { useInView } from "react-intersection-observer"
const TitleFont = localFont({ src: "../fonts/galey-r.ttf", weight: "500" })
const FieldFont2 = localFont({ src: "../fonts/aquire-bold.otf" })
const PopularCollections = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1500,
    trackVisibility: true,
  })
  const styleTransition = prop => ({ transition: "1s ease", transform: prop ? "translateY(0)" : "translateY(25px)", opacity: inView ? "1" : "0" })

  return (
    <Box ref={ref} sx={styleTransition(inView)}>
      <Typography align="center" sx={{ m: "50px 0" }} fontSize="2rem" style={FieldFont2.style}>
        Collections
      </Typography>
      <Collections />
    </Box>
  )
}

export default PopularCollections
