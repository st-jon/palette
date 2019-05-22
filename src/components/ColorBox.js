import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import '../styles/ColorBox.css'

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
        const {name, background} = this.props
        const {copied} = this.state
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="colorBox">
                <div style={{background}} className={`copy-overlay ${copied && 'show'}`}></div>
                <div className={`copy-message ${copied && 'show'}`}>
                    <h1>copied!</h1>
                    <div className="copy-background">{background}</div>
                </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-btn">COPY</button>
                    </div>
                    <span className="more">More</span>
                </div>
            </CopyToClipboard>
        )
    }
}
export default ColorBox