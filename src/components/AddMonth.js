import React, {Component} from 'react';

export default class AddMonth extends Component {
    constructor(props){
        super(props)
        this.state = {
            monthname: '',
            monthnumber: '',
            years: ''
        }
    }

    handleChange = e => {
        let {value, name} = e.target
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        let newMonth = this.state
        console.log(333, newMonth)
        this.props.createMonth(newMonth)
        this.setState({
            monthname: '',
            monthnumber: '',
            years: '',
            create: false
        })
    }


    render() {
        return(
            <>
                <input  
                    type="text"
                    name="monthname"
                    placeholder="Month Name"
                    onChange={this.handleChange}
                />
                <input  
                    type="text"
                    name="monthnumber"
                    placeholder="Month Number"
                    onChange={this.handleChange}
                />
                <input  
                    type="text"
                    name="years"
                    placeholder="Year"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>Create Month</button>
                <button onClick={this.props.toggleCreate}>Cancel</button>

            </>
        )
    }
}