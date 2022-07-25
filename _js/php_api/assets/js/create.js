async function registerItemToServer(itemObj) {
    try {
        const url = 'http://azz1019.dothome.co.kr/api/items/create';
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
    let createNow = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    itemObj.created = createNow;

    registerItemToServer(itemObj).then(result => {
        alert(result.message);
        //location.replace('index.html');
    });
});