import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

function AdminLayout({ children }) {
    return (
        <div className="min-h-screen">
            <div className="hidden md:block">
                <Sidebar />
            </div>

            <div className="block md:hidden">
                <MobileSidebar />
            </div>

            <main className="md:ml-[240px] p-4 md:p-[30px]">{children}</main>
        </div>
    );
}
export default AdminLayout;