import { Category } from './category.interface';
import { Image } from './image.interface';
import { Tag } from './tag.interface';

export interface Post {
  id?: any;
  image: Image;
  category: Category;
  tags: Tag[];
  title: string;
  preview: string;
  date_posted: string;
  date_updated?: string;
  author?: any;
  content: string;
}
