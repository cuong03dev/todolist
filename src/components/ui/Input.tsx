export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} autoComplete="email"></input>
}
