export type Lessons = {
    id: string;
    month: string;
    camp: string;
    country: string;
    school: string;
    lessons: number;
};
export type InitialStateType = {
    lessonsData: Lessons[];
    isLoading: false | true;
    country: string;
    camp: string;
    school: string;
    chartData: [];
};

export type StateTypes = {
    lessons: InitialStateType;
    mode: {};
};

export type lessonsDataTypes = {
    school: string;
    lessons: number;
};

export type LocalStorageTypes = {
    country: string;
    camp: string;
    school: string;
};