import React from 'react'
import { Field } from 'formik'

const CustomTextField = (props) => {
  const { component: CustomComponent, ...resultProps } = props
  return (
    <Field
      component={({ field, form, ...props }) => (
        <CustomComponent
          {...resultProps}
          onChange={field.onChange}
          value={field.value[resultProps.name]}
          error={form.touched[resultProps.name] && Boolean(form.errors[resultProps.name])}
          helperText={form.touched[resultProps.name]?form.errors[resultProps.name]:''}
        >
          {resultProps.children}
        </CustomComponent>
      )}
    />
  )
}

export default CustomTextField
