import Header from '@/components/ui-parts/Header'

export default function TodoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <div className="mt-20 pb-10">{children}</div>
    </>
  )
}
