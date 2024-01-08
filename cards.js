
var width = 40;
var height = 32
var padding = 4;
var cardPadding = 20
var cardWidth = width*5+padding*4+ cardPadding;
var cardHeight = height*5+padding*4+ cardPadding;
var greenBoxArray = new Array(0);
var blackBoxArray = new Array(0);

function initCards(){
	// define document width and height
	var width = 236*3+cardPadding*2, height = 1100;

	// create SVG document and set its size
	for(var nb = 0; nb < 7; nb++){
        var drawer = SVG().addTo('#card-draw').size(width, height)
        var drawerVerso = SVG().addTo('#card-draw').size(width, height)
        var size = 20;
        for(var i = 0; i< 5;i++){

            var cardArray = createCard(drawer, i, false, 0);
            var cardArray = createCard(drawerVerso, i, true, 2);
            var cardArray = createCard(drawer, i, false, 1);
            var cardArray = createCard(drawerVerso, i, true, 1);
            var cardArray = createCard(drawer, i, false, 2);
            var cardArray = createCard(drawerVerso, i, true, 0);
        }
    }
	// var cardArray = createCard(drawer, 1, false);
    // var cardArray = createCard(drawer, 1, true);
    //drawCard(cardArray, drawer);
	// sortBulle(draw, tab, size, height, width);
	// var draw2 = SVG().addTo('#recins').size(width, height)
	
}

function createCard(drawer, cardNb, isVerso, row){
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
    }
    drawCard(cardArray, drawer, cardNb, isVerso, row);
    return cardArray;
}

function drawCard(cardArray, drawer, cardNb, isVerso, row){

    var i = 0;
    var rectY = cardPadding/2 + cardHeight* cardNb + cardNb*cardPadding;
    var rectX = cardPadding/2;
    var rect = drawer.rect(cardWidth, cardHeight).attr({ fill: "rgb(0, 0, 0)"});
    rect.y(cardHeight* cardNb + cardNb*cardPadding);
    
    rectX += (cardWidth +cardPadding) * row;
    rect.x((cardWidth +cardPadding) * row);
    
    rect.radius(10);
    cardArray.forEach(square => {
        if(square == 0){
            var rect = drawer.rect(width, height).attr({ fill: "rgb(0, 0, 0)"});
            rect.attr("stroke-width", 1);
            rect.attr("stroke", "rgb(200, 200, 200)");
            //Drawing the cross
            var line = drawer.line(rectX+padding*2+(width-height)/2, rectY+padding*2, rectX+width-padding*2-(width-height)/2, rectY+height-padding*2);
            line.stroke({ color: '#fff', width: 2, linecap: 'round' })
            var line = drawer.line(rectX+width-padding*2-(width-height)/2, rectY+padding*2, rectX+padding*2+(width-height)/2, rectY+height-padding*2);
            line.stroke({ color: '#fff', width: 2, linecap: 'round' })
        } else if(square == 1){
            var rect = drawer.rect(width, height).attr({ fill: "rgb(50, 150, 50)"});
             //Drawing the cross
             var line = drawer.line(rectX+width/2, rectY+padding*2, rectX+width/2, rectY+height-padding*2);
             line.stroke({ color: '#fff', width: 2, linecap: 'round' })
             var line = drawer.line(rectX+padding*2+(width-height)/2, rectY+height/2, rectX-padding*2+width-(width-height)/2, rectY+height/2);
             line.stroke({ color: '#fff', width: 2, linecap: 'round' })
        } else {
            var rect = drawer.rect(width, height).attr({ fill: "rgb(200, 173, 165)"});
        }
        
       
        rect.x(rectX);
        rect.y(rectY);
        rect.radius(width/8);
        rectX += width + padding;
        if((i+1)%5 == 0){
            rectY+=height + padding;
            rectX = cardPadding/2 + (cardWidth +cardPadding) * row;
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
  