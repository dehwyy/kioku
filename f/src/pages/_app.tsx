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
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#97caef",
      contrastText: "#696969",
    },
    secondary: {
      main: "#55bcc9",
      contrastText: "#222222",
    },
    info: {
      main: "#3a5199",
    },
  },
})
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper font={ff.className}>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  )
}
