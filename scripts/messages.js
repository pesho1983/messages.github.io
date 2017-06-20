function startApp() {
    start();
    sessionStorage.clear();
    showHideMenuLinks();

    $('#linkMenuAppHome').click(showHomeView);
    $("#linkMenuLogin").click(showLoginView);
    $("#linkMenuRegister").click(showRegisterView);
    $("#linkMenuLogout").click(logoutUser);
    $("#linkMenuUserHome").click(showUserHomeView);
    // Bind the form submit buttons
    $("#formLogin input[type=submit]").click(loginUser);
    $("#formRegister input[type=submit]").click(registerUser);
    $("#formSendMessage input[type=submit]").click(sendMsg);

    //UserHomeMenu
    $("#linkUserHomeMyMessages").click(listMsg);
    $("#linkUserHomeArchiveSent").click(listArhivMsg);
    $("#linkUserHomeSendMessage").click(MenuSendMessage);

    //MainMenu
    $("#linkMenuSendMessage").click(MenuSendMessage);
    $("#linkMenuArchiveSent").click(listArhivMsg);
    $("#linkMenuMyMessages").click(listMsg);


// Bind the info / error boxes: hide on click
    $("#infoBox, #errorBox").click(function () {
        $(this).fadeOut();
    });
// Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });

}