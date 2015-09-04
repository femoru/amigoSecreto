$(document).ready(function() {
	var $summernote = $('#summernote');
	var summerParams = {
		height:170,
		lang: 'es-ES',
		toolbar: [
		    //[groupname, [button list]]
		     
		    ['style', ['bold', 'italic', 'underline', 'clear']],
		    ['fontsize', ['fontsize']],
		    ['color', ['color']],
			['insert', ['picture']],
		],
		onKeydown: function(e) {
			if(e.ctrlKey && e.keyCode == 13){
				guardar();
			}
		}
	};

	var guardar = function(){
		if(!$summernote.summernote('isEmpty')) {
			$.ajax({
				url:'php/action.php',
				method:'POST',
				data:{
					personaje:$("#personaje").val(),
					comentario:$summernote.code()
				},
				success:function(data,textStatus,jqXHR ){
					$('#collapseOne').collapse('toggle');
					$('#tcomentarios').bootstrapTable('refresh', {silent:true});
					$summernote.code("<p><br></p>")
				},
				error:function(jqXHR, textStatus, errorThrown){
					console.log(errorThrown);
				}
			});
		}
	}

	$summernote.summernote(summerParams);

	$('#enviar').click(guardar);
	setInterval(function(){ 
    	$('#tcomentarios').bootstrapTable('refresh', {silent:true});//code goes here that will be run every 5 seconds.    
	}, 10000);
});