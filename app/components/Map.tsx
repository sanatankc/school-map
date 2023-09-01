// @ts-nocheck
'use client';

import React, { Component, useRef } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker, Circle, Autocomplete } from '@react-google-maps/api';
import { markerColor } from '../schools';

const containerStyle = {
  flex: 1,
  width: '100%',
  height: '100%',
  borderRadius: '4px',
  
};

const bangloreCenter = {lat: 12.987246534773332, lng:  77.59929160799365}

const getIcon = (color: string) => {
  const icon = `<svg height="50" width="50" viewBox="-4 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="opacity:0.8">
    <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)">
            <g id="Icons" transform="translate(37.000000, 169.000000)">
                <g id="map-marker" transform="translate(78.000000, 468.000000)">
                    <g transform="translate(10.000000, 6.000000)">
                        <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" fill="${color}">
  
  </path>
                        <circle id="Oval" fill="white" fill-rule="nonzero" cx="14" cy="14" r="7">
  
  </circle>
                    </g>
                </g>
            </g>
        </g>
    </g>
  </svg>`
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(icon)
}

const icons = Object.keys(markerColor).map((category) => ({
  [category]: getIcon(markerColor[category])
})).reduce((acc, curr) => ({...acc, ...curr}), {})

// console.log(icons)


const getZoomLevel = (radius) =>  {
  const scale = (radius + (radius / 2)) / 500;
  const zoom = (16.9 - Math.log(scale) / Math.log(2));
  return zoom;
}
const Map: React.FC<{ selected: number, schools, setSelected: (selected: number) => void, radius: number }>  = ({selected, setSelected, schools, radius: radiusKm }) => {
  const [hovered, setHovered] = React.useState<number>(-1);
  const [zoom, setZoom] = React.useState<number>(10.3);
  const [center, setCenter] = React.useState<{lat: number, lng: number}>(bangloreCenter);
  const autocompleteRef = useRef(null);
  

  const radius = radiusKm * 1000;
  React.useEffect(() => {
    if (selected !== -1) {
      const selectedSchool = schools.find(school => school.id === selected)
      if (selectedSchool) {
        setZoom(getZoomLevel(radius))
        setCenter({
          lat: selectedSchool.lat,
          lng: selectedSchool.long
        })
      }
    } else {
      setZoom(10.3)
      setCenter(bangloreCenter)
    }
    
    // if (window.google && window.google.maps) {
    //   var input = document.getElementById('searchTextField');
    //   var autocomplete = new window.google.maps.places.Autocomplete(input);
    //   window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
    //       var place = autocomplete.getPlace();
    //       document.getElementById('city2').value = place.name;
    //       document.getElementById('cityLat').value = place.geometry.location.lat();
    //       document.getElementById('cityLng').value = place.geometry.location.lng();
    //   });
    // }
  }, [selected, radius])
  

  const onLoad = (autocomplete) => {
    console.log('autocomplete: ', autocomplete);
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      console.log(autocompleteRef.current.getPlace());
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {schools
          .map((school, i) => {
            // console.log('hellor------', icons[school.category], school.category, icons)
            return (
              <>
                <Marker
                  key={i}
                  position={{ lat: school.lat, lng: school.long }}
                  icon={icons[school.category]}
                  opacity={(school.id === selected || selected === -1 || hovered === school.id) ? 1 : 0.5}
                  onMouseOver={() => {
                    console.log('hovered', school.id)
                    setHovered(school.id)
                  }}
                  onMouseOut={() => setHovered(-1)}
                  onClick={() => {
                    setSelected(school.id);
                  }}
                >
                  {(school.id === selected || school.id === hovered) && (
                    <InfoWindow 
                      position={{ lat: school.lat, lng: school.long }}
                    >
                      <div>{school.name}</div>
                    </InfoWindow>
                  )}
                </Marker>
                {school.id === selected && (
                  <Circle
                    key={school.name + school.address}
                    center={{ lat: school.lat, lng: school.long }}
                    radius={radius}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#FF0000",
                      fillOpacity: 0.35,
                      clickable: false,
                      draggable: false,
                      editable: false,
                      visible: true,
                    }}
                  ></Circle>
                )}
              </>
            )
          })}
      </GoogleMap>
  )
}

export default Map