import React from 'react'
import '../styles/ColorBox.css'

class ColorBox extends React.Component {
    render() {
        
        return (
            <div style={{background: this.props.background}} className="colorBox">
                <span>{this.props.name}</span>
                <span></span>
            </div>
        )
    }
}
export default ColorBox