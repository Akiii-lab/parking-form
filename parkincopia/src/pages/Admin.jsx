import React from "react";
import "./Admin.css";
import { useState } from "react";
import { useEffect } from "react";

export function Admin() {
    const [selectionAction, setSelectionAction] = useState("");
    const [mesagge, setMesagge] = useState("");
    const [users, setUsers] = useState([]);
    const [userAux, setUserAux] = useState([{ documento:"", firstName: "", lastname: "", code: "", email: "",rol:"",password: "", vehiculos: [{ plate: "",brand:"",color:""}] }]);

    
    useEffect(() => {
        document.title = "Admin";
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleMouseClick = (action) => {
        setSelectionAction(action);
    };
    const handleInputChangeUser = (e) => {
        const { id, value } = e.target;
        setUserAux((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    const handleExit = () => {
        setSelectionAction(false);
        setMesagge("");
        cleanInputs();
    };

    const cleanInputs = () => {
        document.getElementById("document").value = "";
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("code").value = "";
        document.getElementById("email").value = "";
        document.getElementById("rol").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    }

    const newUser = {
        documento: userAux.documento,
        firstName: userAux.firstName,
        lastname: userAux.lastname, 
        code: userAux.code, 
        email: userAux.email,
        rol:userAux.rol,
        password: userAux.password, 
        vehiculos: [{ plate: "",brand:"",color:""}] };

    const saveUserInLocalStorage = (updatedUsers) => {
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log(updatedUsers);
    };

    const addUsers = () => {
        
    }

    
    function checkUser(){
        const documentExist = users.some(existingUser => existingUser.documento === userAux.documento);
        const codeExist = users.some(existingUser => existingUser.code === userAux.code);
        const emailExist = users.some(existingUser => existingUser.email === userAux.email);
        if (emailExist) {
            setMesagge("Email ya esta registrado");
        } else if (codeExist) {
            setMesagge("Codigo ya esta registrado");
        } else if(documentExist){
            setMesagge("Documento ya esta registrado");
        } else {
            if(userAux.password === userAux.confirmPassword){
                const  newUsersList = [...users, newUser];
        saveUserInLocalStorage(newUsersList);
                setMesagge("Usuario registrado!");
                cleanInputs();
            } else {
                setMesagge("Las contraseñas no coinciden");
            }
        }
    }
    return (
       <div> 
        <header>
            <h1>Admin</h1>
            <nav className="navigation-bar">
                <ul className="navigation-bar-list">
                    <li className="navigation-bar-user">
                        <p>Usuario</p>
                    <ul className="in-bar-user">
                        <li onClick={() => handleMouseClick("card-register-user")}><p>Registrar usuario</p></li>
                        <li><p>Mostrar usuarios</p></li>
                        <li><p>Modificar usuario</p></li>
                        <li><p>Eliminar usuario</p></li>
                    </ul>
                    </li>
                    <li className="navigation-bar-vehicle">
                        <p>Vehiculo</p>
                        <ul className="in-bar-vehicle">
                            <li><p>Registrar vehiculo</p></li>
                            <li><p>Mostrar vehiculos</p></li>
                            <li><p>Modificar vehiculo</p></li>
                            <li><p>Eliminar vehiculo</p></li>
                        </ul>
                    </li>
                    <li className="navigation-bar-infraction"><p>Infraccion</p>
                    <ul className="in-bar-infraction">
                        <li><p>Registrar infraccion</p></li>
                        <li><p>Mostrar infracciones</p></li>
                        <li><p>Modificar infraccion</p></li>
                        <li><p>Eliminar infraccion</p></li>
                    </ul>
                    </li>
                    <li className="navigation-bar-report"><p>Reporte</p>
                    <ul className="in-bar-report">
                        <li><p>Generar reporte</p></li>
                        </ul>
                    </li>
                    <li className="navigation-bar-logout"><p>Salir</p></li>
                </ul>
            </nav>
        </header>

        {selectionAction === "card-register-user" && (
            <div className="card-register-user">
                <h2>Registrar Usuario</h2>
                <div className="register-box-user">
                <input className="input" type="text" id="document" placeholder="Documento" onChange={handleInputChangeUser} />
                <input className="input" type="text" id="firstName" placeholder="Nombre" onChange={handleInputChangeUser} />
                <input className="input" type="text" id="lastName" placeholder="Apellido" onChange={handleInputChangeUser} />
                <input className="input" type="text" id="code" placeholder="Codigo" onChange={handleInputChangeUser} />
                <input className="input" type="email" id="email" placeholder="Email" onChange={handleInputChangeUser} />
                <select className="rol"id="rol" onChange={handleInputChangeUser}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <input className="input" type="password" id="password" placeholder="Contraseña" onChange={handleInputChangeUser} />    
                <input className="input" type="password" id="confirmPassword" placeholder="Confirmar contraseña" onChange={handleInputChangeUser} />
                <input className="button" type="button" id="register-user" value="Registrar" onClick={checkUser}/>
                <div className="message"><p>{mesagge}</p>
                </div>
                <img className="exit" onClick={handleExit} src="./src/utils/images/x.png" alt="exit" />
                </div>
            </div>)}
            </div>
    );
    
}

export default Admin;