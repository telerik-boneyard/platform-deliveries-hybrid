'Use strict';
var everliveBaseUrl = 'https://api.everlive.com/v1/'; // use https
app.models.loading = (function() {
    var dataProvider = app.data.defaultprovider;

    var _showSection = function(sectionId) {
        $('#div-loading').hide();
        $('#initialize-data').hide();
        $('#initializing-data').hide();

        $('#' + sectionId).show();
    };

    var _isAppIdSet = function() {
        return Config.AppId && Config.AppId.length === Constants.KeysLength.AppId;
    };

    var _isMasterKeySet = function() {
        return Config.MasterKey && Config.MasterKey.length === Constants.KeysLength.MasterKey;
    };

    var _checkDataInitialized = function() {
        dataProvider.data(Constants.Type.DeliveryOrder).count(
            null,
            function(data) {
                _showLoginPage();
            },
            function(error) {
                if (error.code === Constants.ErrorCodes.ContentTypeNotFound) {
                    _showSection('initialize-data');
                } else if(error.code === Constants.ErrorCodes.InvalidAppId){
                    _showSection('enable-data');
                }else {
                    alert(error.message);
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
            .then(_createFiles)
            .then(function() {
                _showSection('initialize-data-completed');
            })
            .catch(function(e) { // this wasn't catching the server errors
                alert('Data initialization error: ' + JSON.stringify(e));
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

        var url = everliveBaseUrl + 'Metadata/Applications/' + Config.AppId + '/Types';
        return _ajaxRequestPromise(url, typeDefinition)
            .then(
                function() {
                    return _createContentTypeFields(typeName, fields);
                }
            );
    };

    var _createContentTypeFields = function(typeName, fields) {
        var url = everliveBaseUrl + 'Metadata/Applications/' + Config.AppId + '/Types/' + typeName + '/Fields';
        return _ajaxRequestPromise(url, fields);
    };

    var _createData = function() {
        var data = sampleData.Data.DeliveryOrder;
        var url = everliveBaseUrl + Config.AppId + '/DeliveryOrder';
        return _ajaxRequestPromise(url, data);
    };

    var _createUsers = function() {
        var users = sampleData.Users;
        var url = everliveBaseUrl + Config.AppId + '/Users';
        return _ajaxRequestPromise(url, users);
    };

    var _createFiles = function() {
        var files = sampleData.Data.Files;
        var url = everliveBaseUrl + Config.AppId + '/Files';
        return _ajaxRequestPromise(url, files[0])
            .then(function() {
                return _ajaxRequestPromise(url, files[1]);
            });
    };

    var _get = function(url, success, error) {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                'Authorization': 'masterkey ' + Config.MasterKey
            },
            success: success,
            error: error
        });
    };

    var _ajaxRequestPromise = function(url, data) {
        var RSVP = Everlive._common.rsvp;

        var ajaxOptions = {
            method: "POST",
            url: url,
            headers: {
                'Authorization': 'masterkey ' + Config.MasterKey,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        var promise = new RSVP.Promise(function(resolve, reject) {
            $.ajax($.extend({}, // make the ajax request rsvp compatible
                ajaxOptions, {}, {
                    success: function(json) {
                        resolve(json);
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        var serverError = JSON.parse(jqXhr.responseText);
                        reject(serverError);
                    }
                }));
        });
        return promise;
    };

    return {
        onShow: function() {
            //Check if API key and MasterKey has been set
            var appIdIsSet = _isAppIdSet();
            var masterKey = _isMasterKeySet();

            if (!appIdIsSet) {
                _showSection('error-no-api-key');
            } else if (!masterKey) {
                _showSection('error-no-master-key');
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
