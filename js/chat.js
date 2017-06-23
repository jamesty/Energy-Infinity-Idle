function displayMessages() {
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "messages.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
	document.getElementById("chat-box").innerHTML = xmlhttp.responseText;
}

function sendMessage() {
	var message = document.getElementById("send-message").value;
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "chat.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("message=" + message);
}