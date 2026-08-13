"use client";

import React, { useState } from "react";
import { Search, Eye, Download, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdditionalCharge = {
  description: string;
  amount: number;
};

type Invoice = {
  invoice_id: string;
  quote_id: string;
  date_created: string;
  base_amount: number;
  additional_charges: AdditionalCharge[];
  status: "Unpaid" | "Paid";
};

export default function InvoicesPage() {
  const [invoices] = useState<Invoice[]>([
    {
      invoice_id: "INV-1042",
      quote_id: "QT-001",
      date_created: "2026-08-01",
      base_amount: 4500,
      additional_charges: [
        { description: "Port Storage Fees", amount: 200 },
        { description: "Customs Inspection", amount: 150 },
      ],
      status: "Unpaid",
    },
    {
      invoice_id: "INV-1043",
      quote_id: "QT-002",
      date_created: "2026-08-10",
      base_amount: 6200,
      additional_charges: [],
      status: "Paid",
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const calculateFED = (dateStr: string) => {
    const createdDate = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = (invoice: Invoice) => {
    const additional = invoice.additional_charges.reduce((sum, charge) => sum + charge.amount, 0);
    return invoice.base_amount + additional;
  };

  const filteredInvoices = invoices.filter((inv) => 
    inv.invoice_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.quote_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Invoices</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage and track your final invoices and additional charges.</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-200/60 flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input 
              placeholder="Search by Invoice ID or Quote ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 bg-neutral-50/50 rounded-xl border-neutral-200 focus-visible:ring-orange-500/30 w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-500 bg-neutral-50/80 sticky top-0 uppercase tracking-wider font-medium">
              <tr>
                <th className="px-6 py-4 border-b border-neutral-200/80">Invoice ID</th>
                <th className="px-6 py-4 border-b border-neutral-200/80">Quote ID</th>
                <th className="px-6 py-4 border-b border-neutral-200/80">Date Created</th>
                <th className="px-6 py-4 border-b border-neutral-200/80">FED (Days)</th>
                <th className="px-6 py-4 border-b border-neutral-200/80">Total Amount</th>
                <th className="px-6 py-4 border-b border-neutral-200/80">Status</th>
                <th className="px-6 py-4 border-b border-neutral-200/80 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => {
                  const fed = calculateFED(inv.date_created);
                  return (
                    <tr key={inv.invoice_id} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-neutral-900">{inv.invoice_id}</td>
                      <td className="px-6 py-4 text-neutral-500">{inv.quote_id}</td>
                      <td className="px-6 py-4 text-neutral-700">{inv.date_created}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-amber-600 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {fed} days
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-neutral-900">LKR {calculateTotal(inv).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                          inv.status === 'Paid' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedInvoice(inv)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                          title="View Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedInvoice(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-900">Invoice {selectedInvoice.invoice_id}</h2>
              <button onClick={() => setSelectedInvoice(null)} className="text-neutral-400 hover:text-neutral-600 transition-colors rounded-lg p-1 hover:bg-neutral-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-1">Linked Quote</span>
                  <p className="text-sm font-medium text-neutral-900">{selectedInvoice.quote_id}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-1">Date Created</span>
                  <p className="text-sm font-medium text-neutral-900">{selectedInvoice.date_created}</p>
                  <p className="text-xs text-amber-600 mt-1 flex items-center justify-end gap-1"><Clock className="w-3 h-3"/> FED: {calculateFED(selectedInvoice.date_created)} days</p>
                </div>
              </div>

              <div className="border border-neutral-200/60 rounded-xl overflow-hidden">
                 <div className="bg-neutral-50 p-3 border-b border-neutral-200/60">
                   <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Cost Breakdown</h3>
                 </div>
                 <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-700">Base Quoted Amount</span>
                      <span className="font-medium text-neutral-900">LKR {selectedInvoice.base_amount.toLocaleString()}</span>
                    </div>
                    
                    {selectedInvoice.additional_charges.length > 0 && (
                      <div className="pt-3 border-t border-dashed border-neutral-200 space-y-3">
                        <span className="text-xs font-medium text-neutral-500 uppercase">Additional Charges</span>
                        {selectedInvoice.additional_charges.map((charge, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-neutral-600">{charge.description}</span>
                            <span className="font-medium text-neutral-900">LKR {charge.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
                 <div className="bg-orange-50/50 p-4 border-t border-neutral-200/60 flex justify-between items-center">
                    <span className="text-sm font-semibold text-orange-800">Total Amount</span>
                    <span className="text-xl font-bold text-orange-700">LKR {calculateTotal(selectedInvoice).toLocaleString()}</span>
                 </div>
              </div>
            </div>

            <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
              <span className={`inline-flex px-3 py-1.5 rounded-md text-sm font-semibold ${
                  selectedInvoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {selectedInvoice.status.toUpperCase()}
              </span>
              <div className="flex gap-3">
                <Button type="button" className="rounded-full px-4 h-9 bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
                <Button type="button" onClick={() => setSelectedInvoice(null)} className="rounded-full px-5 h-9 bg-neutral-900 hover:bg-neutral-800 text-white border-0 shadow-sm">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
