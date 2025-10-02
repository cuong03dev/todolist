'use client'
import { useDebounceCallback } from '@/hooks/useDebounce'
import { useTranslations } from 'next-intl'
import React from 'react'
import { SearchIcon } from '../ui/Icon'
import Input from '../ui/Input'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  initialValue: string
}

export default function SearchBar({ initialValue }: Props) {
  const t = useTranslations('Search')
  // const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const debouncedSearch = useDebounceCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search)
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    300,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  return (
    <form className="mb-5 w-full">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                     bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t('placeholder')}
          defaultValue={initialValue}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </form>
  )
}
