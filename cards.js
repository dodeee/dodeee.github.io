
var width = 40;
var height = 32
var padding = 5;
var cardPadding = 20
var cardWidth = width*5+padding*4+ cardPadding;
var cardHeight = height*5+padding*4+ cardPadding;
var greenBoxArray = new Array(0);
var blackBoxArray = new Array(0);

function init(){
	// define document width and height
	var width = 1000, height = 4000;

	// create SVG document and set its size
	var drawer = SVG().addTo('#card-draw').size(width, height)

	var size = 20;
    for(var i = 0; i< 10;i++){
        var cardArray = createCard(drawer, i, false);
        var cardArray = createCard(drawer, i, true);
    }
    
	// var cardArray = createCard(drawer, 1, false);
    // var cardArray = createCard(drawer, 1, true);
    //drawCard(cardArray, drawer);
	// sortBulle(draw, tab, size, height, width);
	// var draw2 = SVG().addTo('#recins').size(width, height)
	
}

function createCard(drawer, cardNb, isVerso){
    var greenBoxNb = 0;
    var blackBoxNb = 0;
    while(greenBoxNb < 9 || blackBoxNb < 3){
        var cardArray = new Array(25);
        greenBoxNb = 0;
        blackBoxNb = 0;
        if(!isVerso){
            greenBoxArray = new Array();
            blackBoxArray = new Array();
        }
        if(isVerso){
            var shuffledGreen = shuffleArray(greenBoxArray);
            cardArray[shuffledGreen[0]] = 1;
            cardArray[shuffledGreen[1]] = 1;
            cardArray[shuffledGreen[2]] = 1;
            greenBoxNb+=3;
            var shuffledBlack = shuffleArray(blackBoxArray);
            cardArray[shuffledBlack[0]] = 0;
            console.log("blackboxshuffle : "+shuffledBlack)
            blackBoxNb++;
            // greenBoxArray = new Array(0);
            // blackBoxArray = new Array(0);
        }
        for(var i = 0; i < 25; i++){
            if(cardArray[i] === undefined){
                var randNb = Math.floor(Math.random() * 5);
                if(randNb == 0 && blackBoxNb < 3 && (!isVerso || (isVerso && !blackBoxArray.includes(i)))){
                    cardArray[i] = randNb;
                    blackBoxNb++;
                    if(!isVerso)
                        blackBoxArray.push(i);
                } else if(randNb == 1 && greenBoxNb < 9 && (!isVerso || (isVerso && !greenBoxArray.includes(i)))){// (isVerso && !greenBoxArray.includes(i))){
                    cardArray[i] = randNb;
                    greenBoxNb++;
                    if(!isVerso)
                        greenBoxArray.push(i);
                } else{
                    cardArray[i] = 2;
                }
            }
        }
        console.log(greenBoxNb + " , " + blackBoxNb);
    }
    drawCard(cardArray, drawer, cardNb, isVerso);
    console.log(cardArray);
    return cardArray;
}

function drawCard(cardArray, drawer, cardNb, isVerso){

    var i = 0;
    var rectY = cardPadding/2 + cardHeight* cardNb + cardNb*cardPadding;
    var rectX = cardPadding/2;
    var rect = drawer.rect(cardWidth, cardHeight).attr({ fill: "rgb(0, 0, 0)"});
    rect.y(cardHeight* cardNb + cardNb*cardPadding);
    if(isVerso){
        rectX += cardWidth +cardPadding;
        rect.x(cardWidth +cardPadding);
    }
    rect.radius(10);
    cardArray.forEach(square => {
        if(square == 0){
            var rect = drawer.rect(width, height).attr({ fill: "rgb(0, 0, 0)"});
		    rect.x(width * i);
        } else if(square == 1){
            var rect = drawer.rect(width, height).attr({ fill: "rgb(0, 200, 0)"});
		    rect.x(width * i);
        } else {
            var rect = drawer.rect(width, height).attr({ fill: "rgb(200, 200, 200)"});
		    rect.x(width * i);
        }
        
       
        rect.x(rectX);
        rect.y(rectY);
        rect.radius(width/6);
        rectX += width + padding;
        if((i+1)%5 == 0){
            rectY+=height + padding;
            rectX = cardPadding/2;
            if(isVerso)
                rectX += cardWidth +cardPadding;
        }
        i++;
    });
}

// define a function that can be reused
const shuffleArray = (array) => {
    // create a copy of the array so that the original array is not mutated
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  