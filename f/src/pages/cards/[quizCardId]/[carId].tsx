import React, { useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import localFont from "@next/font/local"
const FieldFont2 = localFont({ src: "../../../fonts/galey-r.ttf", display: "swap" })
const CarId = () => {
  const [isStarted, setStarted] = useState(false)
  return isStarted ? (
    <Box mt="150px">
      <Box>123</Box>
    </Box>
  ) : (
    <Box mt="150px" bgcolor="white" width="512px" p="30px" textAlign="center" sx={{ borderRadius: "10px", boxShadow: "3px 3px 1px #222222", border: "3px solid #222222" }}>
      <Typography align="center" sx={{ m: "30px 0 15px", textDecoration: "underline #222222" }} fontSize="1.2rem" fontWeight="600" style={FieldFont2.style}>
        There should be title
      </Typography>
      <Typography style={FieldFont2.style}>
        <Typography fontWeight="600" display="inline" pr="5px">
          727
        </Typography>
        words
      </Typography>
      <Box textAlign="center" pt="50px">
        <Button variant="contained" color="warning" size="large" onClick={() => setStarted(true)}>
          Begin learning
        </Button>
      </Box>
    </Box>
  )
}

export default CarId
