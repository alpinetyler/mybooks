import React, {Component} from 'react';


//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'


class AddCategory extends Component {
    constructor(props) {
        super(props)

        let { user } = this.props
        let id = user && user.id

        this.state = {
            categoryname: '',
            userid: id
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

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(AddCategory)