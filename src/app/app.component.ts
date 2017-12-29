import { Component } from '@angular/core';
import { Rect } from './shared/model/service/rect';
import { Text } from './shared/model/service/text';
import { Service } from './shared/service';
import {Observable} from 'rxjs/Observable';
import { Diagram } from './shared/model/service/diagram';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  private methods: Array<Rect> = [];
  private texts: Array<Text> = [];
  private choose: Array<Rect> = [];

  constructor(private service: Service) {
    this.update();
  }

  private update() {
    this.setView([]);
  }

  public getHeight(): number {
    return  this.methods.length * 15 + 100;
  }

  public getWidth(): number {
    return (this.methods[this.methods.length - 2]).x + 2000;
  }

  toggle(event: Event, rect: Rect) {
    event.preventDefault();
    const isContain = this.choose.find( res => res.id === rect.id );
    if (isContain) {
      this.choose.filter(res => res.id === rect.id)
                 .map(() => {
                   const removed = this.choose.filter(item => item.id !== rect.id );
                   this.choose = removed;
                   this.setView(removed);
                 });
      } else {
      this.choose.push(rect);
      this.setView(this.choose);
    }
  }

  private setView(filter: Rect[]) {
    this.service.getWithParameter(filter).subscribe( diagram => {
        this.methods = diagram.methods;
        this.texts = diagram.texts;
      }
    );
  }
}
