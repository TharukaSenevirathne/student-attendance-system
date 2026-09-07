import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import StudentsPage from "../pages/StudentsPage";
import AdminLayout from "../components/navigation/AdminLayout";
import CreateStudentPage from "../pages/CreateStudentPage";
import StudentDetailsPage from "../pages/StudentDetailsPage";
import EditStudentPage from "../pages/EditStudentPage";
import ScannerPage from "../pages/ScannerPage";
import AttendancePage from "../pages/AttendancePage";
import EditAttendancePage from "../pages/EditAttendancePage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LoginPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <AdminLayout>
                            <DashboardPage />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/students"
                    element={
                        <AdminLayout>
                            <StudentsPage />
                        </AdminLayout>
                    }
                />

                <Route
                path="/students/create"
                element={
                    <AdminLayout>
                        <CreateStudentPage />
                    </AdminLayout>
                }
                 />

                <Route
                path="/students/:id"
                element={
                    <AdminLayout>
                        <StudentDetailsPage />
                    </AdminLayout>
                }
            />

                <Route
                path="/students/:id/edit"
                element={
                    <AdminLayout>
                        <EditStudentPage />
                    </AdminLayout>
                }
            />

                <Route
                path="/scanner"
                element={
                    <AdminLayout>
                        <ScannerPage />
                    </AdminLayout>
                }
            />

                <Route
                path="/attendance"
                element={
                    <AdminLayout>
                        <AttendancePage />
                    </AdminLayout>
                }
            />

                <Route
                path="/attendance/:id/edit"
                element={
                    <AdminLayout>
                        <EditAttendancePage />
                    </AdminLayout>
                }
            />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;