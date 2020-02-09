import React, {Component} from 'react'

import EditExpense from './EditExpense'
import '../App.css'



//display number in us currency format
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default class ListExpense extends Component {

    constructor(props) {
        super(props)

        this.state = {
            edit: false
        }
    }

    //function to toggle between dipslay expenses and edit expense
    toggleEdit = () => 
        this.setState({
            edit: !this.state.edit
        })

        

    render() {
        let {expense, updateExpense, beginningBalance} = this.props
        
        console.log(2222, expense.month, expense.day)
        
        // let {user} = this.props
        // let admin = user && user.isadmin
        
        return (
            <>

                {
                    this.state.edit ?
                        <>
                            <EditExpense    
                                expense = {expense}
                                toggleEdit={this.toggleEdit}
                                updateExpense={updateExpense} />
                        </>

                        :

                        <>
               <tr>

                <td onClick={this.toggleEdit} style={styles.colOne} id="listExpense">
                    {expense.month}/{expense.day}
                </td>
                <td onClick={this.toggleEdit} style={styles.colTwo} id="listExpense" className={`${expense.category}`}>
                    {expense.name}
                </td>
                <td onClick={this.toggleEdit} style={styles.colThree} id="listExpense" className={`${expense.category}`}>
                    {formatter.format(expense.amount)}
                </td>
                <td onClick={this.toggleEdit} style={styles.checkbox} id="listExpense" className={`${expense.category}`}>
                    <input
                    type="checkbox"
                    defaultChecked={expense.ischecked}
                    />
                </td>
                <td onClick={this.toggleEdit} style={styles.notes} id="listExpense" className={`${expense.category}`}>
                    {expense.notes}
                </td>
                <td onClick={this.toggleEdit} style={styles.colFour} id="listExpense" className={`${expense.category}`}>
                    {expense.category}
                </td>
                <td style={styles.colFive} id="listExpense">
                    {formatter.format(beginningBalance - expense.running_total)}
                </td>
                <td style={styles.colSix}>

                {/* <span style={styles.edit} onClick={this.toggleEdit}><span className="hoveredit">&#9998;</span>  /   </span> */}
                <span style={styles.edit} className="fa" onClick={this.props.deleteExpense}><span className="hoverdelete"> &#xf014;</span></span>
                </td>
               </tr>

               </>


                }

        </>
        )
    }
   
}

let styles = {
  
    colOne: {
        width: 100
    },
    colTwo: {
        width: 100,
        textAlign: "left",
        paddingLeft: "10px"
    },
    colThree: {
        width: 100,
        textAlign: "right",
        paddingLeft: "10px"
    },
    colFour: {
        width: 100,
        textAlign: "left",
        paddingLeft: "20px"
    },
    colFive: {
        width: 75,
        textAlign: "left",
        paddingLeft: "10px"
    },
    colSix: {
        width: 150
    },
    icon: {
        fontSize: '25px',
        cursor: 'pointer',
    },

    edit: {
        fontSize: 25,
        cursor: 'pointer'
    },
    checkbox: {
        width: '10px'
    },
    notes: {
        width: '100px'
    }
}
