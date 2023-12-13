import { _decorator, Button, Collider2D, Color, Component, instantiate, Label, log, Node, Prefab, random, RigidBody, RigidBody2D, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

export enum gameObj {
    stick,
    feather,
    line,
    ball,
    gecko
}

@ccclass('catGameController')
export class catGameController extends Component {

    @property(Node)
    startNode: Node;
    @property(Button)
    startBtn: Button;
    @property(Node)
    fini: Node;
    @property(Node)
    box: Node;
    @property(Node)
    objs: Node;
    @property(Node)
    goal: Node;

    @property(Prefab)
    obj: Prefab;
    @property(SpriteFrame)
    gecko: SpriteFrame;
    @property(SpriteFrame)
    stick: SpriteFrame;
    @property(SpriteFrame)
    feather: SpriteFrame;
    @property(SpriteFrame)
    line: SpriteFrame;
    @property(SpriteFrame)
    ball: SpriteFrame;

    @property(Label)
    timeLb: Label;
    @property
    time = 0

    start() {

        this.startBtn.node.once(Button.EventType.CLICK, () => {

            this.startNode.active = false;
            this.box.active = true;
            this.goal.active = true;

            let count = 0;
            this.schedule(() => {
                this.time++;

                if (count == 99) {
                    this.objs.active = false;
                    this.box.active = false;
                    this.goal.active = false;
                    this.fini.active = true;
                    this.timeLb.string = '失敗';
                    this.schedule(() => {
                        this.unscheduleAllCallbacks();
                        this.objs.destroy();
                    }, 0.1);
                }

                count++;

            }, 1, 99)

            let objCount = 0;
            this.schedule(() => {
                let posX = random() * 600 - 300;

                let addObj = instantiate(this.obj);
                addObj.setPosition(posX, 200, 0);

                let sprite = addObj.getComponent(Sprite);
                let col = addObj.getComponent(Collider2D);
                let rig = addObj.getComponent(RigidBody2D);

                rig.gravityScale = random() + 1;

                switch (objCount % 10) {
                    case gameObj.stick:
                        sprite.spriteFrame = this.stick;
                        col.tag = gameObj.stick;
                        break;
                    case gameObj.feather + 3:
                        sprite.spriteFrame = this.feather;
                        col.tag = gameObj.feather;
                        break;
                    case gameObj.line + 3:
                        sprite.spriteFrame = this.line;
                        col.tag = gameObj.line;
                        break;
                    case gameObj.ball + 4:
                        sprite.spriteFrame = this.ball;
                        col.tag = gameObj.ball;
                        break;
                    default:
                        sprite.spriteFrame = this.gecko;
                        col.tag = gameObj.gecko;
                        break;
                }

                addObj.parent = this.objs;
                objCount++;

            }, 0.2)
        })

        GE.addListener('catchAll', () => {
            log('catchAll');
            this.objs.active = false;
            this.box.active = false;
            this.goal.active = false;
            this.fini.active = true;
            this.timeLb.string = '花費時間：' + this.time;

            this.schedule(() => GE.dispatchCustomEvent('gameFini', this.time), 2);

            this.schedule(() => {
                this.unscheduleAllCallbacks();
                this.objs.destroy();
            }, 2.1);
        }, this)

    }

    update(deltaTime: number) {

    }
}

