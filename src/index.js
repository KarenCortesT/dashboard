import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './dashboard/style.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Login from './login/index';
import {BrowserRouter, Route,Redirect,Switch} from 'react-router-dom';
import { NotFound } from './NotFound';


const Root =(

  <ThemeProvider theme ={theme}>
    <BrowserRouter>
      <Switch>
        <Route path = "/dashboard" component = {App} />
        <Route path="/login" component={Login} />
            <Redirect from = "/" to="/login" />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>

);


ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
