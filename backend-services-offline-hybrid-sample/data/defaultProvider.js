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
            syncStart: function(done) {
                app.showFooterSection('status-synchronizing');
                done();
            },
            syncEnd: function(err) {
                if (err) {
                    alert(JSON.stringify(err));
                }
                app.showFooterSection('status-synchronizing-done');
                setTimeout(function() {
                    app.showFooterSection('status-online');
                }, 2000);
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