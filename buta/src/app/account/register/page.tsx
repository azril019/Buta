"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gender: "",
    Name: "",
    phone: "",
    terms: false, // Changed from agreeTerms
    marketing: false, // Changed from agreeMarketing
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw await res.json();
      toast.success("Akun berhasil dibuat!");
      window.location.href = "/account";
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Pendaftaran</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                *Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                *Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full p-2 border rounded pr-10"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Kata sandi harus terdiri dari 8-20 karakter, termasuk huruf
                kecil, huruf besar, angka, dan karakter khusus seperti @, #, $
              </p>
            </div>

            {/* For the gender selection radio buttons */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                *Panggilan
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Mr."
                    className="mr-2 appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-red-600 checked:border-red-600 focus:outline-none"
                    onChange={handleInputChange}
                  />
                  <span>Mr.</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Mrs."
                    className="mr-2 appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-red-600 checked:border-red-600 focus:outline-none"
                    onChange={handleInputChange}
                  />
                  <span>Mrs.</span>
                </label>
              </div>
            </div>

            <div className=" md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium mb-1"
                >
                  *Nama
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  *No. Telepon
                </label>
                <div className="flex ">
                  <span className="items-center px-3 bg-gray-100 border rounded-l">
                    +62
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full p-2 border rounded-r"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">
                Syarat dan ketentuan Bata Club
              </h3>
              <p className="text-sm mb-2">
                Silahkan membaca{" "}
                <Link href="#" className="text-red-600 font-semibold">
                  Kebijakan Data Pribadi
                </Link>
                untuk izin, memproses, mengerjakan pribadi registrasi. Dengan
                mengirimkan detail pendaftaran, anda menyetujui untuk
                pelaksanaan keagamaan Bata Club.
              </p>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  onChange={handleInputChange}
                />
                <label htmlFor="terms">
                  Saya setuju dengan syarat dan ketentuan
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Pemasaran dan Komunikasi</h3>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="marketing"
                  name="marketing"
                  className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  onChange={handleInputChange}
                />
                <label htmlFor="marketing">
                  Saya setuju menerima informasi pemasaran
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-4 w-full font-bold"
            >
              DAFTAR
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            <p>
              Untuk informasi dan bantuan harap hubungi kami di{" "}
              <a
                href="mailto:id.customercare@bata.com"
                className="text-blue-600"
              >
                id.customercare@bata.com
              </a>
              atau telepon kami di{" "}
              <a href="tel:+622134838720" className="text-blue-600">
                +62 21-3483-8720
              </a>
              (Senin - Jumat 9 am - 5 pm)
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Banner */}
      <div className=" py-12">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/bottom-banner.png"
              alt="Bata devices"
              width={1000}
              height={800}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
