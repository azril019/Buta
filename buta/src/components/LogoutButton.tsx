"use client";

import { handleLogout } from "@/actions";
import toast from "react-hot-toast";

interface LogoutButtonProps {
  getLinkClass: (baseClass: string) => string;
}

export default function LogoutButton({ getLinkClass }: LogoutButtonProps) {
  const confirmLogout = async () => {
    await handleLogout();
    toast.success("Logout successful");
    window.location.href = "/";
  };

  const logOut = () => {
    toast.custom(
      (t) => (
        <div className="px-6 py-4 bg-white shadow-md rounded-lg border border-gray-100 flex flex-col gap-3">
          <p className="text-gray-800 font-medium">Yakin ingin logout?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors"
            >
              Tidak
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                confirmLogout().catch((error) => {
                  console.error("Logout error:", error);
                  toast.error("Logout failed");
                });
              }}
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm transition-colors"
            >
              Ya
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      }
    );
  };

  return (
    <button
      onClick={logOut}
      className="group p-2 rounded-full hover:bg-transparent focus:bg-transparent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={getLinkClass("h-5 w-5 hover:text-red-500")}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  );
}
