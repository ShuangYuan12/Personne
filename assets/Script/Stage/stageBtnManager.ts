import { _decorator, Button, Component, Label, log, Node, random } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('stageBtnManager')
export class stageBtnManager extends Component {

    @property(Button)
    like: Button;
    @property(Button)
    dislike: Button;

    @property(Button)
    song1: Button;
    @property(Button)
    song2: Button;
    @property(Button)
    song3: Button;

    @property(Label)
    song1Label: Label;
    @property(Label)
    song2Label: Label;
    @property(Label)
    song3Label: Label;
    
    start() {

        let _songs = [
            {name: 'Banlieue nord', successRate: 0.7},
            {name: 'Piano coccinelle', successRate: 0.4},
            {name: 'Colibri', successRate: 0.6},
            {name: 'L\'Envolée', successRate: 0.8},
            {name: 'Être soi', successRate: 0.5}
        ];
        let songs = [];
        for (let i = 0; i < 3; i++) {
            
            let rnd = Math.floor(random() * (5 - i));
            songs.push(_songs[rnd]);
            _songs.splice(rnd, 1);
        }

        this.song1Label.string = songs[0].name;
        this.song2Label.string = songs[1].name;
        this.song3Label.string = songs[2].name;
        
        this.like.node.once(Button.EventType.CLICK, () => {
            GameManager.record.stage.like = 1;
            log(GameManager.record);
            GE.dispatchCustomEvent('clickLike');
        })

        this.dislike.node.once(Button.EventType.CLICK, () => {
            GameManager.record.stage.like = 0;
            log(GameManager.record);
            GE.dispatchCustomEvent('clickDislike');
        })

        this.song1.node.once(Button.EventType.CLICK, () => this.isSuccess(songs[0].successRate));
        this.song2.node.once(Button.EventType.CLICK, () => this.isSuccess(songs[1].successRate));
        this.song3.node.once(Button.EventType.CLICK, () => this.isSuccess(songs[2].successRate));

    }

    update(deltaTime: number) {
        
    }

    isSuccess(successRate){
        let rndSuccess = random();
        log(rndSuccess);
        if(rndSuccess < successRate){
            GameManager.record.stage.success = 1;
            log(GameManager.record);
            GE.dispatchCustomEvent('success');
        }
        else{
            GameManager.record.stage.success = 0;
            log(GameManager.record);
            GE.dispatchCustomEvent('fail')
        }
    }
}

