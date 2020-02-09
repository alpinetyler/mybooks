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

           let { id, name, month, day, amount, ischecked, notes, category, total} = props.expense

           this.state = {
               name,
               month,
               day,
               amount,
               ischecked,
               notes,
               category,
               total,
               id,

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

       handleClick = () => {
           let updatedExpense = { ...this.props.expense, ...this.state }
           this.props.updateExpense(updatedExpense)
           this.props.toggleEdit() // takes display bakc to original display
       }

       render() {
           return(
            <tr>
            <td style={styles.colOne}>
              <input
                  type="text"
                  name="date"
                  className="addExpense"
                  placeholder="Date"
                  style={styles.date}
                  onChange={this.handleChange}
                  defaultValue={`${this.state.month}/${this.state.day}`}/>
              </td>
              <td style={styles.colTwo}>
              <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="addExpense"
                  onChange={this.handleChange}
                  value={this.state.name} />
              </td>
              <td style={styles.colThree}>
              <input
                  type="text"
                  name="amount"
                  style={styles.rightJustify}
                  placeholder="Amount"
                  className="addExpense"
                  onChange={this.handleChange}
                  value={this.state.amount} />
                  </td>
                  <td style={styles.checkbox}>
              <input
                  type="checkbox"
                  style={styles.checkbox}
                  name="ischecked"
                  className="addExpense"
                  onChange={this.handleChange}
                  value={this.state.ischecked} />
                  </td>
                  <td style={styles.notes}>
              <input
                  type="text"
                  name="notes"
                  placeholder="Notes"
                  style={styles.notes}
                  className="addExpense"
                  onChange={this.handleChange}
                  value={this.state.notes} />
                  </td>
              <td style={styles.colFour}>
              <select style={styles.select}
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
              <td style={styles.colFive}>
                  </td>
              <td style={styles.colSix}>

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
    },
    select: {
        fontFamily: 'Times New Roman',
        fontSize: '20px',
        fontWeight: 'bold'
    }
}