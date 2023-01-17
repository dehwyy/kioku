import { Button, CircularProgress, Divider, InputAdornment, LinearProgress } from "@mui/material"
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-mui"
import * as React from "react"
import { AccountCircle } from "@mui/icons-material"
import { useRouter } from "next/router"

interface inLoginData {
  email: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values)
        setTimeout(() => {
          setSubmitting(false)
          resetForm()
          router.push("/user/1")
        }, 500)
      }}>
      {({ submitForm, isSubmitting }) =>
        isSubmitting ? (
          <CircularProgress data-cy="loader" />
        ) : (
          <Form style={{ margin: "0 auto" }} color="red">
            <Field component={TextField} name="email" type="text" label="email" data-cy="firstInput" />
            <Divider sx={{ m: "10px", visibility: "hidden" }} />
            <Field component={TextField} name="password" type="password" label="password" data-cy="secondInput" />
            <Divider sx={{ m: "10px", visibility: "hidden" }} />
            <Button type="submit" variant="outlined" color="secondary">
              Submit
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}

export default LoginForm
