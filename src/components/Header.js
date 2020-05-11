import React from 'react';
import { Link } from 'react-router-dom';
import EnterExpense from './EnterExpense';
// import logo from './images/logo.jpg'

function Header(props) {

    return(
        <header>
            {/* <section className="headerSection1">
                <Link to={'/'}>
                    <img height="50px" width="50px" src={logo} alt="Logo" />
                </Link>

            </section> */}
            <section className="headerSectionMiddle">
            <input type="checkbox" id="toggle" />
                    <span className="menu">

                        <Link to={'/'}>
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

                        <Link to={'EditCategories'} >
                            <span> Categories</span>
                        </Link>

                    </span>
            </section>
        </header>
    )
}

export default Header