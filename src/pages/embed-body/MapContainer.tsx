import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = ({ google, eventDetail }: any) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Map
      className="maps"
      google={google}
      zoom={12}
      initialCenter={{
        lat: Number(eventDetail.latitude),
        lng: Number(eventDetail.longitude),
      }}
    >
      <Marker
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        position={{
          lat: Number(eventDetail.latitude),
          lng: Number(eventDetail.longitude),
        }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCOcCjMhxCK6RKCw3yUin2oqz6YE_XR3fI",
})(MapContainer);
