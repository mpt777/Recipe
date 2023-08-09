export function load({ params }) {
    
    return {
        recipe: {
            title: `Title for ${params.slug} goes here`,
            description: `Content for ${params.slug} goes here`
        }
    };
}