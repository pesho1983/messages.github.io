/**
 * Created by Petar Aleksandrov on 11/29/2016.
 */
function formatDate(dateISO8601) {
    let date = new Date(dateISO8601);
    if (Number.isNaN(date.getDate()))
        return '';
    return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
        "." + date.getFullYear() + ' ' + date.getHours() + ':' +
        padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

    function padZeros(num) {
        return ('0' + num).slice(-2);
    }
}
function showRecipients() {
    $('#msgRecipientUsername').empty();
    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "user/" + kinveyAppKey,
        headers: getKinveyUserAuthHeaders(),
        success: addUsersToSelsec,
        error: handleAjaxError
    });
    function addUsersToSelsec(data) {
        for (let user of data)
            $('#msgRecipientUsername').append(`<option value="${user.username}">${user.name} (${user.username})</option>`);
    }

}

function sendMsg() {
    event.preventDefault();
    showView('viewSendMessage');

    let msgData = {
        sender_username: sessionStorage.getItem('user'),
        sender_name: sessionStorage.getItem('name'),
        recipient_username: $('#msgRecipientUsername').val(),
        text: $('#formSendMessage input[name=text]').val()
    };

    $.ajax({
        method: "POST",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/messages",
        headers: getKinveyUserAuthHeaders(),
        data: msgData,
        success: sendMsgSuccess,
        error: handleAjaxError
    });
    function sendMsgSuccess(response) {
        $('#formSendMessage input[name=text]').val('');
        showInfo('Message sent.');
        listArhivMsg();
    }
}

function listMsg() {
    event.preventDefault();

    showView('viewMyMessages');
    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + `/messages?query={"recipient_username":"${sessionStorage.getItem('user')}"}`,
        headers: getKinveyUserAuthHeaders(),
        success: loadMsgSuccess,
        error: handleAjaxError
    });
    function loadMsgSuccess(msgs) {
        showInfo('Messages loaded.');
        $('#myMessages').empty();
        if (msgs.length == 0) {
            $('#myMessages').text('No messages send.');
        } else {

            let msgTable = $('<table>')
                .append($('<thead><tr><th>From</th><th>Message</th><th>Date Received</th></tr></thead>')).append($('<tbody>'));
            for (let msg of msgs)
                appendMsgRow(msg, msgTable);
            $('#myMessages').append(msgTable);
        }
    }

    function appendMsgRow(msg, msgTable) {
        msgTable.append($('<tr>').append(
            $('<td>').text(msg.sender_name),
            $('<td>').text(msg.text),
            $('<td>').text(formatDate(msg._kmd.lmt))
        ));

    }
}

function listArhivMsg() {
    event.preventDefault();

    showView('viewArchiveSent');
    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + `/messages?query={"sender_username":"${sessionStorage.getItem('user')}"}`,
        headers: getKinveyUserAuthHeaders(),
        success: loadMsgSuccess,
        error: handleAjaxError
    });
    function loadMsgSuccess(msgs) {
        showInfo('Messages loaded.');
        $('#sentMessages').empty();
        if (msgs.length == 0) {
            $('#sentMessages').text('No messages send.');
        } else {

            let msgTable = $('<table>')
                .append($('<thead><tr><th>To</th><th>Message</th><th>Date Received</th><th>Actions</th></tr></thead>')).append($('<tbody>'));
            for (let msg of msgs)
                appendMsgRow(msg, msgTable);
            $('#sentMessages').append(msgTable);
        }
    }

    function appendMsgRow(msg, msgTable) {
            let deleteLink = $('<button>Delete</button>')
                .click(function () { deleteMsg(msg) });

        msgTable.append($('<tr>').append(
            $('<td>').text(msg.recipient_username),
            $('<td>').text(msg.text),
            $('<td>').text(formatDate(msg._kmd.lmt)),
            $('<td>').append(deleteLink)
        ));

    }
}

function deleteMsg(data) {
    $.ajax({
        method: "DELETE",
        url: kinveyBookUrl = kinveyBaseUrl + "appdata/" +
            kinveyAppKey + "/messages/" + data._id,
        headers: getKinveyUserAuthHeaders(),
        success: deleteMsgSuccess,
        error: handleAjaxError
    });
    function deleteMsgSuccess(response) {
        listArhivMsg();
        showInfo('Message deleted.');
    }
}