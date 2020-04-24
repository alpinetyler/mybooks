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
                            <a>Home</a>
                        </Link>

                        <Link to={'FixedExpenses'} >
                            <a>Fixed Expenses</a>
                        </Link>

                        <Link to={'/ReserveExpenses'}>
                            <a>Reserve Account</a>
                        </Link>

                        {/* <Link to={'AddMonth'} >
                            <a>Create New Month</a>
                        </Link> */}

                        {/* <Link to={'FixedExpenses'} >
                            <a>Change Month</a>
                        </Link> */}

                        <Link to={'EditCategories'} >
                            <a>Edit Categories</a>
                        </Link>

                    </span>
            </section>
        </header>
    )
}

export default Header