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
  school?: string
  lessons?: number
}

export interface SavedData {
  country?: string
  camp?: string
  school?: string
}

export interface EducationData {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        [key: string]: Lessons
      }
    }
  }
}

export type InitialStateType = {
  isLoading: false | true
  country: string
  camp: string
  school: string
  chartData: []
  educationData: EducationData
  countryByVoice: string
  campByVoice: string
}

export type StateTypes = {
  lessons: InitialStateType
}

export type lessonsDataTypes = {
  school: string
  lessons: number
}

export type LocalStorageTypes = {
  country: string
  camp: string
  school: string
}
