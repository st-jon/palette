import React from 'react'
import Slider from 'rc-slider'

import ColorBox from './ColorBox'

import 'rc-slider/assets/index.css'
import '../styles/Palette.css'



class Palette extends React.Component {
    state = {level: 500}

    changeLevel = (level) => {
        this.setState({level})
    }

    render() {
        const {colors} = this.props.palette
        const {level} = this.state
        const colorBoxes = colors[level].map(color => {
            return <ColorBox  background={color.hex} name={color.name}/>
        })
        return (
            <div className="palette">
                <div className="slider">
                    <Slider 
                        defaultValue={level} 
                        min={100} 
                        max={900}
                        step={100}
                        onAfterChange={this.changeLevel}
                    />
                </div>
                <div className="palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Palette