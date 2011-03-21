/*
 * @copyright Copyright (c) Coffee And Power Inc. 2011 All Rights Reserved. 
 * http://www.coffeeandpower.com
 * @author H <h@singinghorsestudio.com>
 * 
 * @brief Model for the missions table.  Any complex logic for missions lives here
 * 
 */

var missionsModel = {};

(function() {
    missionsModel.getMissionDetail = function(e) {
    };

    missionsModel.getMissionList = function(e, callback) {
        // go grab our current position
        missionsModel.getGPS();

        candp.model.xhr(
            candp.config.missionsUrl,
            'POST',
            {
                action: 'getMissions',  
                sw_lat: candp.location.latitude - 0.05, 
                sw_lng: candp.location.longitude - 0.05,
                ne_lat: candp.location.latitude + 0.05,
                ne_lng: candp.location.longitude + 0.05,
                SkillsIDList: ''
            }, 
            function(e) {
                var response = JSON.parse(e.response);
                if (response.params.listOfMissions) {
                    callback(response.params.listOfMissions);
                }
            }
        );
    };

    missionsModel.getGPS = function() {
        // get our last known good GPS location
        candp.location = JSON.parse(Ti.App.Properties.getString('location', '{}'));

        Ti.Geolocation.purpose = "Coffee and Power Missions List";
        Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;

        // do we have GPS turned on?
        if (Ti.Geolocation.locationServicesEnabled == false) {
            candp.view.alert(L('error'), L('GPS_turned_off'));
        } else {
            // ok, so grab a 'close enough' location
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS;
            Ti.Geolocation.distanceFilter = 50;

            Ti.Geolocation.getCurrentPosition(function(e) {
                if (e.error) {
                    candp.view.alert(L('error'), L('GPS_turned_off'));
                    return;
                } else {
                    candp.location = {
                        latitude: e.coords.latitude,
                        longitude: e.coords.longitude
                    };
        
                    Ti.App.Properties.setString('location', JSON.stringify(candp.location));
                    Ti.API.info('candp.location = ' + JSON.stringify(candp.location));

                    // send an update to the server of our current location
                    Ti.App.fireEvent('app:applicationWindow.setLocation', candp.location);
                }
            });
        }
    };


})();
