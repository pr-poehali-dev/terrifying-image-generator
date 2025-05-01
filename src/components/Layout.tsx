
import { ReactNode } from "react";
import Icon from "@/components/ui/icon";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Skull" className="text-red-600" size={24} />
            <h1 className="text-xl font-bold text-white">HorrorFaces</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <a href="/" className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-1">
                  <Icon name="Home" size={18} />
                  Главная
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-1">
                  <Icon name="Image" size={18} />
                  Галерея
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-black/50 backdrop-blur-sm text-center py-4 text-gray-400 text-sm border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p>© 2025 HorrorFaces Generator. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
