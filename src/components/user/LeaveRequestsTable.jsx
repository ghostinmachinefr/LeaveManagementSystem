import styles from '@/styles/user/LeaveRequestsTable.module.css'; 
import Image from 'next/image';

const LeaveRequestsTable = ({ requests, onDeleteRequest }) => {
  const sampleRequests = [
    {
      id: 'REQ001',
      dateSent: '2024-03-15',
      type: 'Full Leave',
      fromDate: '2024-03-20',
      toDate: '2024-03-21'
    },
    {
      id: 'REQ002',
      dateSent: '2024-03-10',
      type: 'Half Leave',
      fromDate: '2024-03-18',
      toDate: '2024-03-18'
    },
    {
      id: 'REQ003',
      dateSent: '2024-03-05',
      type: 'RH',
      fromDate: '2024-03-25',
      toDate: '2024-03-25'
    },
    {
      id: 'REQ004',
      dateSent: '2024-02-28',
      type: 'Comp Off',
      fromDate: '2024-03-15',
      toDate: '2024-03-15'
    },
    {
      id: 'REQ005',
      dateSent: '2024-02-20',
      type: 'Full Leave',
      fromDate: '2024-03-01',
      toDate: '2024-03-02'
    },
    {
      id: 'REQ006',
      dateSent: '2024-02-15',
      type: 'Half Leave',
      fromDate: '2024-02-28',
      toDate: '2024-02-28'
    },
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
            <th>From-To</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sampleRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.dateSent}</td>
              <td>{request.type}</td>
              <td>{`${request.fromDate} → ${request.toDate}`}</td>
              <td>
                <button 
                  className={styles.deleteButton}
                  onClick={() => onDeleteRequest(request.id)}
                >
                  Delete
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