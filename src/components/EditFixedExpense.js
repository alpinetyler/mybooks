import React, {Component} from 'react';
import axios from 'axios';

//    //display number in us currency format
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//     })


export default class EditExpense extends Component {
    constructor(props) {
        super(props)

        let { id, name, amount, notes, category} = props.fixedexpense

        this.state = {
            name,
            amount,
            notes,
            category,
            id,
            fixedexpenses: [],
            categories: []
        }
    }

    componentDidMount() {
     axios.get('/api/categories').then((res) => {
         this.setState({
             categories: res.data
         })
     }).catch(err => console.log('error getting categories:', err))
 }

    handleChange = e => {
        let { value, name } = e.target

        this.setState({
            [name]: value
        })
    }


    handleClick = () => {
        let updatedFixedExpense = { ...this.props.fixedexpense, ...this.state }
        this.props.updateFixedExpense(updatedFixedExpense)
        this.props.toggleEdit() // takes display back to original display
    }

    render() {
        return(
         <tr>
           <td className="nameColumn myTableCell">
           <input
               type="text"
               name="name"
               placeholder="Name"
               id="listExpense"
               className="nameColumn"
               onChange={this.handleChange}
               value={this.state.name} />
           </td>
           <td className="amountColumn myTableCell">
           <input
               type="text"
               name="amount"
               className="amountColumn"
               placeholder="Amount"
               id="listExpense"
               onChange={this.handleChange}
               value={this.state.amount} />
               </td>
            <td className="notesColumn myTableCell">
           <input
               type="text"
               name="notes"
               placeholder="Notes"
               className="notesColumn"
               id="listExpense"
               onChange={this.handleChange}
               value={this.state.notes} />
            </td>
           <td className="categoryColumn myTableCell">
           <select id="listExpense"
                    className="categoryColumn"
                             name="category" onChange={this.handleChange}>
                             selected<option>{this.state.category}</option>
                             {this.state.categories.map((category, index) => {
                                 return (
                                     <option
                                         key={category.id}
                                         value={category.categoryname}>{category.categoryname}</option>
                                 )
                             })}
                         </select>
               </td>
           <td className="deleteSaveColumn">
           <span style={styles.icon} className="fa" onClick={this.handleClick}>&#xf0c7;</span>
           </td>
           </tr>
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
     width: 200,
     textAlign: "left",
     paddingLeft: "20px"
 },
 colFive: {
     width: 75,
     textAlign: "left",
     paddingLeft: "10px"
 },
 colSix: {
     width: 200
 },
 icon: {
     fontSize: '25px',
     cursor: 'pointer',
 },
 date: {
     width: '50px'
 },
 rightJustify: {
     textAlign: 'right',
     width: 100
 },
 notes: {
     width: '100px'
 },
 checkbox: {
     width: '10px'
 }
}