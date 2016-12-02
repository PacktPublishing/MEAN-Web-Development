import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';
import { Location } from '@angular/common';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

let location: SpyLocation;

describe('AppComponent Routing', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, RouterTestingModule ]
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    const injector = TestBed.createComponent(AppComponent).debugElement.injector;
    location = injector.get(Location);
  }));

  it('Should navigate to home', fakeAsync(() => {
    location.go('/');
    expect(location.path()).toEqual('/');
  }));

  it('Should navigate to signin', fakeAsync(() => {
    location.go('/authentication/signin');
    expect(location.path()).toEqual('/authentication/signin');
  }));

  it('Should navigate to signup', fakeAsync(() => {
    location.go('/authentication/signup');
    expect(location.path()).toEqual('/authentication/signup');
  }));
});