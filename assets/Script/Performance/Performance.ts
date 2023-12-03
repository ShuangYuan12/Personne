import { _decorator, Component, director, Node, tween, UIOpacity } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Performance')
export class Performance extends Component {
    
    @property(Node)
    dialog: Node;
    
    start() {

        let PerformanceOpacity = this.node.getComponent(UIOpacity);

        tween(PerformanceOpacity)
            .to(1, { opacity: 255 })
            .call(() => this.dialog.active = true)
            .delay(0.1)
            .call(() => GE.dispatchCustomEvent('dialogInPerformance'))
            .start();

        GE.addListener('performanceDialogFin', () => {

            director.preloadScene('Graveyard');

            tween(PerformanceOpacity)
                .to(1, { opacity: 0 })
                .call(() => GameManager.status.PerformanceFini = true)
                .delay(0.1)
                .call(() => director.loadScene('Graveyard'))
                .start();

        }, this)

    }

    update(deltaTime: number) {
        
    }
}

