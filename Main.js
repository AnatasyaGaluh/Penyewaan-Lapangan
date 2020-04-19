import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Navbar from "./component/Navbar";
import Lapangan from "./page/Lapangan";
import LapanganItem from "./page/LapanganItem";
import Register from "./page/Register";
import Login from "./page/Login";
import Profil from "./page/Profil";
import Lap from "./page/Lap";
import Member from "./page/Member";


class Main extends Component{
    render =()=>{
        return(
            <Switch>
                {/*load component tiap halaman*/}
                <Route path="/login" component={Login}/>
                <Route path="/Lapangan">
                    <Navbar />
                    <Lapangan />
                </Route>
                <Route path="/LapanganItem">
                    <Navbar />
                    <LapanganItem />
                </Route>
                <Route path="/Register">
                    <Navbar />
                    <Register />
                </Route>
                <Route path="/Profil">
                    <Navbar />
                    <Profil />
                </Route>
                <Route path="/Lap">
                    <Navbar />
                    <Lap />
                </Route>
                <Route path="/Member">
                    <Navbar />
                    <Member />
                </Route>

            </Switch>
        );
    }
}
export default Main;