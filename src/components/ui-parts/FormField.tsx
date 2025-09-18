import Input from '../ui/Input'
import Label from '../ui/Label'

interface FormFieldProps {
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

export default function FormField({
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
}: FormFieldProps) {
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
          {...props}
        />
      </div>
    </div>
  )
}
