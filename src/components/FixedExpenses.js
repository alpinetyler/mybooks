import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import LandingPage from './LandingPage'

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'

import ListFixedExpenses from './ListFixedExpenses'
import AddFixedExpense from './AddFixedExpense'

// var today = new Date();
// //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var year = today.getFullYear();
// var month = today.getMonth() + 1

//display number in us currency format
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
// })

class FixedExpenses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fixedexpenses: [],
            categories: [],
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

          //keep user logged in after refresh
          this.props.getUser()

    }

    componentDidUpdate(prevProps: any, prevState: any) {
        const { month, year} = this.state;
        if(month !== prevState.month || year !== prevState.year){
            axios.get('/api/expenses').then((res) => {
                this.setState({
                    fixedexpenses: res.data
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
            this.forceUpdate()
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
            // console.log(1111, id)
            axios.delete(`/api/fixedexpenses/${id}`)
            .then(res => this.setState({ fixedexpenses: res.data }))
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
        // console.log(22222, fixedexpense)
        axios.put(`/api/fixedexpenses/${fixedexpense.id}`, fixedexpense)
            .then(res => this.setState({ fixedexpenses: res.data }))
            .catch(err => console.log(err))
            // alert("Changes Saved")
    }

    render() {
        // let beginningBalance = 8000
        
        let { user } = this.props
        return (
            <div className="wrapper">
        <>    
        {user? // Only show months, totals, create month, and expenses if user is logged in
            <span>
                <h1 className="listExpense"><p>Monthly Fixed Expenses</p>
                {/* <p><Link className="btn fixedexpenses" to={'/'}>Home</Link></p> */}
              
                </h1>
                
                <table>
                    <tbody>
                    <tr>  
                                <td className="nameColumn myHeaderCell"><h3>Name</h3></td>
                                <td className="amountColumn myHeaderCell"><h3>Amount</h3></td>
                                <td className="notesColumn myHeaderCell"><h3>Notes</h3></td>
                                <td className="categoryColumn myHeaderCell"><h3>Category</h3></td>
                                <td className="deleteSaveColumn myHeaderCell"><h3>Del/Save</h3></td>
                </tr>
                {this.state.fixedexpenses.map((fixedexpense, index) => {
                    return (
                        <ListFixedExpenses
                            key={index}
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
                </span>
            :
            <span>
                <LandingPage />
            </span>
            }
            </> 

            </div>
        )
    }
}

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(FixedExpenses)