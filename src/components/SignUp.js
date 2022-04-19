import React, { Component } from 'react'
import Headings from './Headings'
import axios from 'axios'

// import { login } from '../redux/reducers/user'

//connect redux
import { getUser } from '../redux/reducers/user'
import { connect } from 'react-redux'


class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {

            name: '',
            email: '',
            password: ''
        }
    }
    handleChange = e => {
        let { value, name } = e.target

        this.setState({
            [name]: value
        })
    }
    
    handleClick = () => {
        let newUser = this.state
        this.createUser(newUser)
        this.setState({
            name: '',
            email: '',
            password: ''
           
        })
        this.props.handleSubmit();
    }

    handleSubmit = () => {
        let { email, password } = this.state
        this.login({ email, password })
    }


    createUser = newUser => {
        axios.post('/auth/register', newUser)
            .then(res => {
                this.setState({
                    rentals: res.data
                })
                alert(`Your account has been created!`)

            }).catch(err => console.log(err))
            
    }


    render() {
        //de-structure user from redux props
        //let { user } = this.props
        return (
            <div className="addRentalSection">


                <div style={styles.addForm}>
                    <Headings signUp={true} />
                    <p><input
                        style={styles.input}
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleChange}
                        value={this.state.name} /></p>
                    <p><span style={styles.icon} className="fa">&#xf007; </span>
                    <input
                        style={styles.input}
                        type="text"
                        name="email"
                        placeholder=" E-mail"
                        onChange={this.handleChange}
                        value={this.state.email} /></p>
                    <p><span style={styles.icon} className="fa">&#xf023; </span>
                    <input
                        style={styles.input}
                        type="password"
                        name="password"
                        placeholder="  Password"
                        onChange={this.handleChange}
                        value={this.state.password} /></p>
                    <button className="saveChangesButton" onClick={this.handleClick}>Submit</button>
                    <div>
                        <p><button className="cancelbutton" onClick={this.props.toggleSignup}>Cancel</button></p>
                    </div>
                    


                </div>

            </div>
        )

    }
}

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}
export default connect(mapStateToProps, { getUser })(SignUp)

let styles = {
    addForm: {

        width: 375,
        text: 15,
        fontFamily: 'Times New Roman, Times, serif',
        padding: '10px 10px 10px 50px',
        margin: '10px',
        border: 'black 2px solid',
        boxShadow: '10px 10px 5px grey'
    },
    input: {
        border: 'none',
        borderBottom: '1px solid lightgray',
        width: 300,
        fontSize: 15
    },
    icon: {
        fontSize: '25px'
    }


}