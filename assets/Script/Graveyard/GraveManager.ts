import { _decorator, Component, director, log, Node, Sprite, tween, UIOpacity } from 'cc';
import { GameManager } from '../GameManager';
import { Grave } from './Grave';
const { ccclass, property } = _decorator;

export enum graves {
    diamond = "diamondGrave",
    gold = "goldGrave",
    rock = "rockGrave",
    rock2 = "rock2Grave",
    wood = "woodGrave"
}

@ccclass('GraveManager')
export class GraveManager extends Component {

    @property(Node)
    dialog: Node;

    start() {

        let graveOpacity = this.node.getComponent(UIOpacity);

        director.preloadScene('Stage');
        director.preloadScene('Performance');
        director.preloadScene('Cat');

        if (GameManager.status.startToGraveyard == true) {
            tween(graveOpacity)
                .to(1, { opacity: 255 })
                .call(() => this.dialog.active = true)
                .delay(0.1)
                .call(() => GE.dispatchCustomEvent('dialogInGraveyard'))
                .start();

            GameManager.status.startToGraveyard = false;
        }
        else {
            GameManager.finiStage += 1;

            if (GameManager.finiStage != 3) {
                tween(graveOpacity)
                    .to(1, { opacity: 255 })
                    .call(() => { this.dialog.active = true })
                    .delay(0.1)
                    .call(() => GE.dispatchCustomEvent('notFirstInGraveyard'))
                    .start();
            }
        }

        GE.addListener('startChooseGrave', () => {

            if (GameManager.status.stageFini == false)
                this.node.getChildByName(graves.wood).addComponent(Grave);
            if (GameManager.status.PerformanceFini == false)
                this.node.getChildByName(graves.rock).addComponent(Grave);
            if (GameManager.status.handsOnFini == false)
                this.node.getChildByName(graves.diamond).addComponent(Grave);

        }, this)
    }

    update(deltaTime: number) {

    }
}

