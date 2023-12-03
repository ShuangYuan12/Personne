import { _decorator, Button, Component, log, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('performanceBtnManager')
export class performanceBtnManager extends Component {
    
    @property(Button)
    like: Button;
    @property(Button)
    dislike: Button;
    
    start() {

        this.like.node.once(Button.EventType.CLICK, () => {
            GameManager.record.performance.like = 1;
            log(GameManager.record);
            GE.dispatchCustomEvent('clickLike');
        })

        this.dislike.node.once(Button.EventType.CLICK, () => {
            GameManager.record.performance.like = 0;
            log(GameManager.record);
            GE.dispatchCustomEvent('clickDislike');
        })

    }

    update(deltaTime: number) {
        
    }
}

