'use client';

import { useState } from 'react';
import { FaHospital, FaTint, FaSearch, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

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
                    <FaMapMarkerAlt className="mr-1 text-red-500" />
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
            <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>Pages</span>
                <span className="mx-2">/</span>
                <span className="text-gray-700">Establishments</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Establishments</h1>
                <button 
                    onClick={() => setShowModal(true)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
                >
                    <IoMdAdd className="mr-1" size={18} />
                    Add New
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('bloodBanks')}
                            className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition ${
                                activeTab === 'bloodBanks' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <FaTint className="mr-2" />
                            Blood Banks
                        </button>
                        <button
                            onClick={() => setActiveTab('hospitals')}
                            className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition ${
                                activeTab === 'hospitals' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                            className="pl-9 pr-4 py-2 w-full border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
                <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-900">
                    {activeTab === 'bloodBanks' ? 
                        <><FaTint className="mr-2 text-red-600" /> Blood Banks</> : 
                        <><FaHospital className="mr-2 text-blue-600" /> Hospitals</>
                    }
                </h2>

                {filteredList(activeTab === 'bloodBanks' ? establishments.bloodBanks : establishments.hospitals).length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No establishments found matching your search.</p>
                ) : (
                    <div>{activeTab === 'bloodBanks' ? renderList(establishments.bloodBanks) : renderList(establishments.hospitals)}</div>
                )}
            </div>

            {/* Add New Establishment Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Add New Establishment</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Establishment Type
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center text-gray-700">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={newEstablishment.type === 'bloodBanks'}
                                            onChange={() => setNewEstablishment({...newEstablishment, type: 'bloodBanks'})}
                                            className="mr-2"
                                        />
                                        <FaTint className="mr-1 text-red-600" />
                                        Blood Bank
                                    </label>
                                    <label className="flex items-center text-gray-700">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={newEstablishment.type === 'hospitals'}
                                            onChange={() => setNewEstablishment({...newEstablishment, type: 'hospitals'})}
                                            className="mr-2"
                                        />
                                        <FaHospital className="mr-1 text-blue-600" />
                                        Hospital
                                    </label>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={newEstablishment.name}
                                    onChange={(e) => setNewEstablishment({...newEstablishment, name: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={newEstablishment.location}
                                    onChange={(e) => setNewEstablishment({...newEstablishment, location: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                            
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Add Establishment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}