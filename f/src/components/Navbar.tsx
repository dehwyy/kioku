import React, { useEffect, useState } from "react"
import { AppBar, Grid, useMediaQuery } from "@mui/material"
import DefaultNav from "./Navbar/DefaultNav"
import MobileNav from "./Navbar/MobileNav"
import NotAuthedNav from "./Navbar/NotAuthedNav"

const Navbar = () => {
  const [token, setToken] = useState("")
  const mediaQuery994 = useMediaQuery("(min-width:994px)")
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  })
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "primary.light" }}>
      <Grid sx={{ "& > div": { cursor: "pointer" }, "& button": { color: "primary.contrastText" } }} container columnGap="15px" justifyContent="space-between" height="80px" alignItems="center" minWidth="500px" maxWidth="1400px" m="0 auto" p="0 15px">
        {token ? mediaQuery994 ? <DefaultNav /> : <MobileNav /> : <NotAuthedNav />}
      </Grid>
    </AppBar>
  )
}

export default Navbar
