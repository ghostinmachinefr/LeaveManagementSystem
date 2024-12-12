import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TopNavBar from '@/components/TopNavBar';
import SideNavBar from '@/components/user/SideNavBar';
import styles from '@/styles/user/history.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const ENDPOINT = '/v1/history';

const History = () => {
  const [user] = useState({
    name: "User",
    email: "user@domain.com",
    profilePicture: "/profile.png"
  });

  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const [activePopup, setActivePopup] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    sapId: '',
    startDate: '',
    endDate: ''
  });

  // New state for date filters
  const [dateFilters, setDateFilters] = useState({
    startDate: '',
    endDate: ''
  });

  const handleSearchClick = (popupType) => {
    setActivePopup(popupType);
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  const handleExport = () => {
    console.log("Exporting to Excel...");
  };

  const handleApplySearch = (type, value) => {
    setSearchFilters(prev => ({
      ...prev,
      ...value
    }));
    setActivePopup(null);
  };

  // New handlers for date filtering
  const handleDateChange = (field, value) => {
    setDateFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyDateFilter = async () => {
    try {
        if (!dateFilters.startDate || !dateFilters.endDate) {
            setError('Please select both start and end dates');
            return;
        }

        setIsLoading(true);
        setError(null);

        console.log('Sending dates:', dateFilters); // Debug log

        const response = await axios.get(`${API_URL}/v1/calendar/filter-by-date`, {
            params: {
                startDate: dateFilters.startDate,
                endDate: dateFilters.endDate
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('Response:', response.data); // Debug log

        if (response.data.success) {
            setHistoryData(response.data.data);
            handleClosePopup();
        } else {
            throw new Error(response.data.message || 'Failed to fetch filtered data');
        }

    } catch (error) {
        console.error('Error filtering dates:', error);
        setError(error.response?.data?.message || error.message || 'Failed to filter dates');
    } finally {
        setIsLoading(false);
    }
};
  
  // Existing checkBackendStatus
  const checkBackendStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/test`, { timeout: 5000 });
      return response.status === 200;
    } catch (error) {
      console.error('Backend check failed:', error.message);
      return false;
    }
  }, []);

  // Existing fetchHistoryData
  const fetchHistoryData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const isBackendUp = await checkBackendStatus();
      if (!isBackendUp) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }

      const response = await axios.get(`${API_URL}${ENDPOINT}`, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = response.data;
      
      if (!data) {
        throw new Error('No data received from server');
      }

      console.log('Received data:', data);
      setHistoryData(Array.isArray(data) ? data : [data]);

    } catch (error) {
      console.error('Error details:', error);
      
      let errorMessage = 'Failed to fetch data. ';
      if (error.code === 'ECONNREFUSED') {
        errorMessage += 'Backend server is not running.';
      } else if (error.code === 'ETIMEDOUT') {
        errorMessage += 'Connection timed out.';
      } else {
        errorMessage += error.message;
      }

      setError(errorMessage);

      if (retryCount < 3) {
        const nextRetry = retryCount + 1;
        console.log(`Retrying... Attempt ${nextRetry} of 3`);
        setRetryCount(nextRetry);
        setTimeout(() => fetchHistoryData(), 2000);
      }
    } finally {
      setIsLoading(false);
    }
  }, [checkBackendStatus, retryCount]);

  const handleRetry = useCallback(() => {
    setRetryCount(0);
    setError(null);
    fetchHistoryData();
  }, [fetchHistoryData]);

  useEffect(() => {
    fetchHistoryData();
    
    return () => {
      setHistoryData([]);
      setIsLoading(false);
      setError(null);
    };
  }, [fetchHistoryData]);

  // New calendar popup render function
  const renderCalendarPopup = () => {
    if (activePopup !== 'calendar') return null;

    return (
      <div className={styles.overlay}>
        <div className={styles.popup}>
          <button 
            className={styles.closeButton}
            onClick={handleClosePopup}
          >
            ×
          </button>
          <h2>Select Date Range</h2>
          <div className={styles.dateSection}>
            <h3>Start Date</h3>
            <input
              type="date"
              value={dateFilters.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              className={styles.dateInput}
            />
            <h3>End Date</h3>
            <input
              type="date"
              value={dateFilters.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              className={styles.dateInput}
              min={dateFilters.startDate}
            />
          </div>
          <button 
            className={styles.doneButton}
            onClick={handleApplyDateFilter}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={styles.dashboard}>
        <TopNavBar user={user} />
        <div className={styles.mainContainer}>
          <SideNavBar activePage="history" />
          <main className={styles.mainContent}>
            <div className={styles.tableContainer}>
              <h1>Request History</h1>
              <div className={styles.loading}>
                <p>Loading... Please wait</p>
                <p>Attempt {retryCount + 1} of 4</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboard}>
        <TopNavBar user={user} />
        <div className={styles.mainContainer}>
          <SideNavBar activePage="history" />
          <main className={styles.mainContent}>
            <div className={styles.tableContainer}>
              <h1>Request History</h1>
              <div className={styles.error}>
                <p>Error: {error}</p>
                <div className={styles.errorDetails}>
                  <p>Possible solutions:</p>
                  <ul>
                    <li>Check if the backend server is running</li>
                    <li>Verify your internet connection</li>
                    <li>Check browser console for detailed errors</li>
                  </ul>
                </div>
                <button 
                  onClick={handleRetry} 
                  className={styles.retryButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Retrying...' : 'Retry'}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <TopNavBar user={user} />
      <div className={styles.mainContainer}>
        <SideNavBar activePage="history" />
        <main className={styles.mainContent}>
          <div className={styles.tableContainer}>
            <h1>Request History</h1>
            <div className={styles.tableActions}>
              <button className={styles.exportButton} onClick={handleExport}>
                Export to Excel
              </button>
              <div className={styles.searchSection}>
                <button 
                  className={styles.searchButton} 
                  onClick={() => handleSearchClick('calendar')}
                >
                  Calendar
                </button>
              </div>
            </div>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Leave Type</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Requested On</th>
                </tr>
              </thead>
              <tbody>
                {historyData && historyData.length > 0 ? (
                  historyData.map((record, index) => (
                    <tr key={index}>
                      <td>{record.ID}</td>
                      <td>{record.type}</td>
                      <td>{record.from}</td>
                      <td>{record.to}</td>
                      <td>{record.takenOn}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      No history data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {renderCalendarPopup()}
    </div>
  );
};

export default History;