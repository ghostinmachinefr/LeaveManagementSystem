import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from '@/styles/user/LeaveRequestsTable.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const LeaveRequestsTable = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = useCallback((dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }, []);

    const fetchTodayRequests = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_URL}/v1/userpage/today-requests`);
            
            if (response.data.success) {
                const formattedRequests = response.data.data.map(request => ({
                    ...request,
                    from: formatDate(request.from),
                    to: formatDate(request.to),
                    takenOn: formatDate(request.takenOn),
                    type: request.type === 'Compensatory Off' ? 'Comp Off' : 
                          request.type === 'Restricted Holiday' ? 'RH' : 
                          request.type
                }));
                setRequests(formattedRequests);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
            setError('Failed to fetch today\'s requests');
        } finally {
            setIsLoading(false);
        }
    }, [formatDate]);

    useEffect(() => {
        fetchTodayRequests();
    }, [fetchTodayRequests]);

    const handleCancel = async (requestId) => {
        try {
            const response = await axios.put(`${API_URL}/v1/leave/cancel/${requestId}`, {
                cancel: "1"
            });
            
            if (response.data.success) {
                setRequests(requests.filter(request => request.ID !== requestId));
            }
        } catch (error) {
            console.error('Error canceling request:', error);
            // You might want to show an error message to the user here
        }
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
                                    <td>{formatDate(request.from)}</td>
                                    <td>{formatDate(request.to)}</td>
                                    <td>{formatDate(request.takenOn)}</td>
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