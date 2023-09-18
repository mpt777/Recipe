export function responseErrorHandler(error) {
    let response = {message:error.message}
    if (error.code == 11000) {
        let k = Object.keys(error.keyValue)[0];
        response = {
            ...response, 
            ...{
                error: "unique",
                field: k,
                value: error.keyValue[k]
            }
        }
    }
    return response
}