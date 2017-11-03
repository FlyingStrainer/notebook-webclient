
const socket = new WebSocket("ws://endor-vm1.cs.purdue.edu/");

export default socket;

socket.onmessage = function(event) {
	if(event.data.msgType === "push")
	$("body").append($("<div id='push' style='position:absolute; bottom:0; right: 30px; height: 50px'>" + event.data + "</div>"))
}