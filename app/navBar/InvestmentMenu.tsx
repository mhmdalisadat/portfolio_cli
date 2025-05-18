import Link from "next/link";
import { FC } from "react";
import "./styles/navbar.css";

interface InvestmentMenuProps {
  navbar: any;
}

const InvestmentMenu: FC<InvestmentMenuProps> = ({ navbar }) => {
  console.log(navbar);
  return (
    <div className="relative group" style={{ fontFamily: "var(--font-modam)" }}>
      {/* Button */}
      <button className="hover:text-emerald-600 transition-all duration-200 flex items-center gap-1 text-sm font-medium">
        سرمایه‌گذاری
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 transform group-hover:rotate-180 transition-transform duration-200"
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

      {/* Hover bridge */}
      <div className="absolute h-6 w-[800px] -right-20 top-6"></div>

      {/* Dropdown Panel */}
      <div className="absolute hidden group-hover:block -right-16 mt-8 z-50 w-[800px]">
        <div className="backdrop-blur-xl bg-white/95 shadow-xl rounded-xl overflow-hidden border border-gray-100 animate-fade-in-up transition-all duration-300">
          <div className="flex">
            {/* Left menu sidebar */}
            <div className="w-2/5 py-6 px-4 border-l border-gray-100 bg-gray-50">
              <ul className="space-y-2 text-right">
                <li className="px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer">
                  صندوق تضمین
                </li>
                <li className="px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer">
                  صندوق کارپس
                </li>
                <li className="px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer">
                  صندوق کمند
                </li>
                <li className="px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer">
                  سبدگردانی اختصاصی
                </li>
                <li className="px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer">
                  کارت هدیه سرمایه‌گذاری
                </li>
                <li className="px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer">
                  سایر صندوق‌های سرمایه‌گذاری
                </li>
                <li className="px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer">
                  خرید صندوق‌ها از اپلیکیشن کاریزما
                </li>
              </ul>
            </div>

            {/* Right investment options */}
            <div className="w-3/5 p-6 bg-white">
              {/* Gold Fund */}
              <div className="mb-8 flex items-center justify-between">
                <div className="w-20 h-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-lg relative">
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 text-right px-5">
                  <h3 className="text-base font-bold mb-3">صندوق طلا کوپا</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    سرمایه‌گذاری امن در طلا با امکان کسب سود بالاتر از طلای
                    فیزیکی
                  </p>
                </div>
              </div>

              {/* Leverage Fund */}
              <div className="mb-8 flex items-center justify-between">
                <div className="w-20 h-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg relative">
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 text-right px-5">
                  <h3 className="text-base font-bold mb-3">صندوق اهرم</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    سرمایه‌گذاری در بورس با استفاده از اهرم و کسب بازدهی بیشتر
                    از شاخص
                  </p>
                </div>
              </div>

              {/* Fixed Income Fund */}
              <div className="mb-8 flex items-center justify-between">
                <div className="w-20 h-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg relative">
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 text-right px-5">
                  <h3 className="text-base font-bold mb-3">
                    صندوق درآمد ثابت کارا
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    سرمایه‌گذاری با سود روشمار و نرخ‌های جذاب، بدون مالیات
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentMenu;
