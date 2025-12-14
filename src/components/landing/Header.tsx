"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { UserMenu } from "@/components/admin/UserMenu";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="shadow-md bg-white rounded-b-3xl sticky top-0 z-[9999]">
      <div className="flex items-center justify-between py-4 px-6 md:px-8">
        {/* LEFT — Logo + Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Goparo Logo"
              width={110}
              height={35}
              className="h-8"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <Link href="#features" className="hover:text-violet-600">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="hover:text-violet-600">
              Tarifs
            </Link>
            <Link href="#faq" className="hover:text-violet-600">
              FAQ
            </Link>
            <Link href="#contact" className="hover:text-violet-600">
              Contact
            </Link>
          </nav>
        </div>

        {/* RIGHT — Desktop buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-base">
                  Se connecter
                </Button>
              </Link>

              <Link href="/register">
                <Button className="text-base">Essayer gratuitement</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" target="_blank" rel="noopener noreferrer">
                <Button className="text-base">Tableau de bord</Button>
              </Link>

              <UserMenu user={user} />
            </div>
          )}
        </div>

        {/* RIGHT — Mobile: User + Burger */}
        <div className="flex md:hidden items-center gap-3">
          {user && <UserMenu user={user} />}

          {/* Burger */}
          <button onClick={() => setOpen(true)}>
            <Menu className="w-7 h-7 text-gray-800" />
          </button>
        </div>
      </div>

      {/* SIDEBAR MOBILE */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* SIDEBAR */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-70 px-6 py-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold">Menu</h3>
                <button onClick={() => setOpen(false)}>
                  <X className="w-7 h-7" />
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                <Link href="#features" onClick={() => setOpen(false)}>
                  Fonctionnalités
                </Link>
                <Link href="#pricing" onClick={() => setOpen(false)}>
                  Tarifs
                </Link>
                <Link href="#faq" onClick={() => setOpen(false)}>
                  FAQ
                </Link>
                <Link href="#contact" onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </nav>

              {/* FOOTER MOBILE */}
              {!user ? (
                <div className="mt-auto pt-8 flex flex-col gap-3">
                  <Link href="/login" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Se connecter
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <Button className="w-full">Essayer gratuitement</Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-auto">
                  <Link href="/admin/dashboard" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    <Button className="w-full">Tableau de bord</Button>
                  </Link>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
