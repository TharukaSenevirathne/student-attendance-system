import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { QRCodeSVG } from "qrcode.react";

function StudentDetailsPage() {
    const { id } = useParams();   //to get id from the url after click the student
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudent = async () => {
            try {
                const response = await api.get(`/api/students/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getStudent();
    });

    if (loading) {
        return <p>Loading student...</p>;
    }

return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Student Details</h1>
        </div>

        <div className="max-w-3xl rounded-xl bg-white p-8 shadow">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <p className="text-sm font-semibold text-gray-500">Student ID</p>
                    <p className="mt-1 text-lg text-gray-800">{student.student_id}</p>
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-500">Name</p>
                    <p className="mt-1 text-lg text-gray-800">{student.name}</p>
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-500">Email</p>
                    <p className="mt-1 text-lg text-gray-800">{student.email}</p>
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-500">Phone</p>
                    <p className="mt-1 text-lg text-gray-800">{student.phone}</p>
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-500">Status</p>
                    <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">{student.status}</span>
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-500">QR Value</p>
                    <p className="mt-1 text-lg text-gray-800">{student.qr_code}</p>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8 text-center">
                <h2 className="mb-5 text-2xl font-bold text-gray-800">Student QR Code</h2>
                <div className="flex justify-center">
                    <QRCodeSVG value={student.qr_code} size={200}/>
                </div>
            </div>
        </div>
    </div>
);
}
export default StudentDetailsPage;