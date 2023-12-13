import { _decorator, Button, Component, instantiate, Label, log, Node, Prefab, random, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

    @property(Node)
    startNode: Node;
    @property(Button)
    startBtn: Button;
    @property(Node)
    timeup: Node;

    @property(Prefab)
    cylinder: Prefab;

    @property(SpriteFrame)
    wood: SpriteFrame;
    @property(SpriteFrame)
    wood2: SpriteFrame;

    @property(Label)
    scoreLb: Label;
    @property
    score = 0;

    start() {

        this.startBtn.node.once(Button.EventType.CLICK, () => {

            this.startNode.active = false;

            let count = 0;
            this.schedule(() => {

                if (count == 49) {
                    this.timeup.active = true;
                    this.scoreLb.string = '得分：' + this.score;
                    this.schedule(() => GE.dispatchCustomEvent('gameFini', this.score), 2)
                }

                else if (count < 42) {
                    let scale = random() * 1.2 + 0.4;
                    let posX = random() * 400 - 200;
                    let posY = random() * 400 - 200;

                    let addCyl = instantiate(this.cylinder);
                    let s = addCyl.getComponent(Sprite);
                    
                    if(random() < 0.5)
                        s.spriteFrame = this.wood;
                    else
                        s.spriteFrame = this.wood2;

                    addCyl.setPosition(posX, posY, 0);
                    addCyl.setScale(scale, scale, 1);
                    addCyl.parent = this.node;
                }

                count++;

            }, 0.2, 49)

        });

    }

    update(deltaTime: number) {

    }
}

