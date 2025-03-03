import { title } from "process";
import Navigation from "./components/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Next Movies",
    default: "Next Movies", // meta 데이터를 지정하지 않는 페이지에 경우 표시되는 기본 타이틀
  },
  description: "The best movies on the best framework",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
