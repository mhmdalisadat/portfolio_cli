import AnimatedHeader from "../animations/animatedHeader";
import HeaderNavigation from "./header/HeaderNavigation";

const Header: React.FC = () => {
  return (
    <AnimatedHeader>
      <header className="sticky top-0 z-50 py-4" dir="rtl">
        <div className="container mx-auto px-4">
          <HeaderNavigation />
        </div>
      </header>
    </AnimatedHeader>
  );
};

export default Header;
