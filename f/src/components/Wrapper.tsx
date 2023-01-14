import React, { FC } from "react"
import Navbar from "./Navbar"
import { Box, Link, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { GitHub } from "@mui/icons-material"

interface wrapperProps {
  children: React.ReactNode
  font: string
}

const Wrapper: FC<wrapperProps> = ({ children, font }) => {
  const { pathname } = useRouter()
  const notIsLoginForm = pathname !== "/login"
  return (
    <Box
      className={font}
      display="flex"
      flexDirection="column"
      sx={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}>
      {notIsLoginForm && <Navbar />}
      <Box p="80px 50px 0" minWidth="300px" maxWidth="1024px" m="0 auto" display="flex" flex="1 1 auto" flexDirection="column">
        {!notIsLoginForm ? (
          children
        ) : (
          <>
            <Box flex="1 1 auto" minHeight="800px">
              {children}
            </Box>
            <Box textAlign="center" p="50px 0 15px 0">
              <Box component="span" pr="10px">
                Creator:
              </Box>
              <GitHub sx={{ position: "relative", top: "7px", right: "5px" }} />
              <Link target="_blank" href="https://github.com/dehwyy">
                dehwyy
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Wrapper
