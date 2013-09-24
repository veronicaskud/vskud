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
/*=========== Messages ==============*/
BHP.MessagesModel = Backbone.Model.extend();
BHP.MessagesCollection = Backbone.Collection.extend({
    model: BHP.MessagesModel,
    url: '/userservices/message/messages/' + BHP.Global.CurrentUser().MembershipUserKey,
    parse: function (data) {
        var items = data
        return items;
    }
});
///end MessagesCollection

BHP.MessagesView = Backbone.View.extend({
    template: '/TeacherConsole/tcMessages.html',
    collection: new BHP.MessagesCollection(),
    serialize: function () {
        return { messages: this.collection.toJSON() };
    },
    initialize: function () {
        $(this.el).unbind().empty();
        this.listenTo(this.collection, 'sync', this.render);
        this.collection.fetch({
            type: "GET",
            contentType: "application/json; charset=utf-8"
        });
    },
    events: {
        'click .messageHeader': 'readMessage'
    },
    readMessage: function (e) {
        $('.messageContent').toggle(false);
        $(e.currentTarget).parents('.allMessage').find('.messageContent').toggle();
        $(e.currentTarget).parents('.allMessage').find('.newMessage').html('');
        var id = $(e.currentTarget).parents('.allMessage').attr('data-id').valueOf();
        for (var i = 0; i < this.collection.length; i++) {
            if (this.collection.models[i].attributes.ID == id) {
                this.collection.models[i].attributes.Read = true;
            }
        }
        Backbone.sync('update', this.collection, null);
        this.setCount();
    },
    setCount: function () {
        var iUnReadCount = 0;
        for (var i = 0; i < this.collection.length; i++) {
            if (!this.collection.models[i].attributes.Read) {
                iUnReadCount = iUnReadCount + 1;
            }
        }
        if (iUnReadCount < 1) {
            $('.unreadMessageCount').toggle(false);
        } else {
            $('.unreadMessageCount').toggle(true);
            $('.unreadMessageCount').text(iUnReadCount);
        }
    },
    afterRender: function () {
        $('.messageContent').toggle(false);
        this.setCount();
        $('.messageContent').first().toggle(true);
    }
});
///End MessagesView



////BHP.MetaPeriodModel = Backbone.Model.extend();

BHP.MetaPeriodsModel = Backbone.Model.extend({
    url: '/userservices/period/meta/' + BHP.Global.CurrentUser().CourseID,
    parse: function (data) {
        return data;
    }
});

BHP.NewPeriodView = Backbone.View.extend({
    template: '/TeacherConsole/createPeriod.html',
    initialize: function () {
        this.listenTo(this.model, "sync", this.render);
        this.model.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    events: {
        'click #createPeriodHead': 'toggleMeOn',
        'click #cancelPeriodCreate': 'toggleMeOff',
        'click #createNewPeriod': 'createNewPeriod'
    },
    afterRender: function () {
        this.addNames();
        $("#createPeriodForm").toggle(false);
        $("#createPeriodHead").toggle(true);
        $(':text').placeholderFix();
    },
    addNames: function () {
        if (this.model.attributes.AvailablePeriodNames != null) {
            if (this.model.attributes.AvailablePeriodNames.length > 0) {
                $('.newPeriodName').text(this.model.attributes.AvailablePeriodNames[0]);
            } else {
                $("#createPeriodContainer").toggle(false);
            }
        } else {
            $("#createPeriodContainer").toggle(false);
        }
    },
    toggleMeOn: function () {
        $("#createPeriodForm").toggle();
        $("#createPeriodHead").toggle();

        //Center the new period.
        $("body,html").animate({ scrollTop: ($('#createPeriodContainer').offset().top) }, 200)

        // Omniture stuff
        BHP.ClearOmnitureVariables();
        var s = s_gi(s_account);
        s.linkTrackVars = "events";
        s.linkTrackEvents = "event7";
        s.events = "event7";
        s.tl(this, 'o', "[Add Period]");
        // End omniture stuff
    },
    toggleMeOff: function () {
        $("#createPeriodForm").toggle();
        $("#createPeriodHead").toggle();
    },
    serialize: function () {
        return { newperiod: this.model };
    },
    validateNewPeriod: function (periodToValidate) {
        var studentLength = periodToValidate.Students.length;
        var keepers = new Array();
        var keepersCount = 0;
        var badEmail = '';
        var listOfEmailsToValidateAgainstTheService = '';
        ////first build a new array of "keepers", meaning valid email addresses.
        for (var i = 0; i < studentLength; i++) {
            if (periodToValidate.Students[i].Email.length > 3) {
                if (BHP.Helpers.ValidateEmail(periodToValidate.Students[i].Email)) {
                    keepers.push(periodToValidate.Students[i]);
                    listOfEmailsToValidateAgainstTheService = listOfEmailsToValidateAgainstTheService + periodToValidate.Students[i].Email + ',';
                    keepersCount = keepersCount + 1;
                } else {
                    if (periodToValidate.Students[i].Email.length > 0) {
                        if (periodToValidate.Students[i].Email != 'Email') {

                            badEmail = badEmail + periodToValidate.Students[i].Email + ',';
                        }
                    }
                }
            }
        }

        var keepersLength = keepers.length;
        var allEmailsAreValid = (keepers.length == periodToValidate.Students.length);
        var alreadyHaveAccounts = '';
        if (listOfEmailsToValidateAgainstTheService.length > 0) {
            alreadyHaveAccounts = BHP.Services.GetMatchingEmailAddresses(listOfEmailsToValidateAgainstTheService);  //// service returns a list of account names that MATCH the existing list.
        }

        var badEmailReplace = badEmail; //.replace("Email,", "");
        var alreadyHaveAccountsReplace = alreadyHaveAccounts; //.replace("Email,", "");

        if ((badEmailReplace.length > 4) || (alreadyHaveAccountsReplace.length > 4)) {
            if (confirm('The following email addresses are either invalid or already exist in our system: ' + alreadyHaveAccountsReplace + ',' + badEmailReplace + '.  If you click OK, your period will be created without these email addresses.  If you cancel, nothing will be done.')) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    createNewPeriod: function (e) {
        var firstName = $(e.currentTarget).parents('#createPeriodContainer').find('.fName').val();
        var lastName = $(e.currentTarget).parents('#createPeriodContainer').find('.lName').val();
        var email = $(e.currentTarget).parents('#createPeriodContainer').find('.email').val();
        var studentsAsString = $(e.currentTarget).parents('#createPeriodContainer').find('.studentsAsString').val();
        var periodName = $('.newPeriodName').text();
        if (firstName.length < 1) { firstName == 'New' };
        if (lastName.length < 1) { lastName == 'Student' };
        var BHUser = {
            Email: email,
            FirstName: firstName,
            LastName: lastName
        }

        studentsAsString = studentsAsString.replace(" ", "");

        var studentArray = new Array();
        var studentList = studentsAsString.split(",");
        for (var i = 0; i < studentList.length; i++) {
            if ($.trim(studentList[i]).length > 0) {
                person = new Object();
                person.FirstName = "New";
                person.LastName = "Student";
                person.Email = $.trim(studentList[i]);
                studentArray.push(person);
            }
        }

        if ($.trim(BHUser.Email).length > 1) {
            var position = 0;
            if (studentArray.length == 0) { position = 0; } else { position = studentArray.length + 1; }
            studentArray.push(BHUser);
        }
        var BHPeriod = {
            Name: periodName,
            Students: studentArray
        }
        if (this.validateNewPeriod(BHPeriod)) {
            showLoading(); ///this hides in the "afterRender" event of the periodlistview
            this.model.attributes.Periods.push(BHPeriod);
            this.model.sync('create', this.model, null).complete(function () {
                new BHP.PeriodListView({ collection: new BHP.PeriodListCollection(), el: $("#periodList") });
            });

            // Omniture stuff
            BHP.ClearOmnitureVariables();

            var s = s_gi(s_account);
            s.linkTrackVars = "events";
            s.linkTrackEvents = "event6";
            s.events = "event6";
            s.tl(this, 'o', "[SEND INVITES]");

            // End omniture stuff
            BHP.Helpers.SpliceArray(this.model.attributes.AvailablePeriodNames, periodName);
            $(e.currentTarget).parents('#createPeriodContainer').find('.fName').val('');
            $(e.currentTarget).parents('#createPeriodContainer').find('.lName').val('');
            $(e.currentTarget).parents('#createPeriodContainer').find('.email').val('');
            $(e.currentTarget).parents('#createPeriodContainer').find('.studentsAsString').val('');
            this.addNames();
            this.toggleMeOn();

        }
    }
});
/*=============== Period List ===================*/
BHP.PeriodListModel = Backbone.Model.extend();
var justDeleted;
BHP.PeriodListCollection = Backbone.Collection.extend({
    url: '/userservices/period/all/' + BHP.Global.CurrentUser().CourseID,
    model: BHP.PeriodListModel,
    parse: function (data) {
        return data;
    }
});

BHP.PeriodListView = Backbone.View.extend({
    template: '/TeacherConsole/periodViews.html',
    initialize: function () {
        $(this.el).unbind();
        this.listenTo(this.collection, "sync", this.render);
        this.collection.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    cancelSavestudent: function (e) {
        $('.editStudentRow').toggle(false);
    },
    afterRender: function () {
        $('.newStudent').toggle(false);
        $('.editStudentRow').toggle(false);
        $('.editStudentRowAlternate').toggle(false);
        $('#editFormHidden').toggle(false);
        $('.gauge').each(function () {
            var value = $(this).attr('data-value');
            var opts = {
                lines: 12, // The number of lines to draw
                angle: 0.5, // The length of each line
                lineWidth: 0.16, // The line thickness
                limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
                colorStart: '#ffffff',   // Colors
                colorStop: '#ffffff',    // just experiment with them
                strokeColor: '#329fc4',   //This is actually the background Color
                shadowColor: '#329fc4',
                generateGradient: false
            };
            var target = this; // your canvas element
            var gauge = new Donut(target).setOptions(opts); // create sexy gauge! 
            gauge.maxValue = 100; // set max gauge value
            gauge.animationSpeed = 32; // set animation speed (32 is default value)
            gauge.set(value); // set actual value
        });
        hideLoading();
        $(':text').placeholderFix();
    },
    events: {
        'click .addPeriodLink': 'addPeriodLink',
        'click .savestudent': 'saveStudent',
        'click .removeStudent': 'removeStudent',
        'click .cancelSavestudent': 'cancelSavestudent',
        'click .sendInvites': 'addStudent',
        'click .delete': 'deletePeriod',
        'click .plus.addStudentsButton': 'openAddStudentForm',
        'click .tcAddForm .btn.large': 'closeAddStudentForm',
        'click .currentStudentRow': 'editStudent',
        'click .btn.large.newPassword': 'resetPassword'
    },
    removeStudent: function (e) {
        ///time constraints
        if (confirm('This will remove this student from the system entirely.  This cannot be undone.  Click OK to continue.')) {
            var dummyCollection;
            dummyCollection = this.collection;
            var userKey = $(e.currentTarget).parents('.tcAddForm').find('.email').val();
            showLoading();
            Backbone.sync('update', dummyCollection, { url: '/userservices/removeuser/?d=' + userKey }).complete(function () {
                new BHP.PeriodListView({ collection: new BHP.PeriodListCollection(), el: $("#periodList") });
            });

        }
    },
    resetPassword: function (e) {
        var email = $(e.currentTarget).parents('.tcNewPeriod.tcModule').find('.email').val();
        var newPW = BHP.Services.ResetPW(email);
        $(e.currentTarget).parents('.tcAddForm').find('.currentPW').text(newPW);
        $(e.currentTarget).parents('.tcAddForm').find('.currentPW').val(newPW);
        var row = $(e.currentTarget).parents('.editStudentRow');
        var previous = row.prev();
        previous.find('.currentPW').text(newPW);
        previous.find('.currentPW').val(newPW);
    },
    saveStudent: function (e) {
        var firstName = $(e.currentTarget).parents('.tcAddForm').find('.fName').val();
        var lastName = $(e.currentTarget).parents('.tcAddForm').find('.lName').val()
        var email = $(e.currentTarget).parents('.tcAddForm').find('.email').val();
        var password = $(e.currentTarget).parents('.tcAddForm').find('.password').val();
        var userKey = $(e.currentTarget).parents('.tcAddForm').find('.MembershipUserKey').val();

        for (var i = 0; i < this.collection.models.length; i++) {
            for (var ii = 0; ii < this.collection.models[i].attributes.Students.length; ii++) {
                if (this.collection.models[i].attributes.Students[ii].MembershipUserKey == userKey) {
                    this.collection.models[i].attributes.Students[ii].Email = email;
                    this.collection.models[i].attributes.Students[ii].FirstName = firstName;
                    this.collection.models[i].attributes.Students[ii].LastName = lastName;
                }
            }
        }
        Backbone.sync('update', this.collection, null).complete(function () {
            new BHP.PeriodListView({ collection: new BHP.PeriodListCollection(), el: $("#periodList") });
        });


    },
    editStudent: function (e) {
        $('.editStudentRow').toggle(false);
        var nextSlot = $(e.currentTarget).next('.editStudentRow');
        nextSlot.toggle();
        //        var firstName = $(e.currentTarget).find('.currentFname').text();
        //        var lastName = $(e.currentTarget).find('.currentLname').text();
        //        var email = $(e.currentTarget).find('.currentEmail').text();
        //        var password = $(e.currentTarget).find('.currentPW').text();
        //        nextSlot.find('.fName').val(firstName);
        //        nextSlot.find('.lName').val(lastName);
        //        nextSlot.find('.email').val(email);
    },
    openAddStudentForm: function (e) {
        $(e.currentTarget).parents('.tcPeriodConsole.tcModule').find('.newStudent').toggle();

        //Center the new student form.
        $("body,html").animate({ scrollTop: ($(e.currentTarget).parents('.tcPeriodConsole.tcModule').find('.newStudent').offset().top) }, 200)
    },
    closeAddStudentForm: function (e) {
        if ($(e.currentTarget).parents('.tcPeriodConsole.tcModule').find('.newStudent').css("display") == "block") {
            //Center the period.
            $("body,html").animate({ scrollTop: ($(e.currentTarget).parents('.tcPeriodConsole.tcModule').find('.newStudent').offset().top - 150) }, 200)

            $(e.currentTarget).parents('.tcPeriodConsole.tcModule').find('.newStudent').toggle(false);
        }
    },
    serialize: function () {
        return { period: this.collection.models };
    },
    deletePeriod: function (e) {
        if (confirm('Are you sure you want to delete this period?  Please note that this action cannot be undone, and you will lose all infomation related to this period.')) {
            var deleteID = $(e.currentTarget).parents('.tcPeriodConsole.tcModule').attr('id');
            var thisModel = this.collection.findWhere({ ID: deleteID });
            this.collection.remove(thisModel);
            ///For some reason Backbone doesn't want to delete, so it's a read instead.  Fine, Backbone.  Fine.
            // Backbone.sync('read', thisModel, { url: '/services/period/remove/' + BHP.Global.CurrentUser().CourseID });
            BHP.Services.DeletePeriodByID('/userservices/period/remove/' + BHP.Global.CurrentUser().CourseID + '/' + deleteID);
            $(e.currentTarget).parents('.tcPeriodConsole.tcModule').remove();
        }
    },
    validateNewPeriod: function (periodToValidate) {
        var studentLength = periodToValidate.Students.length;
        var keepers = new Array();
        var keepersCount = 0;
        var badEmail = '';
        var listOfEmailsToValidateAgainstTheService = '';
        ////first build a new array of "keepers", meaning valid email addresses.
        for (var i = 0; i < studentLength; i++) {
            if (periodToValidate.Students[i].Email.length > 3) {
                if (BHP.Helpers.ValidateEmail(periodToValidate.Students[i].Email)) {
                    keepers.push(periodToValidate.Students[i]);
                    listOfEmailsToValidateAgainstTheService = listOfEmailsToValidateAgainstTheService + periodToValidate.Students[i].Email + ',';
                    keepersCount = keepersCount + 1;
                } else {
                    if (periodToValidate.Students[i].Email.length > 0) {
                        if (periodToValidate.Students[i].Email != 'Email') {

                            badEmail = badEmail + periodToValidate.Students[i].Email + ',';
                        }
                    }
                }
            }
        }
        var keepersLength = keepers.length;
        var allEmailsAreValid = (keepers.length == periodToValidate.Students.length);
        var alreadyHaveAccounts = '';
        if (listOfEmailsToValidateAgainstTheService.length > 0) {
            alreadyHaveAccounts = BHP.Services.GetMatchingEmailAddresses(listOfEmailsToValidateAgainstTheService);  //// service returns a list of account names that MATCH the existing list.
        }
        var badEmailReplace = badEmail; //.replace("Email,", "");
        var alreadyHaveAccountsReplace = alreadyHaveAccounts; //.replace("Email,", "");
        if ((badEmailReplace.length > 4) || (alreadyHaveAccountsReplace.length > 4)) {
            if (confirm('The following email addresses are either invalid or already exist in our system: ' + alreadyHaveAccountsReplace + ',' + badEmailReplace + '.  If you click OK, your period will be created without these email addresses.  If you cancel, nothing will be done.')) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    addStudent: function (e) {

        if (e.currentTarget.className.indexOf('savestudent') > 0) { return false; };
        var firstName = $(e.currentTarget).parents('.newStudent').find('.fName').val();
        var lastName = $(e.currentTarget).parents('.newStudent').find('.lName').val();
        var email = $(e.currentTarget).parents('.newStudent').find('.email').val();
        var studentsAsString = $(e.currentTarget).parents('.newStudent').find('.studentsAsString').val();
        var ID = $(e.currentTarget).parents('.tcPeriodConsole.tcModule').attr('id');
        studentsAsString = studentsAsString.replace(" ", "");
        var BHUser = {
            Email: $.trim(email),
            FirstName: firstName,
            LastName: lastName
        }
        var studentArray = new Array();
        studentArray[0] = BHUser;
        var studentList = studentsAsString.split(",");
        for (var i = 0; i < studentList.length; i++) {
            person = new Object();
            person.FirstName = "New";
            person.LastName = "Student";
            person.Email = $.trim(studentList[i]);
            studentArray[i + 1] = person;
        }
        for (var i = 0; i < this.collection.models.length; i++) {
            if (this.collection.models[i].attributes.ID == ID) {
                for (var ii = 0; ii < studentArray.length; ii++) {
                    this.collection.models[i].attributes.Students.push(studentArray[ii]);
                }
            }
        }
        var BHPeriod = {
            Name: 'per x',
            Students: studentArray
        }
        if (this.validateNewPeriod(BHPeriod)) {
            showLoading();
            Backbone.sync('update', this.collection, null).complete(function () {
                new BHP.PeriodListView({ collection: new BHP.PeriodListCollection(), el: $("#periodList") });
            });
            hideLoading();
        }

    }
});



/*===============Lesson ====================*/
BHP.LessonModel = Backbone.Model.extend();

/*================ Lesson Page ==============*/
BHP.lessonCollection = Backbone.Collection.extend({
    model: BHP.LessonModel,
    parse: function (data) {
        return data;
    }
});

BHP.lessonView = Backbone.View.extend({
    events: {
        'click .concepts dt': 'clickDt',
        'click .concepts dd': 'clickDd',
        'click .lessonLeftNav li a': 'clickLeftNav',
        'click .backToTop': 'backToTop'
    },
    el: $('.bb-holder'),
    template: 'lesson.aspx',
    collection: new BHP.lessonCollection(),
    serialize: function () {
        var lesson = this.collection.toJSON();
        tracker = bhp_tracker(lesson[0].ID, Date.now());
        return { lesson: lesson }
    },
    initialize: function () {
        $(this.el).unbind();
        this.collection.off();
        this.collection.on('sync', this.render, this);
    },
    afterRender: function () {
        var $window = $(window);
        $(window).scrollTop(0);
        tracker.trackEvent('pageLoaded', null);
        $(".lessonLeftNav, .lessonContent").equalizeCols();
        $('.scrollheader').each(function (i) {
            var position = $(this).position();
            // scrollOffset is equal to double the top margin on the h3 + top margin on lessonLeftNav
            var scrollOffset = 134;
            $(this).scrollspy({
                min: position.top - scrollOffset,
                max: position.top + $(this).height() - scrollOffset,
                onEnter: function (element, position) {
                    var locationSelector = '.lessonLeftNav a[data-section=' + element.id + ']';
                    $('.lessonLeftNav a').removeClass('current');
                    $(locationSelector).addClass('current');
                }
            });
        });
        //Listen any scroll over 50 to show the "back to top" button - Set Opacity w. jquery to ensure x-broswer compat        
        var backToTop = $('.backToTop');
        var scrolledToBottom = false;        
        var isDown = false;
        $(window).scroll(function () {
            var windowpos = $(window).scrollTop();
            if (windowpos > 50 && isDown === false) {
                isDown = true;
                backToTop.stop().animate({ 'opacity': 1, 'padding-right': '50px' }, 300);                
            } else if (windowpos < 50 && isDown) {
                isDown = false;
                backToTop.stop().animate({ 'opacity': 0, 'padding-right': '28px' }, 300);
            }
        });
        $window.scroll(function () {
            if ($window.scrollTop() + $window.height() > $(document).height() - 100 && !scrolledToBottom) {
                //alert('bottom');
                tracker.trackEvent('scrolledToEnd', null);
                scrolledToBottom = true;
            }
        });
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:unit' + this.collection.models[0].attributes.UnitNumber + ':lessons:' + this.collection.models[0].attributes.Title;
            s.channel = 'units';
            s.prop1 = 'lesson';
            s.prop2 = 'units:lesson';
            s.t();
        }
    },
    clickDt: function (e) {
        $(e.currentTarget).toggleClass('visible');
        $(e.currentTarget).next('dd').toggleClass('visible');
        $(".lessonLeftNav, .lessonContent").equalizeCols();
    },
    clickDd: function (e) {
        $(e.currentTarget).toggleClass('visible');
        $(e.currentTarget).prev('dt').toggleClass('visible');
        $(".lessonLeftNav, .lessonContent").equalizeCols();
    },
    clickLeftNav: function (e) {
        var scrollToData = $(e.currentTarget).attr('data-section');
        var scrollToIdSelector = 'div#' + scrollToData;
        var scrollLocation = $(scrollToIdSelector).offset();
        // scrollOffset is double the top margin on the h3 + top margin on lessonLeftNav
        var scrollOffset = 134;
        /*Firefox needs html and body for some reason -- and height in px.*/
        $("html, body").animate({ scrollTop: (scrollLocation.top - scrollOffset) + 'px' });
    },
    backToTop: function () {
        $("body,html").animate({ scrollTop: 0 }, 200, function () {
            $('.backToTop').stop().animate({ 'opacity': 0, 'padding-right': '28px' }, 300);
        });
    }
});


/*==============Lesson Detail Panel=====================*/
BHP.LessonListDetailGutsView = Backbone.View.extend({
    template: 'Unit/lessonListDetailGuts.html',
    serialize: function () {
        return this.model;
    },
    afterRender: function () {

        if (BHP.Helpers.Contains(BHP.Global.CurrentUser().MyRoles, BHP.Constants.STUDENT_ROLE)) {
            $(this.el).find(".teachers.col").css("visibility", "hidden");
        }
        $(this.el).find(".col").equalizeCols();
        var parent = $(this.el).parents('.activityItem');
        var offset = parent.position();
        var halfWidth = parent.width() / 2;
        $(this.el).find('.point').css({ 'left': (offset.left + halfWidth) + 'px' })
    }
});

/*===============Lesson List Details===============*/
/*This is needed so we can get a reference to the
individual model when we toggle the plus/minus*/
BHP.LessonListDetailModel = Backbone.Model.extend();
BHP.LessonListDetailView = Backbone.View.extend({
    template: 'Unit/lessonListDetail.html',
    el: false,
//    events: {
//        'click .includeStatus span': 'toggleIncluded'
//    },
    serialize: function () {
        return this.model.attributes;
    },
    initialize: function () {
        $(this.el).unbind();
        this.listenTo(this.model, 'change', this.saveModel);
        this.listenTo(this.model, 'change', this.reRenderInner);
    },
    beforeRender: function () {
        this.insertView('.details', new BHP.LessonListDetailGutsView({ model: this.model.attributes }));
    },
    showModel: function () {
       // console.log('on');
    },
    reRenderInner: function () {
        this.getView('.details').render();
    },
    toggleIncluded: function (e) {
       // alert('lesson');
//        BHP.Global.ResetUnitRouter = true;
//        var getNewStatus = BHP.Helpers.ToggleStatus(this.model.attributes.Status);
//        if (getNewStatus != 'undefined') {
//            var thisID = String(this.model.attributes.ID);
//            BHP.Helpers.ToggleOpacity('.lessonconnect' + thisID, getNewStatus);
//            BHP.Helpers.ToggleOpacity('.point', getNewStatus);
//            this.model.attributes.Status = getNewStatus;
//            Backbone.sync('update', this.model, { url: '/services/mediaitem/' + BHP.Global.CurrentUser().TeacherProfile.CourseID });
//        }

        if (this.model.get('Included')) {
            this.model.set({ 'Included': false });
        } else {
            this.model.set({ 'Included': true });
        }
    },
    //    afterRender: function () {
    //        var thisID = String(this.model.attributes.ID);
    //        BHP.Helpers.ToggleOpacity('.lessonconnect' + thisID, this.model.attributes.Status);
    //    },
    saveModel: function () {
        //console.log(this.model.attributes);
    }
});


/*===============Lesson List Rows==================*/
BHP.LessonListRowModel = Backbone.Model.extend();
BHP.LessonListRowView = Backbone.View.extend({
    template: 'Unit/lessonListRow.html',
    serialize: function () {
        return this.model;
    },
    beforeRender: function () {
        //InsertLessonSteps
        var lessonSteps = this.model.LessonSteps;
        if (typeof (lessonSteps) != 'undefined') {
            for (var i = 0; i < lessonSteps.length; i++) {
                var media = lessonSteps[i].Media;
                for (var j = 0; j < media.length; j++) {
                    var newModel = new BHP.LessonListDetailModel(media[j]);
                    var newView = new BHP.LessonListDetailView({ model: newModel })
                    this.insertView('.activityInner', newView);
                }
            }
        }

        //Check if we're dealing w. a unit guide, and it has media items in it.
        if (typeof (this.model.Media) != 'undefined' && this.model.Media.length > 0) {
            var unitguide = this.model;
            for (var i = 0; i < unitguide.Media.length; i++) {
                var newModel = new BHP.UnitGuideDetailModel(unitguide.Media[i]);
                var newView = new BHP.UnitGuideDetailView({ model: newModel })
                this.insertView('.activityInner', newView);
            }
        }

    }
});

/*==============Lesson Detail Panel=====================*/
BHP.UnitGuideDetailGutsView = Backbone.View.extend({
    template: 'Unit/unitGuideDetailGuts.html',
    serialize: function () {
        return this.model;
    }

});

/*===============Lesson List Details===============*/
/*This is needed so we can get a reference to the
individual model when we toggle the plus/minus*/
BHP.UnitGuideDetailModel = Backbone.Model.extend();
BHP.UnitGuideDetailView = Backbone.View.extend({
    template: 'Unit/unitGuideDetail.html',
    el: false,
    serialize: function () {
        return this.model.attributes;
    },
    initialize: function () {
        $(this.el).unbind();
    },
    beforeRender: function () {
        this.insertView('.details', new BHP.UnitGuideDetailGutsView({ model: this.model.attributes }));
    },
    reRenderInner: function () {
        this.getView('.details').render();
    }
    
});


/*===============Lesson List Rows==================*/
BHP.UnitGuideRowModel = Backbone.Model.extend();
BHP.UnitGuideRowView = Backbone.View.extend({
    template: 'Unit/unitGuideRow.html',
    serialize: function () {
        return this.model;
    },
    beforeRender: function () {
        //Check if we're dealing w. a unit guide, and it has media items in it.
        if (typeof (this.model.Media) != 'undefined' && this.model.Media.length > 0) {
            var unitguide = this.model;
            for (var i = 0; i < unitguide.Media.length; i++) {
                var newModel = new BHP.UnitGuideDetailModel(unitguide.Media[i]);
                var newView = new BHP.UnitGuideDetailView({ model: newModel })
                this.insertView('.activityInner', newView);
            }
        }

    }
});

/*============== Other Materials Detail Panel=====================*/
BHP.OtherMaterialsDetailGutsView = Backbone.View.extend({
    template: 'Unit/otherMaterialsDetailGuts.html',
    serialize: function () {
        return this.model;
    }   
});

/*=============== Other Materials List Details===============*/
/*This is needed so we can get a reference to the
individual model when we toggle the plus/minus*/
BHP.OtherMaterialsDetailModel = Backbone.Model.extend();
BHP.OtherMaterialsDetailView = Backbone.View.extend({
    template: 'Unit/otherMaterialsDetail.html',
    el: false,
    serialize: function () {
        return this.model.attributes;
    },
    initialize: function () {
        $(this.el).unbind();
    },
    beforeRender: function () {
        this.insertView('.details', new BHP.OtherMaterialsDetailGutsView({ model: this.model.attributes }));
    },
    reRenderInner: function () {
        this.getView('.details').render();
    }
});


/*=============== Other Materials List Rows==================*/
BHP.OtherMaterialsRowModel = Backbone.Model.extend();
BHP.OtherMaterialsRowView = Backbone.View.extend({
    template: 'Unit/otherMaterialsRow.html',
    serialize: function () {
        return this.model;
    },
    beforeRender: function () {
        //Check if we're dealing w. a Other Materials Item, and it has Links items in it.
        if (typeof (this.model.Media) != 'undefined' && this.model.Media.length > 0) {
            var otherMaterials = this.model;
            for (var i = 0; i < otherMaterials.Media.length; i++) {
                var newModel = new BHP.OtherMaterialsDetailModel(otherMaterials.Media[i]);
                var newView = new BHP.OtherMaterialsDetailView({ model: newModel })
                this.insertView('.activityInner', newView);
            }
        }

    }
});

/*================Unit===================*/
BHP.UnitModel = Backbone.Model.extend({
    urlRoot: '/userservices/unit'
});

BHP.UnitView = Backbone.View.extend({
    model: BHP.UnitModel,
    el: '.bb-holder',
    template: 'Unit/unit.html',
    serialize: function () {
        var units = BHP.syllabusCollection;
        var nxtUnit = new Backbone.Model();
        var prevUnit = new Backbone.Model();
        var selectedUnit = units.findWhere({ ID: this.model.attributes.ID });
        if (typeof (selectedUnit) != 'undefined') {
            var index = units.indexOf(selectedUnit);
            if ((index + 1) != units.length) { nxtUnit = units.at(index + 1); }
            if (index != 0) { prevUnit = units.at(index - 1); }
        }
        bhp_tracker(this.model.toJSON().ID, Date.now());

        //console.log(this.model.toJSON());
        return {
            nextUnit: nxtUnit.toJSON(),
            unit: this.model.toJSON(),
            previousUnit: prevUnit.toJSON()
        };
    },
    events: {
        'click .includeStatus span': 'toggleIncludedMediaItem',
        'click a.toggleOverview': 'toggleOverview',
        'click .thumb': 'toggleActivity',
        'click .thumb a.appraisalLink': 'navigateTo',
        'click .next': 'nextUnit',
        'click .prev': 'prevUnit',
        'click .backToTop': 'backToTop',
        'mouseover .lessonRow': 'hoverRow',
        'mouseout .lessonRow': 'unhoverRow',
        'click .lessonRow': 'openRow',
        'mouseover .includeStatus span': 'hoverOptional',
        'mouseover .includeStatus span.true': 'hoverRequired',
        'mouseout .includeStatus span': 'unhoverTeaching'
    },
    toggleIncludedMediaItem: function (e) {
        var MediaItemID = e.currentTarget.id;
        var unitModel = BHP.syllabusCollection.findWhere({ ID: this.model.attributes.ID });
        for (var iLessons = 0; iLessons < this.model.attributes.Lessons.length; iLessons++) {
            for (var iLessonSteps = 0; iLessonSteps < this.model.attributes.Lessons[iLessons].LessonSteps.length; iLessonSteps++) {
                for (var iMedia = 0; iMedia < this.model.attributes.Lessons[iLessons].LessonSteps[iLessonSteps].Media.length; iMedia++) {
                    if (this.model.attributes.Lessons[iLessons].LessonSteps[iLessonSteps].Media[iMedia].ID == MediaItemID) {
                        var getNewStatus = BHP.Helpers.ToggleStatus(this.model.attributes.Lessons[iLessons].LessonSteps[iLessonSteps].Media[iMedia].Status);
                        if (getNewStatus != 'undefined') {
                            var thisID = String(this.model.attributes.Lessons[iLessons].LessonSteps[iLessonSteps].Media[iMedia].ID);
                            BHP.Helpers.ToggleOpacity('.lessonconnect' + thisID, getNewStatus);
                            BHP.Helpers.ToggleOpacity('.point', getNewStatus);
                            this.model.attributes.Lessons[iLessons].LessonSteps[iLessonSteps].Media[iMedia].Status = getNewStatus;
                            if (getNewStatus) {
                                $(".teachingIncludeStatus").html("Make required");
                                $(".teachingIncludeStatus").css("color", "#FFFFFF");
                            } else {
                                $(".teachingIncludeStatus").html("Make optional");
                                $(".teachingIncludeStatus").css("color", "#000000");
                            }
                        }
                    }
                }
            }
        }
        var modelToUpdate = this.model;
        Backbone.sync('update', modelToUpdate, { url: '/userservices/unit/' + BHP.Global.CurrentUser().CourseID });
    },

    initialize: function () {
        $(this.el).unbind();
    },
    beforeRender: function () {
        var webLinkCollection = new BHP.WebLinkCollection([], { unitID: this.model.attributes.ID, courseID: BHP.Global.CurrentUser().CourseID });
        this.insertView('.weblinks', new BHP.WebLinkView({ collection: webLinkCollection }));
        webLinkCollection.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });

        //Add Unit Guide Row if it has media. (Teachers Only)
        if (BHP.Helpers.Contains(BHP.Global.CurrentUser().MyRoles, BHP.Constants.TEACHER_ROLE)) {
            var unitUnitGuide = this.model.attributes.UnitGuide;
            if (typeof (unitUnitGuide) != 'undefined' && unitUnitGuide.length > 0) {
                for (i = 0; i < unitUnitGuide.length; i++) {
                    if (unitUnitGuide[i].Media.length > 0) {
                        this.insertView('.unitGuideRow', new BHP.UnitGuideRowView({ model: unitUnitGuide[i] }));
                    }
                }
            }
        }

        //Add Regular Lesson Rows
        var unitModel = this.model;
        var unitListModel = unitModel.attributes.Lessons;
        if (typeof (unitListModel) != 'undefined') {
            for (var i = 0; i < unitListModel.length; i++) {
                this.insertView('.mainContent', new BHP.LessonListRowView({ model: unitListModel[i] }));
            }
        }

        //Add Other Materials Row if it has links
        var unitOtherMaterials = this.model.attributes.OtherMaterial;
        if (typeof (unitOtherMaterials) != 'undefined' && unitOtherMaterials.length > 0) {
            for (i = 0; i < unitOtherMaterials.length; i++) {
                if (unitOtherMaterials[i].Media.length > 0) {
                    this.insertView('.otherMaterialsRow', new BHP.OtherMaterialsRowView({ model: unitOtherMaterials[i] }));
                }
            }
        }

        //Add Action Row
        var unitActionRows = this.model.attributes.ActionRow;
        if (typeof (unitActionRows) != 'undefined' && unitActionRows.length > 0) {
            for (i = 0; i < unitActionRows.length; i++) {
                if (unitActionRows[i].Media.length > 0) {
                    this.insertView('.contentActionRow', new BHP.UnitActionRowView({ model: new BHP.UnitActionRow(unitActionRows[i]) }));
                }
            }
        } else {
            this.insertView('.contentActionRow', new BHP.UnitActionRowView({ model: new BHP.UnitActionRow() }));
        }
        //this.insertView('.contentActionRow', new BHP.UnitActionRowView({ model: actionRow }));
    },
    afterRender: function () {
        var fixedTopNav = $('.condensedMasthead');
        var isDown = false;
        //Make sure the page is always scrolled to the top
        $(window).scrollTop(0);

        // hide next/prev unit arrows when applicable
        if (this.model.attributes.Number === 1) {
            $(".prev").css("visibility", "hidden");
        } else if (this.model.attributes.Number === 10) {
            $(".next").css("visibility", "hidden");
        } else {
            $(".prev").css("visibility", "normal");
            $(".next").css("visibility", "normal");
        }

        $(window).scroll(function () {
            var windowpos = $(window).scrollTop();
            if (windowpos) {
                $(".masthead .point").css("z-index", 9);
            } else {
                $(".masthead .point").css("z-index", 10);
            }
            if (windowpos > 250 && isDown === false) {
                isDown = true;
                fixedTopNav.stop().animate({ 'top': '43px' }, 200);
                $('.backToTop').css('opacity', 1);
            } else if (windowpos < 250 && isDown) {
                isDown = false;
                fixedTopNav.animate({ 'top': '-2px' }, 200);
            }
        });
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (typeof s != 'undefined') {
            s.pageName = 'bighistoryproject:unit' + this.model.attributes.Number + ':' + this.model.attributes.Title;
            s.channel = 'units';
            s.prop1 = 'unit';
            s.prop2 = 'units:unit';
            s.t();
        }
    },

    toggleOverview: function (e, open) {
        e.preventDefault();

        // close open row
        $('.activityItem.open .thumb').trigger('click');
        $('.lessonRow').animate({ 'opacity': 1 }, 1).removeClass('disabled').removeClass('dark').removeClass('selected');

        var oHeight = $('.overview .overviewText').height() + 80;
        var container = $(e.currentTarget).parents('.overview');
        if (container.hasClass('closed')) {
            container.toggleClass('closed').animate({ 'height': oHeight + 'px' }, 200);
            var indicator = $(e.currentTarget).find('span');
            AnimateRotate(indicator, -180, 300);
        } else {
            container.toggleClass('closed').animate({ 'height': '50px' }, 200);
            var indicator = $(e.currentTarget).find('span');
            AnimateRotate(indicator, 0, 300);
        }
        return this;
    },

    toggleActivity: function (e) {

        var currRow = $(e.currentTarget).parents('.lessonRow');
        var cont = $(e.currentTarget).parents('.activityItem');
        var activitiesHeight = currRow.find('.activities').height();
        var thumb = $(e.currentTarget);


        var appraisalLink = $(e.currentTarget).find('.appraisalLink')
        if (appraisalLink.length > 0) {
            if (appraisalLink.attr('data-bypass')) {
                var win = window.open(appraisalLink.attr('href'));
                e.preventDefault();
                e.stopPropagation();
                return false;
            } else {
                var url = appraisalLink.attr('href');
                BHP.router.navigate(url, { trigger: true });
                return false;
            }
        }


        if (thumb.parent().hasClass("writingSample")) {
            var route = thumb.attr("data-route");
            BHP.router.navigate(route, { trigger: true });
        }

        if (currRow.hasClass('disabled')) {
            $('.activityItem.open .thumb').trigger('click');
            $('.lessonRow').animate({ 'opacity': 1 }, 1).removeClass('disabled').removeClass('dark').removeClass('selected');
            return false;
        } else {
            //Center the row.
            var rowOffset = currRow.offset();
            var winOffset = $(window).height();
            //$("body,html").animate({ scrollTop: (rowOffset.top - (winOffset / 2) + (activitiesHeight / 2)) }, 200)
        }
        if (!cont.hasClass('open')) {
            //Open this
            $('.lessonRow').not(currRow).css({ 'height': 'auto' }).removeClass('open');
            currRow.addClass('open');
            $('.activityItem').removeClass('open');

            var activitiesHeight = currRow.find('.activities').height();

            //Center the row.

            var rowOffset = currRow.offset();
            var winOffset = $(window).height();
            if (typeof (rowOffset) != 'undefined') {
                $("body,html").animate({ scrollTop: (rowOffset.top - (winOffset / 2) + (activitiesHeight / 2)) }, 200)
            }

            //set classes for point and includestatus
            if (cont.find('.thumb').hasClass("opacitystatus0")) {
                cont.find('.point').removeClass("opacitystatus1");
                cont.find('.point').addClass("opacitystatus0");
                cont.find('.teachingIncludeStatus').html("Make optional");
                cont.find('.teachingIncludeStatus').css("color", "#000000");
            } else if (cont.find('.thumb').hasClass("opacitystatus1")) {
                cont.find('.point').removeClass("opacitystatus0");
                cont.find('.point').addClass("opacitystatus1");
                cont.find('.teachingIncludeStatus').html("Make required");
                cont.find('.teachingIncludeStatus').css("color", "#FFFFFF");
            }

            //Get Height of detail Panel
            cont.addClass('open');
            //Equalize the columns in the detail panel
            var detailsCol = cont.find(".details .col");

            detailsCol.equalizeCols();
            var detailPanelHeight = $(cont).find('.details').height();
            cont.removeClass('open');

            //Position Point
            var rowOffset = cont.position();
            var offset = $(e.currentTarget).position();
            var currWidth = $(e.currentTarget).width();
            var halfWidth = $(e.currentTarget).width() / 2;
            var offsetThreshold = 600;
            if (!BHP.Helpers.Contains(BHP.Global.CurrentUser().MyRoles, BHP.Constants.TEACHER_ROLE) || $(cont).find('.teachers').length <= 0) {
                offsetThreshold = 300;
            }
            if (rowOffset.left > offsetThreshold) {
                cont.find('.details').css({ 'right': '0px', 'left': 'auto' });
                cont.find('.point').css({ 'right': (halfWidth - 10) + 'px', 'left': 'auto' });
            } else {
                cont.find('.details').css({ 'left': '-' + (rowOffset.left) + 'px' });
                cont.find('.point').css({ 'left': (rowOffset.left + halfWidth) + 'px' });
            }

            //Open row if needed:
            //Clicking a row when all are enabled.
            //Clicking a disabled row when ones already open -- reenable all rows


            if (currRow.hasClass('selected')) {
                cont.addClass('open');
                cont.css({ 'margin-bottom': detailPanelHeight + 30 + 'px' });
                currRow.find('.activityItem').not(cont).removeClass('open').css('margin-bottom', '0');
            } else {
                $('.lessonRow').animate({ 'opacity': 0.3 }, 200).addClass('disabled').removeClass('selected').removeClass('dark');
                currRow.stop().animate({ 'opacity': 1 }, 1).removeClass('disabled').addClass('selected');
                //Animate the height of the row, then show the box.
                $('.activityItem').animate({ 'margin-bottom': 20 + 'px' }, 200).removeClass('open');
                cont.animate({ 'margin-bottom': detailPanelHeight + 30 + 'px' }, 150, function () {
                    //Show Details
                    currRow.find('.activityItem').not(cont).removeClass('open').css('margin-bottom', '0');
                    cont.addClass('open');

                });
            }

        } else {

            currRow.find('.activityItem').animate({ 'margin-bottom': 20 + 'px' }, 200).removeClass('open');
            currRow.removeClass('open');
            $('.lessonRow').animate({ 'opacity': 1 }, 1).removeClass('disabled').removeClass('dark').removeClass('selected');
        }


        return false;
    },
    nextUnit: function () {
        var units = BHP.syllabusCollection;
        var selectedUnit = units.findWhere({ ID: this.model.attributes.ID });
        var index = units.indexOf(selectedUnit);
        if ((index + 1) === units.length) {
            return null;
        }
        var nextUnit = units.at(index + 1);
        var loc = 'units/' + nextUnit.attributes.ID;
        //Make sure to scroll to the top of the page.
        $(window).scrollTop(0);
        BHP.router.navigate(loc, true);
    },
    prevUnit: function () {
        var units = BHP.syllabusCollection;
        var selectedUnit = units.findWhere({ ID: this.model.attributes.ID });
        var index = units.indexOf(selectedUnit);
        if (index === 0) {
            return null;
        }
        var prevUnit = units.at(index - 1);
        var loc = 'units/' + prevUnit.attributes.ID;
        //Make sure to scroll to the top of the page.
        $(window).scrollTop(0);
        BHP.router.navigate(loc, true);
    },
    backToTop: function () {
        // close open row
        $('.activityItem.open .thumb').trigger('click');
        $('.lessonRow').animate({ 'opacity': 1 }, 1).removeClass('disabled').removeClass('dark').removeClass('selected');

        $("body,html").animate({ scrollTop: 0 }, 200, function () {
            $('.backToTop').stop().animate({ 'opacity': 1, 'padding-right': '50px' }, 300);
        });
    },
    hoverRow: function (e) {
        if (!$(e.currentTarget).hasClass('disabled') && !$(e.currentTarget).hasClass('selected')) {
            $('.lessonRow').removeClass('dark');
            $(e.currentTarget).addClass('dark');
        }
    },
    unhoverRow: function (e) {
        if (!$(e.currentTarget).hasClass('disabled') && !$(e.currentTarget).hasClass('selected')) {
            $('.lessonRow').removeClass('dark');
        }
    },
    openRow: function (e) {
        //Clicking a row when all are enabled.
        if (!$(e.currentTarget).hasClass('disabled') && !$(e.currentTarget).hasClass('selected')) {
            $('.lessonRow').animate({ 'opacity': 0.3 }, 200).addClass('disabled');
            $(e.currentTarget).stop().animate({ 'opacity': 1 }, 1).removeClass('disabled').addClass('selected');
            $(e.currentTarget).find('.thumb').eq(0).trigger('click');
        }
        //Clicking a disabled row when ones already open -- reenable all rows
        if ($(e.currentTarget).hasClass('disabled')) {
            $('.activityItem.open .thumb').trigger('click');
            $('.lessonRow').animate({ 'opacity': 1 }, 1).removeClass('disabled').removeClass('dark').removeClass('selected');
        }
    },
    hoverOptional: function () {
        $(".teachingIncludeStatus").toggle(true);
    },
    hoverRequired: function () {
        $(".teachingIncludeStatus").toggle(true);
    },
    unhoverTeaching: function () {
        $(".teachingIncludeStatus").toggle(false);
    }
});

/* == Assessment Results == */
// Model
BHP.AssessmentResults = Backbone.Model.extend({
    parse: function (data) {
        return data;
    }
});

// View
BHP.AssessmentResultsView = Backbone.View.extend({
    model: new BHP.AssessmentResults(),
    el: ".bb-holder",
    template: "appraisalResults.html",
    initialize: function () {
        //this.render();
    },
    serialize: function () {
        return { assessments: this.model.toJSON() };
    },
    afterRender: function () {
        var studentName = BHP.Global.CurrentUser().FirstName + " " + BHP.Global.CurrentUser().LastName;
        $(".studentNameHiddenThing p").text(studentName);
        var radioNumber = 1;
        $("input:radio").each(function () {
            var thisId = "Radio" + radioNumber.toString();
            $(this).attr("id", thisId);
            $(this).next("label").attr("for", thisId);
            radioNumber++;
        });
        for (i = 0; i < this.model.attributes.Questions.length; i++) {
            // Mark the correct answer
            var dataIdSelector = '*[data-id="' + this.model.attributes.Questions[i].CorrectAnswer + '"]';
            $(dataIdSelector).next('label').addClass("correct");
            $(dataIdSelector).next('label').after('<span class="print" style="display:none;">Correct answer</span>');
            // Mark the incorrect selected answer
            var wrongAnswerIdSelector = '*[data-id="' + this.model.attributes.Questions[i].SelectedAnswer + '"]';
            $(wrongAnswerIdSelector).attr("checked", "checked");
            $(wrongAnswerIdSelector).next("label").addClass("incorrect");
            $(wrongAnswerIdSelector).next('label').after('<span class="print" style="display:none;">Selected answer</span>');
        }
        if (this.model.attributes.AppraisalType === "Investigation") {
            var response = this.model.get("InvestigationResponse");
            $(".corrections h4").text("Response").after('<p class="investigationResponse"></p>');
            $("p.investigationResponse").text(response);
            $(".remove").remove();
        }
        $('.gauge').each(function () {
            var value = $(this).attr('data-value');
            var opts = {
                lines: 12, // The number of lines to draw
                angle: 0.5, // The length of each line
                lineWidth: 0.16, // The line thickness
                limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
                colorStart: '#329fc4',   // Colors
                colorStop: '#329fc4',    // just experiment with them
                strokeColor: '#cccccc',   //This is actually the background Color
                shadowColor: '#cccccc',
                generateGradient: false
            };
            var target = this; // your canvas element
            var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 100; // set max gauge value
            gauge.animationSpeed = 32; // set animation speed (32 is default value)
            gauge.set(value); // set actual value
        });
    },
    events: {
        "click .assessmentPrintBtn": "clickPrintBtn",
        "click .emailBtn": "clickEmailBtn"
    },
    clickPrintBtn: function (e) {
        //console.log("YEAH!");
        // set print.css
        window.print();
        // reset print.css
    },
    clickEmailBtn: function (e) {
        var quiz = this.model.attributes.AppraisalID;
        var kid = BHP.Global.CurrentUser();
        var kidID = kid.MembershipUserKey;
        var serviceUrl = "/userservices/email/sendQuizEmail/" + quiz + "/" + kidID;
        var thisModel = this.model;
        $.ajax({
            type: "GET",
            url: serviceUrl,
            success: function () {

                //This is to accomodate Investigations only. 
                if (thisModel.attributes.AppraisalType === "Investigation") {
                    $('.assessment_wrapper').addClass('investigation_over');
                } else {
                    alert("Thank you for submitting your results.");
                }
            },
            failure: function () {
                alert("Error sending email. Please try again");
            }
        });
    }
});



/*This is steve's Test Model/View for styling, feel free to delete after June 28.*/
// Model
BHP.AssessmentModel = Backbone.Model.extend();

BHP.AssesmentCollection = Backbone.Collection.extend();

// View
BHP.AssessmentView = Backbone.View.extend({
    el: ".bb-holder",
    template: "assessment.html",
    initialize: function () {
        //var questions = this.model.attributes.questions;
        //new BHP.AssessmentCollection(questions);
    },
    afterRender: function () {
        //So, im not sure this is the best approach, but it will work and likely not be too confusing
        this.model.set('totalNumber', 3);
        var sq = this.model.attributes.selectedQuestion;
        $('.assessment .section').hide();
        var currE = $('.' + sq);
        $(currE).show();

        //The results page has enough going on it needs its own setup.
        if (sq == 'results') {
            this.setupResultsPage();
        } else {
            this.setProgressBar(currE);
            $('.content h4').eq(0).show();
            $('.content .bar').show();
        }

    },
    serialize: function () {
        return { assessments: this.model.toJSON() };
    },
    setProgressBar: function (currE) {
        //Set the Bar stuff
        var currQuestionNum = $(currE).attr('data-questionNumber');
        if (currQuestionNum > 0) {
            $('.bar .spot').hide();
            var widthPercent = currQuestionNum / this.model.attributes.totalNumber;
            var totalWidth = $('.assessment .bar').width();
            var progressWidth = Math.floor(totalWidth * widthPercent);
            $('.bar .inner').animate({ 'width': progressWidth }, 300);
        }

    },
    setupResultsPage: function () {
        //Setup and animate the gauge.
        $('.gauge').each(function () {
            var value = $(this).attr('data-value');
            var opts = {
                lines: 12, // The number of lines to draw
                angle: 0.5, // The length of each line
                lineWidth: 0.16, // The line thickness
                limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
                colorStart: '#329fc4',   // Colors
                colorStop: '#329fc4',    // just experiment with them
                strokeColor: '#cccccc',   //This is actually the background Color
                shadowColor: '#cccccc',
                generateGradient: false
            };
            var target = this; // your canvas element
            var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 100; // set max gauge value
            gauge.animationSpeed = 32; // set animation speed (32 is default value)
            gauge.set(value); // set actual value
        });

        $('.content h4').eq(0).hide();
        $('.content .bar').hide();
    }
});


/*====================Media Views=========================*/
BHP.MediaModel = Backbone.Model.extend();
BHP.MediaCollection = Backbone.Collection.extend({
    model: BHP.MediaModel,
    url: '/userservices/mediaitem/mediaitems',
    parse: function (data) {
        var items = data
        return items;
    }
});


BHP.MediaView = Backbone.View.extend({
    el: '.bb-holder',
    template: 'media.html',
    collection: new BHP.MediaCollection(),
    events: {
        'click .cuePoints a': 'gotoCuePoint',
        'click .next': 'nextItem',
        'click .prev': 'prevItem',
        'click .pdfNextPage': 'pdfNextPage',
        'click .pdfPrevPage': 'pdfPrevPage',
        'click .pdfZoomIn': 'pdfZoomIn',
        'click .pdfZoomOut': 'pdfZoomOut',
        'click .pdfHome': 'pdfHome'
    },
    serialize: function () {
        bhp_tracker(this.model.toJSON().ID, Date.now());
        
        return this.model.toJSON();
    },
    initialize: function () {
    //alert('initialize');
        $(this.el).unbind();
    },
    afterRender: function () {
    //alert('afterRender');
        tracker.trackEvent('pageLoaded', null);
        var mediaTitle = this.model.attributes.Title;
        var thisModel = this.model.attributes;
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:unit' + thisModel.UnitNumber +'media:' + mediaTitle;
            s.channel = 'bighistoryproject';
            s.prop1 = 'media';
            s.prop2 = 'bighistoryproject:unit' + thisModel.UnitNumber +'media';
            s.t();
        }
        // End omniture stuff

        if (this.model.attributes.Template == 'Video') {
        //alert('Video');
            var $root = $(".player");
            var videoStarted = false;
            var videoAlmostEnded = false;
            $root.flowplayer({
                engine: 'flash',
                swf: "/BigHistoryCourse/swf/flowplayer.swf",
                key: '$661193221874914,$468743015507892'
            });
            var api = flowplayer($root);
            api.bind("resume", function () {
                //alert('resume');
                if (videoStarted === false) {
                //alert('videoStarted=false');
                    tracker.trackEvent('videoPlayed', null);
                    videoStarted = true;
                    // Omniture stuff
                    BHP.ClearOmnitureVariables();
                    
                    s.eVar6 = mediaTitle;
                    s.eVar8 = "Video";
                    s.prop9 = mediaTitle;
                    s.prop10 = "Video";
                    s.events = "event10";
                    s.tl();
                    // End omniture stuff
                }
            });
            api.bind("progress", function () {
                //alert('progress');
                if (videoAlmostEnded === false && api.video.time > (api.video.duration * 0.9)) {
                    tracker.trackEvent("videoEnded", null);
                    videoAlmostEnded = true;
                    // Omniture stuff
                    BHP.ClearOmnitureVariables();
                    s.eVar6 = mediaTitle;
                    s.eVar8 = "Video";
                    s.prop9 = mediaTitle;
                    s.prop10 = "Video";
                    // Both event9 and event11 apparently refer to video completion.
                    s.events = "event9,event11";
                    s.tl();
                    // End omniture stuff
                }
            });
        } else if (this.model.attributes.Template == 'PDF') {
            this.initPdf();
        } else if (this.model.attributes.Template == 'Infographic') {
            this.initInfographic();
        }

        //Fade the next/prev
        var media = BHP.mediaCollection;
        var index = media.indexOf(this.model);
        var offOpacity = 0.4;
        if ((index + 1) === media.models.length ) {
            $('.next').animate({'opacity': offOpacity},200);
            $('.prev').animate({'opacity':'1'},200);
        }
        if (index == 0) {
            $('.next').animate({'opacity':'1'},200);
            $('.prev').animate({'opacity': offOpacity},200);
        }

        if(this.model.attributes.fromUnit){
            if(media.at(index + 1) && this.model.attributes.UnitID != media.at(index + 1).attributes.UnitID){
                $('.next').animate({'opacity': offOpacity},200);
                $('.prev').animate({'opacity':'1'},200);
            }
            if(media.at(index - 1) && this.model.attributes.UnitID != media.at(index - 1).attributes.UnitID){
                $('.next').animate({'opacity':'1'},200);
                $('.prev').animate({'opacity': offOpacity},200);
            }
        }else{
            if(media.at(index + 1) && this.model.attributes.LessonID != media.at(index + 1).attributes.LessonID){
                $('.next').animate({'opacity': offOpacity},200);
                $('.prev').animate({'opacity':'1'},200);
            }
            if(media.at(index - 1) && this.model.attributes.LessonID != media.at(index - 1).attributes.LessonID){
                $('.next').animate({'opacity':'1'},200);
                $('.prev').animate({'opacity': offOpacity},200);
            }
        }

    },
    gotoCuePoint: function (e) {
        var time = $(e.currentTarget).attr('data-time');
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        s.eVar7 = time;
        s.events = "event12";
        s.tl();
        // End omniture stuff
        this.cueTime = time;
        var api = $('.player').data('flowplayer');
        api.load('', function () {
            api.seek(BHP.thisMedia.cueTime);
            api.play(0);
        });

    },
    nextItem: function () {
        var media = BHP.mediaCollection;
        var index = media.indexOf(this.model);
        if ((index + 1) === media.models.length) {
            return null;
        }

        if(this.model.attributes.fromUnit){
            if(this.model.attributes.UnitID == media.at(index + 1).attributes.UnitID){
                var nextMedia = media.at(index + 1);
                var loc = 'media/' + nextMedia.attributes.ID;
                BHP.router.navigate(loc, true);
            }
        }else{
            if(this.model.attributes.LessonID == media.at(index + 1).attributes.LessonID){
                var nextMedia = media.at(index + 1);
                var loc = 'media/' + nextMedia.attributes.ID + '/0';
                BHP.router.navigate(loc, true);
            }
        }
    },
    prevItem: function () {
        var media = BHP.mediaCollection;
        var index = media.indexOf(this.model);
        if ((index - 1) === media.models.length) {
            return null;
        }

        if(this.model.attributes.fromUnit){
            if(this.model.attributes.UnitID == media.at(index - 1).attributes.UnitID){
                var nextMedia = media.at(index - 1);
                var loc = 'media/' + nextMedia.attributes.ID;
                BHP.router.navigate(loc, true);
            }
        }else{
            if(this.model.attributes.LessonID == media.at(index - 1).attributes.LessonID){
                var nextMedia = media.at(index - 1);
                var loc = 'media/' + nextMedia.attributes.ID + '/0';
                BHP.router.navigate(loc, true);
            }
        }
    },
    /*begin PDF.js Stuff*/
    //TODO: Extract this out?

    initPdf: function () {
        if(!$.browser.msie || ($.browser.msie && parseInt($.browser.version, 10) > 9)){
            this.pdfDoc = null;
            this.canvas = document.getElementById('the-canvas');
            this.viewport;
            this.context = this.canvas.getContext('2d');
            this.pageNum = 1;
            this.scale = 1.5;

            var url = this.model.attributes.PDFUrl;
            var viewRef = this;
            PDFJS.disableWorker = true;
            PDFJS.getDocument(url).then(function (pdf) {
                viewRef.pdfDoc = pdf;
                viewRef.renderPage();
                //Set Pages
                $('.currentPage').text('1');
                $('.totalPages').text(viewRef.pdfDoc.numPages);
            });
        }
    },
    pdfNextPage: function (e) {
        if (this.pageNum >= this.pdfDoc.numPages)
            return;
        this.pageNum++;
        if(this.pageNum == this.pdfDoc.numPages){
                // If we're on the last page, consider the doc read
                tracker.trackEvent('scrolledToEnd', null);
        }
        this.renderPage();
    },
    pdfPrevPage: function (e) {
        if (this.pageNum <= 1)
            return;
        this.pageNum--;
        this.renderPage();
    },
    renderPage: function () {
        // Using promise to fetch the page
        var viewObj = this;
        this.pdfDoc.getPage(this.pageNum).then(function (page) {
            var viewport = page.getViewport(viewObj.scale);
            var canvas = document.getElementById('the-canvas');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var context = canvas.getContext('2d');
            page.render({ canvasContext: context, viewport: viewport });
            //Now Re-size the actual dom
            $('.pdfContainer').width(Math.ceil(viewport.width));
            var leftoverHeight = $('.pdfWrapper').height() - viewport.height;
            if (leftoverHeight > 10) {
                $('.pdfContainer').css('margin-top', leftoverHeight / 2);
            }
        });

        // Update page counters
        $('.currentPage').text(this.pageNum);
        $('.totalPages').text(this.pdfDoc.numPages);
    },
    pdfZoomIn: function () {
        if (this.scale < 4) {
            this.scale = this.scale + 0.1;
            this.renderPage();
        }
    },
    pdfZoomOut: function () {
        if (this.scale > 0.5) {
            this.scale = this.scale - 0.1;
            this.renderPage();
        }
    },
    pdfHome: function () {
        this.scale = 1
        this.pageNum = 1;
        this.renderPage();
    },
    initInfographic: function () {
        var myModel  = this.model;
        seadragon = OpenSeadragon({
            showNavigator: false,
            id: 'infographicCont',
            //debugMode:  true,
            immediateRender: true,
            springStiffness: 10.0,
            prefixUrl: '/BigHistoryCourse/img/deepzoom/',
            tileSources: {
                Image: {
					xmlns:    'http://schemas.microsoft.com/deepzoom/2008',
					Url:      myModel.attributes.DZIUrl,
					Format:   'jpg', 
					Overlap:  '1', 
					TileSize: '256',
						Size: {
							Height: myModel.attributes.InfographicHeight,
							Width:  myModel.attributes.InfographicWidth
						}
				}
            },
            constrainDuringPan: true,
            toolbar: "zoomControls",
            zoomInButton: "zoomIn",
            zoomOutButton: "zoomOut",
            homeButton: "zoomHome"
        });
        

        seadragon.addHandler('open', delaysd_Navigate);

        function delaysd_Navigate(){
            setTimeout(sd_Navigate,500);
        };
        function sd_Navigate () {
            //console.log([myModel.attributes.PointX, myModel.attributes.PointY,myModel.attributes.Zoom]);
            
            if (myModel.attributes.PointX > 0 && myModel.attributes.PointY > 0  && myModel.attributes.Zoom > 0 ) {

                //This is a constant, dont change.
                var _ASPECT_TIME = 0.5625;
                var pt = new OpenSeadragon.Point(parseFloat(myModel.attributes.PointX), parseFloat(myModel.attributes.PointY));
                seadragon.viewport.zoomTo(myModel.attributes.Zoom, null, false);
                seadragon.viewport.panTo(pt, false);
            }
            
        }

    },
   

});

/*=============== Teacher Dashboard ===================*/
BHP.TeacherDashboardModel = Backbone.Model.extend();

BHP.TeacherDashboardView = Backbone.View.extend({
    model: new BHP.TeacherDashboardModel(),
    template: "teacherdashboard.html",
    serialize: function () {
        
    },
    initialize: function () {
        $(this.el).unbind();
        this.render();
    }
});
///* == Password Reset == */
//// Model
//BHP.PasswordReset = Backbone.Model.extend({
//    parse: function (data) {
//        return data;
//    },
//    url: "userservices/password"
//});

//// Collection
////BHP.PasswordResetCollection = Backbone.Collection.extend({
////    model: BHP.PasswordReset,
////    parse: function (data) {
////        return data;
////    }
////});

//// View
//BHP.PasswordResetView = Backbone.View.extend({
//    template: "/StudentProfile/passwordReset.html",
//    model: new BHP.PasswordReset(),
//    events: {
//        "click #saveChangePassword": "changePassword"
//    },
//    changePassword: function (e) {
//        var currentPassword = $("#currentPassword").val();
//        var newPassword = $("#newPassword").val();
//        var confirmPassword = $("#confirmPassword").val();
//        this.model.set("Password", currentPassword);
//        this.model.set("NewPassword", newPassword);
//        this.model.set("ConfirmPassword", confirmPassword);
//        console.log(this.model);
//        this.model.sync("update", this.model, null);
//        return false;
//    }
//});

/* == Password Reset == */
// Model
BHP.PasswordReset = Backbone.Model.extend({
    url: "/userservices/password/",
    parse: function (data) {
        return data;
    }
});

//    // Collection
//    var PasswordResetCollection = Backbone.Collection.extend({
//        model: PasswordReset,
//        parse: function (data) {
//            return data;
//        }
//    });

// View
BHP.PasswordResetView = Backbone.View.extend({
    template: "/StudentProfile/passwordReset.html",
    events: {
        "click #saveChangePassword": "changePassword"
    },
    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
    },
    serialize: function () {
        return { student: this.model.toJSON() };
    },
    changePassword: function (e) {
        e.preventDefault();
        password = $("#currentPassword").val();
        newPassword = $("#newPassword").val();
        confirmPassword = $("#confirmPassword").val();
        if (newPassword.length > 5) { // TODO: check if currentPassword is correct
            if (confirmPassword === newPassword) {
                this.model.set({
                    "Password": password,
                    "NewPassword": newPassword,
                    "ConfirmPassword": confirmPassword
                });
                //console.log(this.model);
                this.model.sync('update', this.model, null);
                $('#currentPassword').val('');
                $('#newPassword').val('');
                $('#confirmPassword').val('');
                alert("Password Changed");
            }
        } else {
            $('#currentPassword').val('');
            $('#newPassword').val('');
            $('#confirmPassword').val('');
            alert("Password Too Short");
        }
    }
});
/* == Personal Details == */
// Model
BHP.PersonalDetails = Backbone.Model.extend({
    url: "/userservices/user/",
    parse: function (data) {
        return data;
    }
});

// View
BHP.PersonalDetailsView = Backbone.View.extend({
    template: "/StudentProfile/personalDetails.html",
    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    serialize: function () {
        return { user: this.model.toJSON() };
    },
    events: {
        "click #savePersonalDetails": "saveForm"
    },
    saveForm: function (e) {
        e.preventDefault();
        this.model.set({
            "FirstName": $('#firstName').val(),
            "LastName": $('#lastName').val(),
            "Email": $('#email').val()
        });
        this.model.sync('update', this.model, null);
        this.render();
        alert("Profile Updated");
    }
});
/* == Teacher Personal Details == */
// Model
BHP.TeacherPersonalDetails = Backbone.Model.extend({
    url: "/userservices/user/",
    parse: function (data) {
        return data;
    }
});

// View
BHP.TeacherPersonalDetailsView = Backbone.View.extend({
    template: "/StudentProfile/teacherPersonalDetails.html",
    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    serialize: function () {
        return { user: this.model.toJSON() };
    },
    events: {
        "click #savePersonalDetails": "saveForm",
        "click .ddWrapper": "toggleDropdown",
        "click ul.dropdown>li>a": "makeSelection",
        "keyup": "tabIntoDropdown"
    },
    saveForm: function (e) {
        e.preventDefault();
        this.model.set({
            "FirstName": $('#firstName').val(),
            "LastName": $('#lastName').val(),
            "Email": $('#email').val()
        });
        this.model.attributes.TeacherProfile.TeacherRole = $("#roleLabel").html();
        this.model.attributes.TeacherProfile.TeachingExperience = $("#experienceLabel").html();
        this.model.attributes.TeacherProfile.TeachingCredential = $("#credentialLabel").html();
        this.model.attributes.School.SchoolName = $("#schoolName").val();
        this.model.attributes.School.City = $("#city").val();
        this.model.attributes.School.Country = $("#country").val();
        this.model.attributes.School.State = $("#stateLabel").html();
        this.model.attributes.School.SchoolType = $("#schoolLabel").html();
        this.model.attributes.School.ReducedLunchPercent = $("#lunchLabel").html();
        this.model.sync('update', this.model, null);
        this.render();
        //TODO: More better this :) 
        alert("Profile Updated");
    },
    afterRender: function () {
        if (this.model.attributes.TeacherProfile.TeacherRole) $('#roleLabel').html(this.model.attributes.TeacherProfile.TeacherRole);
        if (this.model.attributes.TeacherProfile.TeachingCredential) $('#credentialLabel').html(this.model.attributes.TeacherProfile.TeachingCredential);
        if (this.model.attributes.TeacherProfile.TeachingExperience) $('#experienceLabel').html(this.model.attributes.TeacherProfile.TeachingExperience);
        if (this.model.attributes.School.SchoolName) $("#schoolName").val(this.model.attributes.School.SchoolName);
        if (this.model.attributes.School.ReducedLunchPercent) $('#lunchLabel').html(this.model.attributes.School.ReducedLunchPercent);
        if (this.model.attributes.School.City) $("#city").val(this.model.attributes.School.City);
        if (this.model.attributes.School.Country) $("#country").val(this.model.attributes.School.Country);
        if (this.model.attributes.School.State) $('#stateLabel').html(this.model.attributes.School.State);
        if (this.model.attributes.School.SchoolType) $("#schoolLabel").html(this.model.attributes.School.SchoolType);
    },
    toggleDropdown: function (e) {
        var dropdownName = "#" + $(e.currentTarget.lastElementChild).attr("id");
        if ($(dropdownName).hasClass("dropdown-open")) { // if object is open
            // close            
            $(dropdownName).removeClass("dropdown-open");
            $(dropdownName).closest('.ddWrapper').css('border-radius', '0 5px 5px 0');
        } else {
            // close all for switching
            $(document).find('.dropdown-open').removeClass('dropdown-open');
            // open            
            $(dropdownName).addClass("dropdown-open");
            $(dropdownName).closest('.ddWrapper').css('border-radius', '0 5px 0 0');
        }
    },
    makeSelection: function (e) {
        var selectionName = e.target.text == null ? e.target.textContent : e.target.text;
        // Capitalize everything but states.
        if (selectionName.length > 3) {
            var splitSelection = selectionName.split(' ');
            for (var i = 0, len = splitSelection.length; i < len; i++) {
                splitSelection[i] = splitSelection[i].charAt(0).toUpperCase() + splitSelection[i].slice(1).toLowerCase();
            }
            selectionName = splitSelection.join(' ');
        }
        var labelID = $(e.currentTarget).closest('ul').siblings("label.selected").attr("id");
        $('#' + labelID).text(selectionName);
    },
    tabIntoDropdown: function (e) {
        if (e.keyCode === 9 && e.target.tagName == "DIV") {
            var dropdownName = "#" + $(e.target.lastElementChild).attr("id");
            if ($(dropdownName).hasClass("dropdown-open")) { // if object is open
                // close            
                $(dropdownName).removeClass("dropdown-open");
                $(dropdownName).closest('.ddWrapper').css('border-radius', '0 5px 5px 0');
            } else {
                // close all for switching
                $(document).find('.dropdown-open').removeClass('dropdown-open');
                // open            
                $(dropdownName).addClass("dropdown-open");
                $(dropdownName).closest('.ddWrapper').css('border-radius', '0 5px 0 0');
            } 
            /*
            var dropdown = "." + e.target.className;            
            $(dropdown).trigger("click", e);
            */
        } else if (e.keyCode === 9) {
            // close all for switching
            $(document).find('.dropdown-open').removeClass('dropdown-open');
        }
    }
});
/*=============== Search ===================*/
BHP.SearchModel = Backbone.Model.extend();

/*================ Search Page ===============*/
BHP.searchCollection = Backbone.Collection.extend({
    model: BHP.SearchModel,
    parse: function (data) {
        return data;
    }
});
BHP.searchView = Backbone.View.extend({
    el: $('.bb-holder'),
    template: 'search.html',
    collection: new BHP.searchCollection(),
    serialize: function () {
        return { search: this.collection.toJSON() }
    },
    initialize: function () {
        $(this.el).unbind();
    },
    afterRender: function () {
        // General Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:search';
            s.channel = 'bighistoryproject';
            s.prop1 = 'search';
            s.prop2 = 'bighistoryproject:search';
            s.t();
        }
        // Search specific omniture stuff
        BHP.ClearOmnitureVariables();
        s.prop4 = this.collection.models.SearchTerm;

        if (typeof (this.collection.models[0].attributes.ResultsCount) != 'undefined' && this.collection.models[0].attributes.ResultsCount > 0) {
            s.prop5 = this.collection.models[0].attributes.ResultsCount;
        } else {
            s.prop5 = 'zero';
        }
    }
});

/*================= Student Profile =================*/

// Model
BHP.StudentProfile = Backbone.Model.extend({
    parse: function (data) {
        return data;
    }
});

// Collection
BHP.StudentProfileCollection = Backbone.Collection.extend({
    model: BHP.StudentProfile,
    parse: function (data) {
        return data;
    }
});

// View
BHP.StudentProfileView = Backbone.View.extend({
    el: $('.bb-holder'),
    template: '/StudentProfile/studentProfile.html',
    model: new BHP.StudentProfile(),
    serialize: function () {
        return { user: this.model.toJSON() };
    },
    initialize: function () {
        $(this.el).unbind();
        this.model.off();
        this.model.on('sync', this.render, this);
    },
    beforeRender: function () {
        var personalDetails = new BHP.PersonalDetails();
        this.insertView('.personalDetails', new BHP.PersonalDetailsView({ model: personalDetails }));
        personalDetails.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
        var passwordReset = new BHP.PasswordReset();
        this.insertView('.passwordReset', new BHP.PasswordResetView({ model: passwordReset }));
        // BHP.AssessmentResults is the wrong thing.
        //var assessmentResults = new BHP.AssessmentResults();
        //this.insertView('.assessmentResults', new BHP.AssessmentResultsView({ model: this.model }));
    },
    afterRender: function () {
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:studentProfile';
            s.channel = 'bighistoryproject';
            s.prop1 = 'studentProfile';
            s.prop2 = 'bighistoryproject:studentProfile';
            s.t();
        }
    }
});

/*================= Teacher Profile =================*/

// Model
BHP.TeacherProfile = Backbone.Model.extend({
    parse: function (data) {
        return data;
    }
});

// Collection
BHP.TeacherProfileCollection = Backbone.Collection.extend({
    model: BHP.TeacherProfile,
    parse: function (data) {
        return data;
    }
});

// View
BHP.TeacherProfileView = Backbone.View.extend({
    el: $('.bb-holder'),
    template: '/teacherprofile.html',
    model: new BHP.TeacherProfile(),
    serialize: function () {
        return { user: this.model.toJSON() };
    },
    events: {
        "click .teacherProfile": "closeDropdowns"
    },
    initialize: function () {
        $(this.el).unbind();
        this.model.off();
        this.model.on('sync', this.render, this);
    },
    beforeRender: function () {
        var personalDetails = new BHP.TeacherPersonalDetails();
        var coteacher = new BHP.CoteacherDisplay();
        var passwordReset = new BHP.PasswordReset();
        this.insertView('.personalDetails', new BHP.TeacherPersonalDetailsView({ model: personalDetails }));
        this.insertView('.passwordReset', new BHP.PasswordResetView({ model: passwordReset })); ;
        this.insertView('.coteacher', new BHP.CoteacherDisplayView({ model: coteacher }));
    },
    closeDropdowns: function (e) {
        if (e.target.offsetParent.className != "ddWrapper" && e.target.className != "ddWrapper") {
            $(document).find('.dropdown-open').removeClass('dropdown-open');
            $(".ddWrapper").css('border-radius', '0 5px 5px 0');
        }
    }
});

/*=========== Syllabus ==============*/
BHP.SyllabusCollection = Backbone.Collection.extend({
    model: BHP.UnitModel,
    url: '/userservices/syllabus/',
    parse: function (data) {
        var items = data
        return items;
    }
});
BHP.SyllabusView = Backbone.View.extend({
    el: '.bb-holder',
    template: 'syllabus.html',
    collection: new BHP.SyllabusCollection(),
    events: {
        'click .syllabus li': 'gotoUnit',
        'mouseover .item2a': 'hoverUnit',
        'mouseout .item2a': 'unhoverUnit'
    },
    serialize: function () {
        return { units: this.collection.toJSON() };
    },
    initialize: function () {

        this.listenTo(this.collection, 'sync', this.render);
    },
    gotoUnit: function (e) {
        var href = $(e.currentTarget).attr('data-id');
        var loc = 'units/' + href;
        BHP.router.navigate(loc, true);
    },
    afterRender: function () {
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (typeof s != 'undefined') {
            s.pageName = 'bighistoryproject:syllabus';
            s.channel = 'bighistoryproject';
            s.prop1 = 'syllabus';
            s.prop2 = 'bighistoryproject:syllabus';
            s.t();
        }
    },
    hoverUnit: function () {
        $(".item2").addClass("darken");
    },
    unhoverUnit: function () {
        $(".item2").removeClass("darken");
    }
});

/*=============== Teacher Console ===================*/
BHP.TcModel = Backbone.Model.extend();

BHP.TcView = Backbone.View.extend({
    model: new BHP.TcModel(),
    el: $('.bb-holder'),
    template: 'TeacherConsole/teacherConsole.html',
    events: {
        'click .switches a span': 'toggleItem'
    },
    serialize: function () {
        //return { search: this.collection.toJSON() }
    },
    initialize: function () {
        $(this.el).unbind();

    },
    beforeRender: function () {
        /* IM TEMPORARILY DISABLING THIS UNTIL WE CAN DO IT RIGHT. ITS VERY CONFUSING FOR NEW TEACHERS - STEVEO*/
        //if (BHP.Global.CurrentUser().NumberOfTimesIveLoggedIn < 2) {
        //    this.insertView('#createPeriodHolderFirstTimeVisit', new BHP.NewPeriodView({ model: new BHP.MetaPeriodsModel() }));
        //}
        //else {

        //}
        this.insertView('#createPeriodHolderAfterFirstTimeVisit', new BHP.NewPeriodView({ model: new BHP.MetaPeriodsModel() }));


        var periodList = new BHP.PeriodListCollection();
        this.insertView('#periodList', new BHP.PeriodListView({ collection: periodList }));


        //        BHP.messagesView = new BHP.MessagesView();
        //        this.insertView('#tpMessagestcModule', BHP.messagesView);
        //        BHP.messagesView.collection.fetch({
        //            type: 'GET',
        //            contentType: "application/json; charset=utf-8"
        //        });

        var messages = new BHP.MessagesCollection();
        this.insertView("#tpMessagestcModule", new BHP.MessagesView({ collection: messages }));


        var masthead = new BHP.TCMasthead();
        this.insertView(".tcMasthead", new BHP.TCMastheadView({ model: masthead }));
        var courseTests = new BHP.TCCourseTests();
        this.insertView(".tcCourseTests", new BHP.TCCourseTestsView({ model: courseTests }));
        var unitQuizzes = new BHP.TCUnitQuizzes();
        this.insertView(".tcUnitQuizzes", new BHP.TCUnitQuizzesView({ model: unitQuizzes }));
        var studentFeedback = new BHP.TCStudentFeedback();
        this.insertView(".tcStudentFeedback", new BHP.TCStudentFeedbackView({ model: studentFeedback }));
    },
    afterRender: function () {
        //fire up the gauges.js plugin.
        /* IM TEMPORARILY DISABLING THIS UNTIL WE CAN DO IT RIGHT. ITS VERY CONFUSING FOR NEW TEACHERS - STEVEO*/
        /*
        if (BHP.Global.CurrentUser().NumberOfTimesIveLoggedIn < 2) {
        $('#tcTeacherSurveystcModule').addClass('opacitystatus1');
        $('#tcStudentFeedbacktcModule').addClass('opacitystatus1');
        $('#tcUnitLogstcModule').addClass('opacitystatus1');
        $('#tcUnitLogstcModuletcInactive').addClass('opacitystatus1');
        $('.newStudent').toggle(false);
        }
        */
        $('.gauge').each(function () {
            var value = $(this).attr('data-value');
            var opts = {
                lines: 12, // The number of lines to draw
                angle: 0.5, // The length of each line
                lineWidth: 0.16, // The line thickness
                limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
                colorStart: '#ffffff',   // Colors
                colorStop: '#ffffff',    // just experiment with them
                strokeColor: '#329fc4',   //This is actually the background Color
                shadowColor: '#329fc4',
                generateGradient: false
            };
            var target = this; // your canvas element
            var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 3000; // set max gauge value
            gauge.animationSpeed = 32; // set animation speed (32 is default value)
            gauge.set(1250); // set actual value
        });
        var email = BHP.Global.CurrentUser().Email;
        // Teacher Unit Logs
        $(".unitOneLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_10&panel=1&verem=1&id=" + email);
        $(".unitTwoLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_11&panel=1&verem=1&id=" + email);
        $(".unitThreeLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_12&panel=1&verem=1&id=" + email);
        $(".unitFourLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_13&panel=1&verem=1&id=" + email);
        $(".unitFiveLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_14&panel=1&verem=1&id=" + email);
        $(".unitSixLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_15&panel=1&verem=1&id=" + email);
        $(".unitSevenLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_16&panel=1&verem=1&id=" + email);
        $(".unitEightLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_17&panel=1&verem=1&id=" + email);
        $(".unitNineLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_18&panel=1&verem=1&id=" + email);
        $(".unitTenLog").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_19&panel=1&verem=1&id=" + email);
        // Teacher Surveys
        $(".teacherBeginningSurvey").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_2&panel=1&verem=1&id=" + email);
        $(".teacherMidpointSurvey").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_5&panel=1&verem=1&id=" + email);
        $(".teacherEndSurvey").attr("href", "http://www.msisurvey.com/start.aspx?p=T13060_8&panel=1&verem=1&id=" + email);
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (typeof s != 'undefined') {
            s.pageName = 'bighistoryproject:teacherconsole';
            s.channel = 'bighistoryproject';
            s.prop1 = 'teacherconsole';
            s.prop2 = 'bighistoryproject:teacherconsole';
            s.t();
        }
        $(':text').placeholderFix();
    },
    toggleItem: function (e) {
        //This just handles UI stuff now, you'll want to perform some logic + saving state here.
        //console.log('on');
        $(e.currentTarget).toggleClass('on');
    }
});

/*============ WebLinks ===============*/
BHP.WebLinkModel = Backbone.Model.extend({
    validate: function (attr, options) {
        var urlPattern = new RegExp('(ftp|https?):\/\/[^ "]+$')
        var valid = true;
        $('.addRemove .panel input').removeClass('invalid');
        if (!attr.Title) {
            $('#newWebLinkTitle').addClass('invalid');
            valid = false;
        }
        if (!attr.URL || !urlPattern.test(attr.URL)) {
            $('#newWebLinkUrl').addClass('invalid');
            valid = false;
        }
        if (!valid) {
            alert('It looks like some of the fields in this form were not filled out correctly.  Please correct any errors and resubmit.');
            return 'Failed Validation';
        }
    },
    initialize: function () {
        this.on("invalid", this.showError);
    },
    showError: function (model, error) {
        console.log('error:' + error);
    }
});


BHP.WebLinkCollection = Backbone.Collection.extend({
    initialize: function (models, collectionProperties) {

        this.propUnitID = collectionProperties.unitID;
        this.propCourseID = collectionProperties.courseID;
       
        this.url = '/userservices/weblink/' + this.propUnitID + '/' + this.propCourseID;
    },
    model: BHP.WebLinkModel,
    parse: function (data) {
        var items = data;
        return items;
    }
});


BHP.WebLinkView = Backbone.View.extend({
    template: 'Unit/weblinks.aspx',
    serialize: function () {
        return { weblinks: this.collection.models };
    },
    initialize: function () {
        $(this.el).unbind();
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
    },
    events: {
        'click .addRemoveWebLinks': 'openWebLinks',
        'click .cancelLink': 'closeWebLinks',
        'click .saveLink': 'addWebLink',
        'click .remove': 'removeWebLink'
    },
    openWebLinks: function (e) {
        $(e.currentTarget).siblings('.panel').addClass('open');
        $('body,html').animate({ scrollTop: $('body').height() }, 200);
        $(e.currentTarget).parents('.weblinks').find('.links').addClass('edit');
        $(e.currentTarget).hide();
        e.preventDefault();
    },
    closeWebLinks: function (e) {
        this.render();
    },
    addWebLink: function (e) {
        e.preventDefault();

        var title = $(this.el).find('#newWebLinkTitle').val();
        var pub = $(this.el).find('#newWebLinkPub').val();
        var url = $(this.el).find('#newWebLinkUrl').val();


        if (url.indexOf("http") == -1) {
            url = 'http://' + url;
        }

        var webLinkData = {
            Title: title,
            URL: url,
            Publisher: pub
        };
        var that = this;


        var newWebLink = new BHP.WebLinkModel(webLinkData);
        if (newWebLink.isValid()) {
            this.collection.push(newWebLink);

            var propUnitID = that.collection.propUnitID;
            var propCourseID = that.collection.propCourseID;

            Backbone.sync('update', this.collection, {
                url: '/userservices/weblink/' + propUnitID + '/' + propCourseID,
                success: function (coll, status) {
                    that.collection = new BHP.WebLinkCollection(coll, { unitID: propUnitID, courseID: propCourseID });
                    that.render();
                }
            });
        }
        return false;
    },
    removeWebLink: function (e) {
        if (confirm('This will remove the item from your list permanently.  Are you sure you want to do this? ')) {
            var id = $(e.currentTarget).attr('data-id');
            var item = this.collection.findWhere({ ID: id });
            $('#link-id' + id).remove();
            this.collection.remove(item, { silent: true });
            e.preventDefault();
            Backbone.sync('update', this.collection, null);
        }
    }

});
/*============ Model ============*/
BHP.FaqModel = Backbone.Model.extend({
    url: "/userservices/global/faq",
    parse: function (data) {
        return data;
    }
});

/*============ View =============*/
BHP.FaqView = Backbone.View.extend({
    model: new BHP.FaqModel(),
    el: ".bb-holder",
    template: "faq.html",
    serialize: function () {
        return { faq: this.model.toJSON() }
    },
    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    afterRender: function () {
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:faq';
            s.channel = 'bighistoryproject';
            s.prop1 = 'faq';
            s.prop2 = 'bighistoryproject:faq';
            s.t();
        }
    }
});
/*============== Model ================*/
BHP.AboutModel = Backbone.Model.extend({
    url: "/userservices/global/about",
    parse: function (data) {
        return data;
    }
});

/*=============== View =================*/
BHP.AboutView = Backbone.View.extend({
    model: new BHP.AboutModel(),
    el: ".bb-holder",
    template: "about.html",
    serialize: function () {
        return { about: this.model.toJSON() }
    },
    initialize: function () {
        this.listenTo(this.model, "sync", this.render);
        this.model.fetch({
            type: "GET",
            contentType: "application/json; charset=utf-8"
        });
    },
    afterRender: function () {
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:about';
            s.channel = 'bighistoryproject';
            s.prop1 = 'about';
            s.prop2 = 'bighistoryproject:about';
            s.t();
        }
    }
});
/*============ Model ============*/
BHP.PrivacyModel = Backbone.Model.extend({
    url: "/userservices/global/privacy",
    parse: function (data) {
        return data;
    }
});

/*============ View =============*/
BHP.PrivacyView = Backbone.View.extend({
    model: new BHP.PrivacyModel(),
    el: ".bb-holder",
    template: "privacy.html",
    serialize: function () {
        return { privacy: this.model.toJSON() }
    },
    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    afterRender: function () {
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:privacy';
            s.channel = 'bighistoryproject';
            s.prop1 = 'privacy';
            s.prop2 = 'bighistoryproject:privacy';
            s.t();
        }
    }
});
/*============== Model ============*/
BHP.TermsOfServiceModel = Backbone.Model.extend({
    url: "/userservices/global/termsofservice",
    parse: function (data) {
        return data;
    }
});

/*=============== View ==============*/
BHP.TermsOfServiceView = Backbone.View.extend({
    model: new BHP.TermsOfServiceModel(),
    el: ".bb-holder",
    template: "termsofservice.html",
    serialize: function () {
        return { termsofservice: this.model.toJSON() }
    },
    initialize: function () {
        this.listenTo(this.model, "sync", this.render);
        this.model.fetch({
            type: "GET",
            contentType: "application/json; charset=utf-8"
        });
    },
    afterRender: function () {
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:termsofservice';
            s.channel = 'bighistoryproject';
            s.prop1 = 'termsofservice';
            s.prop2 = 'bighistoryproject:termsofservice';
            s.t();
        }
    }
});
/* ================== Coteacher Display ============== */
// For the panel on the teacher profile page that displays who a teacher's coteacher is

/*=================== Model =================*/
BHP.CoteacherDisplay = Backbone.Model.extend({
    url: "/userservices/user/coteacher",
    parse: function (data) {
        return data;
    }
});

/*=================== View =================*/
BHP.CoteacherDisplayView = Backbone.View.extend({
    model: new BHP.CoteacherDisplay(),
    template: "/StudentProfile/coteacherdisplay.html",
    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    serialize: function () {
        return { coteacher: this.model.toJSON() };
    }
});
/*=========== Glossary ============*/

/*===== Model =====*/
BHP.Glossary = Backbone.Model.extend({
    url: "/userservices/global/glossary",
    parse: function (data) {
        return data;
    }
});

/*===== View =====*/
BHP.GlossaryView = Backbone.View.extend({
    model: new BHP.Glossary(),
    el: ".bb-holder",
    template: "glossary.html",
    serialize: function () {
        return { glossary: this.model.toJSON() }
    },
    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    events: {
        'click .backToTop': 'backToTop',
        'click .glossaryJump': 'glossaryJumpTo'
    },
    afterRender: function () {
        var dd = $("dd");
        dd.each(function () {
            //console.log($(this).prevAll("dd"));
            if ($(this).text().substring(0, 1) !== '"') {
                if ($(this).prev().prev().prev("dd").text().substring(0, 1).toUpperCase() !== $(this).text().substring(0, 1).toUpperCase() && $(this).prev().prev().prev("dd").text().substring(0, 1) !== '"') {
                    $(this).before("<div id = '" + $(this).text().substring(0, 1).toUpperCase() + "'><h2>" + $(this).text().substring(0, 1).toUpperCase() + "</h2></div>");
                    // $(this).before("<h2>" + $(this).text().substring(0, 1).toUpperCase() + "</h2>");
                }
            }
        });
        var isDown = false;
        $(window).scroll(function () {
            var windowpos = $(window).scrollTop();
            if (windowpos > 150 && isDown === false) {
                isDown = true;
                $("#fixedNav").stop().animate({ 'top': '45px' }, 200);
                $("#fixedNav").attr("id", "scrollingNav");
                $('.backToTop').css('opacity', 1);
            } else if (windowpos < 150 && isDown) {
                isDown = false;
                $("#scrollingNav").stop().animate({ 'top': '-10px' }, 0);
                $('.backToTop').css("opacity", 0);
                $("#scrollingNav").attr("id", "fixedNav");
            }
        });
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:glossary';
            s.channel = 'bighistoryproject';
            s.prop1 = 'glossary';
            s.prop2 = 'bighistoryproject:glossary';
            s.t();
        }
    },
    backToTop: function () {
        $("body,html").animate({ scrollTop: 0 }, 200, function () {
            $('.backToTop').stop().animate({ 'opacity': 0, 'padding-right': '50px' }, 300);
        });
    },
    glossaryJumpTo: function (e) {
        var scrollToData = $(e.currentTarget).attr('data-section');
        var scrollToIdSelector = 'div#' + scrollToData;
        var scrollLocation = $(scrollToIdSelector).offset();
        var scrollOffset = 94;
        $("body,html").animate({ scrollTop: (scrollLocation.top - scrollOffset) });
    }
});
/*======= Student Survey Thing =======*/
// KB

/* === Student Survey Thing Model === */
BHP.StudentSurvey = Backbone.Model.extend({
    parse: function (data) {
        return data;
    },
    url: "userservices/feedback/StudentFeedback"
});

/* === Student Survey Thing View === */
BHP.StudentSurveyView = Backbone.View.extend({
    template: "/Unit/studentSurvey.html",
    initialize: function () {
        $(this.el).unbind();
        this.model.fetch();
        this.listenTo(this.model, "sync", this.render);
    },
    serialize: function () {
        return { survey: this.model.toJSON }
    },
    afterRender: function () {
        
    }
});
/*========== Quiz ==========*/

/*===== Model =====*/
BHP.Quiz = Backbone.Model.extend({
    parse: function (data) {
        return data;
    }
});

/*===== View =====*/
BHP.QuizView = Backbone.View.extend({
    model: new BHP.Quiz(),
    template: "quiz.html",
    el: ".bb-holder",
    serialize: function () {
        return { quiz: this.model.toJSON() }
    },
    initialize: function () {
        $(this.el).unbind();
    },
    afterRender: function () {
        var radioNumber = 1;
        $("input:radio").each(function () {
            var thisId = "Radio" + radioNumber.toString();
            $(this).attr("id", thisId);
            $(this).next("label").attr("for", thisId);
            radioNumber++;
        });

        //Insert the bullet Points
        var bar = $('.bar');
        var dotWidth = 100 / this.model.attributes.NumberOfQuestions - .01;
        var dotColor = this.model.attributes.UnitHexColor;
        for (var i = 0; i < this.model.attributes.NumberOfQuestions; i++) {
            $(bar).append('<span class="spot" style="color:' + dotColor + '; width:' + dotWidth + '%">&bull;</span>');
        }

        // Omniture stuff
        BHP.ClearOmnitureVariables();
        if (s != null) {
            s.pageName = 'bighistoryproject:unit' + this.model.attributes.Unit.split(' ')[1] + ':' + this.model.attributes.AppraisalName;
            s.channel = 'bighistoryproject';
            s.prop1 = 'appraisal';
            s.prop2 = 'bighistoryproject:appraisal';
            s.t();
        }
    },
    events: {
        "click .nextBtn": "nextButtonClick",
        "click .previousBtn": "previousButtonClick",
        "click .promptNextButton": "hidePreQuestionPrompt",
        "click .previousPromptBtn": "showPreQuestionPrompt",
        "click .takeTheQuiz": "takeTheQuizClick",
        "click input:radio": "answerClick",
        "click #previousBtn": "lastPreviousButtonClick",
        "click #submitBtn": "submitButtonClick",
        "click .quizPrintBtn": "clickPrintBtn"
    },
    nextButtonClick: function (e) {
        var qNumber = $(e.target).closest('.question').attr("data-questionnumber");
        var thisQSelector = ".question.q" + qNumber.toString();
        if (parseInt(qNumber) === this.model.attributes.NumberOfQuestions) {
            $(thisQSelector).hide();
            $(".end").show();
        }
        if ($(e.target).hasClass("textField")) {
            var textField = $(thisQSelector).find("textarea");
            var questionArray = this.model.get("Questions");
            questionArray[qNumber - 1].SelectedAnswer = textField.val();
            this.model.set("Questions", questionArray);
        }
        var nextQNumber = parseInt(qNumber) + 1;
        var nextQSelector = ".question.q" + nextQNumber.toString();
        $(thisQSelector).hide();
        $(nextQSelector).show();
        // Progress bar stuff
        if (qNumber > 0) {
            //$('.bar .spot').hide();
            var widthPercent = qNumber / this.model.attributes.NumberOfQuestions;
            var totalWidth = $('.assessment .bar').width();
            var progressWidth = Math.floor(totalWidth * widthPercent);
            $('.bar .inner').animate({ 'width': progressWidth }, 300);
        }
    },
    previousButtonClick: function (e) {
        var qNumber = $(e.target).closest('.question').attr("data-questionnumber");
        if (parseInt(qNumber) === 1) {
            $(thisQSelector).hide();
            $(".intro").show();
        }
        var prevQNumber = parseInt(qNumber - 1);
        var thisQSelector = ".question.q" + qNumber.toString();
        var prevQSelector = ".question.q" + prevQNumber.toString();
        $(thisQSelector).hide();
        $(prevQSelector).show();
        // Progress bar stuff
        if (qNumber > 0) {
            //$('.bar .spot').hide();
            var widthPercent = prevQNumber / this.model.attributes.NumberOfQuestions;
            var totalWidth = $('.assessment .bar').width();
            var progressWidth = Math.floor(totalWidth * widthPercent);
            $('.bar .inner').animate({ 'width': progressWidth }, 300);
        }
    },
    hidePreQuestionPrompt: function (e) {
        var qNumber = $(e.target).closest('.question').attr("data-questionnumber");
        var thisQSelector = ".question.q" + qNumber.toString();

        $(thisQSelector).children('.PreQuestionPrompt').hide();
        $(thisQSelector).children('.QuestionGuts').show();
    },
    showPreQuestionPrompt: function (e) {
        var qNumber = $(e.target).closest('.question').attr("data-questionnumber");
        var thisQSelector = ".question.q" + qNumber.toString();

        $(thisQSelector).children('.QuestionGuts').hide();
        $(thisQSelector).children('.PreQuestionPrompt').show();

    },
    takeTheQuizClick: function () {
        $(".intro").hide();
        $(".question.q1").show();
        // Omniture stuff
        BHP.ClearOmnitureVariables();
        s.eVar4 = this.model.attributes.AppraisalName;
        s.prop4 = this.model.attributes.AppraisalName;
        s.events = "event3";
        s.tl();
    },
    answerClick: function (e) {
        // Here subtract one because I need to get the object in the question array
        var qNumber = $(e.target).closest('.question').attr("data-questionnumber") - 1;
        var questionArray = this.model.get("Questions");
        questionArray[qNumber].SelectedAnswer = $(e.target).attr("data-id");
        this.model.set("Questions", questionArray);
    },
    lastPreviousButtonClick: function () {
        var numberOfQuestions = this.model.attributes.NumberOfQuestions;
        var prevQSelector = ".question.q" + numberOfQuestions.toString();
        $(".end").hide();
        $(prevQSelector).show();
    },
    clickPrintBtn: function (e) {
        //console.log("YEAH!");
        window.print();
    },
    submitButtonClick: function () {
        BHP.ClearOmnitureVariables();
        s.eVar4 = this.model.attributes.AppraisalName + ' - Complete';
        s.events = "event4";
        s.tl();
        if (this.model.attributes.AppraisalType === "Investigation") {
            var response = this.model.get("InvestigationResponse");
            response = $("textarea").val();
            this.model.set("InvestigationResponse", response);
        }
        this.model.url = "/userservices/appraisal/" + this.model.attributes.AppraisalID;
        this.model.sync("update", this.model, null);
    }
    //    setProgressBar: function (currE) {
    //        //Set the Bar stuff
    //        var currQuestionNum = $(currE).attr('data-questionNumber');
    //        if (currQuestionNum > 0) {
    //            $('.bar .spot').hide();
    //            var widthPercent = currQuestionNum / this.model.attributes.totalNumber;
    //            var totalWidth = $('.assessment .bar').width();
    //            var progressWidth = Math.floor(totalWidth * widthPercent);
    //            $('.bar .inner').animate({ 'width': progressWidth }, 300);
    //        }

    //    }
});

/*======= Teacher Console Masthead =======*/
// KB

/*===== Model =====*/

BHP.TCMasthead = Backbone.Model.extend({
    url: "/userservices/user/",
    parse: function (data) {
        return data;
    }
});

/*===== View =====*/
BHP.TCMastheadView = Backbone.View.extend({
    //model: new BHP.TCMasthead(),
    template: "TeacherConsole/tcMasthead.html",
    serialize: function () {
        return { masthead: this.model.toJSON() }
    },
    initialize: function () {
        $(this.el).unbind();
        this.model.off();
        this.listenTo(this.model, "sync", this.render);
        this.model.fetch({
            type: "GET",
            contentType: "application/json; charset=utf-8"
        });
    },
    afterRender: function () {

        var rightNow = new Date();
        // The day of the week
        var dayNumber = rightNow.getDay();
        var monthNumber = rightNow.getMonth();
        // The day of the month
        var dateNumber = rightNow.getDate();
        var daySpan = $("#day");
        var monthSpan = $("#month");
        $("#date").text(dateNumber);
        switch (dayNumber) {
            case 0:
                daySpan.text("Sunday");
                break;
            case 1:
                daySpan.text("Monday");
                break;
            case 2:
                daySpan.text("Tuesday");
                break;
            case 3:
                daySpan.text("Wednesday");
                break;
            case 4:
                daySpan.text("Thursday");
                break;
            case 5:
                daySpan.text("Friday");
                break;
            case 6:
                daySpan.text("Saturday");
                break;
        }
        switch (monthNumber) {
            case 0:
                monthSpan.text("January");
                break;
            case 1:
                monthSpan.text("February");
                break;
            case 2:
                monthSpan.text("March");
                break;
            case 3:
                monthSpan.text("April");
                break;
            case 4:
                monthSpan.text("May");
                break;
            case 5:
                monthSpan.text("June");
                break;
            case 6:
                monthSpan.text("July");
                break;
            case 7:
                monthSpan.text("August");
                break;
            case 8:
                monthSpan.text("September");
                break;
            case 9:
                monthSpan.text("October");
                break;
            case 10:
                monthSpan.text("November");
                break;
            case 11:
                monthSpan.text("December");
                break;
        }
    }
});
/*============== Teacher Console Course Tests ==============*/
// KB

/*===== Model =====*/
BHP.TCCourseTests = Backbone.Model.extend({
    url: "/userservices/appraisal/enabledAssessments/" + BHP.Global.CurrentUser().CourseID,
    parse: function (data) {
        return data;
    }
});

/*===== Collection =====*/
BHP.TCCourseTestsCollection = Backbone.Collection.extend();

/*===== View =====*/
BHP.TCCourseTestsView = Backbone.View.extend({
    template: "/TeacherConsole/tcCourseTests.html",
    events: {
        "click .testSwitches a span": "clickTest"
    },
    serialize: function () {
        return { courseTests: this.model.toJSON() }
    },
    initialize: function () {
        this.model.fetch();
        this.listenTo(this.model, "sync", this.render);
    },
    clickTest: function (e) {
        var parentID = $(e.target).parent("a").attr("data-id");
        var appraisalArray = this.model.get("Appraisals");
        for (var i = 0; i < appraisalArray.length; i++) {
            if (appraisalArray[i].AppraisalID === parentID) {
                appraisalArray[i].isEnabled = !appraisalArray[i].isEnabled;
                var selector = "[data-id='" + appraisalArray[i].AppraisalID + "'] span";
                $(selector).toggleClass("on");
            }
        }
        this.model.set("Appraisals", appraisalArray);
        this.model.sync("update", this.model, null);
        e.preventDefault();
        e.stopPropagation();
    },
    afterRender: function () {
        var appraisalArray = this.model.get("Appraisals");
        if (typeof appraisalArray !== "undefined") {
            for (var i = 0; i < appraisalArray.length; i++) {
                if (appraisalArray[i].isEnabled === true) {
                    var selector = "[data-id='" + appraisalArray[i].AppraisalID + "'] span";
                    $(selector).addClass("on");
                }
            }
        }
    }
});
/*============== Teacher Console Unit Quizzes ==============*/
// KB

/*===== Model =====*/
BHP.TCUnitQuizzes = Backbone.Model.extend({
    url: "/userservices/appraisal/enabledQuizzes/" + BHP.Global.CurrentUser().CourseID,
    parse: function (data) {
        return data;
    }
});

/*===== View =====*/
BHP.TCUnitQuizzesView = Backbone.View.extend({
    template: "/TeacherConsole/tcUnitQuizzes.html",
    events: {
        "click .quizSwitches a span": "clickTest"
    },
    serialize: function () {
        return { unitQuizzes: this.model.toJSON() }
    },
    initialize: function () {
        this.model.fetch();
        this.listenTo(this.model, "sync", this.render);
    },
    clickTest: function (e) {
        var parentID = $(e.target).parent("a").attr("data-id");
        var appraisalArray = this.model.get("Appraisals");
        for (var i = 0; i < appraisalArray.length; i++) {
            if (appraisalArray[i].AppraisalID === parentID) {
                appraisalArray[i].isEnabled = !appraisalArray[i].isEnabled;
            }
        }
        this.model.set("Appraisals", appraisalArray);
        this.model.sync("update", this.model, null);
        this.render();
        e.preventDefault();
        e.stopPropagation();
    },
    afterRender: function () {
        var quizArray = this.model.get("Appraisals");
        if (typeof quizArray !== "undefined") {
            var quizzes = $(".tcUnitQuizzes a");
            for (var i = 0; i < quizzes.length; i += 4) {
                quizzes.slice(i, i + 4).wrapAll('<div class="switches quizSwitches"></div>');
            }
            var switches = $(".quizSwitches");
            if (switches.last().children().length !== 4) {
                var number = 4 - switches.last().children().length;
                for (i = 0; i < number; i++) {
                    switches.last().children().last().after('<a class="blank"></a>');
                }
            }

            for (var i = 0; i < quizArray.length; i++) {
                var selector = "[data-id='" + quizArray[i].AppraisalID + "'] span";
                if (quizArray[i].isEnabled === true) {
                    $(selector).addClass("on");
                }
            }
        }
    }
});
/*============== Teacher Console Student Feedback ==============*/
// KB

/*===== Model =====*/
BHP.TCStudentFeedback = Backbone.Model.extend({
    url: "/userservices/feedback/StudentFeedback",
    parse: function (data) {
        return data;
    }
});

/*===== View =====*/
BHP.TCStudentFeedbackView = Backbone.View.extend({
    template: "/TeacherConsole/tcStudentFeedback.html",
    events: {
        "click .surveySwitches a span.beginningSurvey": "clickBeginning",
        "click .surveySwitches a span.midpointSurvey": "clickMidpoint",
        "click .surveySwitches a span.endSurvey": "clickEnd"
    },
    serialize: function () {
        return { studentFeedback: this.model.toJSON() }
    },
    initialize: function () {
        this.model.fetch();
        this.listenTo(this.model, "sync", this.render);
    },
    clickBeginning: function (e) {
        var survey = this.model.get("BeginningSurvey");
        survey = !survey;
        this.model.set("BeginningSurvey", survey);
        this.model.sync("update", this.model, null);
    },
    clickMidpoint: function (e) {
        var survey = this.model.get("MidpointSurvey");
        survey = !survey;
        this.model.set("MidpointSurvey", survey);
        this.model.sync("update", this.model, null);
    },
    clickEnd: function (e) {
        var survey = this.model.get("EndSurvey");
        survey = !survey;
        this.model.set("EndSurvey", survey);
        this.model.sync("update", this.model, null);
    },
    afterRender: function () {
        //var model = this.model.get();
        /*
        if (BHP.Global.CurrentUser().NumberOfTimesIveLoggedIn < 2) {
            this.model.set("BeginningSurvey") = true;
            this.model.set("MidpointSurvey") = true;
            this.model.set("EndSurvey") = true;
        }
        */
        if (this.model.get("BeginningSurvey") === true) {
            $(".beginningSurvey").addClass("on");
        }
        if (this.model.get("MidpointSurvey") === true) {
            $(".midpointSurvey").addClass("on");
        }
        if (this.model.get("EndSurvey") === true) {
            $(".endSurvey").addClass("on");
        }
    }
});
/*======== Assessment ==========*/

/*======== Model =============*/
BHP.Assessment = Backbone.Model.extend();

/*======== Collection ========*/
BHP.AssessmentCollection = Backbone.Collection.extend({
    model: BHP.Assessment,
    url: function (assessmentID) {
        return "/userservices/appraisal" + assessmentID;
    },
    parse: function (data) {
        return data;
    }
});

/*======== View ==============*/
BHP.AssessmentView = Backbone.View.extend({
    collection: BHP.AssessmentCollection,
    el: ".bb-holder",
    template: "assessment.html",
    initialize: function () {
        this.collection.fetch({
            type: 'GET',
            contentType: "application/json; charset=utf-8"
        });
    },
    serialize: function () {
        return { assessments: this.collection.toJSON() };
    },
    setProgressBar: function (currE) {
        //Set the Bar stuff
        var currQuestionNum = $(currE).attr('data-questionNumber');
        if (currQuestionNum > 0) {
            $('.bar .spot').hide();
            var widthPercent = currQuestionNum / this.model.attributes.totalNumber;
            var totalWidth = $('.assessment .bar').width();
            var progressWidth = Math.floor(totalWidth * widthPercent);
            $('.bar .inner').animate({ 'width': progressWidth }, 300);
        }

    },
    setupResultsPage: function () {
        //Setup and animate the gauge.
        $('.gauge').each(function () {
            var value = $(this).attr('data-value');
            var opts = {
                lines: 12, // The number of lines to draw
                angle: 0.5, // The length of each line
                lineWidth: 0.16, // The line thickness
                limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
                colorStart: '#329fc4',   // Colors
                colorStop: '#329fc4',    // just experiment with them
                strokeColor: '#cccccc',   //This is actually the background Color
                shadowColor: '#cccccc',
                generateGradient: false
            };
            var target = this; // your canvas element
            var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 100; // set max gauge value
            gauge.animationSpeed = 32; // set animation speed (32 is default value)
            gauge.set(value); // set actual value
        });

        $('.content h4').eq(0).hide();
        $('.content .bar').hide();
    },
    afterRender: function () {
        //So, im not sure this is the best approach, but it will work and likely not be too confusing
        this.model.set('totalNumber', 3);
        var sq = this.model.attributes.selectedQuestion;
        $('.assessment .section').hide();
        var currE = $('.' + sq);
        $(currE).show();

        //The results page has enough going on it needs its own setup.
        if (sq == 'results') {
            this.setupResultsPage();
        } else {
            this.setProgressBar(currE);
            $('.content h4').eq(0).show();
            $('.content .bar').show();
        }
    }
});
/*======= Unit Action Row =======*/
// KB
// Model

BHP.UnitActionRow = Backbone.Model.extend({
    url: "/userservices/appraisal/getAllEnabledAppraisals/" + BHP.Global.CurrentUser().CourseID,
    parse: function (data) {
        return data;
    }
});

// View

BHP.UnitActionRowView = Backbone.View.extend({
    template: "/Unit/actionRow.html",
    initialize: function () {
        $(this.el).unbind();
        this.model.fetch();
        this.listenTo(this.model, "sync", this.render);
    },
    serialize: function () {
        return { actionRow: this.model.toJSON() }
    },
    beforeRender: function () {
        
        //Check if we're dealing w. media, and it has media items in it.
        if (typeof (this.model.attributes.Media) != 'undefined' && this.model.attributes.Media.length > 0) {
            var actionrow = this.model.attributes;
            
            for (var i = 0; i < actionrow.Media.length; i++) {
                //Were going to use standard lesson list items for these rather than write ANOTHER set of detail&guts views//
                var newModel = new BHP.LessonListDetailModel(actionrow.Media[i]);
                var newView = new BHP.LessonListDetailView({ model: newModel })
                this.insertView('.assignedMedia', newView);
            }
        }
    },
    afterRender: function () {
        var unitNumber = parseInt($(".title h3").text());
        var appraisals = this.model.attributes.Appraisals;
        var email = BHP.Global.CurrentUser().Email;
        var surveys = "";
        $.ajax({
            type: "GET",
            url: "/userservices/feedback/StudentFeedback",
            async: false,
            dataType: "json"
        }).done(function (response) {
            surveys = response;
        });
        var surveyHtml = "";
        if (unitNumber === 1 && surveys.BeginningSurvey === true) {
            surveyHtml += '<div class="activityItem" style="margin-bottom: 20px;"><div class="thumb"><a data-bypass="true" class="appraisalLink" href="http://www.msisurvey.com/start.aspx?p=T13060_1&panel=1&verem=1&id=';
            surveyHtml += email;
            surveyHtml += '"><img src="';
            surveyHtml += '/~/media/Big%20History%202013/Unit%201/Images/U1-Thumbnails-non-retina/U1-StudentSurvey-th.png';
            surveyHtml += '"/></a></div></div>'
        } else if (unitNumber === 5 && surveys.MidpointSurvey === true) {
            surveyHtml += '<div class="activityItem" style="margin-bottom: 20px;"><div class="thumb"><a data-bypass="true" class="appraisalLink" href="http://www.msisurvey.com/start.aspx?p=T13060_4&panel=1&verem=1&id=';
            surveyHtml += email;
            surveyHtml += '"><img src="';
            surveyHtml += '/~/media/Big%20History%202013/Unit%205/Images/U5-Thumbnails-non-retina/U5-StudentSurvey-th.png';
            surveyHtml += '"/></a></div></div>'
        } else if (unitNumber === 10 && surveys.EndSurvey === true) {
            surveyHtml += '<div class="activityItem" style="margin-bottom: 20px;"><div class="thumb"><a data-bypass="true" class="appraisalLink" href="http://www.msisurvey.com/start.aspx?p=T13060_7&panel=1&verem=1&id=';
            surveyHtml += email;
            surveyHtml += '"><img src="';
            surveyHtml += '/~/media/Big%20History%202013/Unit%2010/Images/U10-Thumbnails-non-retina/U10-StudentSurvey-th.png';
            surveyHtml += '"/></a></div></div>'
        }
        var appraisalHtml = "";
        if (typeof appraisals !== "undefined") {
            var enabledAppraisalsThisUnit = [];
            //var disabledAppraisalsThisUnit = [];
            for (var i = 0; i < appraisals.length; i++) {
                if (appraisals[i].Unit === unitNumber && appraisals[i].isEnabled === true) {
                    enabledAppraisalsThisUnit.push(appraisals[i]);
                } else if (appraisals[i].Unit === unitNumber && appraisals[i].isEnabled === false) {
                    //disabledAppraisalsThisUnit.push(appraisals[i]);
                }
            }
            /* remove action row is empty
            if (enabledAppraisalsThisUnit.length === 0) {
            $(".actionRow").remove();
            } else {
            }
            */
            for (var i = 0; i < enabledAppraisalsThisUnit.length; i++) {
                appraisalHtml += '<div class="activityItem" style="margin-bottom: 20px;"><div class="thumb"><a class="appraisalLink" href="#quiz/';
                appraisalHtml += enabledAppraisalsThisUnit[i].AppraisalID;
                appraisalHtml += '"><img src="';
                appraisalHtml += enabledAppraisalsThisUnit[i].AppraisalThumbnail;
                appraisalHtml += '"/></a></div></div>'
            }
            /* show disabled content
            for (var i = 0; i < disabledAppraisalsThisUnit.length; i++) {
                appraisalHtml += '<div class="activityItem" style="margin-bottom: 20px;"><div class="thumb opacitystatus1"><a class="appraisalLink" href="#quiz/';
                appraisalHtml += disabledAppraisalsThisUnit[i].AppraisalID;
                appraisalHtml += '"><img src="';
                appraisalHtml += disabledAppraisalsThisUnit[i].AppraisalThumbnail;
                appraisalHtml += '"/></a></div></div>'
            }
            */
        }
        appraisalHtml += surveyHtml;
        $(".contentActionRow .activityInner .dynamicQuizzes").html(appraisalHtml);
    }
});
/*Routing*/
BHP.Router = Backbone.Router.extend({
    routes: {
        "faq": "faq",
        "about": "about",
        "privacy": "privacy",
        "glossary": "glossary",
        "termsofservice": "termsofservice",
        "units/:unit_id": "getSpecificUnit",
        "lesson/:lesson_id": "getLesson",
        "media/:media_id": "getMedia",
        "media/:media_id/:flag": "getMedia",
        "search/:searchStr": "search",
        "teacherconsole": "teacherconsole",
        "teacherprofile": "teacherprofile",
        "studentprofile": "studentprofile",
        "assessmentTest/:question": "assessmentTest",
        "assessmentResults/:appraisal_id/:user_id": "assessmentResults",
        "assessment": "assessment",
        "quiz/:quiz_id": "quiz",
        "~/:link": "redirect",
        // *actions always goes last
        "*actions": "syllabus"
    }
});

BHP.router = new BHP.Router();
BHP.router.on('route', function () {
});
BHP.router.on('route:teacherconsoleOLD', function (actions) {
    TrackTimeOnPage();
    var messagesView = new BHP.MessagesView();
    //NOTE: if you dont include the ContentType, this wont work.
    if (typeof (messagesView) != 'undefined') {
        messagesView.collection.fetch({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            error: function (res) {
                //TODO: Log Error
                console.log(res);
                hideLoading();
            }
        });
    } else {
        messagesView.render();
    }
});
BHP.router.on('route:teacherconsole', function (actions) {

    TrackTimeOnPage();
    var tcView = new BHP.TcView();
    tcView.render();
});

BHP.router.on('route:getSpecificUnit', function (unit_id) {
    TrackTimeOnPage();
    showLoading();
    var thisModel = new BHP.UnitModel({ id: unit_id });

    if (typeof (BHP.syllabusCollection) == 'undefined') {

        BHP.syllabusCollection = new BHP.SyllabusCollection();
        //AHH Nested Fetch. Im sure there is a better way. TODO: improve!
        BHP.syllabusCollection.fetch({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            error: function (res) {
                console.log(res);
                hideLoading();
            }
        }).done(function () {
            BHP.unitView = new BHP.UnitView({ model: thisModel });
            thisModel.fetch({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                error: function (res) {
                    //TODO: Log Error
                    console.log(res);
                    hideLoading();
                }
            }).done(function () {
                BHP.unitView.render();
                hideLoading();
            });
        });

    } else {
        BHP.unitView = new BHP.UnitView({ model: thisModel });
        thisModel.fetch({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            error: function (res) {
                //TODO: Log Error
                console.log(res);
                hideLoading();
            }
        }).done(function () {
            BHP.unitView.render();
            hideLoading();
        });
    }
});

BHP.router.on('route:syllabus', function (actions) {
    TrackTimeOnPage();
    //NOTE: if you dont include the ContentType, this wont work.
    if (typeof (BHP.syllabusView) == 'undefined') {
        BHP.syllabusView = new BHP.SyllabusView();
        showLoading();
        BHP.syllabusView.collection.fetch({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            error: function (res) {
                hideLoading();
                alert('Syllabus Not Loaded');
            }
        }).done(function () {
            hideLoading();
            BHP.syllabusCollection = BHP.syllabusView.collection;
        });
    } else {
        BHP.syllabusView.render();
    }




});
BHP.router.on('route:getLesson', function (lesson_id) {
    TrackTimeOnPage();
    var thisLesson = new BHP.lessonView();
    showLoading();
    thisLesson.collection.fetch({
        type: "GET",
        url: "/userservices/lesson/" + lesson_id,
        //data: "{ 'lessonID':'" + lesson_id + "'}",
        url: "/userservices/lesson/" + lesson_id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (res) {
            //TODO: Log Error
            console.log(res);
            hideLoading();
        }

    }).done(function () {
        hideLoading();
    });
});

/*Media Route*/
BHP.router.on('route:getMedia', function (media_id, fromUnit) {
    TrackTimeOnPage();
    if (typeof (BHP.mediaCollection) == 'undefined') {
        BHP.mediaCollection = new BHP.MediaCollection();
        showLoading();
        BHP.mediaCollection.fetch({
            error: function (res) {
                //TODO: Log Error
                console.log(res);
                hideLoading();
            },
            type: "GET",
            contentType: "application/json; charset=utf-8"
        }).done(function () {
            found = BHP.mediaCollection.findWhere({ ID: media_id });
            if (typeof (found) != 'undefined') {
                //This is a fix to allow you to specify the scope you want (unit or lesson) when showing media. If the fromUnit var
                //which comes after the GUID in the url is non-existant, you'll get the unit context.
                //If you want to show the Lesson context, provide a falsy value (0, false).
                //Note: you'll also have to have a lessonID to show the lesson context, so additional content rows dont get screwed up.
                if (typeof (fromUnit) == 'undefined' || typeof (found.attributes.LessonID) == 'undefined') {
                    fromUnit = true;
                } else {
                    fromUnit = false;
                }
                found.attributes.fromUnit = fromUnit;
                BHP.thisMedia = new BHP.MediaView({ model: found });
                BHP.thisMedia.render();
                hideLoading();
            } else {
                //TODO: Log this.
                alert('cannot find media');
                hideLoading();
            }
        });
    } else {

        found = BHP.mediaCollection.findWhere({ ID: media_id });
        if (typeof (fromUnit) == 'undefined' || typeof (found.attributes.LessonID) == 'undefined') {
            fromUnit = true;
        } else {
            fromUnit = false;
        }
        if (typeof (found) != 'undefined') {
            found.attributes.fromUnit = fromUnit;
        } else {
            //TODO: Log this
            alert("Media Not Found");
        }
        BHP.thisMedia = new BHP.MediaView({ model: found });
        BHP.thisMedia.render();
    }
});

BHP.router.on('route:search', function (searchStr) {
    showLoading();
    TrackTimeOnPage();
    
    var thisSearch = new BHP.searchView();
    thisSearch.collection.fetch({
        type: "GET",
        url: "/userservices/search/" + searchStr,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (res) {
            //TODO: Log Error
            console.log(res);
            hideLoading();
        }
    }).done(function(){
        hideLoading();
    });
    thisSearch.render();
});

BHP.router.on('route:studentprofile', function () {
    TrackTimeOnPage();
    var thisStudentProfile = new BHP.StudentProfileView();
    thisStudentProfile.render();
});

BHP.router.on('route:teacherprofile', function () {
    TrackTimeOnPage();
    var thisTeacherProfle = new BHP.TeacherProfileView();
    thisTeacherProfle.render();
});

//    BHP.router.on('route:assessmentTest', function (q) {
//        var assessmentModel = new BHP.AssessmentModel({
//            selectedQuestion: q
//        });
//        //Youll have to find a way to route this w.o recreating it every time,
//        //thats whats happening now, and its why it doesnt remember your answers on back/forward.
//        //Perhaps checking to see if BHP.Assessment exists, and if it does, dont change the model or re-render,
//        //Just fire an event on the view that parses the hash and show/hides correctly?
//        var Assessment = new BHP.AssessmentView({model:assessmentModel});
//        Assessment.render();
//    });

BHP.router.on('route:assessment', function () {
    TrackTimeOnPage();
    var assessmentCollection = new BHP.AssessmentCollection({
        //selectedQuestion: q
    });
    var assessmentView = new BHP.AssessmentView({ collection: assessmentCollection });
    assessmentView.render();
});

BHP.router.on('route:faq', function () {
    TrackTimeOnPage();
    var faq = new BHP.FaqView();
    faq.render();
});

BHP.router.on('route:about', function () {
    TrackTimeOnPage();
    var about = new BHP.AboutView();
    about.render();
});

BHP.router.on('route:termsofservice', function () {
    TrackTimeOnPage();
    var termsofservice = new BHP.TermsOfServiceView();
    termsofservice.render();
});

BHP.router.on('route:privacy', function () {
    TrackTimeOnPage();
    var privacy = new BHP.PrivacyView();
    privacy.render();
});

BHP.router.on('route:glossary', function () {
    TrackTimeOnPage();
    var glossary = new BHP.GlossaryView();
    glossary.render();
});

BHP.router.on('route:quiz', function (quiz_id) {
    TrackTimeOnPage();
    var thisQuiz = new BHP.QuizView();
    thisQuiz.model.fetch({
        type: "GET",
        url: "/userservices/appraisal/" + quiz_id,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (res) {
                //TODO: Log Error
                console.log(res);
                hideLoading();
            }
    });
    thisQuiz.render();
});

BHP.router.on('route:assessmentResults', function (appraisal_id, user_id) {
    TrackTimeOnPage();
    var thisAssessmentResults = new BHP.AssessmentResultsView();
    var thisUrl = "/userservices/Appraisal/{" + appraisal_id + "}/corrections/" + user_id;
    //console.log(thisUrl);
    thisAssessmentResults.model.fetch({
        type: "GET",
        url: thisUrl,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (res) {
                //TODO: Log Error
                console.log(res);
                hideLoading();
            }
    });
    thisAssessmentResults.render();
});

BHP.router.on('route:redirect', function (link) {
    TrackTimeOnPage();
    link = link.split("id=")[1];
    link = link.split("&")[0];
    $.ajax({
        type: "GET",
        url: "/userservices/redirect/" + link,
        contentType: "application/json; charset=utf-8",
        dataType: "xml",
        async: false,
        success: function (data) {
            var routeStr = $(data.getElementsByTagName("string")).text();
            BHP.router.navigate(routeStr, { trigger: true, replace: true });
        }
    });
});

function TrackTimeOnPage() {
    if (typeof tracker !== "undefined") {
        tracker.trackEvent('timeOnPage', Date.now() - tracker.loadTime);
    }
}

var BHP = BHP || {};  ///This sets up the namespace we use in the names below.

//BHP.vent = _.extend({}, Backbone.Events);

//BHP.vent.on("request", function () {
//    
//});

//Main Logging Flag
window.enableLogging = true;



Backbone.Layout.configure({
    manage: true,
    //    fetch: function (path) {
    //        return Handlebars.compile($(path).html());
    //    },
    render: function (template, context) {
        return template(context);
    },
    prefix: "/BigHistoryCourse/templates/",
    fetch: function (path) {
        //See fully annotated source here: https://github.com/tbranyen/backbone.layoutmanager/wiki/Template-rendering
        //if you have any questions around this setup.
        var JST = window.JST || {};
        if (JST[path]) {
            return JST[path];
        }
        var done = this.async();
        $.get(path, function (contents) {
            done(Handlebars.compile(contents));
        }, "text");
    }
});

/*=============Start History ============*/
Backbone.history.start();

/*Backbone Pushstate Enabled*/

$(document).on('click', 'a:not([data-bypass])', function (evt) {
    if ($(evt.currentTarget).attr('target') != '_blank') {
        var href = $(this).attr('href');
        var protocol = this.protocol + '//';
        if (typeof (href) != 'undefined' && href.slice(protocol.length) !== protocol) {
            evt.preventDefault();
            BHP.router.navigate(href, true);
        }
    }
});

//Any links that have target=_blank should leave the page.
$(document).on('click', 'a[target="_blank"]', function (evt) {
    if (typeof ($(this).attr('href')) != 'undefined' && $(this).attr('href') != '') {
        var win = window.open($(this).attr('href'));
        evt.preventDefault();
    }
});



function showLoading(optText) {
    $('.loadingScreen').css('display', 'block').animate({ 'opacity': 1 }, 150);
    if (optText) {
        $('#player-loading span').text(optText);
    } else {
        $('#player-loading span').text("Loading");
    }
}
 function hideLoading(){
    $('.loadingScreen').animate({ 'opacity': 1 }, 250, function () {
        $(this).css('display', 'none')
    });

}
