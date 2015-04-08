'use strict';

app.models.signInView = (function() {
    var dataProvider = app.data.defaultprovider;
    
    var _showSection = function(sectionId) {
        $('#div-loading').hide();
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
                        _showSection('div-login');
                    }
                },
                function(error) {
                    alert(JSON.stringify(error));
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
    
    var viewModel = kendo.observable({
        signin: function() {
            var provider = app.data.defaultprovider;

            // Authenticate user
            provider.Users.login(
                viewModel.model.username,
                viewModel.model.password,
                _onLoginSuccess,
                _onLoginError
            );
        },
        about: function() {
            app.mobileApp.navigate('aboutView/view.html');
        },
        signInAndy: function() {
            var provider = app.data.defaultprovider;
            var username = 'andy';
            var password = '111111';
            
            
            provider.Users.login(
                username,
                password,
                _onLoginSuccess,
                _onLoginError
            );
        }
    });
    return viewModel;
})();