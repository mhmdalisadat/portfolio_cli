import Link from "next/link";
import { FC } from "react";
import InvestmentMenu from "./InvestmentMenu";
import "./styles/navbar.css";
import { getSupProducts } from "../company/services/company";

const NavBar: FC = async () => {
  const navbar = await getSupProducts();
  console.log(navbar);
  return (
    <nav className="w-[95%] rounded-3xl mt-4 mx-auto flex items-center justify-between bg-white py-4 px-6 font-sans fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-gray-100">
      <div className="w-1/4"></div>
      <div className="flex gap-4 justify-center flex-1 ئف">
        <InvestmentMenu navbar={navbar} />
      </div>
      <div className="w-1/4 flex justify-end">
        <span className="text-xl font-bold text-blue-600">{navbar.logo}</span>
      </div>
    </nav>
  );
};

export default NavBar;
