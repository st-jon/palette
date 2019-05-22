import React from 'react'
import ColorBox from './ColorBox'
import '../styles/Palette.css'

class Palette extends React.Component {
    render() {
        const colorBoxes = this.props.colors.map(color => {
            return <ColorBox  background={color.color} name={color.name}/>
        })
        return (
            <div className="palette">
                <div className="palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Palette