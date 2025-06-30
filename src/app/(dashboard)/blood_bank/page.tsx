"use client";
import { Button, StatCard, BloodRequestStats, PieChartWithLegend, BloodRequestsCard } from '@/components'
import { FaTint, FaClock, FaTruck } from 'react-icons/fa'

export default function HomePage() {
  const handleRequestBlood = () => {
    console.log('Request blood button clicked');
  };

  const bloodTypeData = [
    { name: 'O+', value: 45 },
    { name: 'A+', value: 38 },
    { name: 'B+', value: 28 },
    { name: 'AB+', value: 15 },
    { name: 'O-', value: 22 },
    { name: 'A-', value: 18 }
  ];

  const bloodRequests = [
    {
      id: '#BR001',
      patientName: 'John Doe',
      bloodType: 'A+',
      unitsNeeded: 2,
      urgency: 'High',
      hospital: 'City General Hospital',
      location: 'Downtown District',
      contactNumber: '+94 77 123 4567',
      requestTime: '2:15 PM',
      status: 'Pending'
    },
    {
      id: '#BR002',
      patientName: 'Sarah Wilson',
      bloodType: 'O-',
      unitsNeeded: 1,
      urgency: 'Critical',
      hospital: 'Emergency Medical Center',
      location: 'North Side',
      contactNumber: '+94 71 987 6543',
      requestTime: '1:45 PM',
      status: 'Pending'
    },
    {
      id: '#BR003',
      patientName: 'Sarah Wilson',
      bloodType: 'O-',
      unitsNeeded: 1,
      urgency: 'Critical',
      hospital: 'Emergency Medical Center',
      location: 'North Side',
      contactNumber: '+94 71 987 6543',
      requestTime: '1:45 PM',
      status: 'Pending'
    }
  ];

  const emergencyRequests = [
    {
      id: '#ER001',
      bloodType: 'O-',
      unitsNeeded: 3,
      urgency: 'Critical',
      hospital: 'National Hospital',
      location: 'Colombo 07',
      contactNumber: '+94 11 269 1111',
      sentTime: '3:30 PM',
      donorsNotified: 15,
      responses: 3,
      status: 'Active'
    },
    {
      id: '#ER002',
      bloodType: 'AB+',
      unitsNeeded: 2,
      urgency: 'High',
      hospital: 'Teaching Hospital',
      location: 'Peradeniya',
      contactNumber: '+94 81 238 8888',
      sentTime: '2:50 PM',
      donorsNotified: 8,
      responses: 2,
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="text-[#2D3748] flex justify-between">
        <div>
          <h1 className="font-semibold">Hello, Nadhiya</h1>
          <p className="text-s text-gray-500">Your summary for the day</p>
        </div>
        <div className="mt-4">
          <Button
            title="Request Blood"
            containerStyles="bg-[#FB7373] hover:bg-red-400 text-white font-medium rounded-lg font-normal transition-colors duration-200"
            handleClick={handleRequestBlood}
          />
        </div>
      </div>
      
      <div className="flex justify-between gap-4 mt-4">
        <StatCard 
          title="Blood Units" 
          count="247" 
          icon={<FaTint />} 
        />
        <StatCard 
          title="Expiring Soon" 
          count="12" 
          icon={<FaClock />} 
        />
        <StatCard 
          title="In Transit" 
          count="8" 
          icon={<FaTruck />} 
        />
      </div>
      
      <div className='flex justify-between gap-4 mt-4'>
        <BloodRequestStats heading='Weekly Blood Request Overview'/>
        <PieChartWithLegend 
          title="Available Blood Packets"
          data={bloodTypeData}
        />
      </div>
      
      <div className='flex gap-4'>
        <BloodRequestsCard 
          title="Blood Requests Received"
          requests={bloodRequests}
          showEmergencyFormat={false}
        />
        <BloodRequestsCard 
          title="Emergency Requests Sent to Donors"
          requests={emergencyRequests}
          showEmergencyFormat={true}
        />
      </div>
    </div>
  );
}