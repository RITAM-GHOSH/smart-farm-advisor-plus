
import { Cloud, CloudRain, Droplets, Thermometer, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeatherWidget = () => {
  // In a real app, this would come from an API
  const weatherData = {
    location: "Bangalore, India",
    date: "April 13, 2025",
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    windSpeed: 8,
    forecast: [
      { day: "Mon", temp: 28, icon: "cloud" },
      { day: "Tue", temp: 29, icon: "cloud-rain" },
      { day: "Wed", temp: 27, icon: "cloud-rain" },
      { day: "Thu", temp: 30, icon: "sun" },
      { day: "Fri", temp: 31, icon: "sun" },
    ]
  };

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case "cloud":
        return <Cloud size={20} className="text-farm-sky" />;
      case "cloud-rain":
        return <CloudRain size={20} className="text-farm-water" />;
      case "sun":
        return <div className="w-5 h-5 rounded-full bg-yellow-400"></div>;
      default:
        return <Cloud size={20} />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between">
          <span>Weather Conditions</span>
          <span className="text-sm font-normal text-muted-foreground">{weatherData.date}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-medium">{weatherData.location}</h3>
            <div className="flex items-center mt-1">
              <Thermometer size={16} className="mr-1 text-red-500" />
              <span>{weatherData.temperature}°C</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-farm-sky rounded-full flex items-center justify-center">
            <Cloud size={36} className="text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-muted/50 rounded-md p-2 text-center">
            <Droplets size={18} className="mx-auto mb-1 text-farm-water" />
            <div className="text-xs text-muted-foreground">Humidity</div>
            <div className="font-medium">{weatherData.humidity}%</div>
          </div>
          <div className="bg-muted/50 rounded-md p-2 text-center">
            <CloudRain size={18} className="mx-auto mb-1 text-farm-water" />
            <div className="text-xs text-muted-foreground">Rainfall</div>
            <div className="font-medium">{weatherData.rainfall} mm</div>
          </div>
          <div className="bg-muted/50 rounded-md p-2 text-center">
            <Wind size={18} className="mx-auto mb-1 text-farm-sky" />
            <div className="text-xs text-muted-foreground">Wind</div>
            <div className="font-medium">{weatherData.windSpeed} km/h</div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-sm font-medium mb-2">5-Day Forecast</div>
          <div className="flex justify-between">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground">{day.day}</div>
                <div className="my-1 flex justify-center">
                  {getWeatherIcon(day.icon)}
                </div>
                <div className="text-xs font-medium">{day.temp}°</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
