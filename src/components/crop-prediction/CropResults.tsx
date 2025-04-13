import { Seedling, Droplets, ThermometerSun, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CropResultsProps {
  results: any;
}

const CropResults = ({ results }: CropResultsProps) => {
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
    }
  ];

  const factorsDescription = {
    nitrogen: "The nitrogen levels in your soil are optimal for cereal crops like wheat and barley.",
    phosphorus: "Current phosphorus levels support robust root development in grain crops.",
    ph: "Your soil pH (6.5) is ideal for most crops, particularly grains and legumes.",
    rainfall: "The expected rainfall pattern matches well with wheat's water requirements."
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Recommended Crops for Your Land</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedCrops.map((crop, index) => (
          <Card key={index} className={index === 0 ? "border-primary border-2" : ""}>
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
                    className="bg-primary h-2.5 rounded-full" 
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
                  <Seedling size={16} className="mr-2 text-farm-sprout" />
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
              
              {index === 0 && (
                <Button className="w-full mt-4" size="sm">Select This Crop</Button>
              )}
              
              {index > 0 && (
                <Button variant="outline" className="w-full mt-4" size="sm">View Details</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Key Factors in Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(factorsDescription).map(([factor, description], index) => (
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
              For wheat, the ideal planting window would be in the next 2-3 weeks to maximize yield potential.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Download Report</Button>
              <Button variant="outline" size="sm">Adjust Parameters</Button>
              <Button size="sm">Get Planting Guide</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropResults;
