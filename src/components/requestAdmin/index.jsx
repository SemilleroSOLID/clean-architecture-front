import { useState } from "react";
import ListRequests from "./children/listRequests.component";
import RequestDetail from "./children/requestDetail.component";

// Administrator: every request made by the students (issue #16).
const RequestAdmin = () => {
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  return (
    <div className="request-admin">
      {selectedRequestId === null ? (
        <ListRequests onSelect={setSelectedRequestId} />
      ) : (
        <RequestDetail requestId={selectedRequestId} onBack={() => setSelectedRequestId(null)} />
      )}
    </div>
  );
};

export default RequestAdmin;
