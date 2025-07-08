'use client';

import { useState } from 'react';
import { FaHospital, FaTint, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

type Establishment = {
    name: string;
    location: string;
};

const bloodBanks: Establishment[] = [
    { name: 'Hope Blood Bank', location: 'Colombo 1' },
    { name: 'Asha Blood Bank', location: 'Colombo 4' },
    { name: 'Azis Nations Blood Bank', location: 'Wellawatte' },
    { name: 'Blood Bank 1', location: 'Dehiwala' },
];

const hospitals: Establishment[] = [
    { name: 'General Hospital', location: 'Colombo 10' },
    { name: 'Asiri Surgical', location: 'Colombo 5' },
    { name: 'Lanka Hospital', location: 'Narahenpita' },
    { name: 'Durdans Hospital', location: 'Colombo 3' },
];

export default function EstablishmentsPage() {
    const [activeTab, setActiveTab] = useState<'bloodBanks' | 'hospitals'>('bloodBanks');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [establishments, setEstablishments] = useState({
        bloodBanks: [...bloodBanks],
        hospitals: [...hospitals]
    });
    const [newEstablishment, setNewEstablishment] = useState({
        name: '',
        location: '',
        type: activeTab
    });

    const filteredList = (list: Establishment[]) => {
        return list.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const renderList = (list: Establishment[]) =>
        filteredList(list).map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow">
                <h3 className="text-gray-800 font-semibold">{item.name}</h3>
                <div className="flex items-center mt-1 text-gray-500 text-sm">
                    <FaMapMarkerAlt className="mr-1 text-blue-500" />
                    <span>{item.location}</span>
                </div>
            </div>
        ));
        
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: Establishment = {
            name: newEstablishment.name,
            location: newEstablishment.location
        };
        
        setEstablishments(prev => ({
            ...prev,
            [newEstablishment.type]: [...prev[newEstablishment.type], newItem]
        }));
        
        setNewEstablishment({ name: '', location: '', type: activeTab });
        setShowModal(false);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">

            <div className="bg-white rounded-lg shadow p-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('bloodBanks')}
                            className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition ${
                                activeTab === 'bloodBanks' ? 'bg-[#FB7373] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <FaTint className="mr-2" />
                            Blood Banks
                        </button>
                        <button
                            onClick={() => setActiveTab('hospitals')}
                            className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition ${
                                activeTab === 'hospitals' ? 'bg-[#FB7373] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <FaHospital className="mr-2" />
                            Hospitals
                        </button>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
                <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-900">
                    {activeTab === 'bloodBanks' ? 
                        <><FaTint className="mr-2 text-red-600" /> Blood Banks</> : 
                        <><FaHospital className="mr-2 text-red-600" /> Hospitals</>
                    }
                </h2>

                {filteredList(activeTab === 'bloodBanks' ? establishments.bloodBanks : establishments.hospitals).length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No establishments found matching your search.</p>
                ) : (
                    <div>{activeTab === 'bloodBanks' ? renderList(establishments.bloodBanks) : renderList(establishments.hospitals)}</div>
                )}
            </div>
        </div>
    );
}