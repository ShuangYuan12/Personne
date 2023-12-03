import { _decorator, Component, director, Node, tween, UIOpacity } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Cat')
export class Cat extends Component {

    @property(Node)
    dialog: Node;
    
    start() {

        let catOpacity = this.node.getComponent(UIOpacity);

        tween(catOpacity)
            .to(1, { opacity: 255 })
            .call(() => this.dialog.active = true)
            .delay(0.1)
            .call(() => GE.dispatchCustomEvent('dialogInCat'))
            .start();

        // GE.addListener('catDialogFin', () => {

        //     director.preloadScene('Graveyard');

        //     tween(catOpacity)
        //         .to(1, { opacity: 0 })
        //         .call(() => GameManager.status.stageFini = true)
        //         .delay(0.1)
        //         .call(() => director.loadScene('Graveyard'))
        //         .start();

        // }, this)

    }

    update(deltaTime: number) {
        
    }
}

