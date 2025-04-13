
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import CropStatusCard from "@/components/dashboard/CropStatusCard";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import FarmStats from "@/components/dashboard/FarmStats";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{greeting}, Farmer</h1>
                <p className="text-muted-foreground">
                  Here's your farming overview for today
                </p>
              </div>
              <div className="hidden md:flex space-x-4">
                <Button variant="outline">Update Farm Data</Button>
                <Button>View Alerts</Button>
              </div>
            </div>
            
            <FarmStats />
          </div>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <CropStatusCard />
            </div>
            <div>
              <WeatherWidget />
            </div>
            <div>
              <RecommendationCard />
            </div>
            <div className="lg:col-span-2">
              <div className="farm-card">
                <h3 className="text-lg font-medium mb-4">Farm Analytics</h3>
                <div className="h-48 bg-muted/30 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Analytics visualization goes here</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-semibold">12</div>
                    <div className="text-sm text-muted-foreground">Fields Monitored</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">85%</div>
                    <div className="text-sm text-muted-foreground">Resource Efficiency</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">3</div>
                    <div className="text-sm text-muted-foreground">Active Crops</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">32</div>
                    <div className="text-sm text-muted-foreground">Days to Harvest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Access Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Access to Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/crop-prediction" className="farm-card hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-farm-sprout/20 flex items-center justify-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-farm-sprout"></div>
                </div>
                <h3 className="text-lg font-medium mb-1">Crop Prediction</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Find the best crops for your land
                </p>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  <span>Predict Crops</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
              
              <Link to="/fertilizer" className="farm-card hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                </div>
                <h3 className="text-lg font-medium mb-1">Fertilizer Guide</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Get optimal fertilizer recommendations
                </p>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  <span>Get Recommendations</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
              
              <Link to="/rainfall" className="farm-card hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-farm-water/20 flex items-center justify-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-farm-water"></div>
                </div>
                <h3 className="text-lg font-medium mb-1">Rainfall Forecast</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  View detailed precipitation predictions
                </p>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  <span>Check Forecast</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
              
              <Link to="/yield" className="farm-card hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-farm-wheat/20 flex items-center justify-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-farm-wheat"></div>
                </div>
                <h3 className="text-lg font-medium mb-1">Yield Estimator</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Predict your harvest output
                </p>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  <span>Estimate Yield</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
