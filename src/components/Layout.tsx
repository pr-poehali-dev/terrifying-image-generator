
import { ReactNode } from "react";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-100">
      <header className="border-b border-gray-800/50 bg-black/60 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-red-700 to-purple-900 p-2 rounded-full transform group-hover:scale-110 transition-all duration-300">
              <Icon name="Skull" className="text-white" size={22} />
            </div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-700">
              HorrorFaces
            </h1>
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-1 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-red-500 after:to-purple-700 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  <Icon name="Home" size={18} />
                  Главная
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-1 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-red-500 after:to-purple-700 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  <Icon name="Image" size={18} />
                  Галерея
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-1 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-red-500 after:to-purple-700 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  <Icon name="HeartPulse" size={18} />
                  Страшилки
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="pb-16">{children}</main>
      <footer className="bg-black/80 backdrop-blur-md text-center py-6 text-gray-400 text-sm border-t border-gray-800/50 absolute bottom-0 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 HorrorFaces Generator. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-500 transition-colors">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
