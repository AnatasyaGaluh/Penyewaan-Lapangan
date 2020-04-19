import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";

class Profil extends Component{
    constructor(){
        super();
        this.state = {
            profil: [],
            id_user: "",
            username: "",
            email: "",
            password: "",
            role: "member",
            first_name : "" ,
            last_name:"" ,
            gender :"" ,
            birth_date: "",
            image: null,
            nohp: "",
            action: "",
            find: "",
            message: "",

        }
        if(!localStorage.getItem("Token")){
            //direct ke halaman login
            window.location = "/login";
        }
    }

    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
    }


    Edit = (item) => {
        //membuka modal
        $("#modal_profil").modal("show");
        //mengisikan data pada form
        this.setState({
            action: "update",
            id_user: item.id_user,
            username: item.username,
            first_name: item.first_name,
            last_name: item.last_name,
            gender: item.gender,
            birth_date: item.birth_date,
            image: item.image,
            no_hp: item.no_hp,
            alamat: item.alamat
        });
    }


    get_profil = () => {
        //$("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id_user'))
        //console.log(items)
        let url = "http://localhost/lapangan/public/member"
        axios.get(url)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({
                profil: response.data.profil,
            });
            $("#message").toast("show");
        })
        .catch(error => {
            console.log(error);
        });
        // this.setState({
        //     user:items,
        //     id_user: items.id_user
        // });
    }

    

    Save = (event) => {
        console.log(this.state.id_user)
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_profil").modal("hide")
        let url = "http://localhost/lapangan/public/member/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("username", this.state.username);
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        form.append("role", this.state.role);
        form.append("first_name", this.state.first_name);
        form.append("last_name", this.state.last_name);
        form.append("gender", this.state.gender);
        form.append("date_birth", this.state.date_birth);
        form.append("no_hp", this.state.no_hp);
        form.append("alamat", this.state.alamat);
        axios.post(url,form)
        .then(response => {
            // $("#loading").toast("hide");
            this.setState({
                message: response.data.message
            });
            $("message").toast("show");
            this.get_profil();
        })
        .catch(error => {
            console.log(error);
        });
    }

    Drop =(id) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/member/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_profil();
            })
            .catch(error => {
                console.log(error);
            });
        }

    }
    
    render(){
        return(
            <div className="container">
        <div className="container width"
        style={{width:24 + "rem", paddingTop:6 + "rem"}}>
            <h3 className="mt-4 text-center">Data Member</h3>
                                        <table className= "table table-borderless">
                                            {this.state.profil.map((item,index) => {
                                                return(
                                                    <ul class="list-group" >
                                                        <li class="list-group-item">Username : {item.username}</li>
                                                        <li class="list-group-item">Email : {item.email}</li>
                                                        <li class="list-group-item">Nama Depan : {item.first_name}</li>
                                                        <li class="list-group-item">Nama Belakang : {item.last_name}</li>
                                                        <li class="list-group-item">Jenis Kelamin : {item.gender}</li>
                                                        <li class="list-group-item">Tanggal Lahir : {item.birth_date}</li>
                                                        <li class="list-group-item">Alamat : {item.alamat}</li>
                                                        <li class="list-group-item">No HP : +62{item.no_hp}</li>
                                                    <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                                                        <span className="fa fa-edit"></span>Edit
                                                    </button>
                                                    </ul>
                                                );
                                            })}

                                        </table>


                                        <Modal id="modal_profil" title="Form Data Diri" bg_header="success"
                                        text_header="white">
                                    <form onSubmit={this.Save}>
                                        Username
                                        <input type="text" className="form-control" name="username"
                                        value={this.state.username} onChange={this.bind} required />

                                        Nama Depan
                                        <input type="text" className="form-control" name="first_name"
                                        value={this.state.first_name} onChange={this.bind} required />
                                        
                                        Nama Belakang
                                        <input type="text" className="form-control" name="last_name"
                                        value={this.state.last_name} onChange={this.bind} required />
                                        
                                        Jenis Kelamin
                                        <input type="text" className="form-control" name="gender"
                                        value={this.state.gender} onChange={this.bind} required />

                                        Tanggal Lahir
                                        <input type="date" className="form-control" name="birth_date"
                                        value={this.state.birth_date} onChange={this.bind} required />

                                        Alamat
                                        <input type="text" className="form-control" name="alamat"
                                        value={this.state.alamat} onChange={this.bind} required />

                                        No HP
                                        <input type="text" className="form-control" name="no_hp"
                                        value={this.state.no_hp} onChange={this.bind} required />

                                        <button type="submit" className="btn btn-info pull-right m-2">
                                            <span className="fa fa-check"></span>Simpan
                                        </button>
                                    </form>
                                </Modal>
                            </div>
                        </div>
        )
    }
}

export default Profil;