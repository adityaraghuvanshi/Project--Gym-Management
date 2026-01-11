import React from 'react';
import './Table.css';

const Table = ({ children, className = '' }) => {
  return (
    <div className="table-wrapper">
      <table className={`custom-table ${className}`}>
        {children}
      </table>
    </div>
  );
};

export default Table;
