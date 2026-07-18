import ForecastDashboard from "@/components/organisms/ForecastDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood Demand Forecast | Drops of Hope",
  description:
    "AI-powered blood demand predictions — view single-month forecasts, multi-month trend charts, and model insights for informed inventory decisions.",
};

export default function ForecastPage() {
  return <ForecastDashboard />;
}
