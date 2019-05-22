import React from 'react' 
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
import '../styles/Navbar.css'

class Navbar extends React.Component {
    render() {
        const {level, changeLevel} = this.props
        return (
            <div className="navbar">
                <div className="logo">
                    <a href="#">Color Picker</a>
                </div>
                <div className="slider-container">
                <span>level: {level}</span>
                    <div className="slider">
                        <Slider 
                            defaultValue={level} 
                            min={100} 
                            max={900}
                            step={100}
                            onAfterChange={changeLevel}
                        />
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Navbar