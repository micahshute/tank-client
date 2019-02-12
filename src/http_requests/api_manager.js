import { HANDSHAKE_TOKEN as token } from '../secrets'


class ApiManager{

    constructor(port = 3004){
        this.baseURL = `http://localhost:${port}/api/`
    }

    //MARK GET REQUETS

    async users(){
        const url = this.baseURL + "users"
        return await this.dispatchGetRequest(url)
    }

    async user(id){
        const url = this.baseURL + `users/${id}`
        return await this.dispatchGetRequest(url)
    }

    async current_user(){
        const url = this.baseURL + `users/current-user`
        return await this.dispatchGetRequest(url)
    }

    async csrfToken(){
        const url = this.baseURL + `handshake`
        return await this.dispatchGetRequest(url)
    }

    async authenticate(){
        const url = this.baseURL + 'authenticate'
        return await this.dispatchGetRequest(url)
    }
   

    //MARK POST REQUESTS

    async isValidUsername(username){
        const url = this.baseURL + 'username-check'
        return await this.dispatchPostRequest(url, {username})
    }

    async signup(username, password, authenticity_token){
        const url = this.baseURL + `signup`
        const formData = this.constructFormData({username, password, authenticity_token})
        return await this.dispatchPostFormRequest(url, formData)
    }

    async login(username, password, authenticity_token){
        const url = this.baseURL + 'login'
        const formData = this.constructFormData({username, password, authenticity_token})
        return await this.dispatchPostFormRequest(url, formData)
    }

    async logout(){
        const url = this.baseURL + "logout"
        return await fetch(url, {
            method: "delete",
            headers: this.getHeaders,
            credentials: "include"
        }).then(res => res.json())
    }

    //MARK HELPERS

    constructFormData(obj){
        const formData = new FormData()
        for(let key in obj){
            formData.append(key, obj[key])
        }
        return formData
    }

    async dispatchPostRequest(url, jsonData){
        try{
            const res = await fetch(url, {
                method: "POST",
                headers: this.postHeaders,
                body: JSON.stringify(jsonData),
                credentials: "include"
            })
            if(res.status < 200 || res.status > 300) throw new Error(res.statusText || res.status)
            return await res.json()
        }catch(e){
            return `${e}`
        }
    }

    async dispatchPostFormRequest(url, formData){
        try{
            const res = await fetch(url, {
                method: "POST",
                headers: this.formHeaders,
                body: formData,
                credentials: "include"
            })
            if(res.status < 200 || res.status > 300) throw new Error(res.statusText || res.status)
            return await res.json()
        }catch(e){
            return `${e}`
        }
    }

    async dispatchGetRequest(url){
        try{
            const res = await fetch(url, {
                method: "GET",
                headers: this.getHeaders,
                credentials: "include"
            })
            if(res.status < 200 || res.status > 300) throw new Error(res.statusText || res.status)
            return await res.json()
        }catch(e){
            return `${e}`
        }
    }

    get formHeaders(){
        return {
            "Accept": "application/json", 
            "X-HANDSHAKE-TOKEN": token  
        }
    }

    get postHeaders(){
        return {
            "Accept": "application/json", 
            "X-HANDSHAKE-TOKEN": token ,
            "Content-Type": 'application/json'
        }
    }

    get getHeaders(){
        return {
            "Accept": 'application/json',
            "X-HANDSHAKE-TOKEN": token 
        }
    }

}

const apiManager = new ApiManager()

export default apiManager