import { _decorator, Component, director, log, Node } from 'cc';
import { graves } from './GraveManager';
const { ccclass, property } = _decorator;

@ccclass('Grave')
export class Grave extends Component {

    start() {

        log("graveOn");

        this.node.on(Node.EventType.MOUSE_ENTER, () => this.node.children[0].active = true);
        this.node.on(Node.EventType.MOUSE_LEAVE, () => this.node.children[0].active = false);

        switch (this.node.name) {
            case graves.wood:
                this.node.on(Node.EventType.MOUSE_UP, () => director.loadScene('Stage'))
                break;

            case graves.rock:
                this.node.on(Node.EventType.MOUSE_UP, () => director.loadScene('Performance'))
                break;

            case graves.diamond:
                this.node.on(Node.EventType.MOUSE_UP, () => director.loadScene('Cat'))
        
            default:
                break;
        }
    }

    update(deltaTime: number) {
        
    }

}

