import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorLog?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ errorLog, ...props }, ref) => {
    return (
      <>
        <input ref={ref} {...props}></input>
        {!!errorLog && <p className="mt-2 text-sm text-red-600">{errorLog}</p>}
      </>
    )
  },
)

Input.displayName = 'Input'
export default Input
