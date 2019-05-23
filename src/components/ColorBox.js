import React from 'react'
import {Link} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { withStyles } from '@material-ui/styles'
import styles from '../styles/ColorBoxStyles'

// import '../styles/ColorBox.css'

class ColorBox extends React.Component {
    constructor() {
        super()
        this.state = {copied: false}
    }

    changeCopyState = () => {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500)
        })
    }

    render() {
        const {name, background, paletteId, id, showLink, classes} = this.props
        const {copied} = this.state
    
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div style={{background}} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}></div>
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                        <h1 className={classes.copyText}>copied!</h1>
                        <div className={`${classes.copyBackground} ${classes.copyText}`}>{background}</div>
                    </div>
                        <div>
                            <div className={classes.boxContent}>
                                <span className={classes.colorName}>{name}</span>
                            </div>
                            <button className={classes.copyButton}>COPY</button>
                        </div>
                        {showLink && (
                            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                                <span className={classes.seeMore}>MORE</span>
                            </Link>
                        )}
                </div>
            </CopyToClipboard>
        )
    }
}
export default withStyles(styles)(ColorBox)