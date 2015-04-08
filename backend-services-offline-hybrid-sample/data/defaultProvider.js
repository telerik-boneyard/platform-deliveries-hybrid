'use strict';

(function() {
    //create a reference for the data provider to be used throughout the app

    app.data.defaultprovider = new Everlive({
        apiKey: Constants.System.ApiKey,
        scheme: 'https',
        offlineStorage: true,
        persistTokens: true,
        onAuthenticationRequired: function() {
            app.navigate('signinView/view.html');
        }
    });

}());