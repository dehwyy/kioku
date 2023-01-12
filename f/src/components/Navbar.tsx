import React from "react"
import {
  AppBar,
  Box,
  Button,
  Grid,
  styled,
  Toolbar,
  Typography,
} from "@mui/material"
import Link from "next/link"
import localFont from "@next/font/local"
const LogoFont = localFont({ src: "../fonts/logo-font.otf" })

const CustomToolbar = styled(Toolbar)`
  background-color: white;
  height: max-content;
  font-weight: 700;
  color: ${props => props.theme.palette.text.secondary};
  display: flex;
  align-items: center;
`

const CustomLogo = styled(Typography)`
  font-size: 2em;
  user-select: none;
  position: relative;
  top: -3.5px;
  &:hover {
    color: ${props => props.theme.palette.text.secondary};
  }
`
const Navbar = () => {
  return (
    <AppBar position="static">
      <CustomToolbar variant="dense">
        <Link
          href={"/cards"}
          style={{
            marginRight: "auto",
          }}>
          <CustomLogo variant="subtitle2" className={LogoFont.className}>
            UseMemorize
          </CustomLogo>
        </Link>
        <Typography variant="subtitle2">Photos</Typography>
      </CustomToolbar>
    </AppBar>
  )
}

export default Navbar
