export enum ActivityTypeEnum {
    None = 'None',
    Barely = 'Barely',
    Average = 'Average',
    Active = 'Active',
    Very = 'Very Active'
}

export function ActivityToString(id: string): string {
    switch(id) {
        case '0':
            return ActivityTypeEnum.None;
        case '1':
            return ActivityTypeEnum.Barely;
        case '2':
            return ActivityTypeEnum.Average;
        case '3':
            return ActivityTypeEnum.Active;
        case '4':
            return ActivityTypeEnum.Very;
        default:
            return ActivityTypeEnum.None;
    }
}