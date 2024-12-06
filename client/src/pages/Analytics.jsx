import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Example dummy data for the past 5 days
const data = [
  { day: 'Day 1', stress: 3, happiness: 4, focus: 2, energy: 5, calmness: 3 },
  { day: 'Day 2', stress: 4, happiness: 3, focus: 3, energy: 4, calmness: 4 },
  { day: 'Day 3', stress: 2, happiness: 5, focus: 4, energy: 3, calmness: 5 },
  { day: 'Day 4', stress: 3, happiness: 2, focus: 4, energy: 4, calmness: 3 },
  { day: 'Day 5', stress: 4, happiness: 3, focus: 5, energy: 2, calmness: 4 }
];

const Analytics = () => {
  return (
    <div className="analytics-container" style={{ padding: '20px' }}>
      <h1>Analytics</h1>
      <div className="charts">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Pastel colors for each metric */}
            <Bar dataKey="stress" fill="#f8d7da" />  {/* Pastel Red */}
            <Bar dataKey="happiness" fill="#fff3b0" />  {/* Pastel Yellow */}
            <Bar dataKey="focus" fill="#cce7ff" />  {/* Pastel Blue */}
            <Bar dataKey="energy" fill="#d1f7d1" />  {/* Pastel Green */}
            <Bar dataKey="calmness" fill="#e1bee7" />  {/* Pastel Purple */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
