import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface UsePaginationProps {
  totalPages: number
  onPageChange: (page: number) => Promise<void>
  initialPage: number
}

export const usePagination = ({
  totalPages,
  onPageChange,
  initialPage,
}: UsePaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isPageLoading, setIsPageLoading] = useState(false)

  const handlePageClick = (page: number) => {
    if (page === currentPage || isPageLoading || page > totalPages || page < 1)
      return
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    const handlePageChangeEffect = async (page: number) => {
      try {
        setIsPageLoading(true)
        setCurrentPage(page)
        await onPageChange(page)
        setIsPageLoading(false)
      } catch (error) {
        setIsPageLoading(false)
      }
    }

    const pageParam = searchParams.get('page')
    if (pageParam) {
      const page = parseInt(pageParam, 10)
      if (
        !isNaN(page) &&
        page > 0 &&
        page <= totalPages &&
        page !== currentPage
      ) {
        handlePageChangeEffect(page)
      }
    }
  }, [searchParams, totalPages, currentPage, onPageChange])

  return { currentPage, handlePageClick, isPageLoading }
}
