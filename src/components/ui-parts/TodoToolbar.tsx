import Button from '../ui/Button'
import SearchBar from './SearchBar'
import Filter from './Filter'
import { useTranslations } from 'next-intl'

interface TodoToolbarProps {
  onAddClick: () => void
  onSearch: (value: string) => void
  onFilterChange: (
    filterType: string,
    dateFrom?: string,
    dateTo?: string,
  ) => void
}

export default function TodoToolbar({
  onAddClick,
  onSearch,
  onFilterChange,
}: TodoToolbarProps) {
  const t = useTranslations('Todo')

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-3xl font-medium">Todo</div>
        <Button
          onClick={onAddClick}
          type="button"
          className="text-white bg-[#3a3a3c] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {t('add_task_button')}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <SearchBar onSearch={onSearch} />
      </div>
      <Filter onFilterChange={onFilterChange} />
    </>
  )
}
