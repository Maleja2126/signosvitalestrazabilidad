import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validaciones generales
        if (!numeroIdentificacion || !password) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }
        if (!/^\d+$/.test(numeroIdentificacion)) {
            toast.error("El número de identificación debe contener solo números.");
            return;
        }
        if (password.length < 8) {
            toast.error("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        setIsLoading(true); // Mostrar estado de carga

        try {
            const response = await login(numeroIdentificacion, password);
            setIsLoading(false); // Ocultar estado de carga
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("numero_identificacion", response.data.numero_identificacion);
            toast.success("Inicio de sesión exitoso!");
            navigate("/dashboard");
        } catch (err) {
            setIsLoading(false); // Ocultar estado de carga en caso de error
            console.error("Error al iniciar sesión", err);
            if (err.response && err.response.status === 403) {
                toast.error("El usuario está deshabilitado. Contacte al administrador.");
            } else if (err.response && err.response.status === 401) {
                toast.error("Credenciales inválidas. Por favor, intente de nuevo.");
            } else {
                toast.error("Error del servidor. Intente más tarde.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, rgba(30,144,255,0.8), rgba(50,205,50,0.8))",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    padding: "20px",
                    transition: "box-shadow 0.3s ease-in-out",
                    animation: "fadeIn 0.5s ease-in-out",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)")
                }
            >
                {/* Ícono de usuario */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <div
                        style={{
                            width: "70px",
                            height: "70px",
                            background: "rgba(30,144,255,0.2)",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto",
                        }}
                    >
                        <FaUser style={{ fontSize: "30px", color: "rgba(30,144,255,0.9)" }} />
                    </div>
                </div>

                {/* Mensaje de bienvenida */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: "0", fontSize: "24px", color: "#333" }}>
                        ¡Bienvenido de nuevo!
                    </h2>
                    <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                        Por favor, inicie sesión para continuar.
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    {/* Campo de usuario */}
                    <div style={{ marginBottom: "15px", position: "relative" }}>
                        <FaUser
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "15px",
                                transform: "translateY(-50%)",
                                color: "#888",
                                zIndex: "1",
                            }}
                        />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Número de identificación"
                            value={numeroIdentificacion}
                            onChange={(e) => setNumeroIdentificacion(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 40px",
                                borderRadius: "25px",
                                border: "1px solid #ccc",
                                outline: "none",
                                position: "relative",
                                zIndex: "0",
                            }}
                        />
                    </div>

                    {/* Campo de contraseña */}
                    <div style={{ marginBottom: "15px", position: "relative" }}>
                        <FaLock
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "15px",
                                transform: "translateY(-50%)",
                                color: "#888",
                                zIndex: "1",
                            }}
                        />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 40px",
                                borderRadius: "25px",
                                border: "1px solid #ccc",
                                outline: "none",
                                position: "relative",
                                zIndex: "0",
                            }}
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: "15px",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                color: "#888",
                                zIndex: "1",
                            }}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Olvidé mi contraseña */}
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <button
                            type="button"
                            onClick={() => navigate("/reset-password")}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#1E90FF",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Olvidé mi contraseña
                        </button>
                    </div>

                    {/* Botón de iniciar sesión */}
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: isLoading ? "rgba(34,139,34,0.7)" : "rgba(50,205,50,0.9)",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "25px",
                            border: "none",
                            cursor: isLoading ? "not-allowed" : "pointer",
                            transition: "background 0.3s ease",
                        }}
                        disabled={isLoading}
                        onMouseEnter={(e) => {
                            if (!isLoading) e.target.style.background = "rgba(34,139,34,1)";
                        }}
                        onMouseLeave={(e) => {
                            if (!isLoading) e.target.style.background = "rgba(50,205,50,0.9)";
                        }}
                    >
                        {isLoading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>

            {/* Animación de fade-in */}
            <style>
                {`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Login;