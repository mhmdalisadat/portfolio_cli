"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface BlogUIProps {
  data: any;
}

const BlogUI = React.memo(({ data }: BlogUIProps) => {
  const { t } = useTranslation("common");
  const [imageLoading, setImageLoading] = React.useState<
    Record<string, boolean>
  >({});

  if (!data) return null;

  const handleImageLoad = (key: string) => {
    setImageLoading((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0" />

      <div className="relative z-10 p-6 md:p-10 flex flex-col justify-center min-h-screen text-gray-400">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 auto-rows-auto">
            <div className="bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col gap-3 min-h-[520px]">
              <div className="relative w-full h-80">
                {!imageLoading["profile"] && (
                  <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
                )}
                <Image
                  src="/me.png"
                  alt="Profile"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover w-full h-80"
                  onLoad={() => handleImageLoad("profile")}
                  priority
                />
              </div>
              <h1 className="text-xl font-bold">
                {t("blog_content.profile.title")}
              </h1>
              <p className="text-gray-300 text-sm">
                {t("blog_content.profile.description")}
              </p>
            </div>

            <div className="bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col gap-3">
              <div className="relative w-full h-32">
                {!imageLoading["tech"] && (
                  <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
                )}
                <Image
                  src="/techStack.jpg"
                  alt="Tech Stack"
                  width={500}
                  height={600}
                  className="rounded-lg object-cover w-full h-32"
                  onLoad={() => handleImageLoad("tech")}
                  loading="lazy"
                />
              </div>
              <h2 className="text-lg font-semibold">
                {t("blog_content.tech.title")}
              </h2>
              <p className="text-gray-300 text-sm">
                {t("blog_content.tech.description")}
              </p>
            </div>

            <div className="bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-3 text-center">
              <Globe className="w-10 h-10 text-blue-400" />
              <h2 className="text-lg font-semibold">
                {t("blog_content.location.title")}
              </h2>
              <p className="text-gray-300 text-sm">
                {t("blog_content.location.description")}
              </p>
            </div>

            <div className="bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col gap-3 min-h-[200px]">
              <div className="relative w-full h-36">
                {!imageLoading["contact"] && (
                  <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
                )}
                <Image
                  src="/contact.jpg"
                  alt="Contact"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full h-36"
                  onLoad={() => handleImageLoad("contact")}
                  loading="lazy"
                />
              </div>
              <h2 className="text-lg font-semibold">
                {t("blog_content.contact.title")}
              </h2>
              <p className="text-gray-300 text-sm">
                {t("blog_content.contact.email")}
              </p>
              <p className="text-gray-300 text-sm">
                {t("blog_content.contact.phone")}
              </p>
      
            </div>

            <div className="md:col-span-2 xl:col-span-2 bg-gray-900/90 backdrop-blur-lg p-4 rounded-xl border border-gray-700 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">
                {t("blog_content.passion.title")}
              </h2>
              <p className="text-gray-300 text-sm">
                {t("blog_content.passion.description")}
              </p>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                {!imageLoading["passion"] && (
                  <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                )}
                <Image
                  src="/passion.jpg"
                  alt="Code Example"
                  fill
                  className="object-cover"
                  onLoad={() => handleImageLoad("passion")}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BlogUI;
