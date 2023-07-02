import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDropdownComponent } from './category-dropdown.component';
import { CategoryService } from '@app/core/controllers/category.controller';
import { of } from 'rxjs';
import { Category } from '@app/core/models/category.interface';
import { ToastService } from '@app/core/services/toast.service';

const mockCategories = [
  {
    id: 2,
    name: 'Mental Health',
    description: '',
    color: 'red',
    icon: 'fa-hospital',
    date_created: '2023-05-26T16:03:35.638194',
    date_updated: '2023-05-26T16:03:35.638207',
    created_by: 1,
  },
  {
    id: 3,
    name: 'Others',
    description: '',
    color: 'violet',
    icon: null,
    date_created: '2023-05-26T16:03:48.347601',
    date_updated: '2023-05-26T16:03:48.347613',
    created_by: 1,
  },
  {
    id: 4,
    name: 'Education',
    description:
      'The education industry includes institutions and organizations that provide formal and informal learning opportunities, such as schools, universities, training centers, and online learning platforms.',
    color: 'blue',
    icon: null,
    date_created: '2023-05-26T16:04:06.605990',
    date_updated: '2023-05-26T16:04:06.606006',
    created_by: 1,
  },
  {
    id: 5,
    name: 'Hospitality',
    description:
      'Encompasses businesses that provide services related to travel, accommodation, food and beverage, and entertainment for customers.',
    color: 'red',
    icon: null,
    date_created: '2023-05-26T16:04:22.136791',
    date_updated: '2023-05-26T16:04:22.136802',
    created_by: 1,
  },
  {
    id: 1,
    name: 'IT',
    description:
      'The IT industry comprises companies that develop, manufacture, and provide technology products, services, and solutions, including hardware, software, telecommunications, and digital services.',
    color: 'orange',
    icon: null,
    date_created: '2023-05-26T15:35:50.108118',
    date_updated: '2023-05-26T17:19:15.714736',
    created_by: 1,
  },
];

const categoryMockSvc = {
  get: () => {},
};

const toastSvcMock = {
  success: () => {},
  error: () => {},
};
describe('CategoryDropdownComponent', () => {
  let component: CategoryDropdownComponent;
  let fixture: ComponentFixture<CategoryDropdownComponent>;
  let categorySvc: CategoryService;
  let toastSvc: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryDropdownComponent],
      providers: [
        { provide: CategoryService, useValue: categoryMockSvc },
        {
          provide: ToastService,
          useValue: jasmine.createSpyObj('ToastService', ['add']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDropdownComponent);
    component = fixture.componentInstance;
    categorySvc = TestBed.inject(CategoryService);
    toastSvc = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    spyOn(categorySvc, 'get').and.returnValue(of(mockCategories));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate items with categories on initialization', () => {
    expect(component.items.length).toBe(5); // Assuming there are 5 mock categories
  });

  it('should set the selected category based on the control value', () => {
    const selectedCategory = component.items[0];
    component.control.setValue(selectedCategory);
    fixture.detectChanges();
    expect(component.control.value).toEqual(selectedCategory);
  });

  it('should toggle addCategoryModeOn when onAddCategoryClick is called', () => {
    const initialValue = component.addCategoryModeOn;
    component.onAddCategoryClick();
    expect(component.addCategoryModeOn).toBe(!initialValue);
  });

  it('should add a category to items and display success toast when onAddCategorySave is called', () => {
    const category: Category = {
      id: 6,
      name: 'New Category',
      description: '',
      color: 'green',
      icon: '',
    };

    component.onAddCategorySave(category);

    expect(component.items.length).toBe(6);
    expect(component.items[5].name).toBe('New Category');

    expect(toastSvc.add).toHaveBeenCalled();
  });
});
