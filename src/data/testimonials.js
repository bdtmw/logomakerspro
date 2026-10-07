// Client reviews. Optional fields for reviews copied from a review platform (copy the text exactly, never edit
// it): rating (1-5), source ('Trustpilot', 'Google', 'Facebook'...), date ('YYYY-MM-DD') and url (link to the review).
// Service pages show them as cards with stars and a "via <platform>" link; entries without these show as before.
// Only 5-star reviews are displayed (TestimonialGrid filters the rest). These three are the site's own testimonials
// (home page slider); reviews from platforms go in platformReviews below.
export const testimonials = [
  {
    "quote": "In the beginning the procedure sounded very lengthy and costly, but Jay guided me through each step with great clarity and offered additional discounts. This made the two main aspects much more manageable. Thank you, team!",
    "name": "Monica"
  },
  {
    "quote": "Working with Logo Makers Pro was an excellent experience. The team is exceptionally professional and incredibly friendly. I would definitely recommend their services to all new businesses, as they provided valuable tips to enhance my online presence.",
    "name": "Amy Gill"
  },
  {
    "quote": "Jay and his exceptional team are truly remarkable individuals. They are genuine experts in their field. Jay assisted me every step of the way during the process. I am extremely satisfied with the outcome of their work on my logo.",
    "name": "Stefan Fernandes"
  }
];

// 5-star reviews from Trustpilot (https://www.trustpilot.com/review/logomakerspro.com), copied exactly as written,
// typos included, on 2026-10-07. Never edit the text; add new ones the same way, newest first.
// featured: shown first in the review grid. topics: industry/service slugs a review is about (shown first there).
// hero: 'logo' / 'general' picks the quote under the service page hero form.
export const platformReviews = [
  {
    "quote": "David did a great job on my logo, he responded promptly and made the desired changes to get it right where I wanted it to be.",
    "name": "Joshua McAdams",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2026-08-25",
    "url": "https://www.trustpilot.com/reviews/6a8c86f461a9d31e8f213fc7",
    "featured": true
  },
  {
    "quote": "Quick, fast, and very courteous.\nI definitely enjoy working with these guys and will definitely be using them in the future.",
    "name": "Jasper Davis",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2026-02-28",
    "url": "https://www.trustpilot.com/reviews/69a24ae9a4bcf72d9c4da2f9"
  },
  {
    "quote": "Great job and good communication",
    "name": "Everardo Gonzalez",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2026-01-03",
    "url": "https://www.trustpilot.com/reviews/69586fe99bf230755e58e622"
  },
  {
    "quote": "Love it great work would recommend them",
    "name": "Tom Woods",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-12-23",
    "url": "https://www.trustpilot.com/reviews/6949a7f5419f4af00fb8c535"
  },
  {
    "quote": "Jay took his time and made sure I was happy with the result ! I was picky with what I wanted and he did a great job asking questions and sending me samples ! I would highly recommend them !",
    "name": "Tim Trent",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-12-12",
    "url": "https://www.trustpilot.com/reviews/693b4aea1e9082620e95308d",
    "featured": true,
    "hero": "logo"
  },
  {
    "quote": "Felix was wonderful to work with! He is professional, kind and goes above and beyond for customers. They made me the cutest logo for my business and walked me through everything. Great service all around, even when I had questions months later. 12/10 will use them again",
    "name": "Nikki",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-10-21",
    "url": "https://www.trustpilot.com/reviews/68f6beaa4d41b472ac259f50",
    "featured": true
  },
  {
    "quote": "Easy to work with made my company logo awesome!!! And affordable! They're really a one stop shop.",
    "name": "Christopher Richards",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-10-14",
    "url": "https://www.trustpilot.com/reviews/68ed79e39f8db5d0f5693264",
    "featured": true
  },
  {
    "quote": "Great feedback kept me updated. Will be doing more business",
    "name": "Romaine Wisdom",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-08-19",
    "url": "https://www.trustpilot.com/reviews/68a3c8aedc5ac7c436ec0801"
  },
  {
    "quote": "Awesome people to work with. Creativity at it finest. Very affordable and offer so much to help out a new company just starting up.",
    "name": "Eddie Ragsdale",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-07-30",
    "url": "https://www.trustpilot.com/reviews/68897ccc769c7c0465ec66b5",
    "featured": true,
    "hero": "general"
  },
  {
    "quote": "LogoMakerPro did a great logo for my Real Estate business, with a very reasonable turnaround time. Well worth the money! Thank you guys.",
    "name": "todd o'neill",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-07-24",
    "url": "https://www.trustpilot.com/reviews/688190ec92fdb9a9d5dcb83d",
    "featured": true,
    "topics": [
      "real-estate"
    ]
  },
  {
    "quote": "Within 24 hours I have the coolest logo for my shop. I never imagined they would give me something so unique that makes my shop stand out above the rest. Thanks Jay amazing job and thank you for the courteous service .",
    "name": "James Mike Hogan",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-06-27",
    "url": "https://www.trustpilot.com/reviews/685e5fe5aa0ca95fc12fb6dc",
    "featured": true
  },
  {
    "quote": "He did a great job! He did everything I asked for. Our logo came out perfect 👌",
    "name": "Brenda Romero",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-06-07",
    "url": "https://www.trustpilot.com/reviews/684337ae4017973048c40613"
  },
  {
    "quote": "Very well satisfied with the artwork for my company logos. Plus, the printing options that were offered. Even agreed to match competitors printing prices. Very prompt answering to making changes till you got what you're wanting for final results.",
    "name": "Wade Russell Sr",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-05-16",
    "url": "https://www.trustpilot.com/reviews/68275961f34e5523576f30de",
    "featured": true
  },
  {
    "quote": "A Pleasure too work with. I would recommend them too anyone",
    "name": "Charles Hunt",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-05-16",
    "url": "https://www.trustpilot.com/reviews/682642821102f9e7ce00c326"
  },
  {
    "quote": "Jay made my experience worth it. He was very knowledgeable and courteous and cared about what I wanted. He reached out daily until we got everything ironed out. I highly recommend",
    "name": "Dustin",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-04-15",
    "url": "https://www.trustpilot.com/reviews/67fe46e3ae378b89f342cec6",
    "featured": true
  },
  {
    "quote": "Jay was very helpful on designing what I wanted . Everything was done in a timely matter. Very satisfied with outcome.",
    "name": "Dorce Forester",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-04-01",
    "url": "https://www.trustpilot.com/reviews/67eb2e0c20f86830c0eef7b1"
  },
  {
    "quote": "Jay and the team at LogoMakersPro are very helpful and extremely knowledgeable. But most of all, their design was absolutely fabulous",
    "name": "Barry",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-03-29",
    "url": "https://www.trustpilot.com/reviews/67e722a57ffa566bd9c845cc",
    "featured": true
  },
  {
    "quote": "I felt that Sam did well to listen to what we needed.",
    "name": "Lance Owen",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-02-21",
    "url": "https://www.trustpilot.com/reviews/67b8adef7d78b9ed5be5ca13"
  },
  {
    "quote": "Great work and communication",
    "name": "Terry",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-02-04",
    "url": "https://www.trustpilot.com/reviews/67a1547c07aee78bd7641114"
  },
  {
    "quote": "Jay was great at Logo Pro. He asked important questions to help me get the best logo for my business.",
    "name": "Kavish Sharma",
    "rating": 5,
    "source": "Trustpilot",
    "date": "2025-01-31",
    "url": "https://www.trustpilot.com/reviews/679beaf9795715f903666559"
  }
];

export const testimonialImages = [
  {
    "src": "/assets/imgs/testimonial/3/1.webp",
    "alt": "",
    "width": 170,
    "height": 200,
    "className": "testimonial3__img"
  },
  {
    "src": "/assets/imgs/testimonial/3/2.webp",
    "alt": "",
    "width": 90,
    "height": 100,
    "className": "testimonial3__img-2"
  },
  {
    "src": "/assets/imgs/testimonial/3/3.webp",
    "alt": "",
    "width": 110,
    "height": 130,
    "className": "testimonial3__img-3"
  },
  {
    "src": "/assets/imgs/testimonial/3/4.webp",
    "alt": "",
    "width": 330,
    "height": 430,
    "className": "testimonial3__img-4"
  },
  {
    "src": "/assets/imgs/testimonial/3/5.webp",
    "alt": "",
    "width": 245,
    "height": 278,
    "className": "testimonial3__img-5"
  },
  {
    "src": "/assets/imgs/testimonial/3/6.webp",
    "alt": "",
    "width": 140,
    "height": 160,
    "className": "testimonial3__img-6"
  }
];
