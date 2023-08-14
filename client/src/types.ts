type UserInterface = {
    _id: string,
    username: string,
}

type ImageInterface = {
    _id: string,
    username: string,
}

type RecipeInterface = {
    _id: string,
    title: string,
    description: string,
    image: ImageInterface,
    createdBy: UserInterface,
}