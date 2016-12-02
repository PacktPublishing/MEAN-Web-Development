import { Component }   from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({ 
  template: 
  `<ul>
    <li *ngIf="shouldShow" name="One">1</li>
    <li *ngIf="!shouldShow" name="Two">2</li>
  </ul>`
})
class TestComponent {  
  shouldShow = true
}

describe('ngIf tests', () => {
  let componentFixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    componentFixture = TestBed.configureTestingModule({
      declarations: [TestComponent]
    }).createComponent(TestComponent);
  });  

  it('It should render the list properly', () => {
    componentFixture.detectChanges(); 

    let listItems = componentFixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].attributes['name']).toBe('One');
  });


  it('It should rerender the list properly', () => {
    componentFixture.componentInstance.shouldShow = false;
    componentFixture.detectChanges();

    let listItems = componentFixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].attributes['name']).toBe('Two');
  });
});