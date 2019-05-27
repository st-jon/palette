import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {ChromePicker} from 'react-color'

import styles from '../styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {
    state = {
        currentColor: "teal",
        newColorName: "",
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            this.props.colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        )
        ValidatorForm.addValidationRule("isColorUnique", value =>
            this.props.colors.every(({ color }) => color !== this.state.currentColor)
        )
    }

    handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.setState({newColorName: ""})
    }

    updateCurrentColor = (newColor) => {
        this.setState({ currentColor: newColor.hex })
   }

    render() {
        const {paletteFull, classes} = this.props
        const {newColorName, currentColor} = this.state
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                    width="100%"
                />
                <ValidatorForm onSubmit={this.handleSubmit} ref='form' instantValidate={false}>
                    <TextValidator
                        className={classes.colorNameInput}
                        value={newColorName}
                        placeholder="Color Name"
                        autoComplete='off'
                        name="newColorName"
                        variant='filled'
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={[
                        "Enter a color name",
                        "Color name must be unique",
                        "Color already used!"
                        ]}
                    />
                    <Button
                        className={classes.addColor}
                        variant='contained'
                        disabled={paletteFull}
                        type='submit'
                        color='primary'
                        style={{ backgroundColor: paletteFull ? 'grey' : currentColor }}
                    >
                        {paletteFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ColorPickerForm)
