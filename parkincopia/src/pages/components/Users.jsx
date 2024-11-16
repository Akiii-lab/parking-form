import { useEffect, useState } from "react";

export function Users() {


    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([{ documento:"", firstName: "", lastname: "", code: "", email: "", role: "",password: "",  vehiculos: [{ plate: "",brand:"",color:""}] }]);
    const [repassword, setRepassword] = useState("");
    
    const [view, setView] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        document.title = "Users";
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };


    const limpiarinputs = () => {
        document.getElementById("document").value = "";
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("code").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    }

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
            setMessage("Email ya esta registrado");
            
        } else if (codeExist) {
            setMessage("Codigo ya esta registrado");

        } else if(documentExist){
            setMessage("Documento ya esta registrado");
        }else {
            if (user.password === repassword) {
                const updatedUsers = [...users, newUser];
                saveUserInLocalStorage(updatedUsers); //para guardar en el json pero solo cuando se necesite al final
                setMessage("Usuario registrado!");
                view();
                limpiarinputs();
            } else {
                setMessage("Las contraseñas no coinciden");
                view();
            }
        }
    };
    
    return (
        <div className="registerUser-box" hidden={!view}>
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
                        {message &&
                            <div className="password-error"> <p>{message}</p>
                                <img className="exit-password" onClick={() => setMessage("")} src="./src/utils/images/x.png" alt="exit" />
                            </div>
                        }
                    </div>
                    <img className="exit" onClick={() => setView(!view)} src="./src/utils/images/x.png" alt="exit" />
                </div>
    );
}

export default Users;