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
    
    app.isOnline = function() {
        return navigator.connection.type !== 'none';
    };
    
    app.refreshConnectivity = function() {
        onConnectivityChanged(app.isOnline());
    }
    
    function onConnectivityChanged(isOnline) {
        var online = $("#status-online");
        var offline = $("#status-offline");
        
        var dataProvider = app.data.defaultprovider;
        if (isOnline) {
            offline.hide();
            online.show();
            
            dataProvider.storage.goOnline(false);
        } else {
            online.hide();
            offline.show();
            
            dataProvider.storage.goOffline();
        }
    };
    
    $(window).on({
        offline : function() {
            onConnectivityChanged(false);
        },
        online  : function() {
            onConnectivityChanged(true);
        }
    });
    
}());