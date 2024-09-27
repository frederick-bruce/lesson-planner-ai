import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2023 Lesson Plan AI. All rights reserved.
          </p>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
