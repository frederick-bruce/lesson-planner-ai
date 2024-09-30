import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <span className="font-bold text-xl">Lesson Plan AI</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/about"
                className="text-sm font-medium hover:underline"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/plans"
                className="text-sm font-medium hover:underline"
              >
                Plans
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium hover:underline"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:underline"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
export default Header;
