export const sortBasedOnMonth = (dataItems: any) => {
    let _DATASET: any = dataItems;
    let months = [
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
    ];
    _DATASET.sort((a: any, b: any) => {
        return months.indexOf(a.month) - months.indexOf(b.month);
    });

    return _DATASET;
};

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
];
