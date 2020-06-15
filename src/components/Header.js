import React from 'react';
import { Link } from 'react-router-dom';
import LandingPage from './LandingPage'
// import logo from './images/logo.jpg'

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'

function Header(props) {
    let user = props && props.user

    return(
        <header>
            {/* <section className="headerSection1">
                <Link to={'/'}>
                    <img height="50px" width="50px" src={logo} alt="Logo" />
                </Link>

            </section> */}
            <section className="headerSectionMiddle">
            <input type="checkbox" id="toggle" />

            
            {user && //hide all menu items when user is not logged in
                    
                    <span className="menu">

                        <Link to={'EnterExpense'}>
                            <span>Home</span>
                        </Link>

                        <Link to={'FixedExpenses'} >
                            <span>Fixed Expenses</span>
                        </Link>

                        <Link to={'/ReserveExpenses'}>
                            <span>Reserve Account</span>
                        </Link>

                        {/* <Link to={'AddMonth'} >
                            <span></span>Create New Month</span>
                        </Link> */}

                        {/* <Link to={'FixedExpenses'} >
                            <span></span>Change Month</span>
                        </Link> */}

                        <Link to={'/'} >
                            <span> Categories</span>
                        </Link>

                    </span>

            //end of hidden items when user is not logged in     
            }
            </section>
            <section className="headerSection2">
                {user && <LandingPage />}
                <label htmlFor="toggle" className="label">&#9776;</label>
                
            </section>
        </header>
    )
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(Header)