import React from 'react'
import { inject, observer } from 'mobx-react'

@observer(["state","store"])
export default class Timer extends React.Component {
    static fetchData({state, store}){
        state.app.title = 'Timer'
    }

    componentDidMount() {
      const { store } = this.props

      store.timerStore.startTimer()
    }

    componentWillUnmount() {
      const { store } = this.props

      store.timerStore.stopTimer()
    }

    render() {
        const { store } = this.props

        return <section>
            <h1>Timer</h1>
            <p>{store.timerStore.counter}</p>
            <button onClick={store.timerStore.reset}>Reset</button>
            <button onClick={store.timerStore.decrement}>-10</button>
            <button onClick={store.timerStore.increment}>+10</button>
        </section>
    }
}
