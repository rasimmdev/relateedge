import AuthQuoteSlider from "@/components/AuthQuoteSlider";
import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-linear-to-b from-indigo-50 to-white">
      <div className="relative hidden h-screen w-1/2 shrink-0 p-8 lg:block">
        <div className="relative h-full overflow-hidden rounded-4xl shadow-md">
          <Image
            src="/images/auth_bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-indigo-950/90 via-indigo-950/55 to-indigo-900/25"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-end p-10 pb-14 md:p-12 md:pb-16">
            <AuthQuoteSlider />
          </div>
        </div>
      </div>

      <div className="flex h-full w-full flex-1 flex-col justify-center overflow-y-auto px-6 py-8 sm:px-10 lg:w-1/2 lg:px-16">
        {children}
      </div>
    </div>
  );
}
