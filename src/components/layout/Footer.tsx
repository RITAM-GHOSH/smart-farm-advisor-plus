
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">ExpertAgri</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Empowering farmers with data-driven insights for better crop selection, 
              fertilizer usage, rainfall prediction, and yield forecasting.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={14} className="mx-1 text-destructive" />
              <span>for sustainable agriculture</span>
            </div>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Crop Prediction</li>
              <li>Fertilizer Recommendation</li>
              <li>Rainfall Forecasting</li>
              <li>Yield Estimation</li>
              <li>Soil Analysis</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>Farming Guides</li>
              <li>Weather Updates</li>
              <li>Market Trends</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} ExpertAgri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
