import { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import { Campground_Type } from '../../shared/types';
import red_marker from '../../assets/red-marker.webp';
import '../../styles/map.css';

type Marker_Prop = {
  children: React.ReactNode;
  key: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
};

const Marker = ({ children }: Marker_Prop) => children;

type Props = {
  campgroundsData: Array<Campground_Type>;
};

export default function ClusteredMap({ campgroundsData }: Props) {
  const [bounds, setBounds] = useState<any>();
  const [zoom, setZoom] = useState(6);
  const mapRef = useRef<any>();

  const points = campgroundsData.map((campground) => ({
    type: 'Feature',
    properties: { cluster: false, campgroundId: campground._id },
    geometry: {
      type: 'Point',
      coordinates: [
        campground.geometry.coordinates[0]!,
        campground.geometry.coordinates[1]!,
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
    },
  });

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: `AIzaSyBl_WUqPnA_MATPRoovZx3YN5Zd5rHZ4GA` }}
      defaultCenter={{ lat: 39.56295180747039, lng: -102.07872499175548 }}
      defaultZoom={3}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map }) => {
        mapRef.current = map;
      }}
      onChange={({ zoom, bounds }) => {
        setZoom(zoom);
        setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
      }}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const isCluster = cluster.properties.cluster;
        const { point_count } = cluster.properties;
        if (isCluster) {
          return (
            <Marker key={cluster.id} lat={latitude} lng={longitude}>
              <div
                className='clustered-map'
                style={{
                  width: `${30 + (point_count / points.length) * 100}px`,
                  height: `${30 + (point_count / points.length) * 100}px`,
                }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current?.setZoom(expansionZoom);
                  mapRef.current?.panTo({ lat: latitude, lng: longitude });
                }}
              >
                <p className='point-count'>{point_count}</p>
              </div>
            </Marker>
          );
        } else {
          return (
            <Marker
              key={cluster.properties.campgroundId}
              lat={latitude}
              lng={longitude}
            >
              <button className='unclustered-point'>
                <img
                  className='unclustered-point-image'
                  src={red_marker}
                  alt={`unclustered-marker`}
                />
              </button>
            </Marker>
          );
        }
      })}
    </GoogleMapReact>
  );
}
