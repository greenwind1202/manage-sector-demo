import Sector from "../features/Sector";
export function Layout() {
  return (
    <div className="grid grid-cols-12 w-full h-screen bg-gray-300">
      <div className="col-span-12 h-[3.75rem] bg-gray-500 px-4 flex items-center text-white text-bold">
        MANAGE SECTOR APPLICATION
      </div>
      <div className="col-span-12 h-[calc(100vh-4.75rem)] mt-4">
        <Sector />
      </div>
    </div>
  );
}

export default Layout;
