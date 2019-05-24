import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'

class PaletteModal extends Component {
    state = {
        stage:"form",
        newPaletteName: ""
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        )
        ValidatorForm.addValidationRule("isPaletteNameNotNew", value =>
            value === "new" ? false : true
        )
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value})
    }
    handleClickOpen = () => {
        this.setState({ open: true })
    }
    
    handleClose = () => {
        this.setState({ open: false })
    }

    showEmojiPicker = () => {
        this.setState({stage: 'emoji'})
    }

    savePalette = (emoji) => {
        const newPalette = {paletteName: this.state.newPaletteName, emoji: emoji.native}
        this.props.handleSubmit(newPalette)
        this.setState({stage: ''})
    }
    
    render() {
        const { newPaletteName, stage } = this.state
        const { hideModal } = this.props
        return (
            <div className="">
                <Dialog 
                    open={stage === 'emoji'}
                    onClose={hideModal}
                >
                    <DialogTitle id='form-dialog-title'>Choose an Emoji</DialogTitle>
                    <Picker 
                        onSelect={this.savePalette}
                        title="Pick an Emoji"
                    />
                </Dialog>
                <Dialog
                    open={stage === 'form'}
                    onClose={hideModal}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
                    <ValidatorForm
                        onSubmit={this.showEmojiPicker}
                    >
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new Palette.
                        </DialogContentText>
                        <TextValidator
                            fullWidth
                            margin="normal"
                            autoComplete="off"
                            label='Palette Name'
                            value={newPaletteName}
                            name='newPaletteName'
                            onChange={this.handleChange}
                            validators={["required", "isPaletteNameUnique", "isPaletteNameNotNew"]}
                            errorMessages={["Enter Palette Name", "Name already used", "new is not a correct name"]}
                        />
                        
                    </DialogContent>
                        <DialogActions>
                            <Button onClick={hideModal} color='primary'>
                                Cancel
                            </Button>
                            <Button variant='contained' color='primary' type='submit'>
                                Save Palette
                            </Button>
                        
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}


export default PaletteModal