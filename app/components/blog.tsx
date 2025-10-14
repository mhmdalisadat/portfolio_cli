import * as React from "react";
import { Suspense } from "react";
import { getBlogData } from "../services";
import BlogUI from "./blog/blog-ui";
import ErrorBoundary from "./error-boundary";

export default async function Blog() {
  const data = await getBlogData();

  console.log(data);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
          </div>
        }
      >
        <BlogUI data={data} />
      </Suspense>
    </ErrorBoundary>
  );
}
