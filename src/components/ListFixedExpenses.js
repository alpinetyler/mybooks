import React, {Component} from 'react'

import EditFixedExpense from './EditFixedExpense'
import '../App.css'



//display number in us currency format
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default class ListFixedExpense extends Component {

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
        let {fixedexpense, updateFixedExpense} = this.props
        
        // let {user} = this.props
        // let admin = user && user.isadmin
        
        return (
            <>

                {
                    this.state.edit ?
                        <>
                            <EditFixedExpense   
                                fixedexpense = {fixedexpense}
                                toggleEdit={this.toggleEdit}
                                updateFixedExpense={updateFixedExpense} />
                        </>

                        :

                        <>
               <tr>

                <td onClick={this.toggleEdit} style={styles.colOne} id="listExpense">
                    {/* {expense.month}/{expense.day} */}
                    {/* {fixedexpense.date} */}
                </td>
                <td onClick={this.toggleEdit} style={styles.colTwo} id="listExpense" className={`${fixedexpense.category}`}>
                    {fixedexpense.name}
                </td>
                <td onClick={this.toggleEdit} style={styles.colThree} id="listExpense" className={`${fixedexpense.category}`}>
                    {formatter.format(fixedexpense.amount)}
                </td>
                <td onClick={this.toggleEdit} style={styles.checkbox} id="mycheckbox" className={`${fixedexpense.category}`}>
                    {/* {expense.ischecked} */}
                </td>
                <td onClick={this.toggleEdit} style={styles.notes} id="listExpense" className={`${fixedexpense.category}`}>
                    {fixedexpense.notes}
                </td>
                <td onClick={this.toggleEdit} style={styles.colFour} id="listExpense" className={`${fixedexpense.category}`}>
                    {fixedexpense.category}
                </td>
                <td style={styles.colFive} id="listExpense">
                    {/* {formatter.format(beginningBalance - expense.running_total)} */}
                </td>
                <td style={styles.colSix}>

                {/* <span style={styles.edit} onClick={this.toggleEdit}><span className="hoveredit">&#9998;</span>  /   </span> */}
                <span style={styles.edit} className="fa" onClick={this.props.deleteFixedExpense}><span className="hoverdelete"> &#xf014;</span></span>
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
