import DashboardNavbar from "@/components/dashboard/shared/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function DashboardLayout({ children }) {
     const session = await auth.api.getSession({
    headers: await headers(),
  });
  const role = session?.user?.role ?? "user";
  const user = session?.user;
  return (
    <div className="flex h-screen ">
      <div className="flex flex-1 overflow-hidden">
       <DashboardSidebar role={role}/>
      <div className="flex-1 overflow-y-auto">
          <DashboardNavbar user={user}/>
        <main >{children}</main>
      </div>
      </div>
    </div>
  );
}
