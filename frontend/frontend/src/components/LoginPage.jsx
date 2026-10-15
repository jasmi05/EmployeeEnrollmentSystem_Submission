
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

export default function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  
async function submit(event) {
  event.preventDefault();
  setError("");

  if (!email.trim() || !password) {
    setError("Please enter your work email and password.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    setError("Please enter a valid email address.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.message || `Login failed (${response.status})`);
      return;
    }

    onLogin(data);
  } catch (error) {
    setError(
      "Could not connect to the server. Please check that the backend is running."
    );
  }
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101114] px-4 py-10 text-[#f1f0ed]">
      <div className="w-full max-w-[420px]">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#a5a3ad] hover:text-white"
        >
          <ArrowLeft size={16} /> Back to home
        </button>

        <div className="rounded-2xl border border-white/[0.09] bg-[#191a1f] p-6 sm:p-9">
          <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-[#7666d8]">
            <LockKeyhole size={21} />
          </div>

          <p className="text-sm text-[#a79bed]">EMPLOYEE ENROLLMENT SYSTEM</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#a5a3ad]">
            Sign in with your authorized work account to continue to the workspace.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-[#dedde4]">Work email</span>
              <div className="relative">
                <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777780]" />
                <input
                  type="email"
                  autoComplete="username"
                  className="field !pl-11"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-[#dedde4]">Password</span>
              <div className="relative">
                <LockKeyhole size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777780]" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="field !pl-11 !pr-12"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#85858f] hover:text-white"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            {error && (
              <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2.5 text-sm text-rose-300">
                {error}
              </p>
            )}

            <button type="submit" className="primary-btn w-full py-3">
              Sign in
            </button>
          </form>

          <p className="mt-6 border-t border-white/[0.08] pt-5 text-xs leading-5 text-[#85858f]">
            Access is intended for authorized HR and administration users.
            Contact your administrator if you need account assistance.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[#777780]">
          Employee Enrollment System
        </p>
      </div>
    </main>
  );
}
