"use client";

import React, { useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import { useGetDonorsQuery } from '@/store/api/donorsApi';
import normalizeDonor from '@/lib/donorUtils';

export default function DonorsListPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: donorsResp, isLoading, isError } = useGetDonorsQuery();

  // donors API may return an array or { data: [...] } depending on backend; normalize
  const donorsData = React.useMemo(() => {
    if (!donorsResp) return [];
    if (Array.isArray(donorsResp)) return donorsResp;
    // assume shape { data: Donor[] }
    return (donorsResp as any).data ?? [];
  }, [donorsResp]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return donorsData;
    return donorsData.filter((d: any) =>
      (d.name ?? '').toString().toLowerCase().includes(q) ||
      (d.bloodGroup ?? '').toString().toLowerCase().includes(q) ||
      (d.contact ?? '').toString().includes(q) ||
      (d.city ?? '').toString().toLowerCase().includes(q)
    );
  }, [query, donorsData]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // build 7-day donation summary from normalized lastDonationRaw values
  const donationSummary: { date: Date; count: number }[] = React.useMemo(() => {
    // days: today and previous 6 days
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i)); // oldest first
      d.setHours(0, 0, 0, 0);
      return d;
    });

    const counts = days.map((day) => 0);

    for (const raw of donorsData) {
      const norm = normalizeDonor(raw) as any;
      const rawDate = norm.lastDonationRaw ? new Date(norm.lastDonationRaw) : null;
      if (!rawDate || isNaN(rawDate.getTime())) continue;
      rawDate.setHours(0, 0, 0, 0);
      for (let i = 0; i < days.length; i++) {
        if (rawDate.getTime() === days[i].getTime()) counts[i]++;
      }
    }

    return days.map((d, i) => ({ date: d, count: counts[i] }));
  }, [donorsData]);

  // chart layout constants
  const padding = 60;
  const viewW = 700; // matches SVG viewBox width
  const chartW = Math.max(220, viewW - padding * 2);
  const chartH = 100;
  const slotCount = donationSummary.length || 1;
  const slotWidth = chartW / slotCount;
  // make the gap proportional to slot width so bars don't stretch oddly
  const gap = Math.max(6, Math.round(slotWidth * 0.12));
  const barWidth = Math.max(10, Math.round(slotWidth - gap));
  const maxCount = Math.max(...donationSummary.map((s) => s.count), 1);
  const gridLines = 4;
  const colors = ['url(#grad1)', 'url(#grad2)', 'url(#grad3)', 'url(#grad1)', 'url(#grad2)', 'url(#grad3)', 'url(#grad1)'];

  return (
    <div className="min-h-[60vh] p-6 bg-[#f8f8f8]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-gray-800 font-bold">All Donors</h1>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by name, blood group, contact or city"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800">Donation Badge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800">Points</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-sm text-gray-500">Loading donors…</td>
                </tr>
              )}
              {isError && !isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-sm text-red-600">Failed to load donors. Please try again later.</td>
                </tr>
              )}
              {paged.map((raw: any) => {
                const d = normalizeDonor(raw);
                return (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{d.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{d.bloodGroup}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {d.donationBadge}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{d.pointsEarned ?? '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {filtered.length} result(s)</div>
          <div className="flex items-center gap-2">
            <Button
              title="Prev"
              containerStyles={`px-3 py-1 text-gray-600 rounded-md border border-gray-200 bg-white ${page === 1 ? 'opacity-50' : ''}`}
              handleClick={() => setPage((p) => Math.max(1, p - 1))}
            />
            <div className="px-3 py-1 text-sm">
              {page} / {pageCount}
            </div>
            <Button
              title="Next"
              containerStyles={`px-3 py-1 text-gray-600 rounded-md border border-gray-200 bg-white ${page === pageCount ? 'opacity-50' : ''}`}
              handleClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            />
          </div>
        </div>

        {/* Donations summary chart (last 7 days) */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mt-6">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Donations (last 7 days)</h3>
            <p className="text-sm text-gray-500 mt-1">Daily donation counts - Visual Summary</p>
          </div>
          <div className="p-6">
            <div className="w-full flex justify-center">
              <div className="w-full max-w-[700px]">
                <div className="w-full overflow-x-auto">
                  <svg width="100%" height="180" viewBox="0 0 700 180" preserveAspectRatio="xMinYMin meet">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                {/* grid lines */}
                {
                  [...Array(gridLines + 1)].map((_, i) => {
                    // i=0 -> top (max), i=gridLines -> bottom (0)
                    const y = 40 + (chartH / gridLines) * i;
                    const label = Math.round((maxCount / gridLines) * (gridLines - i));
                    return (
                      <g key={`grid-${i}`}>
                        <line x1={padding} x2={padding + chartW} y1={y} y2={y} stroke="#e6eef8" strokeWidth={1} />
                        <text x={padding - 12} y={y + 4} fontSize={10} textAnchor="end" fill="#9CA3AF">{label}</text>
                      </g>
                    );
                  })
                }

                {/* bars */}
                {
                  donationSummary.map((s: { date: Date; count: number }, idx: number) => {
                    // center the bar inside its slot so spacing is even regardless of container width
                    const x = padding + idx * slotWidth + (slotWidth - barWidth) / 2;
                    const h = maxCount > 0 ? (s.count / maxCount) * chartH : 0;
                    const y = 40 + (chartH - h);
                    const label = s.date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
                    return (
                      <g key={`bar-${idx}`}>
                        <rect x={x} y={y} width={barWidth} height={h} fill={colors[idx % colors.length]} rx={6} />
                        <text x={x + barWidth / 2} y={y - 8} fontSize={12} textAnchor="middle" fill="#374151" fontWeight={600}>{s.count}</text>
                        <text x={x + barWidth / 2} y={40 + chartH + 18} fontSize={11} textAnchor="middle" fill="#6B7280">{label}</text>
                      </g>
                    );
                  })
                }
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

