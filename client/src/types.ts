type UserInterface = {
    _id: string,
    username: string,
}

type ImageInterface = {
    _id: string,
    username: string,
}

type IngrdientInterface = {
    _id: string,
    title: string,
    amount: string,
    unit: number
}

type RecipeInterface = {
    _id: string,
    title: string,
    description: string,
    image: ImageInterface,
    createdBy: UserInterface,
    ingredients?: IngrdientInterface[]
}