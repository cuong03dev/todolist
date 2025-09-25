export default function Button({
  children,
  className,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div>
      <button
        onClick={onClick}
        type="submit"
        className={className + ' cursor-pointer'}
      >
        {children}
      </button>
    </div>
  )
}
