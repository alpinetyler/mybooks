import React, {Component} from 'react';
import axios from 'axios';

export default class AddCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryname: []
        }
    }

    handleChange = e => {
        let { value, name } = e.target
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        let newCategory = this.state
        this.props.createCategory(newCategory)
        this.setState({
            categoryname: ''
        })
    }

    render() {
        return (
            <tr>
                <td className="nameColumn listExpense myAddCell">
                    <input
                        type="text"
                        className="listExpense"
                        name="categoryname"
                        placeholder="New Category"
                        onChange={this.handleChange}
                        value={this.state.categoryname} />
                </td>
                <td className="listExpense myAddCell deleteSaveColumn">
                    <button onClick={this.handleClick}>Save</button>
                </td>
            </tr>
        )
    }
}