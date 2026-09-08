import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentsPage() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await api.get(`/api/students?page=${currentPage}`);
                setStudents(response.data.data); //pagination
                setCurrentPage(response.data.current_page);
                setLastPage(response.data.last_page);
            } catch (error) {
            console.error(error);
            setError("Unable to load students. try again.");
            } finally {
                setLoading(false);
            }
        };
        getStudents();
    }, [currentPage]);  //here 

    const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) {
        return;
    }
    setError("");
    setSuccess("");
    try {
        await api.delete(`/api/students/${id}`);
        setStudents(
            students.filter((student) => student.id !== id)  //keep other students that id is not equal to delete one
        );
        setSuccess("Student deleted successfully");
        } catch (error) {
            console.error(error);
            setError("Unable to delete student. try again.");
        }
};

if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <p className="text-lg text-gray-600">Loading students...</p></div>
    );
}

return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Students</h1>
                <p className="mt-1 text-gray-500">Manage all registered students</p>
                {error && (
                    <p className="mt-3 text-sm text-red-600">{error}</p>
                )}
                {success && (
                    <p className="mt-3 text-sm text-green-600">{success}</p>
                )}
            </div>

            <button
                onClick={() => navigate("/students/create")}
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700">Add Student</button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student ID</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Phone</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">QR Code</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {students.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No students found.</td>
                            </tr>
                        )}
                        {students.map((student) => (
                            <tr
                                key={student.id}
                                onClick={() =>
                                    navigate(`/students/${student.id}`)
                                }
                                className="cursor-pointer transition hover:bg-gray-50">

                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.student_id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{student.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{student.qr_code}</td>
                                <td className="px-6 py-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm 
                                ${student.status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"}`}>{student.status}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();   //by this entire row will not click
                                                navigate(`/students/${student.id}/edit`);
                                            }}
                                            className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100">Edit</button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(student.id);
                                            }}
                                            className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40">Previous</button>
                    <span className="text-sm text-gray-600">Page 
                        <span className="text-gray-800">{currentPage}</span>\<span className="text-gray-800">{lastPage}</span>
                    </span>

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40">Next</button>
                </div>
            </div>
        </div>
    </div>
);
}
export default StudentsPage;