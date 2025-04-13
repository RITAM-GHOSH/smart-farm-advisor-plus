import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CropForm from "@/components/crop-prediction/CropForm";
import CropResults from "@/components/crop-prediction/CropResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";

const CropPrediction = () => {
  const [predictionData, setPredictionData] = useState<any>(null);
  
  const handleFormSubmit = (data: any) => {
    // In a real application, this would call an API to get predictions
    console.log("Form data submitted:", data);
    setPredictionData(data);
  };

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
              <div className="w-10 h-10 rounded-full bg-farm-sprout/20 flex items-center justify-center mr-3">
                <Sprout size={20} className="text-farm-sprout" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Crop Prediction</h1>
                <p className="text-muted-foreground">
                  Get personalized crop recommendations based on your land conditions
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <Tabs defaultValue="input" className="w-full">
              <TabsList className="w-full max-w-md mx-auto">
                <TabsTrigger value="input" className="flex-1">Input Parameters</TabsTrigger>
                <TabsTrigger 
                  value="results" 
                  className="flex-1"
                  disabled={!predictionData}
                >
                  View Results
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="input" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="farm-card">
                      <div className="w-10 h-10 bg-farm-soil rounded-full mb-3 flex items-center justify-center text-white">
                        <span className="font-bold">N</span>
                      </div>
                      <h3 className="text-lg font-medium mb-1">Soil Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Input your soil parameters including NPK values and pH level
                      </p>
                    </div>
                    
                    <div className="farm-card">
                      <div className="w-10 h-10 bg-farm-sky rounded-full mb-3 flex items-center justify-center text-white">
                        <span className="font-bold">W</span>
                      </div>
                      <h3 className="text-lg font-medium mb-1">Weather Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Include temperature, humidity and rainfall expectations
                      </p>
                    </div>
                    
                    <div className="farm-card">
                      <div className="w-10 h-10 bg-farm-wheat rounded-full mb-3 flex items-center justify-center">
                        <span className="font-bold">L</span>
                      </div>
                      <h3 className="text-lg font-medium mb-1">Location Details</h3>
                      <p className="text-sm text-muted-foreground">
                        Specify your farming region and the current season
                      </p>
                    </div>
                  </div>
                  
                  <CropForm onSubmit={handleFormSubmit} />
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="mt-6">
                {predictionData && <CropResults results={predictionData} />}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CropPrediction;
