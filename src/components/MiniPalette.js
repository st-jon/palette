import React from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from '../styles/MiniPaletteStyles'

class MiniPalette extends React.Component {
    
    removePalette = (e) => {
        e.stopPropagation()
        this.props.handleDelete(this.props.id)
    }

    render() {
        const {classes, paletteName, emoji, colors} = this.props
        const miniColorBoxes = colors.map(color => (
            <div 
                key={color.name}
                className={classes.miniColor} 
                style={{backgroundColor: color.color}}
            />
        ))
        return (
            <div className={classes.root} onClick={this.props.handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    style={{transition: 'all .5s ease-in-out'}}
                    onClick={this.removePalette}
                />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>
                    {paletteName} 
                    <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        )
    }   
}

export default withStyles(styles)(MiniPalette)