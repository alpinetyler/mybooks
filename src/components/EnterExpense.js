import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

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

    componentDidUpdate(prevProps: any, prevState: any) {
        const { month, year} = this.state;
        if(month !== prevState.month || year !== prevState.year){
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
  
    }

    handleChange = e => {
        
        let { value, name } = e.target
        this.setState({
            [name]: value
        })
    }

    setMonth = (month, year) => {
        this.setState({
            month: month,
            year: year
        })
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

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this expense!",
            icon: "warning",
            buttons: {
                cancel: "No, Don't Delete!",
                dangerMode: "Yes, Delete It!",
            },
            
          })
          .then((willDelete) => {
            if (willDelete) {
            axios.delete(`/api/expenses/${id}`)
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err))
              swal("Poof! Your expense has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your expense is safe!");
            }
          });
    //    if (swal("Are you sure you want to delete this expense?")){
        
        // if user clicks "ok" dexpense is deleted
            // axios.delete(`/api/expenses/${id}`)
            // .then(res => this.setState({ expenses: res.data }))
            // .catch(err => console.log(err))
       
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
        let beginningBalance = 8000
        return (
            <div className="wrapper">
                
                <h1 id="listExpense"><p>Budget</p>
                    
                    <button onClick={e => this.setMonth("7", "2019")}>July 2019</button>
                    <button onClick={e => this.setMonth("8", "2019")}>August 2019</button>
                    <button onClick={e => this.setMonth("9", "2019")}>September 2019</button>
                    <button onClick={e => this.setMonth("10", "2019")}>October 2019</button>
                    <button onClick={e => this.setMonth("11", "2019")}>November 2019</button>
                    <button onClick={e => this.setMonth("12", "2019")}>December 2019</button>
                    <button onClick={e => this.setMonth("1", "2020")}>January 2019</button>
                    <button onClick={e => this.setMonth("2", "2020")}>February 2019</button>

                    {/* <select
                                name="month" onChange={this.handleChange}>
                                Selected<option>Choose month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                                
                            </select> 
                            <select
                                name="year" onChange={this.handleChange}>
                                Selected<option>Choose Year</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                
                            </select> */}
                            </h1>
                            
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

