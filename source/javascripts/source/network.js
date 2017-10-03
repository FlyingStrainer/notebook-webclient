
export class Packet {

}

export class Connection {
	constructor(url) {
		this.websocket = new WebSocket(url);
		this.packets = [];
	}

	addPacket(packet) {
		this.packets.push(packet);
	}
}