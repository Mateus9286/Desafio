import { NavBar } from "@/components/NavBar";
import Weather from "@/components/Weather";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 max-w-lg `}
    >
      <NavBar />
      <Weather />
    </main>
  );
}
