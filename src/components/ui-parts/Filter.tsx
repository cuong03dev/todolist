import React, { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { FilterIcon } from '../ui/Icon'
import FormField from './FormField'
import { convertTime } from '@/utils/convertTime'

type Props = {
  onFilterChange: (
    filterType: string,
    dateFrom?: string,
    dateTo?: string,
  ) => void
}

export default function Filter({ onFilterChange }: Props) {
  const [isShow, setIsShow] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const dateFromRef = useRef<HTMLInputElement>(null)
  const dateToRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('Filter')

  const handleOpen = () => {
    setIsShow(!isShow)
  }

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setDateFrom(date)
  }

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setDateTo(date)
  }

  const handleApplyFilter = () => {
    if (dateFrom && dateTo) {
      setIsFilterApplied(true)
      onFilterChange('byDateRange', dateFrom, dateTo)
      setIsShow(false)
    }
  }

  const handleClearFilter = () => {
    setDateFrom('')
    setDateTo('')
    setIsFilterApplied(false)
    onFilterChange('all')
    setIsShow(false)
  }

  const [isFilterApplied, setIsFilterApplied] = useState(false)

  const getButtonText = () => {
    if (isFilterApplied && dateFrom && dateTo) {
      return `${convertTime(dateFrom)} - ${convertTime(dateTo)}`
    }
    return t('filterByDate')
  }

  return (
    <div className="relative inline-block text-left mb-4">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="filter-button"
          aria-expanded={isShow}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {getButtonText()}
          <FilterIcon className="mr-1 h-5 w-5 text-gray-400" />
        </button>
      </div>

      {isShow && (
        <div
          id="date-filter-dropdown"
          className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4"
        >
          <div className="mb-4">
            <FormField
              id="date-from"
              name="date-from"
              label={t('dateFrom')}
              type="date"
              ref={dateFromRef}
              value={dateFrom}
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
              value={dateTo}
              onChange={handleDateToChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleClearFilter}
              className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm font-medium"
            >
              {t('clear')}
            </button>
            <button
              onClick={handleApplyFilter}
              disabled={!dateFrom || !dateTo}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                dateFrom && dateTo
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-300 text-white cursor-not-allowed'
              }`}
            >
              {t('apply')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
