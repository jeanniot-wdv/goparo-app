import Link from "next/link";
import { Wrench, FileText, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary mr-2" />
              <span className="font-bold text-xl text-primary">GoParo</span>
            </div>
            <p className="text-sm text-gray-600">
              La solution tout-en-un pour moderniser la gestion de votre garage automobile.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4">Produit</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-sm text-gray-600 hover:text-primary">Fonctionnalités</Link></li>
              <li><Link href="#pricing" className="text-sm text-gray-600 hover:text-primary">Tarifs</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-primary">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-primary">CGU</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-primary">Politique de confidentialité</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-primary">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GoParo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
