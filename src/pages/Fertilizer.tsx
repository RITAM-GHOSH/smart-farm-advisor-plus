
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FertilizerForm from "@/components/fertilizer/FertilizerForm";
import FertilizerResults from "@/components/fertilizer/FertilizerResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FlaskConical, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Fertilizer = () => {
  const [resultData, setResultData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("input");
  
  const handleFormSubmit = (data: any) => {
    // In a real application, this would call an API to get recommendations
    console.log("Form data submitted:", data);
    setResultData(data);
    setActiveTab("results");
    toast.success("Fertilizer recommendations generated successfully");
  };

  // Update tab when resultData changes
  useEffect(() => {
    if (resultData && activeTab === "input") {
      setActiveTab("results");
    }
  }, [resultData]);

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
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <FlaskConical size={20} className="text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Fertilizer Recommendation</h1>
                <p className="text-muted-foreground">
                  Get personalized fertilizer advice for optimal crop nutrition
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full max-w-md mx-auto">
                <TabsTrigger value="input" className="flex-1">Input Parameters</TabsTrigger>
                <TabsTrigger 
                  value="results" 
                  className="flex-1"
                  disabled={!resultData}
                >
                  View Recommendations
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="input" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="farm-card p-4 border rounded-lg bg-background shadow-sm">
                      <div className="w-10 h-10 bg-purple-500 rounded-full mb-3 flex items-center justify-center text-white">
                        <span className="font-bold">N</span>
                      </div>
                      <h3 className="text-lg font-medium mb-1">Nitrogen</h3>
                      <p className="text-sm text-muted-foreground">
                        Essential for leaf growth and green vegetation
                      </p>
                    </div>
                    
                    <div className="farm-card p-4 border rounded-lg bg-background shadow-sm">
                      <div className="w-10 h-10 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-white">
                        <span className="font-bold">P</span>
                      </div>
                      <h3 className="text-lg font-medium mb-1">Phosphorus</h3>
                      <p className="text-sm text-muted-foreground">
                        Critical for root development and flowering
                      </p>
                    </div>
                    
                    <div className="farm-card p-4 border rounded-lg bg-background shadow-sm">
                      <div className="w-10 h-10 bg-red-500 rounded-full mb-3 flex items-center justify-center text-white">
                        <span className="font-bold">K</span>
                      </div>
                      <h3 className="text-lg font-medium mb-1">Potassium</h3>
                      <p className="text-sm text-muted-foreground">
                        Important for overall plant health and disease resistance
                      </p>
                    </div>
                  </div>
                  
                  <FertilizerForm onSubmit={handleFormSubmit} />
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="mt-6">
                {resultData ? (
                  <FertilizerResults results={resultData} />
                ) : (
                  <div className="text-center py-8">
                    <p>Please fill out the form to generate recommendations</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveTab("input")}
                    >
                      Go to Input Form
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fertilizer;
