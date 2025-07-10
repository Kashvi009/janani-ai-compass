import React, { useState, useEffect } from 'react';
import { User, Calendar, Heart, Phone, Activity, Save } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { toast } from '@/hooks/use-toast';

export const ProfileEditor = () => {
  const { profile, updateProfile, loading } = useProfile();
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    height_cm: '',
    weight_kg: '',
    pregnancy_week: '',
    due_date: '',
    has_pcos: false,
    blood_type: '',
    doctor_name: '',
    doctor_phone: '',
    emergency_contact_name: '',
    emergency_contact_phone: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        age: profile.age?.toString() || '',
        height_cm: profile.height_cm?.toString() || '',
        weight_kg: profile.weight_kg?.toString() || '',
        pregnancy_week: profile.pregnancy_week?.toString() || '',
        due_date: profile.due_date || '',
        has_pcos: profile.has_pcos || false,
        blood_type: profile.blood_type || '',
        doctor_name: profile.doctor_name || '',
        doctor_phone: profile.doctor_phone || '',
        emergency_contact_name: profile.emergency_contact_name || '',
        emergency_contact_phone: profile.emergency_contact_phone || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updateData: any = {
        full_name: formData.full_name || null,
        age: formData.age ? parseInt(formData.age) : null,
        height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        pregnancy_week: formData.pregnancy_week ? parseInt(formData.pregnancy_week) : null,
        due_date: formData.due_date || null,
        has_pcos: formData.has_pcos,
        blood_type: formData.blood_type || null,
        doctor_name: formData.doctor_name || null,
        doctor_phone: formData.doctor_phone || null,
        emergency_contact_name: formData.emergency_contact_name || null,
        emergency_contact_phone: formData.emergency_contact_phone || null
      };

      await updateProfile(updateData);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
          <p className="text-gray-600">Complete your profile for personalized care</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Age"
              min="18"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              name="height_cm"
              value={formData.height_cm}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Height in cm"
              min="140"
              max="200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              name="weight_kg"
              value={formData.weight_kg}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Weight in kg"
              min="40"
              max="150"
              step="0.1"
            />
          </div>
        </div>

        {/* Pregnancy Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Heart className="h-5 w-5 text-pink-500 mr-2" />
            Pregnancy Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Week</label>
              <input
                type="number"
                name="pregnancy_week"
                value={formData.pregnancy_week}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Current week"
                min="1"
                max="42"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
              <select
                name="blood_type"
                value={formData.blood_type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="has_pcos"
                id="has_pcos"
                checked={formData.has_pcos}
                onChange={handleInputChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="has_pcos" className="text-sm font-medium text-gray-700">
                I have PCOS/PCOD
              </label>
            </div>
          </div>
        </div>

        {/* Medical Contacts */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Phone className="h-5 w-5 text-pink-500 mr-2" />
            Medical Contacts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name</label>
              <input
                type="text"
                name="doctor_name"
                value={formData.doctor_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Dr. Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Phone</label>
              <input
                type="tel"
                name="doctor_phone"
                value={formData.doctor_phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Doctor's phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
              <input
                type="text"
                name="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Emergency contact name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
              <input
                type="tel"
                name="emergency_contact_phone"
                value={formData.emergency_contact_phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Emergency contact phone"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};