import React from 'react'


const Login = (props) => {

    const disabledClass = () => {
        if(props.invalidEntries){
            return "disabled"
        }else{
            return ""
        }
    }

    const renderSpinner = () => {
        if(props.loading){
            return <div className="loader"></div>
        }else{
            return <input type="submit" className={`btn btn-primary ${disabledClass()}`} value={props.submitText || "Login"}/>
        }
    }

    return(
        <form onSubmit={props.handleSubmit} >
            <div class="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" name="username" className="form-control" onChange={props.handleChange} value={props.username}  onBlur={props.verifyUsername} placeholder="Username" />
            </div>
            <div class="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={props.handleChange} value={props.password} placeholder="Password" />
            </div>

            <p className="error-text">{props.errors}</p>
            {renderSpinner()}
            
        </form>
    )
}

export default Login