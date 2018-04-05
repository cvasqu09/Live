import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMessageServiceComponent } from './test-message-service.component';

describe('TestMessageServiceComponent', () => {
  let component: TestMessageServiceComponent;
  let fixture: ComponentFixture<TestMessageServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMessageServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMessageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
