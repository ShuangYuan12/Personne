import { _decorator, Component, director, Node, tween, UIOpacity } from 'cc';
import { GameManager} from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Stage')
export class Stage extends Component {

    @property(Node)
    dialog: Node;

    start() {

        let stageOpacity = this.node.getComponent(UIOpacity);

        tween(stageOpacity)
            .to(1, { opacity: 255 })
            .call(() => this.dialog.active = true)
            .delay(0.1)
            .call(() => GE.dispatchCustomEvent('dialogInStage'))
            .start();

        GE.addListener('stageDialogFin', () => {

            director.preloadScene('Graveyard');

            tween(stageOpacity)
                .to(1, { opacity: 0 })
                .call(() => GameManager.status.stageFini = true)
                .delay(0.1)
                .call(() => director.loadScene('Graveyard'))
                .start();

        }, this)

    }

    update(deltaTime: number) {

    }
}

