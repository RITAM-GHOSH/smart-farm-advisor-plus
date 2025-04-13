
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RainfallForecast from "@/components/rainfall/RainfallForecast";
import { CloudRain, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Rainfall = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6">
            <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-farm-water/20 flex items-center justify-center mr-3">
                <CloudRain size={20} className="text-farm-water" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Rainfall Forecast</h1>
                <p className="text-muted-foreground">
                  View detailed precipitation predictions for your region
                </p>
              </div>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              Our rainfall predictions use data from meteorological stations and satellite imagery, 
              updated every 6 hours to provide the most accurate forecasts possible.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <RainfallForecast />
            </div>
            
            <div className="space-y-6">
              <div className="farm-card">
                <h3 className="text-lg font-medium mb-4">Rainfall Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Annual Average</div>
                    <div className="text-2xl font-bold">1,284 mm</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Wettest Month</div>
                    <div className="text-2xl font-bold">July (210 mm)</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Driest Month</div>
                    <div className="text-2xl font-bold">January (45 mm)</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Rainy Days per Year</div>
                    <div className="text-2xl font-bold">105 days</div>
                  </div>
                </div>
              </div>
              
              <div className="farm-card">
                <h3 className="text-lg font-medium mb-4">Rainfall Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-farm-water/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-farm-water font-bold">1</span>
                    </div>
                    <div>
                      <div className="font-medium">Monsoon Pattern</div>
                      <p className="text-sm text-muted-foreground">
                        This region experiences a distinct monsoon pattern with heavy rainfall from June to September.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-farm-water/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-farm-water font-bold">2</span>
                    </div>
                    <div>
                      <div className="font-medium">Annual Variation</div>
                      <p className="text-sm text-muted-foreground">
                        Year-to-year rainfall can vary by up to 25%, requiring adaptive farming strategies.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-farm-water/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-farm-water font-bold">3</span>
                    </div>
                    <div>
                      <div className="font-medium">Climate Trends</div>
                      <p className="text-sm text-muted-foreground">
                        Recent years show a trend toward more extreme rainfall events with longer dry periods in between.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rainfall;
