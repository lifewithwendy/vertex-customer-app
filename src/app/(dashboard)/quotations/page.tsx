"use client";

import React, { useState } from "react";
import { Search, Eye, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Quotation = {
  quote_id: string;
  inquiry_id: string;
  start_location: string;
  end_location: string;
  date: string;
  quoted_amount: number;
  status: "Pending" | "Confirmed";
  details: string;
};

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      quote_id: "QT-001",
      inquiry_id: "INQ-001",
      start_location: "New York, NY",
      end_location: "Los Angeles, CA",
      date: "2026-08-14",
      quoted_amount: 4500,
      status: "Pending",
      details: "Standard rate for 40ft container including basic insurance.",
    },
    {
      quote_id: "QT-002",
      inquiry_id: "INQ-002",
      start_location: "Chicago, IL",
      end_location: "Houston, TX",
      date: "2026-08-12",
      quoted_amount: 6200,
      status: "Confirmed",
      details: "Expedited shipping for 3x 20ft containers.",
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);

  const filteredQuotes = quotations.filter((q) => 
    q.quote_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.inquiry_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.start_location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirmQuote = () => {
    if (!selectedQuote) return;
    setQuotations(quotations.map(q => 
      q.quote_id === selectedQuote.quote_id ? { ...q, status: "Confirmed" } : q
    ));
    setSelectedQuote({ ...selectedQuote, status: "Confirmed" });
  };

  return (
    <div className="p-6 sm:p-10 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Quotations</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Review and approve your freight quotations.</p>
        </div>
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
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Quote ID</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Inquiry ID</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Route</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Date Issued</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Amount</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80">Status</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 dark:border-zinc-700/80 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <tr key={quote.quote_id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">{quote.quote_id}</td>
                    <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">{quote.inquiry_id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-neutral-900 dark:text-neutral-100">{quote.start_location}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">to {quote.end_location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">{quote.date}</td>
                    <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-neutral-100">LKR {quote.quoted_amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        quote.status === 'Confirmed' 
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' 
                          : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                      }`}>
                        {quote.status === 'Confirmed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedQuote(quote)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
                        title="View Quote"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500 dark:text-neutral-400">
                    No quotations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedQuote(null)} />
          <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 dark:border dark:border-zinc-700/60">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-zinc-700/60">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Quotation {selectedQuote.quote_id}</h2>
              <button onClick={() => setSelectedQuote(null)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors rounded-lg p-1 hover:bg-neutral-100 dark:hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="bg-neutral-50 dark:bg-zinc-800 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">Linked Inquiry</span>
                   <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{selectedQuote.inquiry_id}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200/60 dark:border-zinc-700/60">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">Route</span>
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">{selectedQuote.start_location} <span className="text-neutral-400 mx-1">→</span> {selectedQuote.end_location}</p>
                </div>
              </div>
              
              <div className="border border-neutral-100 dark:border-zinc-700 p-4 rounded-xl space-y-2">
                 <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">Quote Details</span>
                 <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedQuote.details}</p>
              </div>

              <div className="bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-orange-600/80 dark:text-orange-400/80 uppercase tracking-wider block mb-1">Total Quoted Amount</span>
                  <span className="text-2xl font-bold text-orange-700 dark:text-orange-400">LKR {selectedQuote.quoted_amount.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">Status</span>
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        selectedQuote.status === 'Confirmed' ? 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40' : 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40'
                  }`}>{selectedQuote.status}</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-neutral-100 dark:border-zinc-700/60 bg-neutral-50/50 dark:bg-zinc-800/50 flex justify-end gap-3">
              <Button type="button" onClick={() => setSelectedQuote(null)} className="rounded-full px-5 h-9 bg-white dark:bg-zinc-700 border border-neutral-200 dark:border-zinc-600 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-zinc-600 shadow-sm">Close</Button>
              {selectedQuote.status === "Pending" && (
                <Button onClick={handleConfirmQuote} className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-5 h-9 border-0">
                  Confirm Quotation
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
