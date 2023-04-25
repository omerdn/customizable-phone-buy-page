// Object array for changing something quickly
const ITEMS = {
  proID: "#pro",
  proName: "Phone 01", 
  proPrice: 999,
  proMaxID: "#pro_min",
  proMaxName: "Phone 01 Ultra",
  proMaxPrice: 1299,

  storageID1: "#128gb",
  storageID1_price: 0,
  storageID2: "#256gb",
  storageID2_price: 229,
  storageID3: "#512gb",
  storageID3_price: 499,
};

// Starting values for variables to not getting error
let phonePrice = 0;
let storagePrice = 0;
let specialCharger = 0;
let phoneColor = 0;
let fairPds = 0;
let fullPrice = 0;
let productName;
let addPurchases = [];

// functions for efficency.
modelSelection(ITEMS.proID, ITEMS.proName, ITEMS.proMaxID, ITEMS.proPrice);
modelSelection(ITEMS.proMaxID, ITEMS.proMaxName, ITEMS.proID, ITEMS.proMaxPrice);

storageDeclare(ITEMS.storageID1, ITEMS.storageID1_price);
storageDeclare(ITEMS.storageID2, ITEMS.storageID2_price);
storageDeclare(ITEMS.storageID3, ITEMS.storageID3_price);

colorChanger(black);
colorChanger(blue);
colorChanger(yellow);
colorChanger(red);
colorChanger(green);

optionalSection("#fairpoods", " Fairpoods", "fairpodsPrice", 599);
optionalSection("#charger", " Charging Adapter", "chargerPrice", 49);

// Phone model selection function
function modelSelection(modelId, modelName, otherModelId, modelPrice) {
  $(modelId).click(function () {
    productName = modelName;
    checkedCheck(this, otherModelId);
    onPrice("pricePhone", modelPrice);
    onPrice("storagePrice", 0);
    checkedCheck("#128gb", ".others");
    $("#footer").css("bottom", "0");
    $(".color_section").removeClass("button_unusable");
  });
}

// Optional selections function
function optionalSection(optionID, optName, varName, price) {
  $(optionID).click(function () {
    $(this).toggleClass("checked");
    if ($(this).hasClass("checked")) {
      addPurchases.push(optName);
      onPrice(varName, price);
    } else {
      addPurchases.splice(addPurchases.indexOf(` ${optName}`), 1);
      onPrice(varName, 0);
    }
  });
}

// Changing - declaring prices which is going to... with using onPrice()
// varName: *write which element will be added to result* // priceOf: *insert its price*
function onPrice(varName, priceOf) {
  switch (varName) {
    case "pricePhone":
      phonePrice = priceOf;
      break;
    case "chargerPrice":
      specialCharger = priceOf;
      break;
    case "storagePrice":
      storagePrice = priceOf;
      break;
    case "chargerPrice":
      specialCharger = priceOf;
      break;
    case "fairpodsPrice":
      fairPds = priceOf;
      break;
  }
  finalPrice();
}

// Calculating final price ever for each choosing...
function finalPrice() {
  fullPrice = phonePrice + storagePrice + phoneColor + specialCharger + fairPds;
  $("#productname").text(productName + addPurchases);
  $("#fullprice_show").text(
  "$" + fullPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
}

// Adding blue border to buttons
// clickid: what is you going to add blue-border, so means what you clicked
// ifhasid: what is/are you dont want to has blue borders
function checkedCheck(clickid, ifhasid) {
  if (!$(ifhasid).hasClass("checked")) {
    $(clickid).addClass("checked");
  } else {
    $(ifhasid).removeClass("checked");
    $(clickid).addClass("checked");
  }
}

// Color changer, giving access to use storage selection and optionals
function colorChanger(colorName) {
  $(colorName).click(function () {
    $("#phoneimg").attr("src", "img/" + colorName.id + ".png");
    $(".storage_section").removeClass("button_unusable");
  });
}

// Making storage's own prices
// whichClick: which storage you going to choose (using with "#id" format)
// storagePriceDefiner: declare the price of it. Use numbers.
function storageDeclare(whichClick, storagePriceDefiner) {
  $(whichClick).click(function () {
    checkedCheck(this, ".others");
    onPrice("storagePrice", storagePriceDefiner);
  });
}
