import styles from '@/styles/user/LeaveRequestsTable.module.css'; 

const LeaveRequestsTable = ({ requests, onDeleteRequest }) => {
  const sampleRequests = [
    {
      id: 'REQ001',
      dateSent: '15 March 2024',
      type: 'Full Leave',
      fromDate: '20 March 2024',
      toDate: '21 March 2024',
      requestedOn: '10 March 2024'
    },
    {
      id: 'REQ002',
      dateSent: '10 March 2024',
      type: 'Half Leave',
      fromDate: '18 March 2024',
      toDate: '18 March 2024',
      requestedOn: '15 March 2024'
    },
    {
      id: 'REQ003',
      dateSent: '05 March 2024',
      type: 'RH',
      fromDate: '25 March 2024',
      toDate: '25 March 2024',
      requestedOn: '20 March 2024'
    },
    {
      id: 'REQ004',
      dateSent: '28 February 2024',
      type: 'Comp Off',
      fromDate: '15 March 2024',
      toDate: '15 March 2024',
      requestedOn: '10 March 2024'
    },
    {
      id: 'REQ005',
      dateSent: '20 February 2024',
      type: 'Full Leave',
      fromDate: '01 March 2024',
      toDate: '02 March 2024',
      requestedOn: '25 February 2024'
    },
    {
      id: 'REQ006',
      dateSent: '15 February 2024',
      type: 'Half Leave',
      fromDate: '28 February 2024',
      toDate: '28 February 2024',
      requestedOn: '20 February 2024'
    },
    {
      id: 'REQ007',
      dateSent: '10 January 2024',
      type: 'Full Leave',
      fromDate: '15 January 2024',
      toDate: '20 January 2024',
      requestedOn: '05 January 2024'
    },
    {
      id: 'REQ008',
      dateSent: '05 January 2024',
      type: 'Comp Off',
      fromDate: '10 January 2024',
      toDate: '10 January 2024',
      requestedOn: '01 January 2024'
    },
    {
      id: 'REQ009',
      dateSent: '20 December 2023',
      type: 'Half Leave',
      fromDate: '25 December 2023',
      toDate: '25 December 2023',
      requestedOn: '15 December 2023'
    },
    {
      id: 'REQ010',
      dateSent: '15 December 2023',
      type: 'RH',
      fromDate: '30 December 2023',
      toDate: '30 December 2023',
      requestedOn: '10 December 2023'
    }
  ];

  return (
    <div className={styles.tableContainer}>
      <h2>Leave Requests</h2>
      <table className={styles.leaveTable}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Date Sent</th>
            <th>Type</th>
            <th>Leave Request Date From</th>
            <th>Leave Request Date To</th>
            <th>Leave Requested On</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sampleRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.dateSent}</td>
              <td>{request.type}</td>
              <td>{request.fromDate}</td>
              <td>{request.toDate}</td>
              <td>{request.requestedOn}</td>
              <td>
                <button 
                  className={styles.deleteButton}
                  onClick={() => onDeleteRequest(request.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestsTable;