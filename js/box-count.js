// Red & Blue box animation and count function
$(document).ready(function(){	
	$('.square-shape').click(function(){		
		$(this).addClass('active');
		if(!$(this).hasClass('active-blue')){
			$(this).removeClass('active-red').addClass('active-blue');
            $('#Red').html($('.active-red').size());
        	$('#Blue').html($('.active-blue').size());
		}else{
			$(this).removeClass('active-blue').addClass('active-red');
			$('#Red').html($('.active-red').size());
    	    $('#Blue').html($('.active-blue').size());
		}		
	});
});

