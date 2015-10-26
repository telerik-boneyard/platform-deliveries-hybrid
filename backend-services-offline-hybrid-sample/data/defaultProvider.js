'use strict';

(function() {
    //create a reference for the data provider to be used throughout the app
    app.data.defaultprovider = new Everlive({
        appId: Config.AppId,
        scheme: 'https',
        offlineStorage: true,
        caching: true,
        authentication: {
            persist: true,
            onAuthenticationRequired: function() {
                app.navigate('signinView/view.html');
            }
        },
        helpers: {
            html: {
                errorImageUrl: 'images/image-not-available.png'
            }
        }
    });
    
    app.data.defaultprovider.on('syncStart', function() {
        app.showFooterSection('status-synchronizing');
    });
    
    app.data.defaultprovider.on('syncEnd', function(syncInfo) {
		var err = syncInfo.error;
        if (err) {
        	alert('An error occurred while syncing' + JSON.stringify(err));
    	} else if (err === '') {
        	alert('An error occurred while syncing');
    	} 
		
        app.showFooterSection('status-synchronizing-done');
        setTimeout(function() {
            app.showFooterSection('status-online');
        }, 2000);
    });
}());