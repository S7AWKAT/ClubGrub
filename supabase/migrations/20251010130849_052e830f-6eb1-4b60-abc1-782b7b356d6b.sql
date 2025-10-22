-- Seed all homepage sections with their current content
INSERT INTO public.page_content (section_id, content_type, content, display_order, is_visible) VALUES
-- Hero Section
('hero', 'hero', '{
  "title": "Sell more F&B",
  "titleHighlight": "Without extra labor",
  "description": "Elevate hospitality experiences with convenient mobile ordering of food and beverages. Drive revenue while optimizing your team''s efficiency.",
  "ctaPrimary": "Book a Demo",
  "ctaSecondary": "See it in action",
  "backgroundImage": "https://utvkbpdqcrtvlcdmviss.supabase.co/storage/v1/object/public/content-images/hero-clubhouse.jpg"
}', 1, true),

-- Operator Outcomes
('outcomes', 'outcomes', '{
  "title": "Measurable results that impact your",
  "titleHighlight": "bottom line and member satisfaction",
  "description": "ClubGrub delivers quantifiable outcomes that matter to club operators and members.",
  "outcomes": [
    {
      "icon": "TrendingUp",
      "title": "Increase Revenue",
      "description": "On-course, poolside, halfway houses, community dining. Capture F&B opportunities everywhere members gather.",
      "highlight": "35% avg revenue increase"
    },
    {
      "icon": "Users",
      "title": "Optimize Labor",
      "description": "Reduce call-in and order-taking workload. Free up staff for premium hospitality experiences.",
      "highlight": "40% less phone orders"
    },
    {
      "icon": "Zap",
      "title": "Elevate Experiences",
      "description": "Frictionless ordering meets premium hospitality. Exceed member expectations with seamless service.",
      "highlight": "100% member satisfaction"
    },
    {
      "icon": "Clock",
      "title": "Accelerate Pace of Play",
      "description": "Eliminate bottlenecks, enable order-ahead. Keep the game moving while enhancing the experience.",
      "highlight": "15min faster rounds"
    }
  ]
}', 2, true),

-- How It Works
('how-it-works', 'steps', '{
  "badge": "Simple Process, Powerful Results",
  "title": "How",
  "titleHighlight": "ClubGrub",
  "titleSuffix": "Works",
  "description": "From order to delivery in three seamless steps. Technology that works behind the scenes to enhance your hospitality.",
  "steps": [
    {
      "number": "01",
      "icon": "Smartphone",
      "title": "Members order on mobile device",
      "description": "Members browse your menu, select their favorite food or beverages and choose their desired location.",
      "features": ["GPS location targeting", "Real-time menu updates", "Member billing integration", "Order customization"],
      "image": "https://utvkbpdqcrtvlcdmviss.supabase.co/storage/v1/object/public/content-images/how-it-works-step-1.jpg"
    },
    {
      "number": "02",
      "icon": "Tablet",
      "title": "Team manages tickets on ClubGrub iPad",
      "description": "Kitchen and beverage teams receive orders instantly. Prep, stage, and dispatch with seamless workflow management.",
      "features": ["Instant order notifications", "2-way text msg communication", "Prep time optimization", "Staff coordination tools"],
      "image": "https://utvkbpdqcrtvlcdmviss.supabase.co/storage/v1/object/public/content-images/how-it-works-step-2.jpg"
    },
    {
      "number": "03",
      "icon": "Truck",
      "title": "Deliver or stage for pickup",
      "description": "Real-time order tracking keeps members informed. Flexible delivery options match your operational preferences.",
      "features": ["Live order tracking", "No beverage cart required", "Pickup notifications", "Member communication"],
      "image": "https://utvkbpdqcrtvlcdmviss.supabase.co/storage/v1/object/public/content-images/how-it-works-step-3.jpg"
    }
  ],
  "bottomCta": {
    "icon": "Settings",
    "title": "Works with",
    "titleHighlight": "any POS",
    "description": "Keep your existing setup and accept member billing or card payments.",
    "buttonText": "Start Elevating Your Operation"
  }
}', 3, true),

-- Use Cases
('hospitality', 'use-cases', '{
  "badge": "Hospitality Beyond the Clubhouse",
  "title": "Deliver hospitality",
  "titleHighlight": "everywhere members gather",
  "description": "From the first tee to the final putt, from poolside relaxation to community events - ClubGrub extends your service footprint across your entire facility.",
  "useCases": [
    {
      "icon": "MapPin",
      "title": "On-Course Delivery",
      "description": "GPS-enabled ordering ensures food and beverages reach golfers exactly where they are on the course.",
      "image": "https://utvkbpdqcrtvlcdmviss.supabase.co/storage/v1/object/public/content-images/golf-course-ordering.jpg",
      "benefits": ["GPS precision targeting", "Cart-side delivery", "No interruption to play", "Deliver anywhere."]
    },
    {
      "icon": "Home",
      "title": "Halfway Houses",
      "description": "Transform turn stations into revenue centers with pre-ordering and quick pickup options.",
      "image": "https://utvkbpdqcrtvlcdmviss.supabase.co/storage/v1/object/public/content-images/halfway-houses.jpg",
      "benefits": ["Order-ahead convenience", "Reduced wait times", "Increased throughput", "Premium grab-and-go"]
    },
    {
      "icon": "Waves",
      "title": "Pool & Racquets",
      "description": "Poolside and courtside service that doesn''t interrupt relaxation or competitive play.",
      "image": "https://utvkbpdqcrtvlcdmviss.supabase.co/storage/v1/object/public/content-images/pool-dining.jpg",
      "benefits": ["Cabana delivery", "Courtside service", "Chairside service", "Resort-style amenities"]
    },
    {
      "icon": "Utensils",
      "title": "To-Go / Community",
      "description": "Extend dining beyond the clubhouse with community events and member takeout services.",
      "image": "https://utvkbpdqcrtvlcdmviss.supabase.co/storage/v1/object/public/content-images/togo.jpg",
      "benefits": ["Reduce call-in orders", "Scheduled dine-in times", "Schedule pickup times", "Home delivery available"]
    }
  ],
  "ctaText": "Grow Your F&B Operation"
}', 4, true),

-- Launch Playbook
('launch-playbook', 'playbook', '{
  "badge": "Turnkey Launch Solution",
  "title": "We handle the complexity",
  "titleHighlight": "so you can focus on serving members",
  "description": "From menu setup to staff training, we provide everything needed for a successful launch. Most clubs are accepting orders within 24 hours.",
  "services": [
    {
      "icon": "Tablet",
      "title": "Menu Build & Content",
      "description": "Our team builds your complete digital menu with photos, descriptions, and pricing",
      "timeline": "30 min"
    },
    {
      "icon": "Users",
      "title": "Staff Training",
      "description": "Comprehensive training for kitchen, service, and management teams",
      "timeline": "20 min"
    },
    {
      "icon": "Megaphone",
      "title": "Member Communication",
      "description": "Ready-to-send email templates, QR codes, and launch announcement materials",
      "timeline": "15 min"
    },
    {
      "icon": "Rocket",
      "title": "Go Live",
      "description": "Accept your first order within minutes and receive unlimited tech support.",
      "timeline": "Instant"
    }
  ],
  "quickLaunch": {
    "icon": "Rocket",
    "title": "Go live as soon as tomorrow",
    "description": "Our proven launch process gets you operational faster than any other technology. No lengthy implementations or complex integrations."
  },
  "benefits": [
    "Complimentary iPad included (ready to accept orders in minutes)",
    "Dedicated launch specialist assigned to your club",
    "Member onboarding materials and communication templates",
    "Real-time tech support anytime you need it",
    "Performance analytics and optimization recommendations",
    "Prep printer available"
  ],
  "support": {
    "title": "Ongoing support when you need it",
    "description": "Our success team provides ongoing optimization, feature updates, and support to ensure your continued growth.",
    "stats": [
      {"value": "24/7", "label": "Support Available"},
      {"value": "<2min", "label": "Avg Response Time"},
      {"value": "99.9%", "label": "Uptime Guarantee"}
    ]
  }
}', 5, true),

-- Social Proof
('trusted', 'testimonials', '{
  "badge": "Trusted by Elite Clubs",
  "title": "Trusted by",
  "titleHighlight": "industry leaders",
  "description": "Join hundreds of premier clubs that have transformed their hospitality operations with ClubGrub.",
  "stats": [
    {"number": "100%", "label": "Member Satisfaction"},
    {"number": "35%", "label": "Avg Revenue Increase"},
    {"number": "24hrs", "label": "Implementation Time"}
  ],
  "testimonials": [
    {
      "quote": "ClubGrub streamlines the whole ordering process. Members can order without having to get on their phones, call the clubhouse, and get connected to the bar. Club members of all ages are using it, with high satisfaction from everyone. We''re very happy with the software.",
      "author": "Michael Pacella",
      "title": "General Manager",
      "club": "Rockland Country Club",
      "rating": 5
    },
    {
      "quote": "ClubGrub has solved an age-old problem in golf – satisfying one''s hunger or thirst while out in the middle of the course, far away from the halfway house and the drink cart nowhere in sight.",
      "author": "Hank Gola",
      "title": "Food & Beverage Director",
      "club": "MetGolfer Magazine",
      "rating": 5
    },
    {
      "quote": "On-course golf menus are ripe for expansion. Less time taking phone orders means more time creating memorable experiences.",
      "club": "Forbes",
      "rating": 5
    },
    {
      "quote": "Golfers are increasingly opting for fresher, more upscale options.",
      "club": "Golf Digest",
      "rating": 5
    }
  ],
  "ctaText": "Schedule Your Demo"
}', 6, true),

-- FAQ
('faq', 'faq', '{
  "badge": "Common Questions",
  "title": "Frequently Asked",
  "titleHighlight": "Questions",
  "description": "Get answers to the most common questions about implementing ClubGrub at your club.",
  "faqs": [
    {
      "question": "How quickly can we implement ClubGrub?",
      "answer": "Most clubs are accepting orders within 24 hours. Our typical implementation includes menu setup, staff training, and technology configuration all completed in 1-2 hours. We handle everything so you can focus on serving members."
    },
    {
      "question": "What are the costs and pricing structure?",
      "answer": "ClubGrub offers flat-fee licensing with no setup fees or long-term contracts. We include complimentary hardware, staff training, and ongoing support. Contact us for a customized quote based on your club''s operational needs."
    },
    {
      "question": "Does ClubGrub work with our existing POS system?",
      "answer": "Yes, ClubGrub can be used with any POS system. No expensive system replacements or operational disruptions."
    },
    {
      "question": "How do members pay for orders?",
      "answer": "Members can pay using their existing club billing account, credit cards, or any payment method already configured in your POS system. Contact us to discuss options for your club."
    },
    {
      "question": "How does GPS delivery work on the golf course?",
      "answer": "Our GPS system provides precise real-time coordinates to your delivery team, eliminating guesswork and ensuring accurate, timely delivery anywhere on your property."
    },
    {
      "question": "Can we customize the menu and pricing?",
      "answer": "Absolutely. ClubGrub adapts to your existing menu, pricing, and service style. We build custom digital menus with your branding, photos, and descriptions. You maintain full control over pricing, availability, and menu modifications."
    },
    {
      "question": "What kind of training and support do you provide?",
      "answer": "We provide comprehensive training for all staff levels, from kitchen teams to management. This includes on-site training, digital resources, and ongoing support. Our success team is available 24/7 with average response times under 2 minutes."
    },
    {
      "question": "What happens if we need technical support?",
      "answer": "Our support team is available 24/7 via phone, chat, or email. Most issues are resolved remotely within minutes. We also provide proactive monitoring and regular system updates to prevent problems before they occur."
    }
  ],
  "cta": {
    "title": "Still have questions?",
    "description": "Our team of club hospitality experts is standing by to answer any specific questions about your implementation.",
    "primaryButton": "Schedule a Call",
    "secondaryButton": "Email Our Team"
  }
}', 7, true)
ON CONFLICT (section_id) DO NOTHING;