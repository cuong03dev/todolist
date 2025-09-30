import React, { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { FilterIcon } from '../ui/Icon'
import FormField from './FormField'
import { convertTime } from '@/utils/convertTime'
import Button from '../ui/Button'

type Props = {
  onFilterChange: (
    filterType: string,
    dateFrom?: string,
    dateTo?: string,
  ) => void
}

export default function Filter({ onFilterChange }: Props) {
  const [isShow, setIsShow] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  })
  const dateFromRef = useRef<HTMLInputElement>(null)
  const dateToRef = useRef<HTMLInputElement>(null)
  const filterContainerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Filter')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target as Node)
      ) {
        setIsShow(false)
      }
    }

    if (isShow) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isShow])

  const handleOpen = () => {
    setIsShow(!isShow)
  }

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setDateRange((prev) => ({ ...prev, from: date }))
  }

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setDateRange((prev) => ({ ...prev, to: date }))
  }

  const handleApplyFilter = () => {
    if (dateRange.from && dateRange.to) {
      setIsFilterApplied(true)
      onFilterChange('byDateRange', dateRange.from, dateRange.to)
      setIsShow(false)
    }
  }

  const handleClearFilter = () => {
    setDateRange({ from: '', to: '' })
    setIsFilterApplied(false)
    onFilterChange('all')
    setIsShow(false)
  }

  const [isFilterApplied, setIsFilterApplied] = useState(false)

  const getButtonText = () => {
    if (isFilterApplied && dateRange.from && dateRange.to) {
      return `${convertTime(dateRange.from)} - ${convertTime(dateRange.to)}`
    }
    return t('filterByDate')
  }

  return (
    <div
      ref={filterContainerRef}
      className="relative inline-block text-left mb-4"
    >
      <div>
        <Button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="filter-button"
          aria-expanded={isShow}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {getButtonText()}
          <FilterIcon className="mr-1 h-5 w-5 text-gray-400" />
        </Button>
      </div>

      {isShow && (
        <div
          id="date-filter-dropdown"
          className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg border border-gray-300 focus:outline-none p-4"
        >
          <div className="mb-4">
            <FormField
              id="date-from"
              name="date-from"
              label={t('dateFrom')}
              type="date"
              ref={dateFromRef}
              value={dateRange.from}
              onChange={handleDateFromChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mb-4">
            <FormField
              id="date-to"
              name="date-to"
              label={t('dateTo')}
              type="date"
              ref={dateToRef}
              value={dateRange.to}
              onChange={handleDateToChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={handleClearFilter}
              className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm font-medium"
            >
              {t('clear')}
            </Button>
            <Button
              type="button"
              onClick={handleApplyFilter}
              disabled={!dateRange.from || !dateRange.to}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                dateRange.from && dateRange.to
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-300 text-white cursor-not-allowed'
              }`}
            >
              {t('apply')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
