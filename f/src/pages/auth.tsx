import React from "react"
import { Box, Typography } from "@mui/material"
import RegForm from "../components/Forms/RegForm"
import useTransitionHook from "../hooks/useTransitionHook"

const Auth = () => {
  const { ref, styleTransition: st } = useTransitionHook({ delay: 1500 })
  return (
    <Box ref={ref} sx={{ ...st, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "10px", textAlign: "center" }} width="300px" m="125px auto 0" p="30px 20px">
      <Typography textAlign="center" pb="20px" variant="h5">
        Registration
      </Typography>
      <RegForm />
    </Box>
  )
}

export default Auth
