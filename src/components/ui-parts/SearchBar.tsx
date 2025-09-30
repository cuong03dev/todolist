import { SearchFormValues, searchSchema } from '@/schemas/todo.schema'
import { useDebounce } from '@/hooks/useDebounce'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SearchIcon } from '../ui/Icon'
import Input from '../ui/Input'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const t = useTranslations('Search')
  const searchParams = useSearchParams()
  const initialSearchValue = searchParams.get('search') || ''
  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const router = useRouter()
  const { register, watch } = useForm<SearchFormValues>({
    resolver: yupResolver(searchSchema()),
    defaultValues: {
      title: initialSearchValue,
    },
  })

  const { debouncedValue } = useDebounce({
    value: searchValue,
    delay: 2000,
  })

  useEffect(() => {
    const subscription = watch((value) => {
      setSearchValue(value.title || '')
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (initialSearchValue) {
      onSearch(initialSearchValue)
    }
  }, [initialSearchValue, onSearch])

  useEffect(() => {
    onSearch(debouncedValue)
    if (debouncedValue) {
      router.push(`?search=${debouncedValue}`)
    } else {
      router.push('')
    }
  }, [debouncedValue, router, onSearch])

  return (
    <form className=" mb-5 w-full">
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
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t('placeholder')}
          {...register('title')}
        />
      </div>
    </form>
  )
}
