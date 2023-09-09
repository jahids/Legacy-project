import React from 'react';

const CurrentLocation = () => {
    let userLoctaion = navigator.geolocation;
    function myGeolocator() {
        if (userLoctaion) {
            userLoctaion.getCurrentPosition(success);
        }
    }
    function success(data: {
        coords: {
            longitude: any; latitude: any;
        };
    }) {
        let lat = data.coords.latitude;
        let long = data.coords.longitude;
        console.log(lat, long);
    }
    myGeolocator();

    return (
        <div>
            <p>h</p>
        </div>
    );
};

export default CurrentLocation;