
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface FertilizerFormProps {
  onSubmit: (data: any) => void;
}

const FertilizerForm = ({ onSubmit }: FertilizerFormProps) => {
  const [formData, setFormData] = useState({
    crop: "",
    soilType: "",
    nitrogen: 35,
    phosphorus: 25,
    potassium: 30,
    calcium: 20,
    magnesium: 15,
    sulfur: 10,
    fieldSize: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.crop || !formData.soilType) {
      toast.error("Please select both crop and soil type");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const crops = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize" },
    { value: "cotton", label: "Cotton" },
    { value: "sugarcane", label: "Sugarcane" }
  ];

  const soilTypes = [
    { value: "clay", label: "Clay Soil" },
    { value: "sandy", label: "Sandy Soil" },
    { value: "loamy", label: "Loamy Soil" },
    { value: "silt", label: "Silty Soil" },
    { value: "peaty", label: "Peaty Soil" }
  ];

  return (
    <form onSubmit={handleSubmit} className="data-input space-y-6 bg-white p-6 rounded-lg border shadow-sm">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="crop" className="flex items-center">
              Crop Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select 
              value={formData.crop} 
              onValueChange={(value) => handleChange("crop", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="soilType" className="flex items-center">
              Soil Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select 
              value={formData.soilType} 
              onValueChange={(value) => handleChange("soilType", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map((soil) => (
                  <SelectItem key={soil.value} value={soil.value}>
                    {soil.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

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
              onChange={(e) => handleChange("fieldSize", parseFloat(e.target.value) || 0.5)}
              className="w-20"
              min={0.5}
              max={50}
              step={0.5}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-medium">Current Soil Nutrient Levels (mg/kg)</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                <span className="text-sm">{formData.nitrogen}</span>
              </div>
              <Slider 
                id="nitrogen"
                value={[formData.nitrogen]} 
                min={0} 
                max={100} 
                step={1}
                onValueChange={(value) => handleSliderChange("nitrogen", value)} 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                <span className="text-sm">{formData.phosphorus}</span>
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
                <span className="text-sm">{formData.potassium}</span>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="calcium">Calcium (Ca)</Label>
                <Input 
                  id="calcium"
                  type="number" 
                  value={formData.calcium} 
                  onChange={(e) => handleChange("calcium", parseFloat(e.target.value) || 0)}
                  className="mt-1"
                  min={0}
                  max={100}
                />
              </div>
              <div>
                <Label htmlFor="magnesium">Magnesium (Mg)</Label>
                <Input 
                  id="magnesium"
                  type="number" 
                  value={formData.magnesium} 
                  onChange={(e) => handleChange("magnesium", parseFloat(e.target.value) || 0)}
                  className="mt-1"
                  min={0}
                  max={100}
                />
              </div>
              <div>
                <Label htmlFor="sulfur">Sulfur (S)</Label>
                <Input 
                  id="sulfur"
                  type="number" 
                  value={formData.sulfur} 
                  onChange={(e) => handleChange("sulfur", parseFloat(e.target.value) || 0)}
                  className="mt-1"
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Generating Recommendations..." : "Get Fertilizer Recommendations"}
        </Button>
      </div>
    </form>
  );
};

export default FertilizerForm;
