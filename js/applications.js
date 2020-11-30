console.log("hei you");
$(document).ready(function () {
  var total = 0;
  var sum = function () {
    var prices = $(".item-price");
    var qtys = $(".quantity");
    total = 0;

    for (i=0; i<qtys.length; i++) {
      var price = Number($(prices[i]).text().replace(/\£/,""));
      var subtotal = (Number($(qtys[i]).val())) * price;
      if (subtotal != 0) {
        $($(".item-subtotal")[i]).text("£" + subtotal);
      } else {
        $($(".item-subtotal")[i]).text("£__.__");
      }
      total += subtotal;
    }
    $("#total-price").text("£" + total);
    var addSpace = "";
    var spaces = total.toString();
    spaces = spaces.length;
    spaces = 12 - spaces;
    for (i=0; i<spaces; i++) {
      addSpace += " ";
    }
    return total;
  }

  var addItem = function (name, cost) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $("#items-list").prepend('<div class="row items"> \ <div class="item name col-xs-3"> \ ' + name + '\ </div> \ <div class="item-price col-xs-3"> \ £' + cost + '.00 \ </div> \ <div class="item qty col-xs-3"> \ <label>QTY</label> \ <input class="quantity" type="number"> \ </div> \ <div class="col-xs-1"> \ <button type="button" class="remove btn btn-primary"> \ Remove \ </button> \ </div> \ <div class="item-subtotal col-xs-2"> \ £__.__ \ </div>\ </div>' );
  }

  var sorItem = function () {
    var prices = $(".item-price");
    var names = $(".item-name");
    var priceName = [];
    for (i=0; i<prices.length; i++) {
      var price = $(prices[i]).text().trim()
      var name = $(names[i]).text().trim();
      prices.push([name, price]);
    }
    priceName.sort();
    console.log(priceName);
    for (i=0; i< priceName.length; i++) {
      $($(".item-name")[i]).text(priceName[i][0]);
      $($(".item-price")[i]).text(priceName[i][1]);
    }
  }
  

  $(document).on("click", "#sort", function() {
    sortItem();
  });
  $(document).on("click", "#adding", function() {
    addItem($("#name").val(), $("#cost").val());
  });
  $(document).on("click", ".remove", function() {
    $(this).parents(".row").remove();
    sum();
  });
  $("input").keydown(function(e){
    if (e.which == 13) {
      sum();
    };
  });
  $(document).on("keyup", ".quantity", function() {
    sum();
  });
  $(document).on("keydown", "#cost", function(e) {
    if (e.which == 13) {
      addItem($("#name").val(), $("#cost").val());
    };
  });
  $("#calc-prices-button").click(function(){
    sum();
  })
})
