import { HANDSHAKE_TOKEN as token } from '../secrets'
export default class RequestTests{

    constructor(port = 3000){
        this.baseURL = `http://localhost:${port}/api/`
    }

    async users(){
        const url = this.baseURL + "users"
        return await this.dispatchGetRequest(url)
    }

    async user(id){
        const url = this.baseURL + `users/${id}`
    }

    async csrfToken(){
        const url = this.baseURL + `handshake`
        const data = await fetch(url, {
            method: "GET",
            headers: {...this.formHeaders(),
                "X-HANDSHAKE-TOKEN": token            
            },
            credentials: "include"
        }).then(res => res.json())
        return data
    }

    async signup(username, password, token){
        const url = this.baseURL + `signup`
        const form = this.createLoginForm(username, password, token )
        const formData = new FormData(form)
        try{
            const data = await fetch(url, {
                method: "POST",
                headers: this.formHeaders(),
                body: formData,
                credentials: "include"
            }).then(res => res.json())
            return data
        }catch(e){
            return `${e}`
        }
    }

    async dispatchGetRequest(url){
        try{
            const data = await fetch(url, {
                method: "GET",
                headers: this.getHeaders(),
                credentials: "include"
            }).then(res => res.json())
            return data
        }catch(e){
            return `${e}`
        }
    }

    formHeaders(){
        return {
            "Accept": "application/json", 
            "X-HANDSHAKE-TOKEN": token  
        }
    }

    getHeaders(){
        return {
            "Accept": 'application/json',
            "X-HANDSHAKE-TOKEN": token 
        }
    }

    createLoginForm(username, password, token){
        const form = document.createElement('form')
        const usernameInput = document.createElement('input')
        usernameInput.name = "username"
        usernameInput.value = username
        usernameInput.type = "text"
        const passwordInput = document.createElement("input")
        passwordInput.name = "password"
        passwordInput.value = password
        passwordInput.type = "password"
        const submitInput = document.createElement("input")
        submitInput.type = "submit"
        form.appendChild(usernameInput)
        form.appendChild(passwordInput)
        form.appendChild(submitInput)
        const hiddenInput = document.createElement('input')
        hiddenInput.type = "hidden"
        hiddenInput.name = "authenticity_token"
        hiddenInput.value = token
        form.appendChild(hiddenInput)
        console.log(form)
        return form
    }

}