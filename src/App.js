import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LazyLoader from './menu/LazyLoader/LazyLoader';
import Menu from './menu/Menu';
import { ReactComponent as CaretIcon } from './menu/Icons/caret.svg';
import './App.css';

const ObjectDetectionPage = React.lazy(() => import('./pages/ObjectDetectionPage'));
const SignDetectPage = React.lazy(() => import('./pages/SignDetectionPage'));

function App() {
  return (
    <Router>
      <Menu navIcon={<CaretIcon />} title={'React Tensorflow'} />
      <Switch>
        <Route exact path="/" component={LazyLoader(ObjectDetectionPage)} />
        <Route exact path="/sign-detect" component={LazyLoader(SignDetectPage)} />
      </Switch>
    </Router>
  );
}

export default App;
