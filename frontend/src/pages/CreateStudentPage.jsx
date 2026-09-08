import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import api from "../services/api";

function CreateStudentPage() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("active");
    const [createdStudent, setCreatedStudent] = useState(null);
    const [saving, setSaving] = useState(false);  //to disable create button

    const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setError("");
    setSaving(true);

        try {
            const response = await api.post("/api/students", {
                student_id: studentId,
                name: name,
                email: email,
                phone: phone,
                status: status,
            });
            setCreatedStudent(response.data.student);
        } catch (error) {
        console.error(error);

        if (error.response?.status === 422) {
            setErrors(error.response.data.errors);
        }
        else {
            setError("Unable to create student. Try again");
        }
        }
        finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add Student</h1>
                <p className="mt-1 text-gray-500">Add a new student to the attendance system</p>
            </div>

            {!createdStudent ? (
                <div className="max-w-2xl rounded-xl bg-white p-8 shadow">
                    <form onSubmit={handleSubmit}>
                        {error && (
                        <p className="mb-4 text-sm text-red-600">{error}</p>)}
                        <div className="mb-5">  
                            <label htmlFor="studentId" className="mb-2 block text-sm font-semibold text-gray-700">Student ID</label>  
                            <input
                                id="studentId"   //without html5 browser doesn't know that this label belongs to
                                type="text" 
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"/>

                                {errors.student_id && (<p className="mt-1 text-sm text-red-600">{errors.student_id[0]}</p>)}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">Name</label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"/>

                                {errors.name && (<p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>)}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"/>

                                {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>)}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">Phone</label>
                            <input
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"/>

                                {errors.phone && (<p className="mt-1 text-sm text-red-600">{errors.phone[0]}</p>)}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="status" className="mb-2 block text-sm font-semibold text-gray-700">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <button type="submit" disabled={saving} className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">{saving ? "Creating..." : "Create Student"}</button>
                    </form>
                </div>
            ) : 
            (  //a short form
                <div className="max-w-2xl rounded-xl bg-white p-8 text-center shadow">
                    <h2 className="mb-6 text-2xl font-bold text-green-600">Student Created Successfully</h2>
                    <p className="mb-2 text-gray-700">
                        <span className="font-semibold">Student ID:</span>{createdStudent.student_id}</p>
                    <p className="mb-6 text-gray-700">
                        <span className="font-semibold">QR Code:</span>{createdStudent.qr_code}</p>

                    <div className="mb-6 flex justify-center">
                        <QRCodeSVG value={createdStudent.qr_code} size={200}/></div>

                    <button onClick={() => navigate("/students")} className="rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white transition hover:bg-gray-800">Back to Students</button>
                </div>
            )}
        </div>
    );
}
export default CreateStudentPage;