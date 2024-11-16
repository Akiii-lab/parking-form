import { useEffect, useState } from "react";
import "./HomeAdmin.css";
import { useNavigate } from "react-router-dom";

export function HomeAdmin() {


    const navigate = useNavigate();
    
    //General functions
    const [encontrado, setEncontrado] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectionAction, setSelectionAction] = useState("");

    //User
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([{ documento:"", firstName: "", lastname: "", code: "", email: "", role: "",password: "",  vehiculos: [] }]);
    const [isUserFilter, setIsUserFilter] = useState([]);
    const [repassword, setRepassword] = useState("");
    const [codeAux, setCodeAux] = useState();
    //para modificar el usuario
    const [documentTextChange, setDocumentTextChange] = useState("");
    const [firstNameTextChange, setFirstNameTextChange] = useState("");
    const [lastNameTextChange, setLastNameTextChange] = useState("");
    const [codeTextChange, setCodeTextChange] = useState("");
    const [emailTextChange, setEmailTextChange] = useState("");
    const [modifyUserBoolean, setmodifyUserBoolean] = useState(false);

    //Vehicle
    const [vehicleMenu, setVehicleMenu] = useState(false);
    const [ownerCardAux, setOwnerCardAux] = useState();
    const [vehiculo, setVehiculo] = useState();
    const [userVehiculos, setUserVehiculos] = useState();
    const [plateAux, setPlateAux] = useState();
    //para modificar el vehiculo
    const [plateTextChange, setPlateTextChange] = useState("");
    const [brandTextChange, setBrandTextChange] = useState("");
    const [colorTextChange, setColorTextChange] = useState("");
    const [ownershipCardTextChange, setOwnershipCardTextChange] = useState("");
    const [modifyVehicleBoolean, setModifyVehicleBoolean] = useState(false);

    //Infraction
    const [infractionMenu, setInfractionMenu] = useState(false);

    useEffect(() => {
        document.title = "HomeAdmin";
        //localStorage.clear();
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    useEffect(() => {
        setUserVehiculos(vehiculo);
    }, [vehiculo]);


    const handleMouseEnter = (menu) => {
        switch (menu) {
            case 'user':
                setIsUserMenuOpen(true);
                break;
            case 'vehicle':
                setVehicleMenu(true);
                break;
            case 'infraction':
                setInfractionMenu(true);
                break;
            case 'report':
                setReportMenu(true);
                break;
        }
    };

    const handleMouseLeave = (menu) => {
        switch (menu) {
            case 'user':
                setIsUserMenuOpen(false);
                break;
            case 'vehicle':
                setVehicleMenu(false);
                break;
            case 'infraction':
                setInfractionMenu(false);
                break;
            case 'report':
                setReportMenu(false);
                break;
        }
    }

    const handleLogout = () => {
        navigate("/");
    }
    const handleMouseClick = (action) => {
        setSelectionAction(action);
    };

    const view = () => {
        setEncontrado(false);
    }


    const handleCleanClick = () => {
        setSelectionAction(false);
    }

    const limpiarinputs = () => {
        document.getElementById("document").value = "";
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("code").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    }
    //Usuarios
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };
    const handleInputChangeVehiculo = (e) => {
        const { id, value } = e.target;
        setVehiculo((prevVehiculo) => ({
            ...prevVehiculo,
            [id]: value,
        }));
    };
    

    //Crea nuevo usuario 
    const newUser = {
        document: user.document,
        firstName: user.firstName,
        lastName: user.lastName,
        code: user.code,
        email: user.email,
        role: user.role,
        password: user.password,
        vehiculos: []
    };

    const saveUserInLocalStorage = (updatedUsers) => {
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log(updatedUsers);
    };

    const deleteUser = () => {
        const updatedUsers = users.filter((existingUser) => existingUser.code !== codeAux);
        saveUserInLocalStorage(updatedUsers);
        setErrorMessage("Usuario eliminado!");
    };

    const searchUser = () => {
        const foundedUser = users.find(existingUser => existingUser.code === codeAux);
        if (foundedUser) {
            setmodifyUserBoolean(true);
            setCodeTextChange(foundedUser.code);
            setDocumentTextChange(foundedUser.document);
            setFirstNameTextChange(foundedUser.firstName);
            setLastNameTextChange(foundedUser.lastName);
            setEmailTextChange(foundedUser.email);
            return;
        }else{
            setErrorMessage("Codigo de usuario no encontrado");
        }
    }
    const updateUser = () => {
        const updatedUsers = users.map((existingUser) => {
            if (existingUser.code === codeAux) {
                return {
                    ...existingUser,
                    document: documentTextChange,
                    firstName: firstNameTextChange,
                    lastName: lastNameTextChange,
                    code: codeTextChange,
                    email: emailTextChange,
                };
            }
            return existingUser;
        });
        setmodifyUserBoolean(false);
        saveUserInLocalStorage(updatedUsers);
        setErrorMessage("Usuario actualizado!");
    };
    
    const CheckUser = () => {
        const documentExist = users.some(existingUser => existingUser.document === user.document);
        const codeExist = users.some(existingUser => existingUser.code === user.code);
        const emailExist = users.some(existingUser => existingUser.email === user.email);
        if (emailExist) {
            setErrorMessage("Email ya esta registrado");
            view();
        } else if (codeExist) {
            setErrorMessage("Codigo ya esta registrado");
            view();
        } else if(documentExist){
            setErrorMessage("Documento ya esta registrado");
            view();
        }else {
            if (user.password === repassword) {
                const updatedUsers = [...users, newUser];
                saveUserInLocalStorage(updatedUsers); //para guardar en el json pero solo cuando se necesite al final
                setErrorMessage("Usuario registrado!");
                view();
                limpiarinputs();
            } else {
                setErrorMessage("Las contraseñas no coinciden");
                view();
            }
        }
    };
    const userFilter = () =>{
        const usersFiltered = users.filter(user => user.role === "user");
        setIsUserFilter(usersFiltered);
    }

    const vehiculoFilter = () => {
        const usersFiltered = users.filter(user => user.vehiculos.length > 0);
        setIsUserFilter(usersFiltered);
    }

    const vehiculoAñadido = () => {
        if(vehiculo === undefined){
            setErrorMessage('Error al registrar vehiculo, haga click en "Registrar" nuevamente ');
            return;
        }
        const userIndex = users.findIndex(existingUser => existingUser.code === ownerCardAux);
        if (userIndex === -1) {
            setErrorMessage("Código de usuario no encontrado");
            return;
        }
        const updatedUsers = users.map((existingUser, index) => {
            if (index === userIndex) {
                return {
                    ...existingUser,
                    vehiculos: [...existingUser.vehiculos, userVehiculos]

                };
            }
            return existingUser;
        });

        
        saveUserInLocalStorage(updatedUsers);
        setErrorMessage("Vehiculo registrado!");
    }

    const searchVehicle = () => {
        const userIndex = users.findIndex(existingUser => existingUser.code === ownerCardAux);
        if (userIndex === -1) {
            setErrorMessage("Código de usuario no encontrado");
            return;
        }
        const foundVehiculo = users[userIndex].vehiculos.find(vehiculo => vehiculo.plate === plateAux);
        if (foundVehiculo) {
            setModifyVehicleBoolean(true);
            setPlateTextChange(foundVehiculo.plate);
            setOwnershipCardTextChange(foundVehiculo.ownershipCard);
            setColorTextChange(foundVehiculo.color);
            setBrandTextChange(foundVehiculo.brand);
            return;
        }else{
            setErrorMessage("Placa de vehiculo no encontrada");
        }
    }
    const modifyVehicle = () => {
        const userIndex = users.findIndex(existingUser => existingUser.code === ownerCardAux);
        const vehiculoIndex = users[userIndex].vehiculos.findIndex(vehiculo => vehiculo.plate === plateAux);
        if (userIndex === -1) {
            setErrorMessage("Código de usuario no encontrado");
            return;
        }
        if (vehiculoIndex === -1) {
            setErrorMessage("Placa de vehiculo no encontrada");
            return;
        }
        const updatedUsers = users.map((existingUser, index) => {
            if (index === userIndex) {
                return {
                    ...existingUser,
                    vehiculos: existingUser.vehiculos.map((vehiculo) => {
                        if (vehiculo.plate === plateAux) {
                            return {
                                ...vehiculo,
                                plate: plateTextChange,
                                ownershipCard: ownershipCardTextChange,
                                color: colorTextChange,
                                brand: brandTextChange,
                            };
                        }
                        return vehiculo;
                    })
                };
            }
            return existingUser;
        });
        setModifyVehicleBoolean(false);
        saveUserInLocalStorage(updatedUsers);
        setErrorMessage("Vehiculo actualizado!");
    }
    const deleteVehiculo = () => {
        const userIndex = users.findIndex(existingUser => existingUser.code === ownerCardAux);
        const vehiculoIndex = users[userIndex].vehiculos.findIndex(vehiculo => vehiculo.plate === plateAux);
        if (userIndex === -1) {
            setErrorMessage("Código de usuario no encontrado");
            return;
        }
        if (vehiculoIndex === -1) {
            setErrorMessage("Placa de vehiculo no encontrada");
            return;
        }
        
        const updatedUsers = users.map((existingUser, index) => {
            if (index === userIndex) {
                return {
                    ...existingUser,
                    vehiculos: existingUser.vehiculos.filter((vehiculo) => vehiculo.plate !== plateAux)
                };
            }
            return existingUser;
        });
        saveUserInLocalStorage(updatedUsers);
        setErrorMessage("Vehiculo eliminado!");
    }
    


    return (
        console.log(users),
        <div className="homeAdmin">
            <h1>HomeAdmin</h1>
            <div className="navigator-bar">
                <div className="menuUser" onMouseEnter={() =>handleMouseEnter('user')} onMouseLeave={() =>handleMouseLeave('user')}>
                    <input className="user" type="submit" id="users" value="Usuario" />
                    {isUserMenuOpen && (
                        <ul className="userList">
                            <li onClick={() => handleMouseClick("registerUser")}>Registrar usuario</li>
                            <li onClick={() => handleMouseClick("listUser")}>Listar usuario</li>
                            <li onClick={() => handleMouseClick("modifyUser")}>Modificar usuario</li>
                            <li onClick={() => handleMouseClick("deleteUser")}>Eliminar usuario</li>
                        </ul>
                    )}
                </div>
                <div className="menuVehicle" onMouseEnter={() =>handleMouseEnter('vehicle')} onMouseLeave={() =>handleMouseLeave('vehicle')}>
                <input className="vehicle" type="submit" id="vehicles" value="Vehiculo" />
                {vehicleMenu && (
                    <ul className="vehicleList">
                        <li onClick={() => handleMouseClick("registerVehicle")}>Registrar vehiculo</li>
                        <li onClick={() => handleMouseClick("listVehicle")}>Listar vehiculo</li>
                        <li onClick={() => handleMouseClick("modifyVehicle")}>Modificar vehiculo</li>
                        <li onClick={() => handleMouseClick("deleteVehicle")}>Eliminar vehiculo</li>
                    </ul>
                )}
                </div>
                <div className="menuInfraction" onMouseEnter={() =>handleMouseEnter('infraction')} onMouseLeave={() =>handleMouseLeave('infraction')}>  
                <input className="infraction" type="submit" id="infractions" value="Infraccion" />
                {infractionMenu &&
                        <ul className="infractionList">
                        <li onClick={() => handleMouseClick("registerInfraction")}>Registrar infraccion</li>
                        <li onClick={() => handleMouseClick("listInfraction")}>Listar infraccion</li>
                        <li onClick={() => handleMouseClick("deleteInfraction")}>Eliminar infraccion</li>
                    </ul>
                    }
                </div>
                
                <input className="reports" type="submit" id="reports" value="Reporte" />
                <input className="logOut" type="submit" id="exit-button" value="Salir" onClick={handleLogout}/>
            </div>
            {/* Registrar Usuario */}
            {selectionAction === "registerUser" &&
                <div className="registerUser-box">
                    <div className="formRegisterUser">
                        <h2>Registrar Usuario</h2>
                        <input className="input" type="text" id="document" placeholder="Documento" onChange={handleInputChange} />
                        <input className="input" type="text" id="firstName" placeholder="Primer nombre" onChange={handleInputChange} />
                        <input className="input" type="text" id="lastName" placeholder="Apellido" onChange={handleInputChange} />
                        <input className="input" type="text" id="code" placeholder="Codigo" onChange={handleInputChange} />
                        <input className="input" type="text" id="role" placeholder="rol" onChange={handleInputChange} />
                        <input className="input" type="email" id="email" placeholder="Correo Electronico" onChange={handleInputChange} />
                        <input className="input" type="password" id="password" placeholder="Contraseña" onChange={handleInputChange} />
                        <input className="input" type="password" id="confirmPassword" placeholder="Confirmar Contraseña" onChange={(e) => setRepassword(e.target.value)} />
                        <input className="button" type="button" id="register-buttom" value="Registrar" onClick={CheckUser} />
                        {errorMessage &&
                            <div className="password-error"> <p>{errorMessage}</p>
                                <img className="exit-password" onClick={() => setErrorMessage("")} src="./src/utils/images/x.png" alt="exit" />
                            </div>
                        }
                    </div>
                    <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                </div>}
                    {/* Listar Usuarios */}
            {selectionAction === "listUser" &&
                <div className="listUser-box">
                    <div className="formListUser">
                        <h2>Listar Usuarios</h2>
                        
                <table className="userTable" hidden={encontrado}>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Código</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isUserFilter.map((user, index) => (
                            <tr key={index}>
                                <td>{user.document}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
                        <input className="list-button" onClick={() => (setEncontrado(false),userFilter())} type="button" id="list-buttom" value="Listar" />
                    </div>
                    <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                </div>}
                {/* Modificar Usuario */}
                {selectionAction === "modifyUser" &&
                <div className="modifyUser-box">
                    <h2>Modificar Usuario</h2>
                    <div className="formModifyUser">
                        <input className="input" type="text" id="codeaux" placeholder="Ingrese su codigo" onChange={(e) => setCodeAux(e.target.value)} hidden={modifyUserBoolean} />
                        <button className="button" id = "modify-pre-user-buttom" onClick={() => (setmodifyUserBoolean(false),searchUser())} hidden={modifyUserBoolean}>buscar</button>
                        <input className="input" type="text" id="document" placeholder="Documento" value={documentTextChange} onChange={(e) => setDocumentTextChange(e.target.value)} hidden = {!modifyUserBoolean}/>
                        <input className="input" type="text" id="firstName" placeholder="Primer nombre" value={firstNameTextChange} onChange={(e) => setFirstNameTextChange(e.target.value)} hidden = {!modifyUserBoolean}/>
                        <input className="input" type="text" id="lastName" placeholder="Apellido" value={lastNameTextChange} onChange={(e) => setLastNameTextChange(e.target.value)} hidden = {!modifyUserBoolean}/>
                        <input className="input" type="text" id="code" placeholder="Codigo" value={codeTextChange} onChange={(e) => setCodeTextChange(e.target.value)} hidden = {!modifyUserBoolean}/>
                        <input className="input" type="email" id="email" placeholder="Correo Electronico" value={emailTextChange} onChange={(e) => setEmailTextChange(e.target.value)} hidden = {!modifyUserBoolean}/>
                        <button className="button" id = "modify-user-buttom" onClick={updateUser} hidden = {!modifyUserBoolean}>Modificar</button>
                        {/* limpiar code aux depues de modificar */}
                    </div>
                    {errorMessage &&
                            <div className="vehicle-error"> <p>{errorMessage}</p>
                            <img className="exit-password" onClick={() => setErrorMessage("")} src="./src/utils/images/x.png" alt="exit" />
                            </div>}                    
                            <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                
                    </div>

                    }
                {/* Eliminar Usuario */}
                {selectionAction === "deleteUser" &&
                <div className="deleteUser-box">
                    <h2>Eliminar Usuario</h2>
                    <div className="formDeleteUser"></div>
                        <input className="input" type="text" id="code" placeholder="Codigo" onChange={((e) => setCodeAux(e.target.value))} />
                        <button className="button" onClick={deleteUser}>Eliminar</button>
                        {/* poner error */}
                    <div/>
                    <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                </div>}

            {/* Register vehicle */}
            {selectionAction === "registerVehicle" &&
                <div className="registerVehicle-box">
                    <h2>Registrar vehiculo</h2>
                    <div className="formRegisterVehicle">
                        <input className="input" id="plate" placeholder="Placa" onChange={handleInputChangeVehiculo}></input>
                        <input className="input" id="brand" placeholder="Marca" onChange={handleInputChangeVehiculo}></input>
                        <input className="input" id="color" placeholder="Color" onChange={handleInputChangeVehiculo}></input>
                        <input className="input" id="ownershipCard" placeholder="Tarjeta propiedad" onChange={handleInputChangeVehiculo}></input>
                        <input className="input" id="codeOwner" placeholder="Codigo" onChange={((e) => setOwnerCardAux(e.target.value))}></input> 
                        <input className="button" type="button" id="register-buttom" value="Registrar" onClick={vehiculoAñadido} />
                    </div>
                {errorMessage &&
                            <div className="vehicle-error"> <p>{errorMessage}</p>
                            <img className="exit-password" onClick={() => setErrorMessage("")} src="./src/utils/images/x.png" alt="exit" />
                            </div>}                    
                            <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                </div>
            }
            {/* Listar vehiculos */}
            {selectionAction === "listVehicle" &&
                <div className="listVehicle-box">
                    <div className="formListVehicle">
                        <h2>Listar vehiculos</h2>
                        <table className="vehicleTable" id= "vehicleTable" hidden={encontrado}>
                            <thead>
                                <tr>
                                    <th>Placa</th>
                                    <th>Marca</th>
                                    <th>Color</th>
                                    <th>Propietario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isUserFilter.map((user, uindex) => (
                                    user.vehiculos.map((vehiculo, vindex) => (
                                        <tr key={`${uindex}-${vindex}`}>
                                        <td>{vehiculo.plate}</td>
                                        <td>{vehiculo.brand}</td>
                                        <td>{vehiculo.color}</td>
                                        <td>{user.code}</td>
                                    </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <input className="list-button" onClick={() => (setEncontrado(false),vehiculoFilter())} type="button" id="list-buttom" value="Listar" style={{backgroundColor: "#000000", color: "#ffff", border: "5px solid #000000", borderRadius: "5px", marginTop: "10px", cursor: "pointer", display: "block"}} />
                    <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                </div>
            }
            {/* Modificar vehiculo */}
            {selectionAction === "modifyVehicle" &&
                <div className="modifyVehicle-box">
                    <h2>Modificar vehiculo</h2>
                    <div className="formModifyVehicle">
                        <input className="input" type="text" id="codeOwneraux" placeholder="Codigo del propietario" onChange={(e) => setOwnerCardAux(e.target.value)} hidden = {modifyVehicleBoolean} />
                        <input className="input" type="text" id="plateaux" placeholder="placa del vehiculo" onChange={(e) => setPlateAux(e.target.value)} hidden={modifyVehicleBoolean}/>
                        <input className="button" type="button" id="modify-vehicle-buttom" value="Buscar" onClick={searchVehicle} hidden={modifyVehicleBoolean}/>
                        <input className="input" type="text" id="plate" placeholder="Placa" value={plateTextChange} onChange={(e) => setPlateTextChange(e.target.value)} hidden = {!modifyVehicleBoolean}/>
                        <input className="input" type="text" id="brand" placeholder="Marca" value={brandTextChange} onChange={(e) => setBrandTextChange(e.target.value)} hidden = {!modifyVehicleBoolean} />
                        <input className="input" type="text" id="color" placeholder="Color" value={colorTextChange} onChange={(e) => setColorTextChange(e.target.value)} hidden = {!modifyVehicleBoolean} />
                        <input className="input" type="text" id="ownershipCard" placeholder="Tarjeta propiedad"  value={ownershipCardTextChange} onChange={(e) => setOwnershipCardTextChange(e.target.value)} hidden = {!modifyVehicleBoolean}/>
                        <input className="button" type="button" id="modify-buttom" value="Modificar" onClick={modifyVehicle} hidden = {!modifyVehicleBoolean} />
                    </div>
                    <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                    {/*poner el error aqui y limpiar los aux*/}
                </div>
            }
            {/* Eliminar vehiculo */}
            {selectionAction === "deleteVehicle" &&
                <div className="deleteVehicle-box">
                    <h2>Eliminar vehiculo</h2>
                    <div className="formDeleteVehicle">
                        <input className="input" type="text" id="plate" placeholder="Placa" onChange={(e) => setPlateAux(e.target.value)} />
                        <input className="input" type="text" id="codeOwner" placeholder="Codigo" onChange={(e) => setOwnerCardAux(e.target.value)} />
                        <input className="button" type="button" id="delete-buttom" value="Eliminar" onClick={deleteVehiculo} />
                        {/*poner el error aqui*/}
                    </div>
                    <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                </div>
            }
        </div>

    );
}

export default HomeAdmin;
