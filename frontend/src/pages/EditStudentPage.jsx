import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditStudentPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("active");
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const getStudent = async () => {
            try {
                const response = await api.get(`/api/students/${id}`);
                setStudentId(response.data.student_id);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setStatus(response.data.status);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getStudent();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            await api.put(`/api/students/${id}`, {
                student_id: studentId,
                name: name,
                email: email,
                phone: phone,
                status: status,
            });
            navigate("/students");
        } catch (error) {
            console.error(error);
        if (error.response?.status === 422) {setErrors(error.response.data.errors);}
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Loading student...</p></div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Student</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                            {errors.student_id && (<p className="mt-1 text-sm text-red-600">{errors.student_id[0]} </p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                            {errors.name && (<p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                            {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-3">
                        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Update Student</button>
                        <button
                            type="button"
                            onClick={() => navigate("/students")}
                            className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditStudentPage;