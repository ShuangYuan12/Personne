import { _decorator, Button, Component, log, Node, Sprite, tween, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Start')
export class Start extends Component {

    @property(Node)
    desk: Node;
    @property(Node)
    dialog: Node;

    @property(Button)
    startBtn: Button;

    start() {

        let startOpacity = this.node.getComponent(UIOpacity);
        let deskOpacity = this.desk.getComponent(UIOpacity);

        this.startBtn.node.once(Button.EventType.CLICK, () => {
            tween(startOpacity)
                .to(1, { opacity: 0 })
                .call(() => this.startBtn.enabled = false)
                .start();

            this.scheduleOnce(() => {
                tween(deskOpacity)
                    .to(1, { opacity: 255 })
                    .call(() => this.dialog.active = true)
                    .delay(0.1)
                    .call(() => GE.dispatchCustomEvent('dialogWhenDesk'))
                    .start();
            }, 1);

        })

    }

    update(deltaTime: number) {

    }

}

