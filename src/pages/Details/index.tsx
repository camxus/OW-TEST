import React, { useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { isObjEmpty } from "@src/utility/Utils";
import { getTitles } from "@src/redux/Titles/Titles";
import { store } from "@src/redux";

function Details() {
  // deps
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // url parameter
  let { title_number } = useParams();

  // redux state management
  const { titles } = useSelector((state: any) => state.Titles);

  // const selectedTitle = useMemo(() => {
  //   // if titles loaded find selected title else fetch titles and repeat lifecycle
  //   if (titles.length > 0) {
  //     return titles.find((title) => title["Title Number"] === title_number);
  //   }
  //   dispatch(getTitles({}));
  // }, [dispatch, title_number, titles]);
  const selectedTitle = useMemo(() => {
    // if titles loaded find selected title else fetch titles and repeat lifecycle
    if (titles.length > 0) {
      return titles.find((title) => title["Title Number"] === title_number);
    }
    dispatch(getTitles({}));
  }, [dispatch, title_number, titles]);

  // find map coordinates
  const center = useMemo(() => {
    return {
      lat: selectedTitle?.Y,
      lng: selectedTitle?.X,
    };
  }, [selectedTitle]);

  return (
    <div className="container">
      {selectedTitle && !isObjEmpty(selectedTitle) ? (
        <>
          <div className="box responsive">
            <div className="box">
              <h2 className="details_title" data-tenure={selectedTitle.Tenure}>
                {selectedTitle["Title Number"]}
              </h2>
              <p>{selectedTitle["Property Address"]}</p>
            </div>
            <div className="box map">
              {isLoaded ? (
                <GoogleMap
                  center={center}
                  zoom={14}
                >
                  <Marker
                    position={center}
                    animation={google.maps.Animation.DROP}
                    label={selectedTitle["Title Number"]}
                  />
                </GoogleMap>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="box">
            <button onClick={() => navigate("/")}>Property List</button>
          </div>
        </>
      ) : (
        <div className="container">
          <p> No Property selected</p>
          <button onClick={() => navigate("/")}>Select Property</button>
        </div>
      )}
    </div>
  );
}

export default Details;
