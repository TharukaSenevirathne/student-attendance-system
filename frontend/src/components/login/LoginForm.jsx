import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async (e) => {
                e.preventDefault();
        try {
                          // get cookie
            await axios.get("http://localhost:8000/sanctum/csrf-cookie",
                {
                    withCredentials: true,   //laravel doc cors and cookies
                    withXSRFToken: true,
                }
            );
                        // login give cookie
            const response = await axios.post(
                "http://localhost:8000/api/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                    withXSRFToken: true,
                }
            );
            console.log(response.data);
            navigate("/dashboard");
        } catch (error) {
        setError(error.response?.data?.message || "Login failed");
        }
    };

return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
            <div className="w-[400px] bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="m-0 mb-2 text-[28px] text-gray-800">Admin Login</h1>
                    <p className="m-0 text-sm text-gray-500">Student Attendance Management System</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full box-border px-3.5 py-3 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-600"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full box-border px-3.5 py-3 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-600"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm mb-4">{error}</p>
                        )}
                    <button type="submit" className="w-full py-3 border-0 rounded-md bg-indigo-600 text-white text-[15px] font-semibold cursor-pointer hover:bg-indigo-700">Login</button>
                </form>
            </div>
        </div>
    );
}
export default LoginForm;