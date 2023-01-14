import * as React from "react"
import LoginForm from "../components/Forms/LoginForm"
import { Box, Typography } from "@mui/material"

const Login = () => {
  return (
    <Box sx={{ backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "10px", textAlign: "center" }} width="300px" m="125px auto 0" p="30px 20px">
      <Typography textAlign="center" pb="20px" variant="h5">
        Login
      </Typography>
      <LoginForm />
    </Box>
  )
}

export default Login
