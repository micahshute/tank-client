import React, {Component} from 'react'
import { isRejected } from 'q';

class Explosion extends Component{

    constructor(props){
        super(props)

        this.state = {
            style: {
                fill: '#ff5000',
                stroke: '#5c5c5c'
            },
            size: {
                rx: 40,
                ry: 25
            },
            occurring: true, 
            growing: true
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.updateSize()
        }, 10)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    updateSize = () => {
        const { size, growing } = this.state
        if(growing){
            this.setState({
                size: {
                    rx: size.rx + 10,
                    ry: size.ry + 10
                }
            })
            if(size.rx > 100){
                this.setState({
                    growing: false
                })
            }
        }else{
            this.setState({
                size: {
                    rx: size.rx - 10,
                    ry: size.ry - 10
                }
            })
            if(size.rx < 5){
                this.setState({
                    occurring: false
                })
                this.props.completeExplosion()
            }
        }
    }

    renderExplosion = () => {
        if(this.state.occurring){
            return <ellipse 
                cx={this.props.position.x}
                cy={this.props.position.y}
                rx={this.state.size.rx}
                ry={this.state.size.ry}
                style={this.state.style}
            />
        }else{
            return null
        }
    }

    render(){
        return this.renderExplosion()
    }
    
    
}


export default Explosion