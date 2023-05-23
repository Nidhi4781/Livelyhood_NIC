var WebApp = {
    Init: function () {
        WebApp.Events.Init();
    },
    Events: {
        Init: function () {
            WebApp.Events.BindStaticEvents();
            WebApp.Events.BindLiveEvents();
        },
        BindStaticEvents: function () {

            $('input[type=number],input.Number').keypress(function (event) {
                var keycode = event.which;
                if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
                    event.preventDefault();
                }
            });

            //$(document).on('change focusout summernote.change', 'input,select,textarea', function () {
            //    if ($(this).is('[data-val="true"]')) {
            //        $(this).valid();

            //    }
            //});

            //$(document).on('change summernote.change', 'input,select,textarea', function () {
            //    if ($(this).is('[data-val="true"]')) {
            //        $(this).valid();
            //    }
            //});

        },
        BindLiveEvents: function () {



            $('select.autocomplete').livequery(function () {
                $(this).removeClass('autocomplete')
                var source = $(this).attr('data-source');
                var multiple = $(this).attr('multiple') == 'true' ? true : false;
                var thisvalue = $(this);
                $(this).select2({
                    //multiple: multiple,
                    minimumInputLength: 0,
                    allowClear: true,
                    placeholder: function () {
                        $(this).data('placeholder');
                    },
                    ajax: {
                        delay: 150,
                        url: function () {
                            if (source == "/createtrips/GetBinumbers?transporterid=") {
                                var transporterid = $('select.transportername').val();
                                if (transporterid != null && transporterid != 0) {


                                    return '/createtrips/GetBinumbers?transporterid=' + transporterid;
                                }
                                else {
                                    alert("Please select Transporter");
                                    return false;
                                }

                            }


                            if (source == "/configuration/getvehicledimension?vehicletype=") {
                                var vehicletype = $('select.vehicletypemapp').val();
                                if (vehicletype != null && vehicletype != 0) {


                                    return '/configuration/default/getvehicledimension?vehicletype=' + vehicletype;
                                }
                                else {
                                    alert("Please select Vehicle Type");
                                    return false;
                                }

                            }



                            if (source == "/configuration/getvehiclecapacity?vehicletype=&dimension=") {
                                var vehicletype = $('select.vehicletypemapp').val();
                                var dimensionmapp = $('select.dimensionmapp').val();

                                if (dimensionmapp != null && dimensionmapp != 0 && vehicletype != null && vehicletype != 0) {


                                    return '/configuration/default/getvehiclecapacity?vehicletype=' + vehicletype + "&dimension=" + dimensionmapp;
                                }
                                else if (dimensionmapp != null && dimensionmapp != 0 && (vehicletype == null || vehicletype == undefined)) {

                                    alert("Please select Vehicle Type");
                                    return false;
                                }
                                else if (vehicletype != null && vehicletype != 0 && (dimensionmapp == null || dimensionmapp == undefined)) {

                                    alert("Please select Vehicle Dimension");
                                    return false;
                                }
                                else {
                                    alert("Please select Vehicle Type and Vehicle Dimension");
                                    return false;
                                }

                            }
                            if (source == "/configuration/GetUnLoadingPoint?loadingpoint=") {
                                var configloadingpoint = $('select.configloadingpoint').val();
                                if (configloadingpoint != null && configloadingpoint != undefined) {
                                    return '/configuration/default/GetUnLoadingPoint?loadingpoint=' + configloadingpoint;
                                }
                                else {
                                    alert("Please select Loading Point");
                                    return false;
                                }

                            }

                            if (source == "/createtrips/GetVehicleNumbers?transporterid=") {
                                var transporterid = $('select.transportername').val();
                                if (transporterid != null && transporterid != 0) {


                                    return '/createtrips/GetVehicleNumbers?transporterid=' + transporterid;
                                }
                                else {
                                    alert("Please select Transporter");
                                    return false;
                                }

                            }

                            if (source == "/createtrips/GetDrivernames?transporterid=") {
                                var transporterid = $('select.transportername').val();
                                if (transporterid != null && transporterid != 0) {


                                    return '/createtrips/GetDrivernames?transporterid=' + transporterid;
                                }
                                else {
                                    alert("Please select Transporter");
                                    return false;
                                }

                            }



                            if (source == "/createtrips/GetDriverMobileNumbers?transporterid=&drivername=") {

                                var DriverName = $('select.drivername').val();
                                var transporterid = $('select.transportername').val();
                                if (transporterid != null && transporterid != 0 && DriverName != null && DriverName != "") {


                                    return '/createtrips/GetDriverMobileNumbers?transporterid=' + transporterid + "&drivername=" + DriverName;
                                }

                                else if (transporterid != null && transporterid != 0) {


                                    return '/createtrips/GetDriverMobileNumbers?transporterid=' + transporterid + "&drivername=" + DriverName;
                                }
                                else if (DriverName != null && DriverName != "") {


                                    return '/createtrips/GetDriverMobileNumbers?transporterid=' + transporterid + "&drivername=" + DriverName;
                                }
                                else {
                                    alert("Please select Transporter");
                                    return false;
                                }

                            }
                            if (source == "/contracttransporters/gettransporterbylocation?reqid=") {
                                var requestid = $('select.contractTransporter').val();
                                if (requestid != null && vehirequestidcle != 0) {


                                    return '/contracttransporters/gettransporterbylocation?reqid=' + requestid;
                                }

                            }
                            if (source == "/materialreturns/GetTripIDS?reqid=") {
                                var vehicle = $('select.requisition').val();

                                if (vehicle != null && vehicle != 0) {


                                    return '/materialreturns/GetTripIDS?reqid=' + vehicle;
                                }
                                else {
                                    alert('Please select a Requisition');
                                    return false;
                                }
                            }

                            if (source == "/transportercontracts/Getlocation?transporterid=") {
                                var transporterid = $('select.transporterid').val();
                                if (transporterid != null && transporterid != 0) {


                                    return '/transportercontracts/Getlocation?transporterid=' + transporterid;
                                }
                                else {
                                    alert('Please select a Transporter');
                                    return false;
                                }
                            }

                            if (source == "/transportercontracts/GetLoadingPoint?transporterid=") {
                                var transporterid = $('select.transporterid').val();
                                if (transporterid != null && transporterid != 0) {


                                    return '/transportercontracts/GetLoadingPoint?transporterid=' + transporterid;
                                }
                                else {
                                    alert('Please select a Transporter');
                                    return false;
                                }
                            }


                            if (source == "/transportercontracts/GetUnloadingPoint?transporterid=&loadingpint=") {
                                var transporterid = $('select.transporterid').val();
                                var loadingpoint = thisvalue.closest('.add-more-item').find('.LoadingPoint').val();

                                if (transporterid != null && transporterid != 0 && loadingpoint != null && loadingpoint != undefined) {


                                    return '/transportercontracts/GetUnloadingPoint?transporterid=' + transporterid + '&loadingpint=' + loadingpoint;
                                }
                                else if ((transporterid == null || transporterid == 0) && (loadingpoint == null || loadingpoint == undefined)) {
                                    alert('Please select a Transporter and Loading Point');
                                    return false;
                                }
                                else if (loadingpoint == null || loadingpoint == undefined) {
                                    alert('Please select a Loading Point');
                                    return false;
                                }
                                else {
                                    alert('Please select a Transporter');
                                    return false;
                                }
                            }



                            if (source == "/transportercontracts/gettransportervehicletype?transporterid=") {
                                var transporterid = $('select.transporterid').val();

                                if (transporterid != null && transporterid != 0) {


                                    return '/transportercontracts/gettransportervehicletype?transporterid=' + transporterid;
                                }


                                else {
                                    alert('Please select a Transporter');
                                    return false;
                                }
                            }

                            if (source == "/transportercontracts/GetTransporterVehicleSize?transporterid=&vehicletype=") {
                                var transporterid = $('select.transporterid').val();
                                var vehilcetype = thisvalue.closest('.add-more-item').find('.ContractVehicleType').val();

                                if (transporterid != null && transporterid != 0 && vehilcetype != null && vehilcetype != undefined) {


                                    return '/transportercontracts/GetTransporterVehicleSize?transporterid=' + transporterid + '&vehicletype=' + vehilcetype;
                                }
                                else if ((transporterid == null || transporterid == 0) && (vehilcetype == null || vehilcetype == undefined)) {
                                    alert('Please select a Transporter and Vehicle Type');
                                    return false;
                                }
                                else if (vehilcetype == null || vehilcetype == undefined) {
                                    alert('Please select a Vehicle Type');
                                    return false;
                                }

                                else {
                                    alert('Please select a Transporter');
                                    return false;
                                }
                            }
                            if (source == "/transportercontracts/GetVehicleSize?vehicletype=") {
                                //debugger;
                                var vehilcetype = thisvalue.closest('.add-more-item').find('.ContractVehicleType').val();

                                if (vehilcetype != null && vehilcetype != undefined) {


                                    return '/transportercontracts/GetVehicleSize?vehicletype=' + vehilcetype;
                                }

                                else {
                                    alert('Please select Vehicle Type');
                                    return false;

                                }
                            }
                            if (source == "/LogisticsVehicleRequisitions/GetVehicleSizes?ID=&Materialtype=") {
                                var vehicle = $('select.VehicleType').val();
                                var materialtype = $('.MaterialType').val();

                                if (vehicle != null && vehicle != 0) {
                                    if (materialtype != null && materialtype != undefined) {
                                        return '/LogisticsVehicleRequisitions/GetVehicleSizes?ID=' + vehicle + '&Materialtype=' + materialtype;

                                    }
                                    else {
                                        alert('Please select a Material Type');
                                        return false;
                                    }

                                }
                                else {
                                    alert('Please select a Vehicle Type');
                                    return false;
                                }
                            }


                            if (source == "/logisticsconvertbids/GetVehicles?vehicletype=") {
                                var vehicle = $('.bidvehicletype').val();

                                if (vehicle != null && vehicle != 0) {

                                    return '/logisticsconvertbids/GetVehicles?vehicletype=' + vehicle;


                                }

                            }

                            if (source == "/logisticsconvertbids/GetVehiclesContract?transporterid=") {
                                var transporterid = $('.contractTransporter').val();

                                if (transporterid != null && transporterid != 0) {

                                    return '/logisticsconvertbids/GetVehiclesContract?transporterid=' + transporterid;

                                }
                                else {
                                    alert('Please select a Transporter');
                                    return false;
                                }
                            }
                            if (source == "/LogisticsVehicleRequisitions/GetVehicles?Materialtype=") {
                                // //debugger;
                                var materialtype = $('.MaterialType').val();


                                if (materialtype != null && materialtype != undefined) {
                                    return '/LogisticsVehicleRequisitions/GetVehicles?Materialtype=' + materialtype;

                                }
                                else {
                                    alert('Please select a Material Type');
                                    return false;
                                }


                            }


                            if (source == "/logisticsconvertbids/GetVehicleSizes?ID=&requestids=") {

                                var type = $('select.VehicleType').val();
                                var requestids = $('.RequisitionId').val();

                                if (type != null && type != undefined && requestids != null) {
                                    return '/logisticsconvertbids/GetVehicleSizes?ID=' + type + "&requestids=" + requestids;

                                }
                                else {
                                    alert('Please select a Vehicle Type');
                                    return false;
                                }

                            }
                            if (source == "/LogisticsVehicleRequisitions/GetVehicleDimension?ID=&Materialtype=&size=") {
                                var vehicletype = $('select.VehicleType').val();
                                var materialtype = $('.MaterialType').val();
                                var vehiclesize = $('select.VehicleSize').val();

                                if (vehicletype != null && vehicletype != undefined && materialtype != null && materialtype != undefined && vehiclesize != null && vehiclesize != undefined) {


                                    return '/LogisticsVehicleRequisitions/GetVehicleDimension?ID=' + vehicletype + '&Materialtype=' + materialtype + '&size=' + vehiclesize;
                                }
                                else if (vehicletype != null && vehicletype != undefined && materialtype != null && materialtype != undefined) {
                                    alert('Please select a vehicle capacity');
                                    return false;
                                }
                                else if (vehicletype != null && vehicletype != undefined) {
                                    alert('Please select a Material Type and vehicle capacity');
                                    return false;
                                }
                                else if (materialtype != null && materialtype != undefined) {
                                    alert('Please select a Vehicle Type and Vehicle Capacity');
                                    return false;
                                }
                                else if (vehicletype != null && vehicletype != undefined && vehiclesize != null && vehiclesize != undefined) {
                                    alert('Please select a Material Type');
                                    return false;
                                }
                                else if (vehiclesize != null && vehiclesize != undefined && materialtype != null && materialtype != undefined) {
                                    alert('Please select a Vehicle Type');
                                    return false;
                                }
                                else {
                                    alert('Please select a Vehicle Type ,Material Type and Vehicle Capacity');
                                    return false;
                                }
                            }




                            if (source == "/logisticsconvertbids/GetVehicleDimension?ID=&requestids=&size=") {
                                var vehicletype = $('select.VehicleType').val();
                                var requestids = $('input.RequisitionId').val();

                                var vehiclesize = $('select.VehicleSize').val();

                                if (vehicletype != null && vehicletype != undefined && requestids != null && requestids != undefined && vehiclesize != null && vehiclesize != undefined) {


                                    return '/logisticsconvertbids/GetVehicleDimension?ID=' + vehicletype + '&requestids=' + requestids + '&size=' + vehiclesize;
                                }
                                else if (vehicletype != null && vehicletype != undefined && requestids != null && requestids != undefined) {
                                    alert('Please select a vehicle capacity');
                                    return false;
                                }
                                else if (vehicletype != null && vehicletype != undefined) {
                                    alert('Please select a Material Type and vehicle capacity');
                                    return false;
                                }
                                else if (requestids != null && requestids != undefined) {
                                    alert('Please select a Vehicle Type and Vehicle Capacity');
                                    return false;
                                }

                                else if (vehiclesize != null && vehiclesize != undefined && requestids != null && requestids != undefined) {
                                    alert('Please select a Vehicle Type');
                                    return false;
                                }
                                else {
                                    alert('Please select a Vehicle Type and Vehicle Capacity');
                                    return false;
                                }
                            }
                            if (source == "/LogisticsVehicleRequisitions/GetCustomer?type=") {
                                var vehicle = $('select.type').val();
                                if (vehicle != null && vehicle != 0) {


                                    return '/LogisticsVehicleRequisitions/GetCustomer?type=' + vehicle;
                                }
                                else {
                                    alert('Please select Ship To');
                                    return false;
                                }
                            }
                            if (source == "/logisticsconvertbids/Getvehiclerequisitions?unloadedreq=") {
                                var unloadedreq = $('input.requisitionID').val();
                                if (unloadedreq != null && unloadedreq != undefined) {


                                    return '/logisticsconvertbids/Getvehiclerequisitions?unloadedreq=' + unloadedreq;
                                }

                            }
                            if (source == "/LogisticsVehicleRequisitions/GetUnLoadingLocations?unloadingPoint=") {
                                var locationgrpid = thisvalue.closest('.add_more_requisition_unloading').find('.add_unloading').val();
                                var locationgrpidexport = $('.add_Point').val();
                                var locationgrpidinternal = $('.ShipFromAddress').val();
                                var loading = $('select.ShipFromAddress').val();
                                //debugger;
                                if (locationgrpid != null && locationgrpid != 0) {


                                    return '/LogisticsVehicleRequisitions/GetUnLoadingLocations?unloadingPoint=' + locationgrpid;
                                }
                                if (locationgrpidexport != null && locationgrpidexport != 0) {


                                    return '/LogisticsVehicleRequisitions/GetUnLoadingLocations?unloadingPoint=' + locationgrpidexport;
                                }
                                else if (locationgrpidinternal != null && locationgrpidinternal != 0) {


                                    return '/LogisticsVehicleRequisitions/GetUnLoadingLocations?unloadingPoint=' + locationgrpidinternal;
                                }
                                else {
                                    alert('Please select a Delivery Point');
                                    return false;
                                }
                            }
                            if (source == "/LogisticsVehicleRequisitions/GetUnLoadingPoints?loadingPoint=&IDs=") {
                                //debugger
                                var loading = $('select.ShipFromAddress').val();
                                var materialtype = $('.MaterialType').val();

                                var _itemIDs = "";

                                $('.add_more_requisition_unloading').each(function (index, item) {
                                    var _temp = $(item).find('.loading_point').val();

                                    if (_temp != null && _temp != "" && _temp != undefined) {
                                        if (_itemIDs == "") {

                                            _itemIDs = _temp;
                                        }
                                        else {

                                            _itemIDs = _itemIDs + "," + _temp;
                                        }

                                    }
                                });

                                if (loading != null && loading != 0 && loading != "" && loading != undefined) {


                                    return '/LogisticsVehicleRequisitions/GetUnLoadingPoints?loadingPoint=' + loading + '&IDs=' + _itemIDs;
                                }
                                else {
                                    if (materialtype == "Export") {
                                        alert('Please select a Plant Loading Location');

                                    }
                                    else {
                                        alert('Please select a Loading Point');

                                    }
                                    return false;
                                }
                            }
                            if (source == "/LogisticsVehicleRequisitions/GetPersonDetails?type=") {

                                var loading = $('.ShippingType').val();

                                if (loading != null && loading != 0) {


                                    return '/LogisticsVehicleRequisitions/GetPersonDetails?type=' + loading;
                                }
                                else {
                                    alert('Please select a Shipping Type');
                                    return false;
                                }
                            }
                            if (source == "/LogisticsVehicleRequisitions/SupplyContractCondition?materialtype=") {

                                var materialtype = $('.MaterialType').val();

                                if (materialtype != null && materialtype != 0) {


                                    return '/LogisticsVehicleRequisitions/SupplyContractCondition?materialtype=' + materialtype;
                                }
                                else {
                                    alert('Please select a Material Type');
                                    return false;
                                }
                            }
                            if (source == "/LogisticsVehicleRequisitions/GetPackingType?material=") {
                                //debugger
                                var materialtype = $('.MaterialType').val();
                                var locationgrpid = thisvalue.parent().parent().parent().find('select.Material_description').val();
                                //var materialtype = $(this).closest('.add-more-material-item').find('select.Material_description').val();
                                if (materialtype != null && materialtype != undefined) {
                                    if (locationgrpid != null && locationgrpid != 0 && locationgrpid != undefined) {

                                        return '/LogisticsVehicleRequisitions/GetPackingType?material=' + locationgrpid;
                                    }
                                    else {
                                        alert('Please select a Material');
                                        return false;
                                    }
                                }
                                else {
                                    alert('Please select a Material Type');
                                    return false;
                                }

                            }
                            if (source == "/LogisticsVehicleRequisitions/GetBirdSize?material=") {
                                //debugger
                                var materialtype = $('.MaterialType').val();
                                var locationgrpid = thisvalue.parent().parent().parent().find('select.Material_description').val();
                                //var materialtype = $(this).closest('.add-more-material-item').find('select.Material_description').val();
                                if (materialtype != null && materialtype != undefined) {
                                    if (locationgrpid != null && locationgrpid != 0 && locationgrpid != undefined) {

                                        return '/LogisticsVehicleRequisitions/GetBirdSize?material=' + locationgrpid;
                                    }
                                    else {
                                        alert('Please select a Material');
                                        return false;
                                    }
                                }
                                else {
                                    alert('Please select a Material Type');
                                    return false;
                                }

                            }

                            if (source == "/LogisticsVehicleRequisitions/GetPackingTypeRawMaterial?material=") {
                                //debugger
                                var materialtype = $('.MaterialType').val();
                                var locationgrpid = $('.commodityname').val();
                                if (materialtype != null && materialtype != undefined) {
                                    if (locationgrpid != null && locationgrpid != 0 && locationgrpid != undefined) {

                                        return '/LogisticsVehicleRequisitions/GetPackingTypeRawMaterial?material=' + locationgrpid;
                                    }
                                    else {
                                        alert('Please select a Material');
                                        return false;
                                    }
                                }
                                else {
                                    alert('Please select a Material Type');
                                    return false;
                                }

                            }
                            if (source == "/LogisticsVehicleRequisitions/GetMaterials?materialtype=") {

                                var materialtype = $('.MaterialType').val();

                                if (materialtype != null && materialtype != 0 && materialtype != undefined && materialtype != "") {


                                    return '/LogisticsVehicleRequisitions/GetMaterials?materialtype=' + materialtype;
                                }
                                else {
                                    alert('Please select a Material Type');
                                    return false;
                                }
                            }




                            if (source == "/logisticsbiddings/GetTransporters?bidId=") {
                                var bidid = $('input.bidid').val();
                                if (bidid != null && bidid != 0) {


                                    return '/logisticsbiddings/GetTransporters?bidId=' + bidid;
                                }
                                else {
                                    alert('Please select a transporter');
                                    return false;
                                }
                            }

                            if (source == "/transporters/GetStates?loadingpint=") {

                                var loadingpoint = thisvalue.closest('div.add-more-item').find('select.LoadingPoint').val();


                                if (loadingpoint != null && loadingpoint != undefined) {


                                    return '/transporters/GetStates?loadingpint=' + loadingpoint;
                                }
                                else {
                                    alert('Please select a Loading Point');
                                    return false;
                                }
                            }
                            if (source == "/UserMappings/GetUsers?ApplicationProfile=") {

                                var loadingpoint = $('.ApplicationProfile').val();
                                //debugger;

                                if (loadingpoint != null && loadingpoint != undefined) {


                                    return '/UserMappings/GetUsers?ApplicationProfile=' + loadingpoint;
                                }
                                else {
                                    alert('Please select a Application Profile');
                                    return false;
                                }
                            }
                            if (source == "/transporters/GetAreas?ID=&loadingpint=") {

                                var state = thisvalue.closest('div.add-more-item').find('select.state').val();
                                var loadingpoint = thisvalue.closest('div.add-more-item').find('select.LoadingPoint').val();



                                if (state != null && state != "" && loadingpoint != null && loadingpoint != undefined) {

                                    if (state == null || state == "") {
                                        alert('Please select a State');
                                        return false;
                                    }
                                    else if (loadingpoint == null || loadingpoint == undefined) {
                                        alert('Please select a Loading Point');
                                        return false;
                                    }
                                    else {
                                        return '/transporters/GetAreas?ID=' + state + '&loadingpint=' + loadingpoint;

                                    }
                                }

                                else {
                                    alert('Please select a State and Loading Point');
                                    return false;
                                }
                            }
                            //-----------------------internal logistics----------------------
                            if (source == "/Internal/VehicleRequisition/GetMaterials?ID=") {
                                var shiftingid = $('select.shifting_category').val();
                                if (shiftingid != null && shiftingid != 0) {


                                    return '/Internal/VehicleRequisition/GetMaterials?ID=' + shiftingid;
                                }
                                else {
                                    alert('Please select a Shifting Category');
                                    return false;
                                }
                            }
                            if (source == "/Internal/VehicleRequisition/GetUOM?ID=") {
                                var materialid = $('select.material_category').val();
                                if (materialid != null && materialid != 0) {


                                    return '/Internal/VehicleRequisition/GetUOM?ID=' + materialid;
                                }
                                else {
                                    alert('Please select a Material Name');
                                    return false;
                                }
                            }
                            if (source == "/Internal/VehicleRequisition/GetVehicle?capacity=") {
                                var capacity = $('select.veh_capacity').val();
                                if (capacity != null && capacity != 0) {


                                    return '/Internal/VehicleRequisition/GetVehicle?capacity=' + capacity;
                                }
                                else {
                                    alert('Please select a Vehicle Size');
                                    return false;
                                }
                            }
                            if (source == "/Internal/VehicleRequisition/GetMaterials?filter=") {
                                var type = $('select.veh_type').val();
                                var filter = $('#MaterialType').val();

                                if (filter != null) {


                                    return '/Internal/VehicleRequisition/GetMaterials?filter=' + filter;
                                }
                                //else {
                                //    alert('Please select a Vehicle Type');
                                //    return false;
                                //}
                            }
                            if (source == "/Internal/VehicleRequisition/GetVehicleCapacity?vehicletype=&reqqty=") {
                                var bodytype = $('.vehicletype').val();
                                var reqqty = $('.reqqty').val();
                                if (bodytype != null && reqqty != null) {


                                    return '/Internal/VehicleRequisition/GetVehicleCapacity?vehicletype=' + bodytype + '&reqqty=' + reqqty;
                                }
                                //else {
                                //    alert('Please select a Vehicle Capacity');
                                //    return false;
                                //}
                            }

                            if (source == "/Internal/VehicleRequisition/GetVehicleCapacitys?vehicletype=&reqqty=") {
                                var bodytype = $('.vehicletype').val();
                                var reqqty = $('.Requisitionqty_dispatchplan').val();
                                if (bodytype != null && reqqty != null) {


                                    return '/Internal/VehicleRequisition/GetVehicleCapacitys?vehicletype=' + bodytype + '&reqqty=' + reqqty;
                                }
                                //else {
                                //    alert('Please select a Vehicle Capacity');
                                //    return false;
                                //}
                            }

                            if (source == "/Internal/Trips/GetVehicle?capacity=") {
                                var capacity = $('.capacity').val();
                                if (capacity != null) {


                                    return '/Internal/Trips/GetVehicle?capacity=' + capacity;
                                }
                                else {
                                    alert('Please select a Vehicle Size');
                                    return false;
                                }
                            }
                            if (source == "/Internal/Trips/GetDriver?vehicle=") {
                                var vehicle = $('.veh_name').val();
                                if (vehicle != null && vehicle != 0) {


                                    return '/Internal/Trips/GetDriver?vehicle=' + vehicle;
                                }
                                else {
                                    alert('Please select a Vehicle');
                                    return false;
                                }
                            }
                            if (source == "/Internal/Trips/GetVehicleCapacity?reqid=") {
                                var reqid = $('#reqid').val();
                                if (reqid != null && reqid != null) {


                                    return '/Internal/Trips/GetVehicleCapacity?reqid=' + reqid;
                                }
                                //else {
                                //    alert('Please select a Vehicle Capacity');
                                //    return false;
                                //}
                            }
                            if (source == "/Internal/Trips/GetVehicleCapacities?reqid=") {
                                var reqid = $('#reqid').val();
                                if (reqid != null && reqid != null) {
                                    return '/Internal/Trips/GetVehicleCapacity?reqid=' + reqid;
                                }
                                //else {
                                //    alert('Please select a Vehicle Capacity');
                                //    return false;
                                //}
                            }
                            if (source == "/Internal/Trips/GetTransporters?id=") {
                                var dispatchid = $('.dispatchid').val();
                                if (dispatchid != null && dispatchid != null) {
                                    return '/Internal/Trips/GetTransporters?id=' + dispatchid;
                                }
                            }


                            //-----------------------internal logistics----------------------

                            //------------------------Warehouse------------------------------------
                            if (source == "/Secondary/DispatchedVehicles/GetstoNumbers?assigndriverid=") {
                                var tripid = $('input.AssignDriverId').val();
                                if (tripid != null && tripid != 0) {
                                    return '/Secondary/DispatchedVehicles/GetstoNumbers?assigndriverid=' + tripid;
                                }
                            }
                            //if (source == "/Secondary/GoodsIssue/GetFarmersByWhid?id=") {
                            //    var whid = $('input.shipfromid').val();
                            //    if (whid != null && whid != 0) {
                            //        return '/Secondary/GoodsIssue/GetFarmersByWhid?id=' + whid;
                            //    }
                            //}

                            /*Initiate Dispatch*/
                            if (source == "/Secondary/GoodsIssue/GetFarmersByWh?id=&&fid=") {
                                var whid = $('input.shipfromid').val();
                                var fid = $('input.ShipToid').val();
                                if (whid != null && whid != 0 && fid != null && fid != 0) {
                                    return '/Secondary/GoodsIssue/GetFarmersByWh?id=' + whid + '&&fid=' + fid;
                                }
                            }
                            if (source == "/Secondary/GoodsIssue/GetWarehousesById?id=") {
                                var whid = $('input.shipfromid').val();
                                if (whid != null && whid != 0) {
                                    return '/Secondary/GoodsIssue/GetWarehousesById?id=' + whid;
                                }
                            }
                            /*Initiate Dispatch*/

                            if (source == "/Secondary/MaterialReturn/GetMaterialsByFeedID?ID=") {
                                var feedid = $('select.feedllist').val();

                                if (feedid != null && feedid != 0) {
                                    return '/Secondary/MaterialReturn/GetMaterialsByFeedID?ID=' + feedid;
                                }
                                else {
                                    alert('Please select a Feed Type');
                                    return false;
                                }
                            }
                            if (source == "/Secondary/FeedStock/GetMaterialsByFeedID?ID=") {
                                var feedid = $('select.feedllist').val();

                                if (feedid != null && feedid != 0) {
                                    return '/Secondary/FeedStock/GetMaterialsByFeed?ID=' + feedid;
                                }
                                else {
                                    alert('Please select a Feed Type');
                                    return false;
                                }
                            }
                            if (source == "/Secondary/GoodsIssue/GetVehicleSizes?ID=") {
                                var typeid = $('select._vehicletypes').val();
                                if (typeid != null && typeid != 0) {
                                    return '/Secondary/GoodsIssue/GetVehicleSizes?ID=' + typeid;
                                }
                                else {
                                    alert('Please select a Vehicle Type');
                                    return false;
                                }
                            }
                            if (source == "/Secondary/Trips/GetVehicleSizes?ID=") {
                                var typeid = $('select._vehicletypes').val();
                                if (typeid != null && typeid != 0) {
                                    return '/Secondary/Trips/GetVehicleSizes?ID=' + typeid;
                                }
                                else {
                                    alert('Please select a Vehicle Type');
                                    return false;
                                }
                            }
                            if (source == "/Secondary/Transporters/GetAreas?ID=") {
                                var state = $('select.state').val();

                                if (state != null && state != 0) {
                                    return '/Secondary/Transporters/GetAreas?ID=' + state;
                                }
                                else {
                                    alert('Please select a State');
                                    return false;
                                }
                            }
                            if (source == "/Secondary/GoodsIssue/GetFarmers?ID=") {
                                var state = $('select.shipfromlist').val();
                                if (state != null && state != 0) {
                                    return '/Secondary/GoodsIssue/GetFarmers?ID=' + state;
                                }
                                else {
                                    alert('Please select a Ship From warehouse');
                                    return false;
                                }
                            }
                            //------------------------Warehouse------------------------------------

                            return source;
                        },
                        dataType: 'json',
                        data: function (params) {
                            var query = {
                                q: params.term || null,
                                i: params.page || 1
                            }
                            return query;
                        },
                        results: function (data, page) {
                            var _hasMoreResults = (page * 20) < data.Total;
                            return {
                                results: data.Results,
                                more: _hasMoreResults
                            };
                        }
                    },
                });

                var deafult = $(this).attr('data-select2-default');

                if (typeof deafult !== typeof undefined && deafult !== false && deafult !== 'null') {

                    var _defaultValue = JSON.parse($(this).attr('data-select2-default'));
                    var _options = [];
                    if (Array.isArray(_defaultValue)) {
                        $.each(_defaultValue, function (index, item) {
                            _options.push(new Option(item.text, item.id, true, true));
                        });
                    } else {
                        _options.push(new Option(_defaultValue.text, _defaultValue.id, true, true));
                    }

                    $(this).append(_options).trigger('change');
                }
            });


        }
    },
    Core: {
        RebindFormValidation: function () {
            $("form")
                .removeData("validator")
                .removeData("unobtrusiveValidation");

            $.validator
                .unobtrusive
                .parse("form");
        },

        ProcessNames: function () {
            function SetAttributes(index, item) {

                $(item).find('input.add_unloading, textarea.add_unloading, select.add_unloading').attr('id', function (i, attr) {
                    if (attr != undefined) {

                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + name
                    }
                });

                $(item).find('select.add_unloading').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + name
                    }
                });

                $(item).find('input.add_unloading, textarea.add_unloading').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + name
                    }
                });

                $(item).find('input.add_unloading, text.add_unloading').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];
                        return prefix + '[' + index + '].' + name
                    }
                });

                //$(item).find('span.add_unloading').not(".materialdata").attr('data-valmsg-for', function (i, attr) {
                //    if (attr != undefined) {
                //        var name = attr.split('.')[1];
                //        var prefix = attr.split('[')[0];

                //        return prefix + '[' + index + '].' + name
                //    }
                //});

                //$(item).find('span.text-danger.add_unloading').not(".materialdata").attr('data-valmsg-for', function (i, attr) {
                //    if (attr != undefined) {
                //        var name = attr.split('.')[1];
                //        var prefix = attr.split('[')[0];

                //        return prefix + '[' + index + '].' + name
                //    }
                //});

                $(item).find('select2-offscreen').not(".materialdata").attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + name
                    }
                });
            }
            function SetAttributes1(index, item) {
                $(item).find('input.add_data, textarea.add_data, select.add_data').attr('id', function (i, attr) {
                    if (attr != undefined) {

                        var name = attr.split('.')[2];
                        var prefix = attr.split('[')[1];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select.add_data').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input.add_data, textarea.add_data').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input.add_data, text.add_data').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.field-validation-valid,span.add_data').not(".materialdata").attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.text-danger,span.add_data').not(".materialdata").attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select2-offscreen').not(".materialdata").attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });
            }

            function SetMaterialAttributes(index, item, item1, index1) {

                var name1 = "UnloadingPoints[" + index1 + "]";

                //$(item1).find('input, textarea, select').attr('name', function (i, attr) {

                //    var name2 = attr.split('[')[0];
                //    alert(name2);
                //    name1 = name2 + '[' + index1 + ']'
                //    //name1 = name1.split('[')[0] + '[' + i + '].'

                //});
                $(item).find('input.add_data, textarea.add_data, select.add_data').attr('id', function (i, attr) {
                    if (attr != undefined) {

                        var name = attr.split('.')[2];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[1];

                        return name1 + '.' + prefix2.split('[')[0] + '[' + index + '].' + name
                    }
                });

                $(item).find('select.add_data').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[2];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[1];

                        return name1 + '.' + prefix2.split('[')[0] + '[' + index + '].' + name
                    }
                });

                $(item).find('input.add_data, textarea.add_data').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[2];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[1];

                        return name1 + '.' + prefix2.split('[')[0] + '[' + index + '].' + name
                    }
                });

                $(item).find('input.add_data, text.add_data').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[2];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[1];

                        return name1 + '.' + prefix2.split('[')[0] + '[' + index + '].' + name
                    }
                });

                $(item).find('span.add_data').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[2];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[1];

                        return name1 + '.' + prefix2.split('[')[0] + '[' + index + '].' + name
                    }
                });

                $(item).find('span.text-danger.add_data').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[2];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[1];

                        return name1 + '.' + prefix2.split('[')[0] + '[' + index + '].' + name
                    }
                });

                $(item).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[2];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[1];

                        return name1 + '.' + prefix2.split('[')[0] + '[' + index + '].' + name
                    }
                });
            }
            function SetLoadingMaterialAttributes(index1, item1, item, index, item2, index2) {
                var name1 = "ShippingAddress[" + index + "]"; "";

                var name2 = "";
                $(item).find('input.add_data, textarea.add_data, select.add_data').attr('name', function (i, attr) {
                    var name3 = attr.split('.')[1];


                    //name1 = name1.split('[')[0] + '[' + i + '].'

                });
                $(item2).find('input.add_unloading, textarea.add_unloading, select.add_unloading').attr('name', function (i, attr) {
                    var name = attr.split('[')[0];
                    name2 = "UnloadingPoints[" + index2 + "]"
                    //name1 = name1.split('[')[0] + '[' + i + '].'

                });
                //$(item).find('input.material_data_item, textarea.material_data_item, select.material_data_item').attr('id', function (i, attr) {
                //    if (attr != undefined) {


                //        var name = attr.split('.')[3];
                //        var prefix1 = attr.split('.')[0];
                //        var prefix2 = attr.split('.')[2];

                //        return name2 + '.' + name1 + '.' + prefix2.split('[')[0] + '[' + index1 + '].' + name
                //    }
                //});

                $(item1).find('select.material_data_item').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[3];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[2];

                        return name2 + '.' + name1 + '.' + prefix2.split('[')[0] + '[' + index1 + '].' + name
                    }
                });

                $(item1).find('input.material_data_item, textarea.material_data_item').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[3];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[2];

                        return name2 + '.' + name1 + '.' + prefix2.split('[')[0] + '[' + index1 + '].' + name
                    }
                });

                $(item1).find('input.material_data_item, text.material_data_item').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[3];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[2];

                        return name2 + '.' + name1 + '.' + prefix2.split('[')[0] + '[' + index1 + '].' + name
                    }
                });

                $(item1).find('span.material_data_item').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[3];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[2];

                        return name2 + '.' + name1 + '.' + prefix2.split('[')[0] + '[' + index1 + '].' + name
                    }
                });

                $(item1).find('span.text-danger.material_data_item').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[3];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[2];

                        return name2 + '.' + name1 + '.' + prefix2.split('[')[0] + '[' + index1 + '].' + name
                    }
                });

                $(item1).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[3];
                        var prefix1 = attr.split('.')[0];
                        var prefix2 = attr.split('.')[2];

                        return name2 + '.' + name1 + '.' + prefix2.split('[')[0] + '[' + index1 + '].' + name
                    }
                });
            }
            function SetMaterialAttributesval(index2, item2) {

                $(item2).find('input.add_unloading, textarea.add_unloading, select.add_unloading').attr('id', function (i, attr) {
                    if (attr != undefined) {


                        var name = attr.split('.')[1];
                        var prefix1 = attr.split('.')[0];


                        return prefix1.split('[')[0] + '[' + index2 + '].' + name
                    }
                });

                $(item2).find('select.add_unloading').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix1 = attr.split('.')[0];


                        return prefix1.split('[')[0] + '[' + index2 + '].' + name
                    }
                });

                $(item2).find('input.add_unloading, textarea.add_unloading').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix1 = attr.split('.')[0];


                        return prefix1.split('[')[0] + '[' + index2 + '].' + name
                    }
                });

                $(item2).find('input.add_unloading, text.add_unloading').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix1 = attr.split('.')[0];


                        return prefix1.split('[')[0] + '[' + index2 + '].' + name
                    }
                });

                $(item2).find('span.field-validation-valid').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix1 = attr.split('.')[0];


                        return prefix1.split('[')[0] + '[' + index2 + '].' + name
                    }
                });

                $(item2).find('span.text-danger').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix1 = attr.split('.')[0];


                        return prefix1.split('[')[0] + '[' + index2 + '].' + name
                    }
                });

                $(item).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix1 = attr.split('.')[0];


                        return prefix1.split('[')[0] + '[' + index2 + '].' + name
                    }
                });
            }

            function WHSetAttributes(index, item) {
                $(item).find('input, textarea, select').attr('id', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, textarea').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, text').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.field-validation-valid').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.text-danger').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });
            }
            function TransporterSetAttributes(index, item) {
                $(item).find('input, textarea, select').attr('id', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, textarea').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, text').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.field-validation-valid').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.text-danger').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });
            }

            function InternalSetAttributes(index, item) {
                $(item).find('input, textarea, select').attr('id', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, textarea').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, text').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.field-validation-valid').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.text-danger').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });
            }
            function InternalSetAttributes1(index, item) {
                $(item).find('input, textarea, select').attr('id', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, textarea').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, text').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.field-validation-valid').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.text-danger').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });
            }
            function InternalSetAttributes2(index, item) {
                $(item).find('input, textarea, select').attr('id', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, textarea').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, text').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.field-validation-valid').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.text-danger').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });
            }
            function ExternalSetExportAttributes(index, item) {
                //debugger;
                $(item).find('input, textarea, select').attr('id', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, textarea').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('input, text').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.field-validation-valid').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('span.text-danger').attr('data-valmsg-for', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });

                $(item).find('select2-offscreen').attr('name', function (i, attr) {
                    if (attr != undefined) {
                        var name = attr.split('.')[1];
                        var prefix = attr.split('[')[0];

                        return prefix + '[' + index + '].' + attr.split('.')[1]
                    }
                });
            }
            $('.add_more_unloading_data').each(function (index2, item2) {
                SetAttributes(index2, item2)
                //var _total_index = ParstInt(index2) + ParstInt(1);
                //$(item2).find('.unloadingpoint_main_title').html('Delivery Station ' + _total_index);
                $(item2).find('.initem_item_address_requisition').each(function (index, item) {
                    SetMaterialAttributes(index, item, item2, index2);
                    $(item).find('.add-more-material-item').each(function (index1, item1) {
                        SetLoadingMaterialAttributes(index1, item1, item, index, item2, index2);

                    });

                });
            });

            $('.add_more_unloading_data_internal').each(function (index2, item2) {
                SetAttributes(index2, item2)
                //var _total_index = ParstInt(index2) + ParstInt(1);
                //$(item2).find('.unloadingpoint_main_title').html('Delivery Station ' + _total_index);
                $(item2).find('.initem_item_address_requisition_internal').each(function (index, item) {
                    SetMaterialAttributes(index, item, item2, index2);
                    $(item).find('.add-more-material-item_internal').each(function (index1, item1) {
                        SetLoadingMaterialAttributes(index1, item1, item, index, item2, index2);

                    });

                });
            });
            //$('.add-more-item').each(function (index1, item1) {
            //    SetMaterialAttributesval(index1, item1);

            //});

            //WAREHOUSE


            $('.add-more-item').each(function (index, item) {
                TransporterSetAttributes(index, item);
            });
            $('.add_more_secondary').each(function (index, item) {
                WHSetAttributes(index, item);
            });
            $('.add_more_secondary_ob').each(function (index, item) {
                WHSetAttributes(index, item);
            });
            $('.secondary_add_more').each(function (index, item) {
                WHSetAttributes(index, item);
            });
            //WAREHOUSE

            $('.add_more_internal').each(function (index, item) {
                InternalSetAttributes(index, item);
            });
            //----------------new internal--------------
            $('.add_more_internal_1').each(function (index, item) {
                InternalSetAttributes1(index, item);
            });
            $('.internal_add_more_material').each(function (index, item) {
                InternalSetAttributes(index, item);
            });
            $('.internal_add_more_material_1').each(function (index, item) {
                InternalSetAttributes(index, item);
            });
            //$('.add-more-material-item_internal').each(function (index, item) {
            //    InternalSetAttributes2(index, item);
            //});
            $('.add-more-internal_unloading_item_requisition').each(function (index, item) {
                InternalSetAttributes1(index, item);
            });
            $('.add-more-material-item_internal').each(function (index, item) {
                SetMaterialAttributes(index, item);
            });

            $('.Request').each(function (index, item) {
                WHSetAttributes(index, item);
            });
            $('.export_add_more_material').each(function (index, item) {

                ExternalSetExportAttributes(index, item);
            });

        },
        //SetSerialNo: function () {
        //    $('.div-add-more-main').each(function (index, item) {
        //        $(item).find('div.sl_no_material').text(index + 1);
        //    });
        //},



        //RefreshDataTable: function () {

        //    if ($('.new-data').length > 0) {

        //        $('.new-data').DataTable().ajax.reload();
        //    }
        //},
        HighlightCurrentMenuItem: function (item, index) {

            var _count = 0;
            var _testCount = 0;

            if (index != "" || index != "undefined") {
                if (index == 1) {
                    _count = 1;
                }
                if (index == 2) {
                    _count = 2;
                }
            }
            var _match = $('ul.pl-0 li h1:contains(' + item + ')');
            var _link = null;
            if (_match.length > 0) {
                $('ul.pl-0 li h1').each(function () {
                    if (_count >= _testCount) {
                        if ($(this).text().toLowerCase() == item.toLowerCase()) {
                            _testCount++;
                            _link = $(this);
                        }
                    }
                });
            } else {
                _link = $('ul.pl-0 li h1:contains(' + item + ')');
            }

            _link.parent().parent().addClass('active');
            //_link.parent().addClass('active');
        },



        TimerBidding: function timer(remaining) {

            let timerOn = true;
            var d = Math.floor(remaining / (24 * 3600));
            var h = Math.floor((remaining % (24 * 3600)) / 3600);
            var m = Math.floor(remaining % 3600 / 60);
            var s = Math.floor(remaining % 3600 % 60);

            d = d < 10 ? '0' + d : d;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            var el = document.querySelector(".bidding_timer");

            el.innerHTML = h + ":" + m + ':' + s;
            remaining -= 1;

            if (remaining >= 0 && timerOn) {
                setTimeout(function () {
                    timer(remaining);
                }, 1000);
                return;
            }
            else {
                el.innerHTML = "Expired";
                window.location.reload();
            }

            if (!timerOn) {
                return;
            }
        },
        ProcessTableValidation: function (item) {
            item.find("input[type='text']").each(function () {
                $(this).rules("add", {
                    required: true
                });
            });
        },
    },
    Notifications: {
        Show: function (type, msg) {
            switch ((type)) {
                case 'Error':
                    toastr.error(msg, 'Error')
                    break;
                case 'Success':
                    toastr.success(msg, 'Success')
                    break;
                case 'Info':
                    toastr.info(msg, 'Info')
                    break;
            }
        }
    }
}
$(document).ready(function () {
    WebApp.Init();

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "4000",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "10000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }


});

//$(document).on('click', '.add-more-row_item', function () {
//    var currentItem = $(this).closest('tr.row_item');
//    var newItem = currentItem.clone(false, false);

//    newItem.find('input').val('');
//    newItem.find('td:eq(1) input').val('');
//    newItem.find('td:eq(2) input').val('');

//    newItem.insertAfter(currentItem);

//    WebApp.Core.ProcessNames();
//    WebApp.Core.RebindFormValidation();

//    //$('tr.row_item').each(function (index, item) {
//    //    var indexvalue = parseInt(index) + parseInt(1);
//    //    $(item).find('td.sl_no_row').html(indexvalue);
//    //});
//});
$(document).on('click', '.remove-row_item', function () {
    if ($('tr.row_item').length > 1) {
        $(this).closest('tr').remove();
        WebApp.Core.ProcessNames();
        MarkuplabLavande.Core.ProcessNames();
    } else {
        alert('At least One Item is required.');
    }
})
    .on('click', '#btn-filter-listing', function () {
        WebApp.DataTable.draw();
    })
    .on('click', '#export', function () {
        var source = $('.data-table').data("source");
        var export_source = source.replace("?", "?output=excel&&");
        window.location.href = export_source;
    });

function NumberOnly() {
    var AsciiValue = event.keyCode
    if ((AsciiValue >= 48 && AsciiValue <= 57) || (AsciiValue == 8 || AsciiValue == 127) || AsciiValue == 43) {

        if (event.target.selectionStart == 0 && event.which == 48) {
            event.returnValue = false;
        }
        else {
            event.returnValue = true;
        }
    }

    else {
        event.returnValue = false;
    }
}
function CharacterOnly() {
    var AsciiValue = event.keyCode
    if ((AsciiValue >= 48 && AsciiValue <= 57) || (AsciiValue == 8 || AsciiValue == 127) || AsciiValue == 43) {
        event.returnValue = false;
    }

    else {
        event.returnValue = true;
    }
}
function OtpNumberOnly() {
    var AsciiValue = event.keyCode
    if ((AsciiValue >= 48 && AsciiValue <= 57) || (AsciiValue == 8 || AsciiValue == 127) || AsciiValue == 43) {
        event.returnValue = true;
    }

    else {
        event.returnValue = false;
    }
}
function ReqNumberOnly() {
    var AsciiValue = event.keyCode
    if ((AsciiValue >= 48 && AsciiValue <= 57) || (AsciiValue == 8 || AsciiValue == 127) || AsciiValue == 43 || AsciiValue == 46) {
        event.returnValue = true;
    }

    else {
        event.returnValue = false;
    }
}


function typeheadchnge() {
    alert()
    var currentval = $(this).val();
    $('input.typeheadtransporterval').val(currentval);
}
function DimensionNumberOnly() {
    var AsciiValue = event.keyCode
    if ((AsciiValue >= 48 && AsciiValue <= 57) || (AsciiValue == 8 || AsciiValue == 127) || AsciiValue == 43 || AsciiValue == 46 || AsciiValue == 42) {
        event.returnValue = true;
    }

    else {
        event.returnValue = false;
    }
}
$(function () {
    if ($("#datepicker1").length > 0) {
        $("#datepicker1").datepicker({

            dateFormat: 'dd/MM/yyyy',
            autoclose: true,
            startDate: '+0d',
            orientation: 'bottom'

        });
    }
});

$(function () {
    $("#datepicker2").datepicker({

        dateFormat: 'dd-mm-yy',
        autoclose: true,
        startDate: '+0d',
        orientation: 'bottom'

    });
    $('.datepicker').datepicker({
        orientation: 'bottom'

    })
});



$(function () {
    $("#datepickermonth").datepicker({

        dateFormat: 'mm-yyyy',
        autoclose: true,
        startDate: '+0d',
        orientation: 'bottom'

    });
    $('.datepicker').datepicker({
        orientation: 'bottom'

    })
});
$(function () {
    $("#datepicker4").datepicker({

        dateFormat: 'DD/MM/YYYY',
        autoclose: true,
        startDate: '+0d',
        orientation: 'bottom'

    });
    $('.datepicker').datepicker({
        orientation: 'bottom'

    })
});











