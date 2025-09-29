import React from 'react'
import Input from '../ui/Input'
import Label from '../ui/Label'

interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  id: string
  name: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  inputClass?: string
  labelClass?: string
  errorLog?: string
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      name,
      label,
      type,
      placeholder,
      autoComplete,
      inputClass,
      labelClass,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <div>
        <Label className={labelClass} htmlFor={name} text={label}></Label>
        <div className="mt-1">
          <Input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={inputClass}
            required={required}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  },
)

FormField.displayName = 'FormField'

export default FormField
