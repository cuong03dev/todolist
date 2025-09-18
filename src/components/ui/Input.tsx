type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorLog?: string
}

export default function Input({ errorLog, ...props }: InputProps) {
  return (
    <>
      <input {...props} autoComplete="email"></input>
      {!!errorLog && <p className="mt-2 text-sm text-red-600">{errorLog}</p>}
    </>
  )
}
