import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // hero$: Observable<Hero>;
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) { }

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.getHero(params.get('id'))
      )
      )
    //HeroDetailComponent의 인스턴스가 절대로 재사용되지 않는다면 스냅샷(snapshot)을 사용하는 것이 더 간단합니다.
    // let id = this.route.snapshot.paramMap.get('id');//옵져버블인 route(ActivatedRoute)를 snapshot하면 옵져버블 아님!!
    // this.hero$ = this.service.getHero(id);
  }

  gotoHeroes(hero: Hero) {
    // this.router.navigate(['/heroes']);
    
    // 옵션 라우팅 변수를 넘기고 싶을 경우
    let heroId = hero ? hero.id : null;
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}
