import React from 'react'

import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'

import '../styles/Palette.css'



class Palette extends React.Component {
    state = {level: 500, format: 'hex'}

    changeLevel = (level) => {
        this.setState({level})
    }

    changeFormat = (value) => {
        this.setState({format: value})
    }

    render() {
        const {colors, paletteName, emoji, id} = this.props.palette
        const {level, format} = this.state
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                key={color.id} 
                background={color[format]} 
                name={color.name}
                id={color.id}
                paletteId={id}
                showLink={true}
            />
        ))
        return (
            <div className="palette">
            <Navbar 
                level={level} 
                changeLevel={this.changeLevel} 
                handleChange={this.changeFormat}
                showSlider={true}
            />
                <div className="palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default Palette