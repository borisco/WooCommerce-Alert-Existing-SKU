jQuery(document).ready(function($) {
	var searchDelay;

    // Disabling the autocomplete in the sku field
    $('#_sku').attr( 'autocomplete', 'off' );

    // Adding the span Field to show messages
    $('._sku_field').append('<img id="sku-loading" width="16" height="16" src="{image}" style="display: none;" />'.replace('{image}', waesParams.gifLoading));
    $('._sku_field').append('<span id="sku-message" style="display: none;"></span>');
    $('._sku_field').append('<div id="sku-list" style="display: none;"></div>');
    $('#sku-list')
        .append('<p>{reference}:</p>'.replace('{reference}', objectL10n.reference))
        .append('<ul id="list-ul"></ul>');
    
    function fillList (sku_list) {
        $('#list-ul').html('');
        sku_list.forEach(function(entry) {
            $('#list-ul').append('<li>&#x2713; ' + entry + '</li>')
        });
        $('#sku-list').show();
    }

    function ajaxSearchSku() {
        var spanMessage = $('#sku-message');

        // Show the loaging image
        $('#sku-loading').show();

        var data = {
	        action: 'waes_load_sku',
	        postID: $('#post_ID').val(),
	        newSKU: $('#_sku').val()
	    };

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: data,
            dataType: 'json',
            success: function(response) {

                if (response['sku_list'].length > 0)
                    fillList(response['sku_list']);

                if ( response['valid'] == true ) {
                    spanMessage.addClass('success');
                    spanMessage.removeClass('error');
                }
                else {
                    spanMessage.removeClass('success');
                    spanMessage.addClass('error');
                }
                spanMessage.html('<strong>' + response['message'] + '</strong>');
                // Hide the loading image and display the message
                $('#sku-loading').hide();
                spanMessage.show();
            }
        });
    }

    $("#_sku").bind("paste keyup", function() {
        $('#sku-message').hide();
        $('#sku-list').hide();
        
        if ( $(this).val().length > 2 ) {
            // If still waiting cancel
            if (searchDelay) {
                window.clearTimeout(searchDelay);
                delete searchDelay;
            }

            // Start the search after 300 miliseconds
            searchDelay = window.setTimeout(function (){
    		    // Call the Search
    	    	ajaxSearchSku();
            }, 300);
        }
    });
});