export const getSlicedDataForStore = (dataItems: any) => {
  let _DATASET: any = {}
  dataItems.forEach((d: any) => {
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

export const getSchoolsDataByCountryAndCamp = (dataItems: any, country?: any, camp?: any) => {
  const filteredData = dataItems?.[country]?.[camp] || {}
  const dataByMonths = Object.values(filteredData)
  const allData: any = []
  for (const item of dataByMonths) {
    allData.push(...[item && Object.values(item)])
  }
  /* eslint prefer-spread: "off" */
  const _DATASET = [].concat.apply([], allData)
  return _DATASET
}
