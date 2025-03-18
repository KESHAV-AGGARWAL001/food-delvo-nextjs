import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";


export const metadata = {
  title: "Food Delvo - Food Delivery Service",
  description: "Order your favorite food online with Food Delvo",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className="hydrated" >
      <body
        data-new-gr-c-s-check-loaded="14.1096.0"
        data-gr-ext-installed=""
      >
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <main className="main-content">
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
