export class ApiClient{
    constructor(request){

        this.request = request;
    }

    async createObject(payload){
        const response = await this.request.post('/objects',
            {
            data: payload
            }
        )
        return response;
    }

    async getObject(id) {

        const response = await this.request.get(`/objects/${id}`)
        return response;

}
    async updateObject(id,payload){
        const response  = await this.request.patch(`/objects/${id}`,
        {
            data:payload
        }
    )
    return response;

}

    async deleteObject(id){
        const response = await this.request.delete(`/objects/${id}`)
        return response;
}
}
