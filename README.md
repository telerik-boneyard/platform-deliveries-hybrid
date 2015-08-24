This application is an example for using the Offline Support provided by the Telerik Backend Services JavaScript SDK. You can find more information here: [Offline Support](http://docs.telerik.com/platform/backend-services/development/javascript-sdk/offline-mode/introduction).

<a href="https://platform.telerik.com/#appbuilder/clone/https://github.com/telerik/platform-deliveries-hybrid" target="_blank"><img src="http://docs.telerik.com/platform/appbuilder/sample-apps/images/try-in-appbuilder.png" alt="Try in AppBuilder" title="Try in Telerik Platform" /></a>

### Requirements ###

* Registration in Telerik Platform (https://platform.telerik.com/).
* A new or existing Backend Services project.

### Showcased concepts ###

* Offline Support
  * Switching between online and offline mode
  * Data synchronization
  * ClientWins conflict resolution strategy
  * Offline files
  * Integration with UI
* Caching
* Authentication Persistance

### Supported platforms ###

* iOS
* Android 
* Windows Phone 8

### Installation ###

* Launch Telerik AppBuilder and clone this repository.
* Open the `config.js` file located in the base folder.
* Set the value for `Config.ApiKey` to the API key for your Backend Services project.

### Running the sample app ###

You can test this app either on a device or using the AppBuilder simulator. More information of how to run your hybrid app created with Telerik AppBuilder on devices can be read here: [Running Apps on Devices](http://docs.telerik.com/platform/appbuilder/testing-your-app/running-on-devices/working-with-devices).

This app requires a specific content type and some data in your Backend Services project in order to work. Just launch the app and it will guide you through the process of data initialization.

For your convenience, the app always displays whether it works online or offline. You can simulate lack of Internet connection from the AppBuilder simulator. If you are testing on a device, you will have to turn off the WiFi and data connection to go in offline mode.

### What to test ###

1. Make sure Internet connection is on.
2. Log in and browse the delivery orders.
2. Turn off the Internet connection and restart the application.
3. Result: you can still browse the delivery orders.
4. Change an existing item (enter comment or change status).
5. Turn on the Internet connection.
6. Result: Your change is synchronized to the cloud and you can see it in the Backend Services portal.
