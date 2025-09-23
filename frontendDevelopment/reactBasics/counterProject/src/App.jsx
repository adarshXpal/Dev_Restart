import { useState } from 'react'
import { Card } from './components/Card';
import './App.css'
export default function App() {
  const features = [
    {
      title: "AI-Powered Assistant",
      description:
        "Get intelligent suggestions and automate repetitive tasks with our advanced AI technology.",
      image: "https://picsum.photos/400/250?random=4",
      badge: "New",
      badgeColor: "bg-green-500",
    },
    {
      title: "Real-time Collaboration",
      description:
        "Work together seamlessly with your team, no matter where they are in the world.",
      image: "https://picsum.photos/400/250?random=5",
      badge: "Popular",
      badgeColor: "bg-blue-500",
    },
    {
      title: "Custom Integrations",
      description:
        "Connect with your favorite tools and services through our extensive API ecosystem.",
      image: "https://picsum.photos/400/250?random=6",
      badge: null,
    },
    {
      title: "Mobile Experience",
      description:
        "Stay productive on the go with our fully-featured mobile applications.",
      image: "https://picsum.photos/400/250?random=7",
      badge: "Beta",
      badgeColor: "bg-purple-500",
    },
    {
      title: "Advanced Reporting",
      description:
        "Generate detailed reports and insights to make data-driven decisions.",
      image: "https://picsum.photos/400/250?random=8",
      badge: null,
    },
    {
      title: "Template Library",
      description:
        "Get started quickly with our collection of professionally designed templates.",
      image: "https://picsum.photos/400/250?random=9",
      badge: "Updated",
      badgeColor: "bg-orange-500",
    },
  ];

  const myArr=[12,23,44,54,454];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Feature-Rich Platform
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to succeed, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card feature={feature} index={index}/> 
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}

