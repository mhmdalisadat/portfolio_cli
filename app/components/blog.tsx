import { Globe } from "lucide-react";
import Image from "next/image";

const Blog = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 " />

      <div className="relative z-10 p-6 md:p-10 flex flex-col justify-center min-h-screen text-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 auto-rows-auto">
            {/* Card Component Example - You can reuse this pattern */}
            <div className="bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col gap-3">
              <Image
                src="/profile.jpg" // ⬅ جایگزین کن با عکس مربوط به این کارت
                alt="Profile"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-32"
              />
              <h1 className="text-xl font-bold">All Sedat</h1>
              <p className="text-gray-300 text-sm">
                I'm a 23-year-old front-end developer from Iran, with 4 years of
                experience crafting user-friendly and dynamic web interfaces.
              </p>
            </div>

            <div className="bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col gap-3">
              <Image
                src="/tech.jpg"
                alt="Tech Stack"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-32"
              />
              <h2 className="text-lg font-semibold">Modern Tech Stack</h2>
              <p className="text-gray-300 text-sm">
                Working with modern tools and frameworks to build fast, scalable
                applications.
              </p>
            </div>

            <div className="bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-3 text-center">
              <Globe className="w-10 h-10 text-blue-400" />
              <h2 className="text-lg font-semibold">Time Everywhere</h2>
              <p className="text-gray-300 text-sm">
                4 years spent working remotely across different timezones
              </p>
            </div>

            <div className="bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col gap-3">
              <Image
                src="/contact.jpg"
                alt="Contact"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-32"
              />
              <h2 className="text-lg font-semibold">Get in Touch</h2>
              <p className="text-gray-300 text-sm">
                Email: contact@example.com
              </p>
              <p className="text-gray-300 text-sm">
                Location: Remote Worldwide
              </p>
            </div>

            <div className="md:col-span-2 xl:col-span-2 bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">My Passion for Coding</h2>
              <p className="text-gray-300 text-sm">
                I love solving problems and building things through code.
                Programming isn't just my profession - it's my passion. I enjoy
                exploring new technologies and enhancing my skills.
              </p>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/bg.jpg"
                  alt="Code Example"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
