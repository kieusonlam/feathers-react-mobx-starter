import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'

/**
 * Asynchronously load a file
 * @param main {String} - Main component
 * @returns {Function}
 */
function requireAsync(main) {
    return function(location, next) {
        next(null, require('./containers/pages/' + main))
    }
}

/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {Object}
 * @returns {Object}
 */
export default function createRoutes() {
    return (<Route component={App}>
                <Route path="/"      getComponent={requireAsync('Home')}/>
                <Route path="browse" getComponent={requireAsync('Browse')}/>
                <Route path="about"  getComponent={requireAsync('About')}/>
                <Route path="timer"  getComponent={requireAsync('Timer/Timer')}/>
                <Route path="chat"  getComponent={requireAsync('Message/Message')}/>
                <Route path="*"      getComponent={requireAsync('NotFound')}/>
            </Route>)
}
