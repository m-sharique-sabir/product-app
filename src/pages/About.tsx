import { Mail, Phone, MessageCircle, MapPin, Linkedin, Github, ExternalLink, Code2, Database, Layout, Smartphone, Palette, Zap } from 'lucide-react';

const About = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <img
                src="/m-sharique-sabir.jpeg"
                alt="Mohammad Sharique Sabir"
                className="w-40 h-40 md:w-52 md:h-52 rounded-2xl border-4 border-white/30 shadow-2xl object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
                Mohammad Sharique Sabir
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 font-medium mb-4">
                Full Stack Developer
              </p>
              <p className="text-indigo-200 text-sm md:text-base max-w-xl">
                React &middot; Next.js &middot; Laravel &middot; MERN Stack Specialist
              </p>
              <p className="text-indigo-300 text-sm mt-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Islamabad, Pakistan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I'm Mohammad Sharique Sabir, a Full Stack Developer with <span className="font-semibold text-indigo-600 dark:text-indigo-400">4 years of experience</span> in the software industry, including <span className="font-semibold text-indigo-600 dark:text-indigo-400">2+ years at Gigbitesoft.com</span>, where I built scalable, production-grade web applications and enterprise SaaS platforms.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            At Gigbitesoft.com, I developed complete SaaS websites — handling everything from frontend and backend to database architecture and UI/UX design. I specialize in React 19, Next.js, Laravel 13, and the MERN Stack (MongoDB, Express.js, React, Node.js), delivering complete systems from database design to pixel-perfect interfaces.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-600 rounded-r-xl p-6 mt-8">
            <p className="text-lg text-gray-800 dark:text-gray-200 font-medium italic">
              "I don't just build interfaces — I build complete systems."
            </p>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-20 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What I Do</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layout, title: "Complete SaaS Websites", desc: "Frontend, backend, database — all in one place" },
              { icon: Database, title: "MERN Stack Development", desc: "MongoDB, Express.js, React, Node.js" },
              { icon: Code2, title: "Custom Business Websites", desc: "A professional online presence for your company" },
              { icon: Smartphone, title: "Mobile Apps", desc: "For both Android and iOS platforms" },
              { icon: Palette, title: "UI/UX Design", desc: "Modern, user-friendly, and responsive interfaces" },
              { icon: Zap, title: "API Integration & Real-time Systems", desc: "WebSockets, AI features, and more" },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              If you need a website or mobile app for your business — whether it's a simple business site or a full SaaS platform — I can handle everything for you, from database to deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-indigo-600 dark:border-indigo-400 pl-8 ml-4">
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full border-4 border-white dark:border-gray-900"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Full Stack Developer</h3>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-1 sm:mt-0">Gigbitesoft.com</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">2+ years</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Working on production-grade web applications and SaaS platforms, designing complete frontend-backend architecture, and delivering projects end-to-end.
              </p>
            </div>
            <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/50">
              <p className="text-gray-700 dark:text-gray-300">
                Total software industry experience: <span className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">4 years</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-20 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Work With Me</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              "Full Stack ownership — from database design to live deployment",
              "SaaS architecture experience — multi-tenancy, roles, real-time systems, AI integration",
              "MERN & Laravel expertise — versatile across modern tech stacks",
              "Production-ready code — not just tutorials or demos",
              "Independent execution — minimal supervision needed",
              "Proven track record — real apps, real users, real systems",
            ].map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Me</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">Get in touch today for your website or mobile app project.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: MapPin, label: "Islamabad, Pakistan", href: null },
            { icon: Phone, label: "+92-339-2409950", href: "tel:+923392409950" },
            { icon: MessageCircle, label: "WhatsApp: +92-339-2409950", href: "https://wa.me/923392409950" },
            { icon: Mail, label: "mohammadsharique2409950@gmail.com", href: "mailto:mohammadsharique2409950@gmail.com" },
            { icon: Linkedin, label: "linkedin.com/in/m-sharique-sabir", href: "https://www.linkedin.com/in/m-sharique-sabir" },
            { icon: Github, label: "github.com/m-sharique-sabir", href: "https://github.com/m-sharique-sabir" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
            >
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="min-w-0">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 truncate"
                  >
                    {item.label}
                    {item.href.startsWith("http") && <ExternalLink className="w-3 h-3 flex-shrink-0" />}
                  </a>
                ) : (
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default About;
