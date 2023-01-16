import { AppProps } from "next/app"
import { Roboto as Font } from "@next/font/google"
import { Spline_Sans_Mono } from "@next/font/google"
import "../styles/app.scss"
import Wrapper from "../components/Wrapper"
import { createTheme, ThemeProvider } from "@mui/material"
import Head from "next/head"

const ff = Font({
  style: "normal",
  weight: ["500", "700"],
  subsets: ["latin"],
})
const ssm = Spline_Sans_Mono({
  style: "normal",
  subsets: ["latin"],
})
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#97caef",
      contrastText: "#696969",
      light: "#fff",
    },
    secondary: {
      main: "#55bcc9",
      contrastText: "#222222",
    },
    info: {
      main: "#3a5199",
    },
    success: {
      main: "rgb(84,188,68)",
      contrastText: "#fff",
    },
    warning: {
      main: "rgba(159,237,215,0.7)",
    },
  },
})
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>useMemorize</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <Wrapper font={ff.className}>
          <Component {...pageProps} />
        </Wrapper>
      </ThemeProvider>
    </>
  )
}
