import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component{
    Logout=()=>{
        localStorage.removeItem("Token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        window.location="/register";
    }

    navGuest = () => {
        return(
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/lapangan" className="nav-item nav-link text-light mr-4">Home</Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-item nav-link text-light mr-4">Login</Link>
                    </li>
                </ul>
            </div>
        )
    }

    navAdmin = () => {
        return(
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    
            <li className="nav-item">
                <Link to="/lap" className="nav-item nav-link text-light mr-3">Data Lapangan</Link>
            </li>
            <li className="nav-item">
                <Link to="/member" className="nav-item nav-link text-light mr-4">Data Member</Link>
            </li>
            <li className="nav-item">
                <Link to="/sewa" className="nav-item nav-link text-light mr-4">Data Sewa</Link>
            </li>
            <li className="nav-item">
                <a className="nav-item nav-link text-light mr-4" onClick={this.Logout}>Logout</a>
            </li> 
            </ul>
            </div>

        )
    }

    navMember = () => {
        return(
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    
            <li className="nav-item">
                <Link to="/lapangan" className="nav-item nav-link text-light mr-4">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/profil" className="nav-item nav-link text-light mr-4">Data Diri</Link>
            </li>
            <li className="nav-item">
                <a className="nav-item nav-link text-light mr-4" onClick={this.Logout}>Logout</a>
            </li> 
            </ul>
            </div>

        )
    }

    render(){
        let auth = localStorage.getItem("Token")
        let role = localStorage.getItem("role")
        return(
            <div>
            <nav className="navbar navbar-expand-lg bg-danger navbar-dark">
                <a className="navbar-brand ml-5 text-white" href="#"></a>
                <button type="button" className="navbar-toggler btn-light"
                data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className=" navbar-toggler-icon"></span>
                </button>
                {!auth ? this.navGuest() : role === "admin" ? this.navAdmin() : this.navMember()}
                </nav>
            </div>
        );
    }
}
export default Navbar;