"use client";

import React, { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Truck,
  MapPin,
  Package,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Calendar,
  Hash,
  FileText,
} from "lucide-react";

type TrackingEvent = {
  title: string;
  date: string;
  description: string;
  completed: boolean;
};

type Shipment = {
  shipment_id: string;
  invoice_id: string;
  quote_id: string;
  origin: string;
  destination: string;
  status: "In Transit" | "Delivered" | "Processing" | "Out for Delivery";
  estimated_delivery: string;
  date_created: string;
  last_updated: string;
  events: TrackingEvent[];
};

const shipmentData: Shipment[] = [
  {
    shipment_id: "SHP-3021",
    invoice_id: "INV-1042",
    quote_id: "QT-001",
    origin: "Colombo Hub",
    destination: "Kandy Warehouse",
    status: "In Transit",
    estimated_delivery: "2026-08-20",
    date_created: "2026-08-01",
    last_updated: "2026-08-17T14:30:00",
    events: [
      { title: "In Transit to Kandy", date: "Aug 17, 14:30", description: "Shipment is currently in transit on the Colombo-Kandy expressway.", completed: true },
      { title: "Dispatched from Hub", date: "Aug 17, 08:00", description: "Package dispatched from the main sorting hub in Colombo.", completed: true },
      { title: "Order Processed", date: "Aug 16, 09:15", description: "Order confirmed and packed. Ready for dispatch.", completed: true },
      { title: "Order Placed", date: "Aug 15, 16:45", description: "Payment successful. Awaiting fulfillment.", completed: true },
      { title: "Estimated Delivery", date: "Est. Aug 20", description: "Kandy Warehouse, Sri Lanka", completed: false },
    ],
  },
  {
    shipment_id: "SHP-3020",
    invoice_id: "INV-1043",
    quote_id: "QT-002",
    origin: "Colombo Hub",
    destination: "Galle Port",
    status: "Delivered",
    estimated_delivery: "2026-08-14",
    date_created: "2026-08-10",
    last_updated: "2026-08-14T11:20:00",
    events: [
      { title: "Delivered", date: "Aug 14, 11:20", description: "Package successfully delivered to Galle Port.", completed: true },
      { title: "Out for Delivery", date: "Aug 14, 07:00", description: "Shipment is out for final delivery.", completed: true },
      { title: "Arrived at Local Hub", date: "Aug 13, 18:30", description: "Package arrived at Galle sorting facility.", completed: true },
      { title: "Dispatched from Hub", date: "Aug 12, 14:30", description: "Package dispatched from the main sorting hub in Colombo.", completed: true },
      { title: "Order Processed", date: "Aug 10, 09:15", description: "Order confirmed and packed. Ready for dispatch.", completed: true },
      { title: "Order Placed", date: "Aug 08, 16:45", description: "Payment successful. Awaiting fulfillment.", completed: true },
    ],
  },
  {
    shipment_id: "SHP-3019",
    invoice_id: "INV-1044",
    quote_id: "QT-005",
    origin: "Colombo Hub",
    destination: "Jaffna Distribution Center",
    status: "Processing",
    estimated_delivery: "2026-08-25",
    date_created: "2026-08-12",
    last_updated: "2026-08-15T10:00:00",
    events: [
      { title: "Order Processed", date: "Aug 15, 10:00", description: "Order confirmed. Awaiting packaging.", completed: true },
      { title: "Order Placed", date: "Aug 14, 12:30", description: "Payment successful. Awaiting fulfillment.", completed: true },
      { title: "Estimated Delivery", date: "Est. Aug 25", description: "Jaffna Distribution Center, Sri Lanka", completed: false },
    ],
  },
  {
    shipment_id: "SHP-3018",
    invoice_id: "INV-1045",
    quote_id: "QT-007",
    origin: "Colombo Hub",
    destination: "Batticaloa Depot",
    status: "Out for Delivery",
    estimated_delivery: "2026-08-17",
    date_created: "2026-08-13",
    last_updated: "2026-08-17T06:45:00",
    events: [
      { title: "Out for Delivery", date: "Aug 17, 06:45", description: "Shipment is out for final delivery to Batticaloa Depot.", completed: true },
      { title: "Arrived at Local Hub", date: "Aug 16, 20:00", description: "Package arrived at Batticaloa sorting facility.", completed: true },
      { title: "In Transit", date: "Aug 15, 14:00", description: "Shipment in transit via A4 highway.", completed: true },
      { title: "Dispatched from Hub", date: "Aug 14, 08:30", description: "Package dispatched from the main sorting hub in Colombo.", completed: true },
      { title: "Order Processed", date: "Aug 13, 11:00", description: "Order confirmed and packed. Ready for dispatch.", completed: true },
      { title: "Order Placed", date: "Aug 13, 09:00", description: "Payment successful. Awaiting fulfillment.", completed: true },
      { title: "Estimated Delivery", date: "Est. Aug 17", description: "Batticaloa Depot, Sri Lanka", completed: false },
    ],
  },
  {
    shipment_id: "SHP-3017",
    invoice_id: "INV-1046",
    quote_id: "QT-009",
    origin: "Colombo Hub",
    destination: "Trincomalee Port",
    status: "Delivered",
    estimated_delivery: "2026-08-12",
    date_created: "2026-08-14",
    last_updated: "2026-08-12T15:00:00",
    events: [
      { title: "Delivered", date: "Aug 12, 15:00", description: "Package successfully delivered to Trincomalee Port.", completed: true },
      { title: "Out for Delivery", date: "Aug 12, 06:30", description: "Shipment is out for final delivery.", completed: true },
      { title: "Dispatched from Hub", date: "Aug 10, 09:00", description: "Package dispatched from Colombo.", completed: true },
      { title: "Order Placed", date: "Aug 09, 14:00", description: "Payment successful. Awaiting fulfillment.", completed: true },
    ],
  },
  {
    shipment_id: "SHP-3016",
    invoice_id: "INV-1047",
    quote_id: "QT-011",
    origin: "Colombo Hub",
    destination: "Negombo Facility",
    status: "In Transit",
    estimated_delivery: "2026-08-19",
    date_created: "2026-08-15",
    last_updated: "2026-08-16T16:00:00",
    events: [
      { title: "Dispatched from Hub", date: "Aug 16, 16:00", description: "Package dispatched from the main sorting hub in Colombo.", completed: true },
      { title: "Order Processed", date: "Aug 15, 14:00", description: "Order confirmed and packed. Ready for dispatch.", completed: true },
      { title: "Order Placed", date: "Aug 15, 10:30", description: "Payment successful. Awaiting fulfillment.", completed: true },
      { title: "Estimated Delivery", date: "Est. Aug 19", description: "Negombo Facility, Sri Lanka", completed: false },
    ],
  },
];

const statusConfig: Record<Shipment["status"], { bg: string; text: string; border: string; dot: string; label: string }> = {
  "In Transit":       { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500",   label: "In Transit" },
  "Delivered":        { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500",  label: "Delivered" },
  "Processing":       { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200",  dot: "bg-amber-500",  label: "Processing" },
  "Out for Delivery": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500", label: "Out for Delivery" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function TrackingPage() {
  // Sort by date_created desc; most recently created shipment is index 0
  const sorted = useMemo(
    () => [...shipmentData].sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()),
    []
  );

  const [selectedId, setSelectedId] = useState<string>(sorted[0].shipment_id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const shipment = sorted.find((s) => s.shipment_id === selectedId)!;
  const sc = statusConfig[shipment.status];
  const completedEvents = shipment.events.filter((e) => e.completed);
  const totalSteps = shipment.events.length;
  const progress = Math.round((completedEvents.length / totalSteps) * 100);

  return (
    <div className="p-6 sm:p-8 h-full flex flex-col gap-6 overflow-y-auto">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Tracking</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Real-time visibility into your shipments.</p>
        </div>

        {/* Shipment Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-3 h-11 px-4 rounded-xl bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 shadow-sm hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-orange-100/60 hover:shadow-md transition-all duration-200 text-sm font-medium text-neutral-800 dark:text-neutral-100 min-w-[220px]"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${sc.dot} ${shipment.status === "In Transit" || shipment.status === "Out for Delivery" ? "animate-pulse" : ""}`} />
              <span className="truncate">{shipment.shipment_id}</span>
              <span className="text-neutral-400 dark:text-neutral-500 shrink-0">·</span>
              <span className="text-neutral-500 dark:text-neutral-400 truncate text-xs">{shipment.destination}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-72 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-neutral-100 dark:border-zinc-700">
                  <p className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Select Shipment</p>
                </div>
                <ul className="py-1 max-h-64 overflow-y-auto">
                  {sorted.map((s) => {
                    const ssc = statusConfig[s.status];
                    const isActive = s.shipment_id === selectedId;
                    return (
                      <li key={s.shipment_id}>
                        <button
                          onClick={() => { setSelectedId(s.shipment_id); setDropdownOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${isActive ? "bg-orange-50 dark:bg-orange-950/30" : "hover:bg-neutral-50 dark:hover:bg-zinc-700"}`}
                        >
                          <div className={`w-2 h-2 rounded-full shrink-0 ${ssc.dot}`} />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isActive ? "text-orange-700 dark:text-orange-400" : "text-neutral-800 dark:text-neutral-200"}`}>{s.shipment_id}</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{s.origin} → {s.destination}</p>
                          </div>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${ssc.bg} ${ssc.text}`}>{ssc.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Main Content: two columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 flex-1 min-h-0">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-5 min-h-0">

          {/* Shipment Info Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/70 dark:border-zinc-700/60 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Shipment ID</p>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">{shipment.shipment_id}</h2>
              </div>
              <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
                <span className={`w-2 h-2 rounded-full ${sc.dot} ${shipment.status === "In Transit" || shipment.status === "Out for Delivery" ? "animate-pulse" : ""}`} />
                {sc.label}
              </span>
            </div>

            {/* Meta grid */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: Hash,     label: "Invoice",      value: shipment.invoice_id },
                { icon: FileText, label: "Quote",        value: shipment.quote_id },
                { icon: Calendar, label: "Est. Delivery", value: formatDate(shipment.estimated_delivery) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-neutral-50 dark:bg-zinc-800 rounded-xl p-3 border border-neutral-100 dark:border-zinc-700">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                    <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Delivery Progress</span>
                <span className="text-xs font-bold text-orange-600">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-neutral-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Route Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/70 dark:border-zinc-700/60 shadow-sm p-6 flex-1">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">Route & History</h3>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">{completedEvents.length} of {totalSteps} checkpoints</span>
            </div>

            {/* Origin → Destination banner */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/40 mb-6">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-300 shrink-0" />
                <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">{shipment.origin}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-400 shrink-0" />
              <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate text-right">{shipment.destination}</span>
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-orange-200 via-neutral-200 to-neutral-100" />

              <div className="space-y-1">
                {shipment.events.map((event, idx) => (
                  <div key={idx} className="relative flex gap-4 pb-5 last:pb-0">
                    {/* Icon */}
                    <div className={`relative z-10 w-8 h-8 rounded-full shrink-0 flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-sm ${
                      event.completed ? "bg-orange-500" : "bg-neutral-100 dark:bg-zinc-800 border-neutral-200 dark:border-zinc-700"
                    }`}>
                      {event.completed
                        ? <CheckCircle2 className="w-4 h-4 text-white" />
                        : <MapPin className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                      }
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-0.5 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <span className={`text-sm font-semibold ${event.completed ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}`}>
                          {event.title}
                        </span>
                        <span className={`text-xs font-medium shrink-0 ${event.completed ? "text-neutral-500 dark:text-neutral-400" : "text-neutral-400 dark:text-neutral-500"}`}>
                          {event.date}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 leading-relaxed ${event.completed ? "text-neutral-500 dark:text-neutral-400" : "text-neutral-400 dark:text-neutral-500"}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-5 min-h-0">

          {/* Map Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/70 dark:border-zinc-700/60 shadow-sm overflow-hidden flex-1 flex flex-col min-h-[320px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-zinc-700/60">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Route Map</h3>
              <span className={`flex items-center gap-1.5 text-xs font-medium ${sc.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${shipment.status === "In Transit" || shipment.status === "Out for Delivery" ? "animate-pulse" : ""}`} />
                {sc.label}
              </span>
            </div>

            {/* Map + overlay */}
            <div className="relative flex-1 bg-neutral-100 dark:bg-zinc-800 min-h-[240px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1011854.767570417!2d79.52187063836262!3d7.502075752319089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1716900000000!5m2!1sen!2sus"
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isDark ? "opacity-90" : "opacity-70"}`}
                style={{ border: 0, ...(isDark ? {} : { mixBlendMode: "multiply" as const }) }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* SVG route path overlay */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <svg className="w-full h-full" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}>
                  <defs>
                    <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 80 210 C 140 180, 200 140, 300 80"
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="3"
                    strokeDasharray="10 6"
                    style={{ animation: "dash 18s linear infinite" }}
                  />
                </svg>
                <style>{`@keyframes dash { to { stroke-dashoffset: -1000; } }`}</style>
              </div>

              {/* Origin dot */}
              <div className="absolute z-20 flex flex-col items-center" style={{ left: 72, top: 202, transform: "translate(-50%,-50%)" }}>
                <div className="w-4 h-4 rounded-full bg-white border-[3px] border-neutral-800 shadow-md" />
                <div className="mt-1 bg-white/95 backdrop-blur px-2 py-0.5 rounded-md shadow text-[10px] font-bold text-neutral-800 whitespace-nowrap">
                  {shipment.origin}
                </div>
              </div>

              {/* Vehicle indicator */}
              {shipment.status === "Processing" ? (
                <div className="absolute z-20 flex flex-col items-center animate-pulse" style={{ left: 110, top: 185, transform: "translate(-50%,-50%)" }}>
                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-amber-500 shadow-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
              ) : shipment.status === "Delivered" ? (
                <div className="absolute z-20 flex flex-col items-center" style={{ left: 300, top: 75, transform: "translate(-50%,-50%)" }}>
                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-green-500 shadow-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              ) : (
                <div className="absolute z-20 flex flex-col items-center" style={{ left: 200, top: 140, transform: "translate(-50%,-50%)" }}>
                  {/* Truck bubble */}
                  <div className="relative animate-bounce">
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1 mb-1.5 shadow-md ${
                      shipment.status === "Out for Delivery" ? "bg-purple-600" : "bg-blue-600"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {sc.label}
                    </div>
                    <div className={`w-11 h-11 rounded-full bg-white border-[3px] shadow-lg flex items-center justify-center mx-auto ${
                      shipment.status === "Out for Delivery" ? "border-purple-500" : "border-blue-500"
                    }`}>
                      <Truck className={`w-5 h-5 ${shipment.status === "Out for Delivery" ? "text-purple-600" : "text-blue-600"}`} />
                    </div>
                  </div>
                </div>
              )}

              {/* Destination pin */}
              <div className="absolute z-20 flex flex-col items-center" style={{ left: 296, top: 70, transform: "translate(-50%,-50%)" }}>
                <MapPin className="w-8 h-8 text-red-500 drop-shadow" />
                <div className="mt-0.5 bg-white/95 backdrop-blur px-2 py-0.5 rounded-md shadow text-[10px] font-bold text-neutral-800 whitespace-nowrap">
                  {shipment.destination}
                </div>
              </div>
            </div>

            {/* Map footer */}
            <div className="px-5 py-3 border-t border-neutral-100 dark:border-zinc-700/60 flex items-center justify-between bg-neutral-50/60 dark:bg-zinc-800/60">
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{shipment.origin}</span>
                <ArrowRight className="w-3 h-3" />
                <span>{shipment.destination}</span>
              </div>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium">Sri Lanka</span>
            </div>
          </div>

          {/* Snapshot Stats Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/70 dark:border-zinc-700/60 shadow-sm p-5">
            <h3 className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">Shipment Snapshot</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Status",        value: sc.label,                       color: sc.text },
                { label: "Checkpoints",   value: `${completedEvents.length}/${totalSteps}`, color: "text-neutral-800 dark:text-neutral-100" },
                { label: "Invoice",       value: shipment.invoice_id,            color: "text-neutral-800 dark:text-neutral-100" },
                { label: "Est. Delivery", value: formatDate(shipment.estimated_delivery), color: "text-neutral-800 dark:text-neutral-100" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-xl bg-neutral-50 dark:bg-zinc-800 border border-neutral-100 dark:border-zinc-700 p-3">
                  <p className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 mb-1">{label}</p>
                  <p className={`text-sm font-bold ${color} truncate`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
