"use client";
import Image from "next/image";
import { Toaster, toast } from "headless-toast";
import { toastSystem } from "@/app/hooks";

export default function Home() {
  const handleToast = () => {
    const randomNumber = Math.round(Math.random() * 10000);

    toast({
      element: (
        <div className="w-[520px] h-[50px] bg-rose-400 text-white p-3 box-border">
          This is a div {randomNumber}
        </div>
      ),
    });
  };
  const handleToast1 = () => {
    const randomNumber = Math.round(Math.random() * 10000);

    toast({
      element: (
        <div className="w-[220px] h-[80px] bg-blue-400 text-white p-3 box-border">
          This is a box {randomNumber}
        </div>
      ),
    });
  };

  const handleToast2 = () => {
    toastSystem.success("Log in successful!");
  };

  const handleToast3 = () => {
    toastSystem.error("Unexpected error!");
  };
  const handleToast4 = () => {
    toastSystem.info("Some information!");
  };
  const handleToast5 = () => {
    toastSystem.loading("Loading...");
  };

  const handleToast6 = () => {
    toastSystem.promise(
      new Promise((resolve, reject) => setTimeout(reject, 3000)),
      {
        loading: "Loading...",
        success: "Success!",
        error: "Error!",
      }
    );
  };

  return (
    <section>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                src/app/page.tsx
              </code>
              .
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <p
              className="rounded-full cursor-pointer border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              rel="noopener noreferrer"
              onClick={handleToast}
            >
              Test Toast
            </p>
            <p
              className="rounded-full cursor-pointer border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              rel="noopener noreferrer"
              onClick={handleToast1}
            >
              Test Toast 1
            </p>
            <p
              className="rounded-full cursor-pointer border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              rel="noopener noreferrer"
              onClick={handleToast2}
            >
              Success Toast
            </p>
            <p
              className="rounded-full cursor-pointer border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              rel="noopener noreferrer"
              onClick={handleToast3}
            >
              Error Toast
            </p>
            <p
              className="rounded-full cursor-pointer border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              rel="noopener noreferrer"
              onClick={handleToast4}
            >
              Info Toast
            </p>
            <p
              className="rounded-full cursor-pointer border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              rel="noopener noreferrer"
              onClick={handleToast5}
            >
              Loading Toast
            </p>
            <p
              className="rounded-full cursor-pointer border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              rel="noopener noreferrer"
              onClick={handleToast6}
            >
              Promise Toast
            </p>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </section>
  );
}
