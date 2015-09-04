var $items;
$(document).ready(function() {
	var $personajes = $.getJSON("js/personajes.json",function (data) {
		$items = data;
		var $select = $("#personaje").empty();
		$.each(data,function (obj) {
			$('<option>',{
				value:obj,
				text:data[obj]
			}).appendTo($select);
		});
	});

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
			var $id = $("#personaje").val()
			$.ajax({
				url:'php/action.php',
				method:'POST',
				data:{
					personaje: '<img height="70px" src="imag/' + $id + '.jpg" title="'+ $items[$id] +'"/>',
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
	$("#personaje").on('change',function(){
		var $id = $("#personaje").val();
		$("#prev").attr('src','imag/'+$id+'.jpg')
	});
	/*setInterval(function(){ 
    	$('#tcomentarios').bootstrapTable('refresh', {silent:false});//code goes here that will be run every 10 seconds.    
	}, 10000);
	*/
});