'use strict';

app.models.home = (function() {
    return {
        onShow: function() {
            app.canSync = true;
            var dataProvider = app.data.defaultprovider;
            dataProvider.Users.currentUser(
                function(data) {
                    app.models.home.homeView.viewModel.set("userName", data.result.DisplayName);
                },
                function(error) {
                    alert(JSON.stringify(error));
                }
            );
        }
    };
})();

app.models.home.homeView = (function() {

    var viewModel = kendo.observable({
        userName: '',
        userRole: '',
        
        viewPendingDeliveries: function() {
            app.mobileApp.navigate('deliveriesView/list.html?filter=pending');
        },
        viewCompletedDeliveries: function() {
            app.mobileApp.navigate('deliveriesView/list.html?filter=completed');
        },
        viewFailedDeliveries: function() {
            app.mobileApp.navigate('deliveriesView/list.html?filter=failed');
        },
        viewAllDeliveries: function() {
            app.mobileApp.navigate('deliveriesView/list.html');
        },
        signOut: function() {
            if (!app.isOnline()) {
                alert('You cannot logout while you are working offline.');
            } else {
                var dataProvider = app.data.defaultprovider;
                dataProvider.Users.logout(
                    function() {
                        app.mobileApp.navigate('signInView/view.html');
                    },
                    function(error) {
                        alert(error.message);
                    }
                );
            }
        }
    });

    return {
        viewModel: viewModel
    };
})();