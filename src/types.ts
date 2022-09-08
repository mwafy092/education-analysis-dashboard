export interface ColorsInterface {
  [key: string]: string
}

export type Lessons = {
  id?: string
  month?: string
  camp?: string
  country?: string
  school?: string
  lessons?: number
}

export interface SectionData {
  [key: string]: Lessons
}

export interface SchoolsDataInterface {
  [key: string]: number
}

export interface TopSchool {
  school: string
  lessons: number
}

export interface SavedData {
  country?: string
  camp?: string
  school?: string
}
