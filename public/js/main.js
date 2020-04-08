$(document).ready(function() {
	sendContactForm();
});

function sendContactForm() 
{
 	$('#sendMessageForm').on('submit', function(e) {
    	event.preventDefault();
  		let parameters = $(this).serialize()
		$.post('/ajax', parameters, function(data) {
			console.log(data);
       		$('#results').html(data);
     	});
    });
}
