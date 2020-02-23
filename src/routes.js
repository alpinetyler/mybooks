import React from 'react';
import {Switch, Route} from 'react-router-dom';
import EnterExpense from './components/EnterExpense';
import ListFixedExpenses from './components/ListFixedExpenses';

export default (
    <Switch>
        <Route exact path="/" component={EnterExpense} />
        <Route path="/ListFixedExpenses" component={ListFixedExpenses} />
    </Switch>
)