async function getItemListFromServer() {
    try {
        const url = 'http://azz1019.dothome.co.kr/api/items/read';
        const resp = await fetch(url);
        const respText = await resp.text();
        const itemsObj = await JSON.parse(respText);
        return await itemsObj;
    } catch (error) {
        console.log(error);
    }
}

async function getItemViewFromServer(ino) {
    try {
        const resp = await fetch('http://azz1019.dothome.co.kr/api/items/read/' + ino);
        const respText = await resp.text();
        const itemsObj = await JSON.parse(respText);
        return await itemsObj;
    } catch (error) {
        console.log(error);
    }
}

function printItemList(items) {
    let str = '';
    items.forEach(itemObj => {
        str += `<div class="col">
        <div class="card shadow-sm">
          <div class="card-body">
            <p class="card-text">${itemObj.name}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" data-ino="${itemObj.id}" class="btn btn-sm btn-outline-info viewBtn">View</button>
                <button type="button" data-ino="${itemObj.id}" class="btn btn-sm btn-outline-warning editBtn">Edit</button>
              </div>
              <small class="text-muted">${itemObj.price}</small>
            </div>
          </div>
        </div>
      </div>`;
    });
    document.getElementById('itemListArea').innerHTML = str;
}

function printItemObject(item) {
    let str = '';
    str += `<h2 class="pb-2 border-bottom">Item Detail</h2>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#bootstrap"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Item ID</h4>
          <p>${item.id}</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#cpu-fill"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Item Name</h4>
          <p>${item.name}</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#calendar3"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Item Description</h4>
          <p>${item.description}</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#home"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Item Price</h4>
          <p>${item.price}</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#speedometer2"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Item Category</h4>
          <p>${item.category_id}</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#toggles2"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Item Created Date</h4>
          <p>${item.created}</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#geo-fill"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Item Modified Date</h4>
          <p>${item.modified}</p>
        </div>
      </div>
    </div>`;
    document.getElementById('icon-grid').innerHTML = str;
}

document.getElementById('listBtn').addEventListener('click', (e) => {
    e.preventDefault(); // 이벤트막기

    getItemListFromServer().then(result => {
        printItemList(result.items);
    });
});

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('viewBtn')) {
        getItemViewFromServer(e.target.dataset.ino).then(result => {
            printItemObject(result.items[0]);
        });
    } else if(e.target.classList.contains('editBtn')) {
        location.href = 'update.html?ino=' + e.target.dataset.ino;
    }
})