import { SearchFormValues, searchSchema } from '@/schemas/todo.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import { SearchIcon } from '../ui/Icon'

type Props = {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const t = useTranslations('Search')
  const { register, handleSubmit } = useForm<SearchFormValues>({
    resolver: yupResolver(searchSchema()),
  })

  const handleSearch = (data: SearchFormValues) => {
    onSearch(data.title || '')
  }

  return (
    <form className=" mb-5 w-full" onSubmit={handleSubmit(handleSearch)}>
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
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t('placeholder')}
          {...register('title')}
        />
        <Button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t('button')}
        </Button>
      </div>
    </form>
  )
}
