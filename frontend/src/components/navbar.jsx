import React, { useState } from "react";
import { FaCog, FaSignOutAlt, FaUserCircle, FaFolderOpen } from "react-icons/fa"; // Importamos más íconos de React Icons
import { useNavigate } from "react-router-dom"; // Para redirigir al login
import { toast } from "react-toastify"; // Importamos ToastContainer y toast
import "react-toastify/dist/ReactToastify.css"; // Estilos de react-toastify
import styled from "styled-components"; // Importamos styled-components

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 14px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarLogo = styled(FaFolderOpen)`
  font-size: 25px;
  color: white;
  margin-right: 10px;
`;

const NavbarTitle = styled.span`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const NavbarRight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SettingsButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SettingsText = styled.span`
  margin-left: 5px;
  font-size: 16px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  border-radius: 5px;
  z-index: 1100;
  overflow: hidden;
`;

const DropdownMenuButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #000000;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  font-size: 14px;

  &.yes {
    background-color: #e41b1b;
    color: white;
  }

  &.no {
    background-color: #1f8514;
    color: white;
  }
`;

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Sesión cerrada exitosamente");
    setShowModal(false);
    navigate("/");
  };

  const handleProfileChange = () => {
    setShowProfileModal(false);
    navigate("/update-profile");
  };

  return (
    <div>
      <NavbarContainer>
        <NavbarLeft>
          <NavbarLogo size={24} />
          <NavbarTitle>Gestión del registro de pacientes</NavbarTitle>
        </NavbarLeft>
        <NavbarRight>
          <SettingsButton onClick={() => setShowDropdown(!showDropdown)}>
            <FaCog size={24} color="white" />
            <SettingsText>Configuración</SettingsText>
          </SettingsButton>
          {showDropdown && (
            <DropdownMenu>
              <DropdownMenuButton onClick={() => setShowProfileModal(true)}>
                <FaUserCircle size={18} /> Cambiar foto de perfil
              </DropdownMenuButton>
              <DropdownMenuButton onClick={() => setShowModal(true)}>
                <FaSignOutAlt size={18} /> Cerrar sesión
              </DropdownMenuButton>
            </DropdownMenu>
          )}
        </NavbarRight>
      </NavbarContainer>

      {showModal && (
        <Modal>
          <ModalContent>
            <h2>¿Estás seguro de que quieres cerrar sesión?</h2>
            <ModalButton className="yes" onClick={handleLogout}>
              Sí, cerrar sesión
            </ModalButton>
            <ModalButton className="no" onClick={() => setShowModal(false)}>
              No, volver
            </ModalButton>
          </ModalContent>
        </Modal>
      )}

      {showProfileModal && (
        <Modal>
          <ModalContent>
            <h2>¿Seguro deseas cambiar la foto de perfil?</h2>
            <ModalButton className="yes" onClick={handleProfileChange}>
              Sí, cambiar
            </ModalButton>
            <ModalButton className="no" onClick={() => setShowProfileModal(false)}>
              No, volver
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;