// Industry logo design pages (/logo-design/<slug>). Each page has its own copy, related work and FAQs so it
// answers that industry's questions rather than repeating /logo-design with a different word swapped in.
// Related work picks items by their portfolio tab and position (src/data/portfolio.js) and gives each a
// caption saying what the piece actually is, since some are websites or apps rather than logos. An item can also
// be its own image: { src: '/assets/imgs/industries/restaurant/bistro.webp', alt, width, height, caption }.

export const industries = {
  restaurant: {
    name: 'Restaurant Logo Design',
    audience: 'Restaurants, cafes, bakeries and food businesses',
    title: 'Restaurant Logo Design That Makes People Hungry to Visit',
    lead: 'A restaurant logo has to work hard: on the sign outside, the menu in a guest’s hands, the box on a delivery driver’s seat and the tiny app icon on a phone. We design restaurant, cafe and food truck logos that are easy to remember and easy to use everywhere your food goes.',
    body: 'Tell us about your cuisine, your guests and the feeling of your room. Our designers turn that into original logo concepts, then refine your favorite until it is ready for print, signage and screens.',
    sections: [
      {
        heading: 'What makes a great restaurant logo',
        paragraphs: [
          'The best restaurant logos tell guests what kind of meal to expect before they read a single menu item. A hand-lettered script says family bistro. Bold, chunky type says burgers and shakes. A clean monogram says tasting menu. We start by agreeing on that promise, then design around it.',
          'Your logo also has to survive real-world use. It will be printed in one color on takeaway bags, embroidered on aprons, shrunk to a profile picture on delivery apps and lit up on a sign at night. We test every concept at small sizes and in one color so it still reads in all of those places.',
        ],
      },
      {
        heading: 'Where your restaurant logo will appear',
        list: [
          'Storefront signage and window decals',
          'Menus, table tents and receipts',
          'Takeaway packaging, cups, bags and stickers',
          'Delivery app listings and Google Business Profile',
          'Social media profiles, posts and stories',
          'Staff uniforms, aprons and hats',
          'Gift cards, loyalty cards and vouchers',
        ],
        after:
          'That is why every logo package from Silver up includes vector files (AI, EPS and PDF) for print and signage, plus PNG and JPG files for screens.',
      },
    ],
    styles: {
      heading: 'Restaurant logo styles we design',
      items: [
        { title: 'Hand-lettered script', text: 'Warm and personal. A good fit for bakeries, cafes, family restaurants and dessert shops.' },
        { title: 'Bold wordmark', text: 'Big, confident type that reads from across the street. Ideal for burger joints, pizzerias and food trucks.' },
        { title: 'Emblem or badge', text: 'A contained shape that works on stamps, stickers and packaging. Popular with grills, breweries and barbecue.' },
        { title: 'Icon with name', text: 'A simple symbol, such as a chef’s hat, flame or leaf, paired with your name for an app icon that still makes sense.' },
      ],
    },
    work: {
      heading: 'Our work for food businesses',
      intro: 'Beyond logos, we design the websites and ordering apps restaurants use to win and serve customers.',
      items: [
        { tab: 'Web Design', index: 6, caption: 'Restaurant website' },
        { tab: 'Mobile Apps', index: 2, caption: 'Food ordering app' },
        { tab: 'Mobile Apps', index: 5, caption: 'Recipe and delivery app' },
      ],
    },
    packagesNote:
      'Logo packages start at $29. Need menus too? Our Branding Classic and Ultimate packages add menu card or brochure design, stationery and a website to your logo.',
    faqs: [
      {
        q: 'How much does a restaurant logo cost?',
        a: 'Restaurant logos use the same packages as all our logos: from $29 for Logo Basic with 4 concepts up to $599 for The Boss. Most restaurants choose Silver ($89) or Gold ($129) for unlimited revisions and print-ready files for signage and menus.',
      },
      {
        q: 'Can you design my menu as well as my logo?',
        a: 'Yes. Menu card design is included in our Branding Classic and Branding Ultimate packages, along with stationery and a website, so your menu, logo and online presence match.',
      },
      {
        q: 'Will my logo work on signage and delivery apps?',
        a: 'We check every concept at small sizes and in a single color so it reads on an app icon, a receipt or a sign at night. Silver and above include vector files your sign maker can scale to any size without losing quality.',
      },
      {
        q: 'How long does a restaurant logo take?',
        a: 'Your first concepts arrive within 24 to 72 hours, depending on the package. Revisions come back within 48 hours, so you can have a final logo well before opening day.',
      },
      {
        q: 'Do I own the final restaurant logo?',
        a: 'Yes. You get full ownership rights to your final logo, and every design is created from scratch. Registering it as a trademark is your responsibility, which we recommend before you print signage.',
      },
    ],
  },

  'real-estate': {
    name: 'Real Estate Logo Design',
    audience: 'Real estate agents, brokerages, property managers and developers',
    title: 'Real Estate Logo Design That Builds Trust Before the First Showing',
    lead: 'In real estate, people judge your brand long before they meet you: on a yard sign, a listing portal, a business card or a social media ad. We design logos for agents, brokerages, property managers and developers that look established, trustworthy and easy to recognize.',
    body: 'Share your market, your clients and how you want to be seen, whether that is luxury homes, first-time buyers or commercial property. Our designers create original concepts and refine your favorite until it is ready for signs, print and screens.',
    sections: [
      {
        heading: 'What makes a strong real estate logo',
        paragraphs: [
          'Clients trust you with the biggest purchase of their lives, so your logo needs to look professional and stable. Clean type, balanced spacing and a restrained color palette usually do more for credibility than a busy illustration.',
          'Your logo also has to stand out on a street full of yard signs. We keep shapes simple and contrast high so your name can be read from a passing car, and we design versions that work beside your brokerage’s branding when your agreement requires it.',
        ],
      },
      {
        heading: 'Where your real estate logo will appear',
        list: [
          'Yard signs, open house signs and riders',
          'Business cards, letterheads and listing presentations',
          'Listing portals, your website and email signature',
          'Social media profiles, ads and property videos',
          'Vehicle wraps and office signage',
          'Flyers, postcards and just-sold mailers',
          'Closing gifts and branded folders',
        ],
        after:
          'Every logo package from Silver up includes vector files for large-format signs and vehicle wraps, plus web-ready PNG and JPG files.',
      },
    ],
    styles: {
      heading: 'Real estate logo styles we design',
      items: [
        { title: 'Monogram', text: 'Your initials in a refined mark. A classic choice for individual agents and luxury property brands.' },
        { title: 'Roofline or keyhole icon', text: 'A simple building, roof or key shape that says property at a glance, kept clean so it does not look like clip art.' },
        { title: 'Wordmark', text: 'Your name in distinctive type. Ideal when you are the brand and want it to read clearly on every sign.' },
        { title: 'Crest or badge', text: 'A structured, established look that suits brokerages, property managers and developers.' },
      ],
    },
    work: {
      heading: 'Our work for property and home businesses',
      intro: 'From logos to websites and apps, here is some of our work for clients in housing and home services.',
      items: [
        { tab: 'Logo', index: 25, caption: 'Residential services logo' },
        { tab: 'Web Design', index: 1, caption: 'Real estate developer website' },
        { tab: 'Mobile Apps', index: 7, caption: 'Room rental app' },
        { tab: 'Logo', index: 9, caption: 'Home services logo' },
      ],
    },
    packagesNote:
      'Logo packages start at $29. Logo Gold and above add business card, letterhead and envelope designs, so your listing presentations match your signs from day one.',
    faqs: [
      {
        q: 'How much does a real estate logo cost?',
        a: 'Real estate logos use the same packages as all our logos: from $29 for Logo Basic up to $599 for The Boss. Many agents choose Gold ($129), which adds business card, letterhead and envelope designs to unlimited logo revisions.',
      },
      {
        q: 'Can I use my own logo if I work under a brokerage?',
        a: 'Often yes, but brokerages and local advertising rules can require their name or logo to appear beside yours. Check your agreement first. We can design a personal logo that sits well next to your brokerage’s branding.',
      },
      {
        q: 'Will my logo work on yard signs?',
        a: 'Yes. We test concepts at a distance and in a single color so they stay readable on a sign seen from a moving car. Silver and above include vector files your sign company can print at any size.',
      },
      {
        q: 'Should my real estate logo include a house or roof?',
        a: 'It can, but it is not required. A roofline or key icon says property instantly, while a monogram or wordmark can look more premium and stays distinctive among competitors who all use houses. We can show you both directions as concepts.',
      },
      {
        q: 'How long does a real estate logo take?',
        a: 'Your first concepts arrive within 24 to 72 hours, depending on the package. Revisions come back within 48 hours, so you can order signs and cards within days.',
      },
    ],
  },

  construction: {
    name: 'Construction Logo Design',
    audience: 'Construction companies, contractors, builders and trades',
    title: 'Construction Logo Design for Contractors Who Build to Last',
    lead: 'Your logo rides on your trucks, hangs on your job site fence and sits at the top of every bid you send. We design construction logos for general contractors, builders, excavation crews and trades that look tough, professional and easy to spot from the road.',
    body: 'Tell us what you build, where you work and the jobs you want more of. Our designers create original concepts, then refine your favorite until it is ready for vehicle wraps, signs, hard hats and paperwork.',
    sections: [
      {
        heading: 'What makes a strong construction logo',
        paragraphs: [
          'Clients hiring a contractor want proof you are established and reliable. Strong, solid type, a clear shape and a confident color pairing say that faster than a crowded illustration. Equipment, buildings and tools can work well, as long as they stay simple enough to read at a distance.',
          'Construction logos take a beating: they are printed on job site banners, cut in vinyl for trucks, embroidered on caps and stamped on invoices in black and white. We check every concept in one color and at small sizes so it holds up on all of them.',
        ],
      },
      {
        heading: 'Where your construction logo will appear',
        list: [
          'Truck doors, trailer wraps and equipment decals',
          'Job site signs, fence banners and yard signs',
          'Hard hats, hi-vis vests, shirts and caps',
          'Bids, proposals, contracts and invoices',
          'Your website, Google Business Profile and directory listings',
          'Business cards and estimate folders',
        ],
        after:
          'Every logo package from Silver up includes vector files (AI, EPS and PDF), which vehicle wrap and sign shops need to print your logo large without blurring.',
      },
    ],
    styles: {
      heading: 'Construction logo styles we design',
      items: [
        { title: 'Equipment emblem', text: 'An excavator, crane or dump truck inside a badge. Popular with excavation, grading and heavy civil contractors.' },
        { title: 'Building skyline', text: 'Clean building or roofline shapes that suit general contractors, builders and developers.' },
        { title: 'Bold monogram', text: 'Your initials in heavy, structural letters. Works well on hard hats and small decals.' },
        { title: 'Trade icon', text: 'A hammer, paint roller or trowel paired with your name for roofers, painters, concrete and specialty trades.' },
      ],
    },
    work: {
      heading: 'Construction and trades logos we have designed',
      intro: 'A few of the logos we have created for contractors and trade businesses.',
      items: [
        { tab: 'Logo', index: 14, caption: 'DFM Concrete Construction' },
        { tab: 'Logo', index: 20, caption: 'Middleton’s Contracting' },
        { tab: 'Logo', index: 9, caption: 'Embry’s Home Services' },
        { tab: 'Logo', index: 4, caption: 'Superior Finish Painting & Spray Foam' },
      ],
    },
    packagesNote:
      'Logo packages start at $29. Logo Gold and above add business card, letterhead and envelope designs, so your bids and invoices match the logo on your trucks.',
    faqs: [
      {
        q: 'How much does a construction logo cost?',
        a: 'Construction logos use the same packages as all our logos: from $29 for Logo Basic up to $599 for The Boss. Most contractors choose Silver ($89) or Gold ($129) for unlimited revisions and the vector files sign and wrap shops ask for.',
      },
      {
        q: 'Will my logo work on truck wraps and hard hats?',
        a: 'Yes. We design with vinyl cutting, embroidery and one-color printing in mind, and Silver and above include vector files that scale from a hard hat sticker to a full trailer wrap without losing quality.',
      },
      {
        q: 'Should my construction logo show equipment or tools?',
        a: 'It can, and for excavation or heavy equipment companies it often helps customers understand what you do at a glance. For general contractors a clean building shape or monogram can look more established. We can show you both directions as concepts.',
      },
      {
        q: 'How long does a construction logo take?',
        a: 'Your first concepts arrive within 24 to 72 hours, depending on the package. Revisions come back within 48 hours, so you can order truck lettering and signs within days.',
      },
      {
        q: 'Do I own my construction logo?',
        a: 'Yes. You get full ownership rights to your final logo, and every design is created from scratch. Registering it as a trademark is your responsibility.',
      },
    ],
  },

  trucking: {
    name: 'Trucking Logo Design',
    audience: 'Trucking companies, owner-operators, haulers and logistics businesses',
    title: 'Trucking Logo Design That Looks Sharp at 70 Miles an Hour',
    lead: 'Your trucks are moving billboards. We design trucking, hauling and logistics logos for owner-operators and fleets that read clearly from the next lane, look professional to shippers and brokers, and print cleanly on cab doors and trailers.',
    body: 'Tell us what you haul, where you run and how you want shippers to see you. Our designers create original concepts, then refine your favorite until it is ready for decals, wraps and paperwork.',
    sections: [
      {
        heading: 'What makes a strong trucking logo',
        paragraphs: [
          'A trucking logo is usually seen for a few seconds, from a distance, at speed. Bold shapes, high contrast and a short, clear name do the work. A truck silhouette or a sense of motion can tell people what you do instantly, as long as fine detail does not turn to mush on a moving trailer.',
          'Shippers and brokers judge your company by your paperwork and online profile too. A logo that looks the same on a rate confirmation, an invoice and your website makes a small operation look established.',
        ],
      },
      {
        heading: 'Where your trucking logo will appear',
        list: [
          'Cab door decals and trailer wraps',
          'Rate confirmations, invoices and bills of lading',
          'Load board profiles, your website and email signature',
          'Driver shirts, jackets and caps',
          'Business cards and recruiting flyers',
          'Mud flaps, stickers and promotional items',
        ],
        after:
          'Commercial trucks also have to show your company name and USDOT number on both sides, so we design door layouts with room for that lettering. Silver and above include the vector files decal shops need.',
      },
    ],
    styles: {
      heading: 'Trucking logo styles we design',
      items: [
        { title: 'Truck emblem', text: 'A detailed rig or dump truck inside a shield or badge. Great on caps, mud flaps and social media.' },
        { title: 'Line-art silhouette', text: 'A clean, minimal truck outline that stays crisp on cab doors and paperwork.' },
        { title: 'Speed wordmark', text: 'Slanted, motion-styled type that suits fleets and logistics companies that want a modern look.' },
        { title: 'Shield or crest', text: 'A solid, trustworthy shape for hauling, junk removal and transport companies.' },
      ],
    },
    work: {
      heading: 'Trucking and hauling logos we have designed',
      intro: 'A few of the logos we have created for transport and hauling businesses.',
      items: [
        { tab: 'Logo', index: 10, caption: 'Quality Transport Refrigeration' },
        { tab: 'Logo', index: 11, caption: 'Greene’s Truck Painter’s & Collision' },
        { tab: 'Logo', index: 23, caption: 'N-E Where Hauling & Junk Removal' },
        { tab: 'Logo', index: 28, caption: 'HDA Hauling and Grading' },
      ],
    },
    packagesNote:
      'Logo packages start at $29. Logo Gold and above add business card, letterhead and envelope designs, so your invoices and rate confirmations match your trucks.',
    faqs: [
      {
        q: 'How much does a trucking logo cost?',
        a: 'Trucking logos use the same packages as all our logos: from $29 for Logo Basic up to $599 for The Boss. Most owner-operators choose Silver ($89) or Gold ($129) for unlimited revisions and vector files for decals.',
      },
      {
        q: 'Can you design my truck door layout with the USDOT number?',
        a: 'We design your logo so it sits well beside the company name and USDOT number that must appear on both sides of commercial vehicles. Your decal shop then lays out the final door lettering using our vector files.',
      },
      {
        q: 'Will my logo be readable on a moving truck?',
        a: 'Yes. We test concepts at a distance and in one color, keeping shapes bold and contrast high so your name can be read from the next lane.',
      },
      {
        q: 'How long does a trucking logo take?',
        a: 'Your first concepts arrive within 24 to 72 hours, depending on the package. Revisions come back within 48 hours, so you can get decals ordered quickly.',
      },
      {
        q: 'Do I own my trucking logo?',
        a: 'Yes. You get full ownership rights to your final logo, and every design is created from scratch. Registering it as a trademark is your responsibility.',
      },
    ],
  },
};

export const industrySlugs = Object.keys(industries);
