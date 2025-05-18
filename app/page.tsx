import NavBar from "./navBar/page";

export default function BannerPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-grow pt-16 px-4">
        
        <div className="max-w-screen-xl mx-auto py-10">
          <h1 className="text-3xl font-bold text-gray-800 text-right mb-4 font-modam">
            سرمایه‌گذاری هوشمند برای آینده‌ای بهتر
          </h1>
          <p className="text-gray-600 text-right mb-6 font-modam">
            با بتیس، رشد سرمایه خود را تضمین کنید
          </p>
        </div>
      </main>
    </div>
  );
}
