
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Eye, TrendingUp, ArrowUpRight, Info, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const YieldEstimator = () => {
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    crop: "",
    variety: "",
    fieldSize: 5,
    plantingDate: "",
    previousYield: 3.5,
    soilQuality: 70,
    waterAvailability: 80,
    expectedTemperature: 30,
    pestRisk: 20
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.crop || !formData.variety || !formData.plantingDate) {
      toast.error("Please fill in all required fields", {
        description: "Crop type, variety, and planting date are required"
      });
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setShowResults(true);
      setIsLoading(false);
      toast.success("Yield estimation complete", {
        description: "Your crop yield analysis is ready for review"
      });
    }, 1500);
  };

  // Mock calculated yield estimation - this would come from an ML model in a real app
  const estimatedYield = 4.2; // tons per hectare
  const confidenceInterval = [3.9, 4.5]; // min and max expected yield
  const improvementPercent = 20; // percentage improvement from previous yield

  const cropOptions = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize" },
    { value: "cotton", label: "Cotton" },
    { value: "sugarcane", label: "Sugarcane" }
  ];

  const varietyOptions = {
    rice: [
      { value: "basmati", label: "Basmati" },
      { value: "jasmine", label: "Jasmine" },
      { value: "arborio", label: "Arborio" }
    ],
    wheat: [
      { value: "durum", label: "Durum" },
      { value: "emmer", label: "Emmer" },
      { value: "einkorn", label: "Einkorn" }
    ],
    maize: [
      { value: "sweetcorn", label: "Sweet Corn" },
      { value: "flint", label: "Flint Corn" },
      { value: "popcorn", label: "Popcorn" }
    ],
    cotton: [
      { value: "upland", label: "Upland Cotton" },
      { value: "pima", label: "Pima Cotton" }
    ],
    sugarcane: [
      { value: "chewing", label: "Chewing Cane" },
      { value: "crystal", label: "Crystal Cane" }
    ]
  };

  const getVarieties = () => {
    if (!formData.crop) return [];
    return varietyOptions[formData.crop as keyof typeof varietyOptions] || [];
  };

  const handleResetForm = () => {
    if (showResults) {
      setShowResults(false);
      toast("Form reset", {
        description: "You can make changes to your inputs"
      });
    }
  };

  const handleDownloadReport = () => {
    toast.success("Report downloaded successfully", {
      action: {
        label: "View",
        onClick: () => console.log("View report clicked"),
      },
    });
  };

  const handleOptimizeYield = () => {
    toast.success("Optimization suggestions generated", {
      description: "We've analyzed your data and prepared recommendations to maximize your yield",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <BarChart3 size={24} className="text-farm-wheat" />
        <h2 className="text-xl font-semibold">Crop Yield Estimator</h2>
      </div>

      {!showResults && (
        <Alert className="bg-farm-wheat/10 border-farm-wheat/20">
          <Info className="h-4 w-4 text-farm-wheat" />
          <AlertDescription>
            Complete the form below with accurate data to get the most precise yield estimation.
            Required fields are marked with an asterisk (*).
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="data-input">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="crop" className="flex items-center">
                    Crop Type <span className="text-destructive ml-1">*</span>
                  </Label>
                  <Select 
                    value={formData.crop} 
                    onValueChange={(value) => {
                      handleChange("crop", value);
                      handleChange("variety", "");
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map((crop) => (
                        <SelectItem key={crop.value} value={crop.value}>
                          {crop.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="variety" className="flex items-center">
                    Variety <span className="text-destructive ml-1">*</span>
                  </Label>
                  <Select 
                    value={formData.variety} 
                    onValueChange={(value) => handleChange("variety", value)}
                    disabled={!formData.crop}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={formData.crop ? "Select variety" : "Select crop first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {getVarieties().map((variety) => (
                        <SelectItem key={variety.value} value={variety.value}>
                          {variety.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fieldSize">Field Size (hectares)</Label>
                  <div className="flex items-center mt-1">
                    <Slider 
                      id="fieldSize"
                      value={[formData.fieldSize]} 
                      min={0.5} 
                      max={50} 
                      step={0.5}
                      className="flex-1 mr-4"
                      onValueChange={(value) => handleSliderChange("fieldSize", value)} 
                    />
                    <Input 
                      type="number" 
                      value={formData.fieldSize} 
                      onChange={(e) => handleChange("fieldSize", parseFloat(e.target.value))}
                      className="w-20"
                      min={0.5}
                      max={50}
                      step={0.5}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="plantingDate" className="flex items-center">
                    Planting Date <span className="text-destructive ml-1">*</span>
                  </Label>
                  <Input 
                    id="plantingDate"
                    type="date" 
                    value={formData.plantingDate} 
                    onChange={(e) => handleChange("plantingDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="previousYield">Previous Yield (tons/hectare)</Label>
                <div className="flex items-center mt-1">
                  <Slider 
                    id="previousYield"
                    value={[formData.previousYield]} 
                    min={0} 
                    max={10} 
                    step={0.1}
                    className="flex-1 mr-4"
                    onValueChange={(value) => handleSliderChange("previousYield", value)} 
                  />
                  <Input 
                    type="number" 
                    value={formData.previousYield} 
                    onChange={(e) => handleChange("previousYield", parseFloat(e.target.value))}
                    className="w-20"
                    min={0}
                    max={10}
                    step={0.1}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Environmental Factors</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="soilQuality">Soil Quality</Label>
                      <span className="text-sm">{formData.soilQuality}%</span>
                    </div>
                    <Slider 
                      id="soilQuality"
                      value={[formData.soilQuality]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => handleSliderChange("soilQuality", value)} 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="waterAvailability">Water Availability</Label>
                      <span className="text-sm">{formData.waterAvailability}%</span>
                    </div>
                    <Slider 
                      id="waterAvailability"
                      value={[formData.waterAvailability]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => handleSliderChange("waterAvailability", value)} 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="expectedTemperature">Expected Average Temperature</Label>
                      <span className="text-sm">{formData.expectedTemperature}°C</span>
                    </div>
                    <Slider 
                      id="expectedTemperature"
                      value={[formData.expectedTemperature]} 
                      min={10} 
                      max={45} 
                      step={1}
                      onValueChange={(value) => handleSliderChange("expectedTemperature", value)} 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="pestRisk">Pest/Disease Risk</Label>
                      <span className="text-sm">{formData.pestRisk}%</span>
                    </div>
                    <Slider 
                      id="pestRisk"
                      value={[formData.pestRisk]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => handleSliderChange("pestRisk", value)} 
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Calculating..." : "Calculate Estimated Yield"}
                </Button>
                {showResults && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleResetForm}
                  >
                    Edit Inputs
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div>
          {!showResults ? (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="pt-6 text-center">
                <Eye size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Yield Estimation</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form to get an estimate of your expected crop yield based on your inputs and our predictive model.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <TrendingUp size={36} className="mx-auto text-primary mb-2" />
                  <h3 className="text-lg font-medium">Estimated Yield</h3>
                  <div className="text-4xl font-bold mt-2">{estimatedYield} t/ha</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Range: {confidenceInterval[0]} - {confidenceInterval[1]} t/ha
                  </div>
                  <div className="flex items-center justify-center mt-2 text-sm text-green-600">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span>{improvementPercent}% from previous yield</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Key Factors Influencing Yield</div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1 mr-2"></div>
                        <span>Good soil quality (+15% yield impact)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1 mr-2"></div>
                        <span>Optimal planting date (+10% yield impact)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mt-1 mr-2"></div>
                        <span>High temperature (–5% yield impact)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1 mr-2"></div>
                        <span>Low pest risk (+8% yield impact)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium mb-2">Total Production Estimate</div>
                    <div className="text-2xl font-bold">{(estimatedYield * formData.fieldSize).toFixed(1)} tons</div>
                    <div className="text-sm text-muted-foreground">
                      Based on {formData.fieldSize} hectares field size
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium mb-2">Recommendation</div>
                    <p className="text-sm">
                      To maximize your yield potential, consider applying adequate nitrogen 
                      fertilizer (120 kg/ha) and maintain optimal irrigation throughout the growing season.
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" className="flex-1" onClick={handleDownloadReport}>
                      Download Report
                    </Button>
                    <Button className="flex-1" onClick={handleOptimizeYield}>
                      Optimize Yield
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default YieldEstimator;
