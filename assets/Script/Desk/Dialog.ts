import { _decorator, Color, color, ColorKey, Component, director, Label, log, Node, NodePool, tween, UIOpacity, Vec2, Vec3 } from 'cc';
import { GameManager} from '../GameManager';
import { GraveManager } from '../Graveyard/GraveManager';
const { ccclass, property } = _decorator;

@ccclass('Dialog')
export class Dialog extends Component {

    @property(Label)
    text: Label;
    @property(Node)
    dialogGhost: Node

    @property(Node)
    ghostFull: Node;
    @property(Node)
    ghost: Node;
    @property(Node)
    desk: Node;

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);
        let dialogColor = new Color (219, 191, 149);

        let dialogText = [
            { name: "", dialog: "明天早上期末考、下午要報告、" },
            { name: "", dialog: "晚上還要打工...怎麼突然又要加課啊！" },
            { name: "", dialog: "這個時間上哪找代班..." },
            { name: "", dialog: "誰可以帶我逃離這個世界啊！" },
            { name: "？", dialog: "嗨..." },
            { name: "", dialog: "完蛋了居然開始幻聽" },
            { name: "ghost", dialog: "嗨！" },
            { name: "ghost", dialog: "我帶你離開這裡吧！" }
        ];

        let ghostTransition = () => {

            director.preloadScene('Graveyard');

            this.ghostFull.active = true;
            tween(this.ghostFull)
                .to(1, { position: new Vec3(0, 0, 0) }, {easing: 'backInOut'})
                .delay(0.1)
                .parallel(
                    tween(this.ghostFull)
                        .to(1, {position: new Vec3(970, 0, 0)}, {easing: 'backInOut'}),

                    tween(this.ghostFull)
                        .delay(0.5)
                        .call(() => {
                            this.desk.active = false;
                            this.ghost.active = false;
                        })
                )
                .delay(0.1)
                .call(() => director.loadScene('Graveyard'))
                .start();
        }

        GE.addListener('dialogWhenDesk', () => GameManager.dialog(this, this.text, dialogText, this.dialogGhost, dialogColor, dialogOpacity, ghostTransition), this)

    }

    update(deltaTime: number) {

    }

}

