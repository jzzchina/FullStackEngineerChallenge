import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function getLeftSideNav({ children }){
    const {path} = children.props.match;

    if(path.indexOf("employee-feedback") >= 0){
        return (
            <div className="col-sm-2 sidenav text-left">
                <p><NavLink to="/employee-feedback">Employees Feedback</NavLink></p>
            </div>
        );
    }else{
        return (
            <div className="col-sm-2 sidenav text-left">
                <p><NavLink to="/employees">Employees</NavLink></p>
                <p><NavLink to="/reviews">Performance review</NavLink></p>
            </div>
        );
    }
}


export default function Layout({ children }) {

    const leftSideNav = getLeftSideNav({ children });

    return (
        <div>
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">FullStackEngineerChallenge </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <div className="row content">
                    {leftSideNav}
                    <div className="col-sm-8 text-left">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}