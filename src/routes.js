import React from 'react';
import {Switch, Route} from 'react-router-dom';
import EnterExpense from './components/EnterExpense';
import FixedExpenses from './components/FixedExpenses';
import EditCategories from './components/EditCategories';
import ShowMonthTotals  from './components/ShowMonthTotals';
import AddMonth from './components/AddMonth';
import ReserveExpenses from './components/ReserveExpenses';

export default (
    <Switch>
        <Route exact path="/" component={EditCategories} />
        <Route path="/FixedExpenses" component={FixedExpenses} />
        <Route path="/EnterExpense" component={EnterExpense} />
        <Route path="/ShowMonthTotals" component={ShowMonthTotals} /> 
        <Route path="/AddMonth" component={AddMonth} />  
        <Route path="/ReserveExpenses" component={ReserveExpenses} />
    </Switch>
)