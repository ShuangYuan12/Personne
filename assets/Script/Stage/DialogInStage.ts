import { _decorator, Component, director, Label, log, Node, UIOpacity, EventTarget, Button, tween, Color } from 'cc';
import { GameManager} from '../GameManager';
const { ccclass, property } = _decorator;
const evenTarget = new EventTarget();

@ccclass('DialogInStage')
export class DialogInStage extends Component {

    @property(Label)
    text: Label;
    @property(Node)
    dialogGhost: Node;

    @property(Node)
    likeBtns: Node;

    @property(Node)
    songBtns: Node;
    @property(Node)
    songMurmur: Node;

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);
        let murOpacity = this.songMurmur.getComponent(UIOpacity);
        let dialogColor = new Color(156, 156, 197);

        let dialogText = [
            { name: "ghost", dialog: "♪♪♪♪♪" },
            { name: "ghost", dialog: "♪♪啊啊～啊～♪♪♪♪♪" },
            { name: "ghost", dialog: "♪♪♪♪♪♪♪♪♪♪♪♪♪" },
            { name: "", dialog: "呃……嗨？" },
            { name: "ghost", dialog: "嘿！你喜歡唱歌嗎，快到台上來跟我一起唱！♪♪♪♪" },
        ];

        let dialogAfLike = [
            {name: "ghost", dialog: "接住！你就拿我手上這隻！"},
            {name: "", dialog: "麥克風很貴不要亂丟╰（‵□′）╯...不是要一起唱？"},
            {name: "ghost", dialog: "我累了，聽你唱就好"},
            {name: "ghost", dialog: "這裡有幾首歌，選一首吧"}
        ]

        let dialogAfDisLike = [
            {name: "ghost", dialog: "不喜歡啊"},
            {name: "ghost", dialog: "但我今天就是想要聽你唱歌！"},
            {name: "ghost", dialog: "不能拒絕！"},
            {name: "", dialog: "選一首歌吧"}
        ];

        let dialogAfSuccess = [
            {name: "ghost", dialog: "好聽！好聽！"},
            {name: "ghost", dialog: "這個音樂盒送你當紀念吧"},
            {name: "ghost", dialog: "祝你玩得愉快～"},
        ];

        let dialogAfFail = [
            {name: "ghost", dialog: "呃"},
            {name: "ghost", dialog: "不好聽。"},
            {name: "ghost", dialog: "算了你還是到別的地方玩吧"},
        ];


        let likeChoose = () => {
            this.likeBtns.active = true;
        }

        let songChoose = () => {
            this.songBtns.active = true;
            tween(murOpacity)
                .delay(0.5)
                .to(1, {opacity: 255})
                .delay(3)
                .to(1, {opacity: 0})
                .start();
        }

        let allDialogFin = () => {
            GE.dispatchCustomEvent('stageDialogFin');
            tween(dialogOpacity)
                .to(0.5, {opacity: 0})
                .call(() => this.node.active = false)
                .start()
        }

        GE.addListener('dialogInStage', () => GameManager.dialog(this, this.text, dialogText, this.dialogGhost, dialogColor, dialogOpacity, likeChoose), this);
        GE.addListener('clickLike', () => {
            this.likeBtns.active = false;
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfLike, this.dialogGhost, dialogColor, dialogOpacity, songChoose)
        }, this)
        GE.addListener('clickDislike', () => {
            this.likeBtns.active = false;
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfDisLike, this.dialogGhost, dialogColor, dialogOpacity, songChoose)
        }, this)
        GE.addListener('success', () => {
            this.songBtns.active = false;
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfSuccess, this.dialogGhost, dialogColor, dialogOpacity, allDialogFin);
        }, this)
        GE.addListener('fail', () => {
            this.songBtns.active = false;
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfFail, this.dialogGhost, dialogColor, dialogOpacity, allDialogFin);
        }, this)
        
    }

    update(deltaTime: number) {
        
    }
}

