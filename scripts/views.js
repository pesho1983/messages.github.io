/**
 * Created by Petar Aleksandrov on 11/29/2016.
 */
function start(){
    $('#loadingBox').hide();
    $('#errorBox').hide();
    $('#infoBox').hide();
    $('#viewLogin').hide();
    $('#viewRegister').hide();
    $('#viewUserHome').hide();
    $('#viewArchiveSent').hide();
    $('#viewMyMessages').hide();
    $('#viewSendMessage').hide();

}
function showHideMenuLinks() {
    $("#menu").show();
    if (sessionStorage.getItem('authToken')) {
        // We have logged in user
        $("#linkMenuLogin").hide();
        $("#linkMenuAppHome").hide();
        $("#linkMenuUserHome").show();
        $("#linkMenuRegister").hide();
        $("#linkMenuMyMessages").show();
        $("#linkMenuArchiveSent").show();
        $("#linkMenuSendMessage").show();
        $("#linkMenuLogout").show();

    } else {
        // No logged in user
        $("#linkMenuAppHome").show();
        $("#linkMenuUserHome").hide();
        $("#linkMenuLogin").show();
        $("#linkMenuRegister").show();
        $("#linkMenuMyMessages").hide();
        $("#linkMenuArchiveSent").hide();
        $("#linkMenuSendMessage").hide();
        $("#linkMenuLogout").hide();
    }
}

function showView(viewName) {
    // Hide all views and show the selected view only
    $('main > section').hide();
    $('#' + viewName).show();
}
function showHomeView() {
    showView('viewAppHome');
}
function showLoginView() {
    showView('viewLogin');
    $('#formLogin').trigger('reset');
}
function showRegisterView() {
    $('#formRegister').trigger('reset');
    showView('viewRegister');
}

function showUserHomeView() {
    $('#viewUserHome').trigger('reset');
    showView('viewUserHome');
}

function MenuSendMessage() {
    $('#linkMenuSendMessage').trigger('reset');
    showRecipients();
    showView('viewSendMessage');

}
function viewMyMessages() {
    $('#viewMyMessages').trigger('reset');
    showView('viewMyMessages');
}
function viewArchiveSent() {
    $('#viewArchiveSent').trigger('reset');
    showView('viewArchiveSent');
}