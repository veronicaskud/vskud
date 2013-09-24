function GetAllUnits() {
    var returnMe;
    $.ajax({
        type: "POST",
        url: "/Services/Units.asmx/GetAllUnits",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            returnMe = data.d;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('There has been a problem accesing user data.  Support personel have been notified.');
        }
    });
    return returnMe;
}




function GetCurrentUser(thisUserName) {
    if (thisUserName != null) {
        thisUserName = thisUserName.replace('\\', 'BackwardSlash');
       // console.log(thisUserName);
        var returnMe;
        $.ajax({
            type: "POST",
            url: "/services/User.asmx/GetUserByName",
            data: "{'userName':'" + thisUserName + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                returnMe = data.d;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing user data.  Support personel have been notified.');
            }
        });
    }
    return returnMe;
}

function GetMenuForCurrentUser() {
    var returnMe;
    $.ajax({
        type: "POST",
        url: "/Services/User.asmx/GetMenuForCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            returnMe = data.d;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert('There has been a problem accesing user data.  Support personel have been notified.');
        }
    });
    return returnMe;
}

function GetPeriodsForThisTeacher() {
    var returnMe;
    $.ajax({
        type: "POST",
        url: "/Services/Period.asmx/GetPeriodsForThisTeacher",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            returnMe = data.d;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('There has been a problem accesing user data.  Support personel have been notified.');
        }
    });
    return returnMe;
}


function GetStudentsForCurrentTeacherAndThisPeriod(periodID) {
    var returnMe;
    $.ajax({
        type: "POST",
        url: "/Services/Period.asmx/GetStudentsForCurrentTeacherAndThisPeriod",
        data: "{ 'PeriodID':'" + periodID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            returnMe = data.d;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('There has been a problem accesing user data.  Support personel have been notified.');
        }
    });
    return returnMe;
}


function UpdateThisUser(thisUser) {
    var parsedDate = new Date(parseInt(thisUser.TimeMessagesViewedLast.substr(6)));
    thisUser.TimeMessagesViewedLast = parsedDate;
    var passthis = JSON.stringify(thisUser);
    $.ajax({
        type: "POST",
        url: "/Services/User.asmx/UpdateThisUser",
        data: "{ 'userToUpdate':'" + passthis + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('There has been a problem accesing user data.  Support personel have been notified.');
        }
    });
}