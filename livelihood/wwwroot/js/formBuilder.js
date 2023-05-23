var fieldCount = 1;
var schema = {};
var removedschema = {
    "fields": []
};
var MODAL_TEMPLATE = ' \
                        <div class="modal-header"> \
                            <h4 class="modal-title"></h4> \
                            <button type="button" class="close" data-dismiss="modal">&times;</button> \
                        </div> \
                        <div class="modal-body"> \
                        </div> \
                        <div class="modal-footer"> \
                        </div> \ ';

var FieldTypes = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/AppData/BasicControls.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();
var AdvancedControls = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/AppData/AdvancedControls.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();
var formsList = (function () {
    var json = null;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Form/GetForms',
        success: function (data) {
            formsList = data;
        },
        error: function (error) {
        }
    });
    return json;
})();
var repeatableFormList = (function () {
    var json = null;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Form/GetRepeatableForms',
        success: function (data) {
            repeatableFormList = data;
        },
        error: function (error) {
        }
    });
    return json;
})();
var PredefinedOptionsList = (function () {
    var json = null;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Form/GetPredefinedOptions',
        success: function (data) {
            PredefinedOptionsList = data;
        },
        error: function (error) {
        }
    });
    return json;
})();

$(document).ready(function () {
    schema = JSON.parse($('#Fields').val());
    setTimeout(function () {
        setup();
    }, 200);
});
var setup = function () {

    var refreshDesigner = function (callback) {
        $(".dropzone").remove();
        doRefresh($("#designerDiv"));
    }

    var doRefresh = function (el) {
        if (schema) {

            var i = 1;
            var div = "<div class='dropzone' data-id='1'></div>";
            for (x in schema.fields) {
                //document.getElementById("designerDiv").innerHTML += x;
                i++;
                var field = schema.fields[x];
                var fieldhtml = "";
                var extraclass = "";
                var disable = "";
                if (field.default != undefined || field.predefined != undefined) {
                    disable = "disabled";
                }
                if (field.type == "header") {
                    fieldhtml += field.html;
                    fieldhtml += "<a href='#' type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "' " + disable + "><i class='mdi mdi-lead-pencil'></i></a>";
                    fieldhtml += "<button type='button' class='btn ml-2 btn-secondary btn-xs markup-schema-remove' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "' " + disable + "><i class='mdi mdi-delete'></i></button>";
                }
                else if (field.type == "textarea") {
                    fieldhtml += "<label class='control-label'>" + field.label + "</label>";
                    //fieldhtml += "<textarea class='form-control' rows='5' cols='40' " + disable + "></textarea>";
                    if (disable == "") {
                        fieldhtml += "<button type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-lead-pencil'></i></button>";
                        fieldhtml += "<button type='button' class='btn ml-2 btn-secondary btn-xs markup-schema-remove' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-delete'></i></button>";
                    }
                }
                else if (field.type == "check") {
                    extraclass = "form-check";
                    //fieldhtml += "<label class='form-check-label'><input class='form-check-input' type='checkbox' checked " + disable + ">" + field.label + "</label>";
                    fieldhtml += "<label class='control-label'>" + field.label + "</label>";
                    if (disable == "") {
                        fieldhtml += "<button type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-lead-pencil'></i></button>";
                        fieldhtml += "<button type='button' class='btn ml-2 btn-secondary btn-xs markup-schema-remove' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-delete'></i></button>";
                    }
                }
                else if (field.fieldType == "multiSelectDropdown" || field.fieldType == "multiSelectLookup" || field.fieldType == "multiSelectList") {
                    fieldhtml += "<label class='control-label'>" + field.label + "</label>";
                    //fieldhtml += "<select multiple class='form-control' " + disable + "><option value=''>Option1</option><option value=''>Option2</option><option value=''>Option3</option></select>";
                    if (disable == "") {
                        fieldhtml += "<button type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-lead-pencil'></i></button>";
                        fieldhtml += "<button type='button' class='btn ml-2 btn-secondary btn-xs markup-schema-remove' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-delete'></i></button>";
                    }
                }
                else if (field.type == "select") {
                    fieldhtml += "<label class='control-label'>" + field.label + "</label>";
                    //fieldhtml += "<select class='form-control' " + disable + "><option value=''>--Select--</option></select>";
                    if (disable == "") {
                        fieldhtml += "<button type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-lead-pencil'></i></button>";
                        fieldhtml += "<button type='button' class='btn ml-2 btn-secondary btn-xs markup-schema-remove' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-delete'></i></button>";
                    }
                }
                else if (field.type == "radio") {
                    fieldhtml += "<label class='control-label'>" + field.label + "</label><br>";
                    //fieldhtml += "<input type='radio' value='none' " + disable + "> <label> None</label><br>";
                    if (disable == "") {
                        fieldhtml += "<button type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-lead-pencil'></i></button>";
                        fieldhtml += "<button type='button' class='btn ml-2 btn-secondary btn-xs markup-schema-remove' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-delete'></i></button>";
                    }
                }
                else if (field.fieldType == "autoNumber") {
                    if (field.enableAutoNumber == true) {
                        fieldhtml += "<label class='control-label'>" + field.label + "</label>";
                        //fieldhtml += "<input class='form-control' type='" + field.type + "'/>";
                        fieldhtml += "<button type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-lead-pencil'></i></button>";
                    }
                }
                else if (field.fieldType == "repeatableSection") {
                    fieldhtml += "<label class='control-label form-element-title'>" + field.label + "</label><br>";
                    
                    fieldhtml += "<button type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "' " + disable + "><i class='mdi mdi-lead-pencil'></i></button>";
                    fieldhtml += "<button type='button' class='btn ml-2 btn-secondary btn-xs markup-schema-remove' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "' " + disable + "><i class='mdi mdi-delete'></i></button>";
                }
                else /*if (field.type == "text" || field.type == "number" || field.type == "email" || field.type == "url")*/ {
                    fieldhtml += "<label class='control-label'>" + field.label + "</label>";
                    //fieldhtml += "<input class='form-control' type='" + field.type + "' " + disable + "/>";
                    if (disable == "") {
                        fieldhtml += "<button type='button' class='btn ml-auto btn-secondary btn-xs markup-schema-properties' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-lead-pencil'></i></button>";
                        fieldhtml += "<button type='button' class='btn ml-2 btn-secondary btn-xs markup-schema-remove' data-fieldId='" + x + "' data-lock='" + field.lock + "' data-lockKey='" + field.lockKey + "'><i class='mdi mdi-delete'></i></button>";
                    }
                }
                if (fieldhtml != "") {
                    div += "<div class='form-group interaction " + extraclass + "' data-id='" + x + "'>";
                    div += fieldhtml;
                    div += "</div>";
                    i++;
                    div += "<div class='dropzone' data-id='" + i + "'></div>";
                }
                else {
                    i--;
                }
            }
            $(el).html(div);
            $(".dropzone").droppable({
                "tolerance": "touch",
                "drop": function (event, ui) {
                    var draggable = $(ui.draggable);
                    if (draggable.hasClass("form-element")) {
                        var dataType = draggable.attr("data-type");
                        var fieldType = draggable.attr("data-field-type");
                        var dropzoneid = $(this).attr("data-id");

                        // now do the insertion
                        insertField(dataType, fieldType, dropzoneid);
                    }
                    else if (draggable.hasClass('interaction')) {
                        var draggedIndex = $(draggable).attr("data-id");
                        var dropzoneIndex = $(this).attr("data-id");
                        positionchange(dropzoneIndex, draggedIndex);
                    }

                },
                "over": function (event, ui) {
                    $(event.target).addClass("dropzone-hover");
                },
                "out": function (event, ui) {
                    $(event.target).removeClass("dropzone-hover");
                }
            });
            $(".interaction").draggable({
                "appendTo": "body",
                "helper": "clone",
                "cursorAt": {
                    "top": 100
                },
                "zIndex": 300,
                "refreshPositions": true,
                "start": function (event, ui) {
                    $(".dropzone").addClass("dropzone-highlight");
                },
                "stop": function (event, ui) {
                    $(".dropzone").removeClass("dropzone-highlight");
                }
            });
            $(".markup-schema-properties").on('click', function (event) {
                var locked = $(this).attr("data-lock")
                if (locked == "true") {
                    if (window.prompt("Field locked. Enter Password", "") == $(this).attr("data-lockKey")) {
                        loadProperties($(this).attr("data-fieldId"))
                        //$('#myModal').modal('show');
                    }
                    else {
                        alert("Wrong Password.")
                    }
                }
                else {
                    loadProperties($(this).attr("data-fieldId"))
                    $('#myModal').modal('show');
                }
            });
            $(".markup-schema-remove").on('click', function (event) {
                var locked = $(this).attr("data-lock")
                if (locked == "true") {
                    if (window.prompt("Field locked. Enter Password", "") == $(this).attr("data-lockKey")) {
                        removeProperties($(this).attr("data-fieldId"))
                    }
                    else {
                        alert("Wrong Password.")
                    }
                }
                else {
                    removeProperties($(this).attr("data-fieldId"))
                }
            });
        }
    };
    var insertField = function (dataType, fieldType, dropzoneid) {
        var itemSchema = {
            "type": dataType
        };
        var itemOptions = {};
        if (fieldType) {
            itemOptions.type = fieldType;
        }
        itemOptions.label = "New ";
        if (fieldType) {
            itemOptions.label += fieldType + fieldCount;
        }
        else if (dataType) {
            itemOptions.label += dataType;
        }


        fieldCount++;
        var _schema = {
            "fields": []
        };
        var j = 1;
        var i = 0;

        var d = new Date();
        var fieldname = fieldType + d.getFullYear() + (d.getMonth() + 1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds();
        var fieldproperties = {};
        if (FieldTypes[fieldType] == undefined)
            fieldproperties = JSON.parse(JSON.stringify(AdvancedControls[fieldType]));
        else
            fieldproperties = JSON.parse(JSON.stringify(FieldTypes[fieldType]));
        fieldproperties.name = fieldname;
        if (fieldType != "header")
            fieldproperties.label = itemOptions.label;

        
        for (x in schema.fields) {
            
            if (j == parseInt(dropzoneid)) {
                i++;
                _schema.fields.push(fieldproperties);
            }
            j++;
            i++;
            _schema.fields.push(schema.fields[x]);
            j++;
            if (j == parseInt(dropzoneid)) {
                i++;
                _schema.fields.push(fieldproperties);
                j++;
            }
        }

        schema = JSON.parse(JSON.stringify(_schema, null, "    "));

        regenerate();

    };
    var positionchange = function (dropzoneIndex, draggedIndex) {
        var _schema = {
            "fields": []
        };
        var draggedschema = schema.fields[draggedIndex];
        delete schema.fields[draggedIndex];
        var j = 1;
        var i = 0;
        var dragfieldadded = false;
        for (x in schema.fields) {
            if (x == "0") {
                _schema.fields.push(schema.fields[x]);
                i++;
            } else {
                if (j == parseInt(dropzoneIndex)) {
                    i++;
                    _schema.fields.push(draggedschema);
                    dragfieldadded = true;
                }
                j++;
                i++;
                _schema.fields.push(schema.fields[x]);
                j++;
                if (Object.keys(schema.fields).length < parseInt(dropzoneIndex) && (i == Object.keys(schema.fields).length) && (dragfieldadded == false)) {
                    i++;
                    _schema.fields.push(draggedschema);
                    j++;
                }
            }
        }
        schema = JSON.parse(JSON.stringify(_schema, null, "    "));

        regenerate();
    }
    var regenerate = function () {
        setTimeout(function () {
            //refresh();
            refreshDesigner();
        }, 100);
    };
    var loadProperties = function (fieldId) {
        $(".properties-body").html('<h3 class="card-title">properties</h3>');
        var fieldData = schema.fields[fieldId];

        var newfieldproperties = {};
        if (FieldTypes[fieldData.fieldType] == undefined)
            newfieldproperties = JSON.parse(JSON.stringify(AdvancedControls[fieldData.fieldType]));
        else
            newfieldproperties = JSON.parse(JSON.stringify(FieldTypes[fieldData.fieldType]));
        for (x in fieldData) {
            newfieldproperties[x] = fieldData[x];
        }
        fieldData = newfieldproperties;

        var modal = $(MODAL_TEMPLATE.trim());
        var title = fieldData.fieldType.replace(/([A-Z])/g, ' $1').trim();
        title = title.charAt(0).toUpperCase() + title.slice(1);
        //$('#modalContent').html(modal);
        //$(".modal-title").append(title);
        for (x in fieldData) {
            var label = x.replace(/([A-Z])/g, ' $1').trim();
            label = label.charAt(0).toUpperCase() + label.slice(1);
            var div = "";
            if (label == "Lock")
                label = "Field Lock";
            if (x == "required" || x == "readonly" || x == "noDuplicate" || x == "lock" || x == "visible" || x == "enableAutoNumber" || x == "allowPast" || x == "allowFuture") {
                var checked = "";
                if (fieldData[x])
                    checked = "checked";
                div += "<div class='form-group form-check'>";
                div += "<label class='form-check-label'><input class='form-check-input markup-property-name' type='checkbox' id='" + x + "' " + checked + "> " + label + "</label>";
                div += "</div>";
            }
            else if (x == "minLength" || x == "maxLength" || x == "minValue" || x == "maxValue" || x == "startingNumber") {
                div += "<div class='form-group'>";
                div += "<label class='control-label'>" + label + "</label>";
                div += "<input class='form-control markup-property-name' id='" + x + "' type='number' value = '" + fieldData[x] + "'/>";
                div += "</div>";
            }
            else if (x == "selectList" && (fieldData.fieldType == "list" || fieldData.fieldType == "multiSelectList")) {
                div += "<div class='form-group'>";
                div += "<label class='control-label'>" + label + "</label>";
                div += "<select class='form-control options-drop markup-property-name' id='" + x + "'/>";
                if (PredefinedOptionsList) {
                    for (d in PredefinedOptionsList) {
                        div += "<option value='" + PredefinedOptionsList[d].id + "'>" + PredefinedOptionsList[d].name + "</option>";
                    }
                }
                div += "</select></div>";
                //div += "<textarea class='form-control options-textarea' id='" + x + "' rows='5' cols='40' placeholder='Enter options with comma separated' readonly></textarea>";
                div += "</div>";
            }
            else if (x == "choices") {
                div += "<div class='form-group'>";
                div += "<label class='control-label'>" + label + "</label>";
                div += "<textarea class='form-control markup-property-name' id='" + x + "' rows='5' cols='40' placeholder='Enter options with comma separated'>" + fieldData[x] + "</textarea>";
                div += "</div>";
            }
            else if (x == "importDataFrom") {
                div += "<div class='form-group'>";
                div += "<label class='control-label'>" + label + "</label>";
                div += "<select class='form-control forms-drop markup-property-name' id='" + x + "'/>";
                if (formsList) {
                    for (d in formsList.results) {
                        div += "<option value='" + formsList.results[d].id + "'>" + formsList.results[d].text + "</option>";
                    }
                }
                div += "</select></div>";

                div += "<div class='form-group'>";
                div += "<label class='control-label'>Display Field</label>";
                div += "<select class='form-control displayField-drops markup-property-name' id='displayField'/></select>"
                div += "</div>";

                div += "<div class='form-group' style='display:none'>";
                div += "<label class='control-label'>Value Field</label>";
                div += "<select class='form-control valueField-drops markup-property-name' id='valueField'/></select>"
                div += "</div>";
            }
            else if (x == "displayField") {

            }
            else if (x == "valueField") {

            }
            else if (x == "formSubmission")
            {
                div += "<div class='form-group'>";
                div += "<label class='control-label'>" + label + "</label>";
                div += "<select class='form-control formSubmission-drop markup-property-name' id='" + x + "'/>";
                if (repeatableFormList) {
                    for (d in repeatableFormList.results) {
                        div += "<option value='" + repeatableFormList.results[d].id + "'>" + repeatableFormList.results[d].text + "</option>";
                    }
                }
                div += "</select></div>";
            }
            else if (x == "lockKey") {
                div += "<div class='form-group'>";
                div += "<label class='control-label'>Field Lock Password</label>";
                div += "<input class='form-control markup-property-name' id='" + x + "' type='password' value = '" + fieldData[x] + "'/>";
                div += "</div>";
            }
            else if (x != "fieldType" && x != "type" && x != "name" && x != "default") {
                div += "<div class='form-group'>";
                div += "<label class='control-label'>" + label + "</label>";
                div += "<input class='form-control markup-property-name' id='" + x + "' type='text' value = '" + fieldData[x] + "'/>";
                div += "</div>";
            }
            if (div != "")
                $(".properties-body").append($(div.trim()));//$(".modal-body").append($(div.trim()));
            if (x == "importDataFrom") {

                $(".forms-drop").change(function (event) {
                    $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: '/Form/GetFields',
                        data: { FormId: parseInt($('.forms-drop').val()) },
                        success: function (data) {
                            $('.displayField-drops').html('');
                            $('.valueField-drops').html('');
                            $('.valueField-drops').append("<option value='0'>Id</option>");
                            for (d in data.results) {
                                $('.displayField-drops').append("<option value='" + data.results[d].id + "'>" + data.results[d].text + "</option>");
                                $('.valueField-drops').append("<option value='" + data.results[d].id + "'>" + data.results[d].text + "</option>");
                            }


                            if (fieldData["displayField"] != "") {
                                $('.displayField-drops').val(fieldData["displayField"]);
                            }
                            if (fieldData["valueField"] != "") {
                                $('.valueField-drops').val(fieldData["valueField"]);
                            }
                        },
                        error: function (error) {
                        }
                    });
                });
                if (fieldData[x] != "") {
                    $('.forms-drop').val(fieldData[x]);
                }
                $('.forms-drop').change();
            }
            else if (x == "selectList" && fieldData.fieldType == "list") {
                //$(".options-drop").change(function (event) {
                //    $('.options-textarea').val($('.options-drop').val());
                //});
                if (fieldData[x] != "") {
                    $('.options-drop').val(fieldData[x]);
                }
                $('.options-drop').change();
            }
            else if (x == "formSubmission") {
                if (fieldData[x] != "") {
                    $('.formSubmission-drop').val(fieldData[x]);
                }
                $('.formSubmission-drop').change();
            }
        }
        $(".properties-body").append("<button type='button' class='btn btn-primary markup-properties-ok' data-fieldId='" + fieldId + "'>Save</button>");
        //$(".modal-footer").append("<button type='button' class='btn btn-primary markup-properties-ok' data-fieldId='" + fieldId + "'>Save</button>");
        //$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
        $(".markup-properties-ok").on('click', function (event) {
            var propValid = true;
            var lockEnable = false;
            var enableAutoNumber = false;
            $(".markup-property-name").each(function () {
                $(this).removeClass('border-danger');
                fieldData[$(this).attr("id")] = $(this).val();
                if ($(this).attr("type") == "checkbox")
                    fieldData[$(this).attr("id")] = $(this).is(":checked");
                if (($(this).attr("id") == "label" || "choices" == $(this).attr("id") || "importDataFrom" == $(this).attr("id") || "displayField" == $(this).attr("id") || "valueField" == $(this).attr("id") || "selectList" == $(this).attr("id")) && $(this).val() == "") {
                    $(this).addClass('border-danger');
                    propValid = false;
                }
                if (enableAutoNumber == true) {
                    if ($(this).attr("id") == "Prefix" && $(this).val() == "") {
                        $(this).addClass('border-danger');
                        propValid = false;
                    }
                    if ($(this).attr("id") == "startingNumber" && ($(this).val() == "" || $(this).val() == "0")) {
                        $(this).addClass('border-danger');
                        propValid = false;
                    }
                }
                if ($(this).attr("id") == "lock" && $(this).is(":checked") == true) {
                    lockEnable = true;
                }
                if ($(this).attr("id") == "enableAutoNumber" && $(this).is(":checked") == true) {
                    enableAutoNumber = true;
                }
                if ($(this).attr("id") == "lock" && $(this).is(":checked") == true) {
                    lockEnable = true;
                }
                if (lockEnable == true && $(this).attr("id") == "lockKey" && $(this).val() == "") {
                    $(this).addClass('border-danger');
                    propValid = false;
                }
            });

            if (propValid) {
                schema.fields[fieldId] = fieldData;
                //$('#myModal').modal('hide');
                $(".properties-body").html('<h3 class="card-title">properties</h3>');
                regenerate();
            }
        });
    };
    var removeProperties = function (fieldId) {
        var _schema = {
            "fields": []
        };
        var deleteschema = schema.fields[fieldId];
        delete schema.fields[fieldId];
        removedschema.fields.push(deleteschema);
        for (x in schema.fields) {
            _schema.fields.push(schema.fields[x]);
        }
        schema = JSON.parse(JSON.stringify(_schema, null, "    "));
        regenerate();
    };
    setTimeout(function () {
        refreshDesigner();
    }, 50);

    var types = [{
        "fieldType": "singleLine",
        "type": "text",
        "title": "Single Line",
        "description": "A textual property"
    }, {
        "fieldType": "number",
        "type": "number",
        "title": "Number",
        "description": "A numerical property"
    }, {
        "fieldType": "decisionBox",
        "type": "check",
        "title": "Decision Box",
        "description": "A true/false property"
    }];

    for (var a in FieldTypes) {
        var title = FieldTypes[a].label;
        var type = FieldTypes[a].type;
        var fieldType = FieldTypes[a].fieldType;
        if (fieldType == "header")
            title = "Header";
        if (fieldType != "autoNumber") {
            var div = $("<div class='form-element draggable ui-widget-content' data-type='" + type + "' data-field-type='" + fieldType + "'></div>");
            $(div).append("<div><span class='form-element-title'>" + title + "</span> </div>");

            $("#types").append(div);
        }
    }
    for (var a in AdvancedControls) {
        var title = AdvancedControls[a].label;
        var type = AdvancedControls[a].type;
        var fieldType = AdvancedControls[a].fieldType;

        var div = $("<div class='form-element draggable ui-widget-content' data-type='" + type + "' data-field-type='" + fieldType + "'></div>");
        $(div).append("<div><span class='form-element-title'>" + title + "</span> </div>");

        $("#advanced").append(div);
    }
    //for (var i = 0; i < types.length; i++) {
    //    var title = types[i].title;
    //    var type = types[i].type;
    //    var fieldType = types[i].fieldType;
    //    var description = types[i].description;

    //    var div = $("<div class='form-element draggable ui-widget-content' data-type='" + type + "' data-field-type='" + fieldType + "'></div>");
    //    $(div).append("<div><span class='form-element-title'>" + title + "</span> </div>"); /*(<span class='form-element-type'>" + type + "</span>)*/
    //    //$(div).append("<div class='form-element-field-description'>" + description + "</div>");

    //    $("#types").append(div);
    //}

    $(".form-element").draggable({
        "appendTo": "body",
        "helper": "clone",
        "zIndex": 300,
        "refreshPositions": true,
        "start": function (event, ui) {
            $(".dropzone").addClass("dropzone-highlight");
        },
        "stop": function (event, ui) {
            $(".dropzone").removeClass("dropzone-highlight");
        }
    });
};
var Submit = function () {
    $('#Fields').val(JSON.stringify(schema));
    if (removedschema.fields.length > 0) {
        $('#RemovedFields').val(JSON.stringify(removedschema));
    };
    $("#btnSubmit").click();
};