export function load({ params }) {
    console.log(params)
    
    return {
        recipe: {
            title: `Title for ${params.slug} goes here`,
            description: `Content for ${params.slug} goes here`
        }
    };
}