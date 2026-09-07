import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditAttendancePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("present");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAttendance();
    }, []);

    const getAttendance = async () => {
        try {
            const response = await api.get(`/api/attendance/${id}`);
            setDate(response.data.date);
            setTime(response.data.time);
            setStatus(response.data.status);
        } catch (error) {
            setError("Unable to load");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/attendance/${id}`, 
                {
                date: date,
                time: time,
                status: status,
            });
            alert("Attendance updated successfully.");
            navigate("/attendance");
        } catch (error) {
            console.error("Update attendance error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen"><p className="text-lg text-gray-600">Loading attendance...</p></div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Attendance</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-3">
                        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Update Attendance</button>
                        <button
                            type="button"
                            onClick={() => navigate("/attendance")}
                            className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAttendancePage;