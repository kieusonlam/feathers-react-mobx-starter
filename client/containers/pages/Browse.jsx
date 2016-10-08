import React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { app } from '../../app'

// @observer(["state"]) // Only required if you use or change the state outside fetchData
@observer(["state", "actions"]) // For instance "actions" doesn't need to be injected if you only use it in fetchData
export default class Browse extends React.Component {
    @action static fetchData({state, actions, query}){
        state.app.title = 'Browse'
        state.browse.data = 'Loading...'
        state.browse.data2 = 'Loading...'
        // see client/actions.js file, this basically returns a promise with a timeout
        return actions.test3(state),
        actions.test(state, parseInt(query.wait)),
        actions.test2(state, parseInt(query.wait))
    }
    componentDidMount(){
        app.service('api/messages').on('created', message => this.props.actions.test3(this.props.state))
    }
    updateText = (ev) => {
      this.props.state.messages.text = ev.target.value
    }
    sendMessage = (ev) => {
      app.service('api/messages').create({
        text: this.props.state.messages.text
      }).then(() => { this.props.state.messages.text = '' })

      ev.preventDefault();
    }
    render() {
        // console.log(this.props)
        const messages = this.props.state.messages.items
        const messageList = messages.map(message => (
          <li key={message._id}>{message._id} {message.text}</li>
        ))

        return <section>
            <h1>Browse</h1>
            <p>This is delayed page example, executed on server and client alike</p>
            <p>Try refreshing and you'll see it takes 1 second to load this page, while changing routes on the client remains async</p>
            <p>{this.props.state.browse.data}</p>
            <p>{this.props.state.browse.data2}</p>
            <ul>{messageList}</ul>

            <form onSubmit={this.sendMessage}>
              <input type="text" name="text" onChange={this.updateText} />
              <button type="submit">Send</button>
            </form>
        </section>
    }
}
