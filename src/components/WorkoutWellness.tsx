
import React, { useState } from 'react';
import { Play, Clock, Heart, Star, Filter } from 'lucide-react';

interface WorkoutVideo {
  id: string;
  title: string;
  duration: string;
  trimester: 'all' | '1' | '2' | '3';
  type: 'yoga' | 'breathing' | 'exercise' | 'meditation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  description: string;
}

export const WorkoutWellness = () => {
  const [selectedTrimester, setSelectedTrimester] = useState<'all' | '1' | '2' | '3'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'yoga' | 'breathing' | 'exercise' | 'meditation'>('all');

  const workoutVideos: WorkoutVideo[] = [
    {
      id: '1',
      title: 'Gentle Prenatal Yoga Flow',
      duration: '15 min',
      trimester: '1',
      type: 'yoga',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop',
      description: 'Gentle stretches to ease first trimester discomfort and morning sickness.'
    },
    {
      id: '2',
      title: 'Deep Breathing for Relaxation',
      duration: '10 min',
      trimester: 'all',
      type: 'breathing',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      description: 'Calming breathing exercises for stress relief and better sleep.'
    },
    {
      id: '3',
      title: 'Second Trimester Strength Training',
      duration: '20 min',
      trimester: '2',
      type: 'exercise',
      difficulty: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      description: 'Safe strength exercises to maintain muscle tone during pregnancy.'
    },
    {
      id: '4',
      title: 'Labor Preparation Positions',
      duration: '18 min',
      trimester: '3',
      type: 'yoga',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      description: 'Positions and stretches to prepare your body for labor and delivery.'
    },
    {
      id: '5',
      title: 'Mindfulness Meditation',
      duration: '12 min',
      trimester: 'all',
      type: 'meditation',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop',
      description: 'Guided meditation for emotional well-being and bonding with baby.'
    },
    {
      id: '6',
      title: 'Third Trimester Comfort Poses',
      duration: '14 min',
      trimester: '3',
      type: 'yoga',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop',
      description: 'Gentle poses to relieve back pain and prepare for birth.'
    }
  ];

  const filteredVideos = workoutVideos.filter(video => {
    const trimesterMatch = selectedTrimester === 'all' || video.trimester === 'all' || video.trimester === selectedTrimester;
    const typeMatch = selectedType === 'all' || video.type === selectedType;
    return trimesterMatch && typeMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'yoga': return '🧘‍♀️';
      case 'breathing': return '🌬️';
      case 'exercise': return '💪';
      case 'meditation': return '🧠';
      default: return '❤️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Workout & Wellness
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Gentle, safe, and effective exercises designed specifically for your pregnancy journey.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Workouts</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trimester</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All Trimesters' },
                  { value: '1', label: '1st Trimester' },
                  { value: '2', label: '2nd Trimester' },
                  { value: '3', label: '3rd Trimester' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedTrimester(option.value as any)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTrimester === option.value
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All Types' },
                  { value: 'yoga', label: 'Yoga' },
                  { value: 'breathing', label: 'Breathing' },
                  { value: 'exercise', label: 'Exercise' },
                  { value: 'meditation', label: 'Meditation' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedType(option.value as any)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedType === option.value
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                    <Play className="h-6 w-6 text-pink-600 ml-1" />
                  </button>
                </div>
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                    {video.difficulty}
                  </span>
                  <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-800">
                    {getTypeIcon(video.type)} {video.type}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{video.duration}</span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{video.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">{video.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-gray-300 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.0</span>
                  </div>
                  <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                    <Play className="h-3 w-3" />
                    <span>Start</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-pink-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No workouts found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more options.</p>
          </div>
        )}

        {/* Download PDF Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-6 sm:p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Download Offline Workout Plans
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Get PDF versions of our workout routines for offline use. Perfect for when you're away from WiFi or want to print them out.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <button className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
              <h4 className="font-semibold text-gray-800 mb-2">1st Trimester PDF</h4>
              <p className="text-sm text-gray-600">Gentle exercises & yoga poses</p>
            </button>
            <button className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
              <h4 className="font-semibold text-gray-800 mb-2">2nd Trimester PDF</h4>
              <p className="text-sm text-gray-600">Strength & flexibility routines</p>
            </button>
            <button className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
              <h4 className="font-semibold text-gray-800 mb-2">3rd Trimester PDF</h4>
              <p className="text-sm text-gray-600">Birth preparation exercises</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
