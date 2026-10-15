/**
 * ASPERA — Entrepreneurship Cell | VVCE Mysuru
 * Central Configuration & Data Store
 * All registration links, social URLs, and event metadata are centralized here.
 */

window.ASPERA_CONFIG = {
  organization: "ASPERA – Entrepreneurship Cell",
  institution: "Vidyavardhaka College of Engineering, Mysuru",
  tagline: "ACTUATING AMBITION",
  philosophy: "IDEAS. INITIATE. IMPACT.",

  // Centralized Event Registration Configuration
  registration: {
    workshopUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeuhJs3Wya7fmkT7D5_X503ui9UicSacB78Zdxkwjfg9s4CqA/viewform",
    speakerSessionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc3uWcfASsSQyvS_CR2IjwufmgjDMCIzFe2aNxgpMPsBMf_AQ/viewform",
    isPlaceholder: false
  },

  // Official Social Media Channels
  social: {
    instagram: "https://www.instagram.com/vvce_aspera/",
    linkedin: "https://www.linkedin.com/company/e-cell-aspera-vvce/"
  },

  // Featured Events (Two strictly independent events)
  events: [
    {
      id: "workshop-vision-venture",
      title: "FROM VISION TO VENTURE",
      subtitle: "An Entrepreneurial Workshop",
      category: "ENTREPRENEURIAL WORKSHOP",
      badge: "Flagship Workshop",
      date: "October 17, 2026",
      time: "3:00 PM – 5:00 PM",
      venue: "M-202",
      detailPage: "event-workshop.html",
      registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeuhJs3Wya7fmkT7D5_X503ui9UicSacB78Zdxkwjfg9s4CqA/viewform",
      speaker: {
        name: "Dr. Chaitra Narayan",
        designation: "Director – Kodagu Agritec Pvt. Ltd.",
        subDesignation: "Ex-Governor Nominee Syndicate Member, University of Mysore",
        roleTag: "CONVENER & WORKSHOP LEAD",
        photo: "Dr. Chaitra Naraya.jpeg"
      },
      shortDescription: "An immersive entrepreneurial workshop exploring the journey from vision to venture, real-world challenges and the lessons that shape entrepreneurial success.",
      fullDescription: "We are delighted to host an Entrepreneurial Workshop featuring Dr. Chaitra Narayan, Director – Kodagu Agritec Pvt. Ltd. and Ex-Governor Nominee Syndicate Member, University of Mysore. Join us for an immersive session where Dr. Chaitra shares her entrepreneurial journey, challenges, and the lessons that shaped her path from vision to venture. This workshop is designed to spark ideas, build clarity, and motivate aspiring innovators.",
      takeaways: [
        "Insights into an entrepreneurial journey.",
        "Understanding real-world challenges.",
        "Lessons from transforming vision into a venture.",
        "Inspiration for aspiring innovators."
      ]
    },
    {
      id: "speaker-session-entrepreneurial",
      title: "ENTREPRENEURIAL SPEAKER SESSION",
      subtitle: "Executive Leadership & Innovation Dialogues",
      category: "SPEAKER SESSION",
      badge: "Executive Session",
      date: "October 17, 2026",
      time: "3:00 PM – 5:00 PM",
      venue: "M-201",
      detailPage: "event-speaker-session.html",
      registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc3uWcfASsSQyvS_CR2IjwufmgjDMCIzFe2aNxgpMPsBMf_AQ/viewform",
      speakers: [
        {
          name: "Srinivas Varadarajan",
          designation: "CEO",
          company: "Vigyan Labs Innovation Pvt. Limited",
          photo: "assets/speaker-srinivas-varadarajan.png"
        },
        {
          name: "Rakesh Babu K L",
          designation: "COO & Executive Director",
          company: "Innomentra Consulting Pvt. Limited",
          photo: "assets/speaker-rakesh-babu.png"
        }
      ],
      bannerPhoto: "assets/speakers-session-full.png",
      shortDescription: "High-impact keynote and strategic dialogue featuring industry veterans discussing corporate innovation, sustainable enterprise architecture, and emerging tech startups.",
      fullDescription: "ASPERA Entrepreneurship Cell presents an exclusive speaker session with visionary business leaders Srinivas Varadarajan (CEO, Vigyan Labs Innovation Pvt. Ltd.) and Rakesh Babu K L (COO & Executive Director, Innomentra Consulting Pvt. Ltd.). Designed for student founders and tech entrepreneurs seeking real-world perspectives on enterprise scaling, deep-tech research commercialization, and strategic management.",
      takeaways: [
        "Executive viewpoints on deep-tech innovation and product lifecycle.",
        "Translating laboratory inventions into viable commercial enterprises.",
        "Navigating early-stage governance, IP strategy, and corporate partnerships.",
        "Interactive Q&A on entrepreneurial strategy and scaling engineering ventures."
      ]
    }
  ],

  // What We Do Categories
  categories: [
    {
      title: "Entrepreneurship & Innovation",
      tag: "FOUNDATION",
      desc: "Instilling startup thinking, problem discovery, and modern entrepreneurial mindsets across engineering disciplines.",
      icon: "lightbulb"
    },
    {
      title: "Workshops & Interactive Sessions",
      tag: "CAPABILITY",
      desc: "Hands-on masterclasses, business model canvas sessions, prototype development, and mentor interaction.",
      icon: "presentation"
    },
    {
      title: "Startup Ecosystem Support",
      tag: "INCUBATION",
      desc: "Connecting student ideas with campus incubation resources, faculty mentorship, prototype validation, and peer co-founders.",
      icon: "network"
    },
    {
      title: "Community & Membership Drives",
      tag: "ECOSYSTEM",
      desc: "Fostering an inclusive campus-wide community of aspiring innovators, co-founders, and cross-functional teams.",
      icon: "users"
    }
  ],

  // Flagship Activities & Supporting Initiatives
  flagshipActivities: [
    {
      name: "E-Week (Entrepreneurship Week)",
      type: "SIGNATURE FLAGSHIP",
      desc: "ASPERA's multi-day campus festival celebrating enterprise and creativity through intensive ideation bootcamps, problem-solving challenges, and student venture showcases."
    },
    {
      name: "E-Summit (Entrepreneurship Summit)",
      type: "SIGNATURE FLAGSHIP",
      desc: "The premier entrepreneurship convention uniting student innovators, industry pioneers, ecosystem partners, and keynote speakers for high-impact dialogues and venture opportunities."
    },
    {
      name: "Pitch Fest",
      type: "COMPETITION",
      desc: "Annual campus pitching arena where student innovators present ideas to invited industry mentors, alumni founders, and jury panels."
    },
    {
      name: "National Startup Day",
      type: "ANNUAL CELEBRATION",
      desc: "Commemorative symposium honoring India's vibrant startup landscape, featuring panel discussions, student exhibits, and keynote addresses."
    },
    {
      name: "Entrepreneurship Workshops",
      type: "SKILL BUILDING",
      desc: "Focused technical and business workshops on MVP validation, IP filing, unit economics, and go-to-market strategies."
    },
    {
      name: "Interactive Sessions",
      type: "FOUNDER FIRESIDES",
      desc: "Intimate fireside chats with alumni founders, venture mentors, and regional ecosystem leaders sharing candid entrepreneurial stories."
    },
    {
      name: "Membership Drives",
      type: "COMMUNITY ONBOARDING",
      desc: "Annual talent discovery and community orientation welcoming passionate student leaders into ASPERA's core functional cohorts."
    }
  ],

  // Official Core Leads (Strictly the 7 confirmed leads)
  team: [
    { name: "Sadhvi HM", designation: "E-Lead" },
    { name: "Chiranthan M S", designation: "Documentation Lead" },
    { name: "Thilak S", designation: "Event Management Lead" },
    { name: "Yatharth Agarwal", designation: "Finance Lead" },
    { name: "Suhani", designation: "Social Media Lead" },
    { name: "Yash Bharadwaj B S", designation: "Sponsorship Lead" },
    { name: "Priya", designation: "Marketing Lead" }
  ]
};
