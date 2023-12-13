import { _decorator, Color, Component, director, Label, log, Node, NodePool, tween, UIOpacity, Vec2, Vec3 } from 'cc';
import { GameManager} from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Dialog')
export class Dialog extends Component {

    @property(Label)
    text: Label;
    @property(Node)
    dialogGhost: Node;

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);
        let dialogColor = new Color (219, 191, 149);

        let dialogText = [
            { name: "", dialog: "又是莫名其妙就回來了..." },
            { name: "", dialog: "夢裡還要跑來跑去，搞得我腰痠背痛" },
            { name: "", dialog: "紙上怎麼多了一張圖？" }
        ];

        let afFirstEndDialog = () => {
            GE.dispatchCustomEvent('afFirstEndDialog')
        }

        let EndandReturn = () => {
            GE.dispatchCustomEvent('homeBtnAppear');
        }

        GE.addListener('dialogEnd', () => GameManager.dialog(this, this.text, dialogText, this.dialogGhost, dialogColor, dialogOpacity, EndandReturn), this)

    }

    update(deltaTime: number) {

    }

}

