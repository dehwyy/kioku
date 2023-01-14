import React, { useState } from "react"
import { useRouter } from "next/router"
import { Box, Tab, Tabs, Typography } from "@mui/material"
import Image from "next/image"
import Collections from "../../components/Collections"
import Cards from "../../components/Cards"
import { useInView } from "react-intersection-observer"
import localFont from "@next/font/local"
type TabsValuesT = "collections" | "cards" | "three"

const LogoFont = localFont({ src: "../../fonts/galey-r.ttf" })
const Id = () => {
  const { query } = useRouter()
  const [value, setValue] = useState<TabsValuesT>("collections")
  const profileImage = "https://cdn.icon-icons.com/icons2/2406/PNG/512/user_account_icon_145918.png"
  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1500,
    trackVisibility: true,
  })
  const styleTransition = prop => ({ transition: "1s ease", transform: prop ? "translateY(0)" : "translateY(50px)", opacity: inView ? "1" : "0" })
  const handleChange = (event: React.SyntheticEvent, newValue: TabsValuesT) => {
    setValue(newValue)
  }
  return (
    <Box width="800px" minHeight="90vh" p="50px 50px 50px" m="50px 0 0 0" borderRadius="10px" ref={ref} sx={styleTransition(inView)}>
      <Box display="flex" gap="25px" justifyContent="center" width="100%" mb="30px" sx={{ backgroundColor: "rgba(255, 255, 255, 1)", border: "2px solid #222222", boxShadow: "2px 2px 1px #222222" }}>
        <Image src={profileImage} alt="image" width="200" height="200" />
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Typography pt="50px" style={LogoFont.style} fontWeight="600" fontSize="2rem">
            Username
          </Typography>
          <Tabs value={value} onChange={handleChange} sx={{ pb: "25px" }}>
            <Tab value="collections" label="collections" />
            <Tab value="cards" label="cards" />
            <Tab value="three" label="<empty>" />
          </Tabs>
        </Box>
      </Box>
      {value === "collections" ? <Collections /> : value === "cards" ? <Cards /> : <>empty</>}
    </Box>
  )
}

export default Id
