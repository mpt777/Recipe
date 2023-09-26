export class Recipe {
    data : object;
    constructor(data : object) {
        this.data = data
    }

    gethandle() {
        return this.data.handle || this.data._id;
    }
    
}