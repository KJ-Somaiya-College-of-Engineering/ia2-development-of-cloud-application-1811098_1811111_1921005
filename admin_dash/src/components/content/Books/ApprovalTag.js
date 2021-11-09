import React from "react";

const ApprovalTag = ({ status }) => {
  function returnTag() {
    switch (status) {
      case 1:
        return (
          <div className="approval-tag text-light bg-success">APPROVED</div>
        );

      case -1:
        return (
          <div className="approval-tag text-light bg-danger">NOT APPROVED</div>
        );
      case 0:
        return (
          <div className="approval-tag text-dark bg-warning">
            APPROVAL PENDING
          </div>
        );
      default:
        return null;
    }
  }
  return <div className="approval-container w-100">{returnTag()}</div>;
};

export default ApprovalTag;
