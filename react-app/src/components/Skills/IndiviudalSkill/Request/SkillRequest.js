import React from "react";

const SkillRequests = ({ requests }) => {
  return (
    <div className="request-channel">
      <h2>Request Channel</h2>
      {requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        requests.map((request) => (
          <div key={request.id} className="request-item">
            {/* Display the request details here */}
            <p>Name: {request.name}</p>
            <p>Description: {request.description}</p>
            <p>Budget: {request.budget}</p>
            {/* ... Other fields */}
          </div>
        ))
      )}
    </div>
  );
};

export default SkillRequests;
