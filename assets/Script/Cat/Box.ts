import { _decorator, Canvas, Collider2D, Component, Contact2DType, find, input, Input, log, Node } from 'cc';
import { catGameController, gameObj } from './catGameController';
const { ccclass, property } = _decorator;

@ccclass('Box')
export class Box extends Component {

    @property(Node)
    bg: Node;
    @property(Node)
    goal: Node;

    start() {

        let goalsNum = [0, 0, 0, 0];
        let gameCt = this.node.parent.getComponent(catGameController);
        
        this.bg.on(Node.EventType.MOUSE_MOVE, (e) => {
            let pos = e.getUILocation();
            this.node.setWorldPosition(pos.x, 220, 0);
        })

        let col = this.getComponent(Collider2D);
        col.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
            switch (other.tag) {
                case gameObj.stick:
                    this.isComplete(goalsNum, gameObj.stick);
                    other.node.destroy();
                    break;
                case gameObj.feather:
                    this.isComplete(goalsNum, gameObj.feather);
                    other.node.destroy();
                    break;
                case gameObj.line:
                    this.isComplete(goalsNum, gameObj.line);
                    other.node.destroy();
                    break;
                case gameObj.ball:
                    this.isComplete(goalsNum, gameObj.ball);
                    other.node.destroy();
                    break;
                case gameObj.gecko:
                    gameCt.time += 3;
                    other.node.destroy();
                    break;

                default:
                    break;
            }
        }, this)

    }

    update(deltaTime: number) {

    }

    isComplete(goals: number[], index: number) {

        let n = goals[index];
        let sum = 0;

        if(n < 3)
            goals[index] = n + 1;

        if(goals[index] == 3)
            find(`obj${index}/check`, this.goal).active = true;

        for(let i of goals){
            sum += i;
        }
        if(sum == 12)
            GE.dispatchCustomEvent('catchAll');

        log(n, goals);

    }
}

