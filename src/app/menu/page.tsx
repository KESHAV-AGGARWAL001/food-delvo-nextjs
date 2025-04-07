import { Metadata } from "next";
import Menu from "../../components/Menu";

export const metadata: Metadata = {
  title: "Menu | Food Delvo",
  description: "Explore our delicious menu items",
};

export default function MenuPage() {
  return <Menu />;
}
