import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';

import ListFixedExpenses from './ListFixedExpenses'
import AddFixedExpense from './AddFixedExpense'

// var today = new Date();
// //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var year = today.getFullYear();
// var month = today.getMonth() + 1

//display number in us currency format
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default class FixedExpenses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fixedexpenses: [],
            categories: []
            // monthlist: [],
            // month: '',
            // year: ''
        }
    }

    //function to toggle between display expense and edit expense
    toggleEdit = () =>
        this.setState({
            edit: !this.state.edit
        })

    componentDidMount() {
       
        axios.get('/api/fixedexpenses').then((res) => {
            this.setState({
                fixedexpenses: res.data
            })
        }).catch(err => console.log('error getting fixed expenses:', err))

        // axios.get('/api/monthlist').then((res) => {
        //     this.setState({
        //         monthlist: res.data
        //     })
        // }).catch(err => console.log('error getting month list:', err))

    }

    // componentDidUpdate(prevProps: any, prevState: any) {
    //     const { month, year} = this.state;
    //     if(month !== prevState.month || year !== prevState.year){
    //         axios.get('/api/expenses', {
    //             params: {
                    
    //                 month: month,
    //                 year: year
    //             }
    //         }).then((res) => {
    //             this.setState({
    //                 expenses: res.data
    //             })
    //         }).catch(err => console.log('error getting expenses:', err))
    //     }
  
    // }

    handleChange = e => {
        
        let { value, name } = e.target
        this.setState({
            [name]: value
        })
    }

    // setMonth = (month, year) => {
    //     this.setState({
    //         month: month,
    //         year: year
    //     })
    // }
    

    createFixedExpense = newFixedExpense => {
        axios.post('/api/fixedexpenses', newFixedExpense)
            .then(res => {
                this.setState({
                    fixedexpenses: res.data
                })
            }).catch(err => console.log(err))
    }

    deleteFixedExpense = id => {
        // from sweet alert
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this fixed expense!",
            icon: "warning",
            buttons: {
                cancel: "No, Don't Delete!",
                dangerMode: "Yes, Delete It!",
            },
            
          })
          .then((willDelete) => {
            if (willDelete) {
            axios.delete(`/api/fixedexpenses/${id}`)
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err))
              swal("Poof! Your fixed expense has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your fixed expense is safe!");
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

    updateFixedExpense = fixedexpense => {
        axios.put(`/api/fixedexpenses/${fixedexpense.id}`, fixedexpense)
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err))
            // alert("Changes Saved")
    }

    render() {
        // let beginningBalance = 8000
        
        //console.log(1111, this.state.monthlist)
        return (
            <div className="wrapper">
                
                <h1 id="listExpense"><p>Monthly Fixed Expenses</p>
                <p><Link to={'/'}>Home</Link></p>
                {/* {this.state.monthlist.map((monthlist, index) => {
                    return (
                        <button className="btn" key={index} 
                        onClick={e => this.setMonth(monthlist.monthnumber, monthlist.years)}>
                            {`${monthlist.monthname} ${monthlist.years}`}</button>
                        
                    )
                })} */}
                </h1>
                
                 {/* <span id="listExpense">Beginning Balance = {formatter.format(beginningBalance)}</span> */}
                <table>
                    <tbody>
                {this.state.fixedexpenses.map((fixedexpense, index) => {
                    return (
                        <ListFixedExpenses
                            key={fixedexpense.id}
                            fixedexpense={fixedexpense}
                            updateFixedExpense={this.updateFixedExpense}
                            deleteFixedExpense={() => this.deleteFixedExpense(fixedexpense.id)}
                            />

                    )
                })}
                <AddFixedExpense 
                createFixedExpense={this.createFixedExpense} />
                </tbody>
                </table>
               

            </div>
        )
    }
}

