import React from "react"
import { Box } from "@mui/material"
import Link from "next/link"

const NotAuthedNav = () => {
  return (
    <Box display="flex" justifyContent="space-between" width="100%" sx={{ "& a": { display: "block" } }}>
      <Link href="/">Main page</Link>
      <Link href="/auth">Sign up</Link>
    </Box>
  )
}

export default NotAuthedNav
