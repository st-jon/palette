import React from 'react'

export default(props) => {
    const {paletteName, emoji} = props
    return (
        <footer className="palette-footer">
            {paletteName}
            <span className='emoji'>{emoji}</span>
        </footer>
    )
}