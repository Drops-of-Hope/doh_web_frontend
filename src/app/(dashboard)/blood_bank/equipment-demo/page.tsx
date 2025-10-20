"use client";

import React from 'react';
import { BloodEquipmentList } from '@/components';
import { FaTools, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

/**
 * Demo page showing different usage examples of the BloodEquipmentList component
 * 
 * To access this page, navigate to:
 * http://localhost:3000/blood_bank/equipment-demo
 */
export default function BloodEquipmentDemo() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FaTools className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Blood Equipment List - Component Demo
          </h1>
        </div>
        <p className="text-gray-600">
          Various usage examples of the reusable BloodEquipmentList component
        </p>
      </div>

      <div className="space-y-8">
        {/* Example 1: All Equipment */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                Example 1
              </span>
              All Equipment (Default)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {'<BloodEquipmentList />'}
              </code>
            </p>
          </div>
          <BloodEquipmentList />
        </section>

        {/* Example 2: Operational Only */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">
                Example 2
              </span>
              <FaCheckCircle className="text-green-600" />
              Operational Equipment Only
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {'<BloodEquipmentList statusFilter="OPERATIONAL" />'}
              </code>
            </p>
          </div>
          <BloodEquipmentList statusFilter="OPERATIONAL" />
        </section>

        {/* Example 3: Maintenance Only */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-mono">
                Example 3
              </span>
              <FaClock className="text-yellow-600" />
              Equipment Under Maintenance
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {'<BloodEquipmentList statusFilter="MAINTENANCE" />'}
              </code>
            </p>
          </div>
          <BloodEquipmentList statusFilter="MAINTENANCE" />
        </section>

        {/* Example 4: Decommissioned Only */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">
                Example 4
              </span>
              <FaExclamationTriangle className="text-red-600" />
              Decommissioned Equipment
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {'<BloodEquipmentList statusFilter="DECOMMISSIONED" />'}
              </code>
            </p>
          </div>
          <BloodEquipmentList statusFilter="DECOMMISSIONED" />
        </section>

        {/* Example 5: Limited Display */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-mono">
                Example 5
              </span>
              Limited Display (Top 3)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {'<BloodEquipmentList limit={3} />'}
              </code>
            </p>
          </div>
          <BloodEquipmentList limit={3} />
        </section>

        {/* Example 6: No Actions Column */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm font-mono">
                Example 6
              </span>
              Without Actions Column
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {'<BloodEquipmentList showActions={false} limit={5} />'}
              </code>
            </p>
          </div>
          <BloodEquipmentList showActions={false} limit={5} />
        </section>

        {/* Example 7: Read-Only (No Interaction) */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                Example 7
              </span>
              Read-Only Mode (No Clicks)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {'<BloodEquipmentList enableRowClick={false} showActions={false} limit={3} />'}
              </code>
            </p>
          </div>
          <BloodEquipmentList 
            enableRowClick={false} 
            showActions={false} 
            limit={3} 
          />
        </section>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 Component Features
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✅ Fetches data from API: <code className="bg-blue-100 px-1 rounded">http://localhost:5000/api/blood-equipment</code></li>
            <li>✅ Automatic loading and error states</li>
            <li>✅ Filter by status: OPERATIONAL, MAINTENANCE, DECOMMISSIONED</li>
            <li>✅ Limit number of displayed items</li>
            <li>✅ Toggle actions column and row click navigation</li>
            <li>✅ Fully typed with TypeScript (no implicit any)</li>
            <li>✅ Zero lint errors</li>
          </ul>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">📚 Documentation</h4>
            <p className="text-sm text-blue-800">
              See <code className="bg-blue-100 px-1 rounded">BLOOD_EQUIPMENT_LIST_COMPONENT.md</code> for full documentation and more examples.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
