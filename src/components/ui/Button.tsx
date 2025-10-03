export default function Button({
  children,
  className,
  onClick,
  ref,
  type = 'submit',
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.Ref<HTMLButtonElement>
}) {
  return (
    <div>
      <button
        ref={ref}
        onClick={onClick}
        type={type}
        className={className + ' cursor-pointer'}
      >
        {children}
      </button>
    </div>
  )
}
