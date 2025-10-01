import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.heroSection.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titleLine1: 'Excellence in',
      titleLine2: 'Islamic Education',
      subtitle:
        'Nurturing young minds with traditional Islamic values and modern educational excellence. Join our community of learners dedicated to academic achievement and spiritual growth.',
      bgImageUrl:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      cta1Text: 'Apply Now',
      cta1Href: '/admissions/apply',
      cta2Text: 'Learn More',
      cta2Href: '/about',
      features: [
        { title: 'Quality Education', description: 'Comprehensive Islamic curriculum with modern teaching methods' },
        { title: 'Expert Faculty', description: 'Experienced teachers dedicated to student success and character building' },
        { title: 'Modern Facilities', description: 'State-of-the-art campus with digital learning resources' },
      ],
    },
  });

  // Seed About Us Page data
  await prisma.aboutUsPage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: 'About Our Madrasa',
      heroSubtitle: 'Dedicated to providing exceptional Islamic education that nurtures both spiritual growth and academic excellence, preparing students for success in this world and the hereafter.',
      historyTitle: 'Our History',
      historyContent1: 'Established in 2010 with a vision to blend traditional Islamic teachings with modern educational methods, our madrasa has been serving the community for over a decade. We pride ourselves on creating an environment where students can grow academically, spiritually, and socially.',
      historyContent2: 'From humble beginnings with just 50 students, we have grown to become one of the most respected Islamic educational institutions in the region, maintaining our commitment to quality education and character development.',
      ctaTitle: 'Join Our Community',
      ctaSubtitle: 'Become part of our educational family and experience the transformative power of quality Islamic education in a nurturing environment.',
      ctaButton1Text: 'Apply for Admission',
      ctaButton1Link: '/admissions/apply',
      ctaButton2Text: 'Contact Us',
      ctaButton2Link: '/contact'
    }
  });

  // Seed About Section (for homepage)
  await prisma.aboutSection.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      mission: 'Our mission is to provide exceptional Islamic education that nurtures both spiritual growth and academic excellence, preparing students to become responsible citizens and leaders in their communities while maintaining strong Islamic values and principles.',
      vision: 'To be a leading institution in Islamic education, recognized for our commitment to excellence, innovation, and the holistic development of our students, creating future leaders who will contribute positively to society.',
      description: 'Established with a vision to blend traditional Islamic teachings with modern educational methods, our madrasa has been serving the community for years. We pride ourselves on creating an environment where students can grow academically, spiritually, and socially.',
      yearEstablished: '2010',
      totalStudents: '500+',
      graduatedStudents: '1200+',
      qualifiedTeachers: '25'
    }
  });

  // Seed Statistics
  const statistics = [
    { title: 'Years of Excellence', value: '15+', iconType: 'calendar', color: 'blue', displayOrder: 1 },
    { title: 'Current Students', value: '500+', iconType: 'students', color: 'green', displayOrder: 2 },
    { title: 'Graduates', value: '1200+', iconType: 'graduation', color: 'purple', displayOrder: 3 },
    { title: 'Qualified Teachers', value: '25', iconType: 'teachers', color: 'yellow', displayOrder: 4 }
  ];

  for (const stat of statistics) {
    await prisma.aboutStatistic.upsert({
      where: { id: stat.displayOrder },
      update: stat,
      create: { id: stat.displayOrder, ...stat }
    });
  }

  // Seed Core Values
  const coreValues = [
    {
      title: 'Excellence in Education',
      description: 'We strive for the highest standards in Islamic education, combining traditional teachings with modern pedagogical methods to ensure comprehensive learning.',
      iconType: 'excellence',
      displayOrder: 1
    },
    {
      title: 'Character Development',
      description: 'Building strong moral character and ethical values based on Islamic principles, preparing students to be responsible members of society.',
      iconType: 'compassion',
      displayOrder: 2
    },
    {
      title: 'Community Service',
      description: 'Encouraging active participation in community development and social welfare, fostering a spirit of service and compassion.',
      iconType: 'community',
      displayOrder: 3
    }
  ];

  for (const value of coreValues) {
    await prisma.coreValue.upsert({
      where: { id: value.displayOrder },
      update: value,
      create: { id: value.displayOrder, ...value }
    });
  }

  // Seed Leadership Members
  const leadership = [
    {
      name: 'Dr. Muhammad Abdullah',
      position: 'Principal & Chief Administrator',
      description: 'With over 20 years of experience in Islamic education, Dr. Abdullah leads our institution with wisdom and dedication to academic excellence and character development.',
      email: 'principal@madrasa.edu',
      phone: '+1 (555) 123-4567',
      displayOrder: 1
    },
    {
      name: 'Ustadh Ahmad Hassan',
      position: 'Academic Director',
      description: 'A renowned scholar specializing in Quranic studies and Arabic literature, overseeing our comprehensive academic programs and curriculum development.',
      email: 'academic@madrasa.edu',
      phone: '+1 (555) 123-4568',
      displayOrder: 2
    },
    {
      name: 'Sister Fatima Al-Zahra',
      position: 'Student Affairs Coordinator',
      description: 'Dedicated to student welfare and development, ensuring a supportive learning environment that promotes both academic success and personal growth.',
      email: 'student.affairs@madrasa.edu',
      phone: '+1 (555) 123-4569',
      displayOrder: 3
    }
  ];

  for (const leader of leadership) {
    await prisma.leadershipMember.upsert({
      where: { id: leader.displayOrder },
      update: leader,
      create: { id: leader.displayOrder, ...leader }
    });
  }

  // Seed Mission & Vision data
  await prisma.missionVision.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "Our Mission & Vision",
      heroSubtitle: "Discover the driving force behind our commitment to excellence in Islamic education and our vision for the future.",
      missionTitle: "Our Mission",
      missionContent: "To provide exceptional Islamic education that nurtures both spiritual growth and academic excellence, preparing students to become responsible citizens and leaders in their communities while maintaining strong Islamic values and principles.",
      visionTitle: "Our Vision",
      visionContent: "To be a leading institution in Islamic education, recognized for our commitment to excellence, innovation, and the holistic development of our students, creating future leaders who will contribute positively to society.",
      goalTitle: "Our Goals",
      goalContent: "We strive to create an environment where students excel academically while developing strong moral character, critical thinking skills, and a deep understanding of Islamic principles that will guide them throughout their lives.",
      ctaTitle: "Join Our Journey",
      ctaSubtitle: "Be part of our mission to transform lives through quality Islamic education",
      ctaButtonText: "Get Involved",
      ctaButtonLink: "/contact"
    }
  });

  // Seed Advisory Committee data
  await prisma.advisoryCommittee.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "Advisory Committee",
      heroSubtitle: "Distinguished leaders and experts guiding our institution towards excellence in Islamic education and community development.",
      introTitle: "Our Advisory Board",
      introContent: "Our Advisory Committee comprises distinguished professionals, scholars, and community leaders who provide strategic guidance and oversight to ensure our institution maintains the highest standards of Islamic education while adapting to contemporary educational needs.",
      rolesTitle: "Committee Roles & Responsibilities",
      rolesContent: "The Advisory Committee plays a crucial role in shaping our institution's strategic direction, reviewing academic programs, ensuring compliance with educational standards, and fostering community partnerships that enhance our students' learning experience.",
      ctaTitle: "Join Our Advisory Network",
      ctaSubtitle: "We welcome qualified professionals and community leaders to contribute to our mission",
      ctaButtonText: "Get Involved",
      ctaButtonLink: "/contact"
    }
  });

  // Seed Committee Members
  const committeeMembers = [
    {
      name: 'Dr. Ahmed Hassan',
      position: 'Chairman',
      expertise: 'Islamic Studies & Educational Leadership',
      bio: 'Dr. Ahmed Hassan brings over 25 years of experience in Islamic education and institutional leadership. He holds a PhD in Islamic Studies and has served as an educational consultant for numerous Islamic institutions worldwide.',
      email: 'ahmed.hassan@example.com',
      phone: '+1-555-0101',
      linkedinUrl: 'https://linkedin.com/in/ahmed-hassan',
      displayOrder: 1
    },
    {
      name: 'Prof. Fatima Al-Zahra',
      position: 'Vice Chairwoman',
      expertise: 'Curriculum Development & Pedagogy',
      bio: 'Professor Fatima Al-Zahra is a renowned expert in Islamic curriculum development with over 20 years of experience in educational design and implementation. She has authored several books on modern Islamic pedagogy.',
      email: 'fatima.alzahra@example.com',
      phone: '+1-555-0102',
      linkedinUrl: 'https://linkedin.com/in/fatima-alzahra',
      displayOrder: 2
    },
    {
      name: 'Dr. Omar Malik',
      position: 'Academic Advisor',
      expertise: 'Higher Education & Research',
      bio: 'Dr. Omar Malik is a distinguished academic with expertise in higher education administration and Islamic research methodologies. He has published extensively on contemporary issues in Islamic education.',
      email: 'omar.malik@example.com',
      phone: '+1-555-0103',
      linkedinUrl: 'https://linkedin.com/in/omar-malik',
      displayOrder: 3
    },
    {
      name: 'Mrs. Aisha Rahman',
      position: 'Community Relations Advisor',
      expertise: 'Community Engagement & Outreach',
      bio: 'Mrs. Aisha Rahman has dedicated her career to building bridges between educational institutions and communities. She brings valuable insights into community needs and engagement strategies.',
      email: 'aisha.rahman@example.com',
      phone: '+1-555-0104',
      linkedinUrl: 'https://linkedin.com/in/aisha-rahman',
      displayOrder: 4
    },
    {
      name: 'Dr. Yusuf Ibrahim',
      position: 'Technology & Innovation Advisor',
      expertise: 'Educational Technology & Digital Learning',
      bio: 'Dr. Yusuf Ibrahim is a pioneer in educational technology with a focus on integrating modern digital tools with traditional Islamic education methods. He advises on our digital transformation initiatives.',
      email: 'yusuf.ibrahim@example.com',
      phone: '+1-555-0105',
      linkedinUrl: 'https://linkedin.com/in/yusuf-ibrahim',
      displayOrder: 5
    },
    {
      name: 'Prof. Khadija Nasir',
      position: 'Student Affairs Advisor',
      expertise: 'Student Development & Counseling',
      bio: 'Professor Khadija Nasir specializes in student development and Islamic counseling. She ensures our advisory committee maintains a student-centered approach in all decision-making processes.',
      email: 'khadija.nasir@example.com',
      phone: '+1-555-0106',
      linkedinUrl: 'https://linkedin.com/in/khadija-nasir',
      displayOrder: 6
    }
  ];

  for (const member of committeeMembers) {
    await prisma.committeeMember.upsert({
      where: { 
        id: member.displayOrder
      },
      update: {},
      create: member
    });
  }

  // Seed Chairman Message data
  await prisma.chairmanMessage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "Chairman's Message",
      heroSubtitle: "A message from our esteemed Chairman about our vision, mission, and commitment to excellence in Islamic education and community development.",
      chairmanName: "Dr. Muhammad Al-Rashid",
      chairmanTitle: "Chairman of the Board",
      chairmanImage: "/images/chairman-placeholder.jpg",
      messageTitle: "Welcome to Our Institution",
      messageContent: "Assalamu Alaikum wa Rahmatullahi wa Barakatuh. It is with great pleasure and humility that I welcome you to our esteemed institution. As Chairman of the Board, I am honored to lead an organization that has been at the forefront of Islamic education for decades. Our commitment to excellence in both religious and academic education remains unwavering, as we strive to nurture the next generation of Muslim leaders who will contribute positively to society while maintaining their Islamic identity and values.",
      visionTitle: "Our Vision for the Future",
      visionContent: "We envision a future where our graduates become beacons of knowledge, wisdom, and moral excellence in their communities. Our institution serves as a bridge between traditional Islamic scholarship and contemporary educational needs, ensuring that our students are well-equipped to face the challenges of the modern world while remaining firmly rooted in their faith. We are committed to fostering an environment of intellectual curiosity, spiritual growth, and character development.",
      achievementsTitle: "Our Achievements and Milestones",
      achievementsContent: "Over the years, we have achieved remarkable milestones that reflect our dedication to educational excellence. Our graduates have gone on to become successful professionals, scholars, and community leaders across various fields. We have established partnerships with renowned institutions worldwide, expanded our academic programs, and continuously improved our facilities to provide the best learning environment for our students.",
      closingMessage: "I invite you to join us in this noble journey of education and character building. Together, we can create a brighter future for our community and contribute to the betterment of society as a whole. May Allah bless our efforts and guide us on the path of righteousness.",
      signature: "Dr. Muhammad Al-Rashid"
    }
  });

  console.log('✅ Chairman Message data seeded successfully');

  console.log('🌱 Database seeded successfully!');
}

main().finally(async () => {
  await prisma.$disconnect();
});
