import React from 'react';
import {Switch, Route} from 'react-router-dom';
import EnterExpense from './components/EnterExpense';
import FixedExpenses from './components/FixedExpenses';

export default (
    <Switch>
        <Route exact path="/" component={EnterExpense} />
        <Route path="/FixedExpenses" component={FixedExpenses} />
    </Switch>
)