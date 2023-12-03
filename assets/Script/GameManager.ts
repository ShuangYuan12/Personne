import { _decorator, Component, Node, director, tween, Label, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    //場景切換狀態
    public static status = {
        startToGraveyard: true,
        stageFini: false,
        PerformanceFini: false,
        handsOnFini: false
    }
    //已通關數
    public static finiStage = 0;
    //興趣與性向紀錄
    public static record = {
        stage: {like: undefined, success: undefined},
        performance: {like: undefined, success: undefined}
    };

    start() {
        director.addPersistRootNode(this.node);
    }

    update(deltaTime: number) {

    }

    /**
     * 淡入淡出
     * @param nodeOpacity UIOpacity元件
     * @param opacityN 最終到達透明度
     * @param second 緩動秒數
     */
    public static fade(nodeOpacity, opacityN: number, second: number) {
        tween(nodeOpacity)
            .to(second, { opacity: opacityN })
            .start()
    }

    /**
     * 對話系統與打字機效果
     * @param target target
     * @param label 對話文字
     * @param dialogText 對話內容陣列
     * @param dialogName 名字Node
     * @param nameLabel 名字文字
     * @param dialogOpacity 對話框UIOpacity
     * @param listenerName 監聽事件名
     * @param dialogFinishTodo 對話結束後callback
     */
    public static dialog(target: any, label, dialogText, dialogName, nameLabel, dialogOpacity, dialogFinishTodo?: any) {

            GameManager.fade(dialogOpacity, 255, 0.2);

            let i = 0;
            let wordth = 0;
            let next = false;

            target.node.on(Node.EventType.MOUSE_UP, () => {
                log(i, wordth, next);
                target.unscheduleAllCallbacks();

                if (next == false) {
                    log('next is false');
                    label.string = dialogText[wordth].dialog;
                    i = 0;
                    next = true;
                }
                else if (next == true && wordth < dialogText.length - 1) {
                    log('next is true');
                    wordth++;
                    next = false;

                    if (dialogText[wordth].name != "") {
                        dialogName.active = true;
                        nameLabel.string = dialogText[wordth].name;
                    }
                    else {
                        dialogName.active = false;
                    }

                    target.schedule(() => {
                        label.string = dialogText[wordth].dialog.substring(0, i);
                        i++;

                        if (i == dialogText[wordth].dialog.length + 1) {
                            i = 0;
                            next = true;
                        }

                    }, 0.1, dialogText[wordth].dialog.length);
                }

                else if (wordth = dialogText.length) {
                    target.node.off(Node.EventType.MOUSE_UP);
                    if (dialogFinishTodo != undefined)
                        dialogFinishTodo();
                    target.scheduleOnce(() => {
                        label.string = "";
                        dialogOpacity.opacity = 0;
                        target.node.active = false;
                    }, 0.2);
                }
            }, target)

            if (dialogText[wordth].name != "") {
                dialogName.active = true;
                nameLabel.string = dialogText[wordth].name;
            }
            else {
                dialogName.active = false;
            }

            target.schedule(() => {
                label.string = dialogText[wordth].dialog.substring(0, i);
                i++;

                if (i == dialogText[wordth].dialog.length + 1) {
                    i = 0;
                    next = true;
                }
            }, 0.1, dialogText[wordth].dialog.length, 0.5);
    }

}

