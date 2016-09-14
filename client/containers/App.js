import React from 'react'
import Menu from '../components/Menu'

var menuData = [
  {title: "Home", path:""},
  {title: "Browse", path:"Browse"},
  {title: "About", path:"about"},
  {title: "Timer", path:"timer"},
  {title: "Message", path:"chat"},
  {title: "Not Found", path:"this_url_doesnt_exist"},
]

export default class App extends React.Component {
    render(){
        return <div>
            <Menu prefix='/' data={menuData} />
            {this.props.children}
        </div>
    }
}
