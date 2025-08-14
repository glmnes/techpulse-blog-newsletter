import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clean existing data
  await prisma.reaction.deleteMany()
  await prisma.bookmark.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.post.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@techpulse.example',
      name: 'Admin User',
      role: 'ADMIN',
      bio: 'Managing the tech blog and curating content.',
      image: '/avatars/admin.jpg'
    }
  })

  // Create writer users
  const writer1 = await prisma.user.create({
    data: {
      email: 'john.writer@techpulse.example',
      name: 'John Smith',
      role: 'WRITER',
      bio: 'Technology enthusiast and writer covering AI and machine learning.',
      image: '/avatars/john.jpg'
    }
  })

  const writer2 = await prisma.user.create({
    data: {
      email: 'emma.tech@techpulse.example',
      name: 'Emma Johnson',
      role: 'WRITER',
      bio: 'Software engineer writing about web development and cloud technologies.',
      image: '/avatars/emma.jpg'
    }
  })

  // Create categories
  const aiCategory = await prisma.category.create({
    data: {
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      description: 'Latest developments in AI and machine learning'
    }
  })

  const webDev = await prisma.category.create({
    data: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Modern web technologies and frameworks'
    }
  })

  const cloudTech = await prisma.category.create({
    data: {
      name: 'Cloud Computing',
      slug: 'cloud-computing',
      description: 'Cloud platforms and infrastructure'
    }
  })

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Machine Learning', slug: 'machine-learning' } }),
    prisma.tag.create({ data: { name: 'React', slug: 'react' } }),
    prisma.tag.create({ data: { name: 'Next.js', slug: 'nextjs' } }),
    prisma.tag.create({ data: { name: 'TypeScript', slug: 'typescript' } }),
    prisma.tag.create({ data: { name: 'AWS', slug: 'aws' } }),
    prisma.tag.create({ data: { name: 'Docker', slug: 'docker' } }),
    prisma.tag.create({ data: { name: 'Tutorial', slug: 'tutorial' } }),
    prisma.tag.create({ data: { name: 'Performance', slug: 'performance' } }),
    prisma.tag.create({ data: { name: 'Security', slug: 'security' } }),
    prisma.tag.create({ data: { name: 'Python', slug: 'python' } }),
    prisma.tag.create({ data: { name: 'DevOps', slug: 'devops' } }),
    prisma.tag.create({ data: { name: 'Database', slug: 'database' } })
  ])

  // Create posts
  const posts = [
    {
      slug: 'getting-started-nextjs-14',
      title: 'Getting Started with Next.js 14: Complete Guide',
      excerpt: 'Learn how to build modern web applications with Next.js 14, including new features and best practices.',
      content: `# Getting Started with Next.js 14: Complete Guide

## Introduction

Next.js 14 brings exciting new features for building fast, modern web applications. This guide will walk you through everything you need to know...

### What's New

1. **Turbopack**: Faster builds with the new Rust-based bundler
2. **Server Actions**: Simplified data mutations
3. **Partial Prerendering**: Better performance optimization

## Setup Your First Project

Let's create a new Next.js application from scratch:

### Installation Steps
- Install Node.js 18.17 or later
- Create new project with create-next-app
- Configure TypeScript and Tailwind CSS

## Key Concepts

Understanding the fundamentals is crucial for success...

### App Router
- File-based routing system
- Layout and template components
- Server and Client Components

## Building Your Application

Best practices for production-ready apps:
1. Optimize images and fonts
2. Implement proper SEO
3. Add error boundaries

## Conclusion

Next.js 14 provides everything you need to build scalable web applications. Start building today!`,
      coverImage: '/images/nextjs-guide.jpg',
      published: true,
      featured: true,
      premium: false,
      authorId: adminUser.id,
      categoryId: webDev.id,
      readingTime: '12 min read',
      viewCount: 15420,
      publishedAt: new Date('2024-01-15'),
      tags: {
        connect: [
          { slug: 'nextjs' },
          { slug: 'react' },
          { slug: 'tutorial' }
        ]
      }
    },
    {
      slug: 'aws-lambda-serverless-guide',
      title: "Building Serverless Applications with AWS Lambda",
      excerpt: 'Complete guide to building scalable serverless applications using AWS Lambda and API Gateway.',
      content: `# Building Serverless Applications with AWS Lambda

## Why Serverless?

Serverless architecture lets you focus on code without managing infrastructure. AWS Lambda is leading this revolution...

### Key Benefits
- No server management
- Automatic scaling
- Pay only for what you use
- Built-in high availability

## Getting Started

Let's build your first Lambda function:

### Prerequisites
1. AWS Account
2. AWS CLI configured
3. Node.js installed

## Creating Your Function

Step-by-step Lambda development:
- Write your function code
- Configure triggers
- Set up API Gateway
- Deploy and test

## Best Practices

Production-ready serverless applications:
- Keep functions small and focused
- Use environment variables
- Implement proper error handling
- Monitor with CloudWatch

## Cost Optimization

Tips for reducing Lambda costs:
- Optimize function memory
- Use reserved concurrency wisely
- Implement caching strategies`,
      coverImage: '/images/aws-lambda.jpg',
      published: true,
      featured: true,
      premium: false,
      authorId: writer2.id,
      categoryId: cloudTech.id,
      readingTime: '8 min read',
      viewCount: 12300,
      publishedAt: new Date('2024-02-01'),
      tags: {
        connect: [
          { slug: 'aws' },
          { slug: 'devops' },
          { slug: 'tutorial' }
        ]
      }
    },
    {
      slug: 'machine-learning-python-beginners',
      title: "Machine Learning with Python: Beginner's Guide",
      excerpt: 'Start your journey into machine learning with Python, covering essential libraries and basic algorithms.',
      content: `# Machine Learning with Python: Beginner's Guide

## Introduction to ML

Machine learning is transforming how we solve problems. Python makes it accessible to everyone...

### Essential Libraries
- NumPy for numerical computing
- Pandas for data manipulation
- Scikit-learn for ML algorithms
- TensorFlow/PyTorch for deep learning

## Your First Model

Let's build a simple classification model:

### Data Preparation
- Load and explore data
- Handle missing values
- Feature engineering
- Split training/test sets

## Common Algorithms

Understanding the basics:
1. Linear Regression
2. Decision Trees
3. Random Forests
4. Neural Networks

## Model Evaluation

Measuring success:
- Accuracy metrics
- Cross-validation
- Confusion matrices
- ROC curves

## Next Steps

Continue your ML journey with advanced topics and real-world projects!`,
      coverImage: '/images/ml-python.jpg',
      published: true,
      featured: false,
      premium: true,
      authorId: writer1.id,
      categoryId: aiCategory.id,
      readingTime: '10 min read',
      viewCount: 8900,
      publishedAt: new Date('2024-02-10'),
      tags: {
        connect: [
          { slug: 'python' },
          { slug: 'machine-learning' },
          { slug: 'tutorial' }
        ]
      }
    },
    {
      slug: 'docker-kubernetes-deployment',
      title: 'Docker to Kubernetes: Complete Deployment Guide',
      excerpt: 'Learn how to containerize applications with Docker and deploy them at scale using Kubernetes.',
      content: `# Docker to Kubernetes: Complete Deployment Guide

## Containerization Basics

Docker and Kubernetes are essential tools for modern application deployment...

### Why Containers?
- Consistent environments
- Portable applications
- Resource efficiency
- Microservices architecture

### Docker Fundamentals
- Writing Dockerfiles
- Building images
- Managing containers
- Docker Compose for multi-container apps

## Introduction to Kubernetes

Orchestrating containers at scale:

### Core Concepts
| Component | Purpose |
|-----------|----------|
| Pods | Smallest deployable units |
| Services | Network endpoints |
| Deployments | Manage replica sets |
| Ingress | External access |

## Deployment Strategy

Best practices for production:
- Rolling updates
- Health checks
- Resource limits
- Horizontal pod autoscaling

## Monitoring and Logging

Essential tools:
- Prometheus for metrics
- Grafana for visualization
- ELK stack for logs`,
      coverImage: '/images/docker-k8s.jpg',
      published: true,
      featured: false,
      premium: false,
      authorId: writer2.id,
      categoryId: cloudTech.id,
      readingTime: '15 min read',
      viewCount: 7600,
      publishedAt: new Date('2024-01-20'),
      tags: {
        connect: [
          { slug: 'docker' },
          { slug: 'devops' },
          { slug: 'tutorial' }
        ]
      }
    },
    {
      slug: 'typescript-best-practices-2024',
      title: 'TypeScript Best Practices for 2024',
      excerpt: 'Modern TypeScript patterns and practices for building maintainable applications.',
      content: `# TypeScript Best Practices for 2024

## Why TypeScript?

TypeScript adds static typing to JavaScript, catching errors before runtime...

### Key Benefits
- Type safety
- Better IDE support
- Improved refactoring
- Self-documenting code

## Essential Patterns

Modern TypeScript techniques:

### Type Safety
1. Strict mode configuration
2. Proper type inference
3. Discriminated unions
4. Type guards

## Advanced Features

Leverage TypeScript's power:
- Generic constraints
- Conditional types
- Template literal types
- Decorators

## Project Configuration

Optimal tsconfig.json settings:
- Target modern ES versions
- Enable all strict checks
- Configure path aliases
- Set up incremental builds

## Testing Strategies

Type-safe testing:
- Jest with TypeScript
- Type checking in tests
- Mocking best practices

## Migration Tips

Converting JavaScript projects:
- Gradual adoption strategy
- Using JSDoc for transition
- Handling third-party libraries`,
      coverImage: '/images/typescript.jpg',
      published: true,
      featured: false,
      premium: true,
      authorId: writer2.id,
      categoryId: webDev.id,
      readingTime: '11 min read',
      viewCount: 6200,
      publishedAt: new Date('2024-01-25'),
      tags: {
        connect: [
          { slug: 'typescript' },
          { slug: 'tutorial' },
          { slug: 'react' }
        ]
      }
    }
  ]

  // Create posts with tags
  for (const postData of posts) {
    await prisma.post.create({ data: postData })
  }

  // Create some newsletter subscriptions
  await prisma.subscription.createMany({
    data: [
      { email: 'subscriber1@example.com', status: 'ACTIVE', confirmedAt: new Date() },
      { email: 'subscriber2@example.com', status: 'ACTIVE', confirmedAt: new Date() },
      { email: 'subscriber3@example.com', status: 'PENDING' },
      { email: 'subscriber4@example.com', status: 'ACTIVE', confirmedAt: new Date() },
      { email: 'subscriber5@example.com', status: 'UNSUBSCRIBED', confirmedAt: new Date(), unsubscribedAt: new Date() }
    ]
  })

  // Create some bookmarks and reactions for the admin user
  const featuredPosts = await prisma.post.findMany({ where: { featured: true } })
  
  for (const post of featuredPosts) {
    await prisma.bookmark.create({
      data: {
        userId: adminUser.id,
        postId: post.id
      }
    })

    await prisma.reaction.create({
      data: {
        type: 'MINDBLOWN',
        userId: adminUser.id,
        postId: post.id
      }
    })
  }

  console.log('✅ Seed completed successfully!')
  console.log(`Created:
  - ${await prisma.user.count()} users
  - ${await prisma.category.count()} categories
  - ${await prisma.tag.count()} tags
  - ${await prisma.post.count()} posts
  - ${await prisma.subscription.count()} subscriptions
  - ${await prisma.bookmark.count()} bookmarks
  - ${await prisma.reaction.count()} reactions`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
