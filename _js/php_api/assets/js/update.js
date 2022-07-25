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

async function updateItemToServer(itemObj) {
    try {
        const url = 'http://azz1019.dothome.co.kr/api/items/update';
        const config = {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body : JSON.stringify(itemObj)
        }; // 객체명(config)은 자유롭게 쓸수있지만 !객체 필드명(method, headers...)은 정해져있음!
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    }
}

async function deleteItemOfServer(ino) {
    try {
        const url = 'http://azz1019.dothome.co.kr/api/items/delete';
        const config = {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body : JSON.stringify({id : ino})
        }; // 객체명(config)은 자유롭게 쓸수있지만 !객체 필드명(method, headers...)은 정해져있음!
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('delBtn').addEventListener('click', (e) => {
    e.preventDefault(); // 이벤트막기

    //const ino = document.getElementById('id').value; 이렇게도 가능하고 아래처럼도 가능
    deleteItemOfServer(e.target.dataset.ino).then(result => {
        debugger;
        alert(result.message);
        location.replace('index.html');
    });
});

document.querySelector('button.w-100.btn').addEventListener('click', (e) => {
    e.preventDefault(); // 이벤트막기

    const inputs = document.querySelectorAll('.needs-validation input');

    let itemObj = {};
    inputs.forEach(elem => {
        itemObj[elem.id] = elem.value;
    });

    // let cateSelect = document.getElementById('category');
    // let selectedValue = cateSelect.options[cateSelect.options.selectedIndex].value;
    // itemObj.category = selectedValue; !세줄을 아래 한줄로 처리가능!
    itemObj.category_id = document.querySelector('#category option:checked').value;

    const now = new Date();
    let modifiedNow = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    itemObj.modified = modifiedNow;

    updateItemToServer(itemObj).then(result => {
        alert(result.message);
        //location.replace('index.html');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const queryString = location.search;
    const ino = queryString.substring(queryString.indexOf("=") + 1);
    document.getElementById('id').value = ino;
    document.getElementById('delBtn').dataset.ino = ino; // 여기서 미리 넣어줌

    getItemViewFromServer(ino).then(result => {
        const item = result.items[0];

        // document.getElementById('id').value = item.id;
        // document.getElementById('name').value = item.name;
        // document.getElementById('price').value = item.price;
        // document.getElementById('description').value = item.description; !세줄을 아래 세줄로 처리가능!
        const inputs = document.querySelectorAll('.needs-validation input');
        inputs.forEach(input => {
            input.value = item[input.id];
        });

        let optionList = document.querySelectorAll('#category option');
        optionList.forEach(option => {
            if(option.value == item.category_id) {
                option.setAttribute('selected', true);
            }
        });
    });
});