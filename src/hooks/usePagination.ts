import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAll } from '@/features/todo/todoSlice'
import { useAppDispatch } from '@/store/hooks'

interface UsePaginationProps {
  totalPages: number
}

export const usePagination = ({ totalPages }: UsePaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handlePageClick = (page: number) => {
    if (page === currentPage || isPageLoading) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    const handlePageChangeEffect = async (page: number) => {
      setIsPageLoading(true)
      setCurrentPage(page)
      await dispatch(getAll(page))
      setIsPageLoading(false)
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
  }, [searchParams, totalPages, currentPage, dispatch])

  return { currentPage, handlePageClick, isPageLoading }
}
