import React, { Component } from 'react'
import axios from 'axios';

import ListExpenses from './ListExpenses'
import AddExpense from './AddExpense'

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

//display number in us currency format
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default class EnterExpense extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expenses: [],
            categories: [],
            month: '',
            year: ''
        }
    }

    //function to toggle between display expense and edit expense
    toggleEdit = () =>
        this.setState({
            edit: !this.state.edit
        })

    componentDidMount() {
        axios.get('/api/expenses', {
            params: {
                
                month: this.state.month,
                year: this.state.year
            }
        }).then((res) => {
            this.setState({
                expenses: res.data
            })
        }).catch(err => console.log('error getting expenses:', err))

    }
    

    createExpense = newExpense => {
        axios.post('/api/expenses', newExpense)
            .then(res => {
                this.setState({
                    expenses: res.data
                })
            }).catch(err => console.log(err))
    }

    deleteExpense = id => {
       
            axios.delete(`/api/expenses/${id}`)
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err))
        
        
    }
    
    handleClear = () => {
        this.setState({
            name: '',
            date: '',
            amount: '',
            ischecked: '',
            notes: '',
            category: '',
            class: ''
        })

    }

    updateExpense = expense => {
        axios.put(`/api/expenses/${expense.id}`, expense)
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err))
            // alert("Changes Saved")
    }

    render() {
        let beginningBalance = 10202.15
        console.log(4444, this.state.categories)

        return (
            <div className="wrapper">
                
                <h1 id="listExpense">
                    <select
                                name="month" onChange={this.handleChange}>
                                    value={this.state.month}
                                Selected<option>Choose Month</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                
                            </select> Budget 2019</h1>
                    <span id="listExpense">Beginning Balance = {formatter.format(beginningBalance)}</span>
                <table>
                    <tbody>
                {this.state.expenses.map((expense, index) => {
                    return (
                        <ListExpenses
                            key={expense.id}
                            expense={expense}
                            updateExpense={this.updateExpense}
                            deleteExpense={() => this.deleteExpense(expense.id)}
                            beginningBalance={beginningBalance} />

                    )
                })}
                <AddExpense createExpense={this.createExpense} />
                </tbody>
                </table>
               

            </div>
        )
    }
}

