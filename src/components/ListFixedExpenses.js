import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class ListFixedExpenses extends Component{
    
    render(){
        return(
            <>
            <h1>Edit Fixed Expenses</h1>
            <Link to={'/'}>Home</Link>
            </>
        )
    }
}

