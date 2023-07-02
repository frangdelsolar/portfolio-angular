import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostListComponent } from './post-list.component';
import { PostService } from '@app/core/controllers/post.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { PostItemComponent } from '../post-item/post-item.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-preview',
  template: '',
})
class MockPostPreviewComponent {
  @Input() item: any;
}

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let dialogService: jasmine.SpyObj<AppDialogService>;

  const mockPosts = [
    {
      id: '1',
      title: 'Post 1',
      preview: 'This is the preview for post 1.',
      image: {
        name: 'image1',
        description: '',
        image_url: 'http://localhost:8000/media/images/image1.jpg',
        thumbnail_url:
          'http://localhost:8000/media/thumbnails/image1_thumbnail.jpg',
      },
      content: 'This is the content of post 1.',
      date_posted: '2023-06-01T10:00:00.000Z',
      date_updated: '2023-06-01T11:30:00.000Z',
      author: 1,
      category: {
        id: 1,
        name: 'Category 1',
        description: 'This is category 1.',
        color: 'blue',
        icon: 'category1-icon',
        date_created: '2023-06-01T08:00:00.000Z',
        date_updated: '2023-06-01T08:30:00.000Z',
        created_by: 1,
      },
      tags: [
        {
          id: 1,
          name: 'Tag 1',
          description: 'This is tag 1.',
          color: 'red',
          icon: 'tag1-icon',
        },
        {
          id: 2,
          name: 'Tag 2',
          description: 'This is tag 2.',
          color: 'green',
          icon: 'tag2-icon',
        },
      ],
    },
    {
      id: '2',
      title: 'Post 2',
      preview: 'This is the preview for post 2.',
      image: {
        name: 'image2',
        description: '',
        image_url: 'http://localhost:8000/media/images/image2.jpg',
        thumbnail_url:
          'http://localhost:8000/media/thumbnails/image2_thumbnail.jpg',
      },
      content: 'This is the content of post 2.',
      date_posted: '2023-06-02T09:00:00.000Z',
      date_updated: '2023-06-02T10:30:00.000Z',
      author: 2,
      category: {
        id: 2,
        name: 'Category 2',
        description: 'This is category 2.',
        color: 'yellow',
        icon: 'category2-icon',
        date_created: '2023-06-02T07:00:00.000Z',
        date_updated: '2023-06-02T07:30:00.000Z',
        created_by: 2,
      },
      tags: [
        {
          id: 3,
          name: 'Tag 3',
          description: 'This is tag 3.',
          color: 'blue',
          icon: 'tag3-icon',
        },
      ],
    },
    {
      id: '3',
      title: 'Post 3',
      preview: 'This is the preview for post 3.',
      image: {
        name: 'image3',
        description: '',
        image_url: 'http://localhost:8000/media/images/image3.jpg',
        thumbnail_url:
          'http://localhost:8000/media/thumbnails/image3_thumbnail.jpg',
      },
      content: 'This is the content of post 3.',
      date_posted: '2023-06-03T08:00:00.000Z',
      date_updated: '2023-06-03T09:30:00.000Z',
      author: 3,
      category: {
        id: 3,
        name: 'Category 3',
        description: 'This is category 3.',
        color: 'green',
        icon: 'category3-icon',
        date_created: '2023-06-03T06:00:00.000Z',
        date_updated: '2023-06-03T06:30:00.000Z',
        created_by: 3,
      },
      tags: [
        {
          id: 4,
          name: 'Tag 4',
          description: 'This is tag 4.',
          color: 'purple',
          icon: 'tag4-icon',
        },
        {
          id: 5,
          name: 'Tag 5',
          description: 'This is tag 5.',
          color: 'orange',
          icon: 'tag5-icon',
        },
      ],
    },
  ];

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['get']);
    const dialogServiceSpy = jasmine.createSpyObj('AppDialogService', ['show']);

    TestBed.configureTestingModule({
      declarations: [PostListComponent, MockPostPreviewComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: AppDialogService, useValue: dialogServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    dialogService = TestBed.inject(
      AppDialogService
    ) as jasmine.SpyObj<AppDialogService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on component initialization', () => {
    postService.get.and.returnValue(of(mockPosts));

    fixture.detectChanges();

    expect(postService.get).toHaveBeenCalled();
    expect(component.items).toEqual(mockPosts);
  });

  it('should open the dialog with the selected post item', () => {
    const mockPost = mockPosts[0];
    postService.get.and.returnValue(of(mockPosts));

    fixture.detectChanges();

    component.open(mockPost);

    expect(dialogService.show).toHaveBeenCalledWith({
      component: PostItemComponent,
      data: { item: mockPost },
      params: {
        header: '',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      },
    });
  });
});
