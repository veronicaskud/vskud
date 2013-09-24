function Contains(roleCollection, roleName) {
    var returnMe = false;
    for (var i = 0; i < roleCollection.length; i++) {
        if (roleCollection[i] == roleName) {
            returnMe = true;
        }
    }
    return returnMe;
}


function ObjectHelper(paramMainObject) {
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

} //End ObjectHelper