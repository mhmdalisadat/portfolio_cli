"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-800 hover:bg-gray-100 focus:outline-none"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">باز کردن منو</span>
          {isMenuOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col pt-6 px-4 pb-8 overflow-y-auto text-right">
          {/* Close button */}
          <button
            onClick={closeMenu}
            className="absolute top-4 left-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label="بستن منو"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col space-y-2 mt-8">
            <button className="flex justify-between items-center py-2 text-base font-medium text-gray-700">
              <span>سرمایه‌گذاری آنلاین</span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button className="flex justify-between items-center py-2 text-base font-medium text-gray-700">
              <span>صندوق‌ها</span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button className="flex justify-between items-center py-2 text-base font-medium text-gray-700">
              <span>کارگزاری</span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button className="flex justify-between items-center py-2 text-base font-medium text-gray-700">
              <span>بیمه</span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button className="flex justify-between items-center py-2 text-base font-medium text-gray-700">
              <span>آموزش</span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <Link
              href="/network"
              className="py-2 text-base font-medium text-gray-700"
            >
              شبکه فروش ایـساتـیـس پویـا
            </Link>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-3 mt-4">
            <div className="flex">
              <Link
                href="/login"
                className="text-gray-700 pr-2 py-2 text-sm font-medium"
              >
                ورود
              </Link>
              <span className="text-gray-500 px-1 self-center">/</span>
              <Link
                href="/register"
                className="text-gray-700 px-2 py-2 text-sm font-medium"
              >
                ثبت‌نام
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
