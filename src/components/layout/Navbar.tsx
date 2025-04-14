
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-farm-leaf rounded-full"></div>
            </div>
            <span className="text-xl font-bold">ExpertAgri</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-white/80 transition-colors">Dashboard</Link>
            <Link to="/crop-prediction" className="hover:text-white/80 transition-colors">Crop Prediction</Link>
            <Link to="/fertilizer" className="hover:text-white/80 transition-colors">Fertilizer</Link>
            <Link to="/rainfall" className="hover:text-white/80 transition-colors">Rainfall</Link>
            <Link to="/yield" className="hover:text-white/80 transition-colors">Yield Estimation</Link>
            <Button variant="secondary" className="text-secondary-foreground">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            <Link 
              to="/" 
              className="block py-2 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/crop-prediction" 
              className="block py-2 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              onClick={toggleMenu}
            >
              Crop Prediction
            </Link>
            <Link 
              to="/fertilizer" 
              className="block py-2 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              onClick={toggleMenu}
            >
              Fertilizer
            </Link>
            <Link 
              to="/rainfall" 
              className="block py-2 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              onClick={toggleMenu}
            >
              Rainfall
            </Link>
            <Link 
              to="/yield" 
              className="block py-2 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              onClick={toggleMenu}
            >
              Yield Estimation
            </Link>
            <div className="pt-2">
              <Button variant="secondary" className="w-full text-secondary-foreground">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
