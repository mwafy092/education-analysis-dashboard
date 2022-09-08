import { Lessons } from '../types'
export const sortBasedOnMonth = (dataItems: Lessons[]) => {
  const _DATASET: Lessons[] = dataItems
  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  _DATASET.sort((a: Lessons, b: Lessons) => {
    return months.indexOf(a.month ? a.month : '') - months.indexOf(b.month ? b.month : '')
  })

  return _DATASET
}

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
