console.log("Lost & Found Portal Loaded Successfully");
const reportForm = document.getElementById("reportForm");

if(reportForm){

reportForm.addEventListener("submit",function(e){

e.preventDefault();

const item = {
name: document.getElementById("itemName").value,
type: document.getElementById("itemType").value,
location: document.getElementById("location").value,
date: document.getElementById("date").value,
contact: document.getElementById("contact").value,
description: document.getElementById("description").value
};

let items =
JSON.parse(localStorage.getItem("items")) || [];

items.push(item);

localStorage.setItem(
"items",
JSON.stringify(items)
);

alert("Item Report Submitted Successfully!");

reportForm.reset();

});

}
const itemsContainer =
document.getElementById("itemsContainer");

const searchInput =
document.getElementById("searchInput");

if(itemsContainer){

let items =
JSON.parse(localStorage.getItem("items")) || [];

function displayItems(data){

itemsContainer.innerHTML = "";

if(data.length === 0){

itemsContainer.innerHTML =
"<h2>No Items Found</h2>";

return;
}

data.forEach((item,index)=>{

itemsContainer.innerHTML += `

<div class="browse-card"
data-type="${item.type}">

<h3>
${item.type === "Lost" ? "🔍" : "🎉"}
${item.name}
</h3>

<span class="${
item.type === 'Lost'
? 'lost-badge'
: 'found-badge'
}">
${item.type}
</span>

<p>📍 ${item.location}</p>

<p>📅 ${item.date}</p>

<p>📞 ${item.contact}</p>

<p>${item.description}</p>

<button onclick="claimItem(${index})"
class="claim-btn">
Claim Item
</button>

<button onclick="deleteItem(${index})"
class="delete-btn">
Delete
</button>


</div>

`;

});

}

displayItems(items);

searchInput.addEventListener("keyup",()=>{

const searchValue =
searchInput.value.toLowerCase();

const filteredItems =
items.filter(item =>
item.name.toLowerCase()
.includes(searchValue)
);

displayItems(filteredItems);

});

}
const totalReports = document.getElementById("totalReports");
const lostCount = document.getElementById("lostCount");
const foundCount = document.getElementById("foundCount");

if(totalReports){

const items =
JSON.parse(localStorage.getItem("items")) || [];

totalReports.textContent = items.length;

lostCount.textContent =
items.filter(item => item.type === "Lost").length;

foundCount.textContent =
items.filter(item => item.type === "Found").length;
}
function deleteItem(index){

let items =
JSON.parse(localStorage.getItem("items")) || [];

if(confirm("Delete this item?")){

items.splice(index,1);

localStorage.setItem(
"items",
JSON.stringify(items)
);

location.reload();

}

}
function claimItem(index){

let items =
JSON.parse(localStorage.getItem("items")) || [];

alert(
"Claim request submitted for: "
+ items[index].name
);

}

function filterItems(type){

const cards =
document.querySelectorAll(".browse-card");

cards.forEach(card=>{

if(type==="All"){

card.style.display="block";

}
else{

if(card.dataset.type===type){

card.style.display="block";

}
else{

card.style.display="none";

}

}

});

}

const homeLost =
document.getElementById("homeLost");

const homeFound =
document.getElementById("homeFound");

const homeTotal =
document.getElementById("homeTotal");

if(homeLost){

const items =
JSON.parse(localStorage.getItem("items")) || [];

homeLost.textContent =
items.filter(item =>
item.type === "Lost"
).length;

homeFound.textContent =
items.filter(item =>
item.type === "Found"
).length;

homeTotal.textContent =
items.length;

}
