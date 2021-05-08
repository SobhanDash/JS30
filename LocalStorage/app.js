const addItems = document.querySelector(".add-items")
const itemsList = document.querySelector(".plates")
let items = JSON.parse(localStorage.getItem("items")) || []
const clrAll = document.querySelector('.delAll')

// clrAll.addEventListener('click',  ()=> {
// 	itemsList.innerHTML = ""
// 	localStorage.clear()
// 	items = JSON.parse(localStorage.getItem("items")) || []
// })

function delItem() {
	itemsList.innerHTML = ""
	localStorage.clear()
	items = JSON.parse(localStorage.getItem("items")) || []
}

function addItem(e) {
	e.preventDefault()
	//console.log('hey')
	const text = this.querySelector("[name=item]").value
	const item = {
		//text: text
		text,
		done: false,
	}
	items.push(item)
	populateList(items, itemsList)
	localStorage.setItem("items", JSON.stringify(items))
	this.reset()
	//console.log(item)
}

//did this so if in future we can pass a different array list and any destiantion html element
function populateList(dishes = [], dishList) {
	dishList.innerHTML = dishes
		.map((dish, i) => {
			return `
        <li>
          <input type="checkbox" data-index=${i} id='item${i}' ${
				dish.done ? "checked" : ""
			} />
          <label for="item${i}">${dish.text}</label>
        </li>
      `
		})
		.join("")
}

function toggleBox(e) {
	if (!e.target.matches("input")) return // skip this unless it's an input
	const el = e.target
	const index = el.dataset.index
	items[index].done = !items[index].done
	localStorage.setItem("items", JSON.stringify(items))
	populateList(items, itemsList)
}



function checkAll(source) {
	let checkboxes = document.querySelectorAll('input[type="checkbox"]')
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i] = source) 
			checkboxes[i].checked = !source.checked
	}
}

function uncheckAll(source) {
	let checkboxes = document.querySelectorAll('input[type="checkbox"]')
	for (var i = 0; i < checkboxes.length; i++) {
		if ((checkboxes[i] != source)) 
			checkboxes[i].checked = source.checked
	}
}

addItems.addEventListener("submit", addItem)
clrAll.addEventListener("click", delItem)
itemsList.addEventListener("submit", checkAll)
itemsList.addEventListener("submit", uncheckAll)
itemsList.addEventListener("click", toggleBox)

populateList(items, itemsList)
