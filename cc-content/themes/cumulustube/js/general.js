$(document).ready(function(){

    var baseURL = $('[name=baseURL]').attr('content');

    // Default text Focus
    $('.defaultText').focus(function(){

        // Swap hidden password fields if applicable
        if ($(this).hasClass('defaultTextPassword')) {
            var password = $(this).next();
            $(this).hide();
            password.show().focus();
        }

        // Clear default text
        if ($(this).val() == $(this).attr('title') && !$(this).hasClass('customText')) {
            $(this).addClass('customText');
            $(this).val('');
        }

    });

    // Default text Blur
    $('.defaultText').blur(function(){

        // Add default text
        if ($(this).val() == '') {
            $(this).removeClass('customText');
            $(this).val($(this).attr('title'));

            // Swap password field / Make hidden
            if ($(this).attr('type') == 'password') {
                var password = $(this).prev();
                $(this).hide();
                password.show().blur();
            }
        }
        
    });




    // Show/Hide Block
    $('.showhide').click(function(){
        var block = $(this).attr('data-block');
        if ($('#'+block).css('display') == 'none') {
            $('#'+block).show();
        } else {
            $('#'+block).hide();
        }
        return false;
    });




    // Attach submit action to buttons
    $('.button, .button-small').click(function(){
        var parentForm = $(this).closest('form');
        if (parentForm.length) {
            parentForm.submit();
        }
        return false;
    });

    // Allow submission of forms with Return key
    $('form input').keydown(function(event){
        var code = event.keyCode ? event.keyCode : event.which;
        var parentForm = $(this).closest('form');
        if (code == 13 && parentForm.length) {
            parentForm.submit();
            return false;
        }
    });




    // Attach confirm popup to confirm action links
    $('.confirm').click(function() {
        
        // Code to execute once string is retrieved
        var location = $(this).attr('href')
        var callback = function (confirmString){
            var agree = confirm (confirmString);
            if (agree) window.location = location;
        }

        // Retrieve confirm string
        GetText (callback, $(this).data('node'), $(this).data('replacements'));
        return false;
    });




    // Trigger the file browse window
    $('#browse-button').click(function(){
        $('#upload').trigger('click');
        return false;
    });

    // Add hidden upload filename to styled upload field
    $('#upload').change(function(){
        $('#upload-visible').val($('#upload').val());
    });




    // Attach favorite action to favorite links / buttons
    $('.favorite').click(function(){
        var url = baseURL+'/actions/favorite/';
        var data = {video_id: $(this).attr('data-video')};
        executeAction (url, data);
        return false;
    });




    // Attach flag action to flag links / buttons
    $('.flag').click(function(){
        var url = baseURL+'/actions/flag/';
        var data = {type: $(this).attr('data-type'), id: $(this).attr('data-id')};
        executeAction (url, data);
        return false;
    });




    // Attach Subscribe & Unsubscribe action to buttons
    $('.subscribe').click(function(){

        var subscribeType = $(this).attr('data-type');
        var url = baseURL+'/actions/subscribe/';
        var data = {type: subscribeType, member: $(this).attr('data-member')};
        var subscribeButton = $(this);


        // Callback for AJAX call - Update button if the action (subscribe / unsubscribe) was successful
        var callback = function (responseData) {
            
            // Prepare for Unsubscription
            if (responseData.result == 1 && subscribeType == 'subscribe') {

                // Update button & change text
                subscribeButton.attr('data-type','unsubscribe');
                GetText(function(buttonText){
                    subscribeButton.find('span').text(buttonText);
                },'unsubscribe');

            // Prepare for Subscription
            } else if (responseData.result == 1 && subscribeType == 'unsubscribe') {

                // Update button & change text
                subscribeButton.attr('data-type','subscribe');
                GetText(function(buttonText){
                    subscribeButton.find('span').text(buttonText);
                },'subscribe');

            }
        }

        executeAction (url, data, callback);
        return false;
        
    });




    // Attach rating action to like & dislike links
    $('.rating').click(function(){
        var url = baseURL+'/actions/rate/';
        var data = {video_id: $(this).attr('data-video'), rating: $(this).attr('data-rating')};
        var callback = function (responseData) {
            if (responseData.result == 1) {

                var like;
                like.html('span')
                    .addClass('like')
                    .text(responseData.other.likes);

                var dislike;
                dislike.html('span')
                    .addClass('dislike')
                    .text(responseData.other.dislikes);

                $('#rating-text').append(like, dislike);
            }
        }
        executeAction (url, data, callback);
        return false;
    });




    // Attach comment action to comment forms
    $('#comments-form').submit(function(){
        var url = baseURL+'/actions/comment/';
        var callback = function (responseData) {
            console.log(responseData);
            $('#comments').prepend(responseData.other);
            $('#comments-form')[0].reset();
        }
        executeAction (url, $(this).serialize(), callback);
        return false;
    });




    // Attach post status update action to status update forms
    $('#status-form').submit(function(){
        var url = baseURL+'/actions/post/';
        var callback = function(responseData) {
            $('#status-posts').prepend(responseData.other);
            $('#status-form')[0].reset();
        }
        executeAction (url, $(this).serialize(), callback);
        return false;
    });

    // Make status update field expand on initial focus
    $('#status-form .text').focus(function(){
        $(this).css('height', '80');
    });

}); // END jQuery





/****************
GENERAL FUNCTIONS
****************/

/**
 * Retrieve localised string via AJAX
 * @param function callback Code to be executed once AJAX call to retrieve text is complete
 * @param string node Name of term node in language file to retrieve
 * @param json replacements (Optional) List of key/value replacements in JSON format
 * @return void Requested string, with any replacements made, is passed to callback
 * for any futher behaviour
 */
function GetText(callback, node, replacements) {
    $.ajax({
        type        : 'POST',
        url         : '/language/get/',
        data        : {node:node, replacements:replacements},
        success     : callback
    });
}




/**
 * Send AJAX request to the action's server handler script
 * @param string url Location of the action's server handler script
 * @param json || string data The data to be passed to the server handler script
 * @param function callback (Optional) Code to be executed once AJAX call to handler script is complete
 * @return void Message is display according to server response. Any other
 * follow up behaviour is performed within the callback
 */
function executeAction (url, data, callback) {
    $.ajax({
        type        : 'POST',
        data        : data,
        dataType    : 'json',
        url         : url,
        success     : function(responseData, textStatus, jqXHR){
            displayMessage (responseData.result, responseData.msg);
            if (typeof callback != 'undefined') callback (responseData, textStatus, jqXHR);
        }
    });
}




/**
 * Display message sent from the server handler script for page actions
 * @param boolean result The result of the requested action (1 = Success, 0 = Error)
 * @param string message The textual message for the result of the requested action
 * @return void Message block is displayed and styled accordingly with message.
 * If message block is already visible, then it is updated.
 */
function displayMessage (result, message) {
    var cssClass = (result == 1) ? 'success' : 'error';
    var existingClass = ($('#message').hasClass('success')) ? 'success' : 'error';
    $('#message').show();
    $('#message').html(message);
    $('#message').removeClass(existingClass);
    $('#message').addClass(cssClass);
}