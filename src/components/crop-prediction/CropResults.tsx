
import { Sprout, Droplets, ThermometerSun, Leaf, Award, ArrowRight, FileText, Book, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface CropResultsProps {
  results: any;
}

const CropResults = ({ results }: CropResultsProps) => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Expanded crop database with more varieties
  const recommendedCrops = [
    {
      name: "Wheat",
      confidence: 92,
      icon: "🌾",
      details: {
        waterNeeds: "Medium",
        growthPeriod: "110-130 days",
        soilCompat: "High",
        yieldPotential: "3.5-4.2 tons/ha"
      }
    },
    {
      name: "Barley",
      confidence: 84,
      icon: "🌿",
      details: {
        waterNeeds: "Low-Medium",
        growthPeriod: "90-110 days",
        soilCompat: "Medium-High",
        yieldPotential: "2.8-3.5 tons/ha"
      }
    },
    {
      name: "Mustard",
      confidence: 78,
      icon: "🌱",
      details: {
        waterNeeds: "Low",
        growthPeriod: "110-140 days",
        soilCompat: "Medium",
        yieldPotential: "1.2-1.8 tons/ha"
      }
    },
    {
      name: "Rice",
      confidence: 76,
      icon: "🍚",
      details: {
        waterNeeds: "High",
        growthPeriod: "90-150 days",
        soilCompat: "Medium",
        yieldPotential: "4.0-6.0 tons/ha"
      }
    },
    {
      name: "Corn (Maize)",
      confidence: 75,
      icon: "🌽",
      details: {
        waterNeeds: "Medium-High",
        growthPeriod: "80-120 days",
        soilCompat: "High",
        yieldPotential: "8.0-12.0 tons/ha"
      }
    },
    {
      name: "Soybeans",
      confidence: 74,
      icon: "🫘",
      details: {
        waterNeeds: "Medium",
        growthPeriod: "100-140 days",
        soilCompat: "Medium-High",
        yieldPotential: "2.5-3.5 tons/ha"
      }
    },
    {
      name: "Cotton",
      confidence: 72,
      icon: "🧵",
      details: {
        waterNeeds: "Medium",
        growthPeriod: "150-180 days",
        soilCompat: "Medium",
        yieldPotential: "0.8-1.2 tons/ha"
      }
    },
    {
      name: "Sugarcane",
      confidence: 68,
      icon: "🍬",
      details: {
        waterNeeds: "High",
        growthPeriod: "270-365 days",
        soilCompat: "Medium-High",
        yieldPotential: "70-100 tons/ha"
      }
    },
    {
      name: "Potatoes",
      confidence: 65,
      icon: "🥔",
      details: {
        waterNeeds: "Medium-High",
        growthPeriod: "90-120 days",
        soilCompat: "Medium",
        yieldPotential: "25-35 tons/ha"
      }
    },
    {
      name: "Tomatoes",
      confidence: 62,
      icon: "🍅",
      details: {
        waterNeeds: "Medium",
        growthPeriod: "70-90 days",
        soilCompat: "Medium",
        yieldPotential: "80-120 tons/ha"
      }
    },
    {
      name: "Chickpeas",
      confidence: 58,
      icon: "🌰",
      details: {
        waterNeeds: "Low-Medium",
        growthPeriod: "100-120 days",
        soilCompat: "Medium",
        yieldPotential: "1.0-2.0 tons/ha"
      }
    },
    {
      name: "Lentils",
      confidence: 56,
      icon: "🥣",
      details: {
        waterNeeds: "Low",
        growthPeriod: "80-110 days",
        soilCompat: "Medium",
        yieldPotential: "1.2-1.8 tons/ha"
      }
    }
  ];

  // Filter recommended crops based on soil parameters
  const getDisplayedCrops = () => {
    // Determine how many crops to display based on soil parameters
    // For demo purposes, we'll show the top 3 for the initial view
    return recommendedCrops.slice(0, 3);
  };

  const handleSelectCrop = (cropName: string) => {
    setSelectedCrop(cropName);
    toast.success(`${cropName} selected as your recommended crop`);
  };

  const handleDownloadReport = () => {
    setIsDownloading(true);
    
    // Simulate report generation and download
    setTimeout(() => {
      // Create a simple report text
      const reportContent = `
        CROP RECOMMENDATION REPORT
        -------------------------
        Date: ${new Date().toLocaleDateString()}
        
        SOIL ANALYSIS
        Nitrogen: ${results.nitrogen} mg/kg
        Phosphorus: ${results.phosphorus} mg/kg
        Potassium: ${results.potassium} mg/kg
        pH: ${results.ph}
        
        ENVIRONMENTAL CONDITIONS
        Temperature: ${results.temperature}°C
        Humidity: ${results.humidity}%
        Rainfall: ${results.rainfall} mm
        Region: ${results.region}
        Season: ${results.season}
        
        RECOMMENDED CROPS
        ${recommendedCrops.slice(0, 5).map((crop, index) => `
        ${index + 1}. ${crop.name} (Confidence: ${crop.confidence}%)
           Water Needs: ${crop.details.waterNeeds}
           Growth Period: ${crop.details.growthPeriod}
           Yield Potential: ${crop.details.yieldPotential}
        `).join('')}
      `;
      
      // Create blob and download
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `crop-recommendation-report-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setIsDownloading(false);
      
      toast.success("Report downloaded successfully", {
        description: "Your crop recommendation report has been saved to your device",
        action: {
          label: "View",
          onClick: () => window.open(url, '_blank'),
        },
      });
    }, 1500);
  };

  const handleAdjustParameters = () => {
    toast("Returning to input parameters", {
      description: "Adjust your inputs to get different recommendations",
    });
  };

  const handleGetPlantingGuide = () => {
    if (!selectedCrop) {
      toast.error("Please select a crop first", {
        description: "Select one of the recommended crops to get a planting guide",
      });
      return;
    }
    
    setIsGeneratingGuide(true);
    
    // Simulate guide generation
    setTimeout(() => {
      setIsGeneratingGuide(false);
      
      const cropData = recommendedCrops.find(crop => crop.name === selectedCrop);
      
      // Create and display the guide
      const guideContent = `
        PLANTING GUIDE FOR ${selectedCrop.toUpperCase()}
        ------------------------------
        
        SOIL PREPARATION
        - Till soil to a depth of 15-20cm
        - Add organic matter for improved water retention
        - Test soil pH and adjust if necessary (ideal: ${results.ph})
        
        PLANTING SCHEDULE
        - Best planting time: ${results.season === 'winter' ? 'Late October to early November' : 'Early spring after frost'}
        - Row spacing: 20-25cm
        - Plant depth: 2-4cm
        
        WATER REQUIREMENTS
        - ${cropData?.details.waterNeeds} water needs
        - Critical watering periods: Early establishment and grain filling
        
        NUTRIENT MANAGEMENT
        - Nitrogen: ${results.nitrogen < 40 ? 'Apply additional nitrogen fertilizer' : 'Current levels adequate'}
        - Phosphorus: ${results.phosphorus < 30 ? 'Add phosphate fertilizer before planting' : 'Current levels adequate'}
        - Potassium: ${results.potassium < 30 ? 'Apply potassium fertilizer' : 'Current levels adequate'}
        
        GROWTH TIMELINE
        - Germination: 7-10 days
        - Vegetative stage: ${cropData?.details.growthPeriod.split('-')[0]} days
        - Maturity: ${cropData?.details.growthPeriod}
        
        EXPECTED YIELD
        - Under optimal conditions: ${cropData?.details.yieldPotential}
      `;
      
      // Display the guide in a toast notification
      toast.success("Planting guide generated", {
        description: `Your personalized planting guide for ${selectedCrop} is ready.`,
        action: {
          label: "View Guide",
          onClick: () => {
            // Create a downloadable version for the full guide
            const blob = new Blob([guideContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          },
        },
        duration: 5000,
      });
    }, 2000);
  };

  // Get the top three recommended crops for the main display
  const displayedCrops = getDisplayedCrops();

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Award className="mr-2 text-farm-wheat" size={20} />
        Recommended Crops for Your Land
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayedCrops.map((crop, index) => (
          <Card 
            key={index} 
            className={`
              ${index === 0 ? "border-primary border-2" : ""} 
              transition-all duration-200 hover:shadow-md 
              ${selectedCrop === crop.name ? "ring-2 ring-primary bg-primary/5" : ""}
              hover:scale-[1.02] cursor-pointer
            `}
            onClick={() => handleSelectCrop(crop.name)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>{crop.name}</span>
                <span className="text-3xl">{crop.icon}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-1">Confidence Score</div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${crop.confidence}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm font-medium mt-1">{crop.confidence}%</div>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center">
                  <Droplets size={16} className="mr-2 text-farm-water" />
                  <span className="text-sm">Water Needs: {crop.details.waterNeeds}</span>
                </div>
                <div className="flex items-center">
                  <Sprout size={16} className="mr-2 text-farm-sprout" />
                  <span className="text-sm">Growth Period: {crop.details.growthPeriod}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-farm-soil rounded-full mr-2"></div>
                  <span className="text-sm">Soil Compatibility: {crop.details.soilCompat}</span>
                </div>
                <div className="flex items-center">
                  <Leaf size={16} className="mr-2 text-farm-leaf" />
                  <span className="text-sm">Yield Potential: {crop.details.yieldPotential}</span>
                </div>
              </div>
              
              <Button 
                className={`w-full mt-4 ${selectedCrop === crop.name ? "bg-primary" : "bg-primary/80"}`} 
                size="sm"
                variant={selectedCrop === crop.name ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCrop(crop.name);
                }}
              >
                {selectedCrop === crop.name ? "Selected" : "Select This Crop"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Show more crops section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Additional Recommended Crops</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {recommendedCrops.slice(3).map((crop, index) => (
            <Card 
              key={index}
              className={`transition-all duration-200 hover:shadow-md 
                ${selectedCrop === crop.name ? "ring-2 ring-primary bg-primary/5" : ""}
                hover:scale-[1.02] cursor-pointer
              `}
              onClick={() => handleSelectCrop(crop.name)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl">{crop.icon}</span>
                  <span className="text-sm font-medium text-right">{crop.confidence}%</span>
                </div>
                <h4 className="font-medium text-sm mb-2">{crop.name}</h4>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Droplets size={12} className="mr-1 text-farm-water" />
                    <span>{crop.details.waterNeeds}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Leaf size={12} className="mr-1 text-farm-leaf" />
                    <span>{crop.details.yieldPotential}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Key Factors in Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries({
              nitrogen: "The nitrogen levels in your soil are optimal for cereal crops like wheat and barley.",
              phosphorus: "Current phosphorus levels support robust root development in grain crops.",
              ph: "Your soil pH (6.5) is ideal for most crops, particularly grains and legumes.",
              rainfall: "The expected rainfall pattern matches well with wheat's water requirements."
            }).map(([factor, description], index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  {factor === "nitrogen" && <div className="font-bold text-primary">N</div>}
                  {factor === "phosphorus" && <div className="font-bold text-primary">P</div>}
                  {factor === "ph" && <div className="font-bold text-primary">pH</div>}
                  {factor === "rainfall" && <Droplets size={18} className="text-farm-water" />}
                </div>
                <div>
                  <h4 className="text-sm font-medium capitalize">{factor}</h4>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Next Steps</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Based on these recommendations, you can now plan your planting schedule. 
              {selectedCrop ? ` For ${selectedCrop}, the ideal planting window would be in the next 2-3 weeks to maximize yield potential.` : " Select a crop above to get specific planting guidance."}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadReport}
                disabled={isDownloading}
                className="flex items-center"
              >
                {isDownloading ? (
                  <>Downloading...</>
                ) : (
                  <>
                    <Download size={16} className="mr-1" />
                    Download Report
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAdjustParameters}
                className="flex items-center"
              >
                <ArrowRight size={16} className="mr-1" />
                Adjust Parameters
              </Button>
              <Button 
                size="sm" 
                onClick={handleGetPlantingGuide}
                disabled={!selectedCrop || isGeneratingGuide}
                className="flex items-center"
              >
                {isGeneratingGuide ? (
                  <>Generating Guide...</>
                ) : (
                  <>
                    <Book size={16} className="mr-1" />
                    Get Planting Guide
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropResults;
