import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormUser from './components/FormUser'

const initialFormUser = { fullname: '', username: '', password: '', email: '', gender: 'male', role: 1 }
const msgRequired = 'This is Required'
const validationFormUser = Yup.object({
  fullname: Yup.string().required(msgRequired),
  username: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .required(msgRequired),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required(msgRequired),
  email: Yup.string().email('Invalid email address')
    .required(msgRequired),
  gender: Yup.string()
    .oneOf(
      ['male', 'female'],
      'Invalid Gender'
    )
    .required(msgRequired),
  role: Yup.number()
    .oneOf(
      [1, 2, 3],
      'Invalid Role'
    )
    .required(msgRequired)
})
export default function User (props) {
  return (
    <Formik
      initialValues={initialFormUser}
      validationSchema={validationFormUser}
      onSubmit={async (values, form) => {
        console.log(values)
        console.log(form)
        form.setSubmitting(false)
      }}
    >
      <FormUser />
    </Formik>
  )
}
