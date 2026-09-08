import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await api.post("/api/logout");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <aside className="fixed left-0 top-0 w-[240px] min-h-screen p-5 bg-gray-900 flex flex-col">
            <div className="mb-[30px]"><h2 className="m-0 text-white">Attendance System</h2></div>
            <nav className="flex flex-col gap-2.5">
                <NavLink to="/dashboard" className="p-3 text-gray-300 hover:text-white rounded-md">Dashboard</NavLink>
                <NavLink to="/students" className="p-3 text-gray-300 hover:text-white rounded-md">Students</NavLink>
                <NavLink to="/attendance" className="p-3 text-gray-300 hover:text-white rounded-md">Attendance</NavLink>
                <NavLink to="/scanner" className="p-3 text-gray-300 hover:text-white rounded-md">QR Scanner</NavLink>
            </nav>

            <div className="mt-auto">
                <button onClick={handleLogout} className="w-full p-3 bg-red-600 text-white hover:bg-red-700 rounded-md">Logout</button>
            </div>
        </aside>
    );
}
export default Sidebar;