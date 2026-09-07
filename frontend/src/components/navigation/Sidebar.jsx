import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar bg-gray-900">
            <div className="sidebar-header"><h2 className="text-white">Attendance System</h2></div>
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</NavLink>
                <NavLink to="/students" className="text-gray-300 hover:text-white">Students</NavLink>
                <NavLink to="/attendance" className="text-gray-300 hover:text-white">Attendance</NavLink>
                <NavLink to="/scanner" className="text-gray-300 hover:text-white">QR Scanner</NavLink>
                <NavLink to="/attendance" className="text-gray-300 hover:text-white">Attendance</NavLink>
            </nav>

            <div className="sidebar-footer">
                <button className="bg-red-600 text-white hover:bg-red-700">Logout</button>
            </div>
        </aside>
    );
}
export default Sidebar;