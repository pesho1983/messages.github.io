/**
 * Created by Petar Aleksandrov on 11/29/2016.
 */
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_B1J81F9Xe";
const kinveyAppSecret =
    "b119b44eb6d34ae9aadf9895fde57dca";
const kinveyAppAuthHeaders = {
    'Authorization': "Basic " +
    btoa(kinveyAppKey + ":" + kinveyAppSecret),
};

function registerUser() {
    event.preventDefault();
    let userData = {
        username: $('#registerUsername').val(),
        password: $('#registerPasswd').val(),
        name:   $('#registerName').val()
    };
    $.ajax({
        method: "POST",
        url: kinveyBaseUrl + "user/" + kinveyAppKey + "/",
        headers: kinveyAppAuthHeaders,
        data: userData,
        success: registerSuccess,
        error: handleAjaxError
    });
    function registerSuccess(userInfo) {
        updateSessionData(userInfo);
        saveAuthInSession(userInfo);
        showHideMenuLinks();
        showUserHomeView();
        //listAds();
        showInfo('User registration successful.');
    }
}

function loginUser() {
    event.preventDefault();
    let userData = {
        username: $('#loginUsername').val(),
        password: $('#loginPasswd').val()
    };
    $.ajax({
        method: "POST",
        url: kinveyBaseUrl + "user/" + kinveyAppKey + "/login",
        headers: kinveyAppAuthHeaders,
        data: userData,
        success: loginSuccess,
        error: handleAjaxError
    });
    function loginSuccess(userInfo) {
        updateSessionData(userInfo);
        saveAuthInSession(userInfo);
        showHideMenuLinks();
        showUserHomeView();
        //listAds();
        showInfo('Login successful.');
    }
}
function logoutUser() {
    sessionStorage.clear();
    $('#spanMenuLoggedInUser').text("");
    showHideMenuLinks();
    showView('viewAppHome');
    showInfo('Logout successful.');
}

function updateSessionData(userData) {
    sessionStorage.clear();
    sessionStorage.setItem('user', userData.username);
    sessionStorage.setItem('name', userData.name);
}

function getKinveyUserAuthHeaders() {
    return {
        'Authorization': "Kinvey " +
        sessionStorage.getItem('authToken'),
    };
}
function saveAuthInSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);

    let username = userInfo.username;
    $('#spanMenuLoggedInUser').text(
        "Welcome, {" + username + "}!");
    $('#viewUserHomeHeading').text(
         "Welcome, {" + username + "}!");
}