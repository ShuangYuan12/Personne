import { _decorator, Component, director, Node, tween, UIOpacity } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Performance')
export class Performance extends Component {
    
    @property(Node)
    dialog: Node;
    @property(Node)
    goose: Node;
    
    start() {

        let PerformanceOpacity = this.node.getComponent(UIOpacity);
        let gooseOpacity = this.goose.getComponent(UIOpacity);

        tween(PerformanceOpacity)
            .to(1, { opacity: 255 })
            .call(() => this.dialog.active = true)
            .delay(0.1)
            .call(() => GE.dispatchCustomEvent('dialogInPerformance'))
            .start();

        tween(gooseOpacity)
            .to(1, {opacity: 255})
            .start();

        GE.addListener('performanceDialogFin', () => {

            director.preloadScene('Graveyard');

            tween(PerformanceOpacity)
                .to(1, { opacity: 0 })
                .call(() => GameManager.status.performanceFini = true)
                .delay(0.1)
                .call(() => director.loadScene('Graveyard'))
                .start();

        }, this)

    }

    update(deltaTime: number) {
        
    }
}

