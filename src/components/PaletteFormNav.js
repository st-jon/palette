import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from "react-material-ui-form-validator";

import PaletteModal from './PaletteModal'

import styles from '../styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
    state = {
        newPaletteName: "",
        showModal: false
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        )
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    showModal = () => {
        this.setState({showModal: true})
    }

    hideModal = () => {
        this.setState({showModal: false})
    }

    render() {
        const { classes, open, palettes, handleSubmit } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    color='default'
                    className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Create A Palette
                        </Typography>   
                    </Toolbar>
                    <div className={classes.navBtn}>
                        <Button
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            onClick={this.showModal}
                        >
                        Save Palette
                        </Button>
                        <Link className={classes.link} to='/'>
                            <Button 
                                className={classes.button}
                                variant='contained' 
                                color='secondary'
                            >
                            Go Back
                            </Button>
                      </Link>
                      {this.state.showModal && <PaletteModal palettes={palettes} handleSubmit={handleSubmit} hideModal={this.hideModal} />}
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)