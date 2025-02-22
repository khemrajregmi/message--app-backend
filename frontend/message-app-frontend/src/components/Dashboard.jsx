import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';

export default function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchMessages();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
    };

    const fetchMessages = async () => {
        const response = await axios.get('/api/messages');
        setMessages(response.data);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <div className="bg-white w-64 min-h-screen shadow">
                    <nav className="mt-4">
                        <Link
                            to="/dashboard/categories"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Categories
                        </Link>
                        <Link
                            to="/dashboard/messages"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Messages
                        </Link>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <Routes>
                        <Route path="categories" element={<Categories categories={categories} />} />
                        <Route path="messages" element={<Messages messages={messages} categories={categories} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
