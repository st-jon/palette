import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Palette from './components/Palette'

import seedColors from './seedColors'
import {generatePalette} from './utilities/colorHelpers'

function App() {
	return (
		<Switch>
			<Route exact path='/' render={() => <h1>Menu here</h1>} />
			<Route exact path='/palette/:id' render={() => <h1>individual palette</h1>} />
		</Switch>
		
	)
}

export default App
