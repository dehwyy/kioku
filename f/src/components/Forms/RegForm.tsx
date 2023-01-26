import { Button, CircularProgress, Divider } from "@mui/material"
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-mui"
import * as React from "react"
import { useRouter } from "next/router"

const RegForm = () => {
  const router = useRouter()
  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          setSubmitting(false)
          resetForm()
          router.push("/user/1")
        }, 500)
      }}>
      {({ isSubmitting }) =>
        isSubmitting ? (
          <CircularProgress data-cy="loader" />
        ) : (
          <Form style={{ margin: "0 auto" }} color="red">
            <Field component={TextField} name="username" type="text" label="username" data-cy="firstInput" />
            <Divider sx={{ m: "10px", visibility: "hidden" }} />
            <Field component={TextField} name="email" type="text" label="email" data-cy="secondInput" />
            <Divider sx={{ m: "10px", visibility: "hidden" }} />
            <Field component={TextField} name="password" type="password" label="password" data-cy="thirdInput" />
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

export default RegForm
