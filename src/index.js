import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.css'
import Home from './views/home'
import Register from "./views/register"
import ExhibitionList from './views/exhibitionlist'

const App = () => {
  return (
    <Router>
      <div>
        <Route component={Register} exact path="/" />
        <Route component={Register} exact path="/register" />
        <Route component={ExhibitionList} exact path="/exhibitionlist" />

      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
