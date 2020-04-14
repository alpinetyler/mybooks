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
        //console.log(2222, name, value)
        if(name == 'monthname'){
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
                
                <button className="createmonthbtn" onClick={this.handleClick}>Create {this.state.monthname && this.state.years ? 
                this.state.monthname + ' ' + this.state.years 
                : 
                '...'}</button>
                
                <button className="cancelmonthbtn" onClick={this.props.toggleCreate}>Cancel {this.state.monthname && this.state.years ? 
                this.state.monthname + ' ' + this.state.years 
                : 
                '...'}</button>
                
                

            </div>
        )
    }
}