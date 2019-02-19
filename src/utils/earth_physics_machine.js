import {
    degreesToRadians,
    radiansToDegrees
} from './formulas'

class EarthPhysicsMachine{

    //mounds: {peakLocationX: , width: , height: }
    constructor({groundLevel, mounds = []}){
        this.groundLevel = groundLevel
        this.mounds = mounds.map(m => {
            const start = m.peakLocationX - m.width/2
            const stop = m.peakLocationX + m.width/2
            const coeff = m.height / ((m.width / 2) ** 2)
            const elevation = (x) => {
                if(x < start || x > stop){
                    return groundLevel
                }
                return -1 * (-1 * coeff * ((x - m.peakLocationX) ** 2) + m.height) + groundLevel
            }
            const slope = (x) =>  (-2 * coeff * (x - m.peakLocationX))
            const angle = (x) => radiansToDegrees(Math.atan(slope(x)))
            const contains = (x) => (x > start && x < stop)
            return {
                start, stop, elevation, slope, angle, contains 
            }
        })
    }
    
    ground(x){
        for(let mound of this.mounds){
            if(mound.contains(x)){
                return {elevation: mound.elevation(x), angle: mound.angle(x)}
            }
        }
        return {elevation: this.groundLevel, angle: 0}
    }

    addForces(f1, f2){
        return{
            x: f1.x + f2.x,
            y: f1.y + f2.y
        }
    }

    multiplyForces(force1, force2){
        return{
            x: force1.x * force2.x,
            y: force1.y * force2.y
        }
    }

    gravityAccelerationOnHill(hillAngleDegrees){
        if(Math.abs(angle) < 10){
            return {
                x: 0,
                y: 0
            }
        }
        const angle = degreesToRadians(-1 * hillAngleDegrees)
        const g = this.gravityAcceleration().y

        console.log('DOWN HILL')
        return {
            x: Math.cos(angle) * Math.sin(angle) * g,
            y: Math.sin(angle) * Math.sin(angle) * g
        }
    }

    gravityAcceleration(){
        //if 100px = 1m, gravity acceleration = 980 pix/s
        return {x: 0, y: 980  }
    }

    groundFrictionAcceleration(velocity){
        return { x: -0.1 * velocity.x / 0.01, y: -0.1 * velocity.y / 0.01}
    }


    shouldPerformCollision({ velocity, position }){
        //perform elastic collision if object has significant perpindicular speed to ground
        //test perpendicular velocity using magnitude of cross product
        const objTrajectoryAngle = Math.atan( -1 * velocity.y / velocity.x)
        const angleDifference = objTrajectoryAngle - this.ground(position.x).angle
        const crossProduct = Math.abs(Math.sqrt(velocity.x ** 2 + velocity.y ** 2) * Math.sin(angleDifference))
        // console.log(this.ground(position.x).angle)
        return crossProduct > 100
    }

    collideWithGround({velocity, position, damping = 0.2}){
        const velocityMagnitude = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)
        const groundAngle = this.ground(position.x).angle
        const incomingAngle = radiansToDegrees(Math.atan(velocity.y / velocity.x))
        const finalVectorAngle = degreesToRadians(2 * groundAngle + incomingAngle)
        let xFactor = position.x > 0 ? -1 : 1
        xFactor = xFactor * -1 * (Math.sign(position.x) * Math.sign(velocity.x))
        return {
            x: velocityMagnitude * xFactor * Math.cos(finalVectorAngle) * damping,
            y: velocityMagnitude * -1 * xFactor * Math.sin(finalVectorAngle) * damping
        }
    }

    update2DVelocity({ position, velocity }, deltaT = 0.01 ){
        let finalVelocity = velocity
        //if item is below or at ground level
        
        if(position.y >= this.ground(position.x).elevation){
            //if item is moving quickly downward, perform inelastic collision
            if(this.shouldPerformCollision({position, velocity})){
                finalVelocity = this.collideWithGround({velocity, position})
            //if item is moving slowly downward, introduce friction forces
            }else{
                finalVelocity.y = Math.abs(velocity.y) > 10 ? velocity.y + this.groundFrictionAcceleration(velocity).y * deltaT : 0
                finalVelocity.x = Math.abs(velocity.x) > 10 ? velocity.x + this.groundFrictionAcceleration(velocity).x * deltaT : 0
                // if(this.ground(position.x).angle > 10){
                //     console.log(finalVelocity)
                //     finalVelocity = this.addForces(finalVelocity, this.multiplyForces({x: deltaT, y: deltaT}, this.gravityAccelerationOnHill(this.ground(position.x).angle)))
                //     console.log(finalVelocity)
                //     console.log("-------------------------------")
                // }
                
                
            }
        }else{
            finalVelocity.y = velocity.y + this.gravityAcceleration().y * deltaT
        }
        
        if(this.magnitude(finalVelocity) < 5){
            finalVelocity = { x: 0, y: 0}
        }
        // console.log(finalVelocity)
        return finalVelocity
    }

    magnitude({x, y}){
        return Math.sqrt(x ** 2 + y ** 2)
    }

    update2DLocation({ position, velocity }, deltaT = 0.01){
       let finalPosition = position
       const localElevation = this.ground(position.x).elevation
       if(position.y > localElevation){
           finalPosition.y = localElevation
       }
       finalPosition.x = position.x + velocity.x * deltaT
       finalPosition.y = position.y + velocity.y * deltaT
       let finalVelocity = this.update2DVelocity({position: finalPosition, velocity})
       return { position: finalPosition, velocity: finalVelocity }
    }

    calculateVelocityVector({velocity, angle}){
        const x = Math.sin(degreesToRadians(angle)) * velocity
        const y = Math.cos(degreesToRadians(angle)) * -velocity
        return { x, y }
    }

    calculateBarrelExitPiont(angle, tankBase){
        const barrelLength = 100
        const x = Math.sin(degreesToRadians(angle)) * barrelLength + tankBase.x
        const y  = Math.cos(degreesToRadians(angle)) * -barrelLength + tankBase.y
        return { x, y }
    }

    testCollision(obj1, obj2){
        const r1 = this.constructRect(obj1)
        const r2 = this.constructRect(obj2)
        const overlapX = this.overlap1D(r1.x, r2.x)
        const overlapY = this.overlap1D(r1.y, r2.y)
        return overlapX && overlapY
    }

    overlap1D(a, b){
        const a1 = Math.min(...a)
        const a2 = Math.max(...a)
        const b1 = Math.min(...b)
        const b2 = Math.max(...b)
        return (a1 >= b1 && a1 <= b2) || (a2 >= b1 && a2 <= b2) || (b1 >= a1 && b1 <= a2)
    }

    constructRect({position, width = 20, height=20, type="rect"} = {}){

        switch(type){

            case "bullet":

                return {
                    x: [position.x - width / 2, position.x + width / 2],
                    y: [position.y - height / 2, position.y + height / 2]
                }

            case "tank": 
                return {
                    x: [position.x - width / 2, position.x + width / 2],
                    y: [position.y, position.y + height]
                }
            default:
                return  {
                            x: [position.x, position.x + width],
                            y: [position.y, position.y - height]
                        }

        }
    }
}

const mounds = [
    {
        peakLocationX: 0,
        width: 400,
        height: 400
    }
]

export default new EarthPhysicsMachine({groundLevel: 50, mounds })