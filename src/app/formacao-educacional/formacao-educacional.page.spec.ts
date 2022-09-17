import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormacaoEducacionalPage } from './formacao-educacional.page';

describe('FormacaoEducacionalPage', () => {
  let component: FormacaoEducacionalPage;
  let fixture: ComponentFixture<FormacaoEducacionalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormacaoEducacionalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormacaoEducacionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
