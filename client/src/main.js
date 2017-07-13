import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Root from './Root'
require('typeface-roboto')
require('./normalize.css')

injectTapEventPlugin()
renderRoot()
setupHotReloading()

function renderRoot() {
  render((
    <AppContainer>
      <Root />
    </AppContainer>
  ), document.getElementById('root'))
}

function setupHotReloading() {
  if (module.hot) {
    module.hot.accept('./Root', renderRoot)
  }
}
