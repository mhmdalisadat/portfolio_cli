import * as React from "react";
import { Suspense } from "react";
import ContactUI from "./contact/contact-ui";
import ErrorBoundary from "./error-boundary";

export default function Contact() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
          </div>
        }
      >
        <ContactUI />
      </Suspense>
    </ErrorBoundary>
  );
}
