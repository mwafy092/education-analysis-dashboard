export const getSlicedDataForStore = (dataItems: any) => {
    let _DATASET: any = {};
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
        };
    });
    return _DATASET;
};

export const getSchoolsDataByCountryAndCamp = (
    dataItems: any,
    country: any,
    camp: any
) => {
    let filteredData = dataItems?.[country]?.[camp] || {};
    let dataByMonths = Object.values(filteredData);
    let allData: any = [];
    for (let item of dataByMonths) {
        allData.push(...[item && Object.values(item)]);
    }
    let _DATASET = [].concat.apply([], allData);
    return _DATASET;
};
