var cart = {};
// var ancart = {};
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        // ancart = JSON.parse(localStorage.getItem('ancart'));
		cart = JSON.parse(localStorage.getItem('ancart'));
            showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            var goods = data;
            var out = '';
			out += "<table>"
			out += "<tr><td><h4>Удалить</td><td></td><td><h4>Наименование товара</td><td><h4>Количество товара</td><td><h4>Цена</td></tr>"
            for (var id in cart) {
                out += `<tr><td><button data-id="${id}" class="del-goods">x</button></td>`;
                out += `<td><img src="images\\${goods[id].img}"></td>`;
                out += `<td> ${goods[id].name  }</td>`;
                out += `<td>  <button data-id="${id}" class="minus-goods">-</button>  `;
                out += ` ${cart[id]}  `;
                out += `  <button data-id="${id}" class="plus-goods">+</button>  </td><td>`;
                out += cart[id]*goods[id].cost;
                out += ' руб.</td></tr>';
				var goods=data
				var count=""
				var cost=""
				var a=""
				var b=""
				var c=""
				for (var id in cart) {
				a = cart[id];
				b=parseInt(a,10);
				count = count + b;
				count=parseInt(count,10);
				cost = cart[id]*goods[id].cost;
				c=c+cost;
				c=parseInt(c,10);
				}
				
	}
			out +='<tr><td colspan=5 align="right">Сумма: '+c+' руб.</td></tr>'
			out += "</table>"
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
            });
        };
    }
	


function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    // delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    // ancart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    //уменьшаем товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
        // delete ancart[id];
    }
    else {
        cart[id]--;
        // ancart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    // localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
    localStorage.setItem('ancart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    if (data==1) {
                        alert('Заказ отправлен');
                    }
                    else {
                        alert('Повторите заказ');
                    }
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }

}


$(document).ready(function () {
   loadCart();
   $('.send-email').on('click', sendEmail); // отправить письмо с заказом
})