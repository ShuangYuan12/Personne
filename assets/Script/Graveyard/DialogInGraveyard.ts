import { _decorator, Component, Label, log, Node, UIOpacity } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('DialogInGraveyard')
export class DialogInGraveyard extends Component {

    @property(Label)
    text: Label;
    @property(Label)
    nameLabel: Label;
    @property(Node)
    dialogName: Node;

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);

        let dialogText = [
            { name: "", dialog: "？剛剛發生了什麼事" },
            { name: "", dialog: "我剛才不是還坐在書桌前嗎？" },
            { name: "", dialog: "這裡又是哪裡？我怎麼會在墓園..." },
            { name: "ghost", dialog: "歡迎來到「沒有人」夜總會！" },
            { name: "ghost", dialog: "點擊墓碑，找人一起玩吧！" }
        ];

        let dialogBack = [
            { name: "ghost", dialog: "還有人想找你玩呢" },
            { name: "", dialog: "（這裡哪裡有「人」）" }
        ];

        let startChooseGrave = () => {
            GE.dispatchCustomEvent('startChooseGrave');
        }

        GE.addListener('dialogInGraveyard', () => GameManager.dialog(this, this.text, dialogText, this.dialogName, this.nameLabel, dialogOpacity, startChooseGrave), this);
        GE.addListener('notFirstInGraveyard', () => GameManager.dialog(this, this.text, dialogBack, this.dialogName, this.nameLabel, dialogOpacity, startChooseGrave), this);

    }

    update(deltaTime: number) {

    }
}

