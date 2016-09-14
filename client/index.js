import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, RouterContext, browserHistory } from 'react-router'

import createState from './state'
import createRoutes from './routes'

import autorun from './autorun'

import timerStore from './containers/pages/Timer/store'
import messageStore from './containers/pages/Message/store'

// Import our styles
require('./assets/css/index.scss')

// Initialize stores & inject server-side state into front-end
const state = createState(window.__STATE)
const store = {timerStore, messageStore}

// Setup autorun ( for document title change )
autorun(state)

// Wrap RouterContext with Provider for state transfer
function createElement(props) {
    return <Provider {...{state, store}}>
        <RouterContext {...props} />
    </Provider>
}

var ignoreFirstLoad = true
function onRouterUpdate() {

    if (ignoreFirstLoad){
        ignoreFirstLoad=false
        return
    }
    //console.log("Page changed, executing fetchData")
    let params = this.state.params;

    this.state.components.filter(c => c.fetchData).forEach(c => {
        c.fetchData({ state, params, store })
    })
}


// Render HTML on the browser
function renderRouter() {
    render(<Router history={browserHistory}
                render={createElement}
                onUpdate={onRouterUpdate}
                routes={createRoutes()}/>,
    document.getElementById('root'))
}

renderRouter()
