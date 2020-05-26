import React, {Component} from 'react'
import axios from 'axios';

import '../App.css'

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'


// import './App.css'

//display number in us currency format
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

var today = new Date();
//var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var year = today.getFullYear();
var month = today.getMonth() + 1

class ShowMonthTotals extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            totals: []
        }  
    }

    componentDidMount() {

        let { user } = this.props
        let userid = user && user.id

       
        axios.get('/api/totals', {
            params: {

                month: month,
                year: year,
                userid: userid
            }
        }).then((res) => {
            this.setState({
                totals: res.data
            })
        }).catch(err => console.log('error getting expenses:', err))

          //keep user logged in after refresh
          this.props.getUser()


    }


    render() {
    
        return(
            <div className="totalsWrapper">
                <table className="narrowTable">
                    <tbody>

                <tr>
                    <td className="totalsCategory myHeaderCell">
                        Category
                    </td>
                    <td className="totalsCell myHeaderCell">
                        Total
                    </td>
                </tr>
            {this.state.totals.map((totals, index) => {
                return(
                    <tr key={index}>
                    <td className="totalsCategory">
                        {totals.category}
                    </td>
                    <td className="totalsSum"> 
                    {formatter.format(totals.sum)}
                    </td>
                </tr>

                )
                
            })}
            </tbody>
           </table>
            <p><button className='magicbutton' onClick={this.props.toggleDisplay}><a>Hide Totals</a></button></p>
            </div>
        )
    }
}


//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(ShowMonthTotals)