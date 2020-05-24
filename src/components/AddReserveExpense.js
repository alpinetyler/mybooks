import React, { Component } from 'react'
import axios from 'axios';

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'

var today = new Date();
var date = (today.getMonth() + 1) + '/' + today.getDate();

var fulldate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


class AddReserveExpense extends Component {
    constructor(props) {
        super(props)

        let { user } = this.props
        let userid = user && user.id

        this.state = {
            name: '',
            date: date,
            amount: '',
            notes: '',
            ischecked: '',
            category: 'reserve',
            userid: userid,

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

        let { user } = this.props
        let userid = user && user.id

        let newReserveExpense = this.state
        // console.log(333, newReserveExpense)
        this.props.createReserveExpense(newReserveExpense)
        this.setState({
            name: '',
            date: date,
            amount: '',
            ischecked: '',
            notes: '',
            category: 'reserve',
            userid: userid,

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
                    <td className="dateColumn myAddCell">
                        <input
                            type="text"
                            className="dateColumn listExpense"
                            name="date"
                            placeholder="Date"
                            onChange={this.handleChange}
                            value={this.state.date} />
                    </td>
                    <td className="nameColumn myAddCell">
                        <input
                            type="text"
                            className="listExpense"
                            name="name"
                            placeholder=" Enter Name"
                            onChange={this.handleChange}
                            value={this.state.name} />
                    </td>
                    <td className="amountColumn myAddCell">
                        <input
                            type="text"
                            className="listExpense"
                            name="amount"
                            style={styles.notes}
                            placeholder="Enter Amt"
                            onChange={this.handleChange}
                            value={this.state.amount} />
                    </td>
                    <td className="√Column myAddCell">
                    </td>
                    <td className="notesColumn myAddCell">
                        <input
                            type="text"
                            className="listExpense"
                            style={styles.notes}
                            name="notes"
                            placeholder="Enter Note"
                            onChange={this.handleChange}
                            value={this.state.notes}
                        />
                    </td>

                    <td className="categoryColumn myAddCell">
                    {/* <select className="listExpense"
                                name="category" onChange={this.handleChange}>
                                    value={'reserve'}
                                Selected<option>Choose Category</option>
                                {this.state.categories.map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.categoryname}>{category.categoryname}</option>
                                    )
                                })}
                            </select> */}
                            <span value="reserve" name="category">reserve</span>
                    </td>
                    <td className="balanceColumn myAddCell">
                        <button style={styles.saveButton}  onClick={this.handleClick}>Save</button>
                    </td>
                    <td className="deleteSaveColumn myAddCell">
                        <input
                            type="text"
                            className="listExpense"
                            name="fulldate"
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

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(AddReserveExpense)