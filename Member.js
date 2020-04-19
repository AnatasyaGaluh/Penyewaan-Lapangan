import React, {Component} from "react";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import axios from "axios";

class Member extends Component{
    constructor() {
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
            no_hp: "",
            action: "",
            find: "",
            message: "",
        }

        if(!localStorage.getItem("Token")){
            window.location = "/login";
        }

    }

    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});

    }

    bindImage = (e) => {
        this.setState({gambar: e.target.files[0]})
    }

    Add = () => {
        $("#modal_profil").modal("show");
        this.setState({
            action: "insert",
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
            no_hp: "",
            action: "",
            find: "",
            message: "",

        });

    }

    Edit = (item) => {
        $("#modal_profil").modal("show");
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
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/member"
        axios.get(url)
        .then(response => {
            this.setState({profil: response.data.profil});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        })

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

    componentDidMount = () => {
        this.get_profil();

    }

    Save = (event) => {
        event.preventDefault();
        $("#loading").toast("show");
        $("#modal_profil").modal("hide");
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
        axios.post(url, form)
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

    search = (event) => {
        if(event.keyCode === 13){
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/member"
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({profil: response.data.profil});
            })
            .catch(error =>{
                console.log(error);
            });
        }
        
    }

    render () {
        console.log(this.state.profil)
        return(
            <div className="container">
                <div className="card mt-2">
                    {/*header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Member</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                placeholder="Pencarian..."/>
                            </div>
                        </div>
                    </div>
                    {/*content card*/}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Nama Depan</th>
                                    <th>Nama Belakang</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Tanggal Lahir</th>
                                    <th>No HP</th>
                                    <th>Alamat</th>
                                    <th>Option</th>
                                </tr>
                            </thead>                            
                            <tbody>
                                {this.state.profil.map((item) => {
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.date_birth}</td>
                                            <td>{item.no_hp}</td>
                                            <td>{item.alamat}</td>
\                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span>Tambah Data
                        </button>
                        <Modal id="modal_profil" title="Data Member" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                {/* ID
                                <input type="number" className="form-control" name="id"
                                value={this.state.id} onChange={this.bind} required /> */}

                                Username
                                <input type="text" className="form-control" name="username"
                                value={this.state.username} onChange={this.bind} required />

                                Email
                                <input type="email" className="form-control" name="email"
                                value={this.state.email} onChange={this.bind} required />

                                Role
                                <input type="text" className="form-control" name="role"
                                value={this.state.role} onChange={this.bind} required />

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
                                <input type="text" className="form-control" name="date_birth"
                                value={this.state.date_birth} onChange={this.bind} required />

                                No HP
                                <input type="text" className="form-control" name="no_hp"
                                value={this.state.no_hp} onChange={this.bind} required />

                                Alamat
                                <input type="text" className="form-control" name="email"
                                value={this.state.email} onChange={this.bind} required />

                                <button type="submit" className=" btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>

        );

    }
}

export default Member;