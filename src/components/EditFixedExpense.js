import React, {Component} from 'react';
import axios from 'axios';

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'

//    //display number in us currency format
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//     })


class EditFixedExpense extends Component {
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
     // get logged in user info to pass as parameter to database
     let {user} = this.props
     let id = user && user.id

     console.log("EnterExpenseCDM:", id)
    

     axios.get('/api/categories', {
         params: {
         
             userid: id
         }
     }).then((res) => {
         this.setState({
             categories: res.data
         })
     }).catch(err => console.log('error getting expenses:', err))

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
           <td className="nameColumn myEditCell">
           <input
               type="text"
               name="name"
               placeholder="Name"
               
               className="listExpense nameColumn"
               onChange={this.handleChange}
               value={this.state.name} />
           </td>
           <td className="amountColumn myEditCell">
           <input
               type="text"
               name="amount"
               className="listExpense amountColumn"
               placeholder="Amount"
               
               onChange={this.handleChange}
               value={this.state.amount} />
               </td>
            <td className="notesColumn myEditCell">
           <input
               type="text"
               name="notes"
               placeholder="Notes"
               className="listExpense notesColumn"
               
               onChange={this.handleChange}
               value={this.state.notes} />
            </td>
           <td className="categoryColumn myEditCell">
           <select className="listExpense categoryColumn"
                             name="category" onChange={this.handleChange}>
                             selected<option>{this.state.category}</option>
                             {this.state.categories.map((category, index) => {
                                 return (
                                     <option
                                         key={index}
                                         value={category.categoryname}>{category.categoryname}</option>
                                 )
                             })}
                         </select>
               </td>
           <td className="deleteSaveColumn myEditCell">
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

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(EditFixedExpense)