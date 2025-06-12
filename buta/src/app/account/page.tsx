"use client";

import Link from "next/link";
import { FormEvent, useState, useRef, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import errHandler from "../helpers/errHandler";

export default function AccountPage() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        toast.error("Login failed. Invalid email or password.");
        return;
      }
      toast.success("Login successful");
      window.location.href = "/";
    } catch (error) {
      return errHandler(error);
    }
  };

  const message = searchParams.get("message");
  const loginRequired = searchParams.get("loginRequired");
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current) {
      if (loginRequired) {
        toast.error("You must be logged in to view your wishlist");
        toastShown.current = true;
      } else if (message === "login-first") {
        toast.error("Please login first to access wishlist!");
        toastShown.current = true;
      }
    }
  }, [loginRequired, message]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-0 mb-16">
          {/* Left Column - Login Form */}
          <div className="w-full md:w-1/2 p-6 md:pr-12 md:border-r border-gray-200">
            <h1 className="text-2xl font-bold mb-2">MASUK KE AKUN ANDA</h1>

            <p className="text-sm text-gray-700 mb-6">
              Selamat datang kembali!
              <br />
              Saat ini e-Commerce yang baru telah tersedia; ketika pertama kali
              masuk, Anda akan diminta untuk membuat kata sandi baru. Jika Anda
              biasanya masuk menggunakan akun Google atau Facebook Anda maka
              klik tautan &quot;lupa kata sandi&quot; dan ikuti petunjuk
              berikutnya.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail/Ponsel *"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 outline-none"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Kata Sandi *"
                  name="password"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 accent-black"
                  />
                  <span className="text-sm">Ingat Saya</span>
                </label>

                <Link
                  href="/account/reset-password"
                  className="text-sm underline hover:no-underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Mobile number should be entered without area or country code.
                Ex: Enter &quot;1234567890&quot; and not
                &quot;01234567890&quot;.
              </p>

              <button
                type="submit"
                className="w-full bg-[#310110] text-white py-3 font-medium hover:bg-[#4a0119] transition-colors mt-4"
              >
                MASUK
              </button>
            </form>
          </div>

          {/* Right Column - Registration */}
          <div className="w-full md:w-1/2 p-6 md:pl-12">
            <h2 className="text-xl font-bold mb-4">
              TIDAK MEMILIKI AKUN BATA?
            </h2>
            <p className="text-sm mb-8">
              Anda akan menyukai Bata Club! Anggota dapat menikmati hadiah dan
              hak istimewa yang luar biasa.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">Keunggulan menjadi hidup</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M4 4.5c0-1.657 1.343-3 3-3 1.651 0 2.986 1.33 3 2.99V9l.071-.232a3 3 0 014.065-1.828l.186.078.305.133-5.012 6.26-.265.331-.575.72-.206.253c-.545.633-1.277.95-2.01.95-.797 0-1.518-.317-2.045-.836A2.986 2.986 0 014 12.495V4.5z" />
                    <path d="M9.5 4.5A1.5 1.5 0 1012.5 4.5 1.5 1.5 0 009.5 4.5z" />
                    <path d="M12.5 8.5A1.5 1.5 0 1015.5 8.5 1.5 1.5 0 0012.5 8.5z" />
                    <path d="M15.5 4.5A1.5 1.5 0 1018.5 4.5 1.5 1.5 0 0015.5 4.5z" />
                    <path d="M18.5 8.5A1.5 1.5 0 1021.5 8.5 1.5 1.5 0 0018.5 8.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    Bonus poin selamat datang - 100 Poin dan Bonus Voucher Rp.
                    30K untuk transaksi ke-2
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3z" />
                    <path d="M11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    Hadiah ulang tahun bonus voucher Rp. 30K, dan Bonus 300 poin
                    setiap pembelanjaan ke 2,4,6 dst
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">Dapatkan dan tukarkan poin</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">Hadiah eksklusif</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-center mb-4">
                TEMUKAN LEBIH BANYAK LAGI
              </p>
              <button
                onClick={() => (window.location.href = "/account/register")}
                className="w-full border border-gray-300 py-3 font-medium hover:bg-gray-50 transition-colors"
              >
                DAFTAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
