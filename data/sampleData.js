var sampleData = {
    ContentTypes: {
        "DeliveryOrder": {
            "Name": "DeliveryOrder",
            "Title": "DeliveryOrder",
            "SecurityPolicy": 3,
            "DisplayFieldName": "DeliveryItem",
            "Id": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
            "Fields": [
                {
                    "Name": "DeliveryAddressLine2",
                    "DataType": 1,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "DeliveryAddressLine2"
                },
                {
                    "Name": "DeliveryAddressPostcode",
                    "DataType": 1,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "DeliveryAddressPostcode"
                },
                {
                    "Name": "DeliveryAddressLine1",
                    "DataType": 1,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "DeliveryAddressLine1"
                },
                {
                    "Name": "ForDeliveryOn",
                    "DataType": 3,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "For Delivery On"
                },
                {
                    "Name": "ForDeliveryBy",
                    "TargetTypeId": "af3d4af1-cd8d-11e4-b98c-ef0795308bb6",
                    "DataType": 7,
                    "IsArray": false,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "For Delivery By"
                },
                {
                    "Name": "DeliveryAddressCity",
                    "DataType": 1,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "DeliveryAddressCity"
                },
                {
                    "Name": "DeliveryName",
                    "DataType": 1,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "Delivery Name"
                },
                {
                    "Name": "DeliveryItemType",
                    "DataType": 1,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "Delivery Item Type"
                },
                {
                    "Name": "DeliveryItem",
                    "DataType": 1,
                    "ContentTypeId": "420bfc60-ce1e-11e4-b8d8-4dff9a2de684",
                    "Title": "Delivery Item"
                }
            ]
        }
    },
    "Data": {
        "DeliveryOrder": [
            {
                "DeliveryAddressCity": "Seattle",
                "DeliveryAddressLine1": "8904 Aurora Ave N",
                "DeliveryAddressPostcode": "WA 98103-3920",
                "DeliveryItemType": "Documents",
                "ForDeliveryOn": "2015-03-20T13:30:00.000Z",
                "ForDeliveryBy": "3352b7f0-ce1d-11e4-9d62-e777a36e39bd",
                "DeliveryName": "John Smith",
                "DeliveryItem": "Tax forms",
                "Id": "1b84f2c0-ce2f-11e4-8fe7-b71c41ce25e4"
            },
            {
                "DeliveryAddressCity": "Seattle",
                "DeliveryAddressLine1": "4750 California Ave Sw",
                "DeliveryAddressPostcode": "WA 98116-4413",
                "DeliveryItemType": "Electronics",
                "ForDeliveryOn": "2015-03-20T12:30:00.000Z",
                "ForDeliveryBy": "3352b7f0-ce1d-11e4-9d62-e777a36e39bd",
                "DeliveryItem": "Kindle Paperwhite",
                "DeliveryName": "Sarah Williams",
                "Id": "efb8ca40-ce2e-11e4-a9bf-71064cfba37d"
            },
            {
                "ForDeliveryBy": "3352b7f0-ce1d-11e4-9d62-e777a36e39bd",
                "DeliveryItemType": "Books",
                "ForDeliveryOn": "2015-03-20T10:00:00.000Z",
                "DeliveryAddressCity": "Seattle",
                "DeliveryAddressPostcode": "WA 98104",
                "DeliveryAddressLine1": "100 Main St",
                "DeliveryItem": "Game of Thrones",
                "DeliveryName": "Matrim Cauthon",
                "Id": "44520180-ce2e-11e4-8fe7-b71c41ce25e4"
            },
            {
                "DeliveryAddressLine1": "122 Cherry St",
                "DeliveryAddressCity": "Seattle",
                "DeliveryAddressPostcode": "WA 98104-2206",
                "DeliveryItemType": "Electronics",
                "ForDeliveryOn": "2015-03-20T10:00:00.000Z",
                "ForDeliveryBy": "3352b7f0-ce1d-11e4-9d62-e777a36e39bd",
                "DeliveryItem": "Macbook Air",
                "DeliveryName": "Phil Johnson",
                "Id": "b7731eb0-ce2e-11e4-9d62-e777a36e39bd"
            }
        ]
    }
};