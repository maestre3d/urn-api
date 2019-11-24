export enum FoodTypeEnum {
    Fruits = 1,
    Vegetables,
    Cereals,
    Legumes,
    Animal,
    Dairy,
    OilsFats,
    Sugars
}

export function FoodTypeToString(category: string): number {
    if ( category == 'fruits' ) return FoodTypeEnum.Fruits;
    else if ( category == 'vegetables' ) return FoodTypeEnum.Vegetables;
    else if ( category == 'cereals' ) return FoodTypeEnum.Cereals;
    else if ( category == 'legumes' ) return FoodTypeEnum.Legumes;
    else if ( category == 'animal' ) return FoodTypeEnum.Animal;
    else if ( category == 'dairy' ) return FoodTypeEnum.Dairy;
    else if ( category == 'oilsfats' || category == 'oils' || category == 'fats' ) return FoodTypeEnum.OilsFats;
    else if ( category == 'sugars' ) return FoodTypeEnum.Sugars;

    else return 0;
}