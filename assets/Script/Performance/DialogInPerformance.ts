import { _decorator, Component, Label, log, Node, tween, UIOpacity, Vec3 } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('DialogInPerformance')
export class DialogInPerformance extends Component {

    @property(Label)
    text: Label;
    @property(Node)
    dialogName: Node;
    @property(Label)
    nameLabel: Label;

    @property(Node)
    performer: Node;

    @property(Node)
    likeBtns: Node;
    @property(Node)
    game: Node;

    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);

        let dialogText = [
            { name: "ghost", dialog: "呀，來了一位年輕人" },
            { name: "ghost", dialog: "坐吧，一起看戲" }
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
            GameManager.dialog(this, this.text, dialogAfPerfomance, this.dialogName, this.nameLabel, dialogOpacity, likeChoose)
        }

        let performance = () => {
            tween(this.performer)
                .to(0.2, { position: new Vec3(120, 100, 0) })
                .to(0.2, { position: new Vec3(70, 60, 0) })
                .delay(0.2)
                .to(0.2, { position: new Vec3(0, 140, 0) })
                .to(0.2, { position: new Vec3(-50, 40, 0) })
                .delay(0.2)
                .to(0.2, { position: new Vec3(-80, 100, 0) })
                .to(0.2, { position: new Vec3(-120, 50, 0) })
                .delay(0.2)
                .call(() => { afPerformance() })
                .start();
        }

        let gameStart = () => {
            this.game.active = true;
        }

        let allDialogFin = () => {
            GE.dispatchCustomEvent('performanceDialogFin');
            tween(dialogOpacity)
                .to(0.5, {opacity: 0})
                .call(() => this.node.active = false)
                .start()
        }

        GE.addListener('dialogInPerformance', () => GameManager.dialog(this, this.text, dialogText, this.dialogName, this.nameLabel, dialogOpacity, performance), this);
        GE.addListener('clickLike', () => {
            this.likeBtns.active = false;
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfLike, this.dialogName, this.nameLabel, dialogOpacity, gameStart)
        }, this)
        GE.addListener('clickDislike', () => {
            this.likeBtns.active = false;
            this.node.active = true;
            GameManager.dialog(this, this.text, dialogAfDisLike, this.dialogName, this.nameLabel, dialogOpacity, gameStart)
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

            GameManager.dialog(this, this.text, dialogAfGame, this.dialogName, this.nameLabel, dialogOpacity, allDialogFin)

        }, this)

    }

    update(deltaTime: number) {

    }
}

