/// <reference types="vite/client" />

// Minimal Web NFC type declarations for TypeScript
// These are non-standard and available only in supported browsers (e.g., Chrome for Android)
declare interface NDEFScanOptions {
  signal?: AbortSignal
}

declare interface NDEFWriteOptions {
  overwrite?: boolean
  signal?: AbortSignal
}

declare interface NDEFRecordData {
  recordType: string
  mediaType?: string
  id?: string
  data?: any
}

declare type NDEFMessageSource = string | NDEFRecordData[]

declare interface NDEFReadingEvent extends Event {
  serialNumber?: string
  message?: any
}

declare class NDEFReader {
  onreading: ((this: NDEFReader, ev: NDEFReadingEvent) => any) | null
  onreadingerror: ((this: NDEFReader, ev: Event) => any) | null
  constructor()
  scan(options?: NDEFScanOptions): Promise<void>
  write(message: NDEFMessageSource, options?: NDEFWriteOptions): Promise<void>
}

declare interface Window {
  NDEFReader: typeof NDEFReader
}
