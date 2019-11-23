export enum GenderEnum {
    Male = 'Male',
    Female = 'Female'
}

export function GenderToString(id: string): string {
    return (id == '0') ? GenderEnum.Female : GenderEnum.Male;
}