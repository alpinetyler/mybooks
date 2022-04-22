import React from 'react'
import { connect } from 'react-redux'

import LoginForm from './LoginForm'
import { logout } from '../redux/reducers/user'


function Landing(props) {
// console.log("from landing page:", props)
    let user  = props && props.user
    let name = user && user.name
    // console.log(33333, props.user)
    return (
        <div>
            <span>
            { user ? <div className="mainlogout" onClick={props.logout}>Logout {name}</div> 
             
            
            : 
            
            <LoginForm />}
            
            </span>

        </div>
    )
}

let mapStateToProps = state => {
    let { data: user } = state.user 
    return { user }
}

export default connect(mapStateToProps, {logout})(Landing)