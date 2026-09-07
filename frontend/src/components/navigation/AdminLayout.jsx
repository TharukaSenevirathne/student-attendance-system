import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">{children}</main>
        </div>
    );
}
export default AdminLayout;