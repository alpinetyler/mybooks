import React, { Component } from 'react'
import axios from 'axios';

import ListExpenses from './ListExpenses'
import AddExpense from './AddExpense'

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var year = today.getFullYear();
var month = today.getMonth() + 1

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
                
                month: month,
                year: year
            }
        }).then((res) => {
            this.setState({
                expenses: res.data
            })
        }).catch(err => console.log('error getting expenses:', err))

    }

    handleChange = e => {
        
        let { value, name } = e.target
        this.setState({
            [name]: value
        })

        console.log(333, this.state.month)

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
        console.log(777, this.state.month, this.state.year)
        return (
            <div className="wrapper">
                
                <h1 id="listExpense">
                    <select
                                name="month" onChange={this.handleChange}>
                                Selected<option>Choose month</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                                
                            </select> Budget  
                            <select
                                name="year" onChange={this.handleChange}>
                                Selected<option value="2019">2019</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                
                            </select></h1>
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

