import React, {Component} from 'react'
import axios from 'axios';

import '../App.css'


// import './App.css'

//display number in us currency format
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default class ShowMonthTotals extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            totals: []
        }  
    }

    componentDidMount() {
       
        axios.get('/api/totals').then((res) => {
            this.setState({
                totals: res.data
            })
        }).catch(err => console.log('error getting month list:', err))

    }


    render() {
    
        return(
            <div className="totalsWrapper">
                <table className="narrowTable">
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
                    <tr>
                    <td className="totalsCategory">
                        {totals.category}
                    </td>
                    <td className="totalsSum"> 
                    {formatter.format(totals.sum)}
                    </td>
                </tr>

                )
                
            })}
           
           </table>
            <button className='btn' onClick={this.props.toggleDisplay}>Hide Totals</button>
            </div>
        )
    }
}
