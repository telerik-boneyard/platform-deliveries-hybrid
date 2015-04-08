'use strict';

app.models.loading = (function() {
    var dataProvider = app.data.defaultprovider;
    
    var _showSection = function(sectionId) {
        $('#div-loading').hide();
        $('#' + sectionId).show();
    };
    
    var _isApiKeySet = function() {
        return Constants.System.ApiKey && Constants.System.ApiKey.length === 16;
    };
    
    var _isMasterKeySet = function() {
        return Constants.System.MasterKey && Constants.System.MasterKey.length === 32;
    };
    
    var _checkDataInitialized = function() {
        dataProvider.data(Constants.Type.DeliveryOrder).count(
            null,
            function (data) {
                _showLoginPage();
            },
            function (error) {
                var masterKeySet = _isMasterKeySet();
                
                if (!masterKeySet) {
                    _showSection('error-no-master-key');
                } else {
                    _showSection('initialize-data');
                }
            }
        );
    };
    
    var _showLoginPage = function() {
        app.mobileApp.navigate('signInView/view.html');
    };
    
    var _initializeData = function() {
        
    };
    
    return {
        onShow: function() {

            //Check if API key has been set
            var apiKeySet = _isApiKeySet();
            if (!apiKeySet) {
                _showSection('error-no-api-key');
            } else {
                var isOnline = app.isOnline();
                if (isOnline) {
                    //If online, check if the server data is initialized
                    _checkDataInitialized();
                } else {
                    //If offline, just go to the login page
                    _showLoginPage();
                }
            }
            
        },
        
        //
        initializeData: function() {
            _initializeData();
        }
    };
})();