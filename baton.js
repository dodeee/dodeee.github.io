function init(){
	// define document width and height
	var width = 1000, height = 400;

	// create SVG document and set its size
	var draw = SVG().addTo('#rec').size(width, height)

	var size = 100;
	var tab = randomTab(size, height);
	var tab2 = randomTab(size, height);

	sortBulle(draw, tab, size, height, width);
	var draw2 = SVG().addTo('#recins').size(width, height)
	sortInsert(draw2, tab2, size, height, width);
	var draw3 = SVG().addTo('#recrapide').size(width, height)
	//sortInsert(draw3, tab2, size, height, width);

	
}

function randomTab(size, height){
	return Array.from({length: size}, () => Math.floor(Math.random() * height));
}

function drawTab(svgDoc, tab, size, globHeight, globWidth, nb, id_elem_comp){
	var width = Math.floor(globWidth/size);
	var b;
	document.getElementById(id_elem_comp).textContent = (nb+" comparaisons");
	for(var j = 0; j < size; j++){
		b = Math.floor(tab[j]*255/globHeight);
		var rect = svgDoc.rect(width, tab[j]).attr({ fill: "rgb(200,"+b+","+b+")"});
		rect.x(width*j);
	}
}

 async function sortBulle(draw, tab, size, height, width){
	var permut = true;
	var passage = 0;
	var nbacces = 0;
	while(permut == true){
		permut = false;
		for(var i = 0;i < size - passage;i++){

			if(tab[i] > tab[i+1]){
				nbacces++;
				var tmp = tab[i];
				tab[i] = tab[i+1];
				tab[i+1] = tmp;
				permut = true;
				draw.clear();
				drawTab(draw, tab, size, height, width, nbacces, "nbbulle");
				await sleep(5);
				//var x = await resolveAfter2Seconds(1);
			}
		}
		
		passage++;
	}

	
	//drawTab(draw, tab, size, height, width, nbacces);
	return tab;
}

async function sortInsert(draw, t, size, height, width){
	var x, y;
	var nbaccesIns=0;
    var elementInsere;
    for (x = 1; x < size;x++) {
        /* Stockage de la valeur en i */
        elementInsere = t[x];
        /* Décale les éléments situés avant t[i] vers la droite
           jusqu'à trouver la position d'insertion */
        for (y = x; y > 0 && t[y - 1] > elementInsere; y--) {
            t[y] = t[y - 1];
            draw.clear();
			drawTab(draw, t, size, height, width, nbaccesIns, "nbinsert");
			await sleep(5);
			nbaccesIns++;
        }
        /* Insertion de la valeur stockée à la place vacante */
        t[y] = elementInsere;
    }
	for(var z = 0; z < size; z++){
		console.log("tab : "+t[z]);
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}