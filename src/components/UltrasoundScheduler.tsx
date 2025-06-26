
import React, { useState } from 'react';
import { Calendar, Upload, Bell, CheckCircle, AlertTriangle, Plus, FileText } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'missed';
  notes?: string;
  reportUploaded?: boolean;
}

export const UltrasoundScheduler = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'First Trimester Scan',
      status: 'completed',
      reportUploaded: true,
      notes: 'Heartbeat detected, everything looks normal'
    },
    {
      id: '2',
      date: '2024-02-20',
      time: '2:30 PM',
      type: 'Anatomy Scan',
      status: 'upcoming',
      reportUploaded: false
    },
    {
      id: '3',
      date: '2024-01-10',
      time: '11:00 AM',
      type: 'Early Pregnancy Scan',
      status: 'missed',
      reportUploaded: false
    }
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    type: ''
  });

  const handleFileUpload = (appointmentId: string, file: File) => {
    setUploadingFor(appointmentId);
    
    // Simulate upload process
    setTimeout(() => {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, reportUploaded: true, status: 'completed' as const }
          : apt
      ));
      setUploadingFor(null);
      setSelectedFile(null);
      
      // Show success message
      alert(`Ultrasound report uploaded successfully for ${file.name}`);
    }, 2000);
  };

  const handleAddAppointment = () => {
    if (newAppointment.date && newAppointment.time && newAppointment.type) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        ...newAppointment,
        status: new Date(newAppointment.date) > new Date() ? 'upcoming' : 'completed',
        reportUploaded: false
      };
      
      setAppointments(prev => [...prev, appointment]);
      setNewAppointment({ date: '', time: '', type: '' });
      setShowAddForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'missed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'upcoming': return <Bell className="h-4 w-4" />;
      case 'missed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const missedAppointments = appointments.filter(apt => apt.status === 'missed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Ultrasound Scheduler
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Track your ultrasound appointments and upload reports for comprehensive pregnancy monitoring.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 text-center">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              {appointments.filter(apt => apt.status === 'completed').length}
            </h3>
            <p className="text-sm text-gray-600">Completed Scans</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 text-center">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              {upcomingAppointments.length}
            </h3>
            <p className="text-sm text-gray-600">Upcoming Scans</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 text-center">
            <div className="bg-red-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              {missedAppointments.length}
            </h3>
            <p className="text-sm text-gray-600">Missed Scans</p>
          </div>
        </div>

        {/* Add New Appointment */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Schedule New Appointment</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {showAddForm && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select scan type</option>
                  <option value="Early Pregnancy Scan">Early Pregnancy Scan</option>
                  <option value="First Trimester Scan">First Trimester Scan</option>
                  <option value="Anatomy Scan">Anatomy Scan</option>
                  <option value="Growth Scan">Growth Scan</option>
                  <option value="Doppler Scan">Doppler Scan</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <button
                  onClick={handleAddAppointment}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Appointments Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">Appointment Timeline</h3>
          
          <div className="space-y-4">
            {appointments
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)} flex items-center space-x-1`}>
                      {getStatusIcon(appointment.status)}
                      <span className="capitalize">{appointment.status}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">{appointment.type}</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </div>
                </div>

                {appointment.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">{appointment.notes}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    {appointment.reportUploaded ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Report uploaded</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No report uploaded</span>
                    )}
                  </div>

                  {!appointment.reportUploaded && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            handleFileUpload(appointment.id, file);
                          }
                        }}
                        className="hidden"
                        id={`file-${appointment.id}`}
                      />
                      <label
                        htmlFor={`file-${appointment.id}`}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all cursor-pointer flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>
                          {uploadingFor === appointment.id ? 'Uploading...' : 'Upload Report'}
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-pink-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No appointments scheduled</h3>
              <p className="text-gray-500">Add your first ultrasound appointment to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
