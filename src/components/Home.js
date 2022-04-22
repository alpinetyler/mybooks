import React, {Component} from "react";
import { Link } from 'react-router-dom';
import LandingPage from './LandingPage'

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'

class Home extends Component{

    render(){
        let { user } = this.props
        return(
            <div>
                {user?
                    <div>
                        <h1>Welcome {user.name}!</h1>
                        <h2>Please choose an option from the menu above</h2>
                    </div>
                    
                    :
                    <span>
                        <LandingPage />
                    </span>
            
            
                }
                
            </div>
        )
    }
}

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(Home)