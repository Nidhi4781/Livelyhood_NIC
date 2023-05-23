$(document).ready(function () {
    $("#EmployeeId").change(function () {
        var settings = {
            "url": "/ConfigurationConsole/GetEmployeesfromMyIb?EmployeeId=" + $('#EmployeeId').val(),
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.isSuccess) {
                var data = response.data;
                $('#FirstName').val(data.firstName);
                $('#LastName').val(data.lastName);
                $('#Email').val(data.email);
                $('#PhoneNumber').val(data.phone);
                $('#Role').val(data.role);
                $('#Department').val(data.department);
                $('#SubDepartment').val(data.subDepartment);
                $('#BusinessUnit').val(data.businessUnit);
                $('#Location').val(data.location);
                $('#Designation').val(data.designation);
                $('#ManagerName').val(data.manager.firstName);
                $('#HODName').val(data.hod.firstName);
                $('#DirectorName').val(data.director.firstName);
                $('#Manager').val(data.manager.employeeID);
                $('#HOD').val(data.hod.employeeID);
                $('#Director').val(data.director.employeeID);
            }
            else {
                $('#FirstName').val('');
                $('#LastName').val('');
                $('#Email').val('');
                $('#PhoneNumber').val('');
                $('#Role').val('');
                $('#Department').val('');
                $('#SubDepartment').val('');
                $('#BusinessUnit').val('');
                $('#Location').val('');
                $('#Designation').val('');
                $('#ManagerName').val('');
                $('#HODName').val('');
                $('#DirectorName').val('');
                $('#Manager').val('');
                $('#HOD').val('');
                $('#Director').val('');
            }
        });
    });
});