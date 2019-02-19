function objEq(o1, o2){
    if(Object.keys(o1).length !== Object.keys(o2).length) return false
    for(key of Object.keys(o1)){
        if(o1[key] instanceof Object){
            if(o2[key] instanceof Object){
                return objEq(o1[key], o2[key])
            }else{
                return false
            }
        }else{
        return o1[key] === o2[key]
        }
    }  
}
