import { _decorator, Color, Component, Label, log, Node, NodeSpace, Sprite, SpriteFrame, tween, UIOpacity, Vec3 } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('DialogInPerformance')
export class DialogInPerformance extends Component {

    @property(Label)
    text: Label;
    @property(Node)
    dialogGhost: Node;

    @property(Node)
    performer: Node;
    @property(Node)
    woods: Node;

    @property(SpriteFrame)
    goose: SpriteFrame;
    @property(SpriteFrame)
    gooseJump: SpriteFrame;

    @property(Node)
    likeBtns: Node;
    @property(Node)
    game: Node;

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);
        let performerS = this.performer.getComponent(Sprite);
        let dialogColor = new Color(75, 184, 132);

        let dialogText = [
            { name: "ghost", dialog: "呀，來了一位年輕人，坐吧" },
            { name: "ghost", dialog: "你運氣很好啊，今天剛好有大師來表演雜耍" },
            { name: "", dialog: "（一隻大白鵝跳木樁？）" },
        ];

        let dialogAfPerfomance = [
            { name: "ghost", dialog: "年輕人，你平常有在運動嗎？" }
        ];

        let dialogAfLike = [
            { name: "ghost", dialog: "那你也上去跳兩下試試" }
        ];

        let dialogAfDisLike = [
            { name: "ghost", dialog: "有空還是運動一下比較好啊" },
            { name: "ghost", dialog: "這樣，你也上去跳兩下吧" }
        ];

        let dialogAfFail = [
            {name: "ghost", dialog: "哎呀小心點"},
            {name: "ghost", dialog: "平衡感還要再加強啊"},
            {name: "ghost", dialog: "謝謝你陪我們兩個老人家啊"},
            {name: "ghost", dialog: "天色也不早了，趕緊回去吃飯吧"}
        ];

        let dialogAfSuccess = [
            {name: "ghost", dialog: "年輕人平衡感還滿好的呀"},
            {name: "ghost", dialog: "第一次玩吧？跳的真不錯"},
            {name: "ghost", dialog: "謝謝你陪我們兩個老人家啊"},
            {name: "ghost", dialog: "天色也不早了，趕緊回去吃飯吧"}
        ];

        let dialogAfSuccessUp = [
            {name: "ghost", dialog: "真厲害！！"},
            {name: "ghost", dialog: "第一次玩吧？跳的很好呀"},
            {name: "ghost", dialog: "謝謝你陪我們兩個老人家啊"},
            {name: "ghost", dialog: "天色也不早了，趕緊回去吃飯吧"}
        ];

        let likeChoose = () => {
            this.performer.active = false;
            this.likeBtns.active = true;
        }

        let afPerformance = () => {
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfPerfomance, this.dialogGhost, dialogColor, dialogOpacity, likeChoose)
        }

        let performance = () => {
            tween(this.performer)
                .delay(0.1)
                .call(() => performerS.spriteFrame = this.gooseJump)
                .to(0.2, { position: new Vec3(120, 185, 0) })
                .to(0.2, { position: new Vec3(25, 75, 0) })
                .call(() => performerS.spriteFrame = this.goose)
                .delay(0.2)
                .call(() => performerS.spriteFrame = this.gooseJump)
                .to(0.2, { position: new Vec3(-10, 150, 0) })
                .to(0.2, { position: new Vec3(-105, 145, 0) })
                .call(() => performerS.spriteFrame = this.goose)
                .delay(0.2)
                .call(() => performerS.spriteFrame = this.gooseJump)
                .to(0.2, { position: new Vec3(-190, 170, 0) })
                .to(0.2, { position: new Vec3(-250, 40, 0) })
                .call(() => performerS.spriteFrame = this.goose)
                .delay(0.2)
                .call(() => { afPerformance() })
                .start();
        }

        let gameStart = () => {
            this.woods.active = false;
            this.game.active = true;
        }

        let allDialogFin = () => {
            GE.dispatchCustomEvent('performanceDialogFin');
            tween(dialogOpacity)
                .to(0.5, {opacity: 0})
                .call(() => this.node.active = false)
                .start()
        }

        GE.addListener('dialogInPerformance', () => GameManager.dialog(this, this.text, dialogText, this.dialogGhost, dialogColor, dialogOpacity, performance), this);
        GE.addListener('clickLike', () => {
            this.likeBtns.active = false;
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfLike, this.dialogGhost, dialogColor, dialogOpacity, gameStart)
        }, this)
        GE.addListener('clickDislike', () => {
            this.likeBtns.active = false;
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfDisLike, this.dialogGhost, dialogColor, dialogOpacity, gameStart)
        }, this)
        GE.addListener('gameFini', (score) => {
            this.game.active = false;
            this.node.active = true;
            let dialogAfGame;

            if (score < 15) {
                GameManager.record.performance.success = 0;
                dialogAfGame = dialogAfFail;
            }
            else if (score >= 15 && score <= 23) {
                GameManager.record.performance.success = 1;
                dialogAfGame = dialogAfSuccess;
            }
            else {
                GameManager.record.performance.success = 2;
                dialogAfGame = dialogAfSuccessUp;
            }

            GameManager.dialog(this, this.text, dialogAfGame, this.dialogGhost, dialogColor, dialogOpacity, allDialogFin)

        }, this)

    }

    update(deltaTime: number) {

    }
}

