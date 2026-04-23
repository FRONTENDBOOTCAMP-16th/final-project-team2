import Image from "next/image";
import Header from "./components/layout/header/navi";
import Footer from "./components/layout/footer/footer-section";
import Main from "./components/layout/main/main-list";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify- bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <Main /> 
      <Footer />
    </div>
  );
}
