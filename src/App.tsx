import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import history from './history'
import ClassComp from './ClassComp'
import FuncComp from './FuncComp'

require('./css/App.scss')

const basename = process.env.ROUTER_BASENAME || '/'

class App extends React.Component {
  render() {
    return (
      <>
        <header>
        <h1>Title</h1>
        </header>
        <div>
          { /* <Router history={ history } basename={ basename }> */ }
          <Router basename={ basename }>
            <Switch>
            <Route exact path="/class-comp" component={ClassComp}>
              </Route>
              { /* 
              <Route exact path="/some-route/:id?" component={SomeComponent}>
              </Route>
              <Route exact path="/some-route/:id" component={AnotherComponent}>
              </Route> 
              */ }
              <Route path="/">
                <ClassComp/>
                <FuncComp/>
              </Route>
            </Switch>
          </Router>
        </div>
      </>
    )
  }
}

export default App
