import React, {Component} from 'react';

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'


class AddMonth extends Component {
    constructor(props){
        super(props)


        // get logged in user info to pass as parameter to database
        let {user} = this.props
        let userid = user && user.id

        this.state = {
            monthname: '',
            monthnumber: '',
            years: '',
            beginningbalance: '',
            userid: userid
        }
    }

    handleChange = e => {
        let {value, name} = e.target
        //console.log(2222, name, value)
        if(name === 'monthname'){
            const months = {
                'January' : '01',
                'February' : '02',
                'March' : '03',
                'April' : '04',
                'May' : '05',
                'June' : '06',
                'July' : '07',
                'August' : '08',
                'September' : '09',
                'October' : '10',
                'November' : '11',
                'December' : '12'
            }
            //console.log(11111, months[value])
            this.setState({
                monthnumber: months[value]
            })
        }
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        let newMonth = this.state
        //console.log(333, newMonth)
        this.props.createMonth(newMonth)
        this.setState({
            monthname: '',
            monthnumber: '',
            years: '',
            beginningbalance: '',
            create: false
        })
    }


    render() {
        return(
            <div className="createnewmonthbox">
                <p><select name="monthname" onChange={this.handleChange}>
                    <option value="">Choose Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                </p>
                
                <p><select name="years" onChange={this.handleChange}>
                    <option value="">Choose Year</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
                </p>
                <p>
                    <input 
                    type="number" 
                    name="beginningbalance" 
                    onChange={this.handleChange} 
                    value={this.state.beginningbalance}
                    placeholder="Enter Beginning Balance" />
                </p>
                

                {   // only show add month button if user has selected a month and a year
                    this.state.monthname && this.state.years ?

                    // when user has selected month and year, display them on the add and cancel buttons
                    <button className="createmonthbtn" onClick={this.handleClick}>Create {this.state.monthname && this.state.years ? 
                    this.state.monthname + ' ' + this.state.years 
                    : 
                    ''}</button>

                    :
                    ''
                }
                
                <button className="cancelmonthbtn" onClick={this.props.toggleCreate}>Cancel {this.state.monthname && this.state.years ? 
                this.state.monthname + ' ' + this.state.years 
                : 
                ''}</button>
                
                

            </div>
        )
    }
}

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(AddMonth)