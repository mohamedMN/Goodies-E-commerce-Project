import { useState } from "react";
import { useDispatch } from "react-redux"

export default function Ajouter() {
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [user_name, setUserName] = useState();
    const [password, setPassword] = useState();
    const [conPassword, setConPassword] = useState();
    const [role, setRole] = useState();
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === conPassword) {

            const data = {
                first_name,
                last_name,
                email,
                user_name,
                password,
                role
            };
            console.log('Form Data:', data);
            dispatch(SignUp(data))
        } else {
            setErrorMessage(
                "confirme password don't matche password."
            );
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="first-name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                /><br />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="last-name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                /><br />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />

                <label htmlFor="userName">Username:</label>
                <input
                    type="text"
                    id="userName"
                    name="user_name"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                /><br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <label htmlFor="password">Confirme Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setConPassword(e.target.value)}
                    required
                /><br />

                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select><br />
                {errorMessage && <p>{errorMessage}</p>}

                <input type="submit" value="Add User" />
            </form>
        </div >
    );
}
