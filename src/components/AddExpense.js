import React, {Component} from 'react'

var today = new Date();
var date = (today.getMonth() + 1) + '/' + today.getDate();

// //display number in us currency format
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
// })

export default class AddExpense extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            date: date,
            amount: '',
            ischecked: false,
            notes: '',
            category: '',

            expenses: [],

            add: false
        }
    }

    handleChange = e => {
        console.log(1111, this.state.ischecked)
        let { value, name } = e.target
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        let newExpense = this.state
        this.props.createExpense(newExpense)
        this.setState({
            name: '',
            date: date,
            amount: '',
            ischecked: false,
            notes: '',
            category: '',
            class: '',

            add: false
        })
    }

    toggleAdd = () =>
    this.setState({
        add: !this.state.add
    })

    toggleChange = () => {
        this.setState({
            ischecked: !this.state.ischecked // flip boolean value
        })
    }
  



    render() {
        return(
            <>
           
            <tr>
              <td style={styles.colOne}>
                <input
                    type="text"
                    className="addExpense"
                    style={styles.date}
                    name="date"
                    placeholder="Date"
                    onChange={this.handleChange}
                    value={this.state.date} />
                </td>
                <td style={styles.colTwo}>
                <input
                    type="text"
                    className="addExpense"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleChange}
                    value={this.state.name} />
                </td>
                <td style={styles.colThree}>
                <input
                    type="text"
                    className="addExpense"
                    name="amount"
                    style={styles.notes}
                    placeholder="Amount"
                    onChange={this.handleChange}
                    value={this.state.amount} />
                    </td>
                <td>
                <input
                    type="checkbox"
                    name="ischecked"
                    style={styles.checkbox}
                    checked={this.state.ischecked}
                    onChange={this.toggleChange}
                    
                    />
                    </td>
                <td style={styles.notes}>
                <input
                    type="text"
                    className="addExpense"
                    style={styles.notes}
                    name="notes"
                    placeholder="Notes"
                    onChange={this.handleChange}
                   />
                    </td>
                
                <td style={styles.colFour}>
                <input
                    type="text"
                    className="addExpense"
                    name="category"
                    placeholder="Category"
                    onChange={this.handleChange}
                    value={this.state.category} />
                    </td>
                <td style={styles.colFive}>
                <button onClick={this.handleClick}>Save</button>
                </td>
                </tr>
            
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
        width: 75,
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
        width: 200
    },
    icon: {
        fontSize: '25px',
        cursor: 'pointer',
    },
    date: {
        width: '50px'
    },
    checkbox: {
        width: '10px'
    },
    notes: {
        width: '100px'
    }
}