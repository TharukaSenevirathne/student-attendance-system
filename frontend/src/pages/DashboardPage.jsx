import { useEffect, useState } from "react";
import api from "../services/api";

function DashboardPage() {
    const [dashboardData, setDashboardData] = useState({total_students: 0, total_attendance: 0, today_attendance: 0});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                const response = await api.get("/api/dashboard");
                setDashboardData(response.data);
            } 
            catch (error) {
                setError("Failed to load dashboard data.");
            } 
            finally {
                setLoading(false);
            }
        };

        getDashboardData();
    }, []);   //kept dependency array empty coz no purpose of it to call again and again in this task

 if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-600">Loading dashboard...</p></div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-red-600">{error}</p></div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="mb-8 text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-lg font-semibold text-gray-600">Total Students</h2>
                    <p className="mt-3 text-4xl font-bold text-blue-600">{dashboardData.total_students}</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-lg font-semibold text-gray-600">Total Attendance</h2>
                    <p className="mt-3 text-4xl font-bold text-green-600">{dashboardData.total_attendance}</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-lg font-semibold text-gray-600">Today's Attendance</h2>
                    <p className="mt-3 text-4xl font-bold text-purple-600">{dashboardData.today_attendance}</p>
                </div>
            </div>
        </div>
    );
}
export default DashboardPage;