import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface UsePaginationProps {
  totalPages: number
}

export const usePagination = ({ totalPages }: UsePaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handlePageClick = (page: number) => {
    if (page > totalPages || page < 1) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())

    router.push(`${pathname}?${params.toString()}`)
  }

  return { handlePageClick }
}
