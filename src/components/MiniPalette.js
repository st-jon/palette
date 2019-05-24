import React from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from '../styles/MiniPaletteStyles'

class MiniPalette extends React.PureComponent {
    
    removePalette = (e) => {
        e.stopPropagation()
        this.props.openDialog(this.props.id)
    }

    handleClick = () => {
        this.props.goToPalette(this.props.id)
    }

    render() {
        const {classes, paletteName, emoji, colors} = this.props
        console.log(paletteName)
        const miniColorBoxes = colors.map(color => (
            <div 
                key={color.name}
                className={classes.miniColor} 
                style={{backgroundColor: color.color}}
            />
        ))
        return (
            <div className={classes.root} onClick={this.handleClick}>
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