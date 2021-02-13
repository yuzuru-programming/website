import React from 'react';

export const Loading = () => {
  return (
    <>
      <div className="position-absolute h-100 w-100 m-0 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    </>
  );
};
