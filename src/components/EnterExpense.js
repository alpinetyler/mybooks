import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import LandingPage from './LandingPage'

// import {Link} from 'react-router-dom';

import ListExpenses from './ListExpenses'
import AddExpense from './AddExpense'
import ShowMonthTotals from './ShowMonthTotals'
import AddMonth from './AddMonth';
// import Header from './Header';
// import FixedExpenses from './FixedExpenses'

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'



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

class EnterExpense extends Component {
    constructor(props) {
        super(props)

        // console.log("after super:", this.props.user)

        this.state = {
            expenses: [],
            categories: [],
            monthlist: [],
            month: '',
            year: '',
            beginningbalance:'',
            display: false,
            create: false,
            fixedexpenses: false
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

        // get logged in user info to pass as parameter to database
        let {user} = this.props
        let userid = user && user.id

        // console.log("EnterExpenseCDM:", userid)
       

        axios.get('/api/expenses', {
            params: {
                
                month: month,
                year: year,
                userid: userid
            }
        }).then((res) => {
            this.setState({
                expenses: res.data
            })
        }).catch(err => console.log('error getting expenses:', err))

        axios.get('/api/monthlist', {
            params: {

                userid: userid
            }
        }).then((res) => {
            //console.log("resdataformonthlistis ", res.data)
            this.setState({
                monthlist: res.data
            })
        }).catch(err => console.log('error getting month list:', err))

        axios.get('/api/beginningbalance', {
            params: {

                month: month,
                year: year,
                userid: userid
            }
        }).then((res) => {
            const {beginningbalance} = res.data[0]
            this.setState({
                beginningbalance: beginningbalance
            })
        }).catch(err => console.log('error getting beginning balance:', err))

        //keep user logged in after refresh
         this.props.getUser()

    }

    componentDidUpdate(prevProps: any, prevState: any) {
        const { month, year} = this.state;
        
        // get logged in user info to pass as parameter to database
        let { user } = this.props
        let id = user && user.id

        // console.log("componentDidUpdate:", id)
       

        if(month !== prevState.month || year !== prevState.year){
            axios.get('/api/expenses', {
                params: {
                    
                    month: month,
                    year: year,
                    userid: id
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

    setMonth = (month, year, beginningbalance) => {
        this.setState({
            month: month,
            year: year,
            beginningbalance: beginningbalance

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

    createMonth = newMonth => {
        axios.post('/api/monthlist', newMonth)
            .then(res => {
                this.setState({
                    monthlist: res.data,
                    create: false
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

                let { user } = this.props
                let userid = user && user.id

                //console.log(2222, id)
            axios.delete(`/api/expenses/${id}&${userid}`)
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
        let beginningbalance = this.state.beginningbalance
        let { user } = this.props
        //let id = user && user.id
        // console.log("render:", id)
        
        // console.log("this is the userid:", id)
        
        // console.log("beginning balance = ", beginningbalance)

        return (
            
            <div className="wrapper">
                

            <div className="fixtop">
            <>    
        {user? // Only show months, totals, create month, and expenses if user is logged in
            <span>
            <h3>
                    {/* <p>{year} Budget</p> */}
                {/* <p><Link className="btn fixedexpenses" to={'/FixedExpenses'}>Fixed Expenses</Link></p> */}
                
                <div className="dropdown">
                        <button className="dropbtn">Past Months</button>
                        <div className="dropdown-content">
                        {this.state.monthlist.map((monthlist, index) => {
                    return (
                        <span className="magicbutton" key={index} 
                        onClick={e => this.setMonth(monthlist.monthnumber, monthlist.years, monthlist.beginningbalance)}>
                            <a>{`${monthlist.monthname} ${monthlist.years}`}</a>
                            
                        </span>

                        
                    )
                })}
                        
                         </div>
                        </div>
                
                
                </h3>
                
                {
                    this.state.create ?
                     <div>
                         <AddMonth
                            createMonth={this.createMonth}
                            toggleCreate={this.toggleCreate}/>
                    </div>
                    :
                    <span className="magicbutton">
                    <span onClick={this.toggleCreate}><a>Add Month |  </a></span>
                    </span>
                }


                {
                    this.state.display ?
                        <div className="monthtotals">
                            <ShowMonthTotals
                              toggleDisplay={this.toggleDisplay}/>
                        </div>
                        :
                        <span className="magicbutton">  
                        <span onClick={this.toggleDisplay}><a>Show Totals</a></span>
                        </span>

                }
                <div><p></p></div>
                 <div id="listExpense">Beginning Balance = {formatter.format(beginningbalance)}</div>
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
               
               
                
                <AddExpense createExpense={this.createExpense} />  
                {this.state.expenses.map((expense, index) => {
                    return (
                        <ListExpenses
                            key={index}
                            expense={expense}
                            updateExpense={this.updateExpense}
                            deleteExpense={() => this.deleteExpense(expense.id)}
                            beginningBalance={this.state.beginningbalance} />

                    )
                })}
               
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
        
                

            </div>
        )
    }
}

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(EnterExpense)