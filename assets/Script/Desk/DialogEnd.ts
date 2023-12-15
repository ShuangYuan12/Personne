import { _decorator, Color, Component, director, Label, log, Node, NodePool, tween, UIOpacity, Vec2, Vec3 } from 'cc';
import { GameManager } from '../GameManager';
import { End, Paper } from './End';
const { ccclass, property } = _decorator;

@ccclass('DialogEnd')
export class DialogEnd extends Component {

    @property(Label)
    text: Label;
    @property(Node)
    dialogGhost: Node;
    @property(Node)
    desk: Node;

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);
        let deskScript = this.desk.getComponent(End);
        let dialogColor = new Color(219, 191, 149);
        let gameobj = this;

        let paper: string;
        switch (deskScript.p) {
            case Paper.guitar:
                paper = "音樂"
                break;
            case Paper.machine:
                paper = "工程"
                break;
            case Paper.plan:
                paper = "策畫"
                break;
            case Paper.dance:
                paper = "表演"
                break;
            case Paper.keyboard:
                paper = "資訊"
                break;
            case Paper.design:
                paper = "設計"
                break;
            default:
                break;
        }

        let dialogText = [
            { name: "", dialog: "又是莫名其妙就回來了..." },
            { name: "", dialog: "夢裡還要跑來跑去，搞得我腰痠背痛" },
            { name: "", dialog: "紙上怎麼多了一張圖？" }
        ];

        let dialogPaper = [
            { name: "", dialog: "「來自未來的史冊」" },
            { name: "", dialog: "（這是什麼東西？）" },
            { name: "", dialog: "還記得那年的音樂劇嗎？" },
            { name: "", dialog: "看著舞臺上顏色繽紛的衣服旋轉。" },
            { name: "", dialog: "還記得當年那個三分鐘熱度的人" },
            { name: "", dialog: "吵著想學拳卻只學了半年" },
            { name: "", dialog: "過了兩年又腦子一熱跑去重新學。" },
            { name: "", dialog: "還有那個對著數獨本，" },
            { name: "", dialog: "解不出來就吃不下飯的小孩。" },
            { name: "", dialog: `未來的你在${paper}這條路上走著` },
            { name: "", dialog: "和過去的你有關聯嗎？" },
        ]

        let dialogFinal = [
            { name: "", dialog: "又或許" },
            { name: "", dialog: "明天的選擇又會創造不同的未來。" },
        ]

        let EndandReturn = () => {
            tween(this.node)
                .delay(1)
                .call(() => GE.dispatchCustomEvent('homeBtnAppear'))
                .start()
        }

        let finDialog = () => {
            tween(this.node)
                .delay(1)
                .call(() => {
                    this.node.active = true;
                    GameManager.dialog(this, this.text, dialogFinal, this.dialogGhost, dialogColor, dialogOpacity, EndandReturn)
                })
                .start()
        }

        let memoryDialog = () => {
            tween(this.node)
                .delay(1.5)
                .call(() => {
                    this.node.active = true;
                    GameManager.dialog(this, this.text, dialogPaper, this.dialogGhost, dialogColor, dialogOpacity, finDialog)
                })
                .start()
        }

        GE.addListener('dialogEnd', () => GameManager.dialog(this, this.text, dialogText, this.dialogGhost, dialogColor, dialogOpacity, memoryDialog), this)

    }

    update(deltaTime: number) {

    }

}

