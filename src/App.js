/* eslint-disable */
import React, { useState } from 'react';
import { FiScissors, FiUser, FiPhone, FiMail, FiHome, FiArrowRight, FiChevronLeft, FiChevronRight, FiChevronDown, FiPlus, FiTrash2 } from 'react-icons/fi';
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
      role: "Cascais",
      content: "Os cortinados da Lúcia Decor elevaram os meus projectos a outro nível. A qualidade dos tecidos e o acabamento detalhado dão um toque de sofisticação a qualquer espaço.",
      rating: 5
    },
    {
      name: "Carlos Mendes",
      role: "Ericeira",
      content: "Colaboro com a Lúcia Decor há vários anos e recomendo sem hesitar. Profissionalismo, atenção ao detalhe e cumprimento rigoroso de prazos.",
      rating: 5
    },
    {
      name: "Isabel Fontes",
      role: "Mafra",
      content: "O resultado superou as minhas expectativas! As cortinas ficaram perfeitas e fui acompanhada com simpatia e profissionalismo em todas as fases.",
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

      // 3. Preparar dados simplificados para Google Sheets (apenas dados do cliente)
      const sheetsData = {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        fabric: formData.fabric || '',
        notes: formData.notes || '',
        contactTime: formData.contactTime || '',
        contactMethod: formData.contactMethod || '',
        timestamp: new Date().toISOString(),
        firebaseId: firebaseResponse.key // Armazena a referência do Firebase
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
      alert("Dados recebidos! Entraremos em contato em breve.");
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
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-2 transition-all"
        onClick={onClick}
      >
        <FiChevronRight className="text-gray-700" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-2 transition-all"
        onClick={onClick}
      >
        <FiChevronLeft className="text-gray-700" />
      </div>
    );
  }

  const renderStars = (rating) => {
    return (
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
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

  return (
    <div className="font-sans antialiased text-gray-700 bg-gray-50">
      <Helmet>
        <title>Cortinados sob medida com elegância e qualidade | Lúcia Decor</title>
        <meta name="description" content="Cortinados personalizados de alta qualidade para sua casa ou projeto. Transforme suas janelas em obras de arte funcional com a Lúcia Decor." />
        <meta name="keywords" content="cortinados sob medida, cortinas personalizadas, decoração de interiores, cortinados Lisboa, cortinas de qualidade" />
        <meta property="og:title" content="Cortinados sob medida com elegância e qualidade | Lúcia Decor" />
        <meta property="og:description" content="Cortinados personalizados de alta qualidade para sua casa ou projeto." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.luciadecor.pt" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Lúcia Decor",
              "image": "",
              "@id": "",
              "url": "https://www.luciadecor.pt",
              "telephone": "+351 219 210 344",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Largo Poço Nº 4",
                "addressLocality": "Mem Martins",
                "postalCode": "2725-419",
                "addressCountry": "PT"
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
              }
            }
          `}
        </script>
      </Helmet>

      {/* Cabeçalho Minimalista */}
      <header className="bg-white py-6 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <div className="w-32 h-12 bg-white flex items-center justify-center rounded overflow-hidden">
              <img src="/images/logoldecor.jpg" alt="Lúcia Decor Logo" className="w-auto h-full object-contain" />
            </div>
          </motion.div>
          
          <motion.button 
            onClick={scrollToContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="border border-gray-400 hover:border-gray-600 px-4 md:px-6 py-2 rounded-full text-sm tracking-wide transition-all duration-300"
          >
            Solicitar Orçamento
          </motion.button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          
          <div className="absolute inset-0">
            <img
              src="/images/foto.jpeg"
              alt="Cortinados de luxo sob medida"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="container mx-auto px-6 z-20 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-center"
            >
              <h1 className="text-3xl md:text-5xl font-light text-white mb-4 md:mb-6 leading-tight">
                Cortinados <span className="font-medium">Sob Medida</span>
              </h1>
              <p className="text-gray-200 mb-6 md:mb-8 leading-relaxed text-base md:text-lg px-4 md:px-0">
                Cortinados de alta qualidade, que combinam design e funcionalidade para valorizar o seu espaço.
              </p>

              <motion.button 
                onClick={scrollToContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block border border-white text-white font-bold hover:bg-white/20 px-6 md:px-8 py-2 md:py-3 rounded-full text-sm tracking-wider transition-all duration-300"
              >
                Solicite Orçamento
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <FiChevronDown className="text-white w-8 h-8" />
          </motion.div>
        </section>

        {/* Seção Depoimentos */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-light text-gray-800 font-bold mb-4"
              >
                O Que Nossos Clientes Dizem
              </motion.h2>
              <div className="w-20 h-px bg-gray-300 mx-auto mb-6"></div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Slider {...sliderSettings}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="px-4 outline-none">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="bg-white p-10 rounded border-2 border-black"
                    >
                      <FaQuoteLeft className="text-gray-500 w-8 h-8 mb-6 mx-auto" />
                      <p className="text-gray-700 italic text-center mb-8 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="text-center">
                        <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm mb-2">{testimonial.role}</p>
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
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
              >
                <div className="md:flex md:items-stretch">
                  {/* Texto à esquerda */}
                  <section className="bg-black text-white font-bold px-6 py-12 md:py-20 md:px-12 md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-light mb-6" id="orcamento">
                      Solicite o Seu Orçamento
                    </h2>
                    <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg">
                      Preencha o formulário ao lado com os detalhes do seu <strong>projecto</strong>. A nossa equipa analisará cuidadosamente a informação e preparará uma proposta totalmente personalizada.
                    </p>
                    <p className="text-gray-300 text-sm md:text-base">
                      Comprometemo-nos a entrar em contacto consigo com o orçamento no prazo máximo de <strong>48 horas úteis</strong>.
                    </p>
                  </section>                 
                  {/* Formulário à direita */}
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    {submitSuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-8 bg-gray-50 rounded-lg"
                      >
                        <div className="mb-6">
                          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-light mb-4 text-gray-800">Pedido Recebido com Sucesso!</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          Agradecemos o seu interesse nos nossos cortinados personalizados. O seu pedido de orçamento foi registado com sucesso e já está em análise pela nossa equipa especializada.
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg mb-6">
                          <p className="text-sm text-gray-700 font-medium">
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
                          className="inline-flex items-center border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-6 py-2 rounded-full text-sm tracking-wider transition-all duration-300"
                        >
                          <FiArrowRight className="mr-2" />
                          Enviar Novo Pedido
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-light text-gray-700">
                            Nome Completo*
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                            required
                            placeholder="Seu nome completo"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-light text-gray-700">
                              E-mail*
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                              required
                              placeholder="seu@email.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-light text-gray-700">
                              Telefone*
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                              required
                              placeholder="+351 ..."
                            />
                          </div>
                        </div>
                        
                        {/* Seção de Medidas das Janelas */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-4">Medidas das Janelas</h3>
                          
                          {formData.windows.map((window, index) => (
                            <div key={window.id} className="border border-gray-200 rounded-lg p-4 relative">
                              {formData.windows.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeWindow(window.id)}
                                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              )}
                              
                              <h4 className="text-sm font-medium text-gray-700 mb-3">
                                Janela {index + 1}
                              </h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor={`height-${window.id}`} className="block mb-1 text-xs font-light text-gray-600">
                                    Altura (cm)*
                                  </label>
                                  <input
                                    type="number"
                                    id={`height-${window.id}`}
                                    name="height"
                                    value={window.height}
                                    onChange={(e) => handleWindowChange(window.id, e)}
                                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                                    required
                                    placeholder="Ex: 250"
                                  />
                                </div>
                                <div>
                                  <label htmlFor={`width-${window.id}`} className="block mb-1 text-xs font-light text-gray-600">
                                    Largura (cm)*
                                  </label>
                                  <input
                                    type="number"
                                    id={`width-${window.id}`}
                                    name="width"
                                    value={window.width}
                                    onChange={(e) => handleWindowChange(window.id, e)}
                                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
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
                            className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg py-3 px-4 text-sm text-gray-600 hover:text-gray-800 transition-all"
                          >
                            <FiPlus className="mr-2" />
                            Adicionar outra janela
                          </motion.button>
                        </div>

                        <div>
                          <label htmlFor="fabric" className="block mb-2 text-sm font-light text-gray-700">
                            Tipo de Cortinado*
                          </label>
                          <select
                            id="fabric"
                            name="fabric"
                            value={formData.fabric}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                            required
                          >
                            <option value="">--------</option>
                            {fabrics.map((fabric, index) => (
                              <option key={index} value={fabric.name}>{fabric.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="notes" className="block mb-2 text-sm font-light text-gray-700">
                            Observações
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                            rows="3"
                            placeholder="Descreva aqui qualquer detalhe adicional, preferências específicas ou dúvidas que queira partilhar connosco. Esta informação ajudará-nos a preparar um orçamento mais preciso e personalizado para as suas necessidades."
                          />
                        </div>

                        {/* Novos campos adicionados aqui */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="contactTime" className="block mb-2 text-sm font-light text-gray-700">
                              Melhor horário para contacto*
                            </label>
                            <select
                              id="contactTime"
                              name="contactTime"
                              value={formData.contactTime}
                              onChange={handleChange}
                              className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                              required
                            >
                              <option value="">Selecione um horário</option>
                              {contactTimes.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="contactMethod" className="block mb-2 text-sm font-light text-gray-700">
                              Preferência de contacto*
                            </label>
                            <select
                              id="contactMethod"
                              name="contactMethod"
                              value={formData.contactMethod}
                              onChange={handleChange}
                              className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                              required
                            >
                              <option value="">Selecione um método</option>
                              {contactMethods.map((method, index) => (
                                <option key={index} value={method.value}>{method.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-black hover:bg-gray-700 text-white font-light py-3 px-6 rounded tracking-wider transition-all duration-300 flex items-center justify-center"
                          >
                            Solicitar Orçamento
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
      <footer className="bg-black text-gray-400 py-10 md:py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">     
            <div>
              <h4 className="text-sm font-light text-white mb-6 uppercase tracking-wider">Horário</h4>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm md:text-base">
                  <span>Segunda - Sexta</span>
                  <span>10:00 - 20:00</span>
                </li>
                <li className="flex justify-between text-sm md:text-base">
                  <span>Sábado</span>
                  <span>10:00 - 19:00</span>
                </li>
                <li className="flex justify-between text-sm md:text-base">
                  <span>Domingo</span>
                  <span>Encerrado</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-light text-white mb-6 uppercase tracking-wider">Contacto</h4>
              <ul className="space-y-5">
                {[
                  { icon: <FiMail className="w-5 h-5" />, text: "lucia_decor@hotmail.com" },
                  { icon: <FiPhone className="w-5 h-5" />, text: "219 210 344" },
                  { 
                    icon: <FiHome className="w-5 h-5" />, 
                    text: "Largo Poço Nº 4, 2725-419 MEM MARTINS",
                    link: "https://www.google.com/maps/search/?api=1&query=Largo+Poço+Nº+4,+2725-419+MEM+MARTINS"
                  }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start text-sm md:text-base"
                  >
                    <span className="mt-1 mr-3">{item.icon}</span>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors break-words"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="hover:text-white transition-colors break-words">{item.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center text-xs md:text-sm">
            <p>
              &copy; {new Date().getFullYear()} Lúcia Decor. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;