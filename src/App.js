/* eslint-disable */
import React, { useState } from 'react';
import { FiScissors, FiUser, FiPhone, FiMail, FiHome, FiArrowRight, FiChevronLeft, FiChevronRight, FiChevronDown, FiPlus, FiTrash2 , FiFacebook, FiInstagram,FiClock } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from 'react-helmet';
import { database } from './firebase';
import { ref, push } from "firebase/database";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    fabric: "",
    notes: "",
    contactTime: "",
    contactMethod: "",
    windows: [{
      height: "",
      width: "",
      id: Date.now()
    }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fabrics = [
    { name: "Onda perfeita" },
    { name: "Franzido" },
    { name: "Ilhós" }
  ];

  const contactTimes = [
    "Manhã (9h-12h)",
    "Tarde (14h-18h)",
    "Fim de tarde (18h-20h)",
    "Indiferente"
  ];

  const contactMethods = [
    { value: "phone", label: "Chamada telefónica" },
    { value: "email", label: "E-mail" },
    { value: "whatsapp", label: "WhatsApp" }
  ];

  const testimonials = [
    {
      name: "Ana Silva",
      location: "Cascais",
      content: "Os cortinados da Lúcia Decor transformaram completamente a minha sala. A qualidade dos materiais e o acabamento impecável superaram todas as minhas expectativas. O serviço foi profissional desde a primeira visita até à instalação final.",
      rating: 5
    },
    {
      name: "Carlos Mendes",
      location: "Ericeira",
      content: "Trabalho com a Lúcia Decor há vários anos em projetos de design de interiores. São sempre a minha primeira escolha pela qualidade dos tecidos, precisão nas medições e cumprimento rigoroso dos prazos combinados.",
      rating: 5
    },
    {
      name: "Isabel Fontes",
      location: "Mafra",
      content: "Fiquei impressionada com a atenção aos detalhes e o aconselhamento personalizado que recebi. As minhas cortinas não só são lindas como funcionam perfeitamente para controlar a luz natural. Recomendo sem reservas!",
      rating: 5
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWindowChange = (id, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      windows: prev.windows.map(window => 
        window.id === id ? { ...window, [name]: value } : window
      )
    }));
  };

  const addWindow = () => {
    setFormData(prev => ({
      ...prev,
      windows: [...prev.windows, { height: "", width: "", id: Date.now() }]
    }));
  };

  const removeWindow = (id) => {
    if (formData.windows.length > 1) {
      setFormData(prev => ({
        ...prev,
        windows: prev.windows.filter(window => window.id !== id)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Preparar dados completos para Firebase
      const firebaseData = {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        fabric: formData.fabric || '',
        notes: formData.notes || '',
        contactTime: formData.contactTime || '',
        contactMethod: formData.contactMethod || '',
        windows: formData.windows.map(window => ({
          height: window.height || '',
          width: window.width || '',
          id: window.id || Date.now()
        })),
        timestamp: new Date().toISOString()
      };

      // 2. Enviar dados completos para Firebase
      const leadsRef = ref(database, "leads");
      const firebaseResponse = await push(leadsRef, firebaseData);

      // 3. Preparar dados simplificados para Google Sheets
      const sheetsData = {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        fabric: formData.fabric || '',
        notes: formData.notes || '',
        contactTime: formData.contactTime || '',
        contactMethod: formData.contactMethod || '',
        timestamp: new Date().toISOString(),
        firebaseId: firebaseResponse.key
      };

      // 4. Enviar dados básicos para Google Sheets
      const scriptUrl = "https://script.google.com/macros/s/AKfycbxe4oNEwlGlqDcuKXLO7GJR8Q2B_XtXao1e2iIRM5Ltdr8ejd3-HRMte4lmNOA4eCSgyQ/exec";
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sheetsData)
      });

      // 5. Resetar formulário
      setSubmitSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        fabric: "",
        notes: "",
        contactTime: "",
        contactMethod: "",
        windows: [{
          height: "",
          width: "",
          id: Date.now()
        }]
      });

    } catch (error) {
      console.error("Erro no envio:", error);
      alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Configurações do carrossel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    arrows: window.innerWidth > 768,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 transition-all shadow-sm"
        onClick={onClick}
        aria-label="Próximo depoimento"
      >
        <FiChevronRight className="text-gray-700 w-5 h-5" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 transition-all shadow-sm"
        onClick={onClick}
        aria-label="Depoimento anterior"
      >
        <FiChevronLeft className="text-gray-700 w-5 h-5" />
      </div>
    );
  }

  const renderStars = (rating) => {
    return (
      <div className="flex justify-center mt-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Página Inicial",
        "item": "https://www.luciadecor.pt"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Orçamento",
        "item": "https://www.luciadecor.pt/orcamento"
      }
    ]
  };

  return (
    <div className="font-sans antialiased text-gray-700 bg-gray-50">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Cortinados Sob Medida em Lisboa | Lúcia Decor - Qualidade Premium</title>
        <meta name="title" content="Cortinados Sob Medida em Lisboa | Lúcia Decor - Qualidade Premium" />
        <meta name="description" content="Fabricação de cortinados personalizados de alta qualidade para sua casa ou projeto em Lisboa. Transforme suas janelas com os melhores tecidos e acabamentos profissionais." />
        <meta name="keywords" content="cortinados sob medida, cortinas personalizadas Lisboa, decoração de interiores, cortinados de qualidade, persianas, tecidos para cortinas, orçamento cortinados" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.luciadecor.pt" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.luciadecor.pt/" />
        <meta property="og:title" content="Cortinados Sob Medida em Lisboa | Lúcia Decor - Qualidade Premium" />
        <meta property="og:description" content="Fabricação de cortinados personalizados de alta qualidade para sua casa ou projeto em Lisboa. Transforme suas janelas com os melhores tecidos e acabamentos profissionais." />
        <meta property="og:image" content="https://www.luciadecor.pt/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_PT" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.luciadecor.pt/" />
        <meta property="twitter:title" content="Cortinados Sob Medida em Lisboa | Lúcia Decor - Qualidade Premium" />
        <meta property="twitter:description" content="Fabricação de cortinados personalizados de alta qualidade para sua casa ou projeto em Lisboa. Transforme suas janelas com os melhores tecidos e acabamentos profissionais." />
        <meta property="twitter:image" content="https://www.luciadecor.pt/images/twitter-image.jpg" />
        
        {/* Geo and Business Metadata */}
        <meta name="geo.region" content="PT" />
        <meta name="geo.placename" content="Mem Martins" />
        <meta name="geo.position" content="38.7979;-9.3511" />
        <meta name="ICBM" content="38.7979, -9.3511" />
        
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="your-verification-code" />
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="your-verification-code" />
        
        {/* Bing Site Verification */}
        <meta name="msvalidate.01" content="your-verification-code" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "name": "Lúcia Decor",
            "image": "https://www.luciadecor.pt/images/logo.jpg",
            "@id": "https://www.luciadecor.pt",
            "url": "https://www.luciadecor.pt",
            "telephone": "+351 219 210 344",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Largo Poço Nº 4",
              "addressLocality": "Mem Martins",
              "postalCode": "2725-419",
              "addressCountry": "PT"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "38.7979",
              "longitude": "-9.3511"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/luciadecor",
              "https://www.instagram.com/luciadecor"
            ]
          })}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Lúcia Decor",
            "description": "Fabricação de cortinados personalizados de alta qualidade para sua casa ou projeto em Lisboa.",
            "image": "https://www.luciadecor.pt/images/logo.jpg",
            "telephone": "+351 219 210 344",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Largo Poço Nº 4",
              "addressLocality": "Mem Martins",
              "postalCode": "2725-419",
              "addressCountry": "PT"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "38.7979",
              "longitude": "-9.3511"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "priceRange": "$$"
          })}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quanto tempo demora a produção de cortinados personalizados?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O tempo de produção varia conforme a complexidade do projeto, mas geralmente entregamos em 2-3 semanas após aprovação do orçamento."
                }
              },
              {
                "@type": "Question",
                "name": "Vocês fazem instalação dos cortinados?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim, oferecemos serviço completo que inclui medição, fabricação e instalação profissional em toda a área de Lisboa."
                }
              },
              {
                "@type": "Question",
                "name": "Quais tipos de tecidos estão disponíveis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trabalhamos com uma ampla variedade de tecidos incluindo linho, algodão, seda, blackout e materiais translúcidos, todos de alta qualidade."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Cabeçalho Minimalista */}
      <header className="bg-white py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <div className="w-28 h-10 bg-white flex items-center justify-center rounded overflow-hidden">
              <img 
                src="/images/logoldecor.jpg" 
                alt="Lúcia Decor - Cortinados Sob Medida em Lisboa" 
                className="w-auto h-full object-contain" 
                loading="lazy"
                width="112"
                height="40"
              />
            </div>
          </motion.div>
          
          <motion.button 
            onClick={scrollToContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="border border-gray-400 hover:border-gray-600 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide transition-all duration-300"
            aria-label="Solicitar orçamento de cortinados personalizados"
          >
            Solicitar Orçamento
          </motion.button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] sm:h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          
          <div className="absolute inset-0">
            <img
              src="/images/foto.jpeg"
              alt="Cortinados de luxo sob medida em Lisboa pela Lúcia Decor"
              className="w-full h-full object-cover object-center"
              loading="eager"
              width="1920"
              height="1080"
            />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 z-20 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-center px-4"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                Cortinados <span className="font-medium">Sob Medida</span>
              </h1>
              <p className="text-gray-200 mb-4 sm:mb-6 md:mb-8 leading-relaxed text-sm sm:text-base md:text-lg">
                Cortinados de alta qualidade, que combinam design e funcionalidade para valorizar o seu espaço.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            aria-hidden="true"
          >
            <FiChevronDown className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
        </section>

        {/* Seção Depoimentos */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14 md:mb-16">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-light text-gray-800 font-bold mb-3 sm:mb-4"
              >
                O Que Dizem Os Nossos Clientes
              </motion.h2>
              <div className="w-16 sm:w-20 h-px bg-gray-300 mx-auto mb-4 sm:mb-6"></div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Slider {...sliderSettings}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="px-2 sm:px-4 outline-none">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="bg-white p-6 sm:p-8 md:p-10 rounded-lg border border-gray-200 shadow-sm"
                      itemScope
                      itemType="https://schema.org/Review"
                    >
                      <div itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness">
                        <meta itemProp="name" content="Lúcia Decor" />
                      </div>
                      <div itemProp="author" itemScope itemType="https://schema.org/Person">
                        <meta itemProp="name" content={testimonial.name} />
                      </div>
                      <meta itemProp="datePublished" content="2023-01-01" />
                      <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                        <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                        <meta itemProp="bestRating" content="5" />
                      </div>
                      
                      <FaQuoteLeft className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8 mb-4 sm:mb-6 mx-auto" />
                      <p className="text-gray-700 italic text-center mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base" itemProp="reviewBody">
                        "{testimonial.content}"
                      </p>
                      <div className="text-center">
                        <h4 className="font-medium text-gray-800 text-base sm:text-lg" itemProp="author">{testimonial.name}</h4>
                        <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">{testimonial.location}</p>
                        {renderStars(testimonial.rating)}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>

        {/* Seção Contato */}
        <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
              >
                <div className="flex flex-col md:flex-row md:items-stretch">
                  {/* Texto à esquerda */}
                  <section className="bg-black text-white font-bold px-6 py-8 sm:py-10 md:py-12 lg:py-16 md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6" id="orcamento">
                      Solicite o Seu Orçamento
                    </h2>
                    <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      Preencha o formulário com os detalhes do seu projeto. A nossa equipa analisará cuidadosamente a informação e preparará uma proposta totalmente personalizada.
                    </p>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Comprometemo-nos a entrar em contacto consigo no prazo máximo de <strong>48 horas úteis</strong>.
                    </p>
                  </section>                 
                  
                  {/* Formulário à direita */}
                  <div className="md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    {submitSuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-6 sm:p-8 bg-gray-50 rounded-lg"
                      >
                        <div className="mb-4 sm:mb-6">
                          <svg className="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 text-gray-800">Pedido Recebido com Sucesso!</h3>
                        <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                          Agradecemos o seu interesse nos nossos cortinados personalizados. O seu pedido de orçamento foi registado com sucesso e já está em análise pela nossa equipa especializada.
                        </p>
                        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                          <p className="text-xs sm:text-sm text-gray-700 font-medium">
                            <span className="block mb-1">📌 O que acontece agora?</span>
                            <span className="block text-gray-600 font-normal">
                              - Nossa equipa entrará em contacto dentro de 48h<br />
                              - Prepararemos uma proposta personalizada
                            </span>
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSubmitSuccess(false)}
                          className="inline-flex items-center border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm tracking-wider transition-all duration-300"
                        >
                          <FiArrowRight className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                          Enviar Novo Pedido
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-6"
                        itemScope
                        itemType="https://schema.org/ContactPage"
                      >
                        <div itemScope itemType="https://schema.org/ContactPoint">
                          <div>
                            <label htmlFor="name" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-light text-gray-700">
                              Nome Completo*
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                              required
                              placeholder="Seu nome completo"
                              itemProp="name"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label htmlFor="email" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-light text-gray-700">
                                E-mail*
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                                required
                                placeholder="seu@email.com"
                                itemProp="email"
                              />
                            </div>
                            <div>
                              <label htmlFor="phone" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-light text-gray-700">
                                Telefone*
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                                required
                                placeholder="+351 ..."
                                itemProp="telephone"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Seção de Medidas das Janelas */}
                        <div className="space-y-4 sm:space-y-6">
                          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-4">Medidas das Janelas</h3>
                          
                          {formData.windows.map((window, index) => (
                            <div key={window.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 relative">
                              {formData.windows.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeWindow(window.id)}
                                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                                  aria-label={`Remover janela ${index + 1}`}
                                >
                                  <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                              )}
                              
                              <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                                Janela {index + 1}
                              </h4>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                  <label htmlFor={`height-${window.id}`} className="block mb-1 text-2xs sm:text-xs font-light text-gray-600">
                                    Altura (cm)*
                                  </label>
                                  <input
                                    type="number"
                                    id={`height-${window.id}`}
                                    name="height"
                                    value={window.height}
                                    onChange={(e) => handleWindowChange(window.id, e)}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                                    required
                                    placeholder="Ex: 250"
                                  />
                                </div>
                                <div>
                                  <label htmlFor={`width-${window.id}`} className="block mb-1 text-2xs sm:text-xs font-light text-gray-600">
                                    Largura (cm)*
                                  </label>
                                  <input
                                    type="number"
                                    id={`width-${window.id}`}
                                    name="width"
                                    value={window.width}
                                    onChange={(e) => handleWindowChange(window.id, e)}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                                    required
                                    placeholder="Ex: 180"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <motion.button
                            type="button"
                            onClick={addWindow}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-all"
                            aria-label="Adicionar outra janela"
                          >
                            <FiPlus className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                            Adicionar outra janela
                          </motion.button>
                        </div>

                        <div>
                          <label htmlFor="fabric" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-light text-gray-700">
                            Tipo de Cortinado*
                          </label>
                          <select
                            id="fabric"
                            name="fabric"
                            value={formData.fabric}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_0.75rem] sm:bg-[center_right_1rem]"
                            required
                          >
                            <option value="">Selecione uma opção</option>
                            {fabrics.map((fabric, index) => (
                              <option key={index} value={fabric.name}>{fabric.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="notes" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-light text-gray-700">
                            Observações
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                            rows="3"
                            placeholder="Descreva aqui qualquer detalhe adicional, preferências específicas ou dúvidas que queira partilhar connosco. Esta informação ajudará-nos a preparar um orçamento mais preciso e personalizado para as suas necessidades."
                            itemProp="description"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <label htmlFor="contactTime" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-light text-gray-700">
                              Melhor horário para contacto*
                            </label>
                            <select
                              id="contactTime"
                              name="contactTime"
                              value={formData.contactTime}
                              onChange={handleChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_0.75rem] sm:bg-[center_right_1rem]"
                              required
                            >
                              <option value="">Selecione um horário</option>
                              {contactTimes.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="contactMethod" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-light text-gray-700">
                              Preferência de contacto*
                            </label>
                            <select
                              id="contactMethod"
                              name="contactMethod"
                              value={formData.contactMethod}
                              onChange={handleChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_0.75rem] sm:bg-[center_right_1rem]"
                              required
                            >
                              <option value="">Selecione um método</option>
                              {contactMethods.map((method, index) => (
                                <option key={index} value={method.value}>{method.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="pt-1 sm:pt-2">
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-black hover:bg-gray-800 text-white font-light py-2 sm:py-3 px-4 sm:px-6 rounded text-xs sm:text-sm tracking-wider transition-all duration-300 flex items-center justify-center"
                            aria-label="Enviar solicitação de orçamento"
                          >
                            {isSubmitting ? 'A Enviar...' : 'Solicitar Orçamento'}
                          </motion.button>
                        </div>
                      </motion.form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
     <footer className="bg-black text-gray-300 pt-12 pb-6 border-t border-gray-800">
  <div className="container mx-auto px-5">
    {/* Conteúdo Principal */}
    <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
      
      {/* Seção Horário */}
      <div className="flex-1 max-w-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gray-700 p-2 rounded-lg">
            <FiClock className="text-white w-5 h-5" />
          </div>
          <h3 className="text-white font-medium text-sm uppercase tracking-wider">Horário de Funcionamento</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between py-1.5 border-b border-gray-800">
            <span>Segunda a Sexta</span>
            <span className="font-medium">10h - 20h</span>
          </li>
          <li className="flex justify-between py-1.5 border-b border-gray-800">
            <span>Sábado</span>
            <span className="font-medium">10h - 19h</span>
          </li>
          <li className="flex justify-between py-1.5">
            <span>Domingo</span>
            <span className="text-gray-500">Fechado</span>
          </li>
        </ul>
      </div>

      {/* Seção Contato */}
      <div className="flex-1 max-w-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gray-700 p-2 rounded-lg">
            <FiPhone className="text-white w-5 h-5" />
          </div>
          <h3 className="text-white font-medium text-sm uppercase tracking-wider">Contacte-nos</h3>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3 hover:text-white transition-colors">
            <FiMail className="flex-shrink-0 w-4 h-4" />
            <span>lucia_decor@hotmail.com</span>
          </li>
          <li className="flex items-center gap-3 hover:text-white transition-colors">
            <FiPhone className="flex-shrink-0 w-4 h-4" />
            <span>219 210 344</span>
          </li>
          <li className="flex items-start gap-3 hover:text-white transition-colors">
            <FiHome className="flex-shrink-0 w-4 h-4 mt-0.5" />
            <a href="https://goo.gl/maps/example" target="_blank" rel="noopener">
              Largo Poço Nº4, 2725-419 Mem Martins
            </a>
          </li>
        </ul>
      </div>

      {/* Seção Redes Sociais */}
      <div className="flex-1 max-w-xs">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-white font-medium text-sm uppercase tracking-wider">Redes Sociais</h3>
        </div>
        <div className="flex gap-4">
          <a href="https://facebook.com/Luciadecorofficial" 
             target="_blank"
             rel="noopener"
             className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
            <FiFacebook className="w-5 h-5" />
          </a>
          <a href="https://instagram.com/luciadecorofficial" 
             target="_blank"
             rel="noopener"
             className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
            <FiInstagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>

    {/* Rodapé Inferior */}
    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Lúcia Decor. Todos os direitos reservados.
      </div>

    </div>
  </div>
</footer>
    </div>
  );
};

export default App;