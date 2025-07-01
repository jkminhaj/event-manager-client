import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return (
        <div className="bg-white text-gray-800">

            <section className="px-6 py-16 rounded text-center bg-gradient-to-r from-[#5f45ba] to-[#4e3ba1] text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan. Manage. Celebrate.</h1>
                <p className="max-w-xl mx-auto text-lg">
                    Welcome to EventSphere — your all-in-one platform to organize, join, and explore events.
                </p>
                <div className="mt-6">
                    <Link to={user ? "/events" :"/signin"}>
                        <button className="cursor-pointer rounded-xl bg-white text-[#5f45ba] font-semibold px-6 py-3 hover:bg-gray-100 transition">
                            Explore Events
                        </button>
                    </Link>
                </div>
            </section>


            <section className="px-6 py-16 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#5f45ba]">What You Can Do</h2>
                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Create Events",
                            desc: "Easily host events with detailed info, attendee limits, and more.",
                            
                        },
                        {
                            title: "Join Events",
                            desc: "Browse exciting events and join with one click — it’s that simple.",
                            
                        },
                        {
                            title: "Manage Attendees",
                            desc: "Track attendees and keep your events organized in real-time.",
            
                        }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-[#5e45ba1e] p-6 text-center shadow-sm hover:shadow-md transition"
                        >
                            {/* <div className="text-4xl mb-3">{item.icon}</div> */}
                            <h3 className="text-xl font-semibold text-[#5f45ba] mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            <section className="px-6 py-16 bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#5f45ba]">What People Say</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Arif Hasan",
                            quote: "EventSphere made organizing our tech meetup effortless. Highly recommended!"
                        },
                        {
                            name: "Nusrat Jahan",
                            quote: "I found and joined 3 events in one week! So smooth and user-friendly."
                        },
                        {
                            name: "Rafiul Islam",
                            quote: "Managing attendees and tracking progress has never been easier."
                        }
                    ].map((t, i) => (
                        <div key={i} className="rounded-xl bg-white p-6 shadow text-sm text-gray-700">
                            <p className="mb-3">“{t.quote}”</p>
                            <span className="block font-semibold text-[#5f45ba]">{t.name}</span>
                        </div>
                    ))}
                </div>
            </section>


            <section className="px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#5f45ba]">Ready to get started?</h2>
                <p className="mb-6 text-gray-600">Sign up today and turn your ideas into memorable events.</p>
                <Link to="/signup">
                    <button className="cursor-pointer rounded-xl bg-[#5f45ba] text-white font-semibold px-6 py-3 hover:bg-[#4e3ba1] transition">
                        Create an Account
                    </button>
                </Link>
            </section>
        </div>

    );
};

export default Home;