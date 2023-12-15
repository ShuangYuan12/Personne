import { _decorator, Color, Component, Label, log, Node, tween, UIOpacity, Vec3 } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('DialogInCat')
export class DialogInCat extends Component {
    
    @property(Label)
    text: Label;
    @property(Node)
    dialogGhost: Node;

    @property(Node)
    likeBtns: Node;

    @property(Node)
    cat: Node;

    @property(Node)
    game: Node;
    
    start() {

        let dialogOpacity = this.node.getComponent(UIOpacity);
        let dialogColor = new Color(240, 144, 167);

        let dialogText = [
            { name: "ghost", dialog: "喵～" },
            { name: "", dialog: "哇！好可愛的貓咪" },
            { name: "", dialog: "啊...不給摸啊" },
            { name: "", dialog: "這裡有肉泥喔" },
            { name: "", dialog: "這也沒興趣呀" },
        ];

        let dialogAfLike = [
            { name: "", dialog: "啊，旁邊有東西，我做個玩具吧" }
        ];

        let dialogAfDisLike = [
            { name: "", dialog: "你說旁邊有材料可以做玩具啊，那等我一下" }
        ];

        let dialogAfSuccess = [
            { name: "", dialog: "做好了！"},
            { name: "ghost", dialog: "喵～喵喵喵喵～"},
            { name: "", dialog: "哈哈真可愛"},
            { name: "", dialog: "如果可以，真想把你帶回去..."}
        ];

        let dialogAfFail = [
            { name: "", dialog: "做好了！"},
            { name: "", dialog: "欸？貓呢"},
            { name: "", dialog: "跑走了呀...可能是餓了去找東西吃了吧"}
        ]

        let likeChoose = () => {
            this.cat.active = false;
            this.likeBtns.active = true;
        }

        let gameStart = () => {
            this.game.active = true;
        }

        let allDialogFin = () => {
            GE.dispatchCustomEvent('catDialogFin');
            tween(dialogOpacity)
                .to(0.5, {opacity: 0})
                .call(() => this.node.active = false)
                .start()
        }

        GE.addListener('dialogInCat', () => GameManager.dialog(this, this.text, dialogText, this.dialogGhost, dialogColor, dialogOpacity, likeChoose), this);
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
        GE.addListener('gameFini', (time) => {
            log('gamfini', time);
            this.game.active = false;
            this.node.active = true;
            let dialogAfGame;

            if((time - 2) < 18){
                GameManager.record.cat.success = 1;
                dialogAfGame = dialogAfSuccess;
                this.cat.active = true;
            }
            else{
                GameManager.record.cat.success = 0;
                dialogAfGame = dialogAfFail;
            }

            GameManager.dialog(this, this.text, dialogAfGame, this.dialogGhost, dialogColor, dialogOpacity, allDialogFin)

        }, this)

    }

    update(deltaTime: number) {
        
    }
}

