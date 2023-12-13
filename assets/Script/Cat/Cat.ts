import { _decorator, Component, director, Node, Sprite, SpriteFrame, tween, UIOpacity } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Cat')
export class Cat extends Component {

    @property(Node)
    dialog: Node;
    @property(Node)
    cat: Node;

    @property(SpriteFrame)
    cat1: SpriteFrame;
    @property(SpriteFrame)
    cat2: SpriteFrame;
    
    start() {

        let catOpacity = this.node.getComponent(UIOpacity);
        let catFS = this.cat.getComponent(Sprite);

        tween(catOpacity)
            .to(1, { opacity: 255 })
            .call(() => this.dialog.active = true)
            .delay(0.1)
            .call(() => GE.dispatchCustomEvent('dialogInCat'))
            .start();

        tween(this.cat)
            .delay(1.2)
            .sequence(
                tween(this.cat).call(() => catFS.spriteFrame = this.cat2).delay(0.8),
                tween(this.cat).call(() => catFS.spriteFrame = this.cat1).delay(0.8)
            )
            .repeat(99)
            .start();

        GE.addListener('catDialogFin', () => {

            director.preloadScene('Graveyard');

            tween(catOpacity)
                .to(1, { opacity: 0 })
                .call(() => GameManager.status.catFini = true)
                .delay(0.1)
                .call(() => director.loadScene('Graveyard'))
                .start();

        }, this)

    }

    update(deltaTime: number) {
        
    }
}

