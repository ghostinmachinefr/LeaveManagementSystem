import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/user/LeaveRequestsTable.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const LeaveRequestsTable = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodayRequests = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_URL}/v1/userpage/today-requests`);
            
            if (response.data.success) {
                setRequests(response.data.data);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
            setError('Failed to fetch today\'s requests');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodayRequests();
    }, []);

    const handleCancel = (requestId) => {
        setRequests(requests.filter(request => request.ID !== requestId));
    };

    if (isLoading) {
        return (
            <div className={styles.leaveRequestsTable}>
                <h2>Today&apos;s Leave Requests</h2>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.leaveRequestsTable}>
                <h2>Today&apos;s Leave Requests</h2>
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

    return (
        <div className={styles.leaveRequestsTable}>
            <h2>Today&apos;s Leave Requests</h2>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Type</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Requested On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <tr key={request.ID}>
                                    <td>{request.ID}</td>
                                    <td>{request.type}</td>
                                    <td>{new Date(request.from).toLocaleDateString()}</td>
                                    <td>{new Date(request.to).toLocaleDateString()}</td>
                                    <td>{new Date(request.takenOn).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            className={styles.deleteButton}
                                            onClick={() => handleCancel(request.ID)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className={styles.noData}>
                                    No leave requests for today
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveRequestsTable;