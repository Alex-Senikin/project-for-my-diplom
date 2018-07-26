var cart = {}; // корзина
var ancart = {}; // для вывода на странице корзина
function init() {
    //считываем таблицу goods
	$.post(
		"admin/core.php",
		{
			"action":"loadgoods"
		},
		goodsOut
	);
}

function catOut() {
    // вывод на страницу
	$.post(
		"admin/core.php",
		{
			"action":"catinit"
		},
		function(data){
		data=JSON.parse(data);
		console.log(data);
		var out='';
		out += '<ul id="coolMenu"><li id="submenu"><a href="#">Категории</a><ul class="noJS">'
		for (var key in data) {
        // out +='<div class="cart">';
        // out +='<p class="name">'+data[key].name+'</p>';
        // out += '<img src="images/'+data[key].img+'" alt="">';
        // out +='<div class="cost">'+data[key].cost+'</div>';
        // out +='<button class="add-to-cart">Купить</button>';
        // out +='</div>';
        //---------
        // out +='<div class="cart">';
		
		// out +='<tr>'
		out +=`<li><a href="#" class="catchange" data-id="${data[key].category}">${data[key].category}</a></li>`;
        // out +='</div>';
    }
	out += '</ul></li></ul>'
    $('.categories').html(out);
	$('.catchange').on('click', catchange);
	}
);
}

function catchange(){
	t=event.target
	var id=$(t).attr('data-id');
	console.log(id)
	$.post(
		"admin/core.php",
		{
			"action":"catchange",
			"id":id
		},
			goodsOut
		);
		var st='';
		st+='<meta charset="UTF-8"><title>eshop</title> <link rel="stylesheet" href="css/style.css"> <style> body { height:100vh; }  .footer{left:0px;}</style>'
		$('head').html(st);
}

function goodsOut(data) {
    // вывод на страницу
	data=JSON.parse(data);
    console.log(data);
    var out='';
	// out += '<table class="cart" border=1>'
	
    for (var key in data) {
        // out +='<div class="cart">';
        // out +='<p class="name">'+data[key].name+'</p>';
        // out += '<img src="images/'+data[key].img+'" alt="">';
        // out +='<div class="cost">'+data[key].cost+'</div>';
        // out +='<button class="add-to-cart">Купить</button>';
        // out +='</div>';
        //---------
        out +='<div class="cart" width=100%>';
		out += '<table width=980px>'
		out +='<tr><td width=100px>'
        out +=`<img src="images/${data[key].img}" alt=""></td>`;
		out +=`<td width=500px><a href="good.html#${key}" class="name" data-id="${data[key].name}">${data[key].name}</pre></td>`;
        out +=`<td width=200px><pre class="cost">${data[key].cost} руб.</pre></td>`;
        out +=`<td><button class="add-to-cart" data-id="${key}">Купить</button></td></tr>`;
		// out +=`<tr><td><p class="description">${data[key].description}</p></td></tr>`;
		out += '</table>'
        out +='</div>';
    }
	
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}


function addToCart() {
//добавляем товар в корзину
    var id = $(this).attr('data-id');
	$.post(
		"admin/core.php",
		{
			"action":"cartadding",
			"id":id
		},
		function(data){
			data = JSON.parse(data);
			console.log(data);
			if (cart[data.name]==undefined) {
				cart[data.name] = 1;
				ancart[id] = 1;
			}else 
			{
					cart[data.name]++;
					ancart[id]++
				}
			console.log(cart)
			showMiniCart();
			saveCart();
		}
	); 
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
	localStorage.setItem('ancart', JSON.stringify(ancart));
}

function showMiniCart() {
    //показываю мини корзину
    var out="";
	$.getJSON('goods.json', function (data) {
		var goods=data
		var count=""
		var cost=""
		var a=""
		var b=""
		var c=""
    for (var id in ancart) {
		a = ancart[id];
		b=parseInt(a,10);
		count = count + b;
		count=parseInt(count,10);
		cost = ancart[id]*goods[id].cost;
		c=c+cost;
		c=parseInt(c,10);
    }
		out += 'Товаров';
		out += ` ${count}`;
        out += ' на сумму ';
		out += `${c}`;
		$('.mini-cart').html(out);
	})
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        ancart = JSON.parse(localStorage.getItem('ancart'));
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    init();
    loadCart();
	catOut();
});
