// Import necessary dependencies
import { useState, useEffect } from 'react';
import TopNavBar from '@/components/TopNavBar';
import SideNavBar from '@/components/user/SideNavBar';
import LeaveCardsGrid from '@/components/user/LeaveCardGrid';
import LeaveRequestsTable from '@/components/user/LeaveRequestsTable';
import styles from '@/styles/user/userpage.module.css';
import { formatDate } from '@/utils/dateFormatter';
import axios from 'axios';
import { API_URL } from '@/config/config';
import api from '@/utils/axios';

/**
 * UserDashboard Component
 * Manages the main dashboard interface for users to view and request leaves
 */
const UserDashboard = () => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // State for user information
  const [user] = useState({
    name: "User",
    email: "user@domain.com",
    profilePicture: "/profile.png"
  });

  // States for managing popups and delete functionality
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  
  // State for managing leave request form
  const [leaveRequest, setLeaveRequest] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  /**
   * Validates if all required fields in the leave request form are filled
   * @returns {boolean} True if form is valid, false otherwise
   */
  const isFormValid = () => {
    return (
      leaveRequest.type !== '' &&
      leaveRequest.startDate !== '' &&
      leaveRequest.endDate !== '' &&
      leaveRequest.reason.trim() !== ''
    );
  };

  // State for leave statistics
  const [leaveStats] = useState({
    fullLeave: { remainingLeaves: 10, usedLeaves: 5, totalLeaves: 15 },
    halfLeave: { remainingLeaves: 8, usedLeaves: 2, totalLeaves: 10 },
    rhLeave: { remainingLeaves: 3, usedLeaves: 0, totalLeaves: 3 },
    compOff: { remainingLeaves: 5, usedLeaves: 1, totalLeaves: 6 }
  });

  // State for leave requests list
  const [leaveRequests] = useState([
    {
      id: 'REQ001',
      dateSent: formatDate('2024-03-15'),
      type: 'Full Leave',
      fromDate: formatDate('2024-03-20'),
      toDate: formatDate('2024-03-21')
    }
  ]);

  /**
   * Event Handlers for Delete Functionality
   */
  const handleDeleteClick = (requestId) => {
    setDeleteRequestId(requestId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting request:', deleteRequestId);
    setShowDeletePopup(false);
    setDeleteRequestId(null);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteRequestId(null);
  };

  /**
   * Event Handlers for Leave Request Functionality
   */
  const handleRequestLeave = () => {
    setShowLeavePopup(true);
  };

  const handleClosePopup = () => {
    setShowLeavePopup(false);
    setLeaveRequest({
      type: '',
      startDate: '',
      endDate: '',
      formattedStartDate: '',
      formattedEndDate: '',
      reason: ''
    });
  };

  const handleSubmitLeave = async () => {
    if (isFormValid()) {
        try {
            const response = await api.post('/v1/leave/request', {
                type: leaveRequest.type,
                startDate: leaveRequest.startDate,
                endDate: leaveRequest.endDate,
                reason: leaveRequest.reason
            });

            if (response.data.success) {
                // Refresh the table data
                if (typeof window !== 'undefined') {
                    window.location.reload();
                }
                handleClosePopup();
            }
        } catch (error) {
            console.error('Error submitting leave request:', error);
            // You might want to show an error message to the user here
        }
    }
  };

  useEffect(() => {
    // Debug code to check localStorage
    const sapId = localStorage.getItem('sapId');
    console.log('Current SAPID in localStorage:', sapId);
    
    // If no SAPID, you might want to set a temporary one for testing
    if (!sapId) {
        console.log('Setting temporary SAPID for testing');
        localStorage.setItem('sapId', '29137562'); // Use a valid SAPID from your database
    }
  }, []);

  // Render Component
  return (
    <div className={styles.dashboard}>
      <TopNavBar user={user} />
      <div className={styles.mainContainer}>
        <SideNavBar activePage="dashboard" />
        <main className={styles.mainContent}>
          {/* Request Leave Button Section */}
          <div className={styles.topSection}>
            <button 
              className={styles.requestLeaveButton}
              onClick={handleRequestLeave}
            >
              Request Leave
            </button>
          </div>
          
          {/* Leave Statistics Cards */}
          <LeaveCardsGrid leaveStats={leaveStats} />
          
          {/* Leave Requests Table */}
          <LeaveRequestsTable 
            requests={leaveRequests}
            onDeleteRequest={handleDeleteClick}
          />

          {/* Delete Confirmation Popup */}
          {showDeletePopup && (
            <div className={styles.overlay}>
              <div className={`${styles.popup} ${styles.deletePopup}`}>
                <h2>Are you sure?</h2>
                <button className={styles.closeButton} onClick={handleCancelDelete}>×</button>
                <div className={styles.deleteActions}>
                  <button 
                    className={`${styles.actionButton} ${styles.noButton}`} 
                    onClick={handleCancelDelete}
                  >
                    No
                  </button>
                  <button 
                    className={`${styles.actionButton} ${styles.yesButton}`} 
                    onClick={handleConfirmDelete}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Leave Request Popup */}
          {showLeavePopup && (
            <div className={styles.overlay}>
              <div className={styles.popup}>
                <button className={styles.closeButton} onClick={handleClosePopup}>×</button>
                <h2>Request for Leave</h2>
                
                {/* Leave Type Selection */}
                <h3>Type</h3>
                <select 
                  value={leaveRequest.type}
                  onChange={(e) => setLeaveRequest({...leaveRequest, type: e.target.value})}
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Half Day">Half Day</option>
                  <option value="Full Day">Full Day</option>
                  <option value="Compensatory Off">Comp Off</option>
                  <option value="RH">RH</option>
                </select>

                {/* Date Selection Fields */}
                <div className={styles.dateSection}>
                  <h3>Start Date</h3>
                  <input
                    type="date"
                    value={leaveRequest.startDate}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const formattedDate = date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      });
                      e.target.setAttribute('data-date', formattedDate);
                      setLeaveRequest({
                        ...leaveRequest, 
                        startDate: e.target.value,
                        formattedStartDate: formattedDate
                      });
                    }}
                    data-date=""
                    required
                  />

                  <h3>End Date</h3>
                  <input
                    type="date"
                    value={leaveRequest.endDate}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const formattedDate = date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      });
                      e.target.setAttribute('data-date', formattedDate);
                      setLeaveRequest({
                        ...leaveRequest, 
                        endDate: e.target.value,
                        formattedEndDate: formattedDate
                      });
                    }}
                    data-date=""
                    required
                  />
                </div>

                {/* Reason Input */}
                <h3>Reason</h3>
                <input 
                  type="text"
                  value={leaveRequest.reason}
                  onChange={(e) => setLeaveRequest({...leaveRequest, reason: e.target.value})}
                  placeholder="Enter your reason for leave"
                  required
                />

                {/* Submit Button */}
                <button 
                  className={`${styles.doneButton} ${!isFormValid() ? styles.disabled : ''}`}
                  onClick={handleSubmitLeave}
                  disabled={!isFormValid()}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;

/*JavaScript Functions Used:
useState Hook
Purpose: Manages component state
Usage: Creates state variables for user data, popups, forms, and leave statistics

formatDate Function
Purpose: Converts date strings to "dd month yyyy" format
Uses: toLocaleDateString() with 'en-GB' locale

Parameters: Takes a date string
Returns: Formatted date string or empty string if no date

isFormValid Function
Purpose: Validates leave request form
Returns: Boolean indicating if all required fields are filled
Checks: Leave type, start date, end date, and reason

Event Handlers:
handleDeleteClick: Initiates delete process
handleConfirmDelete: Confirms deletion
handleCancelDelete: Cancels deletion
handleRequestLeave: Opens leave request form
handleClosePopup: Closes leave request form
handleSubmitLeave: Submits leave request

Spread Operator (...)
Used in state updates to maintain immutability
Example: {...leaveRequest, type: e.target.value}

Template Literals
Used for dynamic class names
Example: ${styles.actionButton} ${styles.noButton}

Conditional Rendering
Uses && operator for conditional display of popups
Uses ternary operators for conditional styling

Arrow Functions
Used for component definition and event handlers
Provides lexical scoping of 'this' */