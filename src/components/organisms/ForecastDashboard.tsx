"use client";

import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FaTint,
  FaChartLine,
  FaBrain,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

// ─── API Types ───────────────────────────────────────────────────────────────

interface PredictionResult {
  predicted: number;
  confidence_range: [number, number];
  same_month_last_year: number;
  change_pct_vs_last_year: number;
  trend_vs_prev_month: "up" | "down" | "flat";
  risk: "high" | "low" | "normal";
}

interface PredictResponse {
  year: number;
  month: string;
  predictions: {
    Blood_Requests_est: PredictionResult;
    RCC_Issues_est: PredictionResult;
    Total_Component_Issues_est: PredictionResult;
  };
}

interface ForecastDataPoint {
  month: string;
  year: number;
  predicted: number;
  confidence_range: [number, number];
  same_month_last_year: number;
  change_pct_vs_last_year: number;
  trend_vs_prev_month: "up" | "down" | "flat";
  risk: "high" | "low" | "normal";
}

interface ForecastResponse {
  months_forecast: number;
  forecast: {
    Blood_Requests_est: ForecastDataPoint[];
    RCC_Issues_est: ForecastDataPoint[];
    Total_Component_Issues_est: ForecastDataPoint[];
  };
}

interface FeatureImportanceItem {
  feature: string;
  importance: number;
}

interface WhyResponse {
  target: string;
  model_mae: number;
  model_r2: number;
  feature_importance: FeatureImportanceItem[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = "/api/forecast";

const buildPredictUrl = (year: number, month: string) =>
  `${API_BASE}/predict?year=${year}&month=${encodeURIComponent(month)}`;

const buildForecastUrl = (year: number, month: string, months: number) =>
  `${API_BASE}/forecast?start_year=${year}&start_month=${encodeURIComponent(month)}&months=${months}`;

const buildWhyUrl = (target: string) =>
  `${API_BASE}/why?target=${encodeURIComponent(target)}`;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TARGET_LABELS: Record<string, string> = {
  Blood_Requests_est: "Blood Requests",
  RCC_Issues_est: "RCC Issues",
  Total_Component_Issues_est: "Total Component Issues",
};

const TARGET_COLORS: Record<string, string> = {
  Blood_Requests_est: "#CE121A",
  RCC_Issues_est: "#3B82F6",
  Total_Component_Issues_est: "#8B5CF6",
};

const TARGET_BG: Record<string, string> = {
  Blood_Requests_est: "from-red-50 to-rose-100",
  RCC_Issues_est: "from-blue-50 to-indigo-100",
  Total_Component_Issues_est: "from-purple-50 to-violet-100",
};

const TARGET_ICON_BG: Record<string, string> = {
  Blood_Requests_est: "bg-red-500",
  RCC_Issues_est: "bg-blue-500",
  Total_Component_Issues_est: "bg-purple-500",
};

// ─── Helper Utilities ─────────────────────────────────────────────────────────

function formatNum(n: number) {
  return n.toLocaleString();
}

function getCurrentYearMonth() {
  const now = new Date();
  return { year: now.getFullYear(), month: MONTHS[now.getMonth()] };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const TrendIcon: React.FC<{ trend: "up" | "down" | "flat" }> = ({ trend }) => {
  if (trend === "up")
    return <FaArrowUp className="text-red-500 inline-block ml-1" size={12} />;
  if (trend === "down")
    return <FaArrowDown className="text-green-500 inline-block ml-1" size={12} />;
  return <FaMinus className="text-gray-400 inline-block ml-1" size={12} />;
};

const RiskBadge: React.FC<{ risk: "high" | "low" | "normal" }> = ({ risk }) => {
  const map = {
    high: { cls: "bg-red-100 text-red-700 border-red-200", label: "High Risk", icon: <FaExclamationTriangle size={10} /> },
    normal: { cls: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "Normal", icon: <FaInfoCircle size={10} /> },
    low: { cls: "bg-green-100 text-green-700 border-green-200", label: "Low Risk", icon: <FaCheckCircle size={10} /> },
  };
  const { cls, label, icon } = map[risk];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {icon} {label}
    </span>
  );
};

const YoYBadge: React.FC<{ pct: number; month: string; year: number }> = ({ pct, month, year }) => {
  const sign = pct >= 0 ? "+" : "";
  const isPositive = pct >= 0;
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${isPositive ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
      {sign}{pct.toFixed(1)}% vs {month.slice(0, 3)} {year - 1}
    </span>
  );
};

// ─── Overview Card ────────────────────────────────────────────────────────────

interface PredCardProps {
  target: string;
  data: PredictionResult;
  month: string;
  year: number;
}

const PredictionCard: React.FC<PredCardProps> = ({ target, data, month, year }) => {
  return (
    <div className={`bg-gradient-to-br ${TARGET_BG[target]} rounded-2xl p-5 shadow-sm border border-white`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`${TARGET_ICON_BG[target]} w-9 h-9 rounded-xl flex items-center justify-center shadow-sm`}>
          <FaTint className="text-white" size={14} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{TARGET_LABELS[target]}</p>
          <p className="text-xs text-gray-400">{month} {year}</p>
        </div>
      </div>

      {/* Headline */}
      <div className="mb-2">
        <p className="text-3xl font-bold text-gray-800">{formatNum(data.predicted)}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Range: {formatNum(data.confidence_range[0])} – {formatNum(data.confidence_range[1])}
          <TrendIcon trend={data.trend_vs_prev_month} />
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <RiskBadge risk={data.risk} />
        <YoYBadge pct={data.change_pct_vs_last_year} month={month} year={year} />
      </div>

      {/* Last Year Comparison */}
      <div className="mt-3 pt-3 border-t border-white/60">
        <p className="text-xs text-gray-500">
          Same month last year:{" "}
          <span className="font-semibold text-gray-700">{formatNum(data.same_month_last_year)}</span>
        </p>
      </div>
    </div>
  );
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number; dataKey: string }>;
  label?: string;
}

const ForecastTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 min-w-[160px]">
      <p className="font-semibold text-gray-700 mb-2 text-sm">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs flex justify-between gap-3" style={{ color: entry.color }}>
          <span>{entry.name}</span>
          <span className="font-bold">{formatNum(entry.value)}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Feature Importance Bar ───────────────────────────────────────────────────

const FeatureBar: React.FC<{ feature: string; importance: number; max: number; color: string }> = ({
  feature, importance, max, color,
}) => {
  const pct = max > 0 ? (importance / max) * 100 : 0;
  const featureLabel = feature.replace(/([A-Z])/g, " $1").trim();
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-gray-600">{featureLabel}</span>
        <span className="text-xs font-bold text-gray-700">{(importance * 100).toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

// ─── Why Expander ─────────────────────────────────────────────────────────────

interface WhyExpanderProps {
  target: string;
}

const WhyExpander: React.FC<WhyExpanderProps> = ({ target }) => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<WhyResponse | null>(null);
  const [loading, setLoading] = React.useState(false);

  const load = async () => {
    if (data) { setOpen((o) => !o); return; }
    setLoading(true);
    try {
      const res = await fetch(buildWhyUrl(target));
      if (res.ok) setData(await res.json());
    } catch { /* ignore */ } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const top3 = data?.feature_importance.slice(0, 5) ?? [];
  const maxImp = top3[0]?.importance ?? 1;

  return (
    <div className="mt-3">
      <button
        onClick={load}
        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
      >
        {open ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
        {open ? "Hide" : "Why this forecast?"}
      </button>
      {open && (
        <div className="mt-3 p-3 bg-white/70 rounded-xl border border-white">
          {loading && <p className="text-xs text-gray-400">Loading model insights…</p>}
          {data && (
            <>
              <p className="text-xs text-gray-500 mb-3">
                MAE: <span className="font-semibold">{formatNum(Math.round(data.model_mae))}</span>
                &nbsp;&nbsp;|&nbsp;&nbsp; R²: <span className="font-semibold">{data.model_r2.toFixed(2)}</span>
              </p>
              {top3.map((f) => (
                <FeatureBar
                  key={f.feature}
                  feature={f.feature}
                  importance={f.importance}
                  max={maxImp}
                  color={TARGET_COLORS[target]}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Tab Definitions ──────────────────────────────────────────────────────────

type Tab = "overview" | "trends" | "insights";

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const ForecastDashboard: React.FC = () => {
  const { year: defaultYear, month: defaultMonth } = getCurrentYearMonth();

  // Controls
  const [selectedYear, setSelectedYear] = React.useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = React.useState(defaultMonth);
  const [forecastMonths, setForecastMonths] = React.useState(6);
  const [activeTab, setActiveTab] = React.useState<Tab>("overview");

  // Data
  const [predictData, setPredictData] = React.useState<PredictResponse | null>(null);
  const [forecastData, setForecastData] = React.useState<ForecastResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // ── Fetch single-month prediction ──────────────────────────────────────────
  const fetchPredict = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(buildPredictUrl(selectedYear, selectedMonth), {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Error ${res.status}`);
      }
      setPredictData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch prediction");
      setPredictData(null);
    } finally {
      setLoading(false);
    }
  }, [selectedYear, selectedMonth]);

  // ── Fetch multi-month forecast ─────────────────────────────────────────────
  const fetchForecast = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(buildForecastUrl(selectedYear, selectedMonth, forecastMonths), {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Error ${res.status}`);
      }
      setForecastData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch forecast");
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [selectedYear, selectedMonth, forecastMonths]);

  // Initial load & re-fetch on param changes
  React.useEffect(() => {
    if (activeTab === "overview") fetchPredict();
    if (activeTab === "trends" || activeTab === "insights") fetchForecast();
  }, [activeTab, fetchPredict, fetchForecast]);

  // ── Prepare chart data ─────────────────────────────────────────────────────
  const chartData = React.useMemo(() => {
    if (!forecastData) return [];
    const br = forecastData.forecast.Blood_Requests_est ?? [];
    const rcc = forecastData.forecast.RCC_Issues_est ?? [];
    const tci = forecastData.forecast.Total_Component_Issues_est ?? [];
    return br.map((item, i) => ({
      month: item.month,
      "Blood Requests": item.predicted,
      "Blood Req Low": item.confidence_range[0],
      "Blood Req High": item.confidence_range[1],
      "RCC Issues": rcc[i]?.predicted ?? 0,
      "RCC Low": rcc[i]?.confidence_range[0] ?? 0,
      "RCC High": rcc[i]?.confidence_range[1] ?? 0,
      "Total Issues": tci[i]?.predicted ?? 0,
      "Total Low": tci[i]?.confidence_range[0] ?? 0,
      "Total High": tci[i]?.confidence_range[1] ?? 0,
    }));
  }, [forecastData]);

  // ── Year options (current ± 2) ─────────────────────────────────────────────
  const yearOptions = [defaultYear - 1, defaultYear, defaultYear + 1, defaultYear + 2];

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <FaTint size={13} /> },
    { id: "trends", label: "Forecast Trends", icon: <FaChartLine size={13} /> },
    { id: "insights", label: "Model Insights", icon: <FaBrain size={13} /> },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 pt-0">

      {/* ── Header ── */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-md">
            <FaChartLine className="text-white" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Blood Demand Forecast</h1>
            <p className="text-xs text-gray-500">AI-powered predictions using XGBoost models</p>
          </div>
        </div>
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
          <FaExclamationTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={12} />
          <p className="text-xs text-amber-700">
            <span className="font-semibold">Demo Mode:</span> Models are trained on estimated data.
            Replace with real monthly data and retrain before using for clinical decisions.
          </p>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Forecast Parameters</p>
        <div className="flex flex-wrap gap-4 items-end">
          {/* Year */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Year</label>
            <select
              className="text-sm border-2 border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all font-medium text-gray-700"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Month */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Start Month</label>
            <select
              className="text-sm border-2 border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all font-medium text-gray-700"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Months to forecast (only for trends/insights) */}
          {activeTab !== "overview" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Months to Forecast</label>
              <select
                className="text-sm border-2 border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all font-medium text-gray-700"
                value={forecastMonths}
                onChange={(e) => setForecastMonths(Number(e.target.value))}
              >
                {[3, 6, 9, 12].map((n) => <option key={n} value={n}>{n} months</option>)}
              </select>
            </div>
          )}

          {/* Fetch button */}
          <button
            onClick={activeTab === "overview" ? fetchPredict : fetchForecast}
            disabled={loading}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition-colors"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <FaChartLine size={13} />
            )}
            {loading ? "Loading…" : "Run Forecast"}
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-5 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === t.id
                ? "bg-red-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Error state ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 flex items-start gap-2">
          <FaExclamationTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
          <div>
            <p className="text-sm font-semibold text-red-700">Could not fetch prediction</p>
            <p className="text-xs text-red-600 mt-0.5">{error}</p>
            <p className="text-xs text-red-500 mt-1">
              Make sure the local app is running and the forecast backend is reachable at <code className="bg-red-100 px-1 rounded">http://localhost:5005</code>
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ OVERVIEW */}
      {activeTab === "overview" && (
        <div>
          {loading && !predictData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
              ))}
            </div>
          )}

          {predictData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {(["Blood_Requests_est", "RCC_Issues_est", "Total_Component_Issues_est"] as const).map((key) => (
                  <div key={key}>
                    <PredictionCard
                      target={key}
                      data={predictData.predictions[key]}
                      month={predictData.month}
                      year={predictData.year}
                    />
                    <div className={`bg-gradient-to-br ${TARGET_BG[key]} rounded-b-2xl px-5 pb-4 -mt-2 border border-t-0 border-white shadow-sm`}>
                      <WhyExpander target={key} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm">Prediction Summary — {predictData.month} {predictData.year}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Metric", "Predicted", "Confidence Range", "vs Last Year", "Trend", "Risk"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(["Blood_Requests_est", "RCC_Issues_est", "Total_Component_Issues_est"] as const).map((key) => {
                        const d = predictData.predictions[key];
                        return (
                          <tr key={key} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-semibold text-gray-700 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TARGET_COLORS[key] }} />
                              {TARGET_LABELS[key]}
                            </td>
                            <td className="px-4 py-3 font-bold text-gray-800">{formatNum(d.predicted)}</td>
                            <td className="px-4 py-3 text-gray-600 text-xs">
                              {formatNum(d.confidence_range[0])} – {formatNum(d.confidence_range[1])}
                            </td>
                            <td className="px-4 py-3">
                              <YoYBadge pct={d.change_pct_vs_last_year} month={predictData.month} year={predictData.year} />
                            </td>
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                                <TrendIcon trend={d.trend_vs_prev_month} />
                                {d.trend_vs_prev_month.charAt(0).toUpperCase() + d.trend_vs_prev_month.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <RiskBadge risk={d.risk} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════ TREND CHARTS */}
      {activeTab === "trends" && (
        <div className="space-y-5">
          {loading && !forecastData && (
            <div className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
          )}

          {forecastData && chartData.length > 0 && (
            <>
              {/* Combined overview chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800">All Metrics — {forecastMonths}-Month Forecast</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Starting {selectedMonth} {selectedYear}</p>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e0e0e0" }} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "#e0e0e0" }} tickLine={false} width={55} tickFormatter={(v) => v.toLocaleString()} />
                      <Tooltip content={<ForecastTooltip />} />
                      <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
                      <Line type="monotone" dataKey="Blood Requests" stroke="#CE121A" strokeWidth={2.5} dot={{ r: 3, fill: "#CE121A" }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="RCC Issues" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3, fill: "#3B82F6" }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="Total Issues" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 3, fill: "#8B5CF6" }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Per-metric area charts */}
              {(
                [
                  { key: "Blood Requests", low: "Blood Req Low", high: "Blood Req High", target: "Blood_Requests_est" },
                  { key: "RCC Issues", low: "RCC Low", high: "RCC High", target: "RCC_Issues_est" },
                  { key: "Total Issues", low: "Total Low", high: "Total High", target: "Total_Component_Issues_est" },
                ] as const
              ).map(({ key, low, high, target }) => (
                <div key={key} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 ${TARGET_ICON_BG[target]} rounded-lg flex items-center justify-center`}>
                      <FaTint className="text-white" size={12} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{TARGET_LABELS[target]}</h3>
                      <p className="text-xs text-gray-500">Predicted values with confidence band</p>
                    </div>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                        <defs>
                          <linearGradient id={`grad-${target}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={TARGET_COLORS[target]} stopOpacity={0.15} />
                            <stop offset="95%" stopColor={TARGET_COLORS[target]} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e0e0e0" }} tickLine={false} />
                        <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "#e0e0e0" }} tickLine={false} width={55} tickFormatter={(v) => v.toLocaleString()} />
                        <Tooltip content={<ForecastTooltip />} />
                        {/* Confidence band — render high first */}
                        <Area type="monotone" dataKey={high} stroke="none" fill={TARGET_COLORS[target]} fillOpacity={0.08} legendType="none" name="Upper Bound" />
                        <Area type="monotone" dataKey={low} stroke="none" fill="#ffffff" fillOpacity={1} legendType="none" name="Lower Bound" />
                        {/* Predicted line */}
                        <Area
                          type="monotone"
                          dataKey={key}
                          stroke={TARGET_COLORS[target]}
                          strokeWidth={2.5}
                          fill={`url(#grad-${target})`}
                          dot={{ r: 3, fill: TARGET_COLORS[target] }}
                          activeDot={{ r: 6 }}
                          name="Predicted"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}

              {/* Data table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm">Forecast Data Table — Blood Requests</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Month", "Predicted", "Lower Bound", "Upper Bound", "Trend", "Risk"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {forecastData.forecast.Blood_Requests_est.map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-semibold text-gray-700">{item.month}</td>
                          <td className="px-4 py-3 font-bold text-gray-800">{formatNum(item.predicted)}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{formatNum(item.confidence_range[0])}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{formatNum(item.confidence_range[1])}</td>
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                              <TrendIcon trend={item.trend_vs_prev_month} />
                              {item.trend_vs_prev_month.charAt(0).toUpperCase() + item.trend_vs_prev_month.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <RiskBadge risk={item.risk} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════ MODEL INSIGHTS */}
      {activeTab === "insights" && (
        <div className="space-y-5">
          {(["Blood_Requests_est", "RCC_Issues_est", "Total_Component_Issues_est"] as const).map((target) => (
            <InsightCard key={target} target={target} />
          ))}

          {/* How it works */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-3">How the Forecast Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "01",
                  title: "Historical Data",
                  desc: "The model learns from monthly blood request and donation records including seasonal patterns.",
                },
                {
                  step: "02",
                  title: "XGBoost Model",
                  desc: "Gradient boosting trees capture non-linear relationships between features like month, season, and prior demand.",
                },
                {
                  step: "03",
                  title: "Chained Forecast",
                  desc: "For multi-month forecasts, each month's prediction feeds the next as a feature, enabling sequential projection.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-3">
                  <div className="w-8 h-8 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-red-500">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Insight Card (fetches /why on mount) ─────────────────────────────────────

const InsightCard: React.FC<{ target: string }> = ({ target }) => {
  const [data, setData] = React.useState<WhyResponse | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(buildWhyUrl(target), {
      cache: "no-store",
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then(setData)
      .catch(() => { /* ignore */ })
      .finally(() => setLoading(false));
  }, [target]);

  const top5 = data?.feature_importance.slice(0, 5) ?? [];
  const maxImp = top5[0]?.importance ?? 1;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 ${TARGET_ICON_BG[target]} rounded-xl flex items-center justify-center shadow-sm`}>
          <FaBrain className="text-white" size={14} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{TARGET_LABELS[target]}</h3>
          <p className="text-xs text-gray-500">Model performance & feature drivers</p>
        </div>
      </div>

      {loading && <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />}

      {data && (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">Mean Abs. Error (MAE)</p>
              <p className="text-lg font-bold text-gray-800">{formatNum(Math.round(data.model_mae))}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">R² Score</p>
              <p className={`text-lg font-bold ${data.model_r2 >= 0 ? "text-green-600" : "text-red-500"}`}>
                {data.model_r2.toFixed(3)}
              </p>
            </div>
          </div>

          {/* Feature importance */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Top Feature Drivers</p>
            {top5.map((f) => (
              <FeatureBar
                key={f.feature}
                feature={f.feature}
                importance={f.importance}
                max={maxImp}
                color={TARGET_COLORS[target]}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ForecastDashboard;
