const data = {
    // User Table
    users: [
      {
        userID: "1",
        nameFirst: "John",
        nameLast: "Doe",
        displayName: "johndoe",
        email: "johndoe@example.com",
        phone: 1234567890,
        address: "123 Main St, Springfield",
        dob: "1990-01-01",
        bio: "Software engineer passionate about web development.",
        profPicUrl: "http://example.com/profile1.jpg"
      },
      {
        userID: "2",
        nameFirst: "Jane",
        nameLast: "Smith",
        displayName: "janesmith",
        email: "janesmith@example.com",
        phone: 2345678901,
        address: "456 Elm St, Springfield",
        dob: "1992-02-02",
        bio: "Designer and photographer.",
        profPicUrl: "http://example.com/profile2.jpg"
      },
      {
        userID: "3",
        nameFirst: "Alice",
        nameLast: "Johnson",
        displayName: "alicejohnson",
        email: "alicejohnson@example.com",
        phone: 3456789012,
        address: "789 Oak St, Springfield",
        dob: "1995-03-03",
        bio: "Content creator and digital artist.",
        profPicUrl: "http://example.com/profile3.jpg"
      },
      {
        userID: "4",
        nameFirst: "Bob",
        nameLast: "Lee",
        displayName: "boblee",
        email: "boblee@example.com",
        phone: 4567890123,
        address: "123 Pine St, Springfield",
        dob: "1987-04-04",
        bio: "Project manager with a love for photography.",
        profPicUrl: "http://example.com/profile4.jpg"
      },
      {
        userID: "5",
        nameFirst: "Charlie",
        nameLast: "Brown",
        displayName: "charliebrown",
        email: "charliebrown@example.com",
        phone: 5678901234,
        address: "321 Maple St, Springfield",
        dob: "1985-05-05",
        bio: "Musician and software developer.",
        profPicUrl: "http://example.com/profile5.jpg"
      }
    ],
  
    // Request Table
    requests: [
      {
        requestID: "1",
        categoryID: 1,
        title: "Need a website for my business",
        requestedBy: "John Doe",
        datePosted: "2024-10-01",
        brief: "A modern and responsive website for my small business.",
        desc: "I am looking for a web developer to create a site for my new business. The website should have a homepage, about us page, contact form, and service listings.",
        postLenMin: 30,
        postLenMax: 60,
        likes: 15
      },
      {
        requestID: "2",
        categoryID: 2,
        title: "Create a logo design",
        requestedBy: "Jane Smith",
        datePosted: "2024-10-02",
        brief: "A simple yet impactful logo for a new brand.",
        desc: "I need a logo designed for my new brand that will appeal to a young audience. The logo should be minimalistic with a modern feel.",
        postLenMin: 20,
        postLenMax: 40,
        likes: 12
      },
      {
        requestID: "3",
        categoryID: 3,
        title: "Video production for a product launch",
        requestedBy: "Alice Johnson",
        datePosted: "2024-10-03",
        brief: "A promotional video showcasing our new product.",
        desc: "We need a video that highlights the features and benefits of our new product for our upcoming launch. The video should be high-quality and engaging.",
        postLenMin: 60,
        postLenMax: 120,
        likes: 25
      },
      {
        requestID: "4",
        categoryID: 1,
        title: "Build an e-commerce website",
        requestedBy: "Bob Lee",
        datePosted: "2024-10-04",
        brief: "An e-commerce website for my online store.",
        desc: "I am looking for a developer to create an e-commerce site that integrates with Stripe for payments. The site should have product pages, a shopping cart, and checkout functionality.",
        postLenMin: 60,
        postLenMax: 180,
        likes: 18
      },
      {
        requestID: "5",
        categoryID: 2,
        title: "Social media marketing strategy",
        requestedBy: "Charlie Brown",
        datePosted: "2024-10-05",
        brief: "Help me build a social media strategy for my brand.",
        desc: "I need a strategy for increasing my brand's presence on Instagram, Facebook, and Twitter. The plan should include content ideas, posting schedules, and audience engagement tactics.",
        postLenMin: 45,
        postLenMax: 90,
        likes: 10
      }
    ],
  
    // Scene Table
    scenes: [
      {
        sceneID: "1",
        requestID: "1",
        createdByID: "2",
        sceneURL: "http://example.com/scene1.mp4",
        thumbnailURL: "http://example.com/scene1_thumb.jpg",
        dateSubmitted: "2024-10-02",
        status: "Approved",
        duration: 120,
        resolution: "1080p"
      },
      {
        sceneID: "2",
        requestID: "2",
        createdByID: "3",
        sceneURL: "http://example.com/scene2.mp4",
        thumbnailURL: "http://example.com/scene2_thumb.jpg",
        dateSubmitted: "2024-10-03",
        status: "Pending",
        duration: 90,
        resolution: "720p"
      },
      {
        sceneID: "3",
        requestID: "3",
        createdByID: "4",
        sceneURL: "http://example.com/scene3.mp4",
        thumbnailURL: "http://example.com/scene3_thumb.jpg",
        dateSubmitted: "2024-10-04",
        status: "Approved",
        duration: 150,
        resolution: "4K"
      },
      {
        sceneID: "4",
        requestID: "4",
        createdByID: "5",
        sceneURL: "http://example.com/scene4.mp4",
        thumbnailURL: "http://example.com/scene4_thumb.jpg",
        dateSubmitted: "2024-10-05",
        status: "Rejected",
        duration: 60,
        resolution: "1080p"
      },
      {
        sceneID: "5",
        requestID: "5",
        createdByID: "2",
        sceneURL: "http://example.com/scene5.mp4",
        thumbnailURL: "http://example.com/scene5_thumb.jpg",
        dateSubmitted: "2024-10-06",
        status: "Approved",
        duration: 80,
        resolution: "1080p"
      }
    ],
  
    // Transaction Table
    transactions: [
      {
        transactionID: "1",
        value: 500,
        paymentDate: "2024-10-01",
        paidByID: "1",
        paidToID: "2"
      },
      {
        transactionID: "2",
        value: 200,
        paymentDate: "2024-10-02",
        paidByID: "3",
        paidToID: "4"
      },
      {
        transactionID: "3",
        value: 300,
        paymentDate: "2024-10-03",
        paidByID: "4",
        paidToID: "5"
      },
      {
        transactionID: "4",
        value: 100,
        paymentDate: "2024-10-04",
        paidByID: "5",
        paidToID: "1"
      },
      {
        transactionID: "5",
        value: 400,
        paymentDate: "2024-10-05",
        paidByID: "2",
        paidToID: "3"
      }
    ],
  
    // Requirement Table
    requirements: [
      {
        requirementID: "1",
        requestID: "1",
        type: "Duration",
        value: "30-60 minutes"
      },
      {
        requirementID: "2",
        requestID: "2",
        type: "Style",
        value: "Minimalistic"
      },
      {
        requirementID: "3",
        requestID: "3",
        type: "Resolution",
        value: "4K"
      },
      {
        requirementID: "4",
        requestID: "4",
        type: "Payment Integration",
        value: "Stripe"
      },
      {
        requirementID: "5",
        requestID: "5",
        type: "Platform",
        value: "Instagram, Facebook, Twitter"
      }
    ],
  
    // Comment Table
    comments: [
      {
        commentID: "1",
        requestID: "1",
        userID: "3",
        datePosted: "2024-10-02",
        value: "This looks like a great project! I'd love to help.",
        likes: 3
      },
      {
        commentID: "2",
        requestID: "2",
        userID: "4",
        datePosted: "2024-10-03",
        value: "I can create a logo design for you. Let's discuss details.",
        likes: 2
      },
      {
        commentID: "3",
        requestID: "3",
        userID: "5",
        datePosted: "2024-10-04",
        value: "This sounds exciting! Let me know how I can assist.",
        likes: 5
      },
      {
        commentID: "4",
        requestID: "4",
        userID: "2",
        datePosted: "2024-10-05",
        value: "I am available to build the e-commerce site. Let's connect.",
        likes: 4
      },
      {
        commentID: "5",
        requestID: "5",
        userID: "1",
        datePosted: "2024-10-06",
        value: "I'd love to help with the social media strategy.",
        likes: 6
      }
    ],
  
    // Notification Table
    notifications: [
      {
        notificationID: "1",
        userID: "1",
        relatedItemID: "1",
        isRead: false,
        dateCreated: "2024-10-02",
        relatedItemType: "New comment on your request"
      },
      {
        notificationID: "2",
        userID: "2",
        relatedItemID: "2",
        isRead: true,
        dateCreated: "2024-10-03",
        type: "New comment on your request"
      },
      {
        notificationID: "3",
        userID: "3",
        relatedItemID: "3",
        isRead: false,
        dateCreated: "2024-10-04",
        type: "New request posted"
      },
      {
        notificationID: "4",
        userID: "4",
        relatedItemID: "4",
        isRead: true,
        dateCreated: "2024-10-05",
        type: "New request posted"
      },
      {
        notificationID: "5",
        userID: "5",
        relatedItemID: "5",
        isRead: false,
        dateCreated: "2024-10-06",
        type: "New comment on your request"
      }
    ],
  
    // Category Table
    categories: [
      {
        categoryID: "1",
        value: "Web Development"
      },
      {
        categoryID: "2",
        value: "Design"
      },
      {
        categoryID: "3",
        value: "Video Production"
      },
      {
        categoryID: "4",
        value: "E-commerce"
      },
      {
        categoryID: "5",
        value: "Social Media"
      }
    ],
  
    // Tag Table
    tags: [
      {
        tagID: "1",
        value: "Website"
      },
      {
        tagID: "2",
        value: "Logo"
      },
      {
        tagID: "3",
        value: "Product Launch"
      },
      {
        tagID: "4",
        value: "E-commerce"
      },
      {
        tagID: "5",
        value: "Marketing"
      }
    ]
  };
  
  module.exports = data;
  