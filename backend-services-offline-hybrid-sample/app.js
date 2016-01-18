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
            
            if (os.wp) {
                $('body').css('height', window.innerHeight);
            }

            onConnectivityChanged(app.isOnline());
            app.models.deliveriesView.init();
        });
    };

    if (window.cordova) {
        document.addEventListener(
            'deviceready',
            function() {
                if (navigator && navigator.splashscreen) {
                    navigator.splashscreen.hide();   
                }
				addConnectivityEventListeners();
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
            dataProvider.online();
            if (app.canSync) {
				 // await the network connectivity to be established even that the 'online' event was thrown 
                 setTimeout(function () { 
					 dataProvider.sync();
                 }, 1000);
            }
        } else {
            app.showFooterSection('status-offline');
            dataProvider.offline();
        }
    };
             
	function addConnectivityEventListeners() {
		document.addEventListener("online", function() {
	        onConnectivityChanged(true);
	    });
	    
	    document.addEventListener("offline", function() {
	        onConnectivityChanged(false);
		});		
	}
}());
