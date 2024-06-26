import Image from "next/image";
import Header from "@/components/header";

const Homepage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-between p-24 overflow-hidden">
        <div className="relative flex place-items-center">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
      </main>
    </div>
  );
}

export default Homepage;
