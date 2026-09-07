import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentsPage() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await api.get("/api/students");
                setStudents(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getStudents();
    }, []);  //here 

    const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) {
        return;
    }
    try {
        await api.delete(`/api/students/${id}`);
        setStudents(
            students.filter((student) => student.id !== id)  //keep other students that id is not equal to delete one
        );
    } catch (error) {
        console.error(error);
    }
};

if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <p className="text-lg text-gray-600">
                Loading students...
            </p>
        </div>
    );
}

return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Students</h1>
                <p className="mt-1 text-gray-500">Manage all registered students</p>
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
                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">{student.status}</span>
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
            </div>
        </div>
    </div>
);
}

export default StudentsPage;