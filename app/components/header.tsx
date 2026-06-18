import { buildSearchIndex } from "@/app/lib/search";
import AnimatedHeader from "../animations/animatedHeader";
import HeaderNavigation from "./header/HeaderNavigation";
import SearchProvider from "./search/SearchProvider";

const Header: React.FC = () => {
  const searchIndex = buildSearchIndex();

  return (
    <AnimatedHeader>
      <SearchProvider index={searchIndex}>
        <header className="sticky top-0 z-50 py-4" dir="rtl">
          <div className="container mx-auto px-4">
            <HeaderNavigation />
          </div>
        </header>
      </SearchProvider>
    </AnimatedHeader>
  );
};

export default Header;
