import React from "react"
import { Button, Grid } from "@mui/material"
import Link from "next/link"
import { CardGiftcard, Collections, Person } from "@mui/icons-material"
import localFont from "@next/font/local"

const LogoFont = localFont({ src: "../../fonts/aquire-bold.otf", display: "swap", weight: "600" })
const DefaultNav = () => {
  return (
    <>
      <Link href="/" className={LogoFont.className}>
        <Grid data-cy="rootPage" item fontSize="30px" letterSpacing="10px" sx={{ color: "primary.contrastText", textShadow: "0.5px 0.5px 0 #222222", pl: 0, userSelect: "none" }}>
          useMemorize
        </Grid>
      </Link>
      <Grid item ml="auto">
        <Link href={"/popularCollections"}>
          <Button data-cy="collectionsPage" startIcon={<Collections />}>
            Popular collections
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href={"/cards"}>
          <Button data-cy="cardsPage" startIcon={<CardGiftcard />}>
            Favourite cards
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href={`/user/${localStorage.getItem("id")}`}>
          <Button data-cy="profilePage" startIcon={<Person />}>
            Profile
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default DefaultNav
