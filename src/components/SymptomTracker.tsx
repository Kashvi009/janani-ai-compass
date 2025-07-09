import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useSymptomLogger } from '@/hooks/useSymptomLogger';
import { useGameification } from '@/hooks/useGameification';
import { Trash2, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const COMMON_SYMPTOMS = [
  'Nausea', 'Fatigue', 'Headache', 'Back Pain', 'Heartburn', 
  'Constipation', 'Swelling', 'Dizziness', 'Mood Changes', 'Sleep Issues'
];

export const SymptomTracker = () => {
  const [symptomType, setSymptomType] = useState('');
  const [severity, setSeverity] = useState([5]);
  const [notes, setNotes] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  
  const { symptoms, loading, logSymptom, deleteSymptom, getSymptomTrends } = useSymptomLogger();
  const { addPoints } = useGameification();

  const handleLogSymptom = async () => {
    if (!symptomType.trim()) return;
    
    setIsLogging(true);
    await logSymptom(symptomType, severity[0], notes);
    await addPoints(10, 'logging a symptom');
    
    // Reset form
    setSymptomType('');
    setSeverity([5]);
    setNotes('');
    setIsLogging(false);
  };

  const trends = getSymptomTrends();

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'bg-green-100 text-green-800';
    if (severity <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getSeverityLabel = (severity: number) => {
    if (severity <= 3) return 'Mild';
    if (severity <= 6) return 'Moderate';
    return 'Severe';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Log New Symptom */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-pink-500" />
            Log Symptom
          </CardTitle>
          <CardDescription>
            Track how you're feeling today. Your wellness journey matters! 🌸
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Symptom Type</Label>
            <Input
              placeholder="e.g., Nausea, Headache, Back pain..."
              value={symptomType}
              onChange={(e) => setSymptomType(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {COMMON_SYMPTOMS.map((symptom) => (
                <Button
                  key={symptom}
                  variant="outline"
                  size="sm"
                  onClick={() => setSymptomType(symptom)}
                  className="text-xs"
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Severity (1-10)</Label>
            <div className="px-3">
              <Slider
                value={severity}
                onValueChange={setSeverity}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Mild (1)</span>
                <span className="font-medium">Current: {severity[0]}</span>
                <span>Severe (10)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              placeholder="Any additional details about this symptom..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={handleLogSymptom}
            disabled={!symptomType.trim() || isLogging}
            className="w-full"
          >
            {isLogging ? 'Logging...' : 'Log Symptom (+10 points)'}
          </Button>
        </CardContent>
      </Card>

      {/* Trends Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            7-Day Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">{trends.totalEntries}</div>
              <div className="text-sm text-gray-600">Entries Logged</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{trends.averageSeverity}</div>
              <div className="text-sm text-gray-600">Avg Severity</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{trends.mostCommon || 'None'}</div>
              <div className="text-sm text-gray-600">Most Common</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Recent Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          {symptoms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No symptoms logged yet.</p>
              <p className="text-sm">Start tracking your wellness journey above! 🌿</p>
            </div>
          ) : (
            <div className="space-y-3">
              {symptoms.slice(0, 10).map((symptom) => (
                <div key={symptom.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{symptom.symptom_type}</span>
                      <Badge className={getSeverityColor(symptom.severity)}>
                        {getSeverityLabel(symptom.severity)} ({symptom.severity})
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(symptom.recorded_at), 'MMM d, yyyy - h:mm a')}
                    </div>
                    {symptom.notes && (
                      <div className="text-sm text-gray-600 mt-1">{symptom.notes}</div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSymptom(symptom.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};