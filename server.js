"use strict";
var selected_colours = [];
var mode = 0;
var change = 1;
//call unselect if selected, call select if unselected
function AmIPressed(img)
{
	if(img.src.indexOf('pressed') === -1)
	{
		Select(img);
	}
	else
	{
		UnSelect(img);
	}
}
//selects the colour pressed and adds it to the array.
function Select(img)
{
	selected_colours.push(img.src);
	img.src = img.src.substring(0, img.src.indexOf('.png')) + 'pressed.png';
}
//removes the pressed colour from array and unselects it.
function UnSelect(img)
{
	
	selected_colours.splice(FindInArray(img.src), 1);
	img.src = img.src.substring(0, img.src.indexOf('pressed.png')) + '.png';
}
//looks for a match in array
function FindInArray(img)
{
	for(var x = 0;x < selected_colours.length;x+=1)
	{
		if(img.src === selected_colours[x])
		{
			return x;
		}
	}
}
//starting the stats board
function Proceed()
{
	document.getElementById('main_menu').style.display = 'none';
	document.getElementById('statsboard').style.display = 'block';
	var list = '<table><tr><td style="border:none">&nbsp</td><td><img src="cannon.png"><br>Min</td><td><img src="cannon.png"><br>Max</td>';
	list += '<td><img src="engines.png"><br>Min</td><td><img src="engines.png"><br>Max</td>';
	list += '<td><img src="crew.png"></td>';
	if(document.getElementById('anotherbigexpansion').checked)
	{
		list += '<td><img src="armedcrew.png"></td>';
	}
	list += '</tr>';
	for(var x = 0;x < selected_colours.length;x+=1)
	{
		list += '<tr>';
		list += '<td><img src="'+selected_colours[x]+'"><td onclick="ResolveMe(this)">0</td><td onclick="ResolveMe(this)">0</td><td onclick="ResolveMe(this)">0</td><td onclick="ResolveMe(this)">0</td><td onclick="ResolveMe(this)">0</td>';
		if(document.getElementById('anotherbigexpansion').checked)
		{
			list += '<td onclick="ResolveMe(this)">0</td>';
		}
		list += '</tr>';
	}
	list += '</table>';
	list += '<button id="switchbutton" onclick="ChangeMode()">Increase mode</button>';
	list += '<br>Changes by <span id="changevalue">1</span><br>'
	list += '<input type="range" min="0.5" max="2" value="1" step="0.5" onchange="SliderChange(this)">';
	document.getElementById('statsboard').innerHTML = list;
}
//change the value changed from the slider
function SliderChange(slider)
{
	change = slider.value*1;
	document.getElementById('changevalue').innerHTML = change;
}
//change between increase and decrease mode
function ChangeMode()
{
	if(mode === 0)
	{
		mode = 1;
		document.getElementById("switchbutton").innerHTML = 'Decrease mode';
	}
	else
	{
		mode = 0;
		document.getElementById("switchbutton").innerHTML = 'Increase mode';
	}
}
//add or substract values from table cell
function ResolveMe(element)
{
	if(mode === 0)
	{
		element.innerHTML = (element.innerHTML*1) + change;
	}
	else
	{
		element.innerHTML = (element.innerHTML*1) - change;
	}
}