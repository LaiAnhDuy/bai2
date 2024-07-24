var Api = "https://65d455c53f1ab8c63434e588.mockapi.io/job";

const getItem = (cb) => {
  fetch(Api)
    .then((res) => res.json())
    .then(cb);
};
const renderItem = (items) => {
  var listItemBlock = document.querySelector(".list-item");
  var htmls = items.map((item) => {
    return `
          <div class='item' id="${item.id}">
                <input type="checkbox" onchange="handleUpdateChecked(${
                  item.id
                }, this.checked)" ${item.checked ? "checked" : ""}/>
                <p class='card'>${item.content}</p>
                <button onclick="handleDeleteItem(${item.id})">xóa</button>
            </div>
      `;
  });
  listItemBlock.innerHTML = htmls.join("");
};

const handleCreateItem = () => {
  var createBtn = document.querySelector(".add-button");
  createBtn.onclick = () => {
    var content = document.querySelector('input[name="content"]').value;
    const data = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content }),
    };
    fetch(Api, data).then(() => getItem(renderItem));
  };
};

const handleDeleteItem = (id) => {
  fetch(`${Api}/${id}`, { method: "DELETE" }).then(() => getItem(renderItem));
};

const handleUpdateChecked = (id, isChecked) => {
  fetch(`${Api}/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ checked: isChecked }),
  }).then(() => getItem(renderItem));
};

getItem(renderItem);
handleCreateItem();
