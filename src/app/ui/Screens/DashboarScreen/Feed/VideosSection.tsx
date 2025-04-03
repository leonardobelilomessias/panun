import React from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import CardEvent from '@/app/public/images/feed/Rectangle 7.png';

// Define TypeScript interfaces
interface VideoType {
  id: number;
  title: string;
  thumbnail: StaticImageData;
}

function VideosSection() {
  const videos: VideoType[] = [
    {
      id: 1,
      title: "Portugal Travel Vlog",
      thumbnail: CardEvent
    },
    {
      id: 2,
      title: "Japan Travel Vlog",
      thumbnail: CardEvent
    },
    {
      id: 3,
      title: "Valencia Travel Guide",
      thumbnail: CardEvent
    },
    {
      id: 4,
      title: "Travel Vlog",
      thumbnail: CardEvent
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Videos</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">Ver todos</button>
      </div>
      
      {/* Desktop Grid (hidden on mobile) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map(function(video) {
          return (
            <div 
              key={video.id} 
              className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black bg-opacity-50 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{video.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile Horizontal Scroll (visible only on mobile) */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 pb-4 w-max">
          {videos.map(function(video) {
            return (
              <div 
                key={video.id} 
                className="w-64 flex-shrink-0 relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z" />
                    </svg>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{video.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

VideosSection.displayName = 'VideosSection';

export default VideosSection;