export const getAllUsers = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
    const data = await res.json();
    const filteredData = data.filter(dt => dt.role !== "admin");
 return filteredData;
}
export const getRoles = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/roles`);
    const data = await res.json();
 return data;
}
export const getAuthorities = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorities`);
    const data = await res.json();
 return data;
}
export const getDepartments = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/departments`);
    const data = await res.json();
 return data;
}
export const getDepartment = async(id)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/departments`);
    const data = await res.json();
    const dept = data.find(dt => dt._id === id);
 return dept?.departmentName ?? "—";
}
export const getAuthority = async(id)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorities`);
    const data = await res.json();
    const auth = data.find(at => at._id === id);
 return auth?.authorityName ?? "—";
}
export const getReports = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reports`);
    const data = await res.json();
 return data;
}
export const getCategories = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/problemCategories`);
    const data = await res.json();
 return data;
}
export const getReport = async(id)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reports/${id}`);
    const data = await res.json();
 return data;
}
export const getNotifications = async(userId)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/${userId}`);
    const data = await res.json();
 return data;
}


