import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function AttendanceDetailPage() {
    const { id } = useParams();  //due url usage
    const [student, setStudent] = useState();
    const [attendances, setAttendances] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAttendanceDetails = async () => {
            try {
                const studentResponse = await api.get(`/api/students/${id}`);
                const attendanceResponse = await api.get(`/api/attendance?student_id=${id}`);
                setStudent(studentResponse.data);
                setAttendances(attendanceResponse.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getAttendanceDetails();}, [id]);

    if (loading) {
        return <p>Loading attendance history...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance History</h1>
                <p className="text-gray-600 mb-8">{student.name} - {student.student_id}</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Time</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Scanned Value</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {attendances.map((attendance) => (
                                <tr key={attendance.id}>
                                    <td className="px-6 py-5 text-sm text-gray-700">{attendance.date}</td>
                                    <td className="px-6 py-5 text-sm text-gray-700">{attendance.time}</td>
                                    <td className="px-6 py-5 text-sm text-gray-700">{attendance.status}</td>
                                    <td className="px-6 py-5 text-sm text-gray-700">{attendance.scanned_value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {attendances.length === 0 && (<p className="p-6 text-gray-600">No attendance records found.</p>)}
                </div>
            </div>
        </div>
    );
}
export default AttendanceDetailPage;