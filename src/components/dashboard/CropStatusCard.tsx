
import { Seedling, Droplet, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CropStatusCard = () => {
  const cropData = {
    name: "Rice",
    variety: "Basmati",
    plantingDate: "March 1, 2025",
    growthStage: "Reproductive",
    growthPercent: 65,
    daysToHarvest: 42,
    moistureLevel: "Optimal",
    healthStatus: "Good",
    yieldForecast: "Above Average"
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Current Crop Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-farm-sprout/20 rounded-full flex items-center justify-center mr-4">
            <Seedling size={24} className="text-farm-sprout" />
          </div>
          <div>
            <h3 className="text-lg font-medium">{cropData.name}</h3>
            <p className="text-sm text-muted-foreground">{cropData.variety}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Growth Progress</span>
              <span className="font-medium">{cropData.growthPercent}%</span>
            </div>
            <Progress value={cropData.growthPercent} className="h-2" />
            <div className="mt-1 text-xs text-muted-foreground flex justify-between">
              <span>Planted: {cropData.plantingDate}</span>
              <span>{cropData.daysToHarvest} days to harvest</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 p-3 rounded-md">
              <div className="flex items-center text-sm font-medium mb-1">
                <Droplet size={16} className="mr-1 text-farm-water" />
                Moisture Level
              </div>
              <div className="text-base">{cropData.moistureLevel}</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-md">
              <div className="flex items-center text-sm font-medium mb-1">
                <Calendar size={16} className="mr-1 text-farm-soil" />
                Growth Stage
              </div>
              <div className="text-base">{cropData.growthStage}</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-md">
              <div className="flex items-center text-sm font-medium mb-1">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-1"></div>
                Health Status
              </div>
              <div className="text-base">{cropData.healthStatus}</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-md">
              <div className="flex items-center text-sm font-medium mb-1">
                <TrendingUp size={16} className="mr-1 text-farm-leaf" />
                Yield Forecast
              </div>
              <div className="text-base">{cropData.yieldForecast}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropStatusCard;
