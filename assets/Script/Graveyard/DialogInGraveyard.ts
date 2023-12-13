import { _decorator, Color, Component, director, Label, log, Node, Sprite, UIOpacity } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('DialogInGraveyard')
export class DialogInGraveyard extends Component {

    @property(Label)
    text: Label;
    @property(Node)
    dialogGhost: Node

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);
        let dialogColor = new Color(187, 236, 178);

        if(GameManager.status.startToGraveyard == true)
            this.node.getComponent(Sprite).color = dialogColor;
        else
            this.node.getComponent(Sprite).color = new Color(255, 255, 255);

        let dialogText = [
            { name: "", dialog: "？剛剛發生了什麼事" },
            { name: "", dialog: "我剛才不是還坐在書桌前嗎？" },
            { name: "", dialog: "這裡又是哪裡？我怎麼會在墓園..." },
            { name: "ghost", dialog: "歡迎來到「沒有人」夜總會！" },
            { name: "ghost", dialog: "點擊墓碑，找人一起玩吧！" }
        ];

        let dialogBack = [
            { name: "ghost", dialog: "還有人想找你玩呢" },
            { name: "", dialog: "這裡的是人嗎..." }
        ];

        let dialogToEnd = [
            { name: "ghost", dialog: "感覺如何？這裡好玩嗎？" },
            { name: "ghost", dialog: "平時也要多花一些時間認識自己喔" },
            { name: "", dialog: "（怎麼突然說起我的人生來？）" },
            { name: "ghost", dialog: "快要天亮了" },
            { name: "ghost", dialog: "你也趕緊回去吧" }
        ];

        let startChooseGrave = () => {
            GE.dispatchCustomEvent('startChooseGrave');
        }

        let prepareToEnd = () => {
            GE.dispatchCustomEvent('toEnd');
        }

        GE.addListener('dialogInGraveyard', () => GameManager.dialog(this, this.text, dialogText, this.dialogGhost, dialogColor, dialogOpacity, startChooseGrave), this);
        GE.addListener('notFirstInGraveyard', () => GameManager.dialog(this, this.text, dialogBack, this.dialogGhost, dialogColor, dialogOpacity, startChooseGrave), this);
        GE.addListener('allGraveComplete', () => GameManager.dialog(this, this.text, dialogToEnd, this.dialogGhost, dialogColor, dialogOpacity, prepareToEnd), this);
    }

    update(deltaTime: number) {

    }
}

