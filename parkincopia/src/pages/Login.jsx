import { useEffect, useState} from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    let [encontrado, setEncontrado] = useState(true);
    let [users, setUsers] = useState([]);


    let user = {firstName: "", lastname: "", email: "", password: "" };
    
    //let arr = [];
    let user1 = {firstName: "admin", lastname: "Garcia", email: "Tqy7T@example.com", password: "1234" };
    let user2 = {firstName: "admin1", lastname: "Lopez", email: "t9VJU@example.com", password: "1234" };
    const admins = [user1,user2]
    
    useEffect(() => {
        document.title = "Login";
        loadUserFromLocalStorage();
    }, []);

    const loadUserFromLocalStorage = () => {
        const json = localStorage.getItem("users");
        try {
            const parsedusers = JSON.parse(json);
            if(Array.isArray(parsedusers)){
                setUsers(parsedusers);
            }else{
                setUsers([]);
            }
        } catch (error) {
            console.error("Error parsing :", error);
            setUsers([]);
        }
    }

    const handlelogin = () => {
        for(let i = 0; i < users.length; i++){
            if(user.email === users[i].email && user.password === users[i].password){
                navigate("/home");
            }
        }
        for(let i = 0; i < admins.length; i++){
            if(user.email === admins[i].email && user.password === admins[i].password){
                navigate("/Soy el Admin");
            }
        }
        setEncontrado(false);
        limpiarinputs();
    };

    const limpiarinputs = () => {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }

    return (
            <div className="container">
                <div className="heading">Sing In</div>
                <div action= "" className="form">
                    <input required="" className="input" type="email" name="email" id="email" placeholder="E-mail" onChange={(e) => user.email = e.target.value}></input> 
                    <input required="" className="input" type="password" name="password" id="password" placeholder="Password" onChange={(e) => user.password = e.target.value}></input>
                            <span className="forgot-password"><a href="">Forgot Password ?</a></span>
                            <input className="login-button" type="submit" value="Sing In" onClick={handlelogin}></input>
                            <div className="login-error" hidden={encontrado} >{!encontrado && "User not found"}
                                <div className="login-error-arrow" onClick={() => setEncontrado(true)}>X</div>
                            </div>
                </div>
            </div>
        
    );
}

export default Login;
