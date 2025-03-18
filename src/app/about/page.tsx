import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Food Delvo",
  description: "Learn more about Food Delvo and our mission",
};

export default function AboutPage() {
  return <About />;
}
