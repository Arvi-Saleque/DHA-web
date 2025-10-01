import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { prisma } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

interface AdvisoryCommitteeData {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introContent: string;
  rolesTitle: string;
  rolesContent: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}

interface CommitteeMember {
  id: number;
  name: string;
  position: string;
  expertise: string;
  bio: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export default async function AdvisoryCommitteePage() {
  noStore(); // prevent caching

  // Fetch data from database
  const [advisoryCommitteeData, committeeMembers] = await Promise.all([
    prisma.advisoryCommittee.findUnique({ where: { id: 1 } }),
    prisma.committeeMember.findMany({ 
      where: { isActive: true }, 
      orderBy: { displayOrder: 'asc' } 
    })
  ]);

  // Fallback data if database records don't exist
  const pageData = advisoryCommitteeData || {
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
  };

  // Default committee members if none in database
  const defaultCommitteeMembers = [
    {
      name: 'Dr. Ahmed Hassan',
      position: 'Chairman',
      expertise: 'Islamic Studies & Educational Leadership',
      bio: 'Dr. Ahmed Hassan brings over 25 years of experience in Islamic education and institutional leadership. He holds a PhD in Islamic Studies and has served as an educational consultant for numerous Islamic institutions worldwide.',
      imageUrl: null,
      email: 'ahmed.hassan@example.com',
      phone: '+1-555-0101',
      linkedinUrl: 'https://linkedin.com/in/ahmed-hassan'
    },
    {
      name: 'Prof. Fatima Al-Zahra',
      position: 'Vice Chairwoman',
      expertise: 'Curriculum Development & Pedagogy',
      bio: 'Professor Fatima Al-Zahra is a renowned expert in Islamic curriculum development with over 20 years of experience in educational design and implementation. She has authored several books on modern Islamic pedagogy.',
      imageUrl: null,
      email: 'fatima.alzahra@example.com',
      phone: '+1-555-0102',
      linkedinUrl: 'https://linkedin.com/in/fatima-alzahra'
    },
    {
      name: 'Dr. Omar Malik',
      position: 'Academic Advisor',
      expertise: 'Higher Education & Research',
      bio: 'Dr. Omar Malik is a distinguished academic with expertise in higher education administration and Islamic research methodologies. He has published extensively on contemporary issues in Islamic education.',
      imageUrl: null,
      email: 'omar.malik@example.com',
      phone: '+1-555-0103',
      linkedinUrl: 'https://linkedin.com/in/omar-malik'
    },
    {
      name: 'Mrs. Aisha Rahman',
      position: 'Community Relations Advisor',
      expertise: 'Community Engagement & Outreach',
      bio: 'Mrs. Aisha Rahman has dedicated her career to building bridges between educational institutions and communities. She brings valuable insights into community needs and engagement strategies.',
      imageUrl: null,
      email: 'aisha.rahman@example.com',
      phone: '+1-555-0104',
      linkedinUrl: 'https://linkedin.com/in/aisha-rahman'
    },
    {
      name: 'Dr. Yusuf Ibrahim',
      position: 'Technology & Innovation Advisor',
      expertise: 'Educational Technology & Digital Learning',
      bio: 'Dr. Yusuf Ibrahim is a pioneer in educational technology with a focus on integrating modern digital tools with traditional Islamic education methods. He advises on our digital transformation initiatives.',
      imageUrl: null,
      email: 'yusuf.ibrahim@example.com',
      phone: '+1-555-0105',
      linkedinUrl: 'https://linkedin.com/in/yusuf-ibrahim'
    },
    {
      name: 'Prof. Khadija Nasir',
      position: 'Student Affairs Advisor',
      expertise: 'Student Development & Counseling',
      bio: 'Professor Khadija Nasir specializes in student development and Islamic counseling. She ensures our advisory committee maintains a student-centered approach in all decision-making processes.',
      imageUrl: null,
      email: 'khadija.nasir@example.com',
      phone: '+1-555-0106',
      linkedinUrl: 'https://linkedin.com/in/khadija-nasir'
    }
  ];

  const membersToDisplay = committeeMembers.length > 0 ? committeeMembers : defaultCommitteeMembers;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-12 backdrop-blur-sm">
              <svg className="w-10 h-10 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              {pageData.heroTitle.split(' ').slice(0, -1).join(' ')} <span className="text-yellow-300">{pageData.heroTitle.split(' ').slice(-1)}</span>
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-indigo-100 leading-relaxed font-medium">
                {pageData.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Introduction Content */}
            <div>
              <Card className="h-full bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 shadow-lg" padding="2xl">
                <div className="px-6 py-4 flex items-start mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center mr-8">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{pageData.introTitle}</h2>
                  </div>
                </div>
                
                <p className="px-6 text-lg text-gray-700 leading-relaxed mb-12 font-medium">
                  {pageData.introContent}
                </p>
                
                <div className="flex items-center p-6 bg-white rounded-lg border border-indigo-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-semibold">Strategic guidance for excellence</span>
                </div>
              </Card>
            </div>

            {/* Introduction Illustration */}
            <div>
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-20 text-center border border-indigo-200 shadow-lg">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-10 flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Expert Guidance</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Providing strategic direction and institutional oversight</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Members Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Meet Our <span className="text-indigo-600">Advisory Committee</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Distinguished professionals and scholars dedicated to advancing Islamic education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {membersToDisplay.map((member, index) => (
              <Card key={index} className="text-center border border-gray-200 shadow-lg" padding="2xl">
                <div className="mt-4 mb-10">
                  {member.imageUrl ? (
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-indigo-100"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto flex items-center justify-center border-4 border-indigo-100">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{member.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{member.position}</p>
                <p className="text-sm text-gray-600 mb-6 font-medium">{member.expertise}</p>
                <p className="text-gray-700 leading-relaxed mb-10 text-sm">{member.bio}</p>
                
                {/* Contact Information */}
                <div className="space-y-4 text-sm">
                  {member.email && (
                    <div className="flex items-center justify-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center justify-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{member.phone}</span>
                    </div>
                  )}
                  {member.linkedinUrl && (
                    <div className="mb-4 flex items-center justify-center">
                      <a 
                        href={member.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 font-medium flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles & Responsibilities Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Roles Illustration */}
            <div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-20 text-center border border-green-200 shadow-lg">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-10 flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Responsibilities</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Ensuring excellence through strategic oversight and guidance</p>
              </div>
            </div>

            {/* Roles Content */}
            <div>
              <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg" padding="2xl">
                <div className="px-6 py-4 flex items-start mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-8">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{pageData.rolesTitle}</h2>
                  </div>
                </div>
                
                <p className="px-6 text-lg text-gray-700 leading-relaxed mb-12 font-medium">
                  {pageData.rolesContent}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Strategic Planning</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Academic Oversight</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Quality Assurance</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Community Relations</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}