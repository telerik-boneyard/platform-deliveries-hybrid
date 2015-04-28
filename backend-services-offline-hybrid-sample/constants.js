Constants = {};

//WARNING: You must never include your master key in your app. We only use it
//in order to initialize the required server-side items for the demo to function.
Constants.System = {
    ApiKey: 'your-api-key-here',
    MasterKey: 'your-master-key-here' 
};

//The name of the server-side content types we use in the app
Constants.Type = {
    DeliveryOrder: 'DeliveryOrder'
};

//Constants for the various statuses of a delivery order
Constants.OrderStatus = {
    Pending: 1,
    Current: 2,
    Delivered: 3,
    Refused: 4,
    Problem: 10
};

//Friendly names for the statuses of a delivery order
Constants.OrderStatusNames = [
    { name: "Pending", value: Constants.OrderStatus.Pending},
    { name: "Current", value: Constants.OrderStatus.Current},
    { name: "Delivered", value: Constants.OrderStatus.Delivered},
    { name: "Refused", value: Constants.OrderStatus.Refused},
    { name: "Problem", value: Constants.OrderStatus.Problem}
];