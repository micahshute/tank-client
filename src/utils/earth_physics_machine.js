class EarthPhysicsMachine{

    static gravityAcceleration(){
        //if 100px = 1m, gravity acceleration = 98 pix/s
        return {x: 0, y: 980 }
    }

    static groundFrictionAcceleration(velocity){
        return velocity.x > 0 ? { x: -1, y: 0 } : { x: 1, y: 0 }
    }

    static update2DVelocity({ position, velocity }, deltaT = 0.01 ){
        let finalVelocity = velocity
        if(position.y >= 0){
            if(velocity.y > 0.005){
                finalVelocity.y = -0.3 * velocity.y
                finalVelocity.x = 0.8 * velocity.x
            }else{
                finalVelocity.y = 0
                finalVelocity.x = velocity.x > 0.005 ? velocity.x + this.groundFrictionAcceleration().x * deltaT : 0
            }
        }else{
            finalVelocity.y = velocity.y + this.gravityAcceleration().y * deltaT
        }
        console.log(finalVelocity)
        return finalVelocity
    }

    static update2DLocation({ position, velocity }, deltaT = 0.01){
       let finalPosition = position
       if(position.y > 0){
           finalPosition.y = 0
       }
       finalPosition.x = position.x + velocity.x * deltaT
       finalPosition.y = position.y + velocity.y * deltaT
       let finalVelocity = this.update2DVelocity({position: finalPosition, velocity})
       return { position: finalPosition, velocity: finalVelocity }
    }
}

export default EarthPhysicsMachine