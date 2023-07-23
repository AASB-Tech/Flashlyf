"use client"
import { useRouter } from "next/navigation"; 
import api from "@/clientAPI/api.js";

const Logout = () => {

    const router = useRouter();

    const handleLogout = async () => {
        const response = await api.logout();
        if (response?.success) {
            window.localStorage.setItem('loggedInUserID', "");
            window.localStorage.setItem('loggedInUsername', "");
            router.push("/");
        }
    }

  return (
    <>
      <div>
        <div className="text-dm text-dark flex flex-col gap-[16px] w-full">
          <button
            onClick={handleLogout}
            >
                Logout
            </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
