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
            edit: false,
        }
    }

    //function to toggle between dipslay expenses and edit expense
    toggleEdit = () => 
        this.setState({
            edit: !this.state.edit
        })


    render() {
        let {expense, updateExpense} = this.props //removed beginningBalance, not needed?
        
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

                <td className="myTableCell dateColumn listExpense" onClick={this.toggleEdit}>
                    {expense.date}
                </td>
                <td onClick={this.toggleEdit} className={`${expense.category} listExpense myTableCell nameColumn`}>
                    {expense.name}
                </td>
                <td onClick={this.toggleEdit} className={`${expense.category} listExpense myTableCell amountColumn`}>
                    {formatter.format(expense.amount)}
                </td>
                <td onClick={this.toggleEdit} id="mycheckbox" className={`${expense.category} listExpense myTableCell √Column`}>
                    {expense.ischecked}
                </td>
                <td onClick={this.toggleEdit} className={`${expense.category} listExpense myTableCell notesColumn`}>
                    {expense.notes}
                </td>
                <td onClick={this.toggleEdit} className={`${expense.category} listExpense myTableCell categoryColumn`}>
                    {expense.category}
                </td>
                <td className="myTableCell balanceColumn listExpense">
                    {formatter.format(expense.running_total)}
                </td>
                <td className="myTableCell deleteSaveColumn" style={styles.colSix}>
                <span style={styles.edit} className="fa" onClick={this.props.deleteReserveExpense}><span className="hoverdelete"> &#xf014;</span></span>
                </td>
               </tr>

               </>



                }

        </>
        )
    }
   
}

let styles = {
  
   
    colTwo: {
        width: 100,
        textAlign: "left",
        paddingLeft: "10px"
    },
    colThree: {
        width: 100,
        textAlign: "right",
        paddingRight: "10px"
    },
    colFour: {
        width: 100,
        textAlign: "left",
        paddingLeft: "20px"
    },
    colFive: {
        width: 100,
        textAlign: "left",
        paddingLeft: "10px"
    },
    colSix: {
        width: 100
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
        width: 15
    },
    notes: {
        width: '100px'
    }
}
