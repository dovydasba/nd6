let shoppingList = [];


window.onload = function() {
    const savedList = JSON.parse(localStorage.getItem('shoppingList'));
    if (savedList) {
        shoppingList = savedList;
        shoppingList.forEach(function(item) {
            addItemToDOM(item);
        });
    }
};

function addItem() {
    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;
    const shoppingItem = { item: item, quantity: quantity };
    shoppingList.push(shoppingItem);
    addItemToDOM(shoppingItem);
    saveToLocalStorage();
    document.getElementById('item').value = '';
    document.getElementById('quantity').value = '';
}

function addItemToDOM(shoppingItem) {
    const shoppingListDOM = document.getElementById('shoppingList');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(shoppingItem.item + " - " + shoppingItem.quantity));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'trinti';
    deleteButton.addEventListener('click', function() {
        deleteItem(shoppingItem, li);
    });

    li.appendChild(deleteButton);
    shoppingListDOM.appendChild(li);
}

function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function deleteItem(shoppingItem, li) {
    // Remove item from DOM
    li.parentNode.removeChild(li);

    // Remove item from shoppingList array
    shoppingList = shoppingList.filter(function(item) {
        return item.item !== shoppingItem.item || item.quantity !== shoppingItem.quantity;
    });

    // Update localStorage
    saveToLocalStorage();
}

function deleteList() {
    // Remove all items from the shoppingList array
    shoppingList = [];

    // Update localStorage
    saveToLocalStorage();

    // Remove all items from the DOM
    const shoppingListDOM = document.getElementById('shoppingList');
    while (shoppingListDOM.firstChild) {
        shoppingListDOM.removeChild(shoppingListDOM.firstChild);
    }
}