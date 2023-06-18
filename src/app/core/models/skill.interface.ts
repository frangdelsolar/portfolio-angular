import { Category } from './category.interface';
import { Tag } from './tag.interface';

export interface Skill {
  id?: string | null;
  category: Category;
  tags: Tag[];
  name: string;
  description: string;
  level: number;
}
