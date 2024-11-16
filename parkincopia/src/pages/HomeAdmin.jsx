import { useEffect, useState } from "react";
import "./HomeAdmin.css";
import { useNavigate } from "react-router-dom";

export function HomeAdmin() {


    const navigate = useNavigate();
    
    //General functions
    const [encontrado, setEncontrado] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [selectionAction, setSelectionAction] = useState("");

    //User
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([{ documento:"", firstName: "", lastname: "", code: "", email: "", role: "",password: "",  vehiculos: [{ plate: "",brand:"",color:""}] }]);
    const [isUserFilter, setIsUserFilter] = useState([]);
    const [repassword, setRepassword] = useState("");

    //Modify user
    const [modUser, setModUser] = useState([]);

    //Vehicle
    const [vehicleMenu, setVehicleMenu] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [vehiculo, setVehiculo] = useState({ plate: "",brand:"",color:"", ownershipCard:"", codeOwner: "" });
    const [userVehiculos, setUserVehiculos] = useState({ plate: "",brand:"",color:"", ownershipCard:"" });

    //Infraction
    const [infractionMenu, setInfractionMenu] = useState(false);

    //Report
    const [reportMenu, setReportMenu] = useState(false);

    

    useEffect(() => {
        document.title = "HomeAdmin";
        //localStorage.clear();
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);


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

    // Función para agregar un vehículo al array `vehiculos`
    const addVehiculo = () => {
        setVehicles((prevVehiculos) => [...prevVehiculos, vehiculo]);
        setVehiculo({ plate: "",brand:"",color:"", ownershipCard:"", codeOwner: "" }); // Reinicia el estado `vehiculo` para un nuevo ingreso
    };

    // Función para guardar `vehiculos` en `user`
    const saveVehiculosInUser = () => {
        setUser((prevUser) => ({
            ...prevUser,
            vehiculos: vehiculos, // Asigna el array `vehiculos` al objeto `user`
        }));
    };

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
        vehiculos: [{ plate: "",brand:"",color:"",ownershipCard:""}]
    };

    const saveUserInLocalStorage = (updatedUsers) => {
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log(updatedUsers);
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

    //Buscar usuario


 
   const addVehicleToUser = () => {
    const codeUser = user.code;
    const userIndex = users.findIndex(existingUser => existingUser.code === codeUser);
    
    if (userIndex === -1) {
        setErrorMessage("Código de usuario no encontrado");
        setEncontrado(false);
        return;
    }
    
    const updatedUsers = users.map((existingUser, index) => {
        if (index === userIndex) {
            return {
                ...existingUser,
                vehiculos: [...existingUser.vehiculos, vehiculo]
            };
        }
        return existingUser;
    });

    saveUserInLocalStorage(updatedUsers);
    setErrorMessage("Vehículo registrado!");
    };

    const vehiculoAñadido = () => {
        
        console.log(vehiculo);
        setUserVehiculos();
        console.log("aux: ");
        console.log(userVehiculos, "valore s : ", plate, brand, color);
        let codeU = document.getElementById("codeOwner").value;
        const userIndex = users.findIndex(existingUser => existingUser.code === codeU);
        
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

    


    return (
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
                        <input className="input" type="text" id="document" placeholder="Documento"  />
                        <input className="input" type="text" id="firstName" placeholder="Primer nombre"  />
                        <input className="input" type="text" id="lastName" placeholder="Apellido"/>
                        <input className="input" type="text" id="code" placeholder="Codigo"  />
                        <input className="input" type="email" id="email" placeholder="Correo Electronico"  />
                        
                    </div>
                    {errorMessage &&
                            <div className="vehicle-error"> <p>{errorMessage}</p>
                            <img className="exit-password" onClick={() => setErrorMessage("")} src="./src/utils/images/x.png" alt="exit" />
                            </div>}                    
                            <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                
                    </div>

                    }
            {/* Register vehicle */}
            {selectionAction === "registerVehicle" &&
                <div className="registerVehicle-box">
                    <h2>Registrar vehiculo</h2>
                    <div className="formRegisterVehicle">
                        <input className="input" id="plate" placeholder="Placa" onChange={handleInputChangeVehiculo}></input>
                        <input className="input" id="brand" placeholder="Marca" onChange={handleInputChangeVehiculo}></input>
                        <input className="input" id="color" placeholder="Color" onChange={handleInputChangeVehiculo}></input>
                        <input className="input" id="ownershipCard" placeholder="Tarjeta propiedad" onChange={handleInputChangeVehiculo}></input>
                        <input className="input" id="codeOwner" placeholder="Codigo" onChange={handleInputChangeVehiculo}></input> 
                        <input className="button" type="button" id="register-buttom" value="Registrar" onClick={vehiculoAñadido} />
                    </div>
                {errorMessage &&
                            <div className="vehicle-error"> <p>{errorMessage}</p>
                            <img className="exit-password" onClick={() => setErrorMessage("")} src="./src/utils/images/x.png" alt="exit" />
                            </div>}                    
                            <img className="exit" onClick={handleCleanClick} src="./src/utils/images/x.png" alt="exit" />
                </div>
                

            }
         
        </div>

    );
}

export default HomeAdmin;
