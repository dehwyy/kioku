import { Box, Button, CircularProgress, Divider } from "@mui/material"
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-mui"
import * as React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useMutation } from "@apollo/client"
import { UserRequest } from "../../gql/user.gql"

const RegForm = () => {
  const router = useRouter()
  const [createUser] = useMutation(UserRequest.createUser)
  const [checkIfUserWithSuchUsernameAlreadyExists, { loading }] = useMutation(UserRequest.getUserByUsername)
  const createUserAndSetToken = async <T extends Record<string, string>>({ values }: { values: T }) => {
    const { data } = await createUser({ variables: values })
    if (!data) return
    const { user, token } = data.register
    localStorage.setItem("token", token)
    return user._id
  }
  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const newUserId = await createUserAndSetToken<typeof values>({ values })
        if (newUserId) {
          await router.push(`/user/${newUserId}`)
        }
        setSubmitting(false)
        resetForm()
      }}
      validate={async values => {
        const errors: Partial<typeof values> = {}
        if (!values.email) {
          errors.email = "Required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = "Invalid email address"
        }
        if (!values.username) {
          errors.username = "Required"
        }
        const { data } = await checkIfUserWithSuchUsernameAlreadyExists({ variables: { username: values.username } })
        if (data.userByAttr) {
          errors.username = "User with such username already exists"
          return errors
        }
        return errors
      }}>
      {({ isSubmitting }) =>
        isSubmitting ? (
          <CircularProgress data-cy="loader" />
        ) : (
          <>
            <Form style={{ margin: "0 auto" }}>
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
            <Box position="relative" fontSize="0.8rem" textAlign="start" pt="15px">
              Already have an account?
              <br />
              <Link href="/login" style={{ color: "#3b9fe8", textDecoration: "#97caff underline" }}>
                Sign in!
              </Link>
            </Box>
          </>
        )
      }
    </Formik>
  )
}

export default RegForm
