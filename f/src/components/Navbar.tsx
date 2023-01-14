import React, { useState } from "react"
import { AppBar, Button, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, useMediaQuery } from "@mui/material"
import { Menu, Collections, CardGiftcard, Person } from "@mui/icons-material"
import localFont from "@next/font/local"
import { useRouter } from "next/router"

const LogoFont = localFont({ src: "../fonts/BARTKEY.ttf" })

const Navbar = () => {
  const router = useRouter()
  const mediaQuery967 = useMediaQuery("(min-width:967px)")
  const [isDrawer, setDrawer] = useState(true)
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "primary.light" }}>
      <Grid sx={{ "& > div": { cursor: "pointer" }, "& button": { color: "primary.contrastText" } }} container columnGap="15px" justifyContent="space-between" height="80px" alignItems="center" minWidth="500px" maxWidth="1400px" m="0 auto" p="0 15px">
        {mediaQuery967 ? (
          <>
            <Grid item className={LogoFont.className} fontWeight="400" fontSize="30px" letterSpacing="10px" sx={{ color: "primary.contrastText", textShadow: "0.5px 0.5px 0 #222222", pl: 0, userSelect: "none" }} onClick={() => router.push("/")}>
              useMemorize
            </Grid>
            <Grid item ml="auto">
              <Button startIcon={<Collections />}>Popular collections</Button>
            </Grid>
            <Grid item>
              <Button startIcon={<CardGiftcard />}>Favourite cards</Button>
            </Grid>
            <Grid item onClick={() => router.push("/user/1")}>
              <Button startIcon={<Person />}>Profile</Button>
            </Grid>
          </>
        ) : (
          <Grid>
            <IconButton
              edge="start"
              sx={{ mr: 2, ml: 0 }}
              onClick={e => {
                e.preventDefault()
                setDrawer(true)
              }}>
              <Menu />
            </IconButton>
            <SwipeableDrawer anchor={"left"} open={isDrawer} onClose={() => setDrawer(false)} onOpen={() => setDrawer(true)}>
              <List>
                <ListItem>
                  <ListItemText sx={{ "& > span": { fontSize: "5vw", color: "secondary.contrastText", cursor: "pointer", fontFamily: LogoFont.style } }}>UseMemorize</ListItemText>
                </ListItem>
                <Divider />
                <ListItem sx={{ mt: "-5px", pb: 0 }}>
                  <ListItemButton>
                    <ListItemText sx={{ "& > span": { fontSize: "4vw" } }}>Profile</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ mt: "-5px", pb: 0 }}>
                  <ListItemButton>
                    <ListItemText sx={{ "& > span": { fontSize: "4vw" } }}>Cards</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ mt: "-5px", pb: 0 }}>
                  <ListItemButton>
                    <ListItemText sx={{ "& > span": { fontSize: "4vw" } }}>Collections</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </SwipeableDrawer>
          </Grid>
        )}
      </Grid>
    </AppBar>
  )
}

export default Navbar
