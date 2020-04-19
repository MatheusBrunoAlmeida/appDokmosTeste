import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TesteMapaComponent } from './teste-mapa.component';

describe('TesteMapaComponent', () => {
  let component: TesteMapaComponent;
  let fixture: ComponentFixture<TesteMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteMapaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TesteMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
