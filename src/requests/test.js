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

    async signup(username, password){
        const url = this.baseURL + `signup`
        const form = this.createLoginForm(username, password)
        const formData = new FormData(form)
        try{
            const data = await fetch(url, {
                method: "POST",
                headers: this.formHeaders()
            })
        }catch(e){
            return `${e}`
        }
    }

    async dispatchGetRequest(url){
        try{
            const data = await fetch(url, {
                method: "GET",
                headers: this.getHeaders()
            }).then(res => res.json())
            return data
        }catch(e){
            return `${e}`
        }
    }

    formHeaders(){
        return {
            "Accept": "application/json", 
        }
    }

    getHeaders(){
        return {
            "Accept": 'application/json'
        }
    }

    createLoginForm(username, password){
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
        return form
    }

}