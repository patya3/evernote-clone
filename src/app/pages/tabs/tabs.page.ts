import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  ModalController,
  IonRouterOutlet,
  AnimationController,
  GestureController
} from '@ionic/angular';
import { NotePage } from '../note/note.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) /* private animationCtrl: AnimationController,
    private gestureCtrl: GestureController,
    private renderer: Renderer2 */
  {}

  ngOnInit() {}

  async startNote() {
    /* const enterAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .beforeStyles({ opacity: 1 })
        .addElement(baseEl.querySelector('.modal-wrapper')!)
        .fromTo('transform', 'translateY(100%)', 'translateY(0%)');

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    }; */

    const modal = await this.modalCtrl.create({
      component: NotePage,
      mode: 'ios',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
      /* cssClass: 'swipe-modal',
      leaveAnimation,
      enterAnimation */
    });
    modal.present();

    // modal gesture
    /* const gesture = await this.gestureCtrl.create({
      el: modal,
      gestureName: 'swipe-to-close-modal',
      gesturePriority: 100,
      threshold: 5,
      passive: false,
      onStart: () => {
        this.renderer.setStyle(modal, 'transform', 'none');
      },
      onMove: event => {
        this.renderer.setStyle(
          modal,
          'transform',
          `translateY(${event.deltaY}px)`
        );
      },
      onEnd: event => {
        console.log('ending', event);
      }
    });
    gesture.enable(); */
  }
}
