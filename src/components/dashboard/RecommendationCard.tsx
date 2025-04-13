
import { 
  Leaf, 
  FlaskConical, 
  Droplets, 
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecommendationCard = () => {
  const recommendations = [
    {
      type: "crop",
      icon: <Leaf className="text-farm-leaf" size={20} />,
      title: "Plant Wheat in Northern Field",
      description: "Soil conditions and upcoming weather are optimal for wheat cultivation."
    },
    {
      type: "fertilizer",
      icon: <FlaskConical className="text-purple-500" size={20} />,
      title: "Apply Nitrogen Fertilizer",
      description: "Current crops need additional nitrogen for optimal growth phase."
    },
    {
      type: "irrigation",
      icon: <Droplets className="text-farm-water" size={20} />,
      title: "Reduce Irrigation by 15%",
      description: "Rainfall forecast indicates sufficient precipitation for the next week."
    },
    {
      type: "alert",
      icon: <AlertCircle className="text-red-500" size={20} />,
      title: "Possible Pest Infestation",
      description: "Current humidity levels may lead to increased fungal growth."
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Smart Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div 
              key={index} 
              className="flex items-start p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-3 border">
                {recommendation.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{recommendation.title}</h4>
                <p className="text-xs text-muted-foreground">{recommendation.description}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground mt-1" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
