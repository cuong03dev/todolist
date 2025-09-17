export default function Button({
  children,
  className,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div>
      <button type="submit" className={className}>
        {children}
      </button>
    </div>
  )
}
