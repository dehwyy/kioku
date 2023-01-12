import { AppProps } from "next/app"
import { Roboto as Font } from "@next/font/google"
import { Spline_Sans_Mono } from "@next/font/google"
import "../styles/app.scss"
import Wrapper from "../components/Wrapper"
import { createTheme, ThemeProvider } from "@mui/material"

const ff = Font({
  style: "normal",
  weight: ["500", "700"],
  subsets: ["latin"],
})
const ssm = Spline_Sans_Mono({
  style: "normal",
})
const theme = createTheme({
  palette: {
    text: {
      primary: "#FFF",
      secondary: "#696969",
    },
  },
  typography: {
    subtitle2: {
      fontSize: "1.2em",
      transition: "0.2s ease",
      textAlign: "center",
      "&:hover": {
        cursor: "pointer",
        color: "#0288d1",
      },
    },
  },
})
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper font={ff.className}>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  )
}
