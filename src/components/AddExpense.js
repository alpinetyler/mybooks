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
            ischecked: false,
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
            ischecked: false,
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
                            value={this.state.ischecked}

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
                            value={this.state.notes}
                        />
                    </td>

                    <td style={styles.colFour}>
                    <select style={styles.select}
                                name="category" onChange={this.handleChange}>
                                    value={this.state.category}
                                Selected<option>Choose Category</option>
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
                        <button style={styles.saveButton}  onClick={this.handleClick}>Save</button>
                    </td>
                    <td style={styles.colSix}>
                        <input
                            type="text"
                            className="addExpense"
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
        fontSize: '20px',
        fontWeight: 'bold'
    },
    saveButton: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: '15px'
    }
}