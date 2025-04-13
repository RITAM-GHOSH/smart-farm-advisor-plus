
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import YieldEstimator from "@/components/yield/YieldEstimator";
import { BarChart3, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Yield = () => {
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
              <div className="w-10 h-10 rounded-full bg-farm-wheat/20 flex items-center justify-center mr-3">
                <BarChart3 size={20} className="text-farm-wheat" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Crop Yield Estimation</h1>
                <p className="text-muted-foreground">
                  Predict your harvest output based on various parameters
                </p>
              </div>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>How It Works</AlertTitle>
            <AlertDescription>
              Our yield estimator uses machine learning models trained on thousands of historical crop data points.
              It considers crop variety, soil conditions, climate factors, and farming practices to provide 
              accurate predictions with up to 93% confidence.
            </AlertDescription>
          </Alert>
          
          <YieldEstimator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Yield;
