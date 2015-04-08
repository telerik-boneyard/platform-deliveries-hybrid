'use strict';



app.models.deliveriesView = (function() {
    return {
        onShow: function(e) {
            var filteredStatus = null;
            
            //Handle UI logic based on the filter of the view
            var filter = e.view.params.filter;
            $('#div-loading-deliveries').show();
            if (filter === 'pending') {
                filteredStatus = [Constants.OrderStatus.Pending, Constants.OrderStatus.Current];
                $('#title-deliveries').text('Pending Orders');
                $('#div-no-deliveries').text('No pending orders found.');
            } else if (filter === 'completed') {
                filteredStatus = [Constants.OrderStatus.Delivered];
                $('#title-deliveries').text('Delivered Orders');
                $('#div-no-deliveries').text('No delivered orders found.');
            } else if (filter === 'failed') {
                filteredStatus = [Constants.OrderStatus.Refused, Constants.OrderStatus.Problem];
                $('#title-deliveries').text('Failed Orders');
                $('#div-no-deliveries').text('No failed orders found.');
            } else {
                $('#title-deliveries').text('All Orders');
                $('#div-no-deliveries').text('No orders found.');
            }
            
            var currentFilter = null;
            
            //Set filter for the Kendo DataSource
            if (filteredStatus && filteredStatus.length !== 0) {
                currentFilter = {logic: 'or', filters: []};
                for(var i = 0; i < filteredStatus.length; i++){
                	currentFilter.filters.push({field: 'Status', operator: 'eq', value: filteredStatus[i]});
                }
            }
            
            app.models.deliveriesView.deliveriesViewList.viewModel.dataSource.filter(currentFilter);    
            
            app.models.deliveriesView.deliveriesViewList.viewModel.dataSource.read();
        },
        onHide: function() {
            //Show the loading div to prevent UI glitches
            app.models.deliveriesView._hideAllSections();
            $('#div-loading-deliveries').show();
        },
        
        _hideAllSections: function() {
            $('#div-loading-deliveries').hide();
            $('#div-no-deliveries').hide();
            $('#div-list-deliveries').hide();
        },
        _showSection: function(sectionId) {
            app.models.deliveriesView._hideAllSections();
            $('#' + sectionId).show();
        }
    };
})();
app.models.deliveriesView.deliveriesViewList = (function() {
    //The default data provider for the app, an instance of the Telerik Backend Services SDK
    var dataProvider = app.data.defaultprovider;
    
    //Initialize the Kendo DataSource
    var source = new kendo.data.DataSource({
        type: 'everlive',
        serverFiltering: true,
        transport: {
            typeName: 'DeliveryOrder',
            dataProvider: dataProvider,
            read: {
                beforeSend: function (xhr) {
                    var currentFilter = app.models.deliveriesView.deliveriesViewList.viewModel.currentFilter;
                    if (currentFilter) {
                        xhr.setRequestHeader("X-Everlive-Filter", JSON.stringify(currentFilter));
                    }
                }
            }
        },

        schema: {
            model: {
                //Returns a friendly title for the item
                title: function() {
                    return this.get('DeliveryItem') + ' (' + this.get('DeliveryItemType') + ')';
                },
                cityAndPostcode: function() {
                    return this.get('DeliveryAddressCity') + ', ' + this.get('DeliveryAddressPostcode');
                },
                status: function() {
                    var status = 'Unknown';
                    switch (this.get('Status')) {
                        case Constants.OrderStatus.Pending:
                            status = 'Pending';
                            break;
                        case Constants.OrderStatus.Current:
                            status = 'Current';
                            break;
                        case Constants.OrderStatus.Delivered:
                            status = 'Delivered';
                            break;
                        case Constants.OrderStatus.Refused:
                        case Constants.OrderStatus.Problem:
                            status = 'Problem';
                            break;
                    }
                    
                    return status;
                },
                //Handle the icon for list items
                icon: function() {
                    var i = 'check';
                    switch (this.get('Status')) {
                        case Constants.OrderStatus.Pending:
                            i = 'pending';
                            break;
                        case Constants.OrderStatus.Current:
                            i = 'current';
                            break;
                        case Constants.OrderStatus.Delivered:
                            i = 'delivered';
                            break;
                        case Constants.OrderStatus.Refused:
                        case Constants.OrderStatus.Problem:
                            i = 'problem';
                            break;
                    }
                    return kendo.format('km-icon km-{0}', i);
                }

            }
        },
        
        change: function(e) {
            //Handle the case when no items are found
            var data = this.data();
            if (data.length) {
                app.models.deliveriesView._showSection('div-list-deliveries');
            } else {
                app.models.deliveriesView._showSection('div-no-deliveries');
            }
        },
        
        serverSorting: true,
        serverPaging: true,
        pageSize: 50,
        autoBind: false
    });

    var viewModel = kendo.observable({
        dataSource: source,
        currentFilter: null,
        currentItem: null,
        statuses: [
            { name: "Pending", value: Constants.OrderStatus.Pending},
            { name: "Current", value: Constants.OrderStatus.Current},
            { name: "Delivered", value: Constants.OrderStatus.Delivered}
        ],

        itemClick: function(e) {
            app.mobileApp.navigate('deliveriesView/details.html?uid=' + e.dataItem.uid);
        },
        onDetailsViewShow: function(e) {
            var item = e.view.params.uid;
            var itemModel = source.getByUid(item);
            viewModel.set('currentItem', itemModel);
        },
        editItem: function(e) {
            app.mobileApp.navigate('deliveriesView/edit.html');
        },
        onEditViewShow: function(e) {
            //$("#dropdown").kendoDropDownList();
            ////Initialize values
            //var currentItem = viewModel.get('currentItem');
            //$('#comment-textarea').val(currentItem.Comments);
        },
        onSaveClick: function(e) {
            var comment = $('#comment-textarea').val();
            
            var currentItem = viewModel.get('currentItem');
            currentItem.Comments = comment;
            source.sync();
            
            app.mobileApp.navigate("#:back");
        }
    });

    return {
        viewModel: viewModel
    };
})();