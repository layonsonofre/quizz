import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Subject, SubscriptionLike, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[appCountdown]'
})
export class CountdownDirective implements OnChanges, OnDestroy {
  private counter = new Subject<any>();
  private sub: SubscriptionLike;

  @Input() deadline: number;
  @Input() interval: number = 1000;
  @Output() value = new EventEmitter<number>();

  constructor() {
    this.sub = this.counter.pipe(
      switchMap((options: any) =>
        timer(0, options.interval).pipe(
          take(options.count),
          tap(() => this.value.emit(--options.count))
        )
      )
    ).subscribe();
  }

  ngOnChanges() {
    this.counter.next({ count: this.deadline, interval: this.interval });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
