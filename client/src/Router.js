import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";

import App from "./App";
import EachRecipe from "./EachRecipe";
import History from './History';

const Router = () => (
    <BrowserRouter>
        <Switch>
        <Route path="/" component={App} exact/>
        <Route path="/eachrecipe/:id" component={EachRecipe} />
        <Route path="/history" component={History}/> 
        </Switch>
    </BrowserRouter>
);

export default Router;