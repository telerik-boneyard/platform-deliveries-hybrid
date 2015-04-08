'use strict';

app.models.registerView = (function() {
    return {};
})();
app.models.registerView.registerViewSignup = (function() {
    var viewModel = kendo.observable({
        model: {
            username: '',
            password: '',
            displayName: '',
            email: '',
            gender: '0',
            birthDate: new Date()
        },
        genders: [
            'Male',
            'Female'
        ],
        register: function() {
            var provider = app.data.defaultprovider;

            var attrs = {
                Email: viewModel.model.email,
                DisplayName: viewModel.model.displayName,
                BirthDate: viewModel.model.birthDate,
                Gender: viewModel.model.gender
            };

            provider.Users.register(viewModel.model.username,
                viewModel.model.password,
                attrs,
                function(data) {

                    if (data && data.result) {
                        app.navigate('signInView/view.html');
                    }

                },
                function(error) {
                    alert(JSON.stringify(error));
                });

        }
    });
    return viewModel;
})();