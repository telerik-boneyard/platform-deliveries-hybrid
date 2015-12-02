
# Telerik Deliveries Sample App for PhoneGap/Cordova

<a href="https://platform.telerik.com/#appbuilder/clone/https://github.com/telerik/platform-deliveries-hybrid" target="_blank"><img src="http://docs.telerik.com/platform/samples/images/try-in-appbuilder.png" alt="Try in AppBuilder" title="Try in Telerik Platform" /></a>

<a id="top"></a>
* [Overview](#overview)
* [Requirements](#requirements)
* [Configuration](#configuration)
* [Running the Sample](#running-the-sample)
* [Testing the Sample](#test-the-sample)

# Overview

This repository contains the Telerik Deliveries app for PhoneGap/Cordova. It is a sample mobile app demonstrating how to integrate and use the [Offline Support](http://docs.telerik.com/platform/backend-services/javascript/offline-support/introduction) and [Caching](http://docs.telerik.com/platform/backend-services/javascript/caching/introduction) features provided by the [Telerik Platform Backend Services JavaScript SDK](http://docs.telerik.com/platform/backend-services/javascript/getting-started-javascript-sdk).

The detailed list of showcased features includes:

* Offline Support
  * Switching between online and offline mode
  * Data synchronization
  * ClientWins conflict resolution strategy
  * Offline files
  * UI integration
* Caching
* Authentication Persistence

Similarly to all other Telerik Platform hybrid apps, Telerik Deliveries runs on iOS, Android, and Windows Phone 8.

# Screenshots

Login Screen|Main Menu|All Orders, Offline
---|---|---
![Login Screen](https://raw.githubusercontent.com/telerik/platform-deliveries-hybrid/master/screenshots/login-screen.png)|![Main Menu](https://raw.githubusercontent.com/telerik/platform-deliveries-hybrid/master/screenshots/main-menu.png)|![All Orders, device is offline](https://raw.githubusercontent.com/telerik/platform-deliveries-hybrid/master/screenshots/all-orders-offline.png)

# Requirements

Before you begin, you need to ensure that you have the following:

- **An active Telerik Platform account**
Ensure that you can log in to a Telerik Platform account. This can be a free trial account. Depending on your license you may not be able to use all app features. For more information on what is included in the different editions, check out the pricing page. All features included in the sample app work during the free trial period.

- **Telerik AppBuilder** The sample app requires Telerik AppBuilder to run. This can be the in-browser client, the desktop client or the extension for Visual Studio.

# Configuration

The Deliveries sample app comes fully functional, but to see it in action you must link it to a Telerik Platform app.

1. Click the **Run in the Platform** button to clone the repository in Telerik Platform.<br>
	A new Telerik Platform app is created for you. You can view the app source code on the Code tab.
2. Click the **Data** tab and then click **Enable Data**.
4. Click the **Settings** tab.
5. Take note of your **App ID** and **API Master Key**.
6. Go back to **Code**.
3. Open the `config.js` file.
4. Set the `Config.AppId` value to the App ID that you acquired earlier.
5. Set the `Config.MasterKey` value to the API Master Key that you acquired earlier.

# Running the Sample

Once the app is configured, you can run it either on a real device or in the Telerik Platform simulator.

To run it, follow the steps in the product's documentation: [Running Apps on Devices](http://docs.telerik.com/platform/appbuilder/testing-your-app/running-on-devices/working-with-devices).

After you run the app successfully, it guides you through a data initialization process which builds the necessary data structure in your Telerik Platform app and then creates sample data.

# Testing the Sample

For your convenience, the app always displays whether it works online or offline. You can simulate lack of Internet connection from the Telerik Platform simulator. If you are testing on a device, you have to turn off the WiFi and the data connection to go in offline mode.

> Ensure that the emulator or the device that you are using has Internet connectivity when running the sample.

One way to test the app is to follow this work flow:

1. Make sure the Internet connection is on.
2. Log in and browse the delivery orders.
3. Turn off the Internet connection and restart the application.<br>
	Result: you can still browse the delivery orders.
4. Change an existing item (enter comment or change status).
5. Turn on the Internet connection.<br>
	Result: Your change is synchronized to the cloud and you can see it in the Telerik Platform portal.
