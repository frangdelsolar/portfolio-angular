import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostPreviewComponent } from './post-preview.component';

describe('PostPreviewComponent', () => {
  let component: PostPreviewComponent;
  let fixture: ComponentFixture<PostPreviewComponent>;

  const mockItem = {
    id: 1,
    title: 'Search Algorithms: BFS, A* and DFS',
    preview:
      'This article delves into the world of search algorithms, focusing on three widely used algorithms: Breadth-First Search (BFS), Depth-First Search (DFS), and A* search algorithm. Each algorithm is explained in detail, along with its strengths and weaknesses. BFS guarantees the shortest path to the goal node in an unweighted graph, but can be memory-intensive. DFS, on the other hand, uses less memory than BFS, but does not guarantee the shortest path to the goal node, and can get stuck in an infinite loop. A* search algorithm combines the best of both algorithms and is faster than both. It also guarantees the shortest path to the goal node in a weighted graph. This article is a must-read for anyone interested in understanding search algorithms and their applications.',
    image: {
      name: 'bfs',
      description: '',
      image_url: 'http://localhost:8000/media/images/bfs.jpeg',
      thumbnail_url: 'http://localhost:8000/media/thumbnails/bfs_thumbnail.jpg',
    },
    content:
      '<p>Search algorithms are used to find a solution to a problem by exploring a graph or a tree. In computer science, there are several search algorithms, including Breadth-First Search (BFS), Depth-First Search (DFS), and A* search algorithm. In this article, we will discuss each algorithm in detail and compare their strengths and weaknesses.</p>\r\n<h3>Breadth-First Search (BFS)</h3>\r\n<p>Breadth-First Search is a graph traversal algorithm that explores all the nodes at the current depth before moving on to the next level. BFS starts at the root node and visits all its neighbors before visiting the neighbors of its neighbors. This process continues until all nodes have been visited.</p>\r\n<p>One of the main advantages of BFS is that it guarantees the shortest path to the goal node in an unweighted graph. This is because it explores all the nodes at each level before moving on to the next level. However, BFS can be memory-intensive in large graphs as it needs to keep track of all the nodes it has visited.</p>\r\n<h3>Depth-First Search (DFS)</h3>\r\n<p>Depth-First Search is another graph traversal algorithm that explores the graph by visiting one node and then recursively visiting its neighbors. Unlike BFS, DFS explores the depth of a graph first before moving on to the next level. DFS starts at the root node and explores as far as possible along each branch before backtracking.</p>\r\n<p>One of the main advantages of DFS is that it uses less memory than BFS, as it only needs to keep track of the nodes on the current path. DFS is also useful in finding solutions to problems that have many solutions, as it can explore all possible solutions.</p>\r\n<p>However, DFS does not guarantee the shortest path to the goal node, as it may explore a path that leads away from the goal node before backtracking. It is also possible for DFS to get stuck in an infinite loop if it encounters a cycle in the graph.</p>\r\n<h3>A* Search Algorithm</h3>\r\n<p>A* search algorithm is a heuristic search algorithm that combines the advantages of BFS and DFS. It uses an evaluation function to estimate the distance between the current node and the goal node. A* search algorithm considers both the cost of reaching the current node and the estimated cost to reach the goal node. The algorithm chooses the node with the lowest cost to explore next.</p>\r\n<p>One of the main advantages of A* search algorithm is that it is faster than BFS and DFS, as it uses heuristics to guide the search. A* search algorithm also guarantees the shortest path to the goal node in a weighted graph. However, A* search algorithm is not guaranteed to find the shortest path in an unweighted graph.</p>\r\n<h3>Comparison of the Algorithms</h3>\r\n<p>BFS, DFS, and A* search algorithm have their strengths and weaknesses. BFS is useful in finding the shortest path to the goal node in an unweighted graph, but it can be memory-intensive. DFS uses less memory than BFS, but it does not guarantee the shortest path to the goal node, and it can get stuck in an infinite loop.</p>\r\n<p>A* search algorithm combines the advantages of BFS and DFS and is faster than both algorithms. It also guarantees the shortest path to the goal node in a weighted graph. However, it is not guaranteed to find the shortest path in an unweighted graph.</p>\r\n<h3>Conclusion</h3>\r\n<p>In conclusion, BFS, DFS, and A* search algorithm are important search algorithms used in computer science.',
    date_posted: '2023-05-26T16:57:44.827102',
    date_updated: '2023-05-26T16:57:44.827114',
    author: 1,
    category: {
      id: 1,
      name: 'IT',
      description:
        'The IT industry comprises companies that develop, manufacture, and provide technology products, services, and solutions, including hardware, software, telecommunications, and digital services.',
      color: 'orange',
      icon: 'null',
      date_created: '2023-05-26T15:35:50.108118',
      date_updated: '2023-05-26T17:19:15.714736',
      created_by: 1,
    },
    tags: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostPreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPreviewComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
