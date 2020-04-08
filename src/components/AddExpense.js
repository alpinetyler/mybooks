import React, { Component } from 'react'
import axios from 'axios';

var today = new Date();
var date = (today.getMonth() + 1) + '/' + today.getDate();

var fulldate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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
            ischecked: '',
            notes: '',
            category: '',
            fulldate: fulldate,
            userid: 1,

            expenses: [],
            categories: [],

            add: false
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
        // console.log(1111, this.state.ischecked)
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
            ischecked: '',
            notes: '',
            category: '',
            class: '',
            fulldate: fulldate,
            userid: 1,

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
        return (
            <>

                <tr>
                    <td className="dateColumn">
                        <input
                            type="text"
                            id="listExpense"
                            style={styles.date}
                            name="date"
                            placeholder="Date"
                            onChange={this.handleChange}
                            value={this.state.date} />
                    </td>
                    <td className="nameColumn">
                        <input
                            type="text"
                            id="listExpense"
                            name="name"
                            placeholder="Name"
                            onChange={this.handleChange}
                            value={this.state.name} />
                    </td>
                    <td className="amountColumn">
                        <input
                            type="text"
                            id="listExpense"
                            name="amount"
                            style={styles.notes}
                            placeholder="Amount"
                            onChange={this.handleChange}
                            value={this.state.amount} />
                    </td>
                    <td className="√Column">
                        {/* <input
                            type="text"
                            name="ischecked"
                            style={styles.checkbox}
                            onChange={this.toggleChange}
                            // value={this.state.ischecked}

                        /> */}
                    </td>
                    <td className="notesColumn">
                        <input
                            type="text"
                            id="listExpense"
                            style={styles.notes}
                            name="notes"
                            placeholder="Notes"
                            onChange={this.handleChange}
                            value={this.state.notes}
                        />
                    </td>

                    <td className="categoryColumn">
                    <select id="listExpense"
                                name="category" onChange={this.handleChange}>
                                    value={this.state.category}
                                Selected<option>Choose Category</option>
                                {this.state.categories.map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.categoryname}>{category.categoryname}</option>
                                    )
                                })}
                            </select>
                    </td>
                    <td className="balanceColumn">
                        <button style={styles.saveButton}  onClick={this.handleClick}>Save</button>
                    </td>
                    <td className="deleteSaveColumn">
                        <input
                            type="text"
                            id="listExpense"
                            style={styles.notes}
                            name="fulldate"
                            placeholder="Full Date"
                            onChange={this.handleChange}
                            value={this.state.fulldate}
                        />
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
    },
    select: {
        fontFamily: 'Times New Roman',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    saveButton: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: '15px'
    }
}