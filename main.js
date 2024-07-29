var Api = "https://65d455c53f1ab8c63434e588.mockapi.io/job";

const input = document.querySelector('input[name="content"]');
const addItem = document.querySelector(".add-button");
const checkboxs = document.querySelectorAll(".checkbox");
const removeItem = document.querySelectorAll(".remove-item");

const showLoading = () => {
  document.getElementById("loading").style.display = "block";
  input.disabled = true;
  addItem.disabled = true;
  checkboxs.forEach((checkbox) => (checkbox.disabled = true));
  removeItem.forEach((item) => (item.disabled = true));
};

const hideLoading = () => {
  document.getElementById("loading").style.display = "none";
  input.disabled = false;
  addItem.disabled = false;
  checkboxs.forEach((checkbox) => (checkbox.disabled = false));
  removeItem.forEach((item) => (item.disabled = false));
};

const getItem = (cb) => {
  showLoading();
  fetch(Api)
    .then((res) => res.json())
    .then(cb)
    .finally(hideLoading);
};

const renderItem = (items) => {
  var listItemBlock = document.querySelector(".list-item");
  var htmls = items.map((item) => {
    return `
          <div class='item' id="${item.id}">
            <div class='checkbox-content'>
                <input class="checkbox" type="checkbox" onchange="handleUpdateChecked(${
                  item.id
                }, this.checked)" ${item.checked ? "checked" : ""}/>
                <p class='card'>${item.content}</p>
            </div>
            <button class="remove-item" onclick="handleDeleteItem(${
              item.id
            })">xóa</button>
          </div>
      `;
  });
  listItemBlock.innerHTML = htmls.join("");
};

const handleCreateItem = () => {
  var createBtn = document.querySelector(".add-button");
  createBtn.onclick = () => {
    var content = document.querySelector('input[name="content"]').value.trim();
    if (!content) {
      alert("Content cannot be empty!");
      return;
    }
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    };
    showLoading();
    fetch(Api, data)
      .then(() => {
        getItem(renderItem);
        document.querySelector('input[name="content"]').value = "";
      })
      .finally(hideLoading);
  };
};

const handleDeleteItem = (id) => {
  showLoading();
  fetch(`${Api}/${id}`, { method: "DELETE" })
    .then(() => getItem(renderItem))
    .finally(hideLoading);
};

const handleUpdateChecked = (id, isChecked) => {
  showLoading();
  fetch(`${Api}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ checked: isChecked }),
  })
    .then(() => getItem(renderItem))
    .finally(hideLoading);
};

getItem(renderItem);
handleCreateItem();
