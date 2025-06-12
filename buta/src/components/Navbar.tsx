"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

interface NavbarProps {
  isLoggedIn?: boolean;
  initialIsScrolled?: boolean;
  isHomePage?: boolean;
}

export default function Navbar({
  isLoggedIn = false,
  initialIsScrolled = false,
  isHomePage = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(initialIsScrolled);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${searchQuery}`;
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 group p-2 transition-colors duration-300 ${
    !isHomePage
      ? "bg-white text-black"
      : isScrolled
      ? "bg-white text-black"
      : "bg-gradient-to-b from-black/60 to-black/0 hover:bg-white text-white hover:text-black"
  }`;

  const getLinkClass = (baseClass: string) => {
    return `${baseClass} ${
      !isHomePage || isScrolled
        ? "text-black"
        : "text-white group-hover:text-black"
    }`;
  };

  return (
    <div className={navbarClasses}>
      <div className="w-full px-3 flex justify-between items-center">
        {/* Left navigation links */}
        <div className="flex items-center gap-6 pl-2">
          <Link
            href="/products?search=wanita"
            className={getLinkClass("font-medium hover:text-red-500")}
          >
            Wanita
          </Link>
          <Link
            href="/products?search=pria"
            className={getLinkClass("font-medium hover:text-red-500")}
          >
            Pria
          </Link>
          <Link
            href="/products?search=anak"
            className={getLinkClass("font-medium hover:text-red-500")}
          >
            Anak-Anak
          </Link>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <Image
              width={100}
              height={100}
              src="/Logo.png"
              alt="Logo"
              className="h-6"
            />
          </Link>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3 pr-2">
          {/* Search button and input */}
          <div className="relative">
            <button
              className="group p-2 rounded-full hover:bg-transparent focus:bg-transparent"
              onClick={handleSearchClick}
              aria-label="Search"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            {showSearch && (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-10 bg-white rounded shadow-md flex items-center px-2 py-1 z-50"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none outline-none px-2 py-1 text-black bg-transparent"
                  placeholder="Cari produk..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {!isLoggedIn && (
            <Link
              href="/account"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          )}

          <Link
            href="/wishlist"
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Link>

          <button className="group p-2 rounded-full hover:bg-transparent focus:bg-transparent">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </button>
          {isLoggedIn && <LogoutButton getLinkClass={getLinkClass} />}
        </div>
      </div>
    </div>
  );
}
