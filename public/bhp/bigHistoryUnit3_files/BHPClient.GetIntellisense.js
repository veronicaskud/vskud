function GetIntellisenseForBHUser(thisUser) {
    this.PasswordGeneratedBy = thisUser.PasswordGeneratedBy;
    this.UserName = thisUser.UserName;
    this.FirstName = thisUser.FirstName;
    this.LastName = thisUser.LastName;
    this.Email = thisUser.Email;
    this.IsSampleUser = thisUser.IsSampleUser;
    this.MyRoles = thisUser.MyRoles;
    this.MembershipUserKey = thisUser.MembershipUserKey;
    this.IHaveSeenMyProfilePage = thisUser.IHaveSeenMyProfilePage;
    this.UserHasProfile = thisUser.UserHasProfile;
    this.MyCacheKey = thisUser.MyCacheKey;
    this.TeacherProfile = thisUser.TeacherProfile;
    this.StudentProfile = thisUser.StudentProfile;
    this.TimeMessagesViewedLast = thisUser.TimeMessagesViewedLast;
}

function GetIntellisenseForBHMenuItem(thisItem) {
    this.Text = thisItem.Text;
    this.URL = thisItem.URL;
}


function GetIntellisenseBHPeriod(thisPeriod) {
    this.SystemName = thisPeriod.SystemName;
    this.NumberOnly = thisPeriod.NumberOnly;
    this.Color = thisPeriod.Color;
    this.ColorStyle = thisPeriod.ColorStyle;
    this.CurrentPeriodImage = thisPeriod.CurrentPeriodImage;
    this.PeriodProgress = thisPeriod.PeriodProgress;
    this.PeriodColorName = thisPeriod.PeriodColorName;
    pthis.GradeLevelsAsString = thisPeriod.GradeLevelsAsString;
    this.ScheduleAsListString = thisPeriod.ScheduleAsListString;
    this.GradeLevelsAsListString = thisPeriod.GradeLevelsAsListString;
    this.StudentsAsListString = thisPeriod.StudentsAsListString;
    this.Name = thisPeriod.Name;
    this.Exists = thisPeriod.Exists;
    this.PeriodSchedule = thisPeriod.PeriodSchedule;
    this.TotalStudentsWhoHaveNotAcceptedInvite = thisPeriod.TotalStudentsWhoHaveNotAcceptedInvite;
    this.TotalStudentsWhoHaveAcceptedInvite = thisPeriod.TotalStudentsWhoHaveAcceptedInvite;
    this.TotalStudents = thisPeriod.TotalStudents;
    this.PeriodID = thisPeriod.PeriodID;
    this.CourseID = thisPeriod.CourseID;
}

