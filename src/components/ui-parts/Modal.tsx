import { ReactNode } from 'react'
import Button from '../ui/Button'
import { CloseIcon } from '../ui/Icon'
import Portal from './Portal'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: ReactNode
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null

  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-[24px] font-bold">{title}</div>
            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => onClose()}
            >
              <CloseIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  )
}
