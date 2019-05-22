import React from 'react'

import ColorBox from './ColorBox'
import Navbar from './Navbar'

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
            <Navbar level={level} changeLevel={this.changeLevel}/>
                <div className="palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Palette