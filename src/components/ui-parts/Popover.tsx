import { useClickOutside } from '@/hooks/useClickOutSide'
import React, { useRef, useState } from 'react'

interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
}

export default function Popover({ children, content }: PopoverProps) {
  const [show, setShow] = useState(false)
  const wrapperRef = useRef(null)
  useClickOutside(wrapperRef, () => setShow(false))

  return (
    <div ref={wrapperRef} className="w-fit h-fit relative flex justify-center">
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className="min-w-fit w-[200px] h-fit absolute top-[100%] right-0 z-50 transition-all mt-2"
      >
        <div className="rounded bg-white shadow-[10px_30px_150px_rgba(46,38,92,0.25)] mb-[10px]">
          {content}
        </div>
      </div>
    </div>
  )
}
