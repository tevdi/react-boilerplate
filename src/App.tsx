import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import history from './browserhistory';
import ClassComp from './ClassComp';
import FuncComp from './FuncComp';

import './styles/App.scss';

const basename = process.env.BASENAME || '/';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Title</h1>
        </header>
        <div>
          {/* <Router history={ history } basename={ basename }> */}
          <Router basename={basename}>
            <Routes>
              <Route path="/class-comp" element={<ClassComp />} />
              {/* 
              <Route exact path="/some-route/:id?" component={SomeComponent}>
              </Route>
              <Route exact path="/some-route/:id" component={AnotherComponent}>
              </Route> 
              */}
              <Route
                path="/"
                element={
                  <>
                    <ClassComp />
                    <FuncComp />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
