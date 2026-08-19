"use client";

import React, { useState } from "react";
import { Search, Plus, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Inquiry = {
  inquiry_id: string;
  start_location: string;
  end_location: string;
  pickup_date: string;
  pickup_time: string;
  weight: string;
  vehicle_type: "20" | "40";
  vehicle_count: number;
  cargo_type: string;
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      inquiry_id: "INQ-001",
      start_location: "New York, NY",
      end_location: "Los Angeles, CA",
      pickup_date: "2026-08-15",
      pickup_time: "10:00",
      weight: "15000 kg",
      vehicle_type: "40",
      vehicle_count: 2,
      cargo_type: "Electronics",
    },
    {
      inquiry_id: "INQ-002",
      start_location: "Chicago, IL",
      end_location: "Houston, TX",
      pickup_date: "2026-08-18",
      pickup_time: "14:30",
      weight: "22000 kg",
      vehicle_type: "20",
      vehicle_count: 3,
      cargo_type: "Machinery",
    },
    {
      inquiry_id: "INQ-003",
      start_location: "Miami, FL",
      end_location: "Seattle, WA",
      pickup_date: "2026-08-20",
      pickup_time: "08:15",
      weight: "8000 kg",
      vehicle_type: "20",
      vehicle_count: 1,
      cargo_type: "Textiles",
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    start_location: "",
    end_location: "",
    pickup_date: "",
    pickup_time: "",
    weight: "",
    vehicle_type: "20",
    vehicle_count: 1,
    cargo_type: "",
  });

  const filteredInquiries = inquiries.filter((inq) => 
    inq.inquiry_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.start_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.end_location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: Inquiry = {
      inquiry_id: `INQ-${String(inquiries.length + 1).padStart(3, '0')}`,
      start_location: formData.start_location,
      end_location: formData.end_location,
      pickup_date: formData.pickup_date,
      pickup_time: formData.pickup_time,
      weight: formData.weight,
      vehicle_type: formData.vehicle_type as "20" | "40",
      vehicle_count: formData.vehicle_count,
      cargo_type: formData.cargo_type,
    };
    setInquiries([...inquiries, newInquiry]);
    setIsModalOpen(false);
    setFormData({
      start_location: "",
      end_location: "",
      pickup_date: "",
      pickup_time: "",
      weight: "",
      vehicle_type: "20",
      vehicle_count: 1,
      cargo_type: "",
    });
  };

  return (
    <div className="p-6 sm:p-10 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Inquiries</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Manage and track your freight inquiries.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm border-0">
          <Plus className="w-4 h-4" />
          Create Inquiry
        </Button>
      </div>

      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/60 dark:border-zinc-700/60 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-200/60 dark:border-zinc-700/60 flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <Input 
              placeholder="Search by ID or Location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 bg-neutral-50/50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-neutral-100 dark:placeholder:text-neutral-500 rounded-xl border-neutral-200 focus-visible:ring-orange-500/30 w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50/80 dark:bg-zinc-800/80 sticky top-0 uppercase tracking-wider font-medium">
              <tr>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Inquiry ID</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Route</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Pickup</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Cargo Details</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Vehicles</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => (
                  <tr key={inq.inquiry_id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">{inq.inquiry_id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-neutral-900 dark:text-neutral-100">{inq.start_location}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">to {inq.end_location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-neutral-900 dark:text-neutral-100">{inq.pickup_date}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{inq.pickup_time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-neutral-900 dark:text-neutral-100">{inq.cargo_type}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{inq.weight}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300">
                        {inq.vehicle_count}x {inq.vehicle_type}ft
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 dark:text-neutral-400">
                    No inquiries found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 dark:border dark:border-zinc-700/60">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-zinc-700/60">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Create New Inquiry</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors rounded-lg p-1 hover:bg-neutral-100 dark:hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-5 overflow-y-auto max-h-[75vh]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-neutral-500 dark:text-neutral-400">Start Location</Label>
                    <Input required value={formData.start_location} onChange={(e) => setFormData({...formData, start_location: e.target.value})} className="h-10 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-neutral-100 dark:placeholder:text-neutral-500" placeholder="e.g. New York, NY" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-neutral-500 dark:text-neutral-400">End Location</Label>
                    <Input required value={formData.end_location} onChange={(e) => setFormData({...formData, end_location: e.target.value})} className="h-10 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-neutral-100 dark:placeholder:text-neutral-500" placeholder="e.g. Los Angeles, CA" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-neutral-500 dark:text-neutral-400">Pickup Date</Label>
                    <Input type="date" required value={formData.pickup_date} onChange={(e) => setFormData({...formData, pickup_date: e.target.value})} className="h-10 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-neutral-100" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-neutral-500 dark:text-neutral-400">Pickup Time</Label>
                    <Input type="time" required value={formData.pickup_time} onChange={(e) => setFormData({...formData, pickup_time: e.target.value})} className="h-10 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-neutral-100" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-neutral-500 dark:text-neutral-400">Cargo Type</Label>
                    <Input required value={formData.cargo_type} onChange={(e) => setFormData({...formData, cargo_type: e.target.value})} className="h-10 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-neutral-100 dark:placeholder:text-neutral-500" placeholder="e.g. Electronics" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-neutral-500 dark:text-neutral-400">Total Weight</Label>
                    <Input required value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="h-10 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-neutral-100 dark:placeholder:text-neutral-500" placeholder="e.g. 15000 kg" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-neutral-500 dark:text-neutral-400">Vehicle Type</Label>
                    <select 
                      required 
                      value={formData.vehicle_type} 
                      onChange={(e) => setFormData({...formData, vehicle_type: e.target.value as "20" | "40"})}
                      className="flex h-10 w-full rounded-xl border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="20">20ft Container</option>
                      <option value="40">40ft Container</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-neutral-500 dark:text-neutral-400">Vehicle Count</Label>
                    <Input type="number" min="1" required value={formData.vehicle_count} onChange={(e) => setFormData({...formData, vehicle_count: parseInt(e.target.value) || 1})} className="h-10 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-neutral-100" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Button type="button" onClick={() => setIsModalOpen(false)} className="rounded-full px-5 h-10 bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-zinc-700 shadow-none">Cancel</Button>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-5 h-10 border-0">Submit Inquiry</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)} />
          <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 dark:border dark:border-zinc-700/60">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-zinc-700/60">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Inquiry {selectedInquiry.inquiry_id}</h2>
              <button onClick={() => setSelectedInquiry(null)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors rounded-lg p-1 hover:bg-neutral-100 dark:hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="bg-neutral-50 dark:bg-zinc-800 p-4 rounded-xl space-y-3">
                <div>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">Route</span>
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">{selectedInquiry.start_location} <span className="text-neutral-400 mx-1">→</span> {selectedInquiry.end_location}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">Pickup Schedule</span>
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">{selectedInquiry.pickup_date} at {selectedInquiry.pickup_time}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-neutral-100 dark:border-zinc-700 p-3 rounded-xl">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">Cargo</span>
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">{selectedInquiry.cargo_type}</p>
                </div>
                <div className="border border-neutral-100 dark:border-zinc-700 p-3 rounded-xl">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">Weight</span>
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">{selectedInquiry.weight}</p>
                </div>
                <div className="border border-neutral-100 dark:border-zinc-700 p-3 rounded-xl col-span-2">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">Vehicles Required</span>
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">{selectedInquiry.vehicle_count}x {selectedInquiry.vehicle_type}ft Containers</p>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-neutral-100 dark:border-zinc-700/60 bg-neutral-50/50 dark:bg-zinc-800/50 flex justify-end">
              <Button type="button" onClick={() => setSelectedInquiry(null)} className="rounded-full px-5 h-9 bg-white dark:bg-zinc-700 border border-neutral-200 dark:border-zinc-600 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-zinc-600 shadow-sm">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
