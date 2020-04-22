import React from 'react';
import {Switch, Route} from 'react-router-dom';
import EnterExpense from './components/EnterExpense';
import FixedExpenses from './components/FixedExpenses';
import EditCategories from './components/EditCategories';
import ShowMonthTotals  from './components/ShowMonthTotals';
import AddMonth from './components/AddMonth';

export default (
    <Switch>
        <Route exact path="/" component={EnterExpense} />
        <Route path="/FixedExpenses" component={FixedExpenses} />
        <Route path="/EditCategories" component={EditCategories} />
        <Route path="/ShowMonthTotals" component={ShowMonthTotals} /> 
        <Route path="/AddMonth" component={AddMonth} />  
    </Switch>
)