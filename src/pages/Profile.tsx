
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, User, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [crops, setCrops] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error) throw error;

          if (data) {
            setName(data.name || "");
            setLocation(data.location || "");
            setFarmSize(data.farm_size?.toString() || "");
            setCrops(data.crops || "");
          }

          const { data: userData } = await supabase.auth.getUser();
          setEmailVerified(!!userData.user?.email_confirmed_at);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          name,
          location,
          farm_size: farmSize ? parseInt(farmSize) : null,
          crops,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message || "Failed to update profile");
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </div>
            <Badge className="flex items-center gap-1" variant={emailVerified ? "default" : "destructive"}>
              {emailVerified ? (
                <>
                  <Check className="h-3 w-3" />
                  Verified
                </>
              ) : (
                <>
                  <X className="h-3 w-3" />
                  Not Verified
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isSuccess && (
            <Alert className="bg-green-50 text-green-700 border-green-200">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your profile has been updated successfully.</AlertDescription>
            </Alert>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage || "There was an error updating your profile."}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user?.email || ""} disabled />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Your farm location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="farmSize">Farm Size (in acres)</Label>
              <Input
                id="farmSize"
                type="number"
                placeholder="Enter farm size"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="crops">Crops (comma separated)</Label>
              <Input
                id="crops"
                placeholder="e.g., Wheat, Rice, Corn"
                value={crops}
                onChange={(e) => setCrops(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <span className="animate-spin mr-2">⏳</span> Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
