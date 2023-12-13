import { _decorator, Button, Component, log, Node, quat, Sprite, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Start')
export class Start extends Component {

    @property(Node)
    desk: Node;
    @property(Node)
    dialog: Node;
    @property(Node)
    ghost: Node
    @property(Node)
    coverGhost: Node;

    @property(Button)
    startBtn: Button;

    start() {

        let startOpacity = this.node.getComponent(UIOpacity);
        let deskOpacity = this.desk.getComponent(UIOpacity);
        let ghostOpacity = this.ghost.getComponent(UIOpacity);

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

            this.scheduleOnce(() => {
                this.ghost.active = true;
                tween(ghostOpacity)
                    .delay(0.2)
                    .to(0.6, {opacity: 255})
                    .delay(1)
                    .to(0.9, {opacity: 0})
                    .delay(1)
                    .union()
                    .repeat(99)
                    .start();
                tween(this.ghost)
                    .to(0.2, {position: new Vec3(115, -40, 0)}) 
                    .to(0.5, {position: new Vec3(145, 40, 0)})
                    .to(2, {position: new Vec3(145, 250, 0)})
                    .delay(1)
                    .union()
                    .repeat(99)
                    .start();
            }, 5)
        })

        tween(this.coverGhost)
            .delay(0.8)
            .to(0.3, {position: new Vec3(185, 145, 0), eulerAngles: new Vec3(0, 0, 47)})
            .to(0.2, {position: new Vec3(125, 165, 0), eulerAngles: new Vec3(0, 0, 90)})
            .to(0.2, {position: new Vec3(80, 160, 0), eulerAngles: new Vec3(0, 0, 120)})
            .to(1.4, {position: new Vec3(-550, 180 , 0)}, {easing: 'backIn'})
            .to(0.2, {eulerAngles: new Vec3(0, 0, -100)})
            .delay(1.5)
            .to(0.5, {position: new Vec3(-225, -400, 0)})
            .to(0.2, {eulerAngles: new Vec3(0, 0, 0)})
            .delay(1.2)
            .to(0.6, {position: new Vec3(-10, -20, 0)}, {easing: 'backOut'})
            .sequence(
                tween(this.coverGhost)
                    .by(0.4, {position: new Vec3(0, 10, 0)}),
                tween(this.coverGhost)
                    .by(0.4, {position: new Vec3(0, -10, 0)})
            )
            .repeat(20)
            .union()
            .repeat(999)
            .start();

    }

    update(deltaTime: number) {

    }

}

