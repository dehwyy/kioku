import { Button, CircularProgress, Divider } from "@mui/material"
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-mui"
import * as React from "react"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"
import { UserRequest } from "../../gql/user.gql"

const LoginForm = () => {
  const router = useRouter()
  const [loginUser] = useMutation(UserRequest.loginUser)
  const loginUserAndSetToken = async <T extends Record<string, string>>({ values }: { values: T }) => {
    const { data } = await loginUser({ variables: values })
    const { user, token } = data.login
    localStorage.setItem("token", token)
    return user._id
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const userId = await loginUserAndSetToken<typeof values>({ values })
        setSubmitting(false)
        resetForm()
        console.log(userId)
        if (!userId) {
          console.log("ERROR") // Change to 'error' label
        }
        await router.push(`/user/${userId}`)
      }}>
      {({ isSubmitting }) =>
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
