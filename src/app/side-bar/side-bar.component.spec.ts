import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SideBarComponent } from './side-bar.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {
    it('should have a title', () => {
      expect(component.title).toBe('Dashboard');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(title.innerHTML).toBe('Dashboard');
    });

    it('should have All Allocations Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#all_allocations');
      expect(btn.innerHTML).toBe('All Allocations');
    });

    it('should have Items Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#items');
      expect(btn.innerHTML).toBe('Items');
    });

    it('should have Projects Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#projects');
      expect(btn.innerHTML).toBe('Projects');
    });

    /*it('should navigate', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');

      component.showAllocations();
      expect(navigateSpy).toHaveBeenCalledWith(['/allocation']);
    });
    
    it('should navigate', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');

      component.showItems();
      expect(navigateSpy).toHaveBeenCalledWith(['/items']);
    });

    it('should navigate', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');

      component.showProjects();
      expect(navigateSpy).toHaveBeenCalledWith(['/projects']);
    });*/

  });
});
