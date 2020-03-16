import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import FormCategories from './components/FormCategories'

const initialFormUser = { name: ''}
const msgRequired ='This is Required'
const validationFormUser = Yup.object({
  name: Yup.string().required(msgRequired)
})
export default function Categories (props) {
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
      <FormCategories />
    </Formik>
  )
}
