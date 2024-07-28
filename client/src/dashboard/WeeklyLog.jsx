import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeeklyLog = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get('http://localhost:5174/api/logs/weekly');
        setWeeklyData(response.data);
      } catch (error) {
        console.error('Error fetching weekly log data', error);
        setError('Failed to fetch weekly log data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  if (!Array.isArray(weeklyData)) {
    return <div className="container mx-auto p-4">Error: Data is not in the correct format</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Weekly Log</h2>
      {weeklyData.map((week, index) => (
        <div key={index} className="p-4 border rounded-lg shadow mb-4">
          <h3 className="text-lg font-bold">Week {week.weekNumber}</h3>
          <p>Total Sales: {week.totalSales}</p>
          <p>Total Products: {week.totalProducts}</p>
          <p>Products Left: {week.leftProducts}</p>
          <p>Total Profit: ${week.totalProfit}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyLog;
