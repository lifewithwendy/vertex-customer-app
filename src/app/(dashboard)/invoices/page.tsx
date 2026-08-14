"use client";

import React, { useState } from "react";
import { Search, Eye, Download, X, Clock, CreditCard, Truck, MapPin, Package, CheckCircle2, CalendarDays } from "lucide-react";
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
  status: "Unpaid" | "Paid" | "Rescheduled";
  rescheduled_date?: string;
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
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
    },
    {
      invoice_id: "INV-1044",
      quote_id: "QT-005",
      date_created: "2026-08-12",
      base_amount: 3200,
      additional_charges: [],
      status: "Rescheduled",
      rescheduled_date: "2026-08-25",
    },
    {
      invoice_id: "INV-1045",
      quote_id: "QT-007",
      date_created: "2026-08-13",
      base_amount: 8100,
      additional_charges: [
        { description: "Late Fee", amount: 50 },
      ],
      status: "Unpaid",
    },
    {
      invoice_id: "INV-1046",
      quote_id: "QT-009",
      date_created: "2026-08-14",
      base_amount: 5000,
      additional_charges: [],
      status: "Paid",
    },
    {
      invoice_id: "INV-1047",
      quote_id: "QT-011",
      date_created: "2026-08-15",
      base_amount: 2800,
      additional_charges: [],
      status: "Unpaid",
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentInvoice, setPaymentInvoice] = useState<Invoice | null>(null);
  const [trackingInvoice, setTrackingInvoice] = useState<Invoice | null>(null);
  const [rescheduleInvoice, setRescheduleInvoice] = useState<Invoice | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState("");

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
                        <div className="flex flex-col items-start gap-1">
                          <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                            inv.status === 'Paid' ? 'bg-green-100 text-green-700' 
                            : inv.status === 'Rescheduled' ? 'bg-blue-100 text-blue-700' 
                            : 'bg-red-100 text-red-700'
                          }`}>
                            {inv.status}
                          </span>
                          {inv.status === 'Rescheduled' && inv.rescheduled_date && (
                            <span className="text-[10px] text-neutral-500 font-medium">To: {inv.rescheduled_date}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                            title="View Invoice"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setTrackingInvoice(inv)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-purple-500 hover:bg-purple-50 transition-colors"
                            title="Track Shipment"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                          {inv.status === "Unpaid" && (
                            <>
                              <button 
                                onClick={() => { setRescheduleInvoice(inv); setNewRescheduleDate(""); }}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                                title="Reschedule Payment"
                              >
                                <CalendarDays className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setPaymentInvoice(inv)}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-green-500 hover:bg-green-50 transition-colors"
                                title="Make Payment"
                              >
                                <CreditCard className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
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
                  selectedInvoice.status === 'Paid' ? 'bg-green-100 text-green-700' 
                  : selectedInvoice.status === 'Rescheduled' ? 'bg-blue-100 text-blue-700'
                  : 'bg-red-100 text-red-700'
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

      {/* Payment Modal */}
      {paymentInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPaymentInvoice(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-900">Make Payment</h2>
              <button onClick={() => setPaymentInvoice(null)} className="text-neutral-400 hover:text-neutral-600 transition-colors rounded-lg p-1 hover:bg-neutral-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
               <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center border border-orange-100">
                  <span className="text-sm font-medium text-orange-900">Amount Due</span>
                  <span className="text-xl font-bold text-orange-700">LKR {calculateTotal(paymentInvoice).toLocaleString()}</span>
               </div>
               
               <div className="space-y-3 pt-2">
                 <div>
                   <label className="text-xs font-medium text-neutral-700 mb-1 block">Cardholder Name</label>
                   <Input placeholder="John Doe" className="bg-neutral-50" />
                 </div>
                 <div>
                   <label className="text-xs font-medium text-neutral-700 mb-1 block">Card Number</label>
                   <div className="relative">
                     <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                     <Input placeholder="0000 0000 0000 0000" className="pl-9 bg-neutral-50" />
                   </div>
                 </div>
                 <div className="flex gap-3">
                   <div className="flex-1">
                     <label className="text-xs font-medium text-neutral-700 mb-1 block">Expiry</label>
                     <Input placeholder="MM/YY" className="bg-neutral-50" />
                   </div>
                   <div className="flex-1">
                     <label className="text-xs font-medium text-neutral-700 mb-1 block">CVC</label>
                     <Input placeholder="123" type="password" className="bg-neutral-50" />
                   </div>
                 </div>
               </div>
            </div>

            <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-3">
              <Button type="button" onClick={() => setPaymentInvoice(null)} variant="outline" className="rounded-full px-5 h-10 border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700">
                Cancel
              </Button>
              <Button type="button" onClick={() => { alert("Payment Successful!"); setPaymentInvoice(null); }} className="rounded-full px-6 h-10 bg-green-600 hover:bg-green-700 text-white border-0 shadow-sm">
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {trackingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTrackingInvoice(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-orange-500" /> Track Shipment
                </h2>
                <p className="text-sm text-neutral-500 mt-1">Invoice ID: {trackingInvoice.invoice_id} &bull; Quote ID: {trackingInvoice.quote_id}</p>
              </div>
              <button onClick={() => setTrackingInvoice(null)} className="text-neutral-400 hover:text-neutral-600 transition-colors rounded-lg p-1 hover:bg-neutral-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-0 overflow-y-auto">
              {/* Map/Progress Visualizer */}
              <div className="bg-neutral-100 relative overflow-hidden flex items-center justify-center border-b border-neutral-200 h-64">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1011854.767570417!2d79.52187063836262!3d7.502075752319089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1716900000000!5m2!1sen!2sus" 
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-multiply"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Path Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                  <div className="relative w-full max-w-sm h-full flex items-center justify-center">
                    
                    {/* SVG Path connecting points */}
                    <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}>
                      <path 
                        d="M 120 180 Q 200 120 280 80" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="4" 
                        strokeDasharray="8 8" 
                        className="animate-[dash_20s_linear_infinite]"
                      />
                    </svg>
                    
                    <style>{`
                      @keyframes dash {
                        to {
                          stroke-dashoffset: -1000;
                        }
                      }
                    `}</style>
                    
                    {/* Origin Pin */}
                    <div className="absolute flex flex-col items-center" style={{ left: '120px', top: '180px', transform: 'translate(-50%, -50%)' }}>
                       <div className="w-4 h-4 bg-white border-4 border-neutral-800 rounded-full shadow-md z-10 relative"></div>
                       <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-neutral-800 absolute top-5 whitespace-nowrap">
                         Colombo Hub
                       </div>
                    </div>
                    
                    {/* Truck on Path */}
                    <div className="absolute flex flex-col items-center animate-bounce z-20" style={{ left: '190px', top: '135px', transform: 'translate(-50%, -50%)' }}>
                       <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-4 border-blue-500 shadow-lg shadow-blue-500/30">
                          <Truck className="w-4 h-4 text-blue-600" />
                       </div>
                       <div className="bg-blue-600 px-2 py-1 rounded-full shadow-md text-[10px] font-bold text-white absolute -top-8 whitespace-nowrap flex items-center gap-1">
                         <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                         In Transit
                       </div>
                    </div>

                    {/* Destination Pin */}
                    <div className="absolute flex flex-col items-center" style={{ left: '280px', top: '80px', transform: 'translate(-50%, -50%)' }}>
                       <div className="relative">
                         <MapPin className="w-8 h-8 text-red-500 drop-shadow-md z-10 relative" />
                         <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/20 rounded-full blur-[2px] z-0"></div>
                       </div>
                       <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-neutral-800 absolute top-8 whitespace-nowrap">
                         Destination
                       </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Tracking History */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-neutral-900 mb-6 uppercase tracking-wider">Tracking History</h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
                  {/* Event 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-orange-100 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-neutral-900 text-sm">Dispatched from Hub</span>
                        <span className="text-xs text-neutral-500 font-medium">Aug 12, 14:30</span>
                      </div>
                      <p className="text-sm text-neutral-600">Package has been dispatched from the main sorting hub in Colombo.</p>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-orange-100 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-neutral-900 text-sm">Order Processed</span>
                        <span className="text-xs text-neutral-500 font-medium">Aug 10, 09:15</span>
                      </div>
                      <p className="text-sm text-neutral-600">Order confirmed and packed. Ready for dispatch.</p>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-orange-100 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-neutral-900 text-sm">Order Placed</span>
                        <span className="text-xs text-neutral-500 font-medium">Aug 08, 16:45</span>
                      </div>
                      <p className="text-sm text-neutral-600">Payment successful. Awaiting fulfillment.</p>
                    </div>
                  </div>
                  
                  {/* Event 4 (Future) */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-neutral-100 text-neutral-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-transparent p-4 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-neutral-400 text-sm">Estimated Delivery</span>
                        <span className="text-xs text-neutral-400 font-medium">Est. Aug 14</span>
                      </div>
                      <p className="text-sm text-neutral-400">Customer Address, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex justify-end">
              <Button type="button" onClick={() => setTrackingInvoice(null)} className="rounded-full px-6 h-10 bg-neutral-900 hover:bg-neutral-800 text-white border-0 shadow-sm">
                Close Tracker
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setRescheduleInvoice(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-900">Reschedule Payment</h2>
              <button onClick={() => setRescheduleInvoice(null)} className="text-neutral-400 hover:text-neutral-600 transition-colors rounded-lg p-1 hover:bg-neutral-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
               <p className="text-sm text-neutral-600">Please select a new date to schedule your payment for Invoice <strong>{rescheduleInvoice.invoice_id}</strong>.</p>
               
               <div>
                 <label className="text-xs font-medium text-neutral-700 mb-1 block">New Payment Date</label>
                 <Input 
                   type="date" 
                   value={newRescheduleDate} 
                   onChange={(e) => setNewRescheduleDate(e.target.value)} 
                   className="bg-neutral-50" 
                 />
               </div>
            </div>

            <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-3">
              <Button type="button" onClick={() => setRescheduleInvoice(null)} variant="outline" className="rounded-full px-5 h-10 border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700">
                Cancel
              </Button>
              <Button 
                type="button" 
                disabled={!newRescheduleDate}
                onClick={() => { 
                  setInvoices(invoices.map(inv => 
                    inv.invoice_id === rescheduleInvoice.invoice_id 
                      ? { ...inv, status: "Rescheduled", rescheduled_date: newRescheduleDate } 
                      : inv
                  ));
                  setRescheduleInvoice(null);
                }} 
                className="rounded-full px-6 h-10 bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-sm"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
