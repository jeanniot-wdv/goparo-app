"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { UserMenu } from "@/components/admin/UserMenu";

export default function Header() {
  const { user, loading } = useUser();

  return (
    <header className="shadow-md bg-white rounded-b-3xl sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 px-8">
        {/* Left side */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <img src="images/logo.svg" alt="Goparo Logo" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-violet-600">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="hover:text-violet-600">
              Tarifs
            </Link>
            <Link href="#testimonial" className="hover:text-violet-600">
              Témoignages
            </Link>
            <Link href="#faq" className="hover:text-violet-600">
              FAQ
            </Link>
            <Link href="#contact" className="hover:text-violet-600">
              Contact
            </Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login">
                <Button variant="outline" className="font-medium">
                  Se connecter
                </Button>
              </Link>

              <Link href="/register">
                <Button className="font-medium">
                  Essayer gratuitement
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard">
                <Button className="font-medium">Dashboard</Button>
              </Link>

              <UserMenu user={user} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
