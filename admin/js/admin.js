function init() {
    $.post(
        "core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

function categories() {
	$.post(
        "core.php",
        {
            "action" : "catinit"
        },
		function(data){
			data = JSON.parse(data);
			console.log(data);
			var out='<select id="gorder">';
			for (var id in data) {
			out +=`<option data-id="${id}" value="${data[id].category}">${data[id].category}</option>`;
			}
			out +='</select>';
			$('.category').html(out);
		}
    );
	// добавляем категории в список выбора
    
}

function showGoods(data) {
	// добавляем товары в список выбора
    data = JSON.parse(data);
    console.log(data);
    var out='<select>';
    out +='<option data-id="0">Новый товар</option>';
    for (var id in data) {
        out +=`<option data-id="${id}">${data[id].name}</option>`;
    }
    out +='</select>';
    $('.goods-out').html(out);
	$('.goods-out select').on('change', selectgoods);
}

function selectgoods(){
	// выводим выбранное в текстовые поля
	var id = $('.goods-out select option:selected').attr('data-id');
	$.post(
		"core.php",
		{
			"action" : "selectonegoods",
			"gid" : id
		},
		function(data){
			data = JSON.parse(data);
			$('#gname').val(data.name);
			$('#gcost').val(data.cost);
			$('#gdescr').val(data.description);
			$('#gorder').val(data.ord);
			$('#gimg').val(data.img);
			$('#gid').val(data.id);
		}
	);
}

function savetodb(){
	// обновление и добавление записей
	var id = $('#gid').val();
	if (id!=""){
		$.post(
			"core.php",
			{
				"action":"updategoods",
				"id" : id,
				"gname" : $('#gname').val(),
				"gcost" : $('#gcost').val(),
				"gdescr" : $('#gdescr').val(),
				"gorder" : $('#gorder').val(),
				"gimg" : $('#gimg').val(),
			},
			function(data){
				//if (data==1) {
					alert('Запись обновлена');
					init();
					$('#gname').val("");
					$('#gcost').val("");
					$('#gdescr').val("");
					$('#gorder').val("");
					$('#gimg').val("");
				/* } */
				// else {
					/* console.log(data); */
				// }
			}
		);
	}
	else{
		$.post(
			"core.php",
			{
				"action":"newgoods",
				"id" : 0,
				"gname" : $('#gname').val(),
				"gcost" : $('#gcost').val(),
				"gdescr" : $('#gdescr').val(),
				"gorder" : $('#gorder').val(),
				"gimg" : $('#gimg').val(),
			},
			function(data){
				// if (data==1) {
					alert('Запись добавлена');
					init();
				// }
				/* else {
					console.log(data);
				} */
			}
		);
	}
}

$(document).ready(function () {
   init();
   categories();
   $('.add-to-db').on('click', savetodb);
});