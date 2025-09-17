import type { ReactNode } from "react"


export type TranslatorContext = {
    t: 
      ((key: string, options?: Record<string, string>) => string) |
      ((key: ReactNode, options?: Record<string, string>) => ReactNode)
  };