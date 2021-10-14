$('#btn-create').click(function () {
    const name = $('#add-form #name').val();
    const description = $('#add-form #description').val();
    const price = $('#add-form #price').val();
    const image = $('#add-form #image').val();

    if (name && description && price && image) {
        const products = JSON.parse(localStorage.getItem('products')) ?? [];
        products.push({
            id: (products.length + 1),
            name: name,
            description: description,
            price: price,
            image: image
        });

        localStorage.setItem('products', JSON.stringify(products));

        $('#add-form input').val('');
    }
    printProducts();
});

function printProducts(minPrice = 0, maxPrice = 1000) {
    $("#products").empty();
    const products = JSON.parse(localStorage.getItem('products')) ?? [];
    products
    .filter(o => o.price > minPrice && o.price < maxPrice)
    .forEach(p => {
        $("#products").append(
            `<div class="col-12 col-md-6 col-lg-3 product">
        <div class="card">
        <img class="card-img-top" src="${p.image}" alt="">
        <div class="card-body">
            <h5 class="card-title">${p.name} 
            <span>${priceString(p.price)}</span>
            </h5>
            <p class="card-text">${p.description}</p>
            <button class="btn btn-primary btn-block btn-delete" id="${p.id}">Ištrinti</button>
            </div> </div>
        </div>`
        );

    });
}
printProducts();



$('.btn-delete').click(function () {
    let products = JSON.parse(localStorage.getItem('products')) ?? [];
    products = products.filter(p => p.id != this.id);
    localStorage.setItem('products', JSON.stringify(products));
    printProducts();
});


$('#rangeval').html(priceString(0) + " - " + priceString(1000));
$(function () {
    $('#rangeslider').slider({
        range: true,
        min: 1,
        max: 1000,
        values: [0, 1000],
        slide: function (event, ui) {
            $('#rangeval').html(priceString(ui.values[0]) + " - " + priceString(ui.values[1]));
            printProducts(ui.values[0], ui.values[1]);
        }
    });
});


function priceString(price) {
    return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(price);
}