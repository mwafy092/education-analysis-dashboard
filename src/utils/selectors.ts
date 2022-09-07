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
