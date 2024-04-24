export class ClientId {
  clientId: number;
  participantsNum: number;
  h3ClientId: HTMLHeadingElement;
  h3ParticipantsNum: HTMLHeadingElement;

  constructor(socket: WebSocket) {
    const ground = document.getElementById('playground');
    const divClientId = document.createElement('div');
    this.h3ClientId = document.createElement('h3');
    this.h3ParticipantsNum = document.createElement('h3');

    this.clientId = -1;
    this.participantsNum = -1;
    ground!.appendChild(divClientId);
    this.h3ClientId.innerHTML = `クライアントID: ${this.clientId}`;
    divClientId.appendChild(this.h3ClientId);
    this.h3ParticipantsNum.innerHTML = `参加人数: ${this.participantsNum}`;
    divClientId.appendChild(this.h3ParticipantsNum);
  }

  onOpen(e: Event) {}
  onMessage(e: MessageEvent) {
    if (e.data.slice(0, 2) === 'id') {
      this.clientId = parseInt(e.data.slice(2));
      this.h3ClientId.innerHTML = `クライアントID: ${this.clientId}`;
    } else if (e.data.slice(0, 15) === 'participantsNum') {
      this.participantsNum = parseInt(e.data.slice(15));
      this.h3ParticipantsNum.innerHTML = `参加人数: ${this.participantsNum}`;
    }
  }
  onClose(e: CloseEvent) {}
  onError(e: Event) {}
}
