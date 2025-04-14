
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (email: string) => {
    return email ? email.slice(0, 2).toUpperCase() : "U";
  };

  const authButton = user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-10 w-10 rounded-full p-0">
          <Avatar>
            <AvatarFallback>{getInitials(user.email || "")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <UserRound className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button 
      variant="secondary" 
      className="text-secondary-foreground"
      onClick={() => navigate("/auth")}
    >
      Sign In
    </Button>
  );

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
            {authButton}
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
            {user && (
              <Link 
                to="/profile" 
                className="block py-2 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Profile
              </Link>
            )}
            <div className="pt-2">
              {user ? (
                <Button 
                  variant="secondary" 
                  className="w-full text-secondary-foreground"
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button 
                  variant="secondary" 
                  className="w-full text-secondary-foreground"
                  onClick={() => {
                    navigate("/auth");
                    toggleMenu();
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
