import Link from "next/link";
import { X } from "lucide-react";
import LoginForm from "../../shared/authForm/login-form";

const Login = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative w-11/12 max-w-md space-y-6 rounded-lg border p-8 shadow-lg">

        {/* Close Icon INSIDE Card */}
        <Link
          href="/"
          className="absolute right-4 top-4 text-gray-500 hover:text-black transition"
        >
          <X size={22} />
        </Link>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        <LoginForm redirect={params.redirect} />
      </div>
    </div>
  );
};

export default Login;
