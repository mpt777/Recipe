type UserInterface = {
    _id: string,
    username: string,
}

type ImageInterface = {
    _id: string,
    src: string,
    name: string,
    alt: string,
    createBy: UserInterface,
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

type TimeInterface = {
    amount: number,
    unit: string,
}

type RecipeInterface = {
    _id: string,
    handle: string,
    title: string,
    description: string,
    instructions: string,
    image: ImageInterface,
    createdBy: UserInterface,
    cookTime: TimeInterface,
    prepTime: TimeInterface,
    servings: number,
    createdAt: Date,
    updatedAt: Date,
    ingredients?: IngredientInterface[]
    tags?: TagInterface[]
}