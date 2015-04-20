'use strict';

(function() {
    //create a reference for the data provider to be used throughout the app

    app.data.defaultprovider = new Everlive({
        apiKey: Constants.System.ApiKey,
        scheme: 'https',
        
        offlineStorage: {
            provider: {
                type: Everlive.Constants.StorageProviders.LocalStorage
            },
            syncStart: function() {
                app.showFooterSection('synchronizing');
            },
            syncEnd: function() {
                app.showFooterSection('synchronizing-done');
            }
        },
        
        authentication: {
            persist: true,
            onAuthenticationRequired: function() {
                app.navigate('signinView/view.html');
            }
        }
        
    });
    
}());