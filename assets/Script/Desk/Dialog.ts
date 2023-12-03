import { _decorator, Component, director, Label, log, Node, NodePool, tween, UIOpacity, Vec2, Vec3 } from 'cc';
import { GameManager} from '../GameManager';
import { GraveManager } from '../Graveyard/GraveManager';
const { ccclass, property } = _decorator;

@ccclass('Dialog')
export class Dialog extends Component {

    @property(Label)
    text: Label;
    @property(Label)
    nameLabel: Label;

    @property(Node)
    dialogName: Node;

    @property(Node)
    ghost: Node;

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);

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

            this.ghost.active = true;
            tween(this.ghost)
                .to(1, { position: new Vec3(0, 0, 0) })
                .delay(0.1)
                .call(() => director.loadScene('Graveyard'))
                .start();
        }

        GE.addListener('dialogWhenDesk', () => GameManager.dialog(this, this.text, dialogText, this.dialogName, this.nameLabel, dialogOpacity, ghostTransition), this)

    }

    update(deltaTime: number) {

    }

}

