import React from 'react';
import { Heart, ArrowUp, ArrowDown, Clock } from 'lucide-react';
import { MetricCard } from '@/components';

export default function RequestPage() {
  return (
    <div className="min-h-[100vh] p-4 bg-[#f8f8f8]">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          iconBgColor="#EF4444"
          heading="Total Requests"
          body="All blood requests"
          count={127}
          icon={<Heart className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#F59E0B"
          heading="Incoming Requests"
          body="From hospitals & banks"
          count={89}
          icon={<ArrowDown className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#10B981"
          heading="Outgoing Requests"
          body="To donors & facilities"
          count={38}
          icon={<ArrowUp className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#8B5CF6"
          heading="In Transit"
          body="Currently being delivered"
          count={23}
          icon={<Clock className="w-6 h-6 text-white" />}
        />
      </div>
    </div>
  );
}