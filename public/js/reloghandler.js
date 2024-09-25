const container_elem = document.getElementById("Сontainer");
const Header_elem = document.getElementById("MainHeader");
const SubHeader_elem = document.getElementById("SubHeader");
const Submit_elem = document.getElementById("submit");
const nickname_elem = document.getElementById("nickname");
const password_elem = document.getElementById("password");
const answer_elem = document.getElementById("answer");


async function sendinfolog() {
    const password = password_elem.value;
    const nickname = nickname_elem.value;
    const RelogStatus = await fetch ('/api/log', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ "nickname":nickname, "password":password }),})
    answertouser(await RelogStatus.json());
}
async function sendinforeg() {  
    const password = password_elem.value;
    const nickname = nickname_elem.value;
    const RelogStatus = await fetch ('/api/reg', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ "nickname":nickname, "password":password }),})
    answertouser(await RelogStatus.json());
}
async function answertouser(stat){
    switch(stat.status) {
        case "AccExist":
            answer_elem.innerHTML = "Аккаунт уже существует.";
            break;
        case "NoAcc":
            answer_elem.innerHTML = "Нет аккаунта с таким никнеймом.";
            break;
        case "WrongPass":
            answer_elem.innerHTML = "Неправильный пароль.";
            break;
        default:
            answer_elem.innerHTML = "";
    }
};
function changetoreg() {
    Submit_elem.setAttribute("OnClick", "sendinforeg()");
    SubHeader_elem.setAttribute("OnClick", "changetolog()");
    SubHeader_elem.innerHTML = "Войти?";
    Header_elem.innerHTML = "Регистрация";
}
function changetolog() {
    Submit_elem.setAttribute("OnClick", "sendinfolog()");
    SubHeader_elem.setAttribute("OnClick", "changetoreg()");
    SubHeader_elem.innerHTML = "Зарегистрироваться?";
    Header_elem.textContent = "Вход";
}