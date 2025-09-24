'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
}

export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false)
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setPortalRoot(document.getElementById('portal-root'))
    setMounted(true)
  }, [])

  if (!mounted || !portalRoot) return null

  return createPortal(children, portalRoot)
}
