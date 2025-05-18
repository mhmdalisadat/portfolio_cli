import AnimatedHeader from "./AnimatedHeader";
import HeaderNavigation from "../logic/HeaderNavigation";

export default function Header() {
  return (
    <AnimatedHeader>
      <header className="sticky top-0 z-50 py-4">
        <div className="container mx-auto px-4">
          <HeaderNavigation />
        </div>
      </header>
    </AnimatedHeader>
  );
}
