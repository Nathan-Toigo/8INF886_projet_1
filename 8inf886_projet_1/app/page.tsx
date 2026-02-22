import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-gold">
      <Image
        src="/fortnite2.png"
        alt="Fortnite 2 logo"
        width={600}
        height={20}
        priority
      />
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-gold">
        Welcome to Fortnite 2 Download
        </h1>
        <p className="max-w-md text-lg leading-8 text-white">
        Ready to jump into the action? Download Fortnite 2 now and join the battle!
        </p>
      </div>
      <div className="flex flex-col gap-4 text-base font-medium">
        <a
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-500 px-5 text-white transition-colors hover:bg-green-600 md:w-[158px]"
        href="/download" // Update with the actual download link
        target="_blank"
        >
        Download Now
        </a>
        <a
        className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-gold px-5 transition-colors hover:border-transparent hover:bg-gold/[.04] text-gold"
        href="/documentation" 
        target="_blank"
        >
        Documentation
        </a>
      </div>
      </main>
    </div>
  );
}
