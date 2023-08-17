import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, of, take, takeWhile, tap, timer } from 'rxjs';

interface Target {
  show: boolean;
  xPosition: number;
  yPosition: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  target: Target = {
    show: false,
    xPosition: 0, 
    yPosition: 0 
  };
  
  playgroundSize: { width: number, height: number } = { width: 0, height: 0 };
  
  gameDuration?: number = 0;
  countDown?: Observable<number>;
  
  isInGame: boolean = false
  
  currentGameScore: number = 0
  
  showScore: boolean = false;
  
  @ViewChild('playground')
  playground!: ElementRef
  
  
  ngAfterViewInit(): void {
    this.playgroundSize = this.getPlaygroundSize()
  }
  
  startTheGame() {
    this.hideScore()
    this.initializeCountdown()
    this.randomizeTargetLocation()
    this.initializeScore()
    this.showTarget()
  }
  
  initializeCountdown() {
    const gameDuration = this.gameDuration
    if (Number.isNaN(gameDuration) || !gameDuration) {
      alert("Please enter a valid game duration")
      return
    }
    this.countDown = timer(0, 1000)
      .pipe(
        map(time => gameDuration - time),
        take(gameDuration + 1)
        )
      
    this.countDown.subscribe(
      time =>  {
        if (time === 0) {
          this.isInGame = false
          this.finishGame()
        } else {
          this.isInGame = true
        }
      },
    )
  }
      
  hideScore() {
    this.showScore = false
  }

  showTarget() {
    this.target = {
      ...this.target,
      show: true
    }
  }
      
  finishGame() {
    this.showScore = true
    console.log("finish game")
  }

  getPlaygroundSize() {
    return {
      width: this.playground.nativeElement.offsetWidth * 0.90,
      height: this.playground.nativeElement.offsetHeight * 0.90
    }
  }
      
  randomizeTargetLocation() {
    this.target = {
      ...this.target,
      xPosition: Math.round(Math.random() * this.playgroundSize.width),
      yPosition: Math.round(Math.random() * this.playgroundSize.height),
    }
  }

  targetClicked() {
    this.randomizeTargetLocation()
    this.currentGameScore++
  }

  initializeScore() {
    this.currentGameScore = 0
  }
}
    // showTarget() {
    //   this.target = {
    //     ...this.target,
    //     show: true
    //   }
    //New circles positions will be added here
    // coordinatesOfCircles: Position[] = [];
    
    // //Self explanatory...
    // asClickedTheCircle$ = new BehaviorSubject<boolean>(false);
    
    // //This timer is for the circle to display and then disapear
    // timerToDisplayCircle = timer(0, 1000); //Time starts at 0...
    
    // //This timer is the count down for the duration of the game
    // timerForTheGame = timer(0, 1000);
    
    // //This Subject display the time left in the game 
    // durationOfTheGame = new BehaviorSubject<number>(0);
    
    // //The duration of the game is over
    // timeIsOver = new BehaviorSubject<Boolean>(false);
    
    // //These are there because Rxjs can be funny sometimes...
    // timerSubscription?: Subscription;
    // timerSub?: Subscription;
    
    // //Score go up by one if player click the circle
    // scoreOfPlayer: number = 0;
    
    // //Self explanatory again...
    // displayScore: boolean = false;
    
    // //Let the user set the duration of the game
    // timerForLengthOfTheGame?: number;
    
    // //This check if the user has set the duration
    // undefinedTimerForTheGame: boolean = false;
    
    // //Could have been a simple object, but I wanted to practice Rxjs
    // getNewCirclePosition$ = new BehaviorSubject<Position>({
    //   xPosition: 0,
    //   yPosition: 0
    // });
    
    // //Called when the game is started
    // startTheGameAndRandomiseCircles(): Promise<Subscription | void> | boolean {
    //   console.log("TEST")
    //   //This if block check if the duration of the game set by the user is valid
    //   if (!this.timerForLengthOfTheGame || Number.isNaN(this.timerForLengthOfTheGame) || this.timerForLengthOfTheGame <= 0) {
    //     return this.undefinedTimerForTheGame = true;
    //   };
    //   //else:
    //   this.undefinedTimerForTheGame = false;
    
    //   //Lets get into the deep...
    
    //   //This if-else is always checking to see if the timer is over
    //   //If its over (you will see later) the function stops
    //   if (this.timeIsOver.getValue() !== true) {
    //     return new Promise<Subscription | void>((resolve) => {
    //       //The setTimeout block allows the circles to display one after one after two seconds
    //       setTimeout(() => {
    //         this.getNewCirclePosition$.next({
    //           xPosition: Math.round(Math.random() * 1000),
    //           yPosition: Math.round(Math.random() * 1000)
    //         });
    //         //The coordinates get push in the array
    //         this.coordinatesOfCircles.push(this.getNewCirclePosition$.getValue());
    //         //The promise is complete
    //         resolve();
    //       }, 1000);
    //     })
    //       .then(() => {
    //         //This if block check if there is already a subscription to the timer
    //         if (this.timerSubscription) {
    //           this.timerSubscription.unsubscribe();
    //         };
    //         //Assigning the subscription variable to a real subscription
    //        return this.timerSubscription! = this.timerToDisplayCircle
    //           .pipe(
    //             //The takeWhile is taking value below or equal to 1
    //             //(Reminder that the timer starts at 0)
    //             takeWhile((time) => time <= 1)
    //           )
    //           .subscribe((time) => {
    //             //This if block check if its been 2 seconds
    //             //If so, the coordinates array gets reset and the function is beeing called again
    //             //This is why we need to unsubscribe at line 84.
    //             //If we do not unsubsribe, the timer just go up and up and up and up and
    //             //the condition will never be met again
    //             if (time == 1) {
    //               this.coordinatesOfCircles = [];
    //               this.startTheGameAndRandomiseCircles();
    //             };
    //           });
    //       });
    //   };
    //   //If the timer is over (timeIsOver.getValue() == true) we display the score
    //   return this.displayScore = true;
    // };
    
    // //This function check for a click on a circle
    // checkForClientClick($event: MouseEvent): void {
    //   //If we have a click :
    //   if ($event) {
    //     //The array of coordinates get rest
    //     this.coordinatesOfCircles = [];
    //     //The score gets incremented
    //     this.scoreOfPlayer++;
    //     //We unsubscribe the timer for the same reason as earlier
    //     this.timerSubscription?.unsubscribe();
    //     //We call the function again to put new circles
    //     this.startTheGameAndRandomiseCircles();
    //   };
    // };
    
    // //This function is called to stop the game once the timer is down to 0
    // timerToStopTheGame(): boolean | void {
    //   //This if block check if the duration of the game set by the user is valid
    //   //Without it, the rest of the code is doing some weird things...
    //   if (!this.timerForLengthOfTheGame || Number.isNaN(this.timerForLengthOfTheGame) || this.timerForLengthOfTheGame <= 0) {
    //     return this.undefinedTimerForTheGame = true;
    //   };
    //   //Assigning the second subscription variable to a real subscription
    //   this.timerSub = this.timerForTheGame.subscribe(time => {
    //     //We are nexting the number that the timer should display
    //     this.durationOfTheGame.next(this.timerForLengthOfTheGame! - time);
    //     //We then need to unsubscribe when the time hit 0 
    //     //because the timer will go -1, -2, etc
    //     if (this.durationOfTheGame.getValue() == 0) {
    //       this.timerSub?.unsubscribe();
    //     };
    //   });
    //   //If the timer of game is equal to the timer set by the user the game is now over
    //   //We pass the value the the Subject so the first function can stop looping
    //   this.timerForTheGame.subscribe(time => {
    //     if (time == this.timerForLengthOfTheGame) {
    //       this.timeIsOver.next(true);
    //     };
    //   });
    //   return;
    // };
    
    // restartGame(): void {
    //  return window.location.reload();
    // };