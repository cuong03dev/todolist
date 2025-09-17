export default function Label({
  text,
  htmlFor,
  className,
}: {
  text: string
  htmlFor: string
  className?: string
}) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {text}
    </label>
  )
}
