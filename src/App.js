import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import Page from './components/Page'
import Palette from './components/Palette'
import PaletteList from './components/PaletteList'
import SingleColorPalette from './components/SingleColorPalette'
import NewPaletteForm from './components/NewPaletteForm'

import seedColors from './seedColors'
import {generatePalette} from './utilities/colorHelpers'

class App extends React.Component {
	constructor() {
		super()
		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
		this.state = {palettes: savedPalettes || seedColors}
	}
	
	findPalette = (id) => {
		return this.state.palettes.find(palette => palette.id === id)
	}

	savePalette = (newPalette) => {
		this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage)
	}

	deletePalette = (id) => {
		this.setState(prevState => ({
			palettes: prevState.palettes.filter(palette => palette.id !== id)
		}), this.syncLocalStorage)
	}

	syncLocalStorage() {
		window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
	}

	render() {
		return (
			<Route 
				render={({location}) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames='page' timeout={500}>
							<Switch location={location}>
								<Route 
									exact path='/' 
									render={(routeProps) => 
										<Page>
											<PaletteList 
												palettes={this.state.palettes} 
												{...routeProps}
												deletePalette={this.deletePalette}
											/>
										</Page>
									} 
								/>
								<Route 
									exact path="/palette/new"
									render={(routeProps) => 
										<Page>
											<NewPaletteForm  
												savePalette={this.savePalette} 
												palettes={this.state.palettes} 
												{...routeProps}
											/>
										</Page>
									}
								/>
								<Route 
									exact path='/palette/:id' 
									render={(routeProps) => (
										<Page>
											<Palette 
												palette={generatePalette(this.findPalette(routeProps.match.params.id))} 
											/>
										</Page>
									)}
								/>
								<Route 
									exact path='/palette/:paletteId/:colorId'
									render={(routeProps) => (
										<Page>
											<SingleColorPalette 
												colorId={routeProps.match.params.colorId}
												palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>	
		)
	}
}

export default App
