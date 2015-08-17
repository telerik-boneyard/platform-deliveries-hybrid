'use strict';

app.models.signInView = (function() {
    var dataProvider = app.data.defaultprovider;
    
    var _showSection = function(sectionId) {
        $('#div-loading-signin').hide();
        $('#' + sectionId).show();
    };
    
    return {
        onShow: function() {
            var isOnline = app.isOnline();
            
            dataProvider.Users.currentUser().then(
                function(data) {
                    var currentUser = data.result;
                    if (currentUser) {
                        app.currentUser = currentUser;
                        app.mobileApp.navigate('home/view.html');
                    } else {
                        if (isOnline) {
                            //Show login form
                            _showSection('div-login');
                        } else {
                            //Show error
                            _showSection('error-offline-mode-initialize');
                        }
                    }
                },
                function(error) {
                    if (isOnline) {
                        //Show login form
                        _showSection('div-login');
                    } else {
                        //Show error
                        _showSection('error-offline-mode-initialize');
                    }
                }
            );
        }
    };
})();
app.models.signInView.signInView = (function() {
    
    var _onLoginSuccess = function(data) {
        if (data && data.result) {
            app.user = data.result;
            app.mobileApp.navigate('home/view.html');
        }
    };
    
    var _onLoginError = function(error) {
        alert(JSON.stringify(error));
    };
    
    var _signin = function(username, password) {
        var provider = app.data.defaultprovider;
        provider.Users.login(
            username,
            password,
            _onLoginSuccess,
            _onLoginError
        );
    };
    
    var viewModel = kendo.observable({
        about: function() {
            app.mobileApp.navigate('aboutView/view.html');
        },
        signInAndy: function() {
            var username = 'andy';
            var password = '333333';
            _signin(username, password);
        },
        signInMichael: function() {
            var username = 'michael';
            var password = '333333';
            _signin(username, password);
        }
    });
    return viewModel;
})();