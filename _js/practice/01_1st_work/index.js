const user_info = {
    user_name : '',
    user_address : '',
    favor : {
        user_favor1 : '',
        user_favor2 : '',
        user_favor3 : '',
    },
    user_email : '',
    user_have_pet : '',
    user_want : '',
};

function show_info() {
    user_info.user_name = document.getElementById('user_name').value;
    user_info.user_address = document.getElementById('user_address').value;
    user_info.favor.user_favor1 = document.getElementById('user_favor1').value;
    user_info.favor.user_favor2 = document.getElementById('user_favor2').value;
    user_info.favor.user_favor3 = document.getElementById('user_favor3').value;
    user_info.user_email = document.getElementById('user_email').value;
    user_info.user_have_pet = document.getElementById('user_have_pet').value;
    user_info.user_want = document.getElementById('user_want').value;

    document.getElementById('show_name').innerText = `${user_info.user_name}`;
    document.getElementById('show_address').innerText = `${user_info.user_address}`;
    document.getElementById('show_favor1').innerText = `${user_info.favor.user_favor1}`;
    document.getElementById('show_favor2').innerText = `${user_info.favor.user_favor2}`;
    document.getElementById('show_favor3').innerText = `${user_info.favor.user_favor3}`;
    document.getElementById('show_email').innerText = `${user_info.user_email}`;
    document.getElementById('show_have_pet').innerText = `${user_info.user_have_pet}`;
    document.getElementById('show_want').innerText = `${user_info.user_want}`;
};

/*document.getElementById('submit_button').addEventListener('click', function() {
    show_info();
});*/