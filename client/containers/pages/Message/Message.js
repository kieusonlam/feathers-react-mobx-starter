import React from 'react'
import { inject, observer } from 'mobx-react'
import { app } from '../../../app'

@observer(["state","store"])
export default class Message extends React.Component {
    static fetchData({state, store}){
        state.app.title = 'Message'
    }

    componentDidMount() {
      const { store } = this.props
      store.messageStore.getMessages()
      app.service('messages').on('created', message => store.messageStore.getMessages());
    }

    componentWillUnmount() {
      const { store } = this.props

    }

    render() {
        const { store } = this.props
        console.log(store);
        // app.service('messages').find().then(page => console.log(page))
        const messages = store.messageStore.messages
        const messageList = messages.map(message => (
          <li>{message.text}</li>
        ))

        return <section>
            <h1>Message</h1>
            <ul>{messageList}</ul>
            {/* <button onClick={store.messageStore.getMessages()}>Get Messages</button> */}
        </section>
    }
}
