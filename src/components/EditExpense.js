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

           let { id, name, date, amount, ischecked, notes, category, total, fulldate} = props.expense

           this.state = {
               name,
               date,
               amount,
               ischecked,
               notes,
               category,
               total,
               id,
               fulldate,

               expenses: [],
               categories: []
           }
       }

       componentDidMount() {
        axios.get('/api/categories').then((res) => {
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

       addCheck = e => this.setState({ischecked: '√'})

       handleClick = () => {
           let updatedExpense = { ...this.props.expense, ...this.state }
           this.props.updateExpense(updatedExpense)
           this.props.toggleEdit() // takes display back to original display
       }

       render() {
           return(
            <tr>
            <td className="dateColumn myEditCell">
              <input
                  type="text"
                  name="date"
                  id="listExpense"
                  placeholder="Date"
                  className="dateColumn"
                  onChange={this.handleChange}
                //   defaultValue={`${this.state.month}/${this.state.day}`}/>
                  value={this.state.date}/>
              </td>
              <td className="nameColumn myEditCell">
              <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="listExpense"
                  onChange={this.handleChange}
                  value={this.state.name} />
              </td>
              <td className="amountColumn myEditCell">
              <input
                  type="text"
                  name="amount"
                  placeholder="Amount"
                  id="listExpense"
                  className="amountColumn"
                  onChange={this.handleChange}
                  value={this.state.amount} />
                  </td>
              <td className="√Column myEditCell">
              <input
                  type="text"
                  className="√Column"
                  name="ischecked"
                  onClick={this.addCheck}
                  id="listExpense"
                  onChange={this.handleChange}
                  value={this.state.ischecked} />
                  </td>
              <td className="notesColumn myEditCell">
              <input
                  type="text"
                  name="notes"
                  placeholder="Notes"
                  className="notesColumn"
                  id="listExpense"
                  onChange={this.handleChange}
                  value={this.state.notes} />
                  </td>
              <td className="categoryColumn myEditCell">
              <select id="listExpense"
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
              <td className="balanceColumn myEditCell">
                  </td>
              <td className="deleteSaveColumn fa myEditCell">

              <span style={styles.icon} onClick={this.handleClick}>&#xf0c7;</span>
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
        width: '20px'
    }
}