import React, { useState, useEffect } from "react";
import { Leaf, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarContext } from "@/context/Context";

interface EcoInsightsProps {
  totalTrips: number;
}

// Equivalent metrics for hover insights with emojis
const equivalents = {
  co2: [
    { label: "hours of A/C usage", ratio: 9.36, emoji: "❄️" }, // kg CO2
    { label: "km of traffic avoided", ratio: 0.22, emoji: "🚗" }, // kg CO2 per km
    { label: "Trees Planted", ratio: 21, emoji: "🌳" }, // kg CO2 per tree
  ],
  money: [
    { label: "Movie Tickets", ratio: 80, emoji: "🎬" }, // AED per ticket
    { label: "Starbucks Coffee", ratio: 1070, emoji: "☕️" }, // AED
    { label: "Year of Amazon Prime", ratio: 140, emoji: "📦" }, // AED
  ],
  time: [
    { label: "Yoga Sessions", ratio: 2, emoji: "🧘" }, // Hours per session
    { label: "FIFA Matches", ratio: 0.5, emoji: "🎮" }, // Hours per match
    { label: "Books Read", ratio: 10.7, emoji: "📚" }, // Hours per book
  ],
  roi: [
    { label: "Months of Fuel for a Sedan", ratio: 500, emoji: "⛽" }, // AED
    { label: "Roundtrip to Europe", ratio: 3000, emoji: "✈️" }, // AED
    { label: "Annual Parking Pass in Dubai Marina", ratio: 3500, emoji: "🅿️" }, // AED
  ],
};

const getEquivalentInsights = (
  value: number,
  type: keyof typeof equivalents
): Array<{ text: string; emoji: string }> => {
  return equivalents[type]
    .map((eq) => {
      const quantity =
        eq.label === "Starbucks Coffee"
          ? Math.floor(value / eq.ratio) * 20
          : Math.floor(value / eq.ratio);
      return quantity > 0
        ? {
            text: `${quantity} ${eq.label}${
              eq.label === "Starbucks Coffee" && quantity > 1 ? "s" : ""
            }`,
            emoji: eq.emoji,
          }
        : null;
    })
    .filter(Boolean) as Array<{ text: string; emoji: string }>;
};

const EcoInsights: React.FC<EcoInsightsProps> = ({ totalTrips = 0 }) => {
  // Track which cards are being hovered
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { analysis } = useCarContext();

  // const totalAmountSum = analysis.reduce((acc, trip) => {
  //   const salikCost = Number.isFinite(trip.amount) ? Number(trip.amount) : 0;
  //   return acc + salikCost;
  // }, 0);
  const totalAmountSum = Array.isArray(analysis)
    ? analysis.reduce((acc, trip) => {
        const salikCost = Number.isFinite(trip.amount)
          ? Number(trip.amount)
          : 0;
        return acc + salikCost;
      }, 0)
    : 0;

  // Constants - updated with the correct values from user specifications
  const avgCO2SavedPerTrip = 0.21; // in kg, due to congestion avoidance via Salik
  const avgMoneySavedPerTrip = 2.0; // AED estimated due to fuel/time
  const avgTimeSavedPerTrip = 6; // minutes saved per trip
  const valuePerHour = 50; // AED per hour value of time
  const carbonValue = 0.05; // AED per kg of CO2 saved

  // Calculated values
  const totalCO2Saved =
    analysis && analysis[analysis.length - 1].co2_saved.toFixed(2);
  const netSaving =
    analysis &&
    (analysis[analysis.length - 1].total_savings - totalAmountSum).toFixed(2);
  const moneySaved =
    analysis && analysis[analysis.length - 1].value_of_fuel_saved.toFixed(2);
  const timeSaved =
    analysis && (analysis[analysis.length - 1].time_saved_ / 60).toFixed(1); // in hours

  // Calculate Net ROI
  const riskSafetySavings = 0.5 * totalTrips;
  const netROI = (
    parseFloat(moneySaved) +
    parseFloat(timeSaved) * valuePerHour +
    parseFloat(totalCO2Saved) * carbonValue +
    riskSafetySavings
  ).toFixed(0);

  const tripData = localStorage.getItem("tripData")
    ? JSON.parse(localStorage.getItem("tripData") || "[]")
    : [];
  const totalSalikCost = tripData.reduce((acc, trip) => {
    const salikCost = Number.isFinite(trip.amount) ? Number(trip.amount) : 0;
    return acc + salikCost;
  }, 0);

  // Calculate equivalent insights
  const co2Equivalents = getEquivalentInsights(
    parseFloat(totalCO2Saved),
    "co2"
  );
  const moneyEquivalents = getEquivalentInsights(
    parseFloat(moneySaved),
    "money"
  );
  const timeEquivalents = getEquivalentInsights(parseFloat(timeSaved), "time");
  const roiEquivalents = getEquivalentInsights(parseFloat(netROI), "roi");

  // Keep track of autoplay intervals with refs to avoid recreating them on each render
  const [carouselPositions, setCarouselPositions] = useState<
    Record<string, number>
  >({
    co2: 0,
    money: 0,
    time: 0,
    roi: 0,
  });

  // Effect to handle autoplay when a card is hovered
  useEffect(() => {
    if (!hoveredCard) return;

    const autoplayInterval = setInterval(() => {
      setCarouselPositions((prev) => {
        const currentItems =
          equivalents[hoveredCard as keyof typeof equivalents];
        const currentPosition = prev[hoveredCard];
        const nextPosition = (currentPosition + 1) % currentItems.length;

        return {
          ...prev,
          [hoveredCard]: nextPosition,
        };
      });
    }, 2000); // Change every 2 seconds

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [hoveredCard]);

  const insights = [
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      label: "CO₂ Saved",
      value: `${totalCO2Saved} kg`,
      iconBgClass: "bg-green-100",
      equivalents: co2Equivalents,
      type: "co2",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-blue-600"
        >
          <path
            d="M12 4v2m0 12v2M4 12h2m12 0h2m-4.6-4.6l-1.4 1.4m-6 6l-1.4 1.4m0-8.8l1.4 1.4m6 6l1.4 1.4M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Net Saving",
      value: `${netSaving}`,
      iconBgClass: "bg-blue-100",
      equivalents: roiEquivalents,
      type: "roi",
    },
    {
      icon: (
        <div className="flex items-center justify-center w-8 h-8 text-amber-600 font-bold">
          <img src="/lovable-uploads/dirham.svg" className="h-5 w-5" alt="" />
        </div>
      ),
      label: "Saved Fuel Cost",
      value: `${moneySaved}`,
      iconBgClass: "bg-amber-100",
      equivalents: moneyEquivalents,
      type: "money",
    },
    {
      icon: <Clock className="w-8 h-8 text-teal-600" />,
      label: "Time Saved",
      value: `${timeSaved} hrs`,
      iconBgClass: "bg-teal-100",
      equivalents: timeEquivalents,
      type: "time",
    },
  ];

  // Helper component for carousel content
  const InsightCarousel = ({
    items,
    type,
  }: {
    items: Array<{ text: string; emoji: string }>;
    type: string;
  }) => {
    const currentPosition = carouselPositions[type];
    // console.log("item", items);

    return (
      <Carousel className="w-full">
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className={i === currentPosition ? "block" : "hidden"}
            >
              <div className="p-1">
                <div className="flex items-center justify-center p-4 rounded-lg bg-gray-50">
                  <span className="text-3xl mr-2">{item.emoji}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {item.text}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {insights.map((insight, idx) => (
          <HoverCard key={idx} open={hoveredCard === insight.type}>
            <HoverCardTrigger asChild>
              <Card
                className="flex flex-col items-center justify-center py-6 px-2 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-[1rem]  border-4 border-b-2 border-l-0 !border-white"
                style={{
                  boxShadow:
                    "0px 10px 12px 5px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={() => setHoveredCard(insight.type)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`rounded-full p-3 mb-3 ${insight.iconBgClass}`}>
                  {insight.icon}
                </div>
                <div className="text-xl font-bold text-gray-800 flex items-center gap-1">
                  {(insight.label === "Net Saving" ||
                    insight.label === "Saved Fuel Cost") && (
                    <img
                      src="/lovable-uploads/dirham.svg"
                      className="h-5 w-5"
                      alt=""
                    />
                  )}
                  {insight.value}
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">
                  {insight.label}
                </div>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4 border border-gray-100 bg-white rounded-md shadow-lg">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">
                  Equivalent to:
                </h4>
                <InsightCarousel
                  items={insight.equivalents}
                  type={insight.type}
                />
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default EcoInsights;
