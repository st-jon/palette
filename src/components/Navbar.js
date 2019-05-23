import React from 'react' 
import {Link} from 'react-router-dom'

import Slider from 'rc-slider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

import 'rc-slider/assets/index.css'
import '../styles/Navbar.css'

class Navbar extends React.Component {
    state= {format: 'hex', open: false}

    handleFormatChange = (e) => {
        this.setState({format: e.target.value, open: true})
        this.props.handleChange(e.target.value)
    }

    closeSnackBar = () => {
        this.setState({open: false})
    }

    render() {
        const {level, changeLevel} = this.props
        const {format} = this.state
        return (
            <div className="navbar">
                <div className="logo">
                    <Link to='/'>Color Picker</Link>
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
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange} >
                        <MenuItem value="hex">HEX</MenuItem>
                        <MenuItem value="rgb">RGB</MenuItem>
                        <MenuItem value="rgba">RGBA</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{vertical:'top', horizontal:'center'}} 
                    open={this.state.open}
                    autoHideDuration={2000}
                    message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
                    ContentProps={{'aria-describedby': 'message-id'}}
                    onClose={this.closeSnackBar}
                    action={[<IconButton onClick={this.closeSnackBar} color='inherit' key='close' aria-label='close'>
                                <CloseIcon />
                            </IconButton>]}
                />
            </div>
        )
    }
}

export default Navbar