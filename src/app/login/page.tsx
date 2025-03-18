"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import "./page.css";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(email, password);
      await login(email, password);
      toast.success("Successfully logged in!");
      router.push(redirect);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2 className="login-title">Sign in to your account</h2>
            <p className="login-subtitle">
              Or{" "}
              <Link href="/register" className="register-link">
                create a new account
              </Link>
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={"password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me-container">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="remember-checkbox"
                />
                <label htmlFor="remember-me" className="remember-label">
                  Remember me
                </label>
              </div>

              <Link href="/forgot-password" className="forgot-password">
                Forgot your password?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="login-button">
              {loading ? <div className="spinner"></div> : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
