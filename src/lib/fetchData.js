export const getAllUsers = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
    const data = await res.json();
    const filteredData = data.filter(dt => dt.role !== "admin");
 return filteredData;
}