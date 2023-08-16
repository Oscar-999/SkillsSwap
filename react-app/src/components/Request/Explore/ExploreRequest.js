import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllRequestsThunk } from "../../../store/request";
import { Link } from "react-router-dom";
import "./ExploreRequest.css";

const ExploreRequest = () => {
  const dispatch = useDispatch();
  const requestsObj = useSelector((state) => state.requests.allRequests);
  console.log("this is requestsObj", requestsObj)
  const requestsList = Object.values(requestsObj);

  useEffect(() => {
    dispatch(loadAllRequestsThunk());
  }, [dispatch]);

  if (!requestsList) {
    return null;
  }

  const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"


  return (
    <main>
      <div className="exploreRequest-welcome">
        <h1>Requests needed</h1>
      </div>

      <ul className="request-list">
        {requestsList.length > 0 &&
          requestsList.map((request) => (
            <div key={request.id} className="request" title={request.name}>
              <Link to={`/requests/${request.id}`}>
                <div className="image">
                  <img src={request.reqImage || defaultImage} alt="req" />
                </div>
                <div className="details">

                  <li className="request-name">{request.name}</li>
                  <li className="request-description">{request.description}</li>
                  <li className="request-budget">Price: ${request.budget}</li>
                </div>


              </Link>
            </div>
          ))}
      </ul>
    </main>
  );
};

export default ExploreRequest;
