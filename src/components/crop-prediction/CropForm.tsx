
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface CropFormProps {
  onSubmit: (data: any) => void;
}

const CropForm = ({ onSubmit }: CropFormProps) => {
  const [formData, setFormData] = useState({
    nitrogen: 40,
    phosphorus: 30,
    potassium: 35,
    temperature: 25,
    humidity: 65,
    ph: 6.5,
    rainfall: 100,
    region: "",
    season: ""
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.region || !formData.season) {
      toast.error("Please fill in all fields");
      return;
    }
    
    onSubmit(formData);
    toast.success("Analysis in progress");
  };

  const regions = [
    { value: "north", label: "Northern Region" },
    { value: "south", label: "Southern Region" },
    { value: "east", label: "Eastern Region" },
    { value: "west", label: "Western Region" },
    { value: "central", label: "Central Region" }
  ];

  const seasons = [
    { value: "summer", label: "Summer" },
    { value: "winter", label: "Winter" },
    { value: "monsoon", label: "Monsoon" },
    { value: "autumn", label: "Autumn" },
    { value: "spring", label: "Spring" }
  ];

  return (
    <form onSubmit={handleSubmit} className="data-input">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="region">Region</Label>
            <Select 
              value={formData.region} 
              onValueChange={(value) => handleChange("region", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="season">Season</Label>
            <Select 
              value={formData.season} 
              onValueChange={(value) => handleChange("season", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((season) => (
                  <SelectItem key={season.value} value={season.value}>
                    {season.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-medium">Soil Parameters</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                <span className="text-sm">{formData.nitrogen} kg/ha</span>
              </div>
              <Slider 
                id="nitrogen"
                value={[formData.nitrogen]} 
                min={0} 
                max={140} 
                step={1}
                onValueChange={(value) => handleSliderChange("nitrogen", value)} 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                <span className="text-sm">{formData.phosphorus} kg/ha</span>
              </div>
              <Slider 
                id="phosphorus"
                value={[formData.phosphorus]} 
                min={0} 
                max={100} 
                step={1}
                onValueChange={(value) => handleSliderChange("phosphorus", value)} 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="potassium">Potassium (K)</Label>
                <span className="text-sm">{formData.potassium} kg/ha</span>
              </div>
              <Slider 
                id="potassium"
                value={[formData.potassium]} 
                min={0} 
                max={100} 
                step={1}
                onValueChange={(value) => handleSliderChange("potassium", value)} 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="ph">pH Level</Label>
                <span className="text-sm">{formData.ph}</span>
              </div>
              <Slider 
                id="ph"
                value={[formData.ph]} 
                min={0} 
                max={14} 
                step={0.1}
                onValueChange={(value) => handleSliderChange("ph", value)} 
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-medium">Climate Conditions</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="temperature">Temperature</Label>
                <span className="text-sm">{formData.temperature}°C</span>
              </div>
              <Slider 
                id="temperature"
                value={[formData.temperature]} 
                min={0} 
                max={50} 
                step={0.5}
                onValueChange={(value) => handleSliderChange("temperature", value)} 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="humidity">Humidity</Label>
                <span className="text-sm">{formData.humidity}%</span>
              </div>
              <Slider 
                id="humidity"
                value={[formData.humidity]} 
                min={0} 
                max={100} 
                step={1}
                onValueChange={(value) => handleSliderChange("humidity", value)} 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="rainfall">Annual Rainfall</Label>
                <span className="text-sm">{formData.rainfall} mm</span>
              </div>
              <Slider 
                id="rainfall"
                value={[formData.rainfall]} 
                min={0} 
                max={300} 
                step={5}
                onValueChange={(value) => handleSliderChange("rainfall", value)} 
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">Predict Optimal Crops</Button>
      </div>
    </form>
  );
};

export default CropForm;
