'use strict';

app.models.signInView = (function() {
    return {};
})();
app.models.signInView.signInViewSignInViewSignin = (function() {
    var viewModel = kendo.observable({
        model: {
            username: '',
            password: ''
        },
        signin: function() {
            var provider = app.data.defaultprovider;

            // Authenticate user
            provider.Users.login(viewModel.model.username,
                viewModel.model.password,
                function(data) {
                    if (data && data.result) {
                        app.user = data.result;
                        app.mobileApp.navigate('home/view.html');
                    }
                },
                function(error) {
                    alert(JSON.stringify(error));
                });

        }
    });
    return viewModel;
})();