import React, { useRef, useState } from "react"
import { Box, Button, Divider, Typography } from "@mui/material"
import localFont from "@next/font/local"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useRouter } from "next/router"

import useTransitionHook from "../../../hooks/useTransitionHook"
const SubtitleFont = localFont({ src: "../../../fonts/galey-r.ttf", display: "swap" })
const CarId = () => {
  const serverArr = [
    { sentence: "word112", description: "sentencesen  tencesentencese ntencesentence   entencesenten  cesente  ncesen  tencesentence" },
    { sentence: "not word", description: "ncesen  tencesentence" },
  ]
  const buttonHandler = () => {
    setOpened(false)
    if (serverArr.length - wordIndex - 1) {
      setWordIndex(prev => (prev += 1))
    } else {
      setWordIndex(0)
      setStarted(false)
    }
  }
  const KOSTblLb = () => {
    setStarted(true)
    setTimeout(() => {
      boxRef.current.style.top = 0
      boxRef.current.style.opacity = 1
    }, 0)
  }

  const [isStarted, setStarted] = useState(false)
  const [isOpened, setOpened] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const router = useRouter()
  const { ref, styleTransition } = useTransitionHook({ delay: 1500, triggerOnce: false })
  const boxRef = useRef(null)
  return isStarted ? (
    <Box ref={boxRef} position="relative" mt="150px" bgcolor="white" maxWidth="500px" minWidth="300px" p="30px" textAlign="center" sx={{ borderRadius: "10px", boxShadow: "3px 3px 1px #222222", border: "3px solid #222222", transition: "1s ease", top: 25, opacity: 1 }}>
      <KeyboardBackspaceIcon
        sx={{ position: "absolute", top: 5, left: 5, cursor: "pointer" }}
        onClick={() => {
          router.back()
        }}
      />
      <Typography pb="15px" style={SubtitleFont.style} fontWeight="600" fontSize="1.2rem">
        {"Quiz-card name"}
      </Typography>
      <Box
        p="15px"
        width="100%"
        sx={{ cursor: "pointer", borderRadius: "10px", boxShadow: "3px 3px 10px #222222", border: "3px solid #222222" }}
        onClick={() => {
          setOpened(prev => !prev)
        }}>
        <Typography fontSize="1rem">
          {serverArr[wordIndex].sentence}
          {isOpened && (
            <>
              <Divider color="black" sx={{ m: "10px 0 15px" }} />
              {serverArr[wordIndex].description}
            </>
          )}
        </Typography>
      </Box>
      {isOpened && (
        <Box pt="30px" width="100%" display="flex" gap="50px" justifyContent="center">
          <Button variant="contained" color="info" sx={{ width: 155 }} onClick={buttonHandler}>
            Retry soon
          </Button>
          <Button variant="contained" color="success" sx={{ width: 155 }} onClick={buttonHandler}>
            Alright!
          </Button>
        </Box>
      )}
    </Box>
  ) : (
    <Box ref={ref} mt="150px" bgcolor="white" width="512px" p="30px" textAlign="center" sx={{ borderRadius: "10px", boxShadow: "3px 3px 1px #222222", border: "3px solid #222222", ...styleTransition }}>
      <Typography align="center" sx={{ m: "30px 0 15px", textDecoration: "underline #222222" }} fontSize="1.2rem" fontWeight="600" style={SubtitleFont.style}>
        There should be title
      </Typography>
      <Typography style={SubtitleFont.style}>
        <Typography fontWeight="600" display="inline" pr="5px">
          727
        </Typography>
        words
      </Typography>
      <Box textAlign="center" pt="50px">
        <Button variant="contained" color="warning" size="large" onClick={KOSTblLb}>
          Begin learning
        </Button>
      </Box>
    </Box>
  )
}

export default CarId
