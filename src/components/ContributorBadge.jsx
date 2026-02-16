import { User, Calendar, Edit3 } from 'lucide-react';

function ContributorBadge({ contribution }) {
  if (!contribution) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const { contributedBy, editedBy, editHistory } = contribution;

  return (
    <div className="contributor-badge">
      {/* Original Contributor */}
      {contributedBy && (
        <div className="contributor-info added">
          <div className="contributor-label">
            <User size={14} />
            <span>Added by</span>
          </div>
          <div className="contributor-details">
            <span className="contributor-name">{contributedBy.name}</span>
            <span className="contributor-email">{contributedBy.email}</span>
            <span className="contributor-date">
              <Calendar size={12} />
              {formatDate(contributedBy.date)}
            </span>
          </div>
        </div>
      )}

      {/* Last Editor */}
      {editedBy && (
        <div className="contributor-info edited">
          <div className="contributor-label">
            <Edit3 size={14} />
            <span>Last edited by</span>
          </div>
          <div className="contributor-details">
            <span className="contributor-name">{editedBy.name}</span>
            <span className="contributor-email">{editedBy.email}</span>
            <span className="contributor-date">
              <Calendar size={12} />
              {formatDate(editedBy.date)}
            </span>
          </div>
        </div>
      )}

      {/* Edit History */}
      {editHistory && editHistory.length > 1 && (
        <div className="edit-history">
          <details>
            <summary>View edit history ({editHistory.length} edits)</summary>
            <ul>
              {editHistory.map((edit, index) => (
                <li key={index}>
                  <span className="edit-name">{edit.name}</span>
                  <span className="edit-email">({edit.email})</span>
                  <span className="edit-date">{formatDate(edit.date)}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}

export default ContributorBadge;





