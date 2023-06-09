import { Category } from './category.interface';
import { Image } from './image.interface';
import { Tag } from './tag.interface';

export interface Work {
  id?: any;
  image: Image;
  category: Category;
  tags: Tag[];
  title: string;
  project: string;
  client: string;
  start_date: string;
  end_date?: string;
  repository?: string;
  url?: string;
  content: string;
  preview: string;
  date_posted: string;
  date_updated?: string;
  author?: any;
}
