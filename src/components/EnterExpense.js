import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';

import ListExpenses from './ListExpenses'
import AddExpense from './AddExpense'

var today = new Date();
//var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
            monthlist: [],
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

        axios.get('/api/monthlist').then((res) => {
            this.setState({
                monthlist: res.data
            })
        }).catch(err => console.log('error getting month list:', err))

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
        // from sweet alert
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
        
        //console.log(1111, this.state.monthlist)
        return (
            <div className="wrapper">
                
                <h1 id="listExpense"><p>Budget</p>
                <p><Link to={'/FixedExpenses'}>Fixed Expenses</Link></p>
                {this.state.monthlist.map((monthlist, index) => {
                    return (
                        <button className="btn" key={index} 
                        onClick={e => this.setMonth(monthlist.monthnumber, monthlist.years)}>
                            {`${monthlist.monthname} ${monthlist.years}`}</button>
                        
                    )
                })}</h1>
                 <span id="listExpense">Beginning Balance = {formatter.format(beginningBalance)}</span>
                 <table>
                 <tbody>
                 <tr>
                                <td className="dateColumn myHeaderCell"><h3>Date</h3></td>
                                <td className="nameColumn myHeaderCell"><h3>Name</h3></td>
                                <td className="amountColumn myHeaderCell"><h3>Amount</h3></td>
                                <td className="√Column myHeaderCell"><h3>√</h3></td>
                                <td className="notesColumn myHeaderCell"><h3>Notes</h3></td>
                                <td className="categoryColumn myHeaderCell"><h3>Category</h3></td>
                                <td className="balanceColum myHeaderCell"><h3>Balance</h3></td>
                                <td className="deleteSaveColumn myHeaderCell"><h3>Del/Save</h3></td>
                </tr>
               
                
                    
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
let styles = {
  
    dateColumn: {
        width: 75,
        textAlign: "left",
        paddingLeft: "10px"
    },
    nameColumn: {
        width: 100,
        textAlign: "left",
        paddingLeft: "10px"
        
    },
    amountColumn: {
        width: 100,
        textAlign: "right",
        paddingLeft: "10px"
    },
    notesColumn: {
        width: 100,
        textAlign: "left",
        paddingLeft: "10px"
    },
    categoryColumn: {
        width: 100,
        textAlign: "left",
        paddingLeft: "10px"
    },
    balanceColumn: {
        width: 100
    },
    deleteColunn: {
        width: 100,
        textAlign: "left",
        paddingLeft: "10px"
    },

    edit: {
        fontSize: 25,
        cursor: 'pointer'
    },
    checkbox: {
        width: 20
    },
    notes: {
        width: '100px'
    }
}

