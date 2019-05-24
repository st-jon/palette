import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {arrayMove} from 'react-sortable-hoc'
import {ChromePicker} from 'react-color'

import PaletteFormNav from './PaletteFormNav'

import styles from '../styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }

    state = {
        open: true,
        currentColor: "teal",
        newColorName: "",
        colors: this.props.palettes[0].colors
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            this.state.colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        )
        ValidatorForm.addValidationRule("isColorUnique", value =>
            this.state.colors.every(({ color }) => color !== this.state.currentColor)
        )
    }
  
    handleDrawerOpen = () => {
        this.setState({ open: true })
    }
  
    handleDrawerClose = () => {
        this.setState({ open: false })
    }
  
    updateCurrentColor = (newColor) => {
         this.setState({ currentColor: newColor.hex })
    }
  
    addNewColor = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName,

        }
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" })
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit = (newPaletteName) => {
        const newPalette = {
            paletteName : newPaletteName,
            id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
            colors: this.state.colors
        }
        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }

    deleteBox = (colorName) => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
          colors: arrayMove(colors, oldIndex, newIndex),
        }))
    }

    clearColors = () => {
        this.setState({colors: []})
    }

    randomColors = () => {
        const allColors = this.props.palettes.map(p => p.colors).flat()
        const rand = Math.floor(Math.random() * allColors.length)
        this.setState({colors: [...this.state.colors, allColors[rand]]})
    }
  
    render() {
        const { classes, maxColors, palettes} = this.props
        const { open, colors } = this.state
        const paletteFull = colors.length >= maxColors
        
        return (
            <div className={classes.root}>
                <PaletteFormNav 
                    open={open} 
                    palettes={palettes} 
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                    paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant='h4'>Design Your Palette</Typography>
                    <div>
                        <Button variant='contained' color='secondary' onClick={this.clearColors}>
                            Clear Palette
                        </Button>
                        <Button 
                            variant='contained' 
                            color='primary' 
                            onClick={this.randomColors}
                            disabled={paletteFull}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ChromePicker
                    color={this.state.currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={this.addNewColor} ref='form'>
                        <TextValidator
                            value={this.state.newColorName}
                            name="newColorName"
                            onChange={this.handleChange}
                            validators={["required", "isColorNameUnique", "isColorUnique"]}
                            errorMessages={[
                            "Enter a color name",
                            "Color name must be unique",
                            "Color already used!"
                            ]}
                        />
                        <Button
                            variant='contained'
                            disabled={paletteFull}
                            type='submit'
                            color='primary'
                            style={{ backgroundColor: paletteFull ? 'grey' : this.state.currentColor }}
                        >
                            {paletteFull ? 'Palette Full' : 'Add Color'}
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                    [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList 
                        onSortEnd={this.onSortEnd}
                        colors={colors} 
                        removeColor={this.deleteBox} 
                        axis="xy"
                    />
                </main>
            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm)