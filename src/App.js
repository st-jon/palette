import React from 'react'
import Palette from './components/Palette'

import seedColors from './seedColors'
import {generatePalette} from './utilities/colorHelpers'

function App() {
	return (
		<div className="App">
			<Palette palette={generatePalette(seedColors[4])}/>
		</div>
	)
}

export default App
