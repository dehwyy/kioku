import React, { useState } from "react"
import { AppBar, Button, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, useMediaQuery } from "@mui/material"
import { Menu, Collections, CardGiftcard, Person } from "@mui/icons-material"
import localFont from "@next/font/local"
import { useRouter } from "next/router"
import Link from "next/link"
import DefaultNav from "./Navbar/DefaultNav"
import MobileNav from "./Navbar/MobileNav"

const Navbar = () => {
  const mediaQuery994 = useMediaQuery("(min-width:994px)")
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "primary.light" }}>
      <Grid sx={{ "& > div": { cursor: "pointer" }, "& button": { color: "primary.contrastText" } }} container columnGap="15px" justifyContent="space-between" height="80px" alignItems="center" minWidth="500px" maxWidth="1400px" m="0 auto" p="0 15px">
        {mediaQuery994 ? <DefaultNav /> : <MobileNav />}
      </Grid>
    </AppBar>
  )
}

export default Navbar
