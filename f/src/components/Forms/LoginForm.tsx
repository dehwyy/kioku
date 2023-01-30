import { Box, Button, CircularProgress, Divider } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { TextField } from "formik-mui"
import * as React from "react"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"
import { UserRequest } from "../../gql/user.gql"
import { useState } from "react"

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loginUser] = useMutation(UserRequest.loginUser)
  const loginUserAndSetToken = async <T extends Record<string, string>>({ values }: { values: T }) => {
    try {
      const { data } = await loginUser({ variables: values })
      const { user, token } = data.login
      localStorage.setItem("token", token)
      localStorage.setItem("id", user._id)
      return user._id
    } catch (e) {
      return
    }
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const userId = await loginUserAndSetToken<typeof values>({ values })
        console.log(userId)
        if (!userId) {
          setError(true)
        } else {
          await router.push(`/user/${userId}`)
          setSubmitting(false)
          resetForm()
        }
      }}>
      {({ isSubmitting }) =>
        isSubmitting ? (
          <CircularProgress data-cy="loader" />
        ) : (
          <Form style={{ margin: "0 auto", position: "relative" }} color="red">
            <Field component={TextField} name="email" type="text" label="email" data-cy="firstInput" />
            <Divider sx={{ m: "10px", visibility: "hidden" }} />
            <Field component={TextField} name="password" type="password" label="password" data-cy="secondInput" />
            <Divider sx={{ m: "10px", visibility: "hidden" }} />
            {error && (
              <Box component="span" sx={{ fontSize: "0.6rem", color: "#ed4337", position: "absolute", top: 150, left: 5 }}>
                Wrong password or email!
              </Box>
            )}
            <Button type="submit" variant="outlined" color="secondary" sx={{ mt: 1 }}>
              Submit
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}

export default LoginForm
