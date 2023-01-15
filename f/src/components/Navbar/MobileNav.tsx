import React, { useState } from "react"
import { Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer } from "@mui/material"
import { Menu } from "@mui/icons-material"
import localFont from "@next/font/local"

const LogoFont = localFont({ src: "../../fonts/aquire-bold.otf" })
const MobileNav = () => {
  const [isDrawer, setDrawer] = useState(true)
  return (
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
  )
}

export default MobileNav
