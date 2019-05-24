import React from 'react'
import { withStyles } from '@material-ui/styles'
import {Link} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import DialogTitle from '@material-ui/core/DialogTitle';
import MiniPalette from './MiniPalette'

import styles from '../styles/PaletteListStyles'

class PaletteList extends React.Component {
    state = {
        openDelete: false,
        deletingId: ""
    }

    goToPalette = (id) => {
        this.props.history.push(`/palette/${id}`)
    }

    openDialog = (id) => {
        this.setState({openDelete: true, deletingId: id})
    }

    closeDialog = () => {
        this.setState({openDelete: false})
    }

    handleDelete = () => {
        this.props.deletePalette(this.state.deletingId)
        this.closeDialog()
    }

    render() {
        const {palettes, classes} = this.props
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Palettes</h1>
                        <Link to="/palette/new">
                            Create a new Palette
                        </Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition 
                                key={palette.id} 
                                classNames="fade"
                                timeout={500}
                            >
                                <MiniPalette 
                                    key={palette.id}
                                    id={palette.id}
                                    openDialog={this.openDialog}
                                    {...palette} 
                                    goToPalette={this.goToPalette}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>    
                </div>
                <Dialog open={this.state.openDelete} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
                    <DialogTitle id="delete-dialog-title">Delete this Palette ?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>    
                                <Avatar style={{background: blue[100], color: blue[600]}}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete"/>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>    
                                <Avatar style={{background: red[100], color: red[600]}}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel"/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>     
        )
    }
}

export default withStyles(styles)(PaletteList)