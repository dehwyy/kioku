import React, { FC } from "react"
import Navbar from "./Navbar"
import { Box } from "@mui/material"

interface wrapperProps {
  children: React.ReactNode
  font: string
}

const Wrapper: FC<wrapperProps> = ({ children, font }) => {
  return (
    <Box
      className={font}
      sx={{
        height: "100vh",
        width: "100vw",
      }}>
      <Navbar />
      <Box pt="80px" minWidth="500px" maxWidth="1024px" m="0 auto">
        {children}
      </Box>
    </Box>
  )
}

export default Wrapper
