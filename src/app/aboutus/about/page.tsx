import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import { prisma } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

// Icon component helper
const getIcon = (iconType: string, className: string = "w-8 h-8") => {
  const iconClasses = `${className} text-blue-600`;
  switch (iconType) {
    case 'calendar':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'students':
      return (
        <svg className={`${className} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      );
    case 'graduation':
      return (
        <svg className={`${className} text-purple-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case 'teachers':
      return (
        <svg className={`${className} text-yellow-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'excellence':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case 'compassion':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'integrity':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'community':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

export default async function AboutUsPage() {
  noStore(); // prevent caching

  // Fetch data from database
  const [aboutSection, aboutUsPage, statistics, coreValues, leadership] = await Promise.all([
    prisma.aboutSection.findUnique({ where: { id: 1 } }),
    prisma.aboutUsPage.findUnique({ where: { id: 1 } }),
    prisma.aboutStatistic.findMany({ 
      where: { isActive: true }, 
      orderBy: { displayOrder: 'asc' } 
    }),
    prisma.coreValue.findMany({ 
      where: { isActive: true }, 
      orderBy: { displayOrder: 'asc' } 
    }),
    prisma.leadershipMember.findMany({ 
      where: { isActive: true }, 
      orderBy: { displayOrder: 'asc' } 
    })
  ]);

  // Fallback data if database records don't exist
  const pageData = aboutUsPage || {
    heroTitle: "About Our Madrasa",
    heroSubtitle: "Dedicated to providing exceptional Islamic education that nurtures both spiritual growth and academic excellence, preparing students for success in this world and the hereafter.",
    historyTitle: "Our History",
    historyContent1: "Established in 2010 with a vision to blend traditional Islamic teachings with modern educational methods, our madrasa has been serving the community for over a decade.",
    historyContent2: "From humble beginnings with just 50 students, we have grown to become one of the most respected Islamic educational institutions in the region.",
    ctaTitle: "Join Our Community",
    ctaSubtitle: "Become part of our educational family and experience the transformative power of quality Islamic education in a nurturing environment.",
    ctaButton1Text: "Apply for Admission",
    ctaButton1Link: "/admissions/apply",
    ctaButton2Text: "Contact Us",
    ctaButton2Link: "/contact"
  };

  const missionVisionData = aboutSection || {
    mission: "Our mission is to provide exceptional Islamic education that nurtures both spiritual growth and academic excellence, preparing students to become responsible citizens and leaders in their communities while maintaining strong Islamic values and principles.",
    vision: "To be a leading institution in Islamic education, recognized for our commitment to excellence, innovation, and the holistic development of our students, creating future leaders who will contribute positively to society."
  };

  // Default statistics if none in database
  const defaultStatistics = [
    { title: 'Years of Excellence', value: '15+', iconType: 'calendar', color: 'blue' },
    { title: 'Current Students', value: '500+', iconType: 'students', color: 'green' },
    { title: 'Graduates', value: '1200+', iconType: 'graduation', color: 'purple' },
    { title: 'Qualified Teachers', value: '25', iconType: 'teachers', color: 'yellow' }
  ];

  const statsToDisplay = statistics.length > 0 ? statistics : defaultStatistics;

  // Default core values if none in database
  const defaultCoreValues = [
    {
      title: 'Excellence in Education',
      description: 'We strive for the highest standards in Islamic education, combining traditional teachings with modern pedagogical methods to ensure comprehensive learning.',
      iconType: 'excellence'
    },
    {
      title: 'Character Development',
      description: 'Building strong moral character and ethical values based on Islamic principles, preparing students to be responsible members of society.',
      iconType: 'compassion'
    },
    {
      title: 'Community Service',
      description: 'Encouraging active participation in community development and social welfare, fostering a spirit of service and compassion.',
      iconType: 'community'
    }
  ];

  const valuesToDisplay = coreValues.length > 0 ? coreValues : defaultCoreValues;

  // Default leadership if none in database
  const defaultLeadership = [
    {
      name: 'Dr. Muhammad Abdullah',
      position: 'Principal & Chief Administrator',
      description: 'With over 20 years of experience in Islamic education, Dr. Abdullah leads our institution with wisdom and dedication.',
      imageUrl: null,
      email: 'principal@madrasa.edu',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Ustadh Ahmad Hassan',
      position: 'Academic Director',
      description: 'A renowned scholar specializing in Quranic studies and Arabic literature, overseeing our academic programs.',
      imageUrl: null,
      email: 'academic@madrasa.edu',
      phone: '+1 (555) 123-4568'
    },
    {
      name: 'Sister Fatima Al-Zahra',
      position: 'Student Affairs Coordinator',
      description: 'Dedicated to student welfare and development, ensuring a supportive learning environment for all students.',
      imageUrl: null,
      email: 'student.affairs@madrasa.edu',
      phone: '+1 (555) 123-4569'
    }
  ];

  const leadershipToDisplay = leadership.length > 0 ? leadership : defaultLeadership;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {pageData.heroTitle.split(' ').slice(0, -1).join(' ')} <span className="text-yellow-300">{pageData.heroTitle.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              {pageData.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Impact</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to educational excellence and community service
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {statsToDisplay.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={getIcon(stat.iconType)}
                color={stat.color as any}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <Card className="" shadow="lg" border={true}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {missionVisionData.mission}
              </p>
            </Card>

            {/* Vision */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white" shadow="lg" border={false}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-blue-100 leading-relaxed text-lg">
                {missionVisionData.vision}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The fundamental principles that guide our educational approach and community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesToDisplay.map((value, index) => (
              <Card key={index} className="text-center group" hover={true} border={true}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  {getIcon(value.iconType)}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {pageData.historyTitle.split(' ').slice(0, -1).join(' ')} <span className="text-blue-600">{pageData.historyTitle.split(' ').slice(-1)}</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {pageData.historyContent1}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {pageData.historyContent2}
                </p>
                <div className="pt-4">
                  <Button variant="primary" size="lg">
                    Learn More About Our Journey
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white" shadow="lg">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Founded in 2010</h3>
                  <p className="text-yellow-100">
                    With a commitment to excellence in Islamic education and community service
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Leadership</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated individuals who guide our institution with wisdom and experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipToDisplay.map((leader, index) => (
              <Card key={index} className="text-center" hover={true} border={true}>
                {leader.imageUrl ? (
                  <img 
                    src={leader.imageUrl} 
                    alt={leader.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h4>
                <p className="text-blue-600 font-medium mb-4">{leader.position}</p>
                <p className="text-gray-600 leading-relaxed text-sm">{leader.description}</p>
                {(leader.email || leader.phone) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {leader.email && (
                      <p className="text-xs text-gray-500 mb-1">
                        <span className="font-medium">Email:</span> {leader.email}
                      </p>
                    )}
                    {leader.phone && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Phone:</span> {leader.phone}
                      </p>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {pageData.ctaTitle.split(' ').slice(0, -1).join(' ')} <span className="text-yellow-300">{pageData.ctaTitle.split(' ').slice(-1)}</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            {pageData.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {pageData.ctaButton1Text}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              {pageData.ctaButton2Text}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}