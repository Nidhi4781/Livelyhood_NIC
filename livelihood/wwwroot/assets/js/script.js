$(document).ready(function () {
    $('.data-table').each(function (index, table) {
        var _iDisplayStart = 0;
        var _rightColumn = 0;

        if ($(table).attr('data-iDisplayStart') != '' && $(table).attr('data-iDisplayStart') != undefined) {
            _iDisplayStart = parseInt($(table).attr('data-iDisplayStart'));
        }
        if ($(table).attr('data-auction') != '' && $(table).attr('data-auction') != undefined) {
            _rightColumn = parseInt($(table).attr('data-auction'));
        }

        WebApp.DataTable = $(table).DataTable({
            responsive: true,
            "processing": true,
            "serverSide": true,
            lengthMenu: [
                [10, 25, 50, 100, 250, 500, 1000],
                [10, 25, 50, 100, 250, 500, 1000]
            ],
            select: false,
            "info": true,
            "ordering": true,
            "searching": true,
            "bLengthChange": true,
            "sDom": '<" datatable-iconstool"><" datable-iconsplus filter-icon">Rfrtlip',
            pagingType: "simple",
            "scrollX": true,
            initComplete: function () {
                $("div.datatable-iconstool")
                    .html('<button class="btn btn-info" id="export"><i class="mdi mdi-file-move-outline mr-2"></i>Export</button>');
                $("div.filter-icon")
                    .html('<button class="btn mr-3" id="filter"><i class="mdi mdi-filter-plus-outline mr-2"></i>Filter</button>');
            },
            "oLanguage": {
                "sSearch": "",
                "oPaginate": {
                    "sNext": '<i class="mdi mdi-chevron-right">',
                    "sPrevious": '<i class="mdi mdi-chevron-left">'
                },
                "sInfo": "_START_ to _END_ of _TOTAL_ ",
                "sInfoEmpty": '0 to 0 of 0',
                "searchPlaceholder": "search",
            },
            "order": [
                [$(table).attr('data-key'), 'asc']
            ],
            "columnDefs": [{
                className: "Name",
                "targets": [],
                "visible": false,
                "searchable": false,
            }],
            'aoColumnDefs': [{
                'bSortable': false,
                'aTargets': ['no-sort']
            }],
            "iDisplayStart": _iDisplayStart,
            "sAjaxSource": function () {
                return $(table).attr('data-source')
            }(),
            "fnServerParams": function (aoData) {
                $('select.filter-field, input.filter-field').each(function (index, filterField) {
                    if ($(filterField).val() != '' && $(filterField).val() != null) {
                        var fvalue = $(filterField).val();
                        console.log(fvalue, '---');
                        if ($.isArray(fvalue)) {
                            var filterParam = {
                                "name": $(filterField).attr('name'),
                                "value": $(filterField).val().join(',')
                            };
                        } else {
                            var filterParam = {
                                "name": $(filterField).attr('name'),
                                "value": $(filterField).val()
                            };
                        }

                        aoData.push(filterParam);
                    }
                });
            },
            fixedColumns: {
                leftColumns: 0,
                rightColumns: _rightColumn,
            },
            fnDrawCallback: function (oSettings) {

                //var footer = $(this).append('<tfoot><tr></tr></tfoot>');
                //$('[data-toggle="popover"]').popover();


                //if ($(table).attr('data-attr') == 'Primary_Logistics_advance_request') {

                //    if (!isNaN(_finalAmount)) {
                //        $(footer).append('<tr><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td align="right" style="border-right: solid 1px #FFF!important;"><strong>Total Amount :</strong></td><td  style="border-right: solid 1px #FFF!important;"><strong>' + _finalAmount +
                //            ' </strong></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td></tr>');

                //    }
                //    else {
                //        $(footer).append('<tr><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td align="right" style="border-right: solid 1px #FFF!important;"><strong>Total Amount :</strong></td><td  style="border-right: solid 1px #FFF!important;"><strong>' + _finalAmount +
                //            '</strong></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td><td style="border-right: solid 1px #FFF!important;"></td></tr>');


                //    }
                //    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                //}
            },
        });
    });



    $(function () {
        $(window).scroll(function () {
            var swidth = $(window).width();
            var theight = $('.dataTables_wrapper').innerHeight();
            var rcount = $('.dataTables_scrollBody .data-table tbody tr').length;
            //console.log('row count' + rcount + 'number');
            console.log('table height' + theight + 'number');
            if (theight > 900 && rcount > 10) {
                if ($(window).scrollTop() > 67) {
                    $('.data-table').addClass('header-min-height');
                    $('.dataTables_scrollHead, .DTFC_LeftHeadWrapper').css('transform', 'translateY(0%)');
                    $('.DTFC_LeftHeadWrapper').css({ position: 'fixed', top: '118px', zIndex: '1', left: 'auto' });
                    $('.dataTables_scrollHead').css({ position: 'fixed', top: '118px', zIndex: '1', width: '87%', 'max-width': '92%' });
                    $('.DTFC_ScrollWrapper').css({ height: '' });
                    $('.dataTables_filter').css({ position: 'fixed', top: '75px', zIndex: '1', left: 'auto', });
                    $('.dataTables_length').css({ position: 'fixed', top: '67px', zIndex: '5', left: 'auto', background: 'white', padding: '15px 30px 0 0' });
                    $('.datatable-iconstool').css({ position: 'fixed', top: '67px', zIndex: '3', right: '24px' });
                    $('.datable-iconsplus').css({ position: 'fixed', top: '67px', zIndex: '3', right: '99px', padding: '0 11px 0 0' });
                    $('.DTFC_RightHeadWrapper').css({ position: 'fixed', top: '118px', zIndex: '3', left: 'auto', width: 'auto', padding: '0 5px 0 0' });

                    if ($('.data-table').attr('data-auction') == '0') {
                        $('.dataTables_scrollHead').css({ position: 'fixed', top: '118px', zIndex: '1', width: '92%' });
                    }
                    else if (swidth > 1700) {
                        $('.dataTables_scrollHead').css({ position: 'fixed', top: '118px', zIndex: '1', width: '92%' });
                    }

                }
                else {
                    $('.data-table').removeClass('header-min-height');
                    $('.DTFC_LeftHeadWrapper, .DTFC_LeftHeadWrapper').css({ position: 'relative', top: '0px' });
                    $('.dataTables_scrollHead').css({ position: 'relative', top: '0px', width: '100%', zIndex: '0', 'max-width': '100%' });
                    $('.dataTables_scrollHead').css('transform', 'translateY(0%)');
                    $('.dataTables_filter').css({ position: 'static', top: '0px' });
                    $('.dataTables_length').css({ position: 'absolute', top: '0px', padding: '15px 0 0 0' });
                    $('.datatable-iconstool').css({ position: 'initial' });
                    $('.datable-iconsplus').css({ position: 'initial', padding: '0' });
                    $('.DTFC_RightHeadWrapper').css({ position: 'static', top: '0px', padding: '0' });
                }

                //if ($(window).scrollTop() < 67) {
                //    $('.data-table').removeClass('header-min-height');
                //    $('.DTFC_LeftHeadWrapper, .DTFC_LeftHeadWrapper').css({ position: 'relative', top: '0px' });
                //    $('.dataTables_scrollHead').css({ position: 'relative', top: '0px', width: '100%', zIndex: '0', 'max-width': '100%' });
                //    $('.dataTables_scrollHead').css('transform', 'translateY(0%)');
                //    $('.dataTables_filter').css({ position: 'static', top: '0px' });
                //    $('.dataTables_length').css({ position: 'absolute', top: '0px', padding: '15px 0 0 0' });
                //    $('.datatable-iconstool').css({ position: 'initial' });
                //    $('.datable-iconsplus').css({ position: 'initial', padding: '0' });
                //    $('.DTFC_RightHeadWrapper').css({ position: 'static', top: '0px', padding: '0' });

                //}

            }

            else if (rcount <= 10) {
                $('.data-table').removeClass('header-min-height');
                $('.DTFC_LeftHeadWrapper, .DTFC_LeftHeadWrapper').css({ position: 'relative', top: '0px' });
                $('.dataTables_scrollHead').css({ position: 'relative', top: '0px', width: '100%', zIndex: '0', 'max-width': '100%' });
                $('.dataTables_scrollHead').css('transform', 'translateY(0%)');
                $('.dataTables_filter').css({ position: 'static', top: '0px' });
                $('.dataTables_length').css({ position: 'absolute', top: '0px', padding: '15px 0 0 0' });
                $('.datatable-iconstool').css({ position: 'initial' });
                $('.datable-iconsplus').css({ position: 'initial', padding: '0' });
                $('.DTFC_RightHeadWrapper').css({ position: 'static', top: '0px', padding: '0' });
            }

        });
    });
    //---------------------------internal-----------------------------
    $(document).on('click', '.trips_submit', function () {
        ////debugger;;
        var dispatch_by = $('.dispatch_byy').val();

        if (dispatch_by == "Company Owned") {

            $('.capacity').attr('data-val', true);
            $('.capacity').attr('data-val-required', 'Please select Vehicle Size (MT)');


            $('.veh_name').attr('data-val', true);
            $('.veh_name').attr('data-val-required', 'Please select Vehicle Name');
            /* $('.capacity').attr("placeholder", "PO Number");*/


            $('.driver').attr('data-val', true);
            $('.driver').attr('data-val-required', 'Please select Driver Name');


            $('.phonenum').attr('data-val', true);
            $('.phonenum').attr('data-val-required', 'Please select Driver Phone Number');

            var value2 = $('.owned_qty').val();
            if (value2 == "") {
                $('.owned_qty').attr('data-val', true);
                $('.owned_qty').attr('data-val-required', 'Please enter Dispatch Quantity (MT)');
            }
            else if (value2 == 0) {
                $('.owned_qty').attr('data-val', true);
                $('.owned_qty').attr('data-val-required', 'Please enter Dispatch Quantity (MT)');
            }
            else {
                $('.owned_qty').removeAttr('data-val', true);
                $('.owned_qty').removeAttr('data-val-required', 'Please enter Dispatch Quantity (MT)');
            }

            $('.trip_transporter').removeAttr('data-val', true);
            $('.trip_transporter').removeAttr('data-val-required', 'Please select Transporter');

            $('.trip_contract_qty').removeAttr('data-val', true);
            $('.trip_contract_qty').removeAttr('data-val-required', 'Please enter Dispatch Quantity (MT)');

            WebApp.Core.RebindFormValidation();

        }
        else {
            ////debugger;;
            //$('.trip_transporter').addClass("mandatory");
            //$('.trip_transporter').val("");
            if ($('.trip_transporter').val() == null) {
                $('.trip_transporter').attr('data-val', true);
                $('.trip_transporter').attr('data-val-required', 'Please select Transporter');
            }
            var value1 = $('.trip_contract_qty').val();
            if (value1 == "") {
                $('.trip_contract_qty').attr('data-val', true);
                $('.trip_contract_qty').attr('data-val-required', 'Please enter Dispatch Quantity (MT)');
            }
            else if (value1 == 0) {
                $('.trip_contract_qty').attr('data-val', true);
                $('.trip_contract_qty').attr('data-val-required', 'Please enter Dispatch Quantity (MT)');
            }
            else {
                $('.trip_contract_qty').removeAttr('data-val', true);
                $('.trip_contract_qty').removeAttr('data-val-required', 'Please enter Dispatch Quantity (MT)');
            }

            $('.capacity').removeAttr('data-val', true);
            $('.capacity').removeAttr('data-val-required', 'Please select Vehicle Size (MT)');


            $('.veh_name').removeAttr('data-val', true);
            $('.veh_name').removeAttr('data-val-required', 'Please select Vehicle Name');

            $('.driver').removeAttr('data-val', true);
            $('.driver').removeAttr('data-val-required', 'Please select Driver Name');


            $('.phonenum').removeAttr('data-val', true);
            $('.phonenum').removeAttr('data-val-required', 'Please enter Driver Phone Number');

            $('.owned_qty').removeAttr('data-val', true);
            $('.owned_qty').removeAttr('data-val-required', 'Please enter Dispatch Quantity (MT)');

            WebApp.Core.RebindFormValidation();

        }
        //$(document).on('keyup', '.trip_contract_qty', function () {
        //    var value = $('.trip_contract_qty').val();
        //    if (value == "") {
        //        $('.trip_contract_qty').attr('data-val', true);
        //        $('.trip_contract_qty').attr('data-val-required', 'Please enter Dispatch Quantity (MT)');
        //    }
        //    else if (value == 0) {
        //        $('.trip_contract_qty').attr('data-val', true);
        //        $('.trip_contract_qty').attr('data-val-required', 'Please enter Dispatch Quantity (MT)');
        //    }
        //    else {
        //        $('.trip_contract_qty').removeAttr('data-val', true);
        //        $('.trip_contract_qty').removeAttr('data-val-required', 'Please enter Dispatch Quantity (MT)');
        //    }
        //    WebApp.Core.RebindFormValidation();
        //});
        //$(document).on('keyup', '.owned_qty', function () {
        //    ////debugger;;
        //    $('.owned_qty').removeAttr('data-val', true);
        //    $('.owned_qty').removeAttr('data-val-required', 'Please enter Dispatch Quantity (MT)');
        //    var valueowned = $('.owned_qty').val();
        //    if (valueowned == "" || valueowned == 0) {
        //        $('.owned_qty').attr('data-val', true);
        //        $('.owned_qty').attr('data-val-required', 'Please enter Dispatch Quantity (MT)');
        //    }
        //    else {
        //        $('.owned_qty').removeAttr('data-val', true);
        //        $('.owned_qty').removeAttr('data-val-required', 'Please enter Dispatch Quantity (MT)');
        //    }
        //    WebApp.Core.RebindFormValidation();
        //});

    });
    //-------------------------------internal------------------------



    $(document).on('change', 'select.contracttye', function () {
        ////debugger;;
        var contracttye = $(this).val();

        if (contracttye == "Po") {

            $('.contract').html("PO Number");
            $('.contract').addClass("mandatory");
            $('.ContractNumber').val("");
            $('.ContractNumber').attr('data-val', true);
            $('.ContractNumber').attr('data-val-required', 'Please Enter the PO Number');
            $('.ContractNumber').attr("placeholder", "PO Number");
            WebApp.Core.RebindFormValidation();

        }
        else {
            $('.contract').addClass("mandatory");

            $('.contract').html("Contract Number");
            $('.ContractNumber').val("");
            $('.ContractNumber').attr('data-val', true);
            $('.ContractNumber').attr('data-val-required', 'Please Enter the Contract Number');
            $('.ContractNumber').attr("placeholder", "Contract Number");

            WebApp.Core.RebindFormValidation();

        }


    });


    $(document).on('change', 'select.ModeOfDelivery', function () {
        ////debugger;;
        var ModeOfDelivery = $(this).val();

        if (ModeOfDelivery == "Rail") {

            $('.railtype').show();

            $('.rrnumber').attr('data-val', true);
            $('.rrnumber').attr('data-val-required', 'Please Enter RR Number');
            $('.trainarrivaldate').attr('data-val', true);
            $('.trainarrivaldate').attr('data-val-required', 'Please Select Train Arrival Date');

            WebApp.Core.RebindFormValidation();

        }
        else {
            $('.railtype').hide();
            $('.rrnumber').removeAttr('data-val', true);
            $('.rrnumber').removeAttr('data-val-required', 'Please Enter RR Number');
            $('.trainarrivaldate').removeAttr('data-val', true);
            $('.trainarrivaldate').removeAttr('data-val-required', 'Please Select Train Arrival Date');

            WebApp.Core.RebindFormValidation();

        }


    });

    $(document).on('change', 'select.bidvehicletype', function () {
        ////debugger;;
        var bidvehicletype = $(this).val();

        if (bidvehicletype == "Container") {

            $('.dimensiondiv').show();
            $('select.Dimension').attr('data-val', true);
            $('select.Dimension').attr('data-val-required', 'Please select Vehicle Dimension');
            WebApp.Core.RebindFormValidation();

        }
        else if (bidvehicletype == "Trailer") {
            $('.dimensiondiv').show();
            $('select.Dimension').attr('data-val', true);
            $('select.Dimension').attr('data-val-required', 'Please select Vehicle Dimension');
            WebApp.Core.RebindFormValidation();

        }
        else {
            $('.dimensiondiv').hide();
            $('select.Dimension').removeAttr('data-val', true);
            $('select.Dimension').removeAttr('data-val-required', 'Please select Vehicle Dimension');
            WebApp.Core.RebindFormValidation();
        }

    });
    $(document).on('change', 'select.MaterialType', function () {
        var MaterialType = $(this).val();
        var ordertype = $('.ordertype').val();

        $("select.VehicleType").empty().trigger('change.select2');
        var datavalVehicleType = $('select.VehicleType').closest('.closebtn-outer');
        datavalVehicleType.find(".close-btn").attr('style', 'display:none');

        $("select.VehicleSize").empty().trigger('change.select2');
        var datavalVehicleSize = $('select.VehicleSize').closest('.closebtn-outer');
        datavalVehicleSize.find(".close-btn").attr('style', 'display:none');

        $("select.Dimension").empty().trigger('change.select2');;
        var datavalDimension = $('select.Dimension').closest('.closebtn-outer');
        datavalDimension.find(".close-btn").attr('style', 'display:none');


        $("select.SupplyContractCondition").empty().trigger('change.select2');;
        var datavalSupplyContractCondition = $('select.SupplyContractCondition').closest('.closebtn-outer');
        datavalSupplyContractCondition.find(".close-btn").attr('style', 'display:none');


        $("select.Material_description").empty().trigger('change.select2');;
        var datavalMaterial_descriptionn = $('select.Material_description').closest('.closebtn-outer');
        datavalMaterial_descriptionn.find(".close-btn").attr('style', 'display:none');

        $("select.packing_type").empty().trigger('change.select2');
        var datavalpacking_type = $('select.packing_type').closest('.closebtn-outer');
        datavalpacking_type.find(".close-btn").attr('style', 'display:none');
       // debugger;
        $('.total_weight_h6').html('Total Weight (MT) : 0.00');

        $(".req_qty").val("");
        $(".weight").val("");
        //WebApp.Core.RebindFormValidation();
        if (ordertype == "SO") {
            if (MaterialType == "Broiler") {
                $('table.mytable th.broier').show();
                $('table.mytable td.broilertd').show();

                $('table.mytable td.broilertd').find('select.broiler').attr('data-val', true);
                $('table.mytable td.broilertd').find('select.broiler').attr('data-val-required', 'Please select Bird Size');
                $('table.mytable th.Packingtype_label').hide();
                $('table.mytable td.PackingType_td').hide();
                $('table.mytable td.PackingType_td').find('select.packing_type').removeAttr('data-val', true);
                $('table.mytable td.PackingType_td').find('select.packing_type').removeAttr('data-val-required', 'Please select Packing Type');


                WebApp.Core.RebindFormValidation();
            } else {
                $('table.mytable th.broier').hide();
                $('table.mytable td.broilertd').hide();
                $('table.mytable td.broilertd').find('select.broiler').removeAttr('data-val', true);
                $('table.mytable td.broilertd').find('select.broiler').removeAttr('data-val-required', 'Please select Bird Size');
                $('table.mytable th.Packingtype_label').show();
                $('table.mytable td.PackingType_td').show();
                $('table.mytable td.PackingType_td').find('select.packing_type').attr('data-val', true);
                $('table.mytable td.PackingType_td').find('select.packing_type').attr('data-val-required', 'Please select Packing Type');

            }
        } else {
            if (MaterialType == "Broiler") {
                $('table.mytable th.broier').show();
                $('table.mytable td.broilertd').show();

                $('table.mytable th.broilerclosingstockth').show();
                $('table.mytable td.broilerclosingstocktd').show();

                $('table.mytable td.broilerclosingstocktd').find('input.closingstock').attr('data-val', true);
                $('table.mytable td.broilerclosingstocktd').find('input.closingstock').attr('data-val-required', 'Please select Branch Closing Stock');
                $('table.mytable th.Packingtype_label').hide();
                $('table.mytable td.PackingType_td').hide();
                $('table.mytable td.PackingType_td').find('select.packing_type').removeAttr('data-val', true);
                $('table.mytable td.PackingType_td').find('select.packing_type').removeAttr('data-val-required', 'Please select Packing Type');


                $('table.mytable td.broilertd').find('select.broiler').attr('data-val', true);
                $('table.mytable td.broilertd').find('select.broiler').attr('data-val-required', 'Please select Bird Size');
                WebApp.Core.RebindFormValidation();
            } else {
                $('table.mytable th.broier').hide();
                $('table.mytable td.broilertd').hide();

                $('table.mytable th.broilerclosingstockth').hide();
                $('table.mytable td.broilerclosingstocktd').hide();


                $('table.mytable td.broilertd').find('select.broiler').removeAttr('data-val', true);
                $('table.mytable td.broilertd').find('select.broiler').removeAttr('data-val-required', 'Please select Bird Size');
                $('table.mytable th.Packingtype_label').show();
                $('table.mytable td.PackingType_td').show();
                $('table.mytable td.PackingType_td').find('select.packing_type').attr('data-val', true);
                $('table.mytable td.PackingType_td').find('select.packing_type').attr('data-val-required', 'Please select Packing Type');

                $('table.mytable td.broilerclosingstocktd').find('input.closingstock').removeAttr('data-val', true);
                $('table.mytable td.broilerclosingstocktd').find('input.closingstock').removeAttr('data-val-required', 'Please select Branch Closing Stock');

                WebApp.Core.RebindFormValidation();
            }
        }

    });
    $(document).on('change', 'select.tripid', function () {
        var requisitionid = $('select.requisition').val();
        var tripid = $(this).val();
        window.location.href = "/materialreturns/create?id=" + requisitionid + "&tripId=" + tripid;


    });


    $(document).on('change', 'select.compoundfrom', function () {
        $('select.compoundfrom').valid();
        WebApp.Core.RebindFormValidation();

    });


    $(document).on('change', 'select.configloadingpoint', function () {
        $("select.configunloadingpoint").empty().trigger('change.select2');


    });
    $(document).on('change', 'select.plant_name', function () {
        $('select.plant_name').valid();
        WebApp.Core.RebindFormValidation();

    });
    $('select.CancelledBy').on('change', function () {

        var canceller = $('.CancelledBy').val();
        var reason = $('.CancellationReason').val();
        if (canceller != null && canceller != "" && canceller != undefined &&
            canceller == "Transporter") {
            $('#tblMaterial').show();
        } else {
            $('#tblMaterial').hide();
            WebApp.Core.RebindFormValidation();
        }

    });
    //$(document).on("keypress", ".number-only", function (event) {
    //    var keycode = event.which;
    //    if (!(event.shiftKey == false && (keycode == 8 || keycode == 37 || keycode == 39 || (keycode > 48 && keycode <= 57)))) {
    //        event.preventDefault();
    //    }
    //});

    $(document).on('keyup change', 'input.numberofAttempt', function () {
        //debugger;
        var currentval = $(this).val();

        if (parseInt(currentval) > 4) {
            $('.numberofAttempt').val("");
        }
        if (parseInt(currentval) <= 0) {
            $('.numberofAttempt').val("");
        }
    });

    $(document).on('keyup change', 'input.damaged', function () {
        //debugger;
        var total = 0;
        var currentval = $(this).val();
        var closesttr = $(this).closest('tr');

        var dispatchquantity = closesttr.find('td.DispatchQuantitytd input.DispatchQuantity').val();

        if (currentval > dispatchquantity) {
            WebApp.Notifications.Show('Info', 'Damaged quantity must be less than dispatch quantity');
            closesttr.find('.damaged').val("");
        }

        //$('.podtable').find('tbody tr').each(function (index, item) {

        //    var _currentvaluedispatch = $(item).find('td.DispatchQuantitytd input.DispatchQuantity').val();

        //    var _currentvaluedelivered = $(item).find('td.deliveredquanitytd input.deliveredquanity').val();
        //    var _currentvaluedamaged = $(item).find('td.damagedtd input.damaged').val();



        //    total = parseFloat(total) + parseFloat(_currentvaluedelivered) + parseFloat(_currentvaluedamaged);

        //    if (total > _currentvaluedispatch) {
        //        WebApp.Notifications.Show('Info', 'Delivered and Damaged quantity must be less than dispatch quantity');
        //        $(item).find('td.deliveredquanitytd input.deliveredquanity').val("");
        //        $(item).find('td.damagedtd input.damaged').val("");
        //    }


        //});

    });
    $(document).on('change', '.export_SupplyContractCondition', function () {
        var _supplycontractcondition = $(this).val();
        if (_supplycontractcondition != null && _supplycontractcondition != "") {
            if (_supplycontractcondition == "FOB" || _supplycontractcondition == "CIF") {
                $('.export_address').html('Ship to Port Address');
            }
            else if ((_supplycontractcondition == "Door Delivery")) {
                $('.export_address').html('Ship to Address');
            }
            else {
                $('.export_address').html('Address');
            }
        }
        else {
            $('.export_address').html('Address');
        }
    });
    $(document).on('keyup', '.weight', function () {

        var _total = 0;
        var currenttotal = 0;

        $('.add-more-material-item').each(function (index, item) {


            var _currentvalue = $(item).find('input.weight').val();


            if (_currentvalue == "" || _currentvalue == NaN || _currentvalue == null || _currentvalue == undefined) {

                currenttotal = 0;
            }
            else {
                currenttotal = $(item).find('input.weight').val();
            }
            _total = parseFloat(_total) + parseFloat(currenttotal);

        });
        //debugger;
        $('.total_weight_h6').html('Total Weight (MT) : ' + _total);
        var _sum = _total.toString().indexOf(".00") ? parseInt(_total) : _total;


    });
    $(document).on('click', '.Material_Return_submit', function () {
        ////debugger;;
        var _total = 0;
        var currenttotal = 0;
        var _rejectedquantities = $('.rejectqty').val();
        var _type = $('.ordertype').val();
        if (_type != null && _type == "SO") {
            if (_rejectedquantities != null && _rejectedquantities != "") {

                $('.add-more-material-item').each(function (index, item) {


                    var _currentvalue = $(item).find('input.weight').val();

                    if (_currentvalue == "" || _currentvalue == NaN || _currentvalue == null || _currentvalue == undefined) {

                        currenttotal = 0;
                    }
                    else {
                        currenttotal = $(item).find('input.weight').val();
                    }
                    _total = parseFloat(_total) + parseFloat(currenttotal);
                });
                if (parseFloat(_total) > parseFloat(_rejectedquantities)) {
                    WebApp.Notifications.Show('Info', 'Total weight should be less than or equal to Rejected Quantity');
                    $('.rejectqty').val("");
                    return false;
                }
                else {
                    return true;

                }
            }
        }
    });

    $(document).on('keyup', '.req_qty', function () {
        ////debugger;;
        var _currentDiv = $(this).closest('.div-add-more-main');
        var _requestedqty = $(this).val();
        var _materialtype = $(".MaterialType").val();
        var grossweight = $(this).parent().parent().find('.gross_weight_current').val();
        var _packingtype = $(this).parent().parent().find('.packing_type').val();
        if (_requestedqty != null && grossweight != null) {
            if (_materialtype != "Broiler") {
                if (_packingtype != null && _packingtype != "Lose" && _packingtype != "Loose" && grossweight != null && grossweight != 0) {
                    var totalweight = _requestedqty * grossweight;

                    _currentDiv.find('input.weight').val(totalweight.toFixed(2));
                    _currentDiv.find('input.weight').valid();
                }
                else {


                    _currentDiv.find('input.weight').val(_requestedqty);
                    _currentDiv.find('input.weight').valid();
                    WebApp.Core.RebindFormValidation();
                }
            }
            else {
                var grossweight = $(this).parent().parent().find('.BirdSize').val();
                var totalweight = _requestedqty * grossweight;

                _currentDiv.find('input.weight').val(totalweight.toFixed(2));
                _currentDiv.find('input.weight').valid();
                WebApp.Core.RebindFormValidation();
            }


        }
        var currentDiv = $(this).closest('div.addressdiv');

        var _total = 0;
        var currenttotal = 0;

        $('.add-more-material-item').each(function (index, item) {


            var _currentvalue = $(item).find('input.weight').val();

            if (_currentvalue == "" || _currentvalue == NaN || _currentvalue == null || _currentvalue == undefined) {

                currenttotal = 0;
            }
            else {
                currenttotal = $(item).find('input.weight').val();
            }
            _total = parseFloat(_total) + parseFloat(currenttotal);

            var rejectedquantity = $('.rejectqty').val();

            var ordertype = $('.ordertype').val();
            var returntype = $('.returntype').val();

            if (returntype != null && returntype == "return") {
                if (ordertype == "SO" && ordertype != null) {
                    if (rejectedquantity != null && _total != 0 && _total != null && rejectedquantity != "") {
                        if (parseFloat(_total) > parseFloat(rejectedquantity)) {

                            WebApp.Notifications.Show('Info', 'Total weight should be less than or equal to Rejected Quantity');
                            $(item).find('input.weight').val("");
                            $(item).find('input.req_qty').val("");

                            _total = 0;
                        }

                    }
                }
            }


        });
        var _sum = _total.toString().indexOf(".00") ? parseInt(_total) : _total;
      //  debugger;
        $('.total_weight_h6').html('Total Weight (MT) : ' + _total);
    });
    $(document).on('keyup', '.req_qtyraw', function () {

        var _currentDiv = $(this).closest('.div-add-more-main');
        var _requestedqty = $(this).val();
        var grossweight = $('.gross_weight_current').val();
        var _packingtype = $('.packing_type').val();
        if (_packingtype != null && _packingtype != "") {
            if (_requestedqty != null && grossweight != null) {
                if (_packingtype != null && _packingtype != "Lose" && _packingtype != "Loose" && grossweight != null && grossweight != 0) {
                    var totalweight = _requestedqty * grossweight;

                    _currentDiv.find('input.weight').val(totalweight.toFixed(2));
                }
                else {
                    _currentDiv.find('input.weight').val(_requestedqty);
                }


            }
        }
        else {
            alert("Please select the packing type")
            $('.req_qtyraw').val("");
        }

        var currentDiv = $(this).closest('div.addressdiv');

        var _total = 0;
        var currenttotal = 0;

        $('.add-more-material-item').each(function (index, item) {


            var _currentvalue = $(item).find('input.weight').val();

            if (_currentvalue == "" || _currentvalue == NaN || _currentvalue == null || _currentvalue == undefined) {

                currenttotal = 0;
            }
            else {
                currenttotal = $(item).find('input.weight').val();
            }
            _total = parseFloat(_total) + parseFloat(currenttotal);
        });
        var _sum = _total.toString().indexOf(".00") ? parseInt(_total) : _total;

        $('.total_weight_h6').html('Total Weight (MT) : ' + _total);
    });

    $(document).on('keyup change', 'input.deliveredquanity', function () {
        //debugger;
        var total = 0;
        var currentval = $(this).val();
        $('.podtable').find('tbody tr').each(function (index, item) {

            var _currentvaluedispatch = $(item).find('td.DispatchQuantitytd input.DispatchQuantity').val();

            var _currentvaluedelivered = $(item).find('td.deliveredquanitytd input.deliveredquanity').val();
            var _currentvaluedamaged = $(item).find('td.damagedtd input.damaged').val();



            total = parseFloat(total) + parseFloat(_currentvaluedelivered) + parseFloat(_currentvaluedamaged);

            if (total > _currentvaluedispatch) {
                WebApp.Notifications.Show('Info', 'Delivered and Damaged quantity must be less than dispatch quantity');

            }


        });

    });
    $(document).on('keyup change', '.cielingprice', function () {
        var cielingprice = $('.cielingprice').val();
        if (cielingprice == 0) {
            $('.cielingprice').val("");
        }
    });
    $(document).on('change', 'select.VehicleSize', function () {
        var vehiclesize = $('select.VehicleSize').val();
        var requisitionids = $('input.requisitionID').val();

        var count = 0;
        if (vehiclesize != "" && vehiclesize != null && requisitionids != undefined && requisitionids != null) {


            $.get("/logisticsconvertbids/findcielingprice", { RequisitionID: requisitionids, VehicleSize: vehiclesize }, function (data) {
                if (data.status == true) {

                    $('input.cielingprice').val(data.cielingprice);
                } else {
                    $('input.cielingprice').val(0);
                }

            });

        }

        var RequisitionCount = $('input.requisition:checked').length;

        if (RequisitionCount <= 0) {
            $('.requisition_buttons').attr("style", "display: none !important");
        }


    });
    $(document).on('change', '.ExpectedLoadingDate', function () {
        var _loadingdate = $(this).val();
        var loadingPoint1 = $('.ShipFromAddress').val();
        if (_loadingdate != null && _loadingdate != "") {
            var unloadingarea = $('select.loading_point').val();
            var indexvalue = 0;
            $('.add_more_requisition_unloading').each(function (index, item) {
                var currentunloading = $(item).closest('.add_more_unloading_data');
                var _firstStation = 0;

                indexvalue = parseInt(indexvalue) + parseInt(1);
                var _unloadingarea = $(item).find('.loading_point').val();

                if (_unloadingarea != null && _unloadingarea != "") {

                    $.get("/logisticsvehiclerequisitions/findstattype", { unloadingarea: _unloadingarea, loadingPoint: loadingPoint1 }, function (data) {
                        if (data.status == true) {
                            if (data.type == "Intra") {
                                _firstStation = 24;
                                $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                                    if (index == 0) {
                                        if (index1 == 0) {
                                            var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                            _new = _currentdeliverydate;

                                        } else {
                                            _new = parseInt(_new) + parseInt(6);
                                        }
                                    } else {
                                        _new = parseInt(_new) + parseInt(12);
                                    }

                                    var loading = $('.ExpectedLoadingDate').val();

                                    var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                                    $(item1).find('.delivery_date').val(datepick);

                                });
                            } else {
                                _firstStation = 36;
                                $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                                    if (index == 0) {
                                        if (index1 == 0) {
                                            var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                            _new = _currentdeliverydate;

                                        } else {
                                            _new = parseInt(_new) + parseInt(6);
                                        }
                                    } else {
                                        _new = parseInt(_new) + parseInt(12);
                                    }

                                    var loading = $('.ExpectedLoadingDate').val();

                                    var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                                    $(item1).find('.delivery_date').val(datepick);

                                });
                            }

                        } else {
                            _firstStation = 24;
                            $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                                if (index == 0) {
                                    if (index1 == 0) {
                                        var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                        _new = _currentdeliverydate;

                                    } else {
                                        _new = parseInt(_new) + parseInt(6);
                                    }
                                } else {
                                    _new = parseInt(_new) + parseInt(12);
                                }

                                var loading = $('.ExpectedLoadingDate').val();

                                var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                                $(item1).find('.delivery_date').val(datepick);

                            });
                        }

                    });
                }

            });

        }
    });
    $(document).on('change', 'select.loading_point', function () {
        ////debugger;;
        var unloadingarea = $(this).val();
        var currentdiv = $(this).closest('.add_more_unloading_data');
        var _currentloadingDate = $('.ExpectedLoadingDate').val();
        var loadingPoint = $('.ShipFromAddress').val();
        var _statetype = "";
        var _deliveryDateCount = 0;
        var _new = 0;
        if (unloadingarea != "" && unloadingarea != null && unloadingarea != undefined && loadingPoint != null) {

            $.get("/logisticsvehiclerequisitions/finddistance", { unloadingarea: unloadingarea, loadingPoint: loadingPoint }, function (data) {
                if (data.status == true) {



                    currentdiv.find('input.loadingdistance').val(data.distance);
                    currentdiv.find('input.loadingdistance').valid();
                    WebApp.Core.RebindFormValidation();
                } else {

                }

            });

            var indexvalue = 0;
            $('.add_more_requisition_unloading').each(function (index, item) {
                var currentunloading = $(item).closest('.add_more_unloading_data');
                var _firstStation = 0;
                var loadingPoint1 = $('.ShipFromAddress').val();
                indexvalue = parseInt(indexvalue) + parseInt(1);
                var _unloadingarea = $(item).find('.loading_point').val();

                if (_unloadingarea != null && _unloadingarea != "") {

                    $(item).find('.unloadingpoint_main_title').html(_unloadingarea);
                    $(item).find('.increment_station_details').html(_unloadingarea + ' Details');
                } else {
                    $(item).find('.unloadingpoint_main_title').html('Delivery Station ' + indexvalue);
                    $(item).find('.increment_station_details').html('Delivery Station #' + indexvalue + ' Details');
                }

                $.get("/logisticsvehiclerequisitions/findstattype", { unloadingarea: unloadingarea, loadingPoint: loadingPoint }, function (data) {
                    if (data.status == true) {
                        if (data.type == "Intra") {
                            _firstStation = 24;
                            $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                                if (index == 0) {
                                    if (index1 == 0) {
                                        var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                        _new = _currentdeliverydate;

                                    } else {
                                        _new = parseInt(_new) + parseInt(6);
                                    }
                                } else {
                                    _new = parseInt(_new) + parseInt(12);
                                }

                                var loading = $('.ExpectedLoadingDate').val();

                                if (loading != null && loading != undefined && loading != "") {
                                    var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                                    $(item1).find('.delivery_date').val(datepick);
                                }



                            });
                        } else {
                            _firstStation = 36;
                            $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                                if (index == 0) {
                                    if (index1 == 0) {
                                        var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                        _new = _currentdeliverydate;

                                    } else {
                                        _new = parseInt(_new) + parseInt(6);
                                    }
                                } else {
                                    _new = parseInt(_new) + parseInt(12);
                                }

                                var loading = $('.ExpectedLoadingDate').val();

                                var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                                $(item1).find('.delivery_date').val(datepick);

                            });
                        }

                    } else {
                        _firstStation = 24;
                        $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                            if (index == 0) {
                                if (index1 == 0) {
                                    var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                    _new = _currentdeliverydate;

                                } else {
                                    _new = parseInt(_new) + parseInt(6);
                                }
                            } else {
                                _new = parseInt(_new) + parseInt(12);
                            }

                            var loading = $('.ExpectedLoadingDate').val();

                            var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                            $(item1).find('.delivery_date').val(datepick);

                        });
                    }

                });



            });

        } else {
            //alert("Please select Loading Point");
            //currentdiv.find("select.loading_point").empty().trigger('change.select2');

        }



    });
    $(document).on('change', 'select.loading_point_internal', function () {
        var unloadingarea = $(this).val();
        var currentdiv = $(this).closest('.add_more_unloading_data_internal')

        var loadingPoint = $('.ShipFromAddress').val();

        if (unloadingarea != "" && unloadingarea != null && unloadingarea != undefined && loadingPoint != null) {


            $.get("/logisticsvehiclerequisitions/finddistance", { unloadingarea: unloadingarea, loadingPoint: loadingPoint }, function (data) {
                if (data.status == true) {

                    //$('div.initem_item_address_requisition').each(function (index, item) {


                    //    $(item).find('input.vehicledistance').val(data.distance);

                    //});

                    currentdiv.find('input.loadingdistance').val(data.distance);
                } else {
                    //$('div.initem_item_address_requisition').each(function (index, item) {


                    //    $(item).find('input.vehicledistance').val(0);

                    //});
                }

            });

        } else {
            alert("Please select Ship From Location");
            currentdiv.find("select.loading_point").empty().trigger('change.select2');

        }



    });
    $(document).on('click', '.InboundEnable', function () {
        ////debugger;;
        var current = $(this).closest('div.triprow');

        if ($(this).is(':checked')) {


            current.find('input.InboundDisplayOrder').attr('data-val', true);
            current.find('input.InboundDisplayOrder').attr('data-val-required', 'Please Enter the Display Order');
            $('form').valid();
            WebApp.Core.RebindFormValidation();

        }
        else {

            current.find('input.InboundDisplayOrder').removeAttr('data-val', true);
            current.find('input.InboundDisplayOrder').removeAttr('data-val-required', 'Please Enter the Display Order');
            $('form').valid();

            WebApp.Core.RebindFormValidation();

        }


    });
    $(document).on('click', '.transporter_checkbox', function () {
        var check = ($('.selectedId').filter(":checked").length);
        $('.total_selected_transporter').html('Select Transporters (' + check + ')');
        //var checkedCount = $('.transporter_checkbox:checked').length;
        //$('label.total_selected_transporter').html("Select Transporters (" + checkedCount + ")");
    });
    //debugger;
    $(document).on('click', 'input.requisition', function () {

        var current = $(this).closest('tr');
        var _selectedItems = $('input.requisition:checked').map(function () { return this.value; }).get().join(',');
        var count = 0;
        if (_selectedItems != "" && _selectedItems != null && _selectedItems != undefined) {


            $.get("/dispatchplanningprocess/verifyloadingarea", { RequisitionID: _selectedItems }, function (data) {
                if (data.status == false) {
                    count = 1;
                    if (data.type == "shipfromandto") {
                        WebApp.Notifications.Show('Info', 'Please choose the same Loading Point and Delivery Station');
                        $('input.requisition:checked').prop('checked', false);
                        $('tr').removeClass('row-highlight');
                    }
                    else if (data.type == "loading") {
                        WebApp.Notifications.Show('Info', 'Please choose the same Loading Point');
                        $('input.requisition:checked').prop('checked', false);
                        $('tr').removeClass('row-highlight');
                    }
                    else if (data.type == "unloading") {
                        WebApp.Notifications.Show('Info', 'Please choose the same Vehicle Type');
                        $('input.requisition:checked').prop('checked', false);
                        $('tr').removeClass('row-highlight');
                        //$('tr.odd').removeClass('row-highlight');

                    }
                    else if (data.type == "SupplyContractCondition") {
                        WebApp.Notifications.Show('Info', 'Please choose the same supply contract condition Type');
                        $('input.requisition:checked').prop('checked', false);
                        $('tr').removeClass('row-highlight');
                        //$('tr.odd').removeClass('row-highlight');

                    }
                    else {
                        WebApp.Notifications.Show('Info', 'Please choose the same Loading Point and Vehicle Type');
                        current.find('input.requisition:checked').prop('checked', false);
                        $('tr').removeClass('row-highlight');
                    }


                } else {
                    //$('.requisition_buttons').css("display", "block");
                    $('.requisition_buttons').removeClass("disable-btn");

                    //$('.requisition_buttons').removeAttr("style", "pointer-events: none");
                }

            });

        }

        var RequisitionCount = $('input.requisition:checked').length;

        if (RequisitionCount <= 0) {
            //$('.requisition_buttons').attr("style", "pointer-events: none");
            $('.requisition_buttons').addClass("disable-btn");


        }


    });

    $(document).on('click', 'input.vehiclerequisition', function () {

        var current = $(this).closest('tr');
        var _selectedItems = $('input.vehiclerequisition:checked').map(function () { return this.value; }).get().join(',');
        var count = 0;

        var RequisitionCount = $('input.vehiclerequisition:checked').length;

        if (RequisitionCount <= 0) {
            $('.requisition_buttons').addClass("disable-btn");


        }
        else {
            $('.requisition_buttons').removeClass("disable-btn");

        }

    });
    //$(document).on('change', '.type', function () {

    //    var type = $(this).val();
    //    var currentdiv = $(this).closest('div.initem_item_address_requisition');

    //    currentdiv.find('.newval').val("");
    //    currentdiv.find('.newval').text("");

    //    if (type != null && type != undefined) {
    //        if (type == "Customer") {
    //            currentdiv.find('.mobilenumber').val("");
    //            currentdiv.find('.customer').val("");

    //            currentdiv.find("select.warehouse").empty().trigger('change.select2');


    //            currentdiv.find('div.customertype').show();
    //            currentdiv.find('div.customertype .customer').attr('data-val', true);
    //            currentdiv.find('div.customertype .customer').attr('data-val-required', 'Please select Customer');

    //            currentdiv.find('div.contactnumber').show();
    //            currentdiv.find('div.contactnumber .mobilenumber').attr('data-val', true);
    //            currentdiv.find('div.contactnumber .mobilenumber').attr('data-val-required', 'Please Enter the Contact Number');

    //            currentdiv.find('div.address').show();
    //            currentdiv.find('div.address .custaddress').attr('data-val', true);
    //            currentdiv.find('div.address .custaddress').attr('data-val-required', 'Please Enter the Address');
    //            currentdiv.find('div.warehousediv').hide();
    //            currentdiv.find('div.customertype .warehouse').removeAttr('data-val', true);
    //            currentdiv.find('div.customertype .warehouse').removeAttr('data-val-required', 'Please select Warehouse');

    //            currentdiv.find('div.warehousecode').hide();

    //            currentdiv.find('div.warehousecode .warehousecodeinput').removeAttr('data-val', true);
    //            currentdiv.find('div.warehousecode .warehousecodeinput').removeAttr('data-val-required', 'Please select Warehouse');
    //        } else {

    //            currentdiv.find('.warehouse').val("");
    //            currentdiv.find('.mobilenumber').val("");

    //            currentdiv.find("select.customer").empty().trigger('change.select2');


    //            currentdiv.find('div.customertype').hide();
    //            currentdiv.find('div.customertype select.customer').removeAttr('data-val', true);
    //            currentdiv.find('div.customertype select.customer').removeAttr('data-val-required', 'Please select Customer');

    //            currentdiv.find('div.contactnumber').show();
    //            currentdiv.find('div.contactnumber .mobilenumber').attr('data-val', true);
    //            currentdiv.find('div.contactnumber .mobilenumber').attr('data-val-required', 'Please Enter the Contact Number');

    //            currentdiv.find('div.address').show();
    //            currentdiv.find('div.address .custaddress').attr('data-val', true);
    //            currentdiv.find('div.address .custaddress').attr('data-val-required', 'Please Enter the Address');

    //            currentdiv.find('div.warehousediv').show();
    //            currentdiv.find('div.warehousediv .warehouse').attr('data-val', true);
    //            currentdiv.find('div.warehousediv .warehouse').attr('data-val-required', 'Please select Warehouse');
    //            currentdiv.find('div.warehousecode').show();


    //            currentdiv.find('div.warehousecode .warehousecodeinput').attr('data-val', true);
    //            currentdiv.find('div.warehousecode .warehousecodeinput').attr('data-val-required', 'Please select Warehouse');

    //        }


    //        WebApp.Core.RebindFormValidation();
    //    }

    //});


    //$('select.typebid').on('change', function () {

    //    var type = $(this).val();

    //    if (type != null && type != undefined) {
    //        if (type == "Customer") {

    //            $(this).closest('div.div-bid-material').find('.customertype').show();
    //            $(this).closest('div.customertype').find('select.customer').attr('data-val', true);
    //            $(this).closest('div.customertype').find('select.customer').attr('data-val-required', 'Please select Customer');

    //            $(this).closest('div.contactnumber').show();
    //            $(this).closest('div.contactnumber').find('.mobilenumber').attr('data-val', true);
    //            $(this).closest('div.contactnumber').find('.mobilenumber').attr('data-val-required', 'Please Enter the Contact Number');

    //            $(this).closest('div.address').show();
    //            $(this).closest('div.address').find('.custaddress').attr('data-val', true);
    //            $(this).closest('div.address').find('.custaddress').attr('data-val-required', 'Please Enter the Address');
    //            $(this).closest('div.warehousediv').hide();
    //            $(this).closest('div.customertype').find('.warehouse').removeAttr('data-val', true);
    //            $(this).closest('div.customertype').find('.warehouse').removeAttr('data-val-required', 'Please select Warehouse');

    //            $(this).closest('div.warehousecode').hide();
    //        } else {

    //            $(this).closest('div.div-bid-material').find('.warehousediv').show();
    //            $(this).closest('div.div-bid-material').find('.customertype').show();

    //            //alert($(this).closest('div.div-bid-material').find('div.warehousediv').html())
    //            $(this).find('div.customertype').hide();
    //            $(this).find('div.customertype').find('select.customer').removeAttr('data-val', true);
    //            $(this).find('div.customertype').find('select.customer').removeAttr('data-val-required', 'Please select Customer');

    //            $('div.contactnumber').show();
    //            $('div.contactnumber').find('.mobilenumber').attr('data-val', true);
    //            $('div.contactnumber').find('.mobilenumber').attr('data-val-required', 'Please Enter the Contact Number');
    //            $(this).closest('div.address').show();
    //            $(this).closest('div.address').find('.custaddress').attr('data-val', true);
    //            $(this).closest('div.address').find('.custaddress').attr('data-val-required', 'Please Enter the Address');

    //            $(this).find('div.warehousediv').show();
    //            $(this).find('div.warehousediv').find('.warehouse').attr('data-val', true);
    //            $(this).find('div.warehousediv').find('.warehouse').attr('data-val-required', 'Please select Warehouse');
    //            $(this).find('div.warehousecode').show();

    //        }


    //        WebApp.Core.RebindFormValidation();
    //    }

    //});

    $(document).on('change', '.primary_logistics_partyname', function () {

        var type = $('.ShippingType').val();
        var party = $(this).val();
        var _current = $(this).closest('.initem_item_address_requisition');
        if (party != null && party != "") {
            $.get("/logisticsvehiclerequisitions/Findaddress", { party: party, type: type }, function (data) {
                if (data.status == true) {
                    if (data.address != null) {

                        _current.find('.custaddress').val(data.address);
                        _current.find('.custaddress').valid();
                        WebApp.Core.RebindFormValidation();
                    }
                }

            });
            WebApp.Core.RebindFormValidation();
        }
    });

    //$('select.customer').on('change', function () {
    //    var currentdiv = $(this).closest('div.initem_item_address_requisition');

    //    var customerid = $(this).val();
    //    $.get("/logisticsvehiclerequisitions/getcustomerdetails", { customerid: customerid }, function (data) {
    //        if (data.status == true) {
    //            currentdiv.find('input.partyname').val(data.partyname);
    //            currentdiv.find('input.mobilenumber').val(data.contactnumber);
    //            currentdiv.find('textarea.custaddress').text(data.address);
    //            currentdiv.find('textarea.custaddress').val(data.address);

    //            currentdiv.find('input.specific_address').val(data.address);
    //        } else {

    //            WebApp.Notifications.Show('Info', 'Something went wrong');

    //        }
    //    });

    //});
    $('select.ShipFromAddress').on('change', function () {
        $("select.loading_point").empty().trigger('change.select2');
        var ShipFromAddress = $('select.ShipFromAddress').closest('.closebtn-outer');
        ShipFromAddress.find(".close-btn").attr('style', 'display:none');


        $("select.currentUnloading").empty().trigger('change.select2');
        var datavalcurrentUnloading = $('select.currentUnloading').closest('.closebtn-outer');
        datavalcurrentUnloading.find(".close-btn").attr('style', 'display:none');

        $("input.loadingdistance").val("");

    });
    //$('select.MaterialType').on('change', function () {
    //    $("select.MaterialType").empty().trigger('change.select2');

    //});
    $('select.transporterid').on('change', function () {
        $("select.contractlocation").empty().trigger('change.select2');

    });


    //$('select.warehouse').on('change', function () {
    //    var warehouseid = $(this).val();
    //    var currentdiv = $(this).closest('div.initem_item_address_requisition');
    //    $.get("/logisticsvehiclerequisitions/GetwarehouseDetails", { warehouseid: warehouseid }, function (data) {
    //        if (data.status == true) {
    //            currentdiv.find('input.warehousecodeinput').val(data.warehousecode);
    //            currentdiv.find('textarea.custaddress').text(data.address);
    //            currentdiv.find('textarea.custaddress').val(data.address);

    //            currentdiv.find('input.specific_address').val(data.address);
    //            currentdiv.find('input.mobilenumber').val(data.mobilenumber);
    //        } else {
    //            WebApp.Notifications.Show('Info', 'Something went wrong');

    //        }
    //    });

    //});
    $('button.acceptpayment').on('click', function () {


        var id = $('input.hiddenid').val();
        var status = $(this).attr("data-attr");

        if (status != null && status != undefined) {


            window.location.href = "/advancepayment/updateapproveadvancepayment?id=" + id + "&status=" + status;

        }

    });
    $('a.navigatefilterlink').on('click', function () {
        var status = $(this).attr("data-attr");
        if (status != null && status != undefined) {
            $('input.findActiveclass').val(status);
            window.location.href = "/Secondary/GoodsIssue/WHIndentRequestsIndex?filter.Status=All&filter.RequestType=" + status;
        }
    });


    $('a.navigatesubfilterlink').on('click', function () {
        var status = $(this).attr("data-attr");
        var type = $(this).attr("data-val"); /*$('input.findActiveclass').val();*/

        if (status != null && status != undefined && type != null) {
            $('input.findActivesubclass').val(status);
            window.location.href = "/Secondary/GoodsIssue/WHIndentRequestsIndex?filter.Status=" + status + "&filter.RequestType=" + type;
        }
    });
    $('a.navigatelink').on('click', function () {

        var status = $(this).attr("data-attr");

        if (status != null && status != undefined) {
            $('input.findActiveclass').val(status);

            window.location.href = "/logisticsconvertbids/Index?filter.Status=All&filter.Type=" + status;

        }

    });


    $('a.navigatesublink').on('click', function () {

        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();


        if (status != null && status != undefined && type != null) {
            $('input.findActiveclass').val(status);

            window.location.href = "/logisticsconvertbids/Index?filter.Status=" + status + "&filter.Type=Requisition";

        }

    });


    $('a.planningtabdispatch').on('click', function () {
        //debugger;
        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();

        if (status != null && status != undefined && type != null) {
            $('input.findActiveclass').val(status);

            window.location.href = "/DispatchPlanningProcess/Index?filter.RequestType=" + type + "&filter.Type=active&filter.Status=" + status;

        }

    });
    $('a.planningtabrequisition').on('click', function () {
        //debugger;
        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();

        if (status != null && status != undefined && type != null) {

            window.location.href = "/LogisticsVehicleRequisitions/Index?filter.Type=" + type + "&filter.Status=" + status;

        }

    });
    $('a.exportplanningtabrequisition').on('click', function () {
        //debugger;
        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();

        if (status != null && status != undefined && type != null) {

            window.location.href = "/LogisticsVehicleRequisitions/ExportIndex?filter.Type=" + type + "&filter.Status=" + status;

        }

    });
    $('a.importlanningtabrequisition').on('click', function () {
        //debugger;
        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();

        if (status != null && status != undefined && type != null) {

            window.location.href = "/LogisticsVehicleRequisitions/ImportIndex?filter.Type=" + type + "&filter.Status=" + status;

        }

    });
    $('a.materialreturnfilter').on('click', function () {
        //debugger;
        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();

        if (status != null && status != undefined && type != null) {

            window.location.href = "/MaterialReturns/Index?filter.Type=" + type + "&filter.Status=" + status;

        }

    });
    $('a.rawmaterialplanningtabrequisition').on('click', function () {
        //debugger;
        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();

        if (status != null && status != undefined && type != null) {

            window.location.href = "/LogisticsVehicleRequisitions/RawMaterialIndex?filter.Type=" + type + "&filter.Status=" + status;

        }

    });
    $('a.navigatelinkmain').on('click', function () {

        var type = $(this).attr("data-attr");
        if (type != null && type != undefined) {
            $('input.findActiveclass').val(type);
            window.location.href = "/contracttransporters/Index?filter.Status=All&filter.RequestType=" + type;

        }

    });
    $('a.navigatelinkcontract').on('click', function () {

        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();
        if (status != null && status != undefined && type != null) {
            $('input.findActiveclass').val(status);

            window.location.href = "/contracttransporters/Index?filter.Status=" + status + "&filter.RequestType=Requisition";

        }

    });
    $('a.navigatelinkdispatch').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);

            window.location.href = "/DispatchPlanningProcess/Index?filter.RequestType=" + requesttype + "&filter.Type=active&filter.Status=Pending";

        }

    });
    $('a.navigatelinkaccountsatement').on('click', function () {
        //debugger;
        var requesttype = $(this).attr("data-attr");
        var transporterid = $('.transporterval').val();


        if (transporterid != null && transporterid != undefined) {
            $('input.findActiveclass').val(requesttype);

            window.location.href = "/transporters/AccountStatements?filter.id=" + transporterid + "&filter.status=" + requesttype + "&filter.type=all";

        }

    });

    $('a.navigatelinkpayment').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);

            window.location.href = "/advancepayment/Index?filter.Status=" + requesttype;

        }

    });
    $('a.navigatelinktransporterassign').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);

            window.location.href = "/transports/Assign?filter.RequestType=" + requesttype;

        }

    });


    $('a.navigatelinktrips').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);

            window.location.href = "/transports/Index?filter.Status=All&filter.RequestType=" + requesttype;

        }

    });

    //Warehouse
    $(document).on('click', 'input.indentreqwh', function () {

        var current = $(this).closest('tr');
        var _selectedItems = $('input.indentreqwh:checked').map(function () { return this.value; }).get().join(',');
        var _selectedItems2 = $('input.indentreqwh:checked').map(function () { return this.min; }).get().join(',');
        var count = 0;

        if (_selectedItems != "" && _selectedItems != null && _selectedItems != undefined && _selectedItems2 != "" && _selectedItems2 != null && _selectedItems2 != undefined) {
            var selected1 = _selectedItems2.split(',');

            $(".RequestIds").val(_selectedItems);
            $('.assign_transporter').removeAttr("style", "pointer-events: none");

            var uniqueNames = [];
            $.each(selected1, function (i, el) {
                if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });

            if (uniqueNames != null && uniqueNames.length == 1) {
                $('.assign_transporter').removeAttr("style", "pointer-events: none");
                $(".RequestIds").val(_selectedItems);
            }
            else if (uniqueNames != null && uniqueNames.length > 1) {
                WebApp.Notifications.Show('Info', 'Please choose the same Ship from address');
                $('input.indentreq:checked').prop('checked', false);
                $('tr').removeClass('row-highlight');
                $('.assign_transporter').attr("style", "pointer-events: none");
            }
        }
        else {
            $('.assign_transporter').attr("style", "pointer-events: none");
        }
    });
    $(document).on('click', 'input.checkbox_selected_indent', function () {
        ////debugger;
        var inc = 0;
        if ($(this).is(':checked')) {

            $('table.order_table').find('tr').each(function (index, item) {
                $(this).closest('tr').find('input.indentreq').prop('checked', true);
            });
            var _selectedItems = $('input.indentreq:checked').map(function () { return this.value; }).get().join(',');
            var _selectedItems2 = $('input.indentreq:checked').map(function () { return this.min; }).get().join(',');

            if (_selectedItems != "" && _selectedItems != null && _selectedItems != undefined && _selectedItems2 != "" && _selectedItems2 != null && _selectedItems2 != undefined) {
                var selected1 = _selectedItems2.split(',');

                var uniqueNames = [];
                $.each(selected1, function (i, el) {
                    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                });

                if (uniqueNames != null && uniqueNames.length == 1) {
                    /*$('.assign_transporter').attr("style", "pointer-events: none");*/
                    $('.assign_transporter').removeAttr("style", "pointer-events: none");
                    $(".RequestIds").val(_selectedItems);
                }
                else if (uniqueNames != null && uniqueNames.length > 1) {
                    WebApp.Notifications.Show('Info', 'Please choose the same Ship from address');
                    $('input.indentreq:checked').prop('checked', false);
                    $('tr').removeClass('row-highlight');
                    $('.assign_transporter').attr("style", "pointer-events: none");
                }
            }
        } else {
            $('table.dataTable.display tbody td').find('input:checkbox').prop('checked', false);
            $('.assign_transporter').attr("style", "pointer-events: none");
        }
    });

    $(document).on('click', 'input.indentreq', function () {

        var current = $(this).closest('tr');
        var _selectedItems = $('input.indentreq:checked').map(function () { return this.value; }).get().join(',');
        var _selectedItems2 = $('input.indentreq:checked').map(function () { return this.min; }).get().join(',');
        var count = 0;

        if (_selectedItems != "" && _selectedItems != null && _selectedItems != undefined && _selectedItems2 != "" && _selectedItems2 != null && _selectedItems2 != undefined) {
            var selected1 = _selectedItems2.split(',');

            var uniqueNames = [];
            $.each(selected1, function (i, el) {
                if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });

            if (uniqueNames != null && uniqueNames.length == 1) {
                $('.assign_transporter').removeAttr("style", "pointer-events: none");
                $(".RequestIds").val(_selectedItems);
            }
            else if (uniqueNames != null && uniqueNames.length > 1) {
                WebApp.Notifications.Show('Info', 'Please choose the same Ship from address');
                $('input.indentreq:checked').prop('checked', false);
                $('tr').removeClass('row-highlight');
                $('.assign_transporter').attr("style", "pointer-events: none");
            }
        }
    });
    $(document).on('click', 'input.checkbox_selected_indentwh', function () {
        ////debugger;
        var inc = 0;
        if ($(this).is(':checked')) {

            $('table.order_table').find('tr').each(function (index, item) {
                $(this).closest('tr').find('input.indentreqwh').prop('checked', true);
            });
            var _selectedItems = $('input.indentreqwh:checked').map(function () { return this.value; }).get().join(',');
            var _selectedItems2 = $('input.indentreqwh:checked').map(function () { return this.min; }).get().join(',');

            if (_selectedItems != "" && _selectedItems != null && _selectedItems != undefined && _selectedItems2 != "" && _selectedItems2 != null && _selectedItems2 != undefined) {
                var selected1 = _selectedItems2.split(',');

                var uniqueNames = [];
                $.each(selected1, function (i, el) {
                    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                });

                if (uniqueNames != null && uniqueNames.length == 1) {
                    /*$('.assign_transporter').attr("style", "pointer-events: none");*/
                    $('.assign_transporter').removeAttr("style", "pointer-events: none");
                    $(".RequestIds").val(_selectedItems);
                }
                else if (uniqueNames != null && uniqueNames.length > 1) {
                    WebApp.Notifications.Show('Info', 'Please choose the same Ship from address');
                    $('input.indentreqwh:checked').prop('checked', false);
                    $('tr').removeClass('row-highlight');
                    $('.assign_transporter').attr("style", "pointer-events: none");
                }
            }
        } else {
            $('table.dataTable.display tbody td').find('input:checkbox').prop('checked', false);
            $('.assign_transporter').attr("style", "pointer-events: none");
        }
    });



    $('a.navigatefilterlinkifft').on('click', function () {
        var status = $(this).attr("data-attr");
        if (status != null && status != undefined) {
            $('input.findActiveclass').val(status);
            window.location.href = "/Secondary/GoodsIssue/IFFTIndex?filter.RequestType=" + status;
        }
    });

    $('a.navigatefilterlinkdoc').on('click', function () {
        var status = $(this).attr("data-attr");
        var filtertype = $(this).attr("data-value");

        if (status != null && status != undefined) {
            $('input.findActiveclass').val(status);
            window.location.href = "/Secondary/doc-selected-list?filter.Type=" + status + "&filter.FilterType=" + filtertype;
        }
    });
    $('a.navigatefilterlinkbi').on('click', function () {
        var status = $(this).attr("data-attr");
        var filtertype = $(this).attr("data-value");

        if (status != null && status != undefined) {
            $('input.findActiveclass').val(status);
            window.location.href = "/Secondary/poultry-selected-list?filter.Type=" + status + "&filter.FilterType=" + filtertype;
        }
    });

    $('a.navigatelinktrips_filetr').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/inbound-trips?filter.Status=intransit&&filter.RequestType=" + requesttype;
        }
    });
    $('a.navigatelinktrips_filetr_outward').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/inbound-trips?filter.Status=yettodispatch&&filter.RequestType=Outgoing";
        }
    });

    $('a.navigatelinkouttrips_filetr').on('click', function () {
        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/inbound-trips?filter.Status=yettodispatch&&filter.RequestType=" + requesttype;
        }
    });

    $('a.navigatelinktrips_dispatch_doc_planned').on('click', function () {
        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/doc-selected-list?filter.Type=Planned&filter.FilterType=Planned";
        }
    });
    $('a.navigatelinktrips_dispatch_poultry_planned').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/poultry-selected-list?filter.Type=Planned&filter.FilterType=Planned";
        }
    });

    $('a.navigatelinktrips_dispatch').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/poultry-selected-list?filter.Type=" + requesttype;
        }
    });
    $('a.navigatelinktrips_dispatch_doc').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/doc-selected-list?filter.Type=" + requesttype;
        }
    });
    $('a.nav_link_dispatch_pendingsto').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/warehouse-farmer-aqua-list?filter.Status=Pending";
        }
    });
    $('a.nav_link_dispatch_deliveredsto').on('click', function () {

        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Secondary/warehouse-farmer-aqua-list?filter.Status=Delivered";
        }
    });
    //Warehouse

    //Internal
    $('a.nav_link_dispatch').on('click', function () {
        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Internal/DispatchPlanning/DispatchIndex?filter.type=" + requesttype;
        }
    });

    $('a.nav_link_medicines').on('click', function () {
        var requesttype = $(this).attr("data-attr");
        if (requesttype != null && requesttype != undefined) {
            $('input.findActiveclass').val(requesttype);
            window.location.href = "/Internal/VehicleRequisition/StoresMedicinesIndex?filter.type=" + requesttype;
        }
    });
    $('.navigatesublinkinternaltrips').on('click', function () {

        var status = $(this).attr("data-attr");
        //var type = $('input.findActiveclass').val();


        if (status != null && status != undefined) {

            $('input.findActiveclass').val(status);

            window.location.href = "/Internal/Trips/TripIndex?filter.Status=" + status;

        }

    });
    //Internal

    $('.navigatesublinktrips').on('click', function () {
        //debugger;
        var status = $(this).attr("data-attr");
        var type = $('input.findActiveclass').val();


        if (status != null && status != undefined && type != null) {

            $('input.findActiveclass').val(type);

            window.location.href = "/transports/Index?filter.Status=" + status + "&filter.RequestType=" + type;;

        }

    });
    $('Button.submitCancelBid').on('click', function () {
        var _selectedItems = $('.SelectTransporter:checked').map(function () { return this.value; }).get().join(',');
        var canceller = $('.CancelledBy').val();
        if (canceller == "Transporter") {
            if (_selectedItems != null && _selectedItems != undefined && _selectedItems != 0) {
                $(this).closest('form').submit();
            } else {
                alert("Please choose any other transporter");
            }

        } else {
            $(this).closest('form').submit();
        }

        WebApp.Core.RebindFormValidation();

    });
    $('.SelectTransporter').on('click', function () {
        var transporterid = $(this).attr('data-attr');

        if (transporterid != null && transporterid != "" && transporterid != undefined) {
            $('.FindTransporter').val(transporterid);
        }
    });


    $('.deliveredquanity').on('change', function () {

        var dispatch = $(this).val();

        var total = $('.totalquantityy').val();
        if (total != null && total != undefined && dispatch != null && dispatch != undefined) {
            if (parseInt(dispatch) > parseInt(total)) {

                WebApp.Notifications.Show('Info', 'Delivered quanity is not greater than Dispatch quantity');
                $('.deliveredquanity').val("");
            }
        }


    });


    $('select.unloadingarea').on('change', function () {

        var findunloadingarea = $("select.unloadingarea").val();


        if (findunloadingarea != "" && findunloadingarea != null && findunloadingarea != undefined) {


            $.get("/logisticsconvertbids/findceilingPrice", { findunloadingarea: findunloadingarea }, function (data) {
                if (data.status == true) {
                    $('input.ceiling').val(data.price);


                }

            });

        }


    });
    $(document).on('keyup change', 'input.search_keyword', function () {


        var value = $(this).val();

        value = $.trim(value);
        $("div.main_div_cat").filter(function () {
            var abc = $(this).find('div.transporter_name').attr('data-transporter');
            if (value.length > 0) {
                $('.clearbox').show();

            }
            else {
                $('.clearbox').hide();

            }

            var name = abc.toLowerCase();

            if (name.indexOf(value) > -1) {

                $(this).closest('.transporter_label').show();

            } else {

                $(this).closest('.transporter_label').hide();

            }
        });
    });
    $(document).on('click', '.clearbox', function () {


        $('input.search_keyword').val("");
        $('input.search_keyword').trigger("change");
    });
    $('input.BiddingNumber').on('change', function () {

        var findType = $("select.requisitionType").val();
        var Bidnumber = $(".BiddingNumber").val();


        if (findType != "" && findType != null && findType != undefined && Bidnumber != "" && Bidnumber != null && Bidnumber != undefined) {
            $.get("/logisticsparkin/verifyBidNumber", { findType: findType, Bidnumber: Bidnumber }, function (data) {
                if (data.status == false) {
                    $('input.BiddingNumber').val("");

                    WebApp.Notifications.Show('Info', 'Invalid Trip ID');


                } else {
                    $('input.VehicleNumber').val(data.vehiclenum);

                }
            });

        }

    })

    $('input.transportbidorContract').on('change', function () {

        var findType = $(".RequisitionTypeval").val();
        var contractorBidnumber = $(".transportbidorContract").val();
        var tripid = $(".tripid").val();


        if (findType != "" && findType != null && findType != undefined) {
            if (findType != "" && findType != null && findType != undefined && contractorBidnumber != null && contractorBidnumber != undefined) {

                window.location.href = "/logisticsparkin/VehicleParkIn?findType=" + findType + "&contractorBidnumber=" + contractorBidnumber + "&TripID=" + tripid;
            }
        } else {
            alert("Please select the type");
        }

    })
    $('select.requisitionTypeparkin').on('change', function () {

        $(".transportbidorContract").val("");


    })


    $('input.transportbidorContractpark').on('change', function () {

        var findType = $("select.requisitionTypeparkin").val();

        var contractorBidnumber = $(".transportbidorContractpark").val();

        var tripid = $(".tripid").val();

        if (contractorBidnumber != null && contractorBidnumber != undefined) {

            window.location.href = "/logisticsparkin/VehicleParkIn?findType=" + findType + "&contractorBidnumber=" + contractorBidnumber + "&TripID=" + tripid;
        }

    })
    $('select.requisitionTypeparkin').on('change', function () {

        $(".transportbidorContract").val("");


    })

    $('input.gateinTripNumber').on('change', function () {

        var tripNumber = $(".gateinTripNumber").val();

        if (tripNumber != "" && tripNumber != null && tripNumber != undefined) {

            $.get("/logisticsgatein/VerifySlipNumber", { tripnum: tripNumber }, function (data) {
                if (data.status == true) {
                    $('#tblMaterial td.slipnumber').html(data.gateInSlipNumber);
                    $('#tblMaterial td.biddingnumber').html(data.biddingNumber);
                    $('#tblMaterial td.lrnumber').html(data.lrnumber);
                    $('#tblMaterial td.vechiclenumber').html(data.vehiclenumber);
                    $('#tblMaterial td.drivername').html(data.driverName);
                    $('#tblMaterial td.driverphonenumber').html(data.driverPhoneNumber);
                    $('#tblMaterial td.transportername').html(data.transporterName);

                    $('input.ParkinInspectionID').val(data.parkin_inspection_ID);
                    $('input.biddingid').val(data.bidID);
                    $('input.type').val(data.type);
                    $('input.gateinslipid').val(data.gateinslipid);
                } else {
                    $(".gateinTripNumber").val("");
                    WebApp.Notifications.Show('Info', 'Requested Trip ID does not exist.Please try again');

                }
            });
        } else {
            alert("Please enter the Trip Number");
        }

    })


    $('input.FirstWeightTripNumber').on('change', function () {

        var tripNumber = $(".FirstWeightTripNumber").val();

        if (tripNumber != "" && tripNumber != null && tripNumber != undefined) {

            $.get("/weightstage/VerifyFirstweight", { tripnum: tripNumber }, function (data) {
                if (data.status) {

                    $('#tblMaterial td.biddingnumber').html(data.biddingNumber);
                    $('#tblMaterial td.lrnumber').html(data.lrnumber);
                    $('#tblMaterial td.vechiclenumber').html(data.vehiclenumber);
                    $('#tblMaterial td.drivername').html(data.driverName);
                    $('#tblMaterial td.driverphonenumber').html(data.driverPhoneNumber);
                    $('#tblMaterial td.transportername').html(data.transporterName);

                    $('input.ParkinInspectionID').val(data.park_in_inspection);
                    $('input.biddingid').val(data.bidID);
                    $('input.type').val(data.type);
                    $('input.gateinslipid').val(data.gateinslipid);
                    $('input.assigndriverid').val(data.assigndriver);
                } else {
                    $(".FirstWeightTripNumber").val("");
                    WebApp.Notifications.Show('Info', 'Requested Trip ID does not exist.Please try again');
                }
            });

        } else {
            alert("Please enter the Trip Number");
        }

    })
    $(document)
        .on('keypress', '.Name', function () {

            var AsciiValue = event.keyCode
            if ((AsciiValue >= 65 && AsciiValue <= 90) || (AsciiValue == 8 || AsciiValue == 127 || AsciiValue == 32) || (AsciiValue >= 97 && AsciiValue <= 122)) {
                event.returnValue = true;
            } else {
                event.returnValue = false;
            }
        });

    $('input.SecondWeightTripNumber').on('change', function () {

        var tripNumber = $(".SecondWeightTripNumber").val();

        if (tripNumber != "" && tripNumber != null && tripNumber != undefined) {

            $.get("/weightstage/VerifySecondweight", { tripnum: tripNumber }, function (data) {
                if (data.status == true) {

                    $('#tblMaterial td.biddingnumber').html(data.biddingNumber);
                    $('#tblMaterial td.lrnumber').html(data.lrnumber);
                    $('#tblMaterial td.vechiclenumber').html(data.vehiclenumber);
                    $('#tblMaterial td.drivername').html(data.driverName);
                    $('#tblMaterial td.driverphonenumber').html(data.driverPhoneNumber);
                    $('#tblMaterial td.transportername').html(data.transporterName);
                    $('#tblMaterial td.totalquantity').html(data.totalQuantity);
                    $('#tblMaterial td.weight').html(data.weight);
                    $('input.WeightDifference').val(data.weight);

                    $('input.ParkinInspectionID').val(data.park_in_inspection);
                    $('input.biddingid').val(data.bidID);
                    $('input.type').val(data.type);
                    $('input.gateinslipid').val(data.gateinslipid);
                    $('input.assigndriverid').val(data.assigndriver);
                } else {
                    $(".SecondWeightTripNumber").val("");

                    WebApp.Notifications.Show('Info', 'Requested Trip ID does not exist.Please try again');

                }
            });


        } else {
            alert("Please enter the Trip Number");
        }

    })
    $('button.btn_gateinslip').on('click', function () {
        var tripNumber = $(".Gate_TripID").val();

        if (tripNumber != null && tripNumber != undefined && tripNumber != "") {
            window.location.href = "/logisticsGateIn/PrintSlip?TripNumber=" + tripNumber;

        } else {
            alert("Please select Trip Number");
        }

    })
    $('button.btn_Verified').on('click', function () {
        window.location.href = "/Internal/trips/Gatein?parkInInspectionID=" + parkininspectionid + "&BiddingID=" + biddingid + "&type=" + type + "&slipid=" + slipid + "&id=" + tripid + "&Status=Accept" + "&RequestType=" + requesttype + "&remarks=" + remark;

    })
    //$('button.btn_Verified1').on('click', function () {
    //    window.location.href = "/Internal/trips/GateInInspection";

    //})
    $('button.btn_Approved').on('click', function () {
        var tripNumber = $(".gateinTripNumber").val();
        var remark = $(".GateInSlipRemark").val();
        var parkininspectionid = $('input.ParkinInspectionID').val();
        var biddingid = $('input.biddingid').val();
        var type = $('input.type').val();
        var tripid = $('input.tripID').val();

        var slipid = $('input.gateinslipid').val();
        var requesttype = $('input.requesttype').val();

        if (tripNumber != null && tripNumber != undefined && tripNumber != "") {
            window.location.href = "/logisticsgatein/GateinInspectionSlipNumberCheckingAcceptOrReject?parkInInspectionID=" + parkininspectionid + "&BiddingID=" + biddingid + "&type=" + type + "&slipid=" + slipid + "&id=" + tripid + "&Status=Accept" + "&RequestType=" + requesttype + "&remarks=" + remark;

        } else {
            alert("Please select Trip Number");
        }

    })



    $('button.btn_Reject').on('click', function () {
        var tripNumber = $(".gateinTripNumber").val();


        ////debugger;;
        var parkininspectionid = $('input.ParkinInspectionID').val();
        var biddingid = $('input.biddingid').val();
        var type = $('input.type').val();

        var slipid = $('input.gateinslipid').val();

        if (tripNumber != null && tripNumber != undefined && tripNumber != "") {
            window.location.href = "/logisticsgatein/GateinInspectionSlipNumberCheckingAcceptOrReject?parkInInspectionID=" + parkininspectionid + "&BiddingID=" + biddingid + "&type=" + type + "&slipid=" + slipid + "&Status=Reject";

        } else {
            alert("Please select Trip Number");
        }

    })

    $(document).on('change', 'select.requisitionLoadingData', function () {


        var req = $(this).val();
        $('input.SelectedReq').val(req);
        var currntdiv = $(this).closest('div.add_req');

        var selectedreq = $('input.SelectedReq').val();
        if (req != null && req != undefined) {
            //debugger;
            $.get("/DispatchPlanningProcess/getunloadingDataDetails", { req: selectedreq }, function (data) {
                if (data.status == true) {
                    currntdiv.find('div.NewDiv').html(data.loadclubbingdata);


                } else {

                    WebApp.Notifications.Show('Info', 'Something went wrong');

                }
            });


        }


    });

    $(document).on('click', '.add-requisition', function () {

        var currentItem = $(this).closest('div.add_req');

        var newItem = currentItem.clone(false, false);
        newItem.find('.select2-container').remove();
        newItem.find('select').addClass('autocomplete');
        newItem.find('.requisitionLoadingData').removeAttr('data-select2-default');
        newItem.insertAfter(currentItem);

    });


    $(document).on('click', '.remove-requisition', function () {

        if ($('div.add_req').length > 1) {
            $(this).closest('div.add_req').remove();
            $(this).closest('div.material_Div').remove();
            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }

    });


    //DO not CHNAGE OR RE-USE THIS CODE - WAREHOUSE - FROM HERE
    //Warehouse ad-more -------------- START

    //Inspection ---- START
    $(document).on('click', '.add-form-element-inspection', function () {

        var currentItem = $(this).closest('div.secondary_main_div').find('.secondary_add_more_material:last');
        var newItem = currentItem.clone(false, false);
        newItem.find('.MatID').val('');
        newItem.find('.MatID').val(0);
        newItem.find('.MatName').val('');
        newItem.find('.MatQty').val('');
        newItem.find('select').val('');
        newItem.find('.Return_Reason').val();
        newItem.find('.Material_description').val();

        newItem.find('.select2-container').remove();
        newItem.find('select').addClass('autocomplete');
        newItem.find('.Select_Material_Name').removeAttr('data-select2-default');
        newItem.find('.Select_Material').removeAttr('data-select2-default');
        newItem.find('.Material_description').removeAttr('data-select2-default');
        newItem.find('.Return_Reason').removeAttr('data-select2-default');
        /*currentItem.removeClass('secondary_add_more_material');*/
        newItem.find('.select2-container').remove();
        newItem.find('select.Material_description').addClass('autocomplete');
        newItem.find('.Material_description').removeAttr('data-select2-default');
        newItem.find('.Material_description').empty().trigger('change.select2');
        ////debugger;;
        newItem.find('.select2-container').remove();
        newItem.find('select.ShapeandSize').addClass('autocomplete');
        newItem.find('.ShapeandSize').removeAttr('data-select2-default');
        newItem.find('.ShapeandSize').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.ColorandOdour').addClass('autocomplete');
        newItem.find('.ColorandOdour').removeAttr('data-select2-default');
        newItem.find('.ColorandOdour').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.Insects').addClass('autocomplete');
        newItem.find('.Insects').removeAttr('data-select2-default');
        newItem.find('.Insects').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.BagWeight').addClass('autocomplete');
        newItem.find('.BagWeight').removeAttr('data-select2-default');
        newItem.find('.BagWeight').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.Stitching').addClass('autocomplete');
        newItem.find('.Stitching').removeAttr('data-select2-default');
        newItem.find('.Stitching').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.GodownMaintenance').addClass('autocomplete');
        newItem.find('.GodownMaintenance').removeAttr('data-select2-default');
        newItem.find('.GodownMaintenance').empty().trigger('change.select2');

        newItem.find('.material_code').val('');
        newItem.find('.MaterialQty').val('');
        newItem.find('.QtyReceivedNo').val('');
        newItem.find('.QtyReceivedMT').val('');
        newItem.find('.QtyDamagedNo').val('');
        newItem.find('.QtyDamagedMT').val('');
        newItem.find('.QtyShortageNo').val('');
        newItem.find('.QtyShortageMT').val('');

        newItem.find('.btnumbr').val('');
        newItem.find('.prdate').val('');
        newItem.find('.nobags').val('');
        newItem.find('.rodent').val('');

        newItem.find('a.remove-visit').show();
        newItem.find('.material_labels').html('');
        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();

    });

    $(document).on('click', '.add-form-element-inspection-observe', function () {
        var currentItem = $(this).closest('div.secondary_main_div_ob').find('.secondary_add_more_material_ob:last');
        var newItem = currentItem.clone(false, false);
        newItem.find('.filermks').val('');
        newItem.find('.ob_files').val('');

        newItem.find('.obid').val(0);
        newItem.find('.obfilenames').val('');

        newItem.find('a.remove-visit').show();
        newItem.find('.material_labels').html('');
        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();
    });

    $(document).on('click', '.remove-form-element-inspection-observe', function () {
        var currentdiv = $(this).closest('.secondary_add_more_material_ob');
        var totaldivlength = $('.secondary_add_more_material_ob').length;
        if (currentdiv.find('.add_more_secondary_ob').length > 1) {
            $(this).closest('div.secondary_add_more_material_ob').remove();
            WebApp.Core.ProcessNames();
        } else {
            if (totaldivlength > 1) {
                $(this).closest('.secondary_add_more_material_ob').remove();
                $(this).closest('.secondary_add_more_material_ob_file').remove();
                WebApp.Core.ProcessNames();
            } else {
                alert('At least one item is required.');
            }
        }

        //var currentfilediv = $(this).closest('.secondary_add_more_material_ob_file');
        //$(this).closest('.secondary_add_more_material_ob_file').remove();

    });

    $(document).on('change', '.contractPaymentmethod', function () {
        ////debugger;;
        var _type = $(this).val();
        if (_type != "" && _type != null) {
            var currentTr = $(this).closest('.main_div_payment');
            var trIndex = $("div.main_div_payment").index(currentTr)
            var _loadingpoint = $(this).closest('.main_div_payment').find('.LoadingPoint').val();
            var _unloading = $(this).closest('.main_div_payment').find('.UnloadingPoint').val();
            var vehicle = $(this).closest('.main_div_payment').find('.ContractVehicleType').val();
            var vehiclesize = $(this).closest('.main_div_payment').find('.VehicleSize').val();
            var _index = 0;
            $('.contract_Payment').find('.main_div_payment').each(function (index, item) {
                var _currentloadingpoint = $(item).find('.LoadingPoint').val();
                var _currentunloading = $(item).find('.UnloadingPoint').val();
                var currentvehicle = $(item).find('.ContractVehicleType').val();
                var currentvehiclesize = $(item).find('.VehicleSize').val();
                var currenttype = $(item).find('.contractPaymentmethod').val();


                if (currentvehiclesize == vehiclesize && currentvehicle == vehicle && _currentunloading == _unloading && _currentloadingpoint == _loadingpoint && index != (parseInt(trIndex))) {
                    _index = parseInt(_index) + parseInt(1);
                }
            });

            if (parseInt(_index) > parseInt(0)) {
                WebApp.Notifications.Show("Info", "The rate is already set for this route.");
                $(this).closest('.main_div_payment').find('.LoadingPoint').val("");
                $(this).closest('.main_div_payment').find('.UnloadingPoint').val("");
                $(this).closest('.main_div_payment').find('.ContractVehicleType').val("");
                $(this).closest('.main_div_payment').find('.VehicleSize').val("");
                $(this).val("");
            }
        }

    });

    $(document).on('click', '.add-form-element-inspection-edit', function () {

        var currentItem = $(this).closest('div.secondary_main_div').find('.secondary_add_more_material:last');
        var newItem = currentItem.clone(false, false);
        newItem.find('.MatID').val('');
        newItem.find('.MatID').val(0);
        newItem.find('.MatName').val('');
        newItem.find('.MatQty').val('');
        newItem.find('select').val('');
        newItem.find('.Return_Reason').val();
        newItem.find('.Material_description').val();

        newItem.find('.select2-container').remove();
        newItem.find('select').addClass('autocomplete');
        newItem.find('.Select_Material_Name').removeAttr('data-select2-default');
        newItem.find('.Select_Material').removeAttr('data-select2-default');
        newItem.find('.Material_description').removeAttr('data-select2-default');
        newItem.find('.Return_Reason').removeAttr('data-select2-default');
        /*currentItem.removeClass('secondary_add_more_material');*/

        newItem.find('.material_code').val('');
        newItem.find('.MaterialQty').val('');
        newItem.find('.QtyReceivedNo').val('');
        newItem.find('.QtyReceivedMT').val('');
        newItem.find('.QtyDamagedNo').val('');
        newItem.find('.QtyDamagedMT').val('');
        newItem.find('.QtyShortageNo').val('');
        newItem.find('.QtyShortageMT').val('');

        newItem.find('a.remove-visit').show();
        newItem.find('.material_labels').html('');
        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();
    });

    $(document).on('click', '.remove-form-element-inspection', function () {
        ////debugger;;
        var currentdiv = $(this).closest('.secondary_add_more_material');
        var totaldivlength = $('.secondary_add_more_material').length;
        if (currentdiv.find('.add_more_secondary').length > 1) {
            $(this).closest('div.secondary_add_more_material').remove();
            WebApp.Core.ProcessNames();
        } else {
            if (totaldivlength > 1) {
                $(this).closest('.secondary_add_more_material').remove();
                WebApp.Core.ProcessNames();
            } else {
                alert('At least one item is required.');
            }
        }
    });
    //Inspection ---- END

    //General -------- START
    $(document).on('click', '.add-form-element-s', function () {

        var currentItem = $(this).closest('div.secondary_main_div').find('.secondary_add_more_material:last');
        var newItem = currentItem.clone(false, false);

        /*newItem.find('input').val('');*/
        newItem.find('.MatCode').val('');
        newItem.find('.WName').val('');
        newItem.find('.MatQtyMT').val('');
        newItem.find('.MatQtyBags').val('');
        newItem.find('.MatID').val('');
        newItem.find('.MatID').val(0);
        newItem.find('.Warehouse_Name').val('');
        newItem.find('.MatName').val('');
        newItem.find('.MatQty').val('');
        newItem.find('select').val('');
        newItem.find('input').val('');
        newItem.find('textarea').val('');
        newItem.find('label.MatQtyActualMT').html('-');
        newItem.find('input.MatQty_ActualMT_cls').val('0');

        newItem.find(".Return_Reason").select2();
        newItem.find('.Return_Reason').val();
        newItem.find('.MatCode1').html("-");
        newItem.find('.Material_description').val();

        newItem.find('.MatQtyMTDiv').html('-');
        newItem.find('.MatCodeDiv').html('-');

        newItem.find('.select2-container').remove();
        newItem.find('select.Select_Material_Name').addClass('autocomplete');
        newItem.find('.Select_Material_Name').removeAttr('data-select2-default');
        newItem.find('.Select_Material_Name').empty().trigger('change.select2');

        newItem.find('select.u_o_m').addClass('autocomplete');
        newItem.find('.u_o_m').removeAttr('data-select2-default');
        newItem.find('.u_o_m').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.Warehouse_Name').addClass('autocomplete');
        newItem.find('.Warehouse_Name').removeAttr('data-select2-default');
        newItem.find('.Warehouse_Name').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.Farm_Name').addClass('autocomplete');
        newItem.find('.Farm_Name').removeAttr('data-select2-default');
        newItem.find('.Farm_Name').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select').addClass('autocomplete');
        newItem.find('.Select_Material_Name').removeAttr('data-select2-default');
        newItem.find('.Warehouse_Name').removeAttr('data-select2-default');
        newItem.find('.Select_Material').removeAttr('data-select2-default');

        newItem.find('.select2-container').remove();
        newItem.find('select.Return_Reason').addClass('autocomplete');
        newItem.find('.Return_Reason').removeAttr('data-select2-default');
        newItem.find('.Return_Reason').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.Material_description').addClass('autocomplete');
        newItem.find('.Material_description').removeAttr('data-select2-default');
        newItem.find('.Material_description').empty().trigger('change.select2');
        //newItem.find('.Return_Reason').removeAttr('data-select2-default');
        /*currentItem.addClass('secondary_add_more');*/
        /*currentItem.removeClass('secondary_add_more_material');*/


        newItem.find('.material_code').val('');
        newItem.find('.MaterialQty').val('');
        newItem.find('.QtyReceivedNo').val('');
        newItem.find('.QtyReceivedMT').val('');
        newItem.find('.QtyDamagedNo').val('');
        newItem.find('.QtyDamagedMT').val('');
        newItem.find('.QtyShortageNo').val('');
        newItem.find('.QtyShortageMT').val('');

        newItem.find('a.remove-visit').show();
        newItem.find('.material_labels').html('');
        newItem.addClass('secondary_add_more_material');
        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();


        //var i = 1;
        //////debugger;;
        //$(this).closest('.add-form-element').find('div.div-add-more-main').each(function (index, item) {
        //    var indexvalue = parseInt(index) + parseInt(1);

        //    $(item).find('div.sl_no').html(indexvalue);
        //    i = parseInt(i) + parseInt(1);
        //});



    });

    $(document).on('click', '.add-form-element-s-edit', function () {

        var currentItem = $(this).closest('div.secondary_main_div').find('.secondary_add_more_material:last');
        var newItem = currentItem.clone(false, false);

        /*newItem.find('input').val('');*/
        newItem.find('.MatCode').val('');
        newItem.find('.WName').val('');
        newItem.find('.MatQtyMT').val('');
        newItem.find('.MatQtyBags').val('');
        newItem.find('.MatID').val('');
        newItem.find('.MatID').val(0);
        newItem.find('.Warehouse_Name').val('');
        newItem.find('.MatName').val('');
        newItem.find('.MatQty').val('');
        newItem.find('select').val('');
        newItem.find('.Return_Reason').val();
        newItem.find('.Material_description').val('');

        newItem.find('.select2-container').remove();
        newItem.find('select.Select_Material_Name').addClass('autocomplete');
        newItem.find('.Select_Material_Name').removeAttr('data-select2-default');
        newItem.find('.Select_Material_Name').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.Warehouse_Name').addClass('autocomplete');
        newItem.find('.Warehouse_Name').removeAttr('data-select2-default');
        newItem.find('.Warehouse_Name').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.Farm_Name').addClass('autocomplete');
        newItem.find('.Farm_Name').removeAttr('data-select2-default');
        newItem.find('.Farm_Name').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select').addClass('autocomplete');
        newItem.find('.Select_Material_Name').removeAttr('data-select2-default');
        newItem.find('.Warehouse_Name').removeAttr('data-select2-default');
        newItem.find('.Select_Material').removeAttr('data-select2-default');
        newItem.find('.Material_description').removeAttr('data-select2-default');
        newItem.find('.Return_Reason').removeAttr('data-select2-default');
        /*currentItem.addClass('secondary_add_more');*/
        /*currentItem.removeClass('secondary_add_more_material');*/


        newItem.find('.material_code').val('');
        newItem.find('.MaterialQty').val('');
        newItem.find('.QtyReceivedNo').val('');
        newItem.find('.QtyReceivedMT').val('');
        newItem.find('.QtyDamagedNo').val('');
        newItem.find('.QtyDamagedMT').val('');
        newItem.find('.QtyShortageNo').val('');
        newItem.find('.QtyShortageMT').val('');

        newItem.find('a.remove-visit').show();
        newItem.find('.material_labels').html('');
        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();


        //var i = 1;
        //////debugger;;
        //$(this).closest('.add-form-element').find('div.div-add-more-main').each(function (index, item) {
        //    var indexvalue = parseInt(index) + parseInt(1);

        //    $(item).find('div.sl_no').html(indexvalue);
        //    i = parseInt(i) + parseInt(1);
        //});



    });

    $(document).on('click', '.remove-form-element-s', function () {
        ////debugger;;
        var currentdiv = $(this).closest('.secondary_main_div');
        var totaldivlength = $('div.secondary_main_div').length;

        if (currentdiv.find('.add_more_secondary').length > 1) {
            $(this).closest('tr.add_more_secondary').remove();
            WebApp.Core.ProcessNames();
            //Calculate values
            //****************From here****************
            var _total_qty_MT = 0;
            var _total_qty_KG = 0;
            $('div.add_more_indent').each(function (index, item) {
                var qty = $(item).find('input.MatQtyMT').val();
                var uom = $(item).find('input.FName').val();
                if (qty == null || qty == "" || uom == "") {
                    qty = 0;
                }
                else {
                    if (uom == "MT") {
                        _total_qty_MT = parseFloat(_total_qty_MT) + parseFloat(qty);  //for UOM=MT 
                    }
                    else if (uom == "KG") {
                        _total_qty_KG = parseFloat(_total_qty_KG) + parseFloat(qty);    //for UOM=KG
                    }
                }
            });
            $('.total_qty_MT_h6').html('Total Material Quantity (MT): ' + _total_qty_MT);
            $('#total_qty_MT_h6').val(_total_qty_MT);
            $('.total_qty_KG_h6').html('Total Material Quantity (KG): ' + _total_qty_KG);
            $('#total_qty_KG_h6').val(_total_qty_KG);
        } else {
            if (totaldivlength > 1) {
                $(this).closest('div.add_more_secondary').remove();
                var currentItem = $(this).closest('div.secondary_main_div').find('.add_more_secondary');
                currentItem.addClass('.secondary_add_more_material');
                WebApp.Core.ProcessNames();
            } else {
                alert('At least one item is required.');
            }
        }

    });
    $(document).on('click', '.remove-form-element-s-whindent', function () {
        ////debugger;;
        var currentdiv = $(this).closest('.secondary_main_div');
        var totaldivlength = $('div.secondary_main_div').length;
        if (currentdiv.find('.add_more_secondary').length > 1) {
            $(this).closest('div.add_more_secondary').remove();
            WebApp.Core.ProcessNames();
            //Calculate values
            //****************From here****************
            var _total_qty_MT = 0;
            var _total_qty_Bags = 0;

            $('div.add_more_wh_indentreq').each(function (index, item) {
                var qtyMT = $(item).find('input.MatQtyMT').val();
                if (qtyMT == null || qtyMT == "") {
                    qtyMT = 0;
                }
                _total_qty_MT = parseFloat(_total_qty_MT) + parseFloat(qtyMT);

                var qtyBags = $(item).find('input.MatQtyBags').val();
                if (qtyBags == null || qtyBags == "") {
                    qtyBags = 0;
                }
                _total_qty_Bags = parseFloat(_total_qty_Bags) + parseFloat(qtyBags);
            });
            $('.total_qty_MT_h6').html('Total Material Quantity (MT): ' + _total_qty_MT);
            $('#total_qty_MT_h6').val(_total_qty_MT);
            $('.total_qty_Bags_h6').html('Total Material Quantity (KG): ' + _total_qty_Bags);
            $('#total_qty_Bags_h6').val(_total_qty_KG);

            //****************To here****************

        } else {
            if (totaldivlength > 1) {
                $(this).closest('div.add_more_secondary').remove();
                var currentItem = $(this).closest('div.secondary_main_div').find('.add_more_secondary');
                currentItem.addClass('.secondary_add_more_material');
                WebApp.Core.ProcessNames();
            } else {
                alert('At least one item is required.');
            }
        }

    });
    //General -------- END

    //Warehouse ad-more -------------- END
    //DO not CHNAGE OR RE-USE THIS CODE - WAREHOUSE - UNTIL HERE


    //----------------Internal-----------------construction eqp,dispatch plan
    $(document).on('click', '.add-form-element-i', function () {
        ////debugger;;
        var currentItem = $(this).closest('div.internal_main_div').find('.internal_add_more_material:last');
        var newItem = currentItem.clone(false, false);

        /*newItem.find('input').val('');*/
        newItem.find('.driver_name').val('');
        newItem.find('.vendor').val('');
        newItem.find('.Material').val('');
        newItem.find('.locationto').val('');
        newItem.find('.txtvehiclename').val('');
        newItem.find('.driver_name').val('');
        newItem.find('.dispatch_qty').val('');
        newItem.find('.no_oftrips').val('');
        newItem.find('.tripstatus').val('');

        newItem.find('.select2-container').remove();
        newItem.find('select.locationto').addClass('autocomplete');
        newItem.find('.locationto').removeAttr('data-select2-default');
        newItem.find('.locationto').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.dispatch_materialBy').addClass('autocomplete');
        newItem.find('.dispatch_materialBy').removeAttr('data-select2-default');
        newItem.find('.dispatch_materialBy').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.vehicle_name').addClass('autocomplete');
        newItem.find('.vehicle_name').removeAttr('data-select2-default');
        newItem.find('.vehicle_name').empty().trigger('change.select2');

        newItem.find('.select2-container').remove();
        newItem.find('select.veh_capacity').addClass('autocomplete');
        newItem.find('.veh_capacity').removeAttr('data-select2-default');
        newItem.find('.veh_capacity').empty().trigger('change.select2');

        //if (parseFloat(_total_dispatchqty) == parseFloat(reqqty)) {

        //    $('.add-form-element-i').attr("style", "pointer-events: none");
        //}
        //else {
        //    $('.add-form-element-i').removeAttr("style", "pointer-events: none");
        //}
        //currentItem.addClass('internal_add_more');
        //currentItem.removeClass('internal_add_more_material');
        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();

    });
    //$(document).on('click', '.remove-form-element-i', function () {
    //    ////debugger;;
    //    var currentdiv = $(this).closest('.internal_add_more_material');
    //    var totaldivlength = $('div.internal_add_more_material').length;
    //    if (currentdiv.find('.add_more_internal').length > 1) {
    //        $(this).closest('div.internal_add_more_material').remove();
    //        WebApp.Core.ProcessNames();
    //    } else {
    //        if (totaldivlength > 1) {
    //            $(this).closest('div.internal_add_more_material').remove();
    //            var currentItem = $(this).closest('div.internaly_main_div').find('.internal_add_more_material');
    //            currentItem.addClass('.internal_add_more_material');
    //            WebApp.Core.ProcessNames();
    //        } else {
    //            alert('At least one item is required.');
    //        }
    //    }

    //});
    $(document).on('click', '.add-form-element-i1', function () {

        var currentItem = $(this).closest('div.internal_main_div_1').find('.internal_add_more_material_1:last');
        var newItem = currentItem.clone(false, false);

        newItem.find('.dispatchqty').val('');
        newItem.find('.nooftrips').val('');
        newItem.find('.select2-container').remove();
        newItem.find('select.transporter').addClass('autocomplete');
        newItem.find('.transporter').removeAttr('data-select2-default');
        newItem.find('.transporter').empty().trigger('change.select2');


        currentItem.addClass('internal_add_more_1');
        //currentItem.removeClass('internal_add_more_material_1');

        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();
    });

    //-----------------------------------------

    $(document).on('click', '.add-form-element', function () {

        var currentItem = $(this).closest('div.secondary_main_div').find('.secondary_add_more_material');
        var newItem = currentItem.clone(false, false);

        /*newItem.find('input').val('');*/

        newItem.find('.MatID').val('');
        newItem.find('.MatID').val(0);
        newItem.find('.MatCode').val('');
        newItem.find('.MatQtyMT').val('');
        newItem.find('.MatQtyBags').val('');
        newItem.find('.MatName').val('');
        newItem.find('.MatQty').val('');
        newItem.find('select').val('');
        newItem.find('.Return_Reason').val();
        newItem.find('.Material_description').val();

        newItem.find('.select2-container').remove();
        newItem.find('select').addClass('autocomplete');
        newItem.find('.Select_Material_Name').removeAttr('data-select2-default');
        newItem.find('.Warehouse_Name').removeAttr('data-select2-default');
        newItem.find('.Select_Material').removeAttr('data-select2-default');
        newItem.find('.Material_description').removeAttr('data-select2-default');
        newItem.find('.Return_Reason').removeAttr('data-select2-default');
        //currentItem.removeClass('secondary_add_more_material');


        newItem.find('.material_code').val('');
        newItem.find('.MaterialQty').val('');
        newItem.find('.QtyReceivedNo').val('');
        newItem.find('.QtyReceivedMT').val('');
        newItem.find('.QtyDamagedNo').val('');
        newItem.find('.QtyDamagedMT').val('');
        newItem.find('.QtyShortageNo').val('');
        newItem.find('.QtyShortageMT').val('');

        newItem.find('a.remove-visit').show();
        newItem.find('.material_labels').html('');
        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();


    });

    $(document).on('click', '.remove-form-element', function () {

        var currentdiv = $(this).closest('div.addressdiv');
        var totaldivlength = $('div.addressdiv').length;
        if (currentdiv.find('.div-add-more-main').length > 1) {
            $(this).closest('div.div-add-more-main').remove();
            WebApp.Core.ProcessNames();
        } else {
            if (totaldivlength > 1) {
                $(this).closest('div.addressdiv').remove();
                WebApp.Core.ProcessNames();
            } else {
                alert('At least one item is required.');
            }

        }
    });

    $('.sidebar li').on('click', function () {
        $('.sidebar li').removeClass('active');
        $(this).addClass('active');
    })



    $(document).on("keypress", ".number-only", function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
            event.preventDefault();
        }
    });

    $(document).on('click', '.add-form-elem', function () {

        var currentdiv = $(this).closest('tr.add-more-material-item');
        //debugger;
        var newItem = currentdiv.clone(false, false);
        newItem.find('.Material_ID').val('');
        newItem.find('.Material_ID').val(0);
        newItem.find('.select2-container').remove();
        newItem.find('select.Material_description').addClass('autocomplete');
        newItem.find('.Material_description').removeAttr('data-select2-default');
        newItem.find('.Material_description').removeAttr('data-select2-default');
        newItem.find('.Material_description').empty().trigger('change.select2');
        newItem.find('div.close-btn').attr('style', 'display:none');

        newItem.find('select.add_more_select').empty().trigger('change.select2');
        newItem.find('.add_more_select').removeAttr('data-select2-default');
        newItem.find('.new .select2-container').remove();
        newItem.find('select.add_more_select').addClass('autocomplete');
        newItem.find('select.packing_type').addClass('autocomplete');
        newItem.find('.packing_type').removeAttr('data-select2-default');
        newItem.find('.packing_type').empty().trigger('change.select2');

        //newItem.find('select.BirdSize').addClass('autocomplete');
        //newItem.find('.BirdSize').removeAttr('data-select2-default');
        //newItem.find('.BirdSize').removeAttr('data-select2-default');
        newItem.find('.material_code').val('');
        newItem.find('.req_qty').val('');
        newItem.find('.Requested_quantity').val('');
        newItem.find('a.remove-visit').show();
        newItem.find('.material_labels').html('');
        var i = 1;

        newItem.insertAfter(currentdiv);
        WebApp.Core.ProcessNames();


        WebApp.Core.RebindFormValidation();


    });


    $(document).on('click', '.add-form-elem_transporter', function () {

        var currentdiv = $(this).closest('div.add-more-item');


        var newItem = currentdiv.clone(false, false);
        newItem.find('.Material_ID').val('');
        newItem.find('.Material_ID').val(0);
        newItem.find('.select2-container').remove();
        newItem.find('select.MaterialType').addClass('autocomplete');
        newItem.find('select.MaterialType').removeAttr('data-select2-default');
        newItem.find('select.MaterialType').empty().trigger('change.select2');


        newItem.find('select.state').addClass('autocomplete');
        newItem.find('.new .state').removeAttr('data-select2-default');
        newItem.find('.new .state').empty().trigger('change.select2');
        newItem.find('div.close-btn').attr('style', 'display:none');

        newItem.find('select.LoadingPoint').addClass('autocomplete');
        newItem.find('.new .LoadingPoint').removeAttr('data-select2-default');
        newItem.find('.new .LoadingPoint').empty().trigger('change.select2');


        newItem.find('select.area').addClass('autocomplete');
        newItem.find('.area').removeAttr('data-select2-default');
        newItem.find('.area').empty().trigger('change.select2');


        newItem.insertAfter(currentdiv);
        WebApp.Core.ProcessNames();


        WebApp.Core.RebindFormValidation();


    });

    $(document).on('click', '.add-form-elem_transporter_route', function () {

        var currentdiv = $(this).closest('div.add-more-item');


        var newItem = currentdiv.clone(false, false);

        newItem.find('.select2-container').remove();
        newItem.find('select.rote_vehicle').addClass('autocomplete');
        newItem.find('select.rote_vehicle').removeAttr('data-select2-default');
        newItem.find('select.rote_vehicle').empty().trigger('change.select2');


        newItem.find('select.route_size').addClass('autocomplete');
        newItem.find('.route_size').removeAttr('data-select2-default');
        newItem.find('.route_size').empty().trigger('change.select2');
        newItem.find('div.close-btn').attr('style', 'display:none');

        newItem.find('input').val("");

        newItem.insertAfter(currentdiv);
        WebApp.Core.ProcessNames();


        WebApp.Core.RebindFormValidation();


    });
    $(document).on('click', '.remove-form-elem_transporter', function () {


        var totaldivlength = $('div.add-more-item').length;

        if (totaldivlength > 1) {
            $(this).closest('div.add-more-item').remove();
            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }


    });


    $(document).on('click', '.add-form-elem_transporter_rate', function () {

        var currentdiv = $(this).closest('div.add-more-item');


        var newItem = currentdiv.clone(false, false);

        newItem.find('.select2-container').remove();
        newItem.find('select.LoadingPoint').addClass('autocomplete');
        newItem.find('select.LoadingPoint').removeAttr('data-select2-default');
        newItem.find('select.LoadingPoint').empty().trigger('change.select2');
        newItem.find('div.close-btn').attr('style', 'display:none');

        newItem.find('.Material_ID').val('');
        newItem.find('.Material_ID').val(0);
        newItem.find('select.UnloadingPoint').addClass('autocomplete');
        newItem.find('.new .UnloadingPoint').removeAttr('data-select2-default');
        newItem.find('.new .UnloadingPoint').empty().trigger('change.select2');

        newItem.find('select.ContractVehicleType').addClass('autocomplete');
        newItem.find('.new .ContractVehicleType').removeAttr('data-select2-default');
        newItem.find('.new .ContractVehicleType').empty().trigger('change.select2');


        newItem.find('select.VehicleSize').addClass('autocomplete');
        newItem.find('.VehicleSize').removeAttr('data-select2-default');
        newItem.find('.VehicleSize').empty().trigger('change.select2');


        newItem.find('input').val('');

        newItem.insertAfter(currentdiv);
        WebApp.Core.ProcessNames();


        WebApp.Core.RebindFormValidation();


    });
    $(document).on('click', '.remove-form-elem_transporter_rate', function () {


        var totaldivlength = $('div.add-more-item').length;

        if (totaldivlength > 1) {
            $(this).closest('div.add-more-item').remove();
            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }


    });
    //--------------------------------Internal add-more---------------------------------------
    $(document).on('click', '.add-form-elem_internal', function () {

        var currentdiv = $(this).closest('tr.add-more-material-item_internal');

        var newItem = currentdiv.clone(false, false);
        newItem.find('.Material_ID').val('');
        newItem.find('.Material_ID').val(0);
        newItem.find('.select2-container').remove();
        newItem.find('select.material_category').addClass('autocomplete');
        newItem.find('.material_category').removeAttr('data-select2-default');
        newItem.find('.material_category').empty().trigger('change.select2');

        newItem.find('select.add_more_select_internal').empty().trigger('change.select2');
        newItem.find('.new .select2-container').remove();
        newItem.find('.new select.add_more_select_internal').addClass('autocomplete');
        newItem.find('select.uom').addClass('autocomplete');
        newItem.find('.uom').removeAttr('data-select2-default');
        newItem.find('.uom').empty().trigger('change.select2');


        newItem.find('.req_qty').val('');
        newItem.find('.Requested_quantity').val('');
        newItem.find('a.remove-visit').show();
        newItem.find('.material_labels').html('');
        var i = 1;

        newItem.insertAfter(currentdiv);
        WebApp.Core.ProcessNames();


        WebApp.Core.RebindFormValidation();


    });

    //$(document).on('click', '.remove-form-elem_internal', function () {



    //    var currentdiv = $(this).closest('.material_Div_dat_internal');
    //    var _total = 0;
    //    var currenttotal = 0;
    //    if (currentdiv.find('.add-more-material-item_internal').length > 1) {
    //        $(this).closest('.add-more-material-item_internal').remove();

    //        WebApp.Core.ProcessNames();
    //    }
    //    else {
    //        alert('At least One Item is required.');
    //    }
    //    $('.div-add-more-main_internal').each(function (index, item) {
    //        var indexvalue = parseInt(index) + parseInt(1);

    //        $(item).find('.sl_no_material').html(indexvalue);
    //        var _currentvalue = $(item).find('input.Requested_quantity').val();

    //        if (_currentvalue == "") {
    //            currenttotal = 0;
    //        }
    //        else {
    //            currenttotal = $(item).find('input.Requested_quantity').val();
    //        }
    //        _total = parseInt(_total) + parseInt(currenttotal);
    //        var total = $('input.TotalQuantity').val(_total);


    //    });
    //    $('.total_quantity_h6').html('Total Requested Quantity (MT) : ' + _total);
    //});

    $(document).on('click', '.add-more-address_item_requisition_internal', function (index) {

        var currentItem = $(this).closest('.add_more_requisition_unloading_internal').find('.initem_item_address_requisition_internal:last');
        var _currentMainDiv = $(this).closest('.add_more_requisition_unloading_internal');
        var newItem = currentItem.clone(false, false);
        newItem.find('.distance').show();
        newItem.find('.displaydistance').hide();
        newItem.find('input textarea').val('');
        newItem.find('.removed_value').val('');
        newItem.find('input').not('input.vehicledistance').val('');

        newItem.find('.warehouse').val('');


        newItem.find('.warehouse').empty().trigger('change.select2');
        newItem.find('.delivery_point').empty().trigger('change.select2');


        newItem.find('.select2-container').remove();
        newItem.find('select.customer').addClass('autocomplete');
        newItem.find('select.warehouse').addClass('autocomplete');
        newItem.find('select.Material_description').addClass('autocomplete');
        newItem.find('select.delivery_point').addClass('autocomplete');
        newItem.find('select.add_more_select').addClass('autocomplete');
        newItem.find('select.loading_point_internal').addClass('autocomplete');

        newItem.find('.customer ').removeAttr('data-select2-default');


        newItem.find('textarea').val('');

        var currentmaterial = newItem.find('.add-more-material-item_internal');
        currentmaterial.find('.select2-container').remove();
        currentmaterial.find('select.material_category').addClass('autocomplete');
        currentmaterial.find('.material_category').removeAttr('data-select2-default');
        currentmaterial.find('.material_category').empty().trigger('change.select2');

        currentmaterial.find('select.add_more_select_internal').empty().trigger('change.select2');
        currentmaterial.find('.new .select2-container').remove();
        currentmaterial.find('.new select.add_more_select_internal').addClass('autocomplete');
        currentmaterial.find('select.uom').addClass('autocomplete');
        currentmaterial.find('.uom').removeAttr('data-select2-default');
        currentmaterial.find('.uom').empty().trigger('change.select2');

        //currentmaterial.find('.new select.Material_description').empty().trigger('change.select2');
        //currentmaterial.find('.new .select2-container').remove();
        //currentmaterial.find('.new select.Material_description').addClass('autocomplete');
        //currentmaterial.find('input').val("");


        //currentmaterial.find('.new select.packing_type').empty().trigger('change.select2');
        //currentmaterial.find('.new .select2-container').remove();
        //currentmaterial.find('.new select.packing_type').addClass('autocomplete');

        //newItem.find('input').val("");

        newItem.insertAfter(currentItem);
        newItem.find('input.distance_address').attr("readonly", false);;
        newItem.find('input.distance_address').attr("data-val", true);
        newItem.find('input.distance_address').attr("data-val-required", "Please enter Distance between unloading point");



        WebApp.Core.ProcessNames();

        //WebApp.Core.RebindFormValidation();
        _currentMainDiv.find('.initem_item_address_requisition_internal').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);
            $(item).find('.deliveryaddress_subtitle_internal').html('Ship To Location ' + indexvalue);


        });

        newItem.closest('div.add-more-material-item_internal').each(function (index, item) {

            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('div.sl_no_material').html(indexvalue);
            i = parseInt(i) + parseInt(1);
        });

        var _deliveryDateCount = 0;

        $('.add_more_requisition_unloading_internal').each(function (index, item) {

            $(item).find('.initem_item_address_requisition_internal').each(function (index1, item1) {

                if (index == 0) {
                    if (index1 == 0) {
                        var _currentdeliverydate = parseInt(24) + parseInt(12) + parseInt(24);
                        _deliveryDateCount = _currentdeliverydate;
                    } else {
                        _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(6);
                    }
                } else {
                    _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(12);
                }

                var _today = $('input.Today_date').val();

                var datepick = moment(_today, "DD/MM/YYYY hh:mm:ss").add(parseInt(_deliveryDateCount), 'hours').format('DD/MM/YYYY');
                $(item1).find('.delivery_date').val(datepick);

            });

        });

        var _total_deliverypoints = 0;
        var _total_weight = 0;

        $('div.initem_item_address_requisition_internal').each(function (index, item) {
            _total_deliverypoints = parseInt(_total_deliverypoints) + parseInt(1);
        });


        $('.total_deliverypoints_h6').html('Total Ship To Location : ' + _total_deliverypoints);
        //Calculate values
        WebApp.Core.RebindFormValidation();
    });
    //--------------------------------Internal add-more---------------------------------------
    $(document).on('change', '.VehicleType', function () {

        $("select.VehicleSize").empty().trigger('change.select2');
        $("select.Dimension").empty().trigger('change.select2');
        var _capacity = $(this).val();
        if (_capacity != null && _capacity != "") {
            if (_capacity.toLowerCase() == "container" || _capacity.toLowerCase() == "trailer") {
                $('.dimension_div').show();
                $('select.Dimension').attr('data-val', true);
                $('select.Dimension').attr('data-val-required', 'Please select Vehicle Size');
                WebApp.Core.RebindFormValidation();
            } else {
                $('.dimension_div').hide();
                $('select.Dimension').removeAttr('data-val', true);
                $('select.Dimension').removeAttr('data-val-required', 'Please select Vehicle Size');
                WebApp.Core.RebindFormValidation();
            }
        } else {
            $('.dimension_div').hide();
            $('select.Dimension').removeAttr('data-val', true);
            $('select.Dimension').removeAttr('data-val-required', 'Please select Vehicle Size');
            WebApp.Core.RebindFormValidation();
        }

    });
    $(document).on('keyup', 'input.Contract_Transporter_Requested_Quantity', function () {

        var quantity = $(this).val();
        var currentDiv = $(this).closest('div.material_Div');
        var currentMaterialDiv = $(this).closest('div.div-bid-material');
        var _currentRequestQuantity = $(this).closest('div.Material_convert_bid').find('.Bid_DispatchQuantity').val();
        var _vehicleSize = $('select.VehicleSize').val();
        var _total = 0;
        var currenttotal = 0;
        var TotalQuantity = 0;
        var _maerialSum = 0;

        currentMaterialDiv.find('div.Material_convert_bid').each(function (index, item) {
            var _currentvalue = $(item).find('input.Contract_Transporter_Requested_Quantity').val();
            var _currentMaterial = 0
            if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

                _currentMaterial = 0;
            } else {
                _currentMaterial = $(item).find('input.Contract_Transporter_Requested_Quantity').val();
            }

            _maerialSum = parseInt(_maerialSum) + parseInt(_currentMaterial);


        });

        $('.material_Div').find('div.Material_convert_bid').each(function (index, item) {
            var _currentvalue = $(item).find('input.Contract_Transporter_Requested_Quantity').val();
            var currentsum = 0;

            if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

                currentsum = 0;
            } else {
                currentsum = $(item).find('input.Contract_Transporter_Requested_Quantity').val();
            }

            _total = parseInt(_total) + parseInt(currentsum);


        });
        if (parseFloat(quantity) <= parseFloat(_currentRequestQuantity)) {

            $('.TotalQuantity').val(_total);

            $('.total_quantity_h6').html('Total Contract Quantity (MT) : ' + _total);
            currentMaterialDiv.find('.total_quantity_h6_ByRow').html('Total Contract Quantity (MT) : ' + _maerialSum);

            //if (_vehicleSize >= _total) {

            //    $('.TotalQuantity').val(_total);

            //    $('.total_quantity_h6').html('Total Contract Quantity (MT) : ' + _total);
            //    currentMaterialDiv.find('.total_quantity_h6_ByRow').html('Total Contract Quantity (MT) : ' + _maerialSum);

            //} else {

            //    var currentrow = $(this).closest('div.div-bid-material');
            //    currentrow.find('input.Balance_Requested_quantity').val('');

            //    var _previousTotal = parseInt(_total) - parseInt(quantity);
            //    var _previousMaterialTotal = parseInt(_maerialSum) - parseInt(quantity);
            //    $('.total_quantity_h6').html('Total Bid Quantity (MT) : ' + _previousTotal);
            //    currentrow.find('.total_quantity_h6_ByRow').html('Total Contract Quantity (MT) : ' + _previousMaterialTotalBid_DispatchQuantity);
            //    $(this).val('');
            //    WebApp.Notifications.Show("Error", "Total Contract quantity should be less than vehicle size");

            //}
        } else {
            $(this).val('');
            var currentrow = $(this).closest('div.div-bid-material');
            currentrow.find('input.Balance_Requested_quantity').val('');

            var _previousTotal = parseInt(_total) - parseInt(quantity);
            var _previousMaterialTotal = parseInt(_maerialSum) - parseInt(quantity);
            $('.total_quantity_h6').html('Total Bid Quantity (MT) : ' + _previousTotal);
            currentrow.find('.total_quantity_h6_ByRow').html('Total Contract Quantity (MT) : ' + _previousMaterialTotal);
            WebApp.Notifications.Show("Error", "Total Contract quantity should be less than Requested Quantity");
        }

    });

    $(document).on('keyup', 'input.Convert_Bid_Requested_Quantity', function () {

        var quantity = $(this).val();
        if (quantity != null && quantity != undefined) {
            var currentDiv = $(this).closest('div.material_Div');
            var currentMaterialDiv = $(this).closest('div.div-bid-material');
            var _currentRequestQuantity = $(this).closest('div.Material_convert_bid').find('.Bid_DispatchQuantity').val();
            var _vehicleSize = $('select.VehicleSize').val();
            var _total = 0;
            var currenttotal = 0;
            var TotalQuantity = 0;
            var _maerialSum = 0;

            currentMaterialDiv.find('div.Material_convert_bid').each(function (index, item) {
                var _currentvalue = $(item).find('input.Convert_Bid_Requested_Quantity').val();
                var _currentMaterial = 0
                if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

                    _currentMaterial = 0;
                } else {
                    _currentMaterial = $(item).find('input.Convert_Bid_Requested_Quantity').val();
                }

                _maerialSum = parseInt(_maerialSum) + parseInt(_currentMaterial);


            });

            $('.material_Div').find('div.Material_convert_bid').each(function (index, item) {
                var _currentvalue = $(item).find('input.Convert_Bid_Requested_Quantity').val();
                var currentsum = 0;

                if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

                    currentsum = 0;
                } else {
                    currentsum = $(item).find('input.Convert_Bid_Requested_Quantity').val();
                }

                _total = parseInt(_total) + parseInt(currentsum);

            });
            $('.TotalQuantity').val(_total);
            if (parseFloat(quantity) <= parseFloat(_currentRequestQuantity)) {


                if (_vehicleSize >= _total) {
                    var totalquantity = $('.TotalQuantity').val();


                    $('.total_quantity_h6').html('Total Bid Quantity (MT) : ' + _total);
                    var currentrow = $(this).closest('div.div-bid-material');
                    var _currentquantity = $(this).val();

                    if (_currentquantity != "" && _currentquantity != NaN && _currentquantity != undefined) {
                        var _totalQunatity = currentrow.find('input.Bid_DispatchQuantity').val();
                        var _balancequantity = parseInt(_totalQunatity) - parseInt(_currentquantity);
                        currentrow.find('.total_quantity_h6_ByRow').html('Total Bid Quantity (MT) : ' + _maerialSum);

                        currentrow.find('input.Convert_Bid_Requested_Quantity').val();

                    }
                } else {

                    var currentrow = $(this).closest('div.div-bid-material');
                    currentrow.find('input.Balance_Requested_quantity').val('');

                    var _previousTotal = parseInt(_total) - parseInt(quantity);
                    var _previousMaterialTotal = parseInt(_maerialSum) - parseInt(quantity);
                    $('.total_quantity_h6').html('Total Bid Quantity (MT) : ' + _previousTotal);

                    currentrow.find('.total_quantity_h6_ByRow').html('Total Bid Quantity (MT) : ' + _previousMaterialTotal);
                    $(this).val('');
                    WebApp.Notifications.Show("Error", "Total Bid quantity should be less than vehicle size");

                }
            } else {
                $(this).val('');
                var currentrow = $(this).closest('div.div-bid-material');
                currentrow.find('input.Balance_Requested_quantity').val('');

                var _previousTotal = parseInt(_total) - parseInt(quantity);
                var _previousMaterialTotal = parseInt(_maerialSum) - parseInt(quantity);
                $('.total_quantity_h6').html('Total Bid Quantity (MT) : ' + _previousTotal);
                $('.TotalQuantity').val(_previousTotal);
                currentrow.find('.total_quantity_h6_ByRow').html('Total Bid Quantity (MT) : ' + _previousMaterialTotal);
                WebApp.Notifications.Show("Error", "Total Bid quantity should be less than Requested Quantity");
            }
        }

    });

    $(document).on('keyup', 'input.lod_bidquantity', function () {

        var quantity = $(this).val();
        var _maerialSum = 0;
        var vehiclesize = $('.VehicleSize').val();
        var countt = 0;
        var currentMaterialDiv = $(this).closest('div.unloadingPointdiv');
        if (quantity != null && quantity != undefined) {
            currentMaterialDiv.find('div.div-bid-material table.tablecontract tr').each(function (index, item) {
                countt = parseInt(countt) + 1;
                var _currentvalue = $(item).find('td.contracttd input.lod_bidquantity').val();
                var _dispatchvalue = $(item).find('td.contracttd input.requestedQuantity').val();

                if (parseFloat(_currentvalue) > parseFloat(_dispatchvalue)) {
                    WebApp.Notifications.Show('Info', 'Total Bid quantity should be less than Requested Quantity ');
                    $(item).find('td.contracttd input.lod_bidquantity').val("");
                } else {

                    var _currentMaterial = 0
                    if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

                        _currentMaterial = 0;
                    } else {
                        _currentMaterial = $(item).find('td.contracttd input.lod_bidquantity').val();

                    }

                    //if (parseFloat(_currentMaterial) > parseFloat(vehiclesize)) {
                    //    WebApp.Notifications.Show('Info', 'Total Bid quantity should be less than Vehicle Capacity ');
                    //    $(item).find('td.contracttd input.lod_bidquantity').val("");
                    //    $(item).find('td.contracttd input.lod_bidquantity').trigger('keyup');
                    //}

                    _maerialSum = parseFloat(_maerialSum) + parseFloat(_currentMaterial);


                }



            });
            if (countt == 1) {
                if (parseInt(quantity) == 0) {
                    $(this).val("");
                }
            }
            var _sum = _maerialSum.toString().indexOf(".00") ? parseInt(_maerialSum) : _maerialSum;


            $('.totalquantity').val(_maerialSum);
            $('.total_Dispatch_quantity_h6').html('Total Bid Quantity (MT) : ' + _maerialSum);
        }

    });
    $(document).on('keyup', 'input.lod_bidquantity_contract', function () {

        var quantity = $(this).val();
        var _maerialSum = 0;
        var vehiclesize = $('.VehicleSize').val();
        var i = 0;
        var currentMaterialDiv = $(this).closest('div.unloadingPointdiv');
        var lendiv = currentMaterialDiv.find('div.div-bid-material table.tablecontract tbody tr').length;

        if (quantity != null && quantity != undefined) {
            currentMaterialDiv.find('div.div-bid-material table.tablecontract tbody tr').each(function (index, item) {

                //if (parseInt(i) == 0 && parseInt(lendiv) == 1) {
                //    //if (parseFloat(quantity )== 0) {
                //    //    $(item).find('td.contracttd input.lod_bidquantity_contract').val("");
                //    //}

                //}
                var _currentvalue = $(item).find('td.contracttd input.lod_bidquantity_contract').val();
                var _dispatchvalue = $(item).find('td.contracttd input.requestedQuantity').val();
                if (parseFloat(_currentvalue) > parseFloat(_dispatchvalue)) {
                    WebApp.Notifications.Show('Info', 'Total Contract quantity should be less than Requested Quantity ');
                    $(item).find('td.contracttd input.lod_bidquantity_contract').val("");
                } else {

                    var _currentMaterial = 0
                    if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

                        _currentMaterial = 0;
                    } else {
                        _currentMaterial = $(item).find('td.contracttd input.lod_bidquantity_contract').val();

                    }
                    //if (parseFloat(_currentMaterial) > parseFloat(vehiclesize)) {
                    //    WebApp.Notifications.Show('Info', 'Total Contract quantity should be less than Vehicle Capacity ');
                    //    $(item).find('td.contracttd input.lod_bidquantity_contract').val("");
                    //    $(item).find('td.contracttd input.lod_bidquantity_contract').trigger('keyup');

                    //}
                    _maerialSum = parseFloat(_maerialSum) + parseFloat(_currentMaterial);
                    i = i + 1;
                }



            });
            $('.totalquantity').val(_maerialSum);
            var _sum = _maerialSum.toString().indexOf(".00") ? parseInt(_maerialSum) : _maerialSum;
            $('.total_ContractDispatch_quantity_h6').html('Total Contract Quantity (MT) : ' + _maerialSum);
        }

    });



    $(document).on('change', 'input.Requested_quantity', function () {
        var currentval = $(this).val();
        if (currentval != null && currentval == 0) {
            $('input.Requested_quantity').val("");
        }

    });

    $(document).on('keyup', 'input.Requested_quantity', function () {
        var currentDiv = $(this).closest('div.addressdiv');

        var _total = 0;
        var currenttotal = 0;

        currentDiv.find('div.add-more-material-item').each(function (index, item) {


            var _currentvalue = $(item).find('input.Requested_quantity').val();


            if (_currentvalue == "") {

                currenttotal = 0;
            } else {
                currenttotal = $(item).find('input.Requested_quantity').val();
            }
            _total = parseInt(_total) + parseInt(currenttotal);

            var total = $('input.TotalQuantity').val(_total);


        });
        var _sum = _total.toString().indexOf(".00") ? parseInt(_total) : _total;

        $('.total_quantity_h6').html('Total Requested Quantity (MT) : ' + _sum);
    });



    $(document).on('keyup', 'input.weight', function () {
        var currentDiv = $(this).closest('div.addressdiv');

        var _total = 0;
        var currenttotal = 0;

        currentDiv.find('div.add-more-material-item').each(function (index, item) {


            var _currentvalue = $(item).find('input.weight').val();

            if (_currentvalue == "") {

                currenttotal = 0;
            } else {
                currenttotal = $(item).find('input.weight').val();
            }
            _total = parseInt(_total) + parseInt(currenttotal);



        });

        $('.total_weight_h6').html('Total Weight (MT) : ' + _total.toFixed(2));
    });

    $(document).on('keyup', 'input.Distance', function () {
        var currentDiv = $(this).closest('div.addressdiv');

        var _total = 0;
        var currenttotal = 0;

        $('div.add_more_requisition_unloading').each(function (index, item) {


            var _currentvalue = $(item).find('input.Distance').val();

            if (_currentvalue == "" || _currentvalue == NaN || _currentvalue == undefined || _currentvalue == null) {

                currenttotal = 0;
            } else {
                currenttotal = $(item).find('input.Distance').val();
            }
            _total = parseInt(_total) + parseInt(currenttotal);



        });

        $('.total_distance_h6').html('Total Distance (MT) : ' + _total);
    });
    $(document).on('click', '.downloadGateInDocuments', function () {

        var file = $(this).attr('data-file');
        var type = $(this).attr('data-type');


        if (file != "") {
            var _lang = $('input.documentlang').val();

            window.location.href = '/transports/downloadfile?filename=' + file + "&type=" + type;


        }
    });
    $(document).on('click', '.downloadinvoice', function () {

        var file = $(this).attr('data-file');
        var type = $(this).attr('data-type');


        if (file != "") {
            var _lang = $('input.documentlang').val();

            window.location.href = '/Secondary/TransporterInvoice/downloadfile?filename=' + file;


        }
    });
    $(document).on('click', '.remove-unloadingPoinDiv', function () {
        if ($('.Main_unloadingDiv').length > 1) {

            var _maerialSum = 0;
            $(this).closest('div.div-bid-material').remove();
            $('div.div-bid-material').find('div.Material_convert_bid').each(function (index, item) {
                var _currentvalue = $(item).find('input.Dispatch').val();

                var _currentMaterial = 0
                if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

                    _currentMaterial = 0;
                } else {
                    _currentMaterial = $(item).find('input.Dispatch').val();

                }

                _maerialSum = parseInt(_maerialSum) + parseInt(_currentMaterial);

            });
            ////debugger;;
            var currentdiv = $('div.Main_Model');

            var divappend = '<div class="col-md-12 border-bottom my-3"></div><div class="row RequisitionDiv"><div class="col-md-12"><div class="d-flex justify-content-between"><a class="green-btn clubanotherRequest" href="javascript:void(0);"><i class="mdi mdi-plus mr-1"></i>Club another Requisition</a><h6 class="m-0 total_Dispatch_quantity_h6 mr-3" style="font-weight: bold!important; ">Total Requested Quantity (MT):' + _maerialSum + ' </h6></div></div><div>';
            currentdiv.append(divappend);

            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }

    });




    $(document).on('click', '.remove-unloadingPoinDivLoad', function () {
        if ($('.SubDivUnloading').length > 1) {
            //debugger;
            var _maerialSum = 0;
            $(this).closest('div.div-bid-material').remove();
            $('div.div-bid-material').find('div.Material_convert_bid').each(function (index, item) {
                var _currentvalue = $(item).find('input.Dispatch').val();

                var _currentMaterial = 0
                if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

                    _currentMaterial = 0;
                } else {
                    _currentMaterial = $(item).find('input.Dispatch').val();

                }

                _maerialSum = parseInt(_maerialSum) + parseInt(_currentMaterial);

            });
            ////debugger;;
            var currentdiv = $('div.Main_Model');

            var divappend = '<div class="col-md-12 border-bottom my-3"></div><div class="row"><div class="col-md-12"><div class="d-flex justify-content-between"><a class="green-btn clubanotherRequest" href="javascript:void(0);"><i class="mdi mdi-plus mr-1"></i>Club another Requisition</a><h6 class="m-0 total_Dispatch_quantity_h6 mr-3" style="font-weight: bold!important; ">Total Requested Quantity (MT):' + _maerialSum + ' </h6></div></div><div>';
            currentdiv.append(divappend);


        } else {
            alert('At least one item is required.');
        }

    });


    $(document).on('click', '.remove-form-element-here', function () {
        var _total = 0;
        var currenttotal = 0;
        if ($('.Visit').length > 1) {
            $(this).closest('div.Visit').remove();
            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }
        $('div.div-add-more-main').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('.sl_no_material').html(indexvalue);
            var _currentvalue = $(item).find('input.Requested_quantity').val();
            if (_currentvalue == "") {
                currenttotal = 0;
            } else {
                currenttotal = $(item).find('input.Requested_quantity').val();
            }
            _total = parseInt(_total) + parseInt(currenttotal);
            var total = $('input.TotalQuantity').val(_total);
        });
        $('.total_quantity_h6').html('Total Requested Quantity (MT) : ' + _total);
    });


    $(document).on('click', '.remove-form-elem', function () {



        var currentdiv = $(this).closest('.material_Div_dat');
        var _total = 0;
        var currenttotal = 0;
        if (currentdiv.find('.add-more-material-item').length > 1) {
            $(this).closest('.add-more-material-item').remove();

            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }
        $('.div-add-more-main').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('.sl_no_material').html(indexvalue);
            var _currentvalue = $(item).find('input.Requested_quantity').val();

            if (_currentvalue == "") {
                currenttotal = 0;
            } else {
                currenttotal = $(item).find('input.Requested_quantity').val();
            }
            _total = parseInt(_total) + parseInt(currenttotal);
            var total = $('input.TotalQuantity').val(_total);


        });
        $('.total_quantity_h6').html('Total Requested Quantity (MT) : ' + _total);
    });
    $(document).on('change summernote.change', 'input,select,textarea', function () {
        if ($(this).is('[data-val="true"]')) {
            $(this).valid();
        }
    });

    $(document).on('click', '.remove-form-elem_internal', function () {



        var currentdiv = $(this).closest('.material_Div_dat_internal');
        var _total = 0;
        var currenttotal = 0;
        ////debugger;;
        if (currentdiv.find('.div-add-more-main_internal').length > 1) {
            $(this).closest('.add-more-material-item_internal').remove();

            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }
        $('.div-add-more-main_internal').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('.sl_no_material').html(indexvalue);
            var _currentvalue = $(item).find('input.Requested_quantity').val();

            if (_currentvalue == "") {
                currenttotal = 0;
            } else {
                currenttotal = $(item).find('input.Requested_quantity').val();
            }
            _total = parseInt(_total) + parseInt(currenttotal);
            var total = $('input.TotalQuantity').val(_total);


        });
        $('.total_quantity_h6').html('Total Requested Quantity (MT) : ' + _total);
    });




    $(document).on('click', '.add-more-indentrequest', function (index) {
        var currentItem = $(this).closest('div.Request');
        var newItem = currentItem.clone(false, false);
        newItem.find('.Select_Material_Name').empty().trigger('change.select2');
        newItem.find('.select2-container').remove();
        newItem.find('select.Select_Material_Name').addClass('autocomplete');
        newItem.find('.MatCode').val('');
        newItem.find('.MatQtyMT').val('');
        newItem.find('.MatQtyBags').val('');

        newItem.insertAfter(currentItem);
        WebApp.Core.ProcessNames();


        WebApp.Core.RebindFormValidation();

        //Calculate values
        //****************From here****************
        var _total_qty_MT = 0;
        var _total_qty_Bags = 0;

        $('div.div-add-more-main').each(function (index, item) {
            _total_qty_MT = parseInt(_total_qty_MT) + parseInt(1);
            _total_qty_Bags = parseInt(_total_qty_Bags) + parseInt(1);

            var qtyMT = $(item).find('input.MatQtyMT').val();
            if (qtyMT == null || qtyMT == "") {
                qtyMT = 0;
            }
            _total_qty_MT = parseFloat(_total_qty_MT) + parseFloat(qtyMT);

            var qtyBags = $(item).find('input.MatQtyBags').val();
            if (qtyBags == null || qtyBags == "") {
                qtyBags = 0;
            }
            _total_qty_Bags = parseFloat(_total_qty_Bags) + parseFloat(qtyBags);
        });

        $('.total_qty_MT_h6').html('Total STO Quantity (MT) : ' + _total_qty_MT);
        $('.total_qty_Bags_h6').html('Total STO Quantity (Bags) : ' + _total_qty_Bags);

        //****************To here****************


    });

    $(document).on('click', '.add-more-address_item_requisition', function (index) {

        var currentItem = $(this).closest('.add_more_requisition_unloading').find('.initem_item_address_requisition:last');
        var _currentMainDiv = $(this).closest('.add_more_requisition_unloading');
        var newItem = currentItem.clone(false, false);

        var _loggeduser = $('.LoggedUserName').val();
        var _loggedPhone = $('.LoggedUserPhone').val();
        newItem.find('.material_div_new .mytable tbody tr:not(:first)').remove();

        newItem.find('.distance').show();
        newItem.find('.displaydistance').hide();
        newItem.find('input textarea').val('');
        newItem.find('.removed_value').val('');
        newItem.find('input').not('input.vehicledistance').val('');
        newItem.find('.shippingAddress_ID').val('');
        newItem.find('.shippingAddress_ID').val(0);

        newItem.find('.customer').empty().trigger('change.select2');
        newItem.find('.warehouse').empty().trigger('change.select2');
        var currentadress = newItem.find('.initem_item_address_requisition');
        newItem.find('div.close-btn').attr('style', 'display:none');

        newItem.find('.select2-container').remove();
        newItem.find('select.customer').addClass('autocomplete');
        newItem.find('select.warehouse').addClass('autocomplete');

        newItem.find('select.add_more_select').addClass('autocomplete');
        newItem.find('select.add_more_select').empty().trigger('change.select2');
        newItem.find('.add_more_select').removeAttr('data-select2-default');
        newItem.find('.customer ').removeAttr('data-select2-default');


        newItem.find('textarea').val('');

        var currentmaterial = newItem.find('.add-more-material-item');
        currentmaterial.find('select.Material_description').empty().trigger('change.select2');
        currentmaterial.find('.select2-container').remove();
        currentmaterial.find('select.Material_description').addClass('autocomplete');
        currentmaterial.find('select.Material_description').removeAttr('data-select2-default');
        currentmaterial.find('input').val("");
        currentmaterial.find('div.close-btn').attr('style', 'display:none');


        currentmaterial.find('select.packing_type').empty().trigger('change.select2');
        currentmaterial.find('.select2-container').remove();
        currentmaterial.find('select.packing_type').addClass('autocomplete');
        currentmaterial.find('select.packing_type').removeAttr('data-select2-default');
        newItem.find('input').val("");

        newItem.find('.contact_person_name').val(_loggeduser);
        newItem.find('.mobilenumber').val(_loggedPhone);

        newItem.insertAfter(currentItem);
        newItem.find('input.distance_address').attr("readonly", false);;
        newItem.find('input.distance_address').attr("data-val", true);
        newItem.find('input.distance_address').attr("data-val-required", "Please enter Distance between unloading point");



        WebApp.Core.ProcessNames();

        WebApp.Core.RebindFormValidation();
        var _supplycontractcondition = $('.SupplyContractCondition').val();
        _currentMainDiv.find('.initem_item_address_requisition').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);
            var _unloadingarea = $(item).find('.currentUnloading').val();
            if (_unloadingarea != null && _unloadingarea != "") {
                $(item).find('.new_unloading_point_label').html('Unloading Point ' + indexvalue);
                $(item).find('.deliveryaddress_subtitle').html(_unloadingarea);

            } else {
                $(item).find('.deliveryaddress_subtitle').html('Unloading Point ' + indexvalue);
                $(item).find('.new_unloading_point_label').html('Unloading Point ');
            }

            if (_supplycontractcondition != null && _supplycontractcondition != "") {
                if (_supplycontractcondition == "FOB" || _supplycontractcondition == "CIF") {
                    $('.export_address').html('Ship to Port Address');
                }
                else if ((_supplycontractcondition == "Door Delivery")) {
                    $('.export_address').html('Ship to Address');
                }
                else {
                    $('.export_address').html('Address');
                }
            }
            else {
                $('.export_address').html('Address');
            }

        });

        newItem.closest('div.add-more-material-item').each(function (index, item) {

            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('div.sl_no_material').html(indexvalue);
            i = parseInt(i) + parseInt(1);
        });

        var _deliveryDateCount = 0;

        //$('.add_more_requisition_unloading').each(function (index, item) {

        //    $(item).find('.initem_item_address_requisition').each(function (index1, item1) {

        //        if (index == 0) {
        //            if (index1 == 0) {
        //                var _currentdeliverydate = parseInt(24) + parseInt(12) + parseInt(24);
        //                _deliveryDateCount = _currentdeliverydate;
        //            }
        //            else {
        //                _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(6);
        //            }
        //        }
        //        else {
        //            _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(12);
        //        }

        //        var _today = $('input.Today_date').val();

        //        var datepick = moment(_today, "DD/MM/YYYY hh:mm:ss").add(parseInt(_deliveryDateCount), 'hours').format('DD/MM/YYYY');
        //        $(item1).find('.delivery_date').val(datepick);

        //    });

        //});
        var _new = 0;
        $('.add_more_requisition_unloading').each(function (index, item) {
            var currentunloading = $(item).closest('.add_more_unloading_data');
            var _firstStation = 0;
            var loadingPoint1 = $('.ShipFromAddress').val();
            var unloadingarea = $(item).find('.unloading_point').val();

            $.get("/logisticsvehiclerequisitions/findstattype", { unloadingarea: unloadingarea, loadingPoint: loadingPoint1 }, function (data) {
                if (data.status == true) {
                    if (data.type == "Intra") {
                        _firstStation = 24;
                        $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                            if (index == 0) {
                                if (index1 == 0) {
                                    var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                    _new = _currentdeliverydate;
                                } else {
                                    _new = parseInt(_new) + parseInt(6);
                                }
                            } else {
                                _new = parseInt(_new) + parseInt(12);
                            }

                            var loading = $('.ExpectedLoadingDate').val();

                            var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                            $(item1).find('.delivery_date').val(datepick);

                        });
                    } else {
                        _firstStation = 36;
                        $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                            if (index == 0) {
                                if (index1 == 0) {
                                    var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                    _new = _currentdeliverydate;
                                } else {
                                    _new = parseInt(_new) + parseInt(6);
                                }
                            } else {
                                _new = parseInt(_new) + parseInt(12);
                            }

                            var loading = $('.ExpectedLoadingDate').val();

                            var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                            $(item1).find('.delivery_date').val(datepick);

                        });
                    }

                } else {
                    _firstStation = 24;
                    $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                        if (index == 0) {
                            if (index1 == 0) {
                                var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                _new = _currentdeliverydate;
                            } else {
                                _new = parseInt(_new) + parseInt(6);
                            }
                        } else {
                            _new = parseInt(_new) + parseInt(12);
                        }

                        var loading = $('.ExpectedLoadingDate').val();

                        var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                        $(item1).find('.delivery_date').val(datepick);

                    });
                }

            });



        });

        var _total_deliverypoints = 0;
        var _total_weight = 0;

        $('div.initem_item_address_requisition').each(function (index, item) {
            _total_deliverypoints = parseInt(_total_deliverypoints) + parseInt(1);
        });


        $('.total_deliverypoints_h6').html('Total Unloading Points: ' + _total_deliverypoints);
        //Calculate values
    });
    $(document).on('click', '.remove-address_initem_item', function () {
        var _deliveryDateCount = 0;

        $('.add_more_requisition_unloading').each(function (index, item) {
            $(item).find('.unloadingpoint_main_title').html('Delivery Station ' + indexvalue);
            $(item).find('.initem_item_address_requisition').each(function (index1, item1) {

                if (index == 0) {
                    if (index1 == 0) {
                        var _currentdeliverydate = parseInt(24) + parseInt(12) + parseInt(24);
                        _deliveryDateCount = _currentdeliverydate;
                    } else {
                        _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(6);
                    }
                } else {
                    _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(12);
                }

                var _today = $('input.Today_date').val();

                var datepick = moment(_today, "DD/MM/YYYY hh:mm:ss").add(parseInt(_deliveryDateCount), 'hours').format('DD/MM/YYYY');


                $(item1).find('.delivery_date').val(datepick);

            });

        });
    });
    $(document).on('click', '.remove-address_initem_item', function () {

        var currentItem = $(this).closest('div.initem_item_address_requisition');

        if ($('div.initem_item_address_requisition').length > 1) {
            $(this).closest('div.initem_item').remove();
            $(this).closest('input.distance_address').removeAttr("data-val", true);
            $(this).closest('input.distance_address').removeAttr("data-val-required", "Please enter Distance between unloading point");

            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }

        $('div.initem_item_address_requisition').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('div.address_sl_no').html(indexvalue);

        });

        //$('.add_more_requisition_unloading').each(function (index, item) {

        //    $(item).find('.initem_item_address_requisition').each(function (index1, item1) {

        //        if (index == 0) {
        //            if (index1 == 0) {
        //                var _currentdeliverydate = parseInt(24) + parseInt(12) + parseInt(24);
        //                _deliveryDateCount = _currentdeliverydate;
        //            }
        //            else {
        //                _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(6);
        //            }
        //        }
        //        else {
        //            _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(12);
        //        }

        //        var _today = $('input.Today_date').val();

        //        var datepick = moment(_today, "DD/MM/YYYY hh:mm:ss").add(parseInt(_deliveryDateCount), 'hours').format('DD/MM/YYYY');


        //        $(item1).find('.delivery_date').val(datepick);

        //    });

        //});


        var _new = 0;
        $('.add_more_requisition_unloading').each(function (index, item) {
            var currentunloading = $(item).closest('.add_more_unloading_data');
            var _firstStation = 0;
            var loadingPoint1 = $('.ShipFromAddress').val();
            var unloadingarea = $(item).find('.unloading_point').val();

            $.get("/logisticsvehiclerequisitions/findstattype", { unloadingarea: unloadingarea, loadingPoint: loadingPoint1 }, function (data) {
                if (data.status == true) {
                    if (data.type == "Intra") {
                        _firstStation = 24;
                        $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                            if (index == 0) {
                                if (index1 == 0) {
                                    var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                    _new = _currentdeliverydate;
                                } else {
                                    _new = parseInt(_new) + parseInt(6);
                                }
                            } else {
                                _new = parseInt(_new) + parseInt(12);
                            }

                            var loading = $('.ExpectedLoadingDate').val();

                            var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                            $(item1).find('.delivery_date').val(datepick);

                        });
                    } else {
                        _firstStation = 36;
                        $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                            if (index == 0) {
                                if (index1 == 0) {
                                    var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                    _new = _currentdeliverydate;
                                } else {
                                    _new = parseInt(_new) + parseInt(6);
                                }
                            } else {
                                _new = parseInt(_new) + parseInt(12);
                            }

                            var loading = $('.ExpectedLoadingDate').val();

                            var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                            $(item1).find('.delivery_date').val(datepick);

                        });
                    }

                } else {
                    _firstStation = 24;
                    $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                        if (index == 0) {
                            if (index1 == 0) {
                                var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                                _new = _currentdeliverydate;
                            } else {
                                _new = parseInt(_new) + parseInt(6);
                            }
                        } else {
                            _new = parseInt(_new) + parseInt(12);
                        }

                        var loading = $('.ExpectedLoadingDate').val();

                        var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                        $(item1).find('.delivery_date').val(datepick);

                    });
                }

            });



        });


    });


    $(document).on('click', '.add-more-unloading_item_requisition', function (index) {
        ////debugger;;
        var currentItem = $(this).closest('div.requisition_Main_Div').find('.add_more_requisition_unloading:last');
        var newItem = currentItem.clone(false, false);
        var _loggeduser = $('.LoggedUserName').val();
        var _loggedPhone = $('.LoggedUserPhone').val();
        newItem.find('.distance').show();
        newItem.find('.displaydistance').hide();
        newItem.find('input textarea').val('');
        newItem.find('.removed_value').val('');
        newItem.find('input').not('input.vehicledistance').val('');
        newItem.find('.shippingAddress_ID').val('');
        newItem.find('select.loading_point').empty().trigger('change.select2');
        newItem.find('.loading_point').removeAttr('data-select2-default');
        newItem.find('.material_div_new .mytable tbody tr:not(:first)').remove();
        newItem.find('div.initem_item_address_requisition :not(:first)').remove();
        newItem.find('.shippingAddress_ID').val(0);

        newItem.find('textarea').val('');

        newItem.find('.select2-container').remove();
        newItem.find('select.add_more_select').empty().trigger('change.select2');
        newItem.find('select.add_more_select').addClass('autocomplete');
        newItem.find('.add_more_select').removeAttr('data-select2-default');
        newItem.find('select.loading_point').empty().trigger('change.select2');
        newItem.find('div.close-btn').attr('style', 'display:none');

        newItem.find('select.loading_point').addClass('autocomplete');
        newItem.find('.contact_person_name').val(_loggeduser);
        newItem.find('.mobilenumber').val(_loggedPhone);
        var currentmaterial = newItem.find('.add-more-material-item');
        //newItem.find('.select2-container').remove();
        //newItem.find('select.Material_description').addClass('autocomplete');
        //newItem.find('.Material_description').removeAttr('data-select2-default');
        //newItem.find('.Material_description').empty().trigger('change.select2');

        currentmaterial.find('.select2-container').remove();
        currentmaterial.find('select.Material_description').addClass('autocomplete');
        currentmaterial.find('.Material_description').removeAttr('data-select2-default');
        currentmaterial.find('select.Material_description').empty().trigger('change.select2');

        currentmaterial.find('div.close-btn').attr('style', 'display:none');


        currentmaterial.find('input').val("");
        currentmaterial.find('select.packing_type').empty().trigger('change.select2');
        currentmaterial.find('select.packing_type').addClass('autocomplete');
        currentmaterial.find('.packing_type').removeAttr('data-select2-default');

        newItem.find('.select2-container').remove();
        newItem.find('select').empty().trigger('change.select2');
        newItem.find('select').addClass('autocomplete');
        newItem.find('select').val('');
        newItem.insertAfter(currentItem);

        WebApp.Core.ProcessNames();

        WebApp.Core.RebindFormValidation();
        var _supplycontractcondition = $('.SupplyContractCondition').val();
        newItem.find('.initem_item_address_requisition').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);
            $(item).find('.deliveryaddress_subtitle').html('Unloading Point ' + indexvalue);
            $(item).find('.new_unloading_point_label').html('Unloading Point ');

            if (_supplycontractcondition != null && _supplycontractcondition != "") {
                if (_supplycontractcondition == "FOB" || _supplycontractcondition == "CIF") {
                    $('.export_address').html('Ship to Port Address');
                }
                else if ((_supplycontractcondition == "Door Delivery")) {
                    $('.export_address').html('Ship to Address');
                }
                else {
                    $('.export_address').html('Address');
                }
            }
            else {
                $('.export_address').html('Address');
            }
        });


        var _total_deliverypoints = 0;
        var _total_unloadingpoints = 0;
        var _total_weight = 0;
        var _total_distance = 0;
        var _indexcount = 0;
        var _deliveryDateCount = 0;
        $('div.add_more_requisition_unloading').each(function (index, item) {
            var _total_index = parseInt(_indexcount) + parseInt(1);

            var _unloadingarea = $(item).find('.loading_point').val();

            if (_unloadingarea != null && _unloadingarea != "") {

                $(item).find('.unloadingpoint_main_title').html(_unloadingarea);
                $(item).find('.increment_station_details').html(_unloadingarea + ' Details');
            } else {
                $(item).find('.unloadingpoint_main_title').html('Delivery Station ' + _total_index);
                $(item).find('.increment_station_details').html('Delivery Station #' + _total_index + ' Details');
            }


            $(item).find('.unloadingpoint_main_title').removeAttr('data-target');
            $(item).find('.unloadingpoint_main_title').removeAttr('aria-controls');
            var _attr = "#collapse" + _total_index;
            $(item).find('.unloadingpoint_main_title').attr('data-target', _attr);
            $(item).find('.unloadingpoint_main_title').attr('aria-controls', _attr);


            $(item).find('.station_div').removeAttr('id');
            var _attr1 = "collapse" + _total_index;
            $(item).find('.station_div').attr('id', _attr1);

            _indexcount = parseInt(_indexcount) + parseInt(1);
            _total_unloadingpoints = parseInt(_total_unloadingpoints) + parseInt(1);
            var currentdistance = $(item).find('input.Distance').val();
            _total_distance = parseFloat(_total_distance) + parseFloat(currentdistance);

        });

        $('.initem_item_address_requisition').each(function (index, item) {

            _total_deliverypoints = parseInt(_total_deliverypoints) + parseInt(1);
        });


        $('.total_unloadingpoint_h6').html('Total Delivery Stations: ' + _total_unloadingpoints);


        $('.total_deliverypoints_h6').html('Total Unloading Points: ' + _total_deliverypoints);


    });
    $(document).on('change', '.currentUnloading', function () {

        var currentItem = $(this).closest('div.add_more_requisition_unloading');
        var _unloadingArea = $(this).val();
        currentItem.find('.initem_item_address_requisition').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);
            var _unloadingarea = $(item).find('.currentUnloading').val();
            if (_unloadingarea != null && _unloadingarea != "") {
                $(item).find('.deliveryaddress_subtitle').html(_unloadingarea);
                $(item).find('.new_unloading_point_label').html('Unloading Point ' + indexvalue);
            } else {
                $(item).find('.deliveryaddress_subtitle').html('Unloading Point ' + indexvalue);
                $(item).find('.new_unloading_point_label').html('Unloading Point ');
            }
        });

        //if (_unloadingArea != null && _unloadingArea != "") {
        //    var _index = $(this).closest('.initem_item_address_requisition').find('.deliveryaddress_subtitle').index();
        //    var _total = parseInt(_index) + parseInt(1);
        //    //$(this).closest('.deliveryaddress_subtitle').html(_unloadingArea);
        //    var _newitem = $(this).closest('.initem_item_address_requisition').find('.deliveryaddress_subtitle').html();
        //    $(this).closest('.initem_item_address_requisition').find('.deliveryaddress_subtitle').html(_unloadingArea);

        //    $(this).closest('.initem_item_address_requisition').find('.new_unloading_point_label').html(_newitem);
        //}
    });
    //****************To here****************

    //debugger;
    $(document).on('click', '.remove-unloading_initem_item_requisition', function () {

        var currentItem = $(this).closest('div.add_more_requisition_unloading');

        if ($('div.add_more_requisition_unloading').length > 1) {
            $(this).closest('div.add_more_requisition_unloading').remove();

            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }

        $('div.initem_item_address_requisition').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('div.address_sl_no').html(indexvalue);
        });

        //Calculate values
        //****************From here****************
        var _total_deliverypoints = 0;
        var _total_unloadingpoints = 0;
        var _total_weight = 0;
        var _total_distance = 0;
        var _indexcount = 0;
        $('.add_more_requisition_unloading').each(function (index, item) {
            var _total_index = parseInt(_indexcount) + parseInt(1);
            _indexcount = parseInt(_indexcount) + parseInt(1);
            var _unloadingarea = $(item).find('.loading_point').val();

            if (_unloadingarea != null && _unloadingarea != "") {

                $(item).find('.unloadingpoint_main_title').html(_unloadingarea);
                $(item).find('.increment_station_details').html(_unloadingarea + ' Details');
            } else {
                $(item).find('.unloadingpoint_main_title').html('Delivery Station ' + _total_index);
                $(item).find('.increment_station_details').html('Delivery Station #' + _total_index + ' Details');
            }


            _total_unloadingpoints = parseInt(_total_unloadingpoints) + parseInt(1);

            var currentdistance = $(item).find('input.Distance').val();
            _total_distance = parseFloat(_total_distance) + parseFloat(currentdistance);
        });
        $('.initem_item_address_requisition').each(function (index, item) {
            _total_deliverypoints = parseInt(_total_deliverypoints) + parseInt(1);
        });
        $('.add-more-material-item').each(function (index, item) {
            currentweight = $(item).find('input.weight').val();
            _total_weight = parseFloat(_total_weight) + parseFloat(currentweight);
        });

        if (parseFloat(_total_weight) > 0) {
        }
        else {
            _total_weight = 0;
        }
        if (parseFloat(_total_distance) < 0) { } else {
            _total_distance = 0;
        }
        $('.total_unloadingpoint_h6').html('Total Delivery Stations: ' + _total_unloadingpoints);


        $('.total_deliverypoints_h6').html('Total Unloading Points: ' + _total_deliverypoints);

        $('.total_weight_h6').html('Total Weight (MT): ' + _total_weight.toFixed(2));



        //****************To here****************
    });

    $(document).on('click', '.remove-address_initem_item_requisition', function () {

        var currentItem = $(this).closest('div.add_more_requisition_unloading');

        if (currentItem.find('div.initem_item_address_requisition').length > 1) {
            $(this).closest('div.initem_item_address_requisition').remove();
            $(this).closest('input.distance_address').removeAttr("data-val", true);
            $(this).closest('input.distance_address').removeAttr("data-val-required", "Please enter Distance between unloading point");

            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }

        $('div.initem_item').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('div.address_sl_no').html(indexvalue);

        });

        var _total_deliverypoints = 0;
        var _total_unloadingpoints = 0;
        var _total_weight = 0;
        var _total_distance = 0;

        $('.add_more_requisition_unloading').each(function (index, item) {
            _total_unloadingpoints = parseInt(_total_unloadingpoints) + parseInt(1);
            currentdistance = $(item).find('input.Distance').val();
            _total_distance = parseFloat(_total_distance) + parseFloat(currentdistance);
        });
        $('.initem_item_address_requisition').each(function (index, item) {
            _total_deliverypoints = parseInt(_total_deliverypoints) + parseInt(1);
        });
        $('.add-more-material-item').each(function (index, item) {
            currentweight = $(item).find('input.weight').val();
            _total_weight = parseFloat(_total_weight) + parseFloat(currentweight);
        });

        if (parseFloat(_total_weight) < 0) { _total_weight = 0; } else {


        }
        if (parseFloat(_total_distance) < 0) { } else {
            _total_distance = 0;
        }

        $('.total_unloadingpoint_h6').html('Total Delivery Stations: ' + _total_unloadingpoints);
        $('.total_weight_h6').html('Total Weight (MT): ' + _total_weight.toFixed(2));

        $('.total_deliverypoints_h6').html('Total Unloading Points: ' + _total_deliverypoints);

        currentItem.find('.initem_item_address_requisition').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);
            var _unloadingarea = $(item).find('.currentUnloading').val();
            if (_unloadingarea != null && _unloadingarea != "") {
                $(item).find('.deliveryaddress_subtitle').html(_unloadingarea);
                $(item).find('.new_unloading_point_label').html('Unloading Point ' + indexvalue);
            } else {
                $(item).find('.deliveryaddress_subtitle').html('Unloading Point ' + indexvalue);
                $(item).find('.new_unloading_point_label').html('Unloading Point ');
            }



        });
        var _new = 0;
        $('.add_more_requisition_unloading').each(function (index, item) {
            var currentunloading = $(item).closest('.add_more_unloading_data');
            var _firstStation = 0;
            var loadingPoint1 = $('.ShipFromAddress').val();
            var unloadingarea = $(item).find('.unloading_point').val();

            $.get("/logisticsvehiclerequisitions/findstattype", { unloadingarea: unloadingarea, loadingPoint: loadingPoint1 }, function (data) {
                if (data.status == true) {
                    if (data.type == "Intra") {
                        _firstStation = 24;
                    } else {
                        _firstStation = 36;
                    }

                } else {
                    _firstStation = 24;
                }

            });

            $(item).find('.initem_item_address_requisition').each(function (index1, item1) {


                if (index == 0) {
                    if (index1 == 0) {
                        var _currentdeliverydate = /* parseInt(24) + */ parseInt(12) + parseInt(_firstStation);
                        _new = _currentdeliverydate;
                    } else {
                        _new = parseInt(_new) + parseInt(6);
                    }
                } else {
                    _new = parseInt(_new) + parseInt(12);
                }

                var loading = $('.ExpectedLoadingDate').val();

                var datepick = moment(loading, "DD/MM/YYYY hh:mm:ss").add(parseInt(_new), 'hours').format('DD/MM/YYYY');


                $(item1).find('.delivery_date').val(datepick);

            });

        });

    });
    //------------------------------Internal------------------------------------
    $(document).on('click', '.add-more-internal_unloading_item_requisition', function (index) {
        ////debugger;;
        var currentItem = $(this).closest('div.internal_requisition_Main_Div').find('.add_more_requisition_unloading_internal:last');
        var newItem = currentItem.clone(false, false);

        newItem.find('.distance').show();
        newItem.find('.dispatch_by').val("Company Owned");
        newItem.find('.dispatchby').val("Company Owned");
        newItem.find('.contractual').hide();
        newItem.find('.company').show();
        newItem.find('.new select.loading_point').empty().trigger('change.select2');
        newItem.find('.new select.loading_point').addClass('autocomplete');
        newItem.find('.new select.veh_select').empty().trigger('change.select2');
        newItem.find('.new select.veh_select').addClass('autocomplete');

        newItem.insertAfter(currentItem);

        WebApp.Core.ProcessNames();

        //WebApp.Core.RebindFormValidation();
        newItem.find('.initem_item_address_requisition_internal').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);
            $(item).find('.deliveryaddress_subtitle_internal').html('Unloading Point ' + indexvalue);
        });


        var _total_deliverypoints = 0;
        var _total_unloadingpoints = 0;
        var _total_weight = 0;
        var _total_distance = 0;
        var _indexcount = 0;
        var _deliveryDateCount = 0;

        $('div.add_more_requisition_unloading_internal').each(function (index, item) {
            var _total_index = parseInt(_indexcount) + parseInt(1);
            $(item).find('.unloadingpoint_main_title_internal').html('Ship To Location ' + _total_index);
            $(item).find('.unloadingpoint_main_title_internal').removeAttr('data-target');
            //-------------trip----------------
            $(item).find('.trip_main_title_internal').html('Trip Detail ' + _total_index);
            $(item).find('.trip_main_title_internal').removeAttr('data-target');
            //-------------trip----------------
            var _attr = "{#collapse" + _total_index + "}";
            $(item).find('.unloadingpoint_main_title_internal').attr('data-target', _attr);
            //-------------trip----------------
            $(item).find('.trip_main_title_internal').attr('data-target', _attr);
            //-------------trip----------------
            _indexcount = parseInt(_indexcount) + parseInt(1);
            _total_unloadingpoints = parseInt(_total_unloadingpoints) + parseInt(1);
            var currentdistance = $(item).find('input.Distance').val();
            _total_distance = parseFloat(_total_distance) + parseFloat(currentdistance);

        });
        $('.add_more_requisition_unloading_internal').each(function (index, item) {

            $(item).find('.initem_item_address_requisition_internal').each(function (index1, item1) {

                if (index == 0) {
                    if (index1 == 0) {
                        var _currentdeliverydate = parseInt(24) + parseInt(12) + parseInt(24);
                        _deliveryDateCount = _currentdeliverydate;
                    } else {
                        _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(6);
                    }
                } else {
                    _deliveryDateCount = parseInt(_deliveryDateCount) + parseInt(12);
                }

                var _today = $('input.Today_date').val();

                var datepick = moment(_today, "DD/MM/YYYY hh:mm:ss").add(parseInt(_deliveryDateCount), 'hours').format('DD/MM/YYYY');


                $(item1).closest('.date').find('.delivery_date').val(datepick);

            });

        });
        $('.initem_item_address_requisition_internal').each(function (index, item) {
            _total_deliverypoints = parseInt(_total_deliverypoints) + parseInt(1);
        });


        $('.total_unloadingpoint_h6').html('Total Ship To Location : ' + _total_unloadingpoints);


        $('.total_deliverypoints_h6').html('Total Delivery Points : ' + _total_deliverypoints);
        WebApp.Core.RebindFormValidation();

    });
    $(document).on('click', '.remove-unloading_initem_item_requisition_internal', function () {

        var currentItem = $(this).closest('div.add_more_requisition_unloading_internal');

        if ($('div.add_more_requisition_unloading_internal').length > 1) {
            $(this).closest('div.add_more_requisition_unloading_internal').remove();

            WebApp.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }

        $('div.initem_item_address_requisition_internal').each(function (index, item) {
            var indexvalue = parseInt(index) + parseInt(1);

            $(item).find('div.address_sl_no').html(indexvalue);
        });

        //Calculate values
        //****************From here****************
        var _total_deliverypoints = 0;
        var _total_unloadingpoints = 0;
        var _total_weight = 0;
        var _total_distance = 0;
        var _indexcount = 0;
        $('.add_more_requisition_unloading').each(function (index, item) {
            var _total_index = parseInt(_indexcount) + parseInt(1);
            _indexcount = parseInt(_indexcount) + parseInt(1);
            var _unloadingarea = $(item).find('.loading_point').val();

            if (_unloadingarea != null && _unloadingarea != "") {

                $(item).find('.unloadingpoint_main_title').html(_unloadingarea);
                $(item).find('.increment_station_details').html(_unloadingarea + ' Details');
            }
            else {
                $(item).find('.unloadingpoint_main_title').html('Delivery Station ' + _total_index);
                $(item).find('.increment_station_details').html('Delivery Station #' + _total_index + ' Details');
            }


            _total_unloadingpoints = parseInt(_total_unloadingpoints) + parseInt(1);

            var currentdistance = $(item).find('input.Distance').val();
            _total_distance = parseFloat(_total_distance) + parseFloat(currentdistance);
        });
        $('.initem_item_address_requisition').each(function (index, item) {
            _total_deliverypoints = parseInt(_total_deliverypoints) + parseInt(1);
        });
        $('div.add_more').each(function (index, item) {
            currentweight = $(item).find('input.weight').val();
            _total_weight = parseFloat(_total_weight) + parseFloat(currentweight);
        });

        if (parseFloat(_total_weight) < 0) { }
        else {
            _total_weight = 0;
        }
        if (parseFloat(_total_distance) < 0) { }
        else {
            _total_distance = 0;
        }
        $('.total_unloadingpoint_h6').html('Total Delivery Stations: ' + _total_unloadingpoints);


        $('.total_deliverypoints_h6').html('Total Unloading Points: ' + _total_deliverypoints);

        $('.total_weight_h6').html('Total Weight (MT): ' + _total_weight.toFixed(2));



        //****************To here****************
    });
    //----------------------------------------------------------------
    $(document).on('click', 'input.checkbox_selected', function () {
        ////debugger;
        var inc = 0;
        if ($(this).is(':checked')) {

            $('table.order_table').find('tr').each(function (index, item) {
                $(this).closest('tr').find('input.requisition').prop('checked', true);

            });

            var _selectedItems = $('input.requisition:checked').map(function () { return this.value; }).get().join(',');

            if (_selectedItems != "" && _selectedItems != null && _selectedItems != undefined) {


                $.get("/dispatchplanningprocess/verifyloadingarea", { RequisitionID: _selectedItems }, function (data) {
                    if (data.status == false) {
                        $('table.order_table').find('tr').each(function (index, item) {
                            if (data.type == "unloading") {

                                $(this).closest('tr').find('input.requisition').prop('checked', false);
                            } else if (data.type == "loading") {
                                inc = parseInt(inc) + 1;
                                $(this).closest('tr').find('input.requisition').prop('checked', false);
                            } else {
                                $(this).closest('tr').find('input.requisition').prop('checked', false);
                            }

                            if (inc == 1) {
                                WebApp.Notifications.Show('Info', 'Please choose the same loading point');
                                $('input.checkbox_selected').prop('checked', false);
                                //$('.requisition_buttons').attr("style", "pointer-events: none");

                            }
                        });
                    } else {
                        // $('.requisition_buttons').css("display", "block");
                        $('.requisition_buttons').removeClass("disable-btn");

                        //$('.requisition_buttons').removeAttr("style", "pointer-events: none");
                    }

                });


            }

            var RequisitionCount = $('input.requisition:checked').length;

            if (RequisitionCount <= 0) {
                //$('.requisition_buttons').attr("style", "pointer-events: none");
                $('.requisition_buttons').addClass("disable-btn");

            } else {
                // $('.requisition_buttons').css("display", "block");
                $('.requisition_buttons').removeClass("disable-btn");

                //$('.requisition_buttons').removeAttr("style", "pointer-events: none");
            }

        } else {
            $('table.dataTable.display tbody td').find('input:checkbox').prop('checked', false);
            //$('.requisition_buttons').attr("style", "pointer-events: none");
        }
    });
    $(document).on('click', 'input.checkbox_Selected_all', function () {
        var inc = 0;
        if ($(this).is(':checked')) {

            $('table.order_table').find('tr').each(function (index, item) {
                $(this).closest('tr').find('input.vehiclerequisition').prop('checked', true);

            });

            var _selectedItems = $('input.vehiclerequisition:checked').map(function () { return this.value; }).get().join(',');



            var RequisitionCount = $('input.vehiclerequisition:checked').length;

            if (RequisitionCount <= 0) {
                $('.requisition_buttons').addClass("disable-btn");

            } else {
                $('.requisition_buttons').removeClass("disable-btn");

            }

        } else {
            $('table.dataTable.display tbody td').find('input:checkbox').prop('checked', false);
        }
    });


    $(document).on('click', 'a.buttonmaterialDetails', function () {
        var ID = $(this).attr('data-attr');

        if (ID != 0) {
            $('div.details').html('');
            $.get('/dispatchplanningprocess/getmaterialDetails', { ID: ID }, function (data) {
                if (data.status == true) {

                    $('div.details').html(data.reqData);

                }
            });
        }
    });
    $(document).on('click', 'a.LoadClubbing', function (event) {

        var requestType = $('.findActiveclass').val();
        var _selectedItems = $('.vehicle-requisition-check:checked').map(function () { return this.value; }).get().join(',');
        if (_selectedItems != null && _selectedItems != undefined && _selectedItems != 0) {
            $('div.Main_Model').html("");
            $.get('/dispatchplanningprocess/LoadClubbing', { RequestIds: _selectedItems }, function (data) {
                if (data.status == true) {
                    $('div.Main_Model').html(data.loadclubbingdata);
                    $('#datepicker3').trigger('changeDate');
                    $('Button.ProceedtoOpenBid').show();
                    $('Button.ProceedtoContract').show();

                }
            });


        } else {
            if ($(this).hasClass("disable-btn")) {
                alert("Please select the requisitions to club the loads");

                event.stopPropagation()
            } else {
                $('#exampleModal').modal("show");
            }
            $('.Main_Model').html("");


        }

    });




    $(document).on('click', 'a.ReplanBidding', function (event) {

        var bidid = $(this).attr('data-attr');
        $('.bidplan').val(bidid);

        $('div.Main_Model').html("");
        $.get('/logisticsconvertbids/ReplanBidding', { ids: bidid }, function (data) {
            if (data.status == true) {
                $('div.Main_Model').html(data.biddingdata);
                $('.proceedtoreplan').show();


            }
        });

    });

    $(document).on('click', '.proceedtoreplan', function (event) {

        var bidid = $('.bidplan').val();
        if (bidid != 0) {
            window.location.href = "/logisticsconvertbids/Replan?id=" + bidid;

        }

    });


    //Warehouse
    $(document).on('click', 'a.select_list_next', function () {
        var requestType = $('.findActiveclass').val();
        var _selectedItems = $('.select_req:checked').map(function () { return this.value; }).get().join(',');

        if (_selectedItems != null && _selectedItems != undefined && _selectedItems != 0) {
            $('div.Main_Model').html("");
            $.get('/poultry-selected-list', { RequestIds: _selectedItems }, function (data) {
                if (data.status == true) {
                    window.location.href = "/poultry-selected-list";
                }
            });
        } else {
            alert("Please select Requests");
        }

    });


    $(document).on('click', 'a.buttonrequisitionDetails', function () {
        var ID = $(this).attr('data-attr');

        if (ID != 0) {
            $('div.tracktripdetails').html('');
            $.get('/transports/getrequisitionDetails', { ID: ID }, function (data) {
                if (data.status == true) {

                    $('div.tracktripdetails').html(data.reqData);

                }
            });
        }
    });

    $(document).on('click', 'a.buttontripDetails', function () {
        var ID = $(this).attr('data-attr');

        if (ID != 0) {
            $('div.tracktripdetails').html('');
            $.get('/Registration/getUserDetails', { EmployeeID: ID }, function (data) {
                if (data.status == true) {

                    $('div.tracktripdetails').html(data.reqData);

                }
            });
        }
    });

    $(document).on('click', 'input.Material-ConverrtBid-check', function () {

        var checked = $(this).closest('.div-bid-material').find('input[type=checkbox]:checked').length;
        var current = $(this).closest('.Material_convert_bid').find('.Material-ConverrtBid-check');

        if ($(this).is(':checked')) {


            $(this).closest('div.div-bid-material').find('.Bid_Requested_Quantity').removeAttr('readonly');

            $(this).closest('div.div-bid-material').find('.Bid_Requested_Quantity').attr('data-val', true);

            $(this).closest('div.div-bid-material').find('.Bid_Requested_Quantity').attr('data-val-required', 'Please enter the Bid Quantity');
            WebApp.Core.RebindFormValidation();
        } else {

            if (checked > 0) {

                $(this).closest('div.Material_convert_bid').find('.Bid_Requested_Quantity').attr('readonly', true);
                $(this).closest('div.Material_convert_bid').find('.Bid_Requested_Quantity').val('');
                $(this).closest('div.Material_convert_bid').find('.Balance_Requested_quantity').val('');

                $(this).closest('div.Material_convert_bid').find('.Bid_Requested_Quantity').removeAttr('data-val', true);
                $(this).closest('div.Material_convert_bid').find('.Bid_Requested_Quantity').removeAttr('data-val-required', 'Please enter the Bid Quantity');

                var currentDiv = $(this).closest('div.material_Div');
                var _total = 0;
                var currenttotal = 0;
                currentDiv.find('div.div-bid-material').each(function (index, item) {


                    var _currentvalue = $(item).find('input.Convert_Bid_Requested_Quantity').val();


                    if (_currentvalue == "") {

                        currenttotal = 0;
                    } else {
                        currenttotal = $(item).find('input.Convert_Bid_Requested_Quantity').val();
                    }
                    _total = parseInt(_total) + parseInt(currenttotal);


                });

                $('.total_quantity_h6').html('Total Bid Quantity (MT) : ' + _total);

                WebApp.Core.RebindFormValidation();
            } else {
                $(this).closest('div.Material_convert_bid').find('.Bid_Requested_Quantity').attr('readonly', false);

                $(this).closest('div.Material_convert_bid').find('.Bid_Requested_Quantity').attr('data-val', true);
                $(this).closest('div.Material_convert_bid').find('.Bid_Requested_Quantity').attr('data-val-required', 'Please enter the Bid Quantity');

                $(this).closest('div.Material_convert_bid').find(".select_check_box_div input[type=checkbox]").prop('checked', 'true');

                var currentDiv = $(this).closest('div.material_Div');
                var _total = 0;
                var currenttotal = 0;
                currentDiv.find('div.div-bid-material').each(function (index, item) {


                    var _currentvalue = $(item).find('input.Convert_Bid_Requested_Quantity').val();


                    if (_currentvalue == "") {

                        currenttotal = 0;
                    } else {
                        currenttotal = $(item).find('input.Convert_Bid_Requested_Quantity').val();
                    }
                    _total = parseInt(_total) + parseInt(currenttotal);


                });

                $('.total_quantity_h6').html('Total Bid Quantity (MT) : ' + _total);

                WebApp.Core.RebindFormValidation();
                WebApp.Notifications.Show('Info', 'Please choose atleast one material');
            }


        }



    });

    $(document).on('click', 'input.Material-Contract-check', function () {


        if ($(this).is(':checked')) {


            $(this).closest('div.Material_convert_bid').find('input.Contract_Transporter_Requested_Quantity').removeAttr('readonly');

            $(this).closest('div.Material_convert_bid').find('.Contract_Transporter_Requested_Quantity').attr('data-val', true);

            $(this).closest('div.Material_convert_bid').find('.Contract_Transporter_Requested_Quantity').attr('data-val-required', 'Please select the Requested Quantity');
            WebApp.Core.RebindFormValidation();
        } else {
            $(this).closest('div.Material_convert_bid').find('.Contract_Transporter_Requested_Quantity').attr('readonly', true);
            $(this).closest('div.Material_convert_bid').find('.Contract_Transporter_Requested_Quantity').val('');
            $(this).closest('div.Material_convert_bid').find('.Balance_Requested_quantity').val('');

            $(this).closest('div.Material_convert_bid').find('.Contract_Transporter_Requested_Quantity').removeAttr('data-val', true);

            $(this).closest('div.Material_convert_bid').find('.Contract_Transporter_Requested_Quantity').removeAttr('data-val-required', 'Please select the Requested Quantity');
            var currentDiv = $(this).closest('div.material_Div');
            var _total = 0;
            var currenttotal = 0;
            currentDiv.find('.div-bid-material').each(function (index, item) {


                var _currentvalue = $(item).find('input.Contract_Transporter_Requested_Quantity').val();


                if (_currentvalue == "") {

                    currenttotal = 0;
                } else {
                    currenttotal = $(item).find('input.Contract_Transporter_Requested_Quantity').val();
                }
                _total = parseInt(_total) + parseInt(currenttotal);


            });

            $('.total_quantity_h6').html('Total Bid Quantity (MT) : ' + _total);
        }
    });


    //-----------------RawMaterialSpec
    $(document).on('click', '.add-more-spec_item', function () {
        var currentItem = $(this).closest('tr.spec_item');
        var newItem = currentItem.clone(false, false);

        newItem.find('input').val('');
        newItem.find('td:eq(1) input').val('');
        newItem.find('td:eq(2) input').val('');

        newItem.insertAfter(currentItem);

        WebApp.Core.ProcessNames();
        WebApp.Core.RebindFormValidation();
    });
    $(document).on('click', '.btn_inspection', function () {
        var value = $(this).attr("data-attr");

        $(".VehicleAcceptedForLoading").val(value);

        WebApp.Core.RebindFormValidation();
    });


    $(document).on('click', '.IsApproved_parkin', function () {

        var value = $(this).val();

        if (value != null && value != " ") {
            if (value == "Yes" || value == "Allowed With Deviation") {
                $('div.mandatory_div').each(function (index, item) {

                    var valreq = $(item).closest('.loading_documents').find('.loading_documents').attr("data-attr");

                    $('label.req').addClass("mandatory");

                    $(item).find('.loading_documents').attr("data-val", "true");
                    $(item).find('.loading_documents').attr("data-val-required", valreq);
                    $(item).find('span.span_mandatory_msg').css("display", "");
                    WebApp.Core.RebindFormValidation();
                });

                WebApp.Core.RebindFormValidation();

            } else {
                $('div.mandatory_div').each(function (index, item) {

                    var valreq = $(item).closest('.loading_documents').find('.loading_documents').attr("data-attr");

                    $('label.req').addClass("mandatory");

                    $(item).find('.loading_documents').attr("data-val", "true");
                    $(item).find('.loading_documents').attr("data-val-required", valreq);
                    $(item).find('span.span_mandatory_msg').css("display", "");
                    WebApp.Core.RebindFormValidation();
                });
                WebApp.Core.RebindFormValidation();
            }
        }
    });
    $(document).on('click', '.remove-spec_item', function () {
        if ($('.spec_item').length > 1) {
            $(this).closest('tr').remove();
            WebApp.Core.ProcessNames();
            MarkuplabLavande.Core.ProcessNames();
        } else {
            alert('At least one item is required.');
        }
    });
    //-----------------RawMaterialSpec
    $(document).on('click', 'a.logistics_convert_bid', function () {

        var requestType = $('.findActiveclass').val();
        var _selectedItems = $('.vehicle-requisition-check:checked').map(function () { return this.value; }).get().join(',');
        var _type = $(this).attr('data-attr');


        if (_selectedItems != null && _selectedItems != undefined && _selectedItems != 0) {
            window.location.href = '/LogisticsConvertbids/ConvertBid?requisitionid=' + _selectedItems + '&type=' + _type + '&requestType=' + requestType;
        } else {
            alert("Please select a requisition");
        }

    });




    $(document).on('click', 'a.logistics_convert_transporter', function () {

        var requestType = $('.findActiveclass').val();
        var _selectedItems = $('.vehicle-requisition-check:checked').map(function () { return this.value; }).get().join(',');
        var _type = $(this).attr('data-attr');


        if (_selectedItems != null && _selectedItems != undefined && _selectedItems != 0) {
            window.location.href = '/ContractTransporters/ContractTransporters?requisitionid=' + _selectedItems + '&requestType=' + requestType;
        } else {
            alert("Please select a requisition before you invite the Transporters");
        }

    });
    $(document).on('click', 'Button.ProceedtoOpenBid', function () {

        var ids = $('.requisitionID').val();

        $('Form.FormConvertBid').submit();

    });

    $(document).on('click', 'Button.SubmitSize', function () {
        var vezise = $('.ves').val();
        $('Form.vehicle_size_form').submit();
    });


    //-------------------------Internal popup------------------------
    $(document).on('click', 'Button.dispatch_submit', function () {
        $('Form.FormConvertBid1').submit();
    });
    $(document).on('click', 'Button.trips_submit', function () {
        $('Form.FormConvertBid2').submit();
    });
    //---------------------------------------------------------

    //Internal - Parking in inspection
    $(document).on('click', '.btn_inspection_internal', function () {
        var value = $(this).attr("data-attr");

        $(".VehicleAcceptedForLoading").val(value);
        if (value != null && value != " ") {
            if (value == "Yes" || value == "Allowed With Deviation") {
                $('div.mandatory_div').each(function (index, item) {

                    var valreq = $(item).find('.loading_documents').attr("data-attr");

                    $('label.req').addClass("mandatory");

                    $(item).find('.loading_documents').attr("data-val", "true");
                    $(item).find('.loading_documents').attr("data-val-required", valreq);
                    $(item).find('span.span_mandatory_msg').css("display", "");
                    WebApp.Core.RebindFormValidation();
                });
                WebApp.Core.RebindFormValidation();

            } else {
                $('div.mandatory_div').each(function (index, item) {

                    var valreq = $(item).find('.loading_documents').attr("data-attr");

                    $('label.req').addClass("mandatory");

                    $(item).find('.loading_documents').attr("data-val", "true");
                    $(item).find('.loading_documents').attr("data-val-required", valreq);
                    $(item).find('span.span_mandatory_msg').css("display", "");
                    WebApp.Core.RebindFormValidation();
                });
                WebApp.Core.RebindFormValidation();
            }
        }
        WebApp.Core.RebindFormValidation();
    });

    $(document).on('click', 'Button.route_transporter_submit', function () {
        $('Form.FormConvertBid1').submit();
    });
    $(document).on('click', 'Button.route_driver_submit', function () {
        $('Form.FormConvertBid2').submit();
    });
    $(document).on('click', 'Button.mark_as_deliveredsubmit', function () {
        $('Form.FormConvertBid3').submit();
    });
    //Internal - Parking in inspection

    $(document).on('click', 'Button.transporter_submit', function () {
        $('Form.FormConvertBid1').submit();
    });

    $(document).on('click', 'Button.transporter_submit_poultry', function () {
        $('Form.FormConvertBid1').submit();
    });
    $(document).on('click', 'Button.transporter_submit_doc', function () {
        $('Form.FormConvertBid1').submit();
    });

    $(document).on('click', 'Button.driver_submit', function () {
        $('Form.FormConvertBid2').submit();
    });

    $(document).on('click', 'Button.driver_submit', function () {
        $('Form.VehicleForm').submit();
    });

    $(document).on('click', 'Button.arrival_submit', function () {
        $('Form.arrival_form').submit();
    });

    $(document).on('click', 'Button.ProceedtoContract', function () {
        //debugger;
        //var totalQty = parseFloat($('input.totalquantity').val());
        //var selectedVehicleCapacity = parseFloat($('select.VehicleSize').val());
        //var allowSubmit = true;
        //if (totalQty > selectedVehicleCapacity) {
        //    WebApp.Notifications.Show('Error', 'Vehicle Capacity should not be less than Total Contract Quantity.');
        //    allowSubmit = false;
        //    return false;

        //}
        $('input.type').val("Contract");
        var vehiclesize = $('.VehicleSize').val();


        //$('div.unloadingPointdiv div.div-bid-material table.tablecontract tr').each(function (index, item) {
        //    var _currentvalue = $(item).find('td.contracttd input.lod_bidquantity_contract').val();
        //    var _dispatchvalue = $(item).find('td.contracttd input.requestedQuantity').val();
        //    if (parseFloat(_currentvalue) > parseFloat(_dispatchvalue)) {
        //        WebApp.Notifications.Show('Info', 'Contract quantity should be less than Requested Quantity ');
        //        $(item).find('td.contracttd input.lod_bidquantity_contract').val("");
        //    } else {

        //        var _currentMaterial = 0
        //        if (_currentvalue == "" || _currentvalue == null || _currentvalue == NaN) {

        //            _currentMaterial = 0;
        //        } else {
        //            _currentMaterial = $(item).find('td.contracttd input.lod_bidquantity_contract').val();

        //        }

        //        _maerialSum = parseFloat(_maerialSum) + parseFloat(_currentMaterial);

        //    }



        //});

        var _maerialSum = $('.totalquantity').val();
        $('Form.FormConvertBid').submit();


        //if (parseFloat(_maerialSum) > parseFloat(vehiclesize)) {
        //    WebApp.Notifications.Show('Info', 'Total Contract quantity should be less than Vehicle Capacity ');
        //    $('input.lod_bidquantity_contract').val("");
        //    $('.total_ContractDispatch_quantity_h6').html('Total Contract Quantity (MT) : 0');
        //    WebApp.Core.RebindFormValidation();

        //}
        //else {
        //    $('Form.FormConvertBid').submit();
        //}



    });

    $(document).on('click', 'Button.ConvertBidTransporter', function () {

        var vehiclesize = $('select.VehicleSize').val();
        var totabidquantity = $('.TotalQuantity').val();

        var _selectedMaterialItems = $('.Material-ConverrtBid-check:checked').map(function () { return this.value; }).get().join(',');

        if (_selectedMaterialItems != null && _selectedMaterialItems != undefined && _selectedMaterialItems != 0) {
            if (vehiclesize != null && vehiclesize != undefined && vehiclesize != 0 && totabidquantity != null && totabidquantity != undefined && totabidquantity != 0) {
                if (parseFloat(vehiclesize) < parseFloat(totabidquantity)) {
                    WebApp.Notifications.Show('Info', 'Bid quantity must be less than the vehicle size');
                    $('.Convert_Bid_Requested_Quantity').val("");
                    $('.total_quantity_h6').html('Total Bid Quantity (MT) : 0');
                    $('.total_quantity_h6_ByRow').html('Total Bid Quantity (MT) : 0');

                } else {

                    $('input.selectedMaterials').val(_selectedMaterialItems);
                    $('Form.FormConvertBid').submit();
                }
            } else {
                WebApp.Core.RebindFormValidation();
            }

        } else {
            if ((_selectedMaterialItems == null || _selectedMaterialItems == undefined || _selectedMaterialItems == 0 || _selectedMaterialItems == "")) {
                alert("Please select Material");


            }


            WebApp.Core.RebindFormValidation();
            return false;
        }

    });


    $(document).on('click', 'Button.submittripclosure', function () {
        ////debugger;;
        var _selectedItems = $('input.CustomerFeedBackinput:checked').map(function () { return this.value; }).get().join(',');

        var findID = $('Button.submittripclosure').attr('data-attr');
        if (_selectedItems != null && _selectedItems != undefined && _selectedItems != 0) {


            $('Form.PODForm').submit();

        }
        else {
            alert("Please select Customer Feedback");
            return false;
        }

    });

    $(document).on('click', 'Button.ConvertContractTransporter', function () {
        //debugger;

        var vehiclesize = $('select.VehicleSize').val();
        var totabidquantity = $('.TotalQuantity').val();
        var _selectedMaterialItems = $('.Material-Contract-check:checked').map(function () { return this.value; }).get().join(',');


        if (_selectedMaterialItems != null && _selectedMaterialItems != undefined && _selectedMaterialItems != 0) {
            if (vehiclesize != null && vehiclesize != undefined && vehiclesize != 0 && totabidquantity != null && totabidquantity != undefined && totabidquantity != 0 && vehiclesize != "" && totabidquantity != "") {
                if (parseFloat(vehiclesize) < parseFloat(totabidquantity)) {
                    WebApp.Notifications.Show('Info', 'Total Contract quantity must be less than the vehicle size');
                    $('.Contract_Transporter_Requested_Quantity').val("");
                    $('.total_quantity_h6').html('Total Contract Quantity (MT) : 0');
                    $('.total_quantity_h6_ByRow').html('Total Contract Quantity (MT) : 0');
                    $('.TotalQuantity').val(0);
                } else {

                    $('input.selectedMaterials').val(_selectedMaterialItems);
                    $('Form.FormConvertcontract').submit();
                }
            } else {
                WebApp.Core.RebindFormValidation();
            }

        } else {
            alert("Please select Material");
            WebApp.Core.RebindFormValidation();
            return false;
        }
        WebApp.Core.RebindFormValidation();
    });


    $(function () {
        $("#datepicker1").datepicker({
            dateFormat: 'DD/MM/YY',

            orientation: 'bottom'
        });

        $('#datepicker3').datepicker({
            dateFormat: 'DD/MM/YY',

            orientation: 'bottom',
            startDate: new Date()

        });
    });

    $(function () {
        //debugger;
        $("#datepicker2").datepicker({
            dateFormat: 'DD/MM/YY',
            orientation: 'bottom',
            autoclose: true
        });
        $('#datepicker2').datepicker()
            .on('changeDate', function (ev) {
                $('#datepicker2').datepicker('hide');
            });
        $('#datepicker2').datepicker()
            .on('changeDate', function (ev) {
                $('#datepicker2').datepicker('hide');
            });
        $('#datepicker3').datepicker()
            .on('changeDate', function (ev) {
                $('#datepicker3').datepicker('hide');
            });
        $('.ExpectedLoadingDatee').datepicker()

            .on('changeDate', function (ev) {
               // debugger;
                if ($(this).is('.ExpectedLoadingDatee')) {
                    var _startDate = $(this).val();

                    if (_startDate != "") {

                        $('.datepicker-end').datepicker('remove');
                        $('.datepicker-end').removeAttr('disabled').val('');

                        var _options = {};
                        _options.todayHighlight = true;
                        _options.autoclose = true;
                        _options.format = 'dd/mm/yyyy';
                        _options.startDate = _startDate;

                        $('.datepicker-end').datepicker(_options);
                    }
                }
                $('#Deliverydatepicker').datepicker('hide');
            });
        $(document).on('changeDate', '#datepicker3', function () {
            $('#datepicker3').datepicker('hide');
        })
    });
    //text area automatically increase size script starts here
    $('.auto-textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    //text area automatically increase size script ends here

    function _(el) {
        return document.getElementById(el);
    }
    $(document).on('change', 'input.input-file', function () {
        var file = _("file1").files[0];

        $('.progressbar').addClass('d-block');
        var formdata = new FormData();
        formdata.append("file1", file);
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", "/purchaserequest/Media");
        ajax.send(formdata);
    });


    function progressHandler(event) {
        _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
        var percent = (event.loaded / event.total) * 100;
        _("progressBar").value = Math.round(percent);
        _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
    }

    function completeHandler(event) {
        _("status").innerHTML = event.target.responseText;
        _("progressBar").value = 0;
    }

    function errorHandler(event) {
        _("status").innerHTML = "Upload Failed";
    }

    function abortHandler(event) {
        _("status").innerHTML = "Upload Aborted";
    }

});
$(document).ready(function () {


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
        "hideMethod": "fadeOut",
        "preventDuplicates": true,
        "preventOpenDuplicates": true
    }

});

function HighlightCurrentMenuItem(item, index) {

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
    _link.closest('a.text-center').parent().addClass('active');
}

$(document).ready(function () {
    $('.circle').on('click', function () {
        $('.circle').removeClass('active');
        $(this).toggleClass('active');
    })
    $('.node').first().addClass('firstchild')
})

$(document).ready(function () {
    setTimeout(function () {
        $('#preloaderbody').fadeOut();
    }, 1000);
})

//Time line Code Starts Here ....

$(document).on('click', 'button.comment_btn', function () {
    ////debugger;;
    var relatedId = $(this).attr('data-Id');
    var module = $(this).attr('data-module');
    var comment = $('#txtcmmntval').val();
    if (comment == "" || comment == null || comment == '') {
        toastr.error("Comment cannot be blank", "Error");
        return;
    }

    $.ajax({
        url: '/timelines/savecomment',
        type: 'POST',
        data: {
            'relatedId': relatedId,
            'module': module,
            'comment': comment,
        },
        success: function (data) {
            if (data.result != 0) {
                toastr.error(data.errorMessage, data.errorTitle);
                return;
            }
            toastr.success("Commented Successfully", "Success");
            $('textarea.txtComment').val('');

            LoadTimeLine(relatedId, module);

        },
        error: function () {
            toastr.error('Unknown error occurred while saving the details.', 'Unknown Error');
        },
        beforeSend: function () {
            $("button.comment_btn").attr("disabled", true);
            $("button.comment_btn").html("<i class='mdi mdi-comment mr-2'></i>Comment");
        },
        complete: function () {
            $("button.comment_btn").attr("disabled", false);
            $("button.comment_btn").html("<i class='mdi mdi-comment mr-2'></i>Comment");
        }
    });
});

$(document).ready(function () {
    var relatedId = $("ul.get_timeline").attr("data-Id");
    var module = $("ul.get_timeline").attr("data-module");

    if (relatedId == "" || relatedId == null || relatedId == '') {
        return;
    }

    if (module == "" || module == null || module == '') {
        return;
    }

    LoadTimeLine(relatedId, module);
});


$(document).ready(function () {
    $('.card-trip').on('click', function () {
        $('.card-trip').removeClass('active');
        $(this).addClass('active');
    })


    const secondHand = document.querySelector('.second-hand');

    // 2
    function setDate() {
        const now = new Date();
        // 2.a
        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;

        if (secondHand != null) {
            secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        }
        // 2.b

    }
    // 3
    setInterval(setDate, 1000);
    // 4
    setDate();

})


function LoadTimeLine(relatedId, module) {

    if (relatedId == "" || relatedId == null || relatedId == '') {
        toastr.error("Related ID Missed., Try Again", "Error");
        return;
    }

    if (module == "" || module == null || module == '') {
        toastr.error("Module Missed., Try Again", "Error");
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/timelines/loadtimeline',
        data: ({
            'relatedId': relatedId,
            'module': module,
        }),
        success: function (result) {
            $("ul.get_timeline").html(result.htmls);
            if (result.nodata) {
                $("ul.get_timeline").addClass('nodatas');
            } else {
                $("ul.get_timeline").removeClass('nodatas');
            }
        }
    });
}

//Time line Code Ends Here ....

$(document).ready(function () {
    $('.mobile-toggler-icon').on('click', function () {
        $('body').toggleClass('mobile-menu');
        $('body').removeClass('rightside-menu');
        $('body').removeClass('approve-rightside-menu');
        $('body').removeClass('timeline-rightside-menu');
        $('body').removeClass('sidebar-toggle');
        $('body').removeClass('filter-menu');
    })



    $('.mobile-toggler-icon1').on('click', function () {
        $('body').toggleClass('sidebar-toggle');
        $('body').removeClass('mobile-menu');
        $('body').removeClass('rightside-menu');
        $('body').removeClass('approve-rightside-menu');
        $('body').removeClass('timeline-rightside-menu');

        $('body').removeClass('filter-menu');
        $('body').removeClass('filter-menu');

    })
    $('#right-sidebar').on('click', function () {
        $('html').scrollTop();
        $('body').toggleClass('rightside-menu');
        $('body').removeClass('approve-rightside-menu');
        $('body').removeClass('timeline-rightside-menu');
        $('body').removeClass('filter-menu');
    })

    $('#approve-right-sidebar').on('click', function () {
        $('html').scrollTop();
        $('body').toggleClass('approve-rightside-menu');
        $('body').removeClass('rightside-menu');
        $('body').removeClass('timeline-rightside-menu');
        $('body').removeClass('filter-menu');
    })
    $('.dataTables_filter input').attr("placeholder", "Search");

    $('.timeline-btn').on('click', function () {
        $('html').scrollTop();
        $('body').toggleClass('timeline-rightside-menu');
        $('body').removeClass('approve-rightside-menu');
        $('body').removeClass('rightside-menu');
        $('body').removeClass('filter-menu');
        $('body').removeClass('mobile-menu');
        $('body').removeClass('filter-menu');
    })

    $(document).on('click', '.filter-icon', function () {
        $('html, body').animate({ scrollTop: 0 }, 00);
        $('body').toggleClass('filter-menu');
        $('body').removeClass('mobile-menu');
        $('body').removeClass('rightside-menu');
        $('body').removeClass('approve-rightside-menu');
        $('body').removeClass('timeline-rightside-menu');
        $('body').removeClass('mobile-menu');

    })

    $('.fade-background').on('click', function () {
        $('body').removeClass('approve-rightside-menu');
        $('body').removeClass('rightside-menu');
        $('body').removeClass('filter-menu');
        $('body').removeClass('timeline-rightside-menu');
        $('body').removeClass('sidebar-toggle');
        $('body').removeClass('mobile-menu');
    })


    $('.close-sidebar').on('click', function () {
        $('body').removeClass('approve-rightside-menu');
        $('body').removeClass('rightside-menu');
        $('body').removeClass('filter-menu');
    })
    $('.close-side').on('click', function () {
        $('body').removeClass('approve-rightside-menu');
        $('body').removeClass('rightside-menu');
    })
    $('.btn-cmnt.comment_btn').on('click', function () {
        $('.btn-cmnt.comment_btn').addClass('icon');
    })

    $(".breadcrumb-outer").appendTo("#breadcrumb-header");
    $(".navbar-brand").appendTo("#destination");

    $('.map-arrowbtn').on('click', function () {
        $('body').toggleClass('show-mapsidebar');
    })

    $(document).on('click', '.vehicle-requisition-check', function () {
        console.log('jasdhfkshdbfkbdfkjsbdjfk');
        $(this).parent().parent().toggleClass('row-highlight');
    })

})
$(document).ready(function () {

    var height = $('.row label').height();
    console.log(height);
});


//forcefully page reload when arrow click starts
window.addEventListener("pageshow", function (event) {
    var historyTraversal = event.persisted ||
        (typeof window.performance != "undefined" &&
            window.performance.navigation.type === 2);
    if (historyTraversal) {
        window.location.reload();
    }
});
//forcefully page reload when arrow click ends
$(document).ready(function () {

    $('.form-control.deliverydate.CommittedCustomerDeliveryDate').datepicker({
        orientation: 'bottom'
    })
});
$(document).ready(function () {

    $('.form-control.loadingdate.ExpectedLoadingDate').datepicker({
        orientation: 'bottom'

    })
    $('#datepicker2').datepicker({
        orientation: 'bottom'

    })
});
$(document).ready(function () {
    $(".timeline-outer .section-subtitle").text("Activity History");

});
$('.date-range-normal3').livequery(function () {
    $(this).daterangepicker({
        autoUpdateInput: false,
        locale: {
            format: 'DD/MM/YYYY'
        }
    }).on('apply.daterangepicker', function (ev, picker) {

        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
    });
});
$(document).on('click', '.applyBtn', function () {   //date-range
    var date = $('.drp-selected').html();
    if (date != null) {
        $('.date_range').html(date);
        $('.date_range').val(date);
    }
});
$(document).ready(function () {
    $('#selectallbid').click(function () {

        $('.selectedId').prop('checked', this.checked);

        var check = ($('.selectedId').filter(":checked").length);
        $('.total_selected_transporter').html('Select Transporters (' + check + ')');

    });

    $('.selectedId').change(function () {
        var check = ($('.selectedId').filter(":checked").length == $('.selectedId').length);
        $('#selectallbid').prop("checked", check);
    });

    $('.LoadClubbing').click(function () {
        var requestType = $('.findActiveclass').val();
        var _selectedItems = $('.vehicle-requisition-check:checked').map(function () { return this.value; }).get().join(',');
        if (_selectedItems != null && _selectedItems != undefined && _selectedItems != 0) {
            $('div.Main_Model').html("");
            $.get('/dispatchplanningprocess/LoadClubbing', { RequestIds: _selectedItems }, function (data) {
                if (data.status == true) {
                    $('div.Main_Model').html(data.loadclubbingdata);
                    $('#datepicker3').trigger('changeDate');
                    $('Button.ProceedtoOpenBid').show();
                    $('Button.ProceedtoContract').show();

                }
            });
        } else {
            if ($(this).hasClass("disable-btn")) {
                alert("Please select the requisitions to club the loads");

                event.stopPropagation()
            } else {
                $('#exampleModal').modal("show");



            }
        }
    });



    $('.close-btn').on('click', function () {
        var dataval = $(this).closest('.closebtn-outer');
        dataval.find("select").empty().trigger('change.select2');

        var data = $(this).closest('.closebtn-outer').attr('data-attr');
        if (data == "MaterialType") {
            dataval.find("select.MaterialType").empty().trigger('change');
            $("select.VehicleType").empty().trigger('change');
            $("select.VehicleSize").empty().trigger('change');
            $("select.Dimension").empty().trigger('change');
            $("select.SupplyContractCondition").empty().trigger('change');
            $("select.Material_description").empty().trigger('change');
            $("select.packing_type").empty().trigger('change');

            $(".req_qty").val("");
            $(".weight").val("");
            //dataval.find('.select2').val('').trigger('change');
            //dataval.find('.select2-selection__rendered').text('');

            //$("select.MaterialType").attr("data-placeholder", "Material Type");

        }
        else if (data == "VehicleType") {

            dataval.find("select.VehicleType").empty().trigger('change');
            $("select.VehicleSize").empty().trigger('change');
            $("select.Dimension").empty().trigger('change');

        }
        else if (data == "Partyname") {

            var _currentDiv = $(this).closest('.initem_item_address_requisition');
            _currentDiv.find(".custaddress").val("");
        }
        else if (data == "VehicleSize") {

            dataval.find("select.VehicleSize").empty().trigger('change');
            $("select.Dimension").empty().trigger('change');

        }
        else if (data == "Materialdescription") {
            dataval.find("select.Material_description").empty().trigger('change');
            var _currentDiv = $(this).closest('.div-add-more-main');
            _currentDiv.find("select.packing_type").empty().trigger('change');
            _currentDiv.find("select.BirdSize").empty().trigger('change');
            _currentDiv.find("input.req_qty").val("");
            _currentDiv.find("input.weight").val("");
            $('.add-more-material-item').each(function (index, item) {


                var _currentvalue = $(item).find('input.weight').val();

                if (_currentvalue == "" || _currentvalue == NaN || _currentvalue == null || _currentvalue == undefined) {

                    currenttotal = 0;
                }
                else {
                    currenttotal = $(item).find('input.weight').val();
                }
                _total = parseFloat(_total) + parseFloat(currenttotal);
            });
            var _sum = _total.toString().indexOf(".00") ? parseInt(_total) : _total;

            $('.total_weight_h6').html('Total Weight (MT) : ' + _total);

        }
        else if (data == "PackingType") {
            var _currentDiv = $(this).closest('.div-add-more-main');

            _currentDiv.find("input.req_qty").val("");
            _currentDiv.find("input.weight").val("");
            $('.add-more-material-item').each(function (index, item) {


                var _currentvalue = $(item).find('input.weight').val();

                if (_currentvalue == "" || _currentvalue == NaN || _currentvalue == null || _currentvalue == undefined) {

                    currenttotal = 0;
                }
                else {
                    currenttotal = $(item).find('input.weight').val();
                }
                _total = parseFloat(_total) + parseFloat(currenttotal);
            });
            var _sum = _total.toString().indexOf(".00") ? parseInt(_total) : _total;

            $('.total_weight_h6').html('Total Weight (MT) : ' + _total);

        }


        else if (data == "BirdSize") {
            dataval.find("select.BirdSize").empty().trigger('change');
            var _currentDiv = $(this).closest('.div-add-more-main');

            _currentDiv.find("input.req_qty").val("");
            _currentDiv.find("input.weight").val("");
            $('.add-more-material-item').each(function (index, item) {



                var _currentvalue = $(item).find('input.weight').val();

                if (_currentvalue == "" || _currentvalue == NaN || _currentvalue == null || _currentvalue == undefined) {

                    currenttotal = 0;
                }
                else {
                    currenttotal = $(item).find('input.weight').val();
                }
                _total = parseFloat(_total) + parseFloat(currenttotal);
            });
            var _sum = _total.toString().indexOf(".00") ? parseInt(_total) : _total;

            $('.total_weight_h6').html('Total Weight (MT) : ' + _total);

        }
        else if (data == "LoadingPoint") {
            var indexvalue = 0;
            $("input.vehicledistance").val("");
            $("select.currentUnloading").empty().trigger('change');
            $("select.unloading_point").empty().trigger('change');
            $('.add_more_requisition_unloading').each(function (index, item) {

                indexvalue = parseInt(indexvalue) + parseInt(1);
                var _unloadingarea = $(item).find('.loading_point').val();

                if (_unloadingarea != null && _unloadingarea != "") {

                    $(item).find('.unloadingpoint_main_title').html(_unloadingarea);
                    $(item).find('.increment_station_details').html(_unloadingarea + ' Details');
                } else {
                    $(item).find('.unloadingpoint_main_title').html('Delivery Station ' + indexvalue);
                    $(item).find('.increment_station_details').html('Delivery Station #' + indexvalue + ' Details');
                }

            });
        }
        else if (data == "Supply") {

            dataval.find("select.SupplyContractCondition").empty().trigger('change');
            $('.export_address').html('Address');

        }

        else if (data == "CreatetripTransporter") {


            $("select.bidnumber").empty().trigger('change');
            $("select.vehiclenumber").empty().trigger('change');
            $("select.drivername").empty().trigger('change');


        }

        else if (data == "Createtripdriver") {



            $("select.DriverPhone").empty().trigger('change');

        }

        else if (data == "deliveryStation") {

            $('.vehicledistance').val("");
            $('.CommittedCustomerDeliveryDate').val("");
            $("select.currentUnloading").empty().trigger('change');
        }
        else if (data == "contractloading") {

            dataval.find("select.UnloadingPoint").empty().trigger('change');

        }
        else if (data == "transporter") {
            $("select.LoadingPoint").empty().trigger('change');

            $("select.UnloadingPoint").empty().trigger('change');
            $("select.ContractVehicleType").empty().trigger('change');
            $("select.VehicleSize").empty().trigger('change');


        }


        dataval.find(".close-btn").hide();
    })
    $('.select2').on('change', function () {
        //debugger;
        var dataval = $(this).closest('.closebtn-outer');

        var currentval = $(this).val();

        if (currentval != null && currentval != "") {
            dataval.find(".close-btn").attr('style', 'display:block');

        }
        else {

            dataval.find(".close-btn").attr('style', 'display:none');
        }

    })
    $(document).on('click', 'a.vehicle_requisition_publish', function () {

        var _selectedItems = $('.vehicle-requisition-check:checked').map(function () { return this.value; }).get().join(',');



        if (_selectedItems != null && _selectedItems != undefined && _selectedItems != 0) {
            window.location.href = '/logisticsvehiclerequisitions/ClubAndPublish?reqid=' + _selectedItems;
        }
        else {
            alert("Please select Requisition");
        }

    });
});
$(document).on('click', '#materialSubmit', function () {
    //debugger;
    $('#form').submit(function () {
        $("button[type='submit']", this)
        var MaterialName = $('input.MaterialName').val()
        var MaterilCode = $('input.MaterialCode').val()
        var MaterilType = $('select.MaterialGroupId').val()
        if (MaterialName != null && MaterilCode != null && MaterilType != null) {
            $(this.materialSubmit).attr('disabled', 'disabled');
            $(this.materialSubmit).attr('style', 'cursor:not-allowed!important;');
            //$(this.#btnSubmit).
        }
        else {
            return false;
        }
        //  .attr('style', 'cursor:not-allowed!important;');
        return true;
    });
});
$(document).on('click', 'Button.SaveIdea', function () {
   // debugger;
    $('input.type').val("Vehicle Requisitions");
    //debugger;
    var publishstatus = $(this).attr('data-attr');
    if (publishstatus == "save and publish") {
        $('input.IsPublish').val(true);
    }
    else {
        $('input.IsPublish').val(false);
    }
    WebApp.Core.RebindFormValidation();
});
$(document).on('click', 'Button.ApproveIdea', function () {
    // debugger;
    $('input.type').val("Vehicle Requisitions");
    debugger;
    var publishstatus = $(this).attr('data-attr');
    if (publishstatus == "ApproveIdea") {
      
        $('.approveIdeas').show();
    }
    else {
        $('input.IsPublish').val(false);
    }
    WebApp.Core.RebindFormValidation();
});


//debugger;
$(document).on('change', '.ExpectedLoadingDatee', function (e) {
  //  debugger;
    var date = new Date(),
        yr = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        todayDate = yr + '-' + month + '-' + day;
    var date1 = new Date(todayDate);
    /*  $('input.MaterialCode').val()*/
    var dt = $('.ExpectedLoadingDatee').val();
    var ds = $('.ExpectedLoadingDatee').datepicker({ dateFormat: "yy-mm-dd" }).val()
    var date2 = new Date(ds);
    var milli_secs = date1.getDay() - ds.getDay();
    //var milli_secs = date1.getDay() - date2.getDay();
    // Convert the milli seconds to Days
    var days = milli_secs / (1000 * 3600 * 24);
    document.getElementById("DateDifference").innerHTML =
        Math.round(Math.abs(days));
});


$(document).on('change', '.HasOtherImplementedPlace', function () {
   // debugger;
    var _implementedPlace = $(this).val();
    if (_implementedPlace != null && _implementedPlace != "") {
        if (_implementedPlace == "Yes") {
            $('.ImplementedPlace').show();
            $('.Location_div').show();
            $('select.OtherImplementedPlaceDetail').attr('data-val', true);
            $('select.OtherImplementedPlaceDetail').attr('data-val-required', 'Please select Material Type');

            $('select.Location').attr('data-val', true);
            $('select.Location').attr('data-val-required', 'Please select Location');
            WebApp.Core.RebindFormValidation();
        }
        else {
            $('.ImplementedPlace').hide();
            $('.Location_div').show();
            $('select.Location').attr('data-val', true);
            $('select.Location').attr('data-val-required', 'Please select Location');

            $('select.OtherImplementedPlaceDetail').removeAttr('data-val', true);
            $('select.OtherImplementedPlaceDetail').removeAttr('data-val-required', 'Please select Material Type');
            WebApp.Core.RebindFormValidation();

        }
    }
});

$(document).ready(function () {
    $('.js-example-basic-single').select2();
    //debugger;
    var _implementedPlace = $('.application').val();
    if (_implementedPlace != null && _implementedPlace != "") {
        if (_implementedPlace == "Yes") {
            $('.ImplementedPlace').show();
            $('.Location_div').hide();
            $('select.OtherImplementedPlaceDetail').attr('data-val', true);
            $('select.OtherImplementedPlaceDetail').attr('data-val-required', 'Please select Material Type');

            $('select.Location').removeAttr('data-val', true);
            $('select.Location').removeAttr('data-val-required', 'Please select Location');
            WebApp.Core.RebindFormValidation();
        }
        else {
            $('.ImplementedPlace').hide();
            $('.Location_div').show();
            $('select.Location').attr('data-val', true);
            $('select.Location').attr('data-val-required', 'Please select Location');

            $('select.OtherImplementedPlaceDetail').removeAttr('data-val', true);
            $('select.OtherImplementedPlaceDetail').removeAttr('data-val-required', 'Please select Material Type');
            WebApp.Core.RebindFormValidation();

        }
    }

});
$(document).on('change', '#file', function () {
   // debugger
    //var uploadField = $(this).val();
    //Math.round((value.size / 1024)) + '</b> KB' // get value in kb
    //var filesize = uploadField.filesize;
    //var fi = uploadField.files.length
    //var AnewFile = uploadField[0].files[0].siz;
   
   
   
    //if (AnewFile < 2200) {
    //        alert("File is too big!");
    //        this.value = "";
    //    };
   
});

$(document).on('click', '.notifications', function () {
    $('html, body').animate({ scrollTop: 0 }, 00);
    $('body').toggleClass('filter-menu');
    $('body').removeClass('mobile-menu');
    $('body').removeClass('rightside-menu');
    $('body').removeClass('approve-rightside-menu');
    $('body').removeClass('timeline-rightside-menu');
    $('body').removeClass('mobile-menu');

})

$(document).ready(function () {

    //$.get('/Account/Notifications',
    //    function (result) {
    //         debugger
    //        $('div.announcementNotifications').html(result);

    //    })

    //$.get('/Settings/Approvals',
    //    function (result) {
    //        // debugger
    //        $('div.announcementApprovals').html(result);

    //    })

    //$.get('/Settings/Approvalscount',
    //    function (result) {
    //        // debugger
    //        $('div.notificationbadge').html(result);

    //    })
});
$(document).on('change', 'input.file', function (event) {

    debugger;

    /* var currentTr = $(this).closest('tr');*/
   // var thisF = $(this).val();
    var fSize = document.getElementById('file').files[0].size;
    console.log( document.getElementById('file').files[0].size);
    

   // var thisFile = find("input.file");
   // var file_size = thisFile.files[0].size;

    if (fSize > 2097520) {
        alert("The file exceeds the maximum size. Please upload a file in the mentioned size.");

        document.getElementById('file').value = '';
        //thisFile.val("");
    }
});
function selection() {
    var cat = document.getElementById('ideaStatus').value;
    if (cat == "Completed") {
        if (document.getElementById("ActualSolutionCategory").value == "" || document.getElementById("ActualSolution").value == "" || document.getElementById("ActualBenefit").value == "") {
            alert('Mandatory:- \n     1.Actual SolutionCategory\n     2.Actual Solution\n     3.Actual Benefit');
            return false;
        }
        else {
            return true;
        }
    }
   
}
function foo() {
    var cat = document.getElementById('ideaStatus').value;
    if (cat == "Completed") {
        if ((document.getElementById("ActualSolutionCategory").value == "") || (document.getElementById("ActualSolution").value == "") || (document.getElementById("ActualBenefit").value == "")) {
            alert('Mandatory:- \n     1.Actual SolutionCategory\n     2.Actual Solution\n     3.Actual Benefit');
            return false;
        }
        else {
            return true;
        }
    }
}


$(document).on('keyup', '#textareaDescription', function () {
    var maxLength = 250;   
    debugger;
    var textlen = maxLength - $(this).val().length;

    $('#rcharsDescription').text(textlen + "/250");
});

$(document).on('keyup', '#textareaProposedSolution', function () {
    var maxLength = 500;
    debugger;
    var textlen = maxLength - $(this).val().length;

    $('#rcharsProposedSolution').text(textlen + "/500");
});
$(document).on('keyup', '.textareaProposedSolution', function () {
    var maxLength = 500;
    debugger;
    var textlen = maxLength - $(this).val().length;

    $('#rcharsProposedSolution').text(textlen + "/500");
});

$(document).on('keyup', '#textareaTantativeBenefit', function () {
    var maxLength = 30;
    debugger;
    var textlen = maxLength - $(this).val().length;

    $('#rcharsTantativeBenefit').text(textlen + "/30");
});

$(document).on('keyup', '.textareaTantativeBenefit', function () {
    var maxLength = 30;
    debugger;
    var textlen = maxLength - $(this).val().length;

    $('#rcharsTantativeBenefit').text(textlen + "/30");
});


$(document).on('keyup', '.textareaRemark', function () {
    var maxLength = 100;
    debugger;
    var textlen = maxLength - $(this).val().length;

    $('#rcharsRemark').text(textlen + "/100");
});

$(document).on('keyup', '.textareaRemarkReject', function () {
    var maxLength = 100;
    debugger;
    var textlen = maxLength - $(this).val().length;

    $('#rcharsRemarkReject').text(textlen + "/100");
});
//$(document).ready(function () {
//    $('#demo').daterangepicker({
//        "startDate": "01/01/2005",
       
       
//    }, function (start, end, label) {
//        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
//    });
//});

