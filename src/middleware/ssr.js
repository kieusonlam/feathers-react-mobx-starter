'use strict';

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'mobx-react'

import fetchData from '../utils/fetchData'

import Html from '../utils/Html'

import createState from '../../client/state'
import createRoutes from '../../client/routes'

import timerStore from '../../client/containers/pages/Timer/store'
import messageStore from '../../client/containers/pages/Message/store'

module.exports = function() {
  return function(req, res, next) {
    // Create state to transfer
    const state = createState()

    // Set host variable to header's host
    state.app.host = req.headers.host

    // Create store object to transfer
    const store = {timerStore, messageStore}

    // Prepare for routing
    let matchRoutes = {
        routes : createRoutes(),
        location: req.originalUrl
    }

    // Route
    match(matchRoutes, (error, redirectLocation, renderProps) => {
        if (error) return res.status(500).send(error.message)
        if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.handleInput)
        if (!renderProps) return res.status(404).send('404 Not found')

        let statusCode = renderProps.routes[1].path !== '*' ? 200 : 404 // Check for "Not Found" page ( in this case we have path "*" ) and use code 404 if that's the case

        return fetchData(renderProps, state, store).then(() => {
            const content = ReactDOMServer.renderToStaticMarkup(<Provider {...{state, store}}><Html><RouterContext {...renderProps}/></Html></Provider>)
            return res.status(statusCode).send('<!DOCTYPE html>\n' + content)
        }).catch((err) => {
            res.status(400).send('400: An error has occured : ' + err)
        })
    })
  };
};
