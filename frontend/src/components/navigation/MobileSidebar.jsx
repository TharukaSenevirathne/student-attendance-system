import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

function MobileSidebar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await api.post("/api/logout");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-gray-900 text-white">
            <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">Attendance System</h2>

                <button onClick={() => setOpen(!open)} className="text-2xl text-white">
                        <i className={open ? "pi pi-times" : "pi pi-bars"}></i>
                </button>
            </div>

            {open && (
                <nav className="flex flex-col gap-4 px-4 pb-5">
                    <NavLink to="/dashboard" onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">Dashboard</NavLink>
                    <NavLink to="/students" onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">Students</NavLink>
                    <NavLink to="/attendance" onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">Attendance</NavLink>
                    <NavLink to="/scanner" onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">QR Scanner</NavLink>
                    <button onClick={handleLogout} className="w-fit bg-red-600 px-4 py-2 text-white hover:bg-red-700">Logout</button>
                </nav>
            )}
        </div>
    );
}
export default MobileSidebar;