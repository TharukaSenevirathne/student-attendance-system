import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AttendancePage() {
    const navigate = useNavigate();
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        getAttendance();
    }, []);

    const getAttendance = async () => {
        try {
            const response = await api.get("/api/attendance");
            setAttendances(response.data);
        } catch (error) {
            setError("Unable to load attendance records.");
        } finally {
            setLoading(false);
        }
    };

    const deleteAttendance = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this attendance record?");
        if (!confirmDelete) {
            return;
    }
        try {
            await api.delete(`/api/attendance/${id}`);
            setAttendances(attendances.filter((attendance) => attendance.id !== id));
        } catch (error) {
            alert("Unable to delete");
        }
    };

    if (loading) {
        return <p>Loading attendance...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance</h1>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Student ID</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Student Name</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Time</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Scanned Value</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {attendances.map((attendance) => (
                                    <tr key={attendance.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-5 text-sm text-gray-700">{attendance.student?.student_id}</td>
                                        <td
                                            onClick={() => navigate(`/attendance/student/${attendance.student?.id}`)}
                                            className="px-6 py-5 text-sm text-blue-600 hover:underline cursor-pointer">{attendance.student?.name}</td>
                                        <td className="px-6 py-5 text-sm text-gray-700">{attendance.date}</td>
                                        <td className="px-6 py-5 text-sm text-gray-700">{attendance.time}</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">{attendance.status}</span>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-700">{attendance.scanned_value}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>navigate(`/attendance/${attendance.id}/edit`)}
                                                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 text-sm font-medium">Edit</button>

                                                <button
                                                    onClick={() =>deleteAttendance(attendance.id)}
                                                    className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 text-sm font-medium">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    );
}
export default AttendancePage;