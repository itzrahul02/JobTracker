export const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: Record<string, string> = {
    Applied: 'status-applied',
    Interview: 'status-interview',
    Offer: 'status-offer',
    Rejected: 'status-rejected',
  };

  return <span className={`status-badge ${colorMap[status] || ''}`}>{status}</span>;
};
