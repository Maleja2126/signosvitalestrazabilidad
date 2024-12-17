import Navbar from './navbar';
import Sidebar from './Sidebar';
import './navbar.css';  // Para el archivo CSS de navbar
import './Sidebar.css';  // Para el archivo CSS de Sidebar


const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="p-6 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;