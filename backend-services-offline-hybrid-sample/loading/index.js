'use strict';
var everliveBaseUrl = 'http://api.everlive.com/v1/';
app.models.loading = (function() {
    var dataProvider = app.data.defaultprovider;
    
    var _showSection = function(sectionId) {
        $('#div-loading').hide();
        $('#initialize-data').hide();
        $('#initializing-data').hide();
        
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
        _showSection('initializing-data');
        
        _createContentTypes()
        .then(_createUsers)
        .then(_createData)
        .then(function() {
            _showSection('initialize-data-completed');
        })
        .catch(function(e) {
            alert('Error: ' + JSON.stringify(error));
        });
        
    };
    
    var _createContentTypes = function() {
        var types = sampleData.ContentTypes;
        
        var type = types['DeliveryOrder'];
        return _createContentType('DeliveryOrder', type);
    };
    
    var _createContentType = function(typeName, typeDefinition) {
        var fields = typeDefinition.Fields;
        delete typeDefinition.Fields;
        
        var url = everliveBaseUrl + 'Metadata/Applications/' + Constants.System.ApiKey + '/Types';
        return _ajaxRequestPromise(url, typeDefinition)
            .then(
                function() {
                    return _createContentTypeFields(typeName, fields);
                }
            );
    };
    
    var _createContentTypeFields = function(typeName, fields) {
        var url = everliveBaseUrl + 'Metadata/Applications/' + Constants.System.ApiKey + '/Types/' + typeName + '/Fields';
        return _ajaxRequestPromise(url, fields);
    };
    
    var _createData = function() {
        var data = sampleData.Data.DeliveryOrder;
        var url = everliveBaseUrl + Constants.System.ApiKey + '/DeliveryOrder';
        return _ajaxRequestPromise(url, data);
    };
    
    var _createUsers = function() {
        var users = sampleData.Users;
        var url = everliveBaseUrl + Constants.System.ApiKey + '/Users';
        return _ajaxRequestPromise(url, users);
    };
    
    var _get = function(url, success, error) {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                'Authorization': 'masterkey ' + Constants.System.MasterKey
            },
            success: success,
            error: error
        });    
    };
    
    var _ajaxRequestPromise = function(url, data) {
        var RSVP = Everlive._common.rsvp;
        var promise = new RSVP.Promise(function(resolve, reject) {
            $.ajax({
                method: "POST",
                url: url,
                headers: {
                    'Authorization': 'masterkey ' + Constants.System.MasterKey,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                success: function() {
                    resolve();
                },
                error: function() {
                    resolve();
                }
            });
        });
        return promise;
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
        initializeData: function() {
            _initializeData();
        },
        reloadApp: function() {
            location.reload();
        }
    };
})();