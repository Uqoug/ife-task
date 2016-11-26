function leftinsert(){

}
function rightinser(){
	var num = document.getElementById('num').value;
	var li = document.createElement('li');
	li.innerHTML = num;
	document.getElementById('numlist').appendChild(li);
}