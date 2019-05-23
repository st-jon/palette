import React, { Component } from 'react'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {ChromePicker} from 'react-color'

import DraggableColorBox from './DraggableColorBox'

import styles from '../styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {
    state = {
        open: true,
        currentColor: 'teal',
        colors: ['purple', 'red']
      }
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
      }
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      }

      updateCurrentColor = (newColor) => {
          this.setState({currentColor: newColor.hex})
      }

      addNewColor = () => {
          this.setState({colors: [...this.state.colors, this.state.currentColor]})
      }
    
      render() {
        const { classes } = this.props;
        const { open } = this.state;
    
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <Divider />

                <Typography variant="h4">
                    Design Your Palette
                </Typography>
                <div className="button-container">
                        <Button variant="contained" color="secondary">Clear Palette</Button>
                    <Button variant="contained" color="primary">Random Color</Button>
                </div>
                <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor}/>
                <Button 
                    style={{backgroundColor: this.state.currentColor}} 
                    variant="contained" color="primary"
                    onClick={this.addNewColor}
                >
                Add Color
                </Button>
            </Drawer>

            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              {this.state.colors.map(color => <DraggableColorBox color={color} />)}
            </main>

          </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm)
