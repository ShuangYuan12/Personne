import { _decorator, Component, log, Node, random, tween, Vec3 } from 'cc';
import { gameController } from './gameController';
const { ccclass, property } = _decorator;

@ccclass('gameCylinder')
export class gameCylinder extends Component {
    
    start() {

        let gameCt = this.node.parent.getComponent(gameController);
        
        let scaleX = this.node.scale.x;
        let scaleY = this.node.scale.y;

        this.node.on(Node.EventType.MOUSE_DOWN, () => {
            log('click')
            gameCt.score += 1;
            this.node.destroy();
        }, this)

        tween(this.node)
            .to(0.6, {scale: new Vec3(scaleX + 0.3, scaleY + 0.3, 1)} ,{easing: 'backIn'})
            .to(0.6, {scale: new Vec3(scaleX - 0.1, scaleY - 0.1, 1)}, {easing: 'backOut'})
            .start();
        
        this.schedule(() => this.node.destroy(), 1.2);
    }

    update(deltaTime: number) {
        
    }
}

