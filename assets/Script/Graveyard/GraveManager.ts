import { _decorator, Color, Component, director, log, Node, Sprite, tween, UIOpacity } from 'cc';
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
            else{
                tween(graveOpacity)
                    .to(1, {opacity: 255})
                    .call(() => {this.dialog.active = true})
                    .delay(0.1)
                    .call(() => GE.dispatchCustomEvent('allGraveComplete'))
                    .start();
            }
        }

        GE.addListener('startChooseGrave', () => {

            if (GameManager.status.stageFini == false)
                this.node.getChildByName(graves.wood).addComponent(Grave);
            if (GameManager.status.performanceFini == false)
                this.node.getChildByName(graves.rock).addComponent(Grave);
            if (GameManager.status.catFini == false)
                this.node.getChildByName(graves.diamond).addComponent(Grave);

        }, this)

        GE.addListener('toEnd',  () => {
            
            director.preloadScene('End');

            tween(graveOpacity)
                .to(1, {opacity: 0})
                .call(() => director.loadScene('End'))
                .start();

        }, this)
    }

    update(deltaTime: number) {

    }
}

