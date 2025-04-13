
import { CloudRain, ArrowRight, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RainfallForecast = () => {
  // In a real app, this data would come from a weather API
  const forecastData = {
    location: "Bangalore Rural, Karnataka",
    today: "April 13, 2025",
    overview: "Above average rainfall expected over the next 10 days, with heavy precipitation likely between April 15-17.",
    monthlyData: [
      { month: "Apr", expected: 85, average: 65, unit: "mm" },
      { month: "May", expected: 156, average: 120, unit: "mm" },
      { month: "Jun", expected: 178, average: 190, unit: "mm" },
      { month: "Jul", expected: 210, average: 205, unit: "mm" },
      { month: "Aug", expected: 195, average: 200, unit: "mm" },
      { month: "Sep", expected: 120, average: 150, unit: "mm" }
    ],
    dailyForecast: [
      { date: "Apr 13", day: "Today", rainfall: 2, probability: 30, icon: "sunny-clouds" },
      { date: "Apr 14", day: "Mon", rainfall: 8, probability: 60, icon: "cloudy" },
      { date: "Apr 15", day: "Tue", rainfall: 25, probability: 90, icon: "rainy" },
      { date: "Apr 16", day: "Wed", rainfall: 32, probability: 95, icon: "heavy-rain" },
      { date: "Apr 17", day: "Thu", rainfall: 18, probability: 80, icon: "rainy" },
      { date: "Apr 18", day: "Fri", rainfall: 5, probability: 40, icon: "cloudy" },
      { date: "Apr 19", day: "Sat", rainfall: 0, probability: 10, icon: "sunny" }
    ],
    impactAreas: ["Planting Decisions", "Irrigation Planning", "Fertilizer Application", "Pest Management", "Harvest Timing"]
  };

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case "sunny":
        return <div className="w-8 h-8 rounded-full bg-yellow-400"></div>;
      case "sunny-clouds":
        return <div className="w-8 h-8 rounded-full bg-yellow-300 shadow-md"></div>;
      case "cloudy":
        return <div className="w-8 h-8 rounded-full bg-gray-300"></div>;
      case "rainy":
        return <CloudRain size={24} className="text-farm-water" />;
      case "heavy-rain":
        return <CloudRain size={24} className="text-blue-600" />;
      default:
        return <CloudRain size={24} />;
    }
  };

  const getRainfallCategory = (amount: number) => {
    if (amount === 0) return "None";
    if (amount < 5) return "Light";
    if (amount < 15) return "Moderate";
    if (amount < 30) return "Heavy";
    return "Very Heavy";
  };

  const getRainfallColor = (amount: number) => {
    if (amount === 0) return "bg-gray-200";
    if (amount < 5) return "bg-blue-200";
    if (amount < 15) return "bg-blue-400";
    if (amount < 30) return "bg-blue-600";
    return "bg-blue-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CloudRain size={24} className="text-farm-water" />
        <h2 className="text-xl font-semibold">Rainfall Forecast</h2>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Rainfall Outlook</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1" />
              <span>{forecastData.today}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start mb-4">
            <MapPin size={18} className="text-primary mr-2 mt-0.5" />
            <div>
              <div className="font-medium">{forecastData.location}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {forecastData.overview}
              </p>
            </div>
          </div>

          <Tabs defaultValue="daily" className="mt-4">
            <TabsList className="w-full">
              <TabsTrigger value="daily" className="flex-1">Daily Forecast</TabsTrigger>
              <TabsTrigger value="monthly" className="flex-1">Monthly Outlook</TabsTrigger>
              <TabsTrigger value="impact" className="flex-1">Farming Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {forecastData.dailyForecast.map((day, index) => (
                    <div 
                      key={index} 
                      className={`text-center p-2 rounded-md ${index === 0 ? 'border-2 border-primary' : 'border'}`}
                    >
                      <div className="text-xs font-medium">{day.day}</div>
                      <div className="my-2 flex justify-center">
                        {getWeatherIcon(day.icon)}
                      </div>
                      <div className={`text-xs font-medium ${day.rainfall > 0 ? 'text-farm-water' : ''}`}>
                        {day.rainfall > 0 ? `${day.rainfall} mm` : 'No rain'}
                      </div>
                      <div className="mt-1 w-full h-1 bg-gray-100 rounded overflow-hidden">
                        <div 
                          className={`h-full ${getRainfallColor(day.rainfall)}`} 
                          style={{ width: `${day.probability}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{day.probability}%</div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="text-sm font-medium mb-2">Rainfall Intensity Legend</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-200 mr-1"></div>
                      <span className="text-xs">None</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-200 mr-1"></div>
                      <span className="text-xs">Light</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                      <span className="text-xs">Moderate</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-600 mr-1"></div>
                      <span className="text-xs">Heavy</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-800 mr-1"></div>
                      <span className="text-xs">Very Heavy</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-4">
              <div className="space-y-4">
                <div className="relative h-64 p-4 border rounded-md">
                  <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end px-4">
                    {forecastData.monthlyData.map((month, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="relative w-full flex justify-center mb-1">
                          <div 
                            className="w-6 bg-farm-water rounded-t" 
                            style={{ height: `${(month.expected / 250) * 100}%` }}
                          ></div>
                          <div 
                            className="absolute w-6 bg-gray-400 opacity-40 rounded-t" 
                            style={{ height: `${(month.average / 250) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium">{month.month}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <div className="text-xs font-medium">Rainfall (mm)</div>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 bg-farm-water mr-1"></div>
                      <span className="text-xs">Expected</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 bg-gray-400 opacity-40 mr-1"></div>
                      <span className="text-xs">Historical Avg</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm font-medium mb-1">Season Overview</div>
                    <p className="text-xs">
                      The projected rainfall for the upcoming monsoon season is expected to be 
                      5-10% above the historical average, with good distribution across months.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm font-medium mb-1">Reliability Rating</div>
                    <div className="flex items-center mt-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">75%</span>
                    </div>
                    <p className="text-xs mt-2">Based on historical model accuracy</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="impact" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Recommended Actions</div>
                    <ul className="space-y-2">
                      {forecastData.impactAreas.map((area, index) => (
                        <li key={index} className="flex items-center">
                          <ArrowRight size={12} className="text-primary mr-2" />
                          <div>
                            <div className="text-sm font-medium">{area}</div>
                            <p className="text-xs text-muted-foreground">
                              {index === 0 && "Consider delaying planting by 3-4 days to avoid heavy rainfall."}
                              {index === 1 && "Reduce irrigation for the next 7 days due to expected precipitation."}
                              {index === 2 && "Delay fertilizer application until after the heavy rainfall period."}
                              {index === 3 && "Monitor for increased fungal disease risk following wet conditions."}
                              {index === 4 && "Plan to adjust harvest schedules if crops are near maturity."}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <div className="text-sm font-medium mb-2">Flood Risk Assessment</div>
                    <div className="flex space-x-2 mb-3">
                      <div className="flex-1 py-2 px-3 bg-green-100 text-green-800 rounded-md text-center text-sm">
                        Low Risk
                        <p className="text-xs mt-1">Upland Areas</p>
                      </div>
                      <div className="flex-1 py-2 px-3 bg-yellow-100 text-yellow-800 rounded-md text-center text-sm">
                        Moderate Risk
                        <p className="text-xs mt-1">Mid-level Fields</p>
                      </div>
                      <div className="flex-1 py-2 px-3 bg-red-100 text-red-800 rounded-md text-center text-sm">
                        High Risk
                        <p className="text-xs mt-1">Lowland Areas</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Based on expected rainfall intensity and your farm's topography, 
                      prepare drainage systems for possible runoff in low-lying areas.
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm font-medium mb-2">Weather Alerts</div>
                  <div className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <AlertIcon className="text-amber-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">Heavy Rainfall Alert</h4>
                      <p className="text-xs text-amber-700 mt-1">
                        Expect heavy rainfall (25-32 mm) on April 15-16. Consider postponing fieldwork 
                        and ensure proper drainage to prevent waterlogging in your fields.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple alert icon component
const AlertIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export default RainfallForecast;
