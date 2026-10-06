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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/roles/${role}`
      );

      const data = await res.json();

      const permissions = data.permissions;


  return (
    <div className="flex h-screen ">
      <div className="flex flex-1 overflow-hidden">
       <DashboardSidebar permissions={permissions}/>
      <div className="flex-1 overflow-y-auto">
          <DashboardNavbar user={user} permissions={permissions}/>
        <main >{children}</main>
      </div>
      </div>
    </div>
  );
}
