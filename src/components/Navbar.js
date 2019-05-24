import React from 'react' 
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

import Slider from 'rc-slider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

import 'rc-slider/assets/index.css'
import styles from '../styles/NavbarStyles'


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
        const {level, changeLevel, showSlider, classes} = this.props
        const {format, open} = this.state
        return (
            <div className={classes.navbar}>
                <div className={classes.logo}>
                    <Link to='/'>Color Picker</Link>
                </div>
                {showSlider &&<div className="slider-container">
                    <span>level: {level}</span>
                        <div className={classes.slider}>
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                </div>}
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange} >
                        <MenuItem value="hex">HEX</MenuItem>
                        <MenuItem value="rgb">RGB</MenuItem>
                        <MenuItem value="rgba">RGBA</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{vertical:'top', horizontal:'center'}} 
                    open={open}
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

export default withStyles(styles)(Navbar)