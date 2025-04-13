
import { BarChart3, CloudRain, Sprout, Thermometer } from "lucide-react";

const FarmStats = () => {
  const stats = [
    {
      title: "Soil Quality",
      value: "Good",
      icon: <div className="w-8 h-8 rounded-full bg-farm-soil flex items-center justify-center text-white">
        <Sprout size={18} />
      </div>,
      change: "+5% from last assessment",
      trend: "up"
    },
    {
      title: "Rainfall Forecast",
      value: "68mm",
      icon: <div className="w-8 h-8 rounded-full bg-farm-water flex items-center justify-center text-white">
        <CloudRain size={18} />
      </div>,
      change: "Next 10 days",
      trend: "neutral"
    },
    {
      title: "Avg. Temperature",
      value: "24°C",
      icon: <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white">
        <Thermometer size={18} />
      </div>,
      change: "-2°C from last week",
      trend: "down"
    },
    {
      title: "Projected Yield",
      value: "4.2t/ha",
      icon: <div className="w-8 h-8 rounded-full bg-farm-wheat flex items-center justify-center text-farm-bark">
        <BarChart3 size={18} />
      </div>,
      change: "+8% from last season",
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="flex items-center justify-between">
            {stat.icon}
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              stat.trend === 'up' 
                ? 'bg-green-100 text-green-700' 
                : stat.trend === 'down' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-gray-100 text-gray-700'
            }`}>
              {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '•'} {stat.change}
            </span>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default FarmStats;
