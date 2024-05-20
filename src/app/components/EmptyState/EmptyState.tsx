import React from "react";
import "./EmptyState.scss";

interface EmptyStateProps {
  text: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
  return (
    <div className="empty-state">
      <p className="empty-state__text">{text}</p>
    </div>
  );
};

export default EmptyState;
