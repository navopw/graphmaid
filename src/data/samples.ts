export interface Sample {
  id: string;
  name: string;
  description: string;
  code: string;
  category: string;
}

export const sampleDiagrams: Sample[] = [
  {
    id: 'flowchart',
    name: 'Flowchart',
    description: 'Process flow diagram',
    category: 'Basic',
    code: `flowchart TD
    A[Start] --> B{Decision?}
    B -->|Yes| C[Process 1]
    B -->|No| D[Process 2]
    C --> E[End]
    D --> E
    style A fill:#a855f7,stroke:#00f5ff,color:#fff
    style E fill:#10b981,stroke:#00f5ff,color:#fff`,
  },
  {
    id: 'sequence',
    name: 'Sequence Diagram',
    description: 'Interaction between actors',
    category: 'Basic',
    code: `sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Login Request
    Frontend->>Backend: POST /auth/login
    Backend->>Database: Query User
    Database-->>Backend: User Data
    Backend-->>Frontend: JWT Token
    Frontend-->>User: Login Success`,
  },
  {
    id: 'state',
    name: 'State Diagram',
    description: 'State machine flow',
    category: 'Basic',
    code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Start
    Processing --> Success: Complete
    Processing --> Error: Fail
    Error --> Idle: Retry
    Success --> [*]
    
    note right of Processing
      Async operation
      in progress
    end note`,
  },
  {
    id: 'class',
    name: 'Class Diagram',
    description: 'Object oriented structure',
    category: 'Advanced',
    code: `classDiagram
    class User {
      +id: int
      +name: string
      +email: string
      +login(): void
      +logout(): void
    }
    
    class Order {
      +id: int
      +total: float
      +status: string
      +calculateTotal(): float
    }
    
    User "1" --> "*" Order : places`,
  },
  {
    id: 'er',
    name: 'Entity Relationship',
    description: 'Database schema',
    category: 'Advanced',
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "ordered in"
    
    CUSTOMER {
      int customer_id PK
      string name
      string email
    }
    
    ORDER {
      int order_id PK
      date order_date
      string status
    }
    
    PRODUCT {
      int product_id PK
      string name
      decimal price
    }
    
    LINE_ITEM {
      int line_item_id PK
      int quantity
      decimal unit_price
    }`,
  },
  {
    id: 'gantt',
    name: 'Gantt Chart',
    description: 'Project timeline',
    category: 'Advanced',
    code: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Research       :done,    des1, 2024-01-01, 2024-01-10
    Design         :active,  des2, 2024-01-11, 7d
    section Development
    Frontend       :         dev1, after des2, 14d
    Backend        :         dev2, after des2, 14d
    section Deployment
    Testing        :         test, after dev1, 7d
    Launch         :crit,    launch, after test, 2024-02-28`,
  },
  {
    id: 'pie',
    name: 'Pie Chart',
    description: 'Data distribution',
    category: 'Chart',
    code: `pie showData
    title Budget Distribution
    "Development" : 45
    "Marketing" : 25
    "Operations" : 20
    "Legal" : 10`,
  },
  {
    id: 'git',
    name: 'Git Graph',
    description: 'Version control flow',
    category: 'Chart',
    code: `gitGraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Feature A"
    checkout main
    merge develop tag: "v1.0"
    branch hotfix
    commit id: "Fix bug"
    checkout main
    merge hotfix tag: "v1.1"`,
  },
  {
    id: 'mindmap',
    name: 'Mind Map',
    description: 'Hierarchical ideas',
    category: 'Chart',
    code: `mindmap
  root((Project))
    Frontend
      React
      TypeScript
      Tailwind
    Backend
      API
      Database
      Auth
    DevOps
      CI/CD
      Monitoring`,
  },
  {
    id: 'architecture',
    name: 'System Architecture',
    description: 'High level design',
    category: 'Advanced',
    code: `graph TB
    subgraph Client["Frontend Layer"]
        A[React App]
    end
    
    subgraph API["API Gateway"]
        B[REST API]
        C[GraphQL]
    end
    
    subgraph Services["Microservices"]
        D[Auth Service]
        E[User Service]
        F[Order Service]
    end
    
    subgraph Data["Data Layer"]
        G[(PostgreSQL)]
        H[(Redis)]
        I[(S3)]
    end
    
    A --> B
    A --> C
    B --> D
    C --> E
    C --> F
    D --> G
    E --> G
    F --> G
    D --> H
    E --> H
    F --> I
    
    style Client fill:#a855f733,stroke:#a855f7,stroke-width:2px
    style API fill:#00f5ff33,stroke:#00f5ff,stroke-width:2px
    style Services fill:#10b98133,stroke:#10b981,stroke-width:2px
    style Data fill:#f9731633,stroke:#f97316,stroke-width:2px`,
  },
];
