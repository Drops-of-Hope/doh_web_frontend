import React from "react";

// Avatar component with hardcoded initials
export const Avatar = ({ size = 50 }) => {
  return (
    <div 
      className="bg-gray-400 rounded-full flex items-center justify-center text-white font-medium"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      NN
    </div>
  );
};

// Dummy data
export const dummyDonors = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 123-456-7890",
    bloodType: "O+",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1 987-654-3210",
    bloodType: "A-",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phoneNumber: "+1 555-123-4567",
    bloodType: "B+",
    status: "Inactive",
  },
];

export const dummyBloodBanks = [
  {
    id: "1",
    name: "Central Blood Bank",
    location: "Downtown Medical District",
    contact: "+1 555-123-4567",
  },
  {
    id: "2",
    name: "LifeSource Blood Services",
    location: "North Side",
    contact: "+1 555-789-0123",
  },
  {
    id: "3",
    name: "Regional Blood Center",
    location: "West Medical Complex",
    contact: "+1 555-456-7890",
  },
];

export const dummyHospitals = [
  {
    id: "1",
    name: "General Hospital",
    location: "City Center",
    type: "General Care",
  },
  {
    id: "2",
    name: "St. Mary's Medical Center",
    location: "East District",
    type: "Specialized Care",
  },
  {
    id: "3",
    name: "Children's Hospital",
    location: "South Campus",
    type: "Pediatric Care",
  },
];