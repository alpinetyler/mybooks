import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
// import {Link} from 'react-router-dom';

import ListReserveExpenses from './ListReserveExpenses'
import AddReserveExpense from './AddReserveExpense'
// import ShowMonthTotals from './ShowMonthTotals'
// import AddMonth from './AddMonth';
// import Header from './Header';
// import FixedExpenses from './FixedExpenses'

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

export default class ReserveExpenses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expenses: [],
            categories: [],
            month: '',
            year: '',
            display: false,
            create: false,
            edit: false
        }
    }

    //function to toggle between display expense and edit expense
    toggleEdit = () =>
        this.setState({
            edit: !this.state.edit
        })

    toggleDisplay = () =>
        this.setState({
            display: !this.state.display
        })

    toggleCreate = () => {
        this.setState({
            create: !this.state.create
        })
        }

    componentDidMount() {
       
        axios.get('/api/reserveexpenses', {
            // params: {
                
            // //     month: month,
            // //     year: year
            // // }
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
    }

    setMonth = (month, year) => {
        this.setState({
            month: month,
            year: year
        })
    }
    

    createReserveExpense = newReserveExpense => {
        // console.log(111, newReserveExpense)
        axios.post('/api/reserveexpenses', newReserveExpense)
            .then(res => {
                this.setState({
                    expenses: res.data
                })
            }).catch(err => console.log(err))
    }


    deleteReserveExpense = id => {
        // from sweet alert
        // console.log(555, id )
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
                //console.log(2222, id)
            axios.delete(`/api/reserveexpenses/${id}`)
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err))
              swal("Poof! Your expense has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your reserve expense is safe!");
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

    updateReserveExpense = expense => {
        axios.put(`/api/reserveexpenses/${expense.id}`, expense)
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err))
            // alert("Changes Saved")
    }

    render() {
        // let beginningBalance = 8000
        // console.log(11111, this.state.expenses)
        
        //console.log(1111, this.state.monthlist)
        return (
            <div className="wrapper">
                

            <div className="fixtop">
            
                
                
                 <div><h2>Reserve Account</h2></div>
                 <div>
                    
                 </div>
                 
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
                        <ListReserveExpenses
                            key={index}
                            expense={expense}
                            updateExpense={this.updateReserveExpense}
                            deleteReserveExpense={() => this.deleteReserveExpense(expense.id)}
                             />

                    )
                })}
                <AddReserveExpense createReserveExpense={this.createReserveExpense} />
                </tbody>
                </table>
               
            </div>
        
                

            </div>
        )

       

        
    }
}