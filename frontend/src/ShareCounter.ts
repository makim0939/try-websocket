export class ShareCounter {
  count: number;
  h3ClickedNum: HTMLHeadingElement;
  button: HTMLButtonElement;

  constructor(socket: WebSocket) {
    const ground = document.getElementById('playground');
    const divShareCounter = document.createElement('div');
    this.h3ClickedNum = document.createElement('h3');
    this.button = document.createElement('button');

    this.count = -1;
    ground!.appendChild(divShareCounter);
    this.h3ClickedNum.innerHTML = `下のボタンをクリック`;
    divShareCounter.appendChild(this.h3ClickedNum);
    this.button.innerHTML = 'Click';
    divShareCounter.appendChild(this.button);

    const send = () => {
      socket.send('count');
    };
    this.button.addEventListener('click', () => send());
  }

  onOpen(e: Event) {}
  onMessage(e: MessageEvent) {
    if (e.data.slice(0, 5) !== 'count') return;
    this.count = parseInt(e.data.slice(5));
    this.h3ClickedNum.innerHTML = `クリック: ${this.count} 回`;
  }
  onClose(e: CloseEvent) {}
  onError(e: Event) {}
}
