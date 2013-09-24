var BHP = BHP || {};  ///This sets up the namespace we use in the names below.

BHP.Constants = function () {
    var Public = {
        TEACHER_ROLE: "extranet\\Big History Teacher",
        STUDENT_ROLE: "extranet\\Big History Student",
        EDUCATORBETA_ROLE: "extranet\\Big History Educator Beta",
        ANONYMOUS_ACCOUNT: "extranet\\Anonymous"
    }
    return Public;
} ();


BHP.Global = function () {
    var privateCurrentUser;
    var ResetUser = function () {
        privateCurrentUser = BHP.Services.GetCurrentUser();
    }

    var CurrentUser = function () {
        if (privateCurrentUser == null) {
            privateCurrentUser = BHP.Services.GetCurrentUser();
        }
        return privateCurrentUser;
    }

    var CacheKey = function () {
        var randomnumber = Math.floor(Math.random() * 1000)
        return randomnumber;
    }


    var ResetUnitRouter;
    var Public = {
        ResetUser: ResetUser,
        CurrentUser: CurrentUser,
        ResetUnitRouter: ResetUnitRouter,
        CacheKey: CacheKey

    }
    return Public;
} ();




///All of the non-backbone service calls for BHP.  Try not to access these directly, as they make a new call every time.  Instead, find the appropriate variable in BHP.Global.
BHP.Services = function () {
    var GetCurrentUser = function () {
        var ReturnMe;
        $.ajax({
            type: "GET",
            url: "/userservices/user/",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                ReturnMe = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing user data.  Support personel have been notified.');
            }
        });










        return ReturnMe;
    }


    var GetThisUser = function (thisUser) {
        var ReturnMe;
        $.ajax({
            type: "GET",
            url: "/userservices/user/?user=" + thisUser,
            contentType: "text/plain; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                ReturnMe = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing user data.  Support personel have been notified.');
            }
        });
        return ReturnMe;
    }

    var RemoveThisUser = function (thisUser) {
        //var parsedDate = new Date(parseInt(thisUser.TimeMessagesViewedLast.substr(6)));
        //thisUser.TimeMessagesViewedLast = parsedDate;
        var ReturnMe;
        var passthis = JSON.stringify(thisUser);
        $.ajax({
            type: "DELETE",
            url: "/userservices/user/",
            data: "{\"userID\": " + JSON.stringify(thisUser) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                ReturnMe = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing user data.  Support personel have been notified.');
            }
        });
        return ReturnMe;
    }

    var UpdateThisUser = function (thisUser) {
        //var parsedDate = new Date(parseInt(thisUser.TimeMessagesViewedLast.substr(6)));
        //thisUser.TimeMessagesViewedLast = parsedDate;
        var passthis = JSON.stringify(thisUser);
        $.ajax({
            type: "POST",
            url: "/userservices/user/",
            data: "{\"userToUpdate\": " + JSON.stringify(passthis) + "}",
            contentType: "text/plain; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data) {

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing user data.  Support personel have been notified.');
            }
        });
    }

    var GetMessages = function (argURL) {
        //var parsedDate = new Date(parseInt(thisUser.TimeMessagesViewedLast.substr(6)));
        //thisUser.TimeMessagesViewedLast = parsedDate;
        /// var passthis = JSON.stringify(addressList);
        var returnMe;
        $.ajax({
            type: "GET",
            url: argURL,
            contentType: "text/plain; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                returnMe = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing server data.  Support personel have been notified.');
            }
        });
        return returnMe;
    }

    var DeletePeriodByID = function (argURL) {
        //var parsedDate = new Date(parseInt(thisUser.TimeMessagesViewedLast.substr(6)));
        //thisUser.TimeMessagesViewedLast = parsedDate;
        /// var passthis = JSON.stringify(addressList);

        var returnMe = '';
        $.ajax({
            type: "GET",
            url: argURL,
            contentType: "text/plain; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data) {
                returnMe = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing server data.  Support personel have been notified.');
            }
        });
        return returnMe;
    }


    var GetMatchingEmailAddresses = function (addressList) {
        //var parsedDate = new Date(parseInt(thisUser.TimeMessagesViewedLast.substr(6)));
        //thisUser.TimeMessagesViewedLast = parsedDate;
        /// var passthis = JSON.stringify(addressList);
        var returnMe = '';
        $.ajax({
            type: "GET",
            url: "/userservices/validation/?matchnames=" + encodeURIComponent(addressList),
            contentType: "text/plain; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                returnMe = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing server data.  Support personel have been notified.');
            }
        });
        return returnMe;
    }

    var ResetPW = function (emailAddress) {
        var returnMe = '';
        $.ajax({
            type: "POST",
            url: "/userservices/password/?email=" + emailAddress,
            contentType: "text/plain; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                returnMe = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing server data.  Support personel have been notified.');
            }
        });
        return returnMe[0];
    }

    var PutTest = function (periodList) {
        var passthis = JSON.stringify(periodList);
        var returnMe = '';
        $.ajax({
            type: "PUT",
            url: "/userservices/period/all/68C649D0-81CB-4E9A-8AB9-C16EDA532551",
            data: "{\"bhPeriodList\": " + JSON.stringify(periodList) + "}",
            contentType: "text/plain; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                returnMe = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There has been a problem accesing server data.  Support personel have been notified.');
            }
        });
        return returnMe[0];
    }

    var Public = {
        GetCurrentUser: GetCurrentUser,
        UpdateThisUser: UpdateThisUser,
        GetMatchingEmailAddresses: GetMatchingEmailAddresses,
        DeletePeriodByID: DeletePeriodByID,
        ResetPW: ResetPW,
        GetMessages: GetMessages,
        PutTest: PutTest,
        GetThisUser: GetThisUser,
        RemoveThisUser: RemoveThisUser
    }

    return Public;
} ();













BHP.CacheHelpers = function () {
    var ClientReset = function (itemCollection, singleItem) {
        var returnMe = Math.floor(Math.random() * 11)
        return returnMe;
    }
    var Public = {
        ClientReset: ClientReset
    }
    return Public;

} ();














BHP.Helpers = function () {
    var Contains = function (itemCollection, singleItem) {
        var returnMe = false;
        if (itemCollection !== undefined && itemCollection.length > 0) {
            for (var i = 0; i < itemCollection.length; i++) {
                if (itemCollection[i] == singleItem) {
                    returnMe = true;
                }
            }
        }
        return returnMe;
    }

    var getNonDomainUsername = function (username) {
        if (typeof username === String && username.length > 9) {
            username = username.substring(9);
        }
        return username;
    }

    var SetTeacherMessageCount = function () {
        //        var messageCollection = BHP.MessagesCollection();
        //        messageCollection.fetch({
        //            type: 'GET',
        //            contentType: "application/json; charset=utf-8"
        //        });
        //        var iUnReadCount = 0;
        //        for (var i = 0; i < messageCollection.length; i++) {
        //            if (!messageCollection.models[i].attributes.Read) {
        //                iUnReadCount = iUnReadCount + 1;
        //            }
        //        }
        //        if (iUnReadCount < 1) {
        //            $('.unreadMessageCount').toggle(false);
        //        } else {
        //            $('.unreadMessageCount').toggle(true);
        //            $('.unreadMessageCount').text(iUnReadCount);
        //        }
    }

    var ToggleOpacity = function (thisID, status) {
        if (status != 'undefined') {
            thisID = thisID.replace(/[{}]/g, '\\$&'); /// this escapes any brackets in javascript
            $(thisID).removeClass('opacitystatus0');
            $(thisID).removeClass('opacitystatus1');
            $(thisID).addClass('opacitystatus' + status);
        }

    }

    var ToggleStatus = function (thisStatus) {
        if (thisStatus > 0) {
            return 0;
        } else {
            return 1;
        }
    }


    var SpliceArray = function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    function ValidateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var validateNewPeriod = function (periodToValidate) {
        var studentLength = periodToValidate.Students.length;
        var keepers = new Array();
        var keepersCount = 0;
        var listOfEmailsToValidateAgainstTheService = '';
        ////first build a new array of "keepers", meaning valid email addresses.
        for (var i = 0; i < studentLength; i++) {
            if (BHP.Helpers.ValidateEmail(periodToValidate.Students[i].Email)) {
                keepers[keepersCount] = periodToValidate.Students[i];
                listOfEmailsToValidateAgainstTheService = listOfEmailsToValidateAgainstTheService + periodToValidate.Students[i].Email + ',';
                keepersCount = keepersCount + 1;
            }
        }
        var keepersLength = keepers.length;
        var allEmailsAreValid = (keepers.length == periodToValidate.Students.length);
        var alreadyHaveAccounts = '';
        if (listOfEmailsToValidateAgainstTheService.length > 0) {
            alreadyHaveAccounts = BHP.Services.GetMatchingEmailAddresses(listOfEmailsToValidateAgainstTheService);  //// service returns a list of account names that MATCH the existing list.
        }
        alreadyHaveAccounts = alreadyHaveAccounts + '';
        if ((!allEmailsAreValid) || (alreadyHaveAccounts.length > 0)) {
            alert('Some of the email addresses you provided were invalid.  The period has been created without those email addresses.');
        }
        alert(alreadyHaveAccounts);
        return true;
    }

    var Public = {
        SetTeacherMessageCount: SetTeacherMessageCount,
        Contains: Contains,
        ToggleOpacity: ToggleOpacity,
        ToggleStatus: ToggleStatus,
        SpliceArray: SpliceArray,
        ValidateEmail: ValidateEmail,
        validateNewPeriod: validateNewPeriod
    }
    return Public;

} ();


BHP.ObjectHelper = function (paramMainObject) {
    ///Returns any object at any level with the matching ID
    this.GetChildObjectWithThisMatch = function (paramMember, paramValue) {
        return _GetChildObjectWithThisMatch(paramMainObject, paramMember, paramValue);
    };

    ///If the item is already a collection, then it returns it without any changes. If the item as not a collection, the it returns a collection with the object as the 0 item.
    this.ReturnAsCollection = function () {
        return _ReturnAsCollection(paramMainObject);
    };

    ///See the public member for comments
    var _returnChildObject;
    function _GetChildObjectWithThisMatch(paramObject, paramThisMember, paramThisValue) {
        paramThisValue = paramThisValue.trim();
        var thisCollection = _ReturnAsCollection(paramObject);
        for (var i = 0; i < thisCollection.length; i++) {
            if (_returnChildObject == null) {
                for (var key in thisCollection[i]) {
                    if ((key.toLowerCase() == paramThisMember.toLowerCase()) && thisCollection[i][key].toLowerCase() == paramThisValue.toLowerCase()) {
                        _returnChildObject = thisCollection[i];
                    } else {
                        if (thisCollection[i][key] != null) {
                            if (thisCollection[i][key].toString().indexOf("object") != -1) {
                                var thisOneCollection = _ReturnAsCollection(thisCollection[i][key]);
                                for (var ii = 0; ii < thisOneCollection.length; ii++) {
                                    _returnChildObject = _GetChildObjectWithThisMatch(thisCollection[i][key][ii], paramThisMember, paramThisValue);
                                }
                            }
                        }
                    }
                }
            }
        }
        return _returnChildObject;
    } ///End _GetChildObjectWithThisMatch

    ///See the public member for comments
    function _ReturnAsCollection(thisObject) {
        var returnMe = [];
        //   if ($(thisObject).size() < 2) {
        if (thisObject instanceof Array) {

            returnMe = thisObject;
        } else {
            returnMe.push(thisObject);
        }
        return returnMe;
    } //End _ReturnAsCollection

} (); //End ObjectHelper

BHP.ClearOmnitureVariables = function () {
    if (typeof s != 'undefined') {
        s.pageName = "";
        s.channel = "";
        s.prop1 = "";
        s.prop2 = "";
        s.prop3 = "";
        s.prop4 = "";
        s.prop5 = "";
        s.prop9 = "";
        s.prop10 = "";
        s.events = "";
        s.eVar2 = "";
        s.eVar3 = "";
        s.eVar4 = "";
        s.eVar6 = "";
        s.eVar7 = "";
        s.eVar8 = "";
        s.eVar10 = "";
    }
}