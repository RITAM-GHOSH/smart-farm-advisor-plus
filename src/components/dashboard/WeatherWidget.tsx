
import { useState, useEffect } from "react";
import { Cloud, CloudRain, Droplets, Thermometer, Wind, MapPin, Search, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const WeatherWidget = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather data for a given location
  const fetchWeatherData = async (searchLocation: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call a weather API with the location parameter
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate different weather data based on input location
      const locationLower = searchLocation.toLowerCase();
      
      let mockWeatherData;
      if (locationLower.includes("delhi") || locationLower.includes("new delhi")) {
        mockWeatherData = {
          location: "New Delhi, India",
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          temperature: 35,
          humidity: 45,
          rainfall: 2,
          windSpeed: 12,
          forecast: [
            { day: "Mon", temp: 35, icon: "sun" },
            { day: "Tue", temp: 36, icon: "sun" },
            { day: "Wed", temp: 34, icon: "cloud" },
            { day: "Thu", temp: 33, icon: "cloud-rain" },
            { day: "Fri", temp: 32, icon: "cloud-rain" },
          ]
        };
      } else if (locationLower.includes("mumbai")) {
        mockWeatherData = {
          location: "Mumbai, India",
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          temperature: 31,
          humidity: 78,
          rainfall: 22,
          windSpeed: 15,
          forecast: [
            { day: "Mon", temp: 31, icon: "cloud-rain" },
            { day: "Tue", temp: 30, icon: "cloud-rain" },
            { day: "Wed", temp: 31, icon: "cloud-rain" },
            { day: "Thu", temp: 32, icon: "cloud" },
            { day: "Fri", temp: 32, icon: "cloud" },
          ]
        };
      } else if (locationLower.includes("chennai")) {
        mockWeatherData = {
          location: "Chennai, India",
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          temperature: 33,
          humidity: 72,
          rainfall: 15,
          windSpeed: 10,
          forecast: [
            { day: "Mon", temp: 33, icon: "cloud" },
            { day: "Tue", temp: 34, icon: "sun" },
            { day: "Wed", temp: 33, icon: "cloud" },
            { day: "Thu", temp: 32, icon: "cloud-rain" },
            { day: "Fri", temp: 33, icon: "cloud" },
          ]
        };
      } else {
        // Default fallback to Bangalore
        mockWeatherData = {
          location: searchLocation || "Bangalore, India",
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
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
      }
      
      setWeatherData(mockWeatherData);
      toast.success(`Weather data loaded for ${mockWeatherData.location}`);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again.");
      toast.error("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  // Function to detect user's current location
  const detectLocation = () => {
    setLoadingLocation(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // In a real app, you would reverse geocode the coordinates to get the location name
            // For demo purposes, we'll simulate a reverse geocoding call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Randomly select a city in India for demo
            const cities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Kolkata"];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            
            setLocation(randomCity + ", India");
            fetchWeatherData(randomCity + ", India");
          } catch (err) {
            console.error("Error getting location:", err);
            setError("Failed to determine your location. Please enter it manually.");
            toast.error("Failed to detect location");
          } finally {
            setLoadingLocation(false);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied. Please enter your location manually.");
          toast.error("Location access denied");
          setLoadingLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please enter your location manually.");
      toast.error("Geolocation not supported");
      setLoadingLocation(false);
    }
  };

  // Fetch weather data on component mount
  useEffect(() => {
    detectLocation();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherData(location);
    } else {
      toast.error("Please enter a location");
    }
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
          <span className="text-sm font-normal text-muted-foreground">
            {weatherData?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={detectLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          </Button>
        </form>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-sm text-red-800">
            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : weatherData ? (
          <>
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
                {weatherData.forecast.map((day: any, index: number) => (
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
          </>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No weather data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
