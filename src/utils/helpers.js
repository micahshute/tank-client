function objEq(o1, o2){
    if(Object.keys(o1).length !== Object.keys(o2).length) return false

    for(let key of Object.keys(o1)){
        if(o1[key] instanceof Object){
            if(o2[key] instanceof Object){
                if(!objEq(o1[key], o2[key])) return false
            }else{
                return false
            }
        }else{
            if(o1[key] !== o2[key]) return false
        }
    }
    return true  
}

export {
    objEq
}