export default function Button({
  children,
  className,
  onClick,
  type = 'submit',
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={className + ' cursor-pointer'}
      >
        {children}
      </button>
    </div>
  )
}
