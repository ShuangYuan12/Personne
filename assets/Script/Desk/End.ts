import { _decorator, Button, Component, director, find, log, Node, random, Sprite, SpriteFrame, tween, UIOpacity } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

export enum Paper {
    guitar,
    machine,
    plan,
    dance,
    keyboard,
    design
}

@ccclass('End')
export class End extends Component {

    @property(Node)
    dialog: Node;
    @property(Node)
    paper: Node;

    @property(SpriteFrame)
    guitar: SpriteFrame;
    @property(SpriteFrame)
    machine: SpriteFrame;
    @property(SpriteFrame)
    plan: SpriteFrame;
    @property(SpriteFrame)
    dance: SpriteFrame;
    @property(SpriteFrame)
    keyboard: SpriteFrame;
    @property(SpriteFrame)
    design: SpriteFrame;

    @property(Button)
    home: Button;

    @property
    p = undefined;

    start() {

        let deskOpacity = this.node.getComponent(UIOpacity);
        let paperS = this.paper.getComponent(Sprite);

        let stageTF = GameManager.record.stage.like && GameManager.record.stage.success;
        let performanceTF = GameManager.record.performance.like && GameManager.record.performance.success;
        let catTF = GameManager.record.cat.like && GameManager.record.cat.success;
        let rate = { stage: stageTF, performance: performanceTF, cat: catTF };

        if (rate.stage && rate.performance && rate.cat == true)
            this.p = Math.floor(random() * 6);
        else if (rate.stage && rate.performance && rate.cat == false)
            this.p = Math.floor(random() * 6)

        else if (rate.performance && rate.cat == true) {
            if (random() < 0.8)
                this.p = Paper.keyboard;
            else
                if (random() < 0.3)
                    this.p = Paper.keyboard;
                else if (random() < 0.6)
                    this.p = Paper.machine;
                else
                    this.p = Paper.plan;
        }

        else if (rate.stage && rate.cat == true) {
            if (random() < 0.8)
                this.p = Paper.design;
            else
                if (random() < 0.3)
                    this.p = Paper.design;
                else if (random() < 0.6)
                    this.p = Paper.guitar;
                else
                    this.p = Paper.plan;
        }

        else if (rate.stage && rate.performance == true) {
            if (random() < 0.8)
                this.p = Paper.dance;
            else
                if (random() < 0.3)
                    this.p = Paper.dance;
                else if (random() < 0.6)
                    this.p = Paper.guitar;
                else
                    this.p = Paper.machine;
        }

        else if (rate.stage) {
            if (random() < 0.8)
                this.p = Paper.guitar;
            else
                if (random() < 0.3)
                    this.p = Paper.guitar;
                else if (random() < 0.6)
                    this.p = Paper.dance;
                else
                    this.p = Paper.design;
        }

        else if (rate.performance) {
            if (random() < 0.8)
                this.p = Paper.machine;
            else
                if (random() < 0.3)
                    this.p = Paper.machine;
                else if (random() < 0.6)
                    this.p = Paper.dance;
                else
                    this.p = Paper.keyboard;
        }

        else {
            if (random() < 0.8)
                this.p = Paper.plan;
            else
                if (random() < 0.3)
                    this.p = Paper.plan;
                else if (random() < 0.6)
                    this.p = Paper.keyboard;
                else
                    this.p = Paper.design;
        }

        this.whichPaper(this.p, paperS);

        tween(deskOpacity)
            .to(1, { opacity: 255 })
            .call(() => this.dialog.active = true)
            .delay(0.1)
            .call(() => GE.dispatchCustomEvent('dialogEnd'))
            .start();

        director.preloadScene('Start');

        GE.addListener('homeBtnAppear', () => {
            tween(deskOpacity)
                .delay(0.2)
                .to(1, { opacity: 0 })
                .delay(0.2)
                .call(() => this.home.node.active = true)
                .start();
        }, this);

        this.home.node.once(Button.EventType.CLICK, () => {
            tween(deskOpacity)
                .to(1, { opacity: 0 })
                .call(() => {
                    GameManager.status = {
                        startToGraveyard: true,
                        stageFini: false,
                        performanceFini: false,
                        catFini: false
                    }
                    GameManager.finiStage = 0;
                    GameManager.record = {
                        stage: { like: undefined, success: undefined },
                        performance: { like: undefined, success: undefined },
                        cat: { like: undefined, success: undefined }
                    };

                    director.loadScene('Start');
                })
                .start();
        })

    }

    update(deltaTime: number) {

    }

    whichPaper(tf: number, paper: Sprite) {
        switch (tf) {
            case Paper.guitar:
                paper.spriteFrame = this.guitar;
                break;
            case Paper.machine:
                paper.spriteFrame = this.machine;
                break;
            case Paper.plan:
                paper.spriteFrame = this.plan;
                break;
            case Paper.dance:
                paper.spriteFrame = this.dance;
                break;
            case Paper.keyboard:
                paper.spriteFrame = this.keyboard;
                break;
            case Paper.design:
                paper.spriteFrame = this.design;
                break;
            default:
                break;
        }
    }

}

