import { useEffect, useState } from "react";
import "./HomeAdmin.css";

export function HomeAdmin() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([ { firstName: "", lastname: "", email: "", password: "" , vehiculos: [{placa: "", estado: ""}]}]);
    const [vehiculos, setVehiculos] = useState([]);
    const [vehiculo, setVehiculo] = useState({placa: "", estado: ""});
    const [repassword, setRepassword] = useState("");
    
    useEffect(() => {
        document.title = "HomeAdmin";
        //localStorage.clear();
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);


    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isRegisterMenuOpen, setIsRegisterMenuOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsUserMenuOpen(true);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    const handleMouseLeave = () => {
        setIsUserMenuOpen(false);
    }

    const handleRegister = () => {
        setIsRegisterMenuOpen(true);
    };
        // Función para agregar un vehículo al array `vehiculos`
    const addVehiculo = () => {
        setVehiculos((prevVehiculos) => [...prevVehiculos, vehiculo]);
        setVehiculo({ placa: "", estado: "" }); // Reinicia el estado `vehiculo` para un nuevo ingreso
    };

    // Función para guardar `vehiculos` en `user`
    const saveVehiculosInUser = () => {
        setUser((prevUser) => ({
            ...prevUser,
            vehiculos: vehiculos, // Asigna el array `vehiculos` al objeto `user`
        }));
    };
    
    const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        vehiculos: [{placa: "", estado: ""}]
    };

    const saveUserInLocalStorage = (updatedUsers) => {
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log(updatedUsers);
    };

    const confimrsaveuser = () => {
        if(user.password === repassword){
            const updatedUsers = [...users, newUser];   
            saveUserInLocalStorage(updatedUsers); //para guardar en el json pero solo cuando se necesite al final
        }
    };

    return (
        <div className="homeAdmin">
            <h1>HomeAdmin</h1>
            <div className="inputs-container">
                <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <input className="user" type="submit" id="users" value="Usuario" />
                    {isUserMenuOpen && (
                        <div className="userList">
                            <div className="list" id="registerUser" onClick={handleRegister}>Registrar usuario</div>
                            <div className="list" id="listUser">Listar usuario</div>
                            <div className="list" id="modifyUser">Modificar usuario</div>
                            <div className="list" id="deleteUser">Eliminar usuario</div>
                        </div>
                    )}
                </div>
                <input className="vehicle" type="submit" id="vehicles" value="Vehiculo" />
                <input className="infractions" type="submit" id="infractions" value="Infraccion" />
                <input className="reports" type="submit" id="reports" value="Reporte" />
            </div>
            <div className="registerUser-box" hidden={!isRegisterMenuOpen}>
                                    <form className="formRegisterUser" action="">
                                        <h2>Registrar Usuario</h2>
                                        <input className="input" type="text" id="firstName" placeholder="Primer nombre" onChange={handleInputChange}/>
                                        <input className="input" type="text" id="lastName" placeholder="Apellido" onChange={handleInputChange}/>
                                        <input className="input" type="email" id="email" placeholder="Correo Electronico" onChange={handleInputChange}/>
                                        <input className="input" type="password" id="password" placeholder="Contraseña" onChange={handleInputChange}/>
                                        <input className="input" type="password" id="confirmPassword" placeholder="Confirmar Contraseña" onChange={(e) => setRepassword(e.target.value)} />
                                        <input className="button" type="button" id="register-buttom" value="Registrar" onClick={confimrsaveuser}/>
                                        
                                    </form>
                                    <img className="exit" onClick={() => setIsRegisterMenuOpen(false)} src="./src/utils/images/x.png" alt="exit" />
            </div>
            <div className="containerHomeAdmin">
                <div className="cardHomeAdmin">
                    <div className="text-card"> 
                        <h2>Admin</h2>
                        <p>Nombre: </p>
                        <p>Apellido: </p>
                        <p>Correo: </p>

                    </div>
                    <img src="" alt="foto" />
                </div>
            </div>
        </div>

    );
}

export default HomeAdmin;
