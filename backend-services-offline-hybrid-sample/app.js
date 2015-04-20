(function() {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = {
        models: {},
        data: {}
    };

    var bootstrap = function() {
        var os = kendo.support.mobileOS,
            statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';
        
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'flat',
                statusBarStyle: statusBarStyle,
                // This is the initial view of the app. Note, that this will usually be the signin view. We have a special "loading"
                // view only because this is a sample app and we need to check some things before we actually run the app (API key present, etc.)
                initial: 'loading/view.html'
            });

            onConnectivityChanged(app.isOnline());
        });
    };

    if (window.cordova) {
        document.addEventListener(
            'deviceready',
            function() {
                if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
                bootstrap();
            },
            false
        );
    } else {
        bootstrap();
    }

    window.app = app;
    
    app.canSync = false;
    
    app.isOnline = function() {
        return navigator.connection.type !== 'none';
    };
    
    app.refreshConnectivity = function() {
        onConnectivityChanged(app.isOnline());
    };
    
    app.showFooterSection = function(sectionId) {
        var online = $("#status-online");
        var offline = $("#status-offline");
        var synchronizing = $("#status-synchronizing");
        var synchronizingDone = $("#status-synchronizing-done");
        
        online.hide();
        offline.hide();
        synchronizing.hide();
        synchronizingDone.hide();
        
        var currentSection = $("#" + sectionId);
        currentSection.show();
    };
    
    function onConnectivityChanged(isOnline) {
        var dataProvider = app.data.defaultprovider;
        if (isOnline) {
            app.showFooterSection('status-online');
            dataProvider.offline(false);
            if (app.canSync) dataProvider.sync();
        } else {
            app.showFooterSection('status-offline');
            dataProvider.offline(true);
        }
    };
    
    document.addEventListener("online", function() {
        onConnectivityChanged(true);
    });
    
    document.addEventListener("offline", function() {
        onConnectivityChanged(false);
    }); 
    
}());
