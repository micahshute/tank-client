import {
    degreesToRadians,
    radiansToDegrees
} from './formulas'

class EarthPhysicsMachine{

    static groundLevel(x = 0){
        return 50
    }

    static gravityAcceleration(){
        //if 100px = 1m, gravity acceleration = 980 pix/s
        return {x: 0, y: 980  }
    }

    static groundFrictionAcceleration(velocity){
        return velocity.x > 0 ? { x: -1, y: 0 } : { x: 1, y: 0 }
    }

    static update2DVelocity({ position, velocity }, deltaT = 0.01 ){
        let finalVelocity = velocity
        if(position.y >= this.groundLevel()){
            if(velocity.y > 0.005){
                finalVelocity.y = -0.3 * velocity.y
                finalVelocity.x = 0.3 * velocity.x
            }else{
                finalVelocity.y = 0
                finalVelocity.x = velocity.x > 0.005 ? velocity.x + this.groundFrictionAcceleration().x * deltaT : 0
            }
        }else{
            finalVelocity.y = velocity.y + this.gravityAcceleration().y * deltaT
        }
        return finalVelocity
    }

    static update2DLocation({ position, velocity }, deltaT = 0.01){
       let finalPosition = position
       if(position.y > this.groundLevel()){
           finalPosition.y = this.groundLevel()
       }
       finalPosition.x = position.x + velocity.x * deltaT
       finalPosition.y = position.y + velocity.y * deltaT
       let finalVelocity = this.update2DVelocity({position: finalPosition, velocity})
       return { position: finalPosition, velocity: finalVelocity }
    }

    static calculateVelocityVector({velocity, angle}){
        const x = Math.sin(degreesToRadians(angle)) * velocity
        const y = Math.cos(degreesToRadians(angle)) * -velocity
        return { x, y }
    }

    static calculateBarrelExitPiont(angle){
        const barrelLength = 100
        const x = Math.sin(degreesToRadians(angle)) * barrelLength
        const y  = Math.cos(degreesToRadians(angle)) * -barrelLength
        return { x, y }
    }

    static testCollision(obj1, obj2){
        const r1 = this.constructRect(obj1)
        const r2 = this.constructRect(obj2)
        const overlapX = this.overlap1D(r1.x, r2.x)
        const overlapY = this.overlap1D(r1.y, r2.y)
        return overlapX && overlapY
    }

    static overlap1D(a, b){
        const a1 = Math.min(...a)
        const a2 = Math.max(...a)
        const b1 = Math.min(...b)
        const b2 = Math.max(...b)
        return (a1 >= b1 && a1 <= b2) || (a2 >= b1 && a2 <= b2) || (b1 >= a1 && b1 <= a2)
    }

    static constructRect({position, width = 20, height=20, type="rect"} = {}){
        return type === "bullet" ? 
        {
            x: [position.x - width / 2, position.x + width / 2],
            y: [position.y - height / 2, position.y + height / 2]
        }
        :
        {
            x: [position.x, position.x + width],
            y: [position.y, position.y - height]
        }
    }
}

export default EarthPhysicsMachine