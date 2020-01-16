function init(){
	// define document width and height
	var width = 1000, height = 400;

	// create SVG document and set its size
	var draw = SVG().addTo('#rec').size(width, height)

	var size = 20;
	var tab = randomTab(size, height);
	var tab2 = randomTab(size, height);
	var tab3 = randomTab(size, height);

	sortBulle(draw, tab, size, height, width);
	var draw2 = SVG().addTo('#recins').size(width, height)
	sortInsert(draw2, tab2, size, height, width);
	var draw3 = SVG().addTo('#recrapide').size(width, height)
	sortRapide(draw3, tab3, size, height, width);

	
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

}

function sortRapide(draw, tab, size, height, width){
	quickSort(tab, 0, size -1);
	for(var z = 0; z < size; z++){
		console.log("tab : "+t[z]);
	}
}

function quickSort(tab, low, high)
{
    if (low < high){
        /* pi is partitioning index, arr[pi] is now
           at right place */
        var pi = partition(tab, low, high);
        quickSort(tab, low, pi - 1);  // Before pi
        quickSort(tab, pi + 1, high); // After pi
    }
}

function partition (arr, low, high){
    // pivot (Element to be placed at right position)
    var pivot = arr[high];  
    var i = (low - 1)  // Index of smaller element
    for (var j = low; j <= high- 1; j++){
        // If current element is smaller than the pivot
        if (arr[j] < pivot){
            i++;    // increment index of smaller element
            var tmp = arr[i];//swap arr[i] and arr[j]
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
    var tmp = arr[i+1];
    arr[i+1] = arr[high];
    arr[high] = tmp;
    //swap arr[i + 1] and arr[high])
    return (i + 1);
}



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}