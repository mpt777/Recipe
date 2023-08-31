type UserInterface = {
    _id: string,
    username: string,
}

type ImageInterface = {
    _id: string,
    username: string,
}

type IngredientInterface = {
    _id: string,
    title: string,
    amount: number,
    unit: string
}

type TagInterface = {
    _id: string,
    name: string,
}

type RecipeInterface = {
    _id: string,
    title: string,
    description: string,
    instructions: string,
    image: ImageInterface,
    createdBy: UserInterface,
    createdAt: Date,
    ingredients?: IngredientInterface[]
    tags?: TagInterface[]
}