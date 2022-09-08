import { Lessons, EducationData } from 'types'
export const getSlicedDataForStore = (dataItems: Lessons[]) => {
  let _DATASET: EducationData = {}
  dataItems.forEach((d: { [key: string]: string | number }) => {
    _DATASET = {
      ..._DATASET,
      [d.country]: {
        ..._DATASET[d.country],
        [d.camp]: {
          ..._DATASET[d.country]?.[d.camp],
          [d.school]: {
            ..._DATASET[d.country]?.[d.camp]?.[d.school],
            [d.month]: d,
          },
        },
      },
    }
  })
  return _DATASET
}

export const getSchoolsDataByCountryAndCamp = (
  dataItems: EducationData,
  country?: string,
  camp?: string,
) => {
  let filteredData: { [key: string]: { [key: string]: Lessons } } = {}
  if (country && camp) {
    filteredData = dataItems?.[country]?.[camp]
  }
  let dataByMonths: Lessons[] = []
  if (filteredData) {
    dataByMonths = Object.values(filteredData)
  }
  const allData: any[] = []
  for (const item of dataByMonths) {
    allData.push(...[item && Object.values(item)])
  }
  /* eslint prefer-spread: "off" */
  const _DATASET = [].concat.apply([], allData)
  return _DATASET
}
