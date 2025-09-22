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
  isAuthInput?: boolean
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
  isAuthInput,
  ...props
}: FormFieldProps) {
  if (isAuthInput) {
    labelClass = 'block text-sm font-medium text-gray-700'
    inputClass =
      'appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
  }
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
