import React, { useState } from 'react';
import { FiScissors, FiUser, FiPhone, FiMail, FiHome, FiArrowRight, FiChevronLeft, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from 'react-helmet';

const App = () => {
  const [formData, setFormData] = useState({
    height: "",
    width: "",
    fabric: "",
    name: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fabrics = [
    { name: "Onda perfeita" },
    { name: "Franzido" },
    { name: "Macho" },
    { name: "Ilhós" }
  ];

const testimonials = [
  {
    name: "Ana Silva",
    role: "Designer de Interiores — Cascais",
    content:
      "Os cortinados da Lúcia Decor elevaram os meus projectos a outro nível. A qualidade dos tecidos e o acabamento detalhado dão um toque de sofisticação a qualquer espaço.",
    rating: 5
  },
  {
    name: "Carlos Mendes",
    role: "Arquiteto — Ericeira",
    content:
      "Colaboro com a Lúcia Decor há vários anos e recomendo sem hesitar. Profissionalismo, atenção ao detalhe e cumprimento rigoroso de prazos.",
    rating: 5
  },
  {
    name: "Isabel Fontes",
    role: "Cliente Particular — Mafra",
    content:
      "O resultado superou as minhas expectativas! As cortinas ficaram perfeitas e fui acompanhada com simpatia e profissionalismo em todas as fases.",
    rating: 5
  }
];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          height: "", width: "", fabric: "", name: "", phone: "", email: "",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
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
            <div className="w-8 h-8 bg-black flex items-center justify-center rounded">
              <FiScissors className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-light tracking-wider">LÚCIA DECOR</h1>
          </motion.div>
          
          <motion.button 
            onClick={scrollToContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block border border-gray-400 hover:border-gray-600 px-6 py-2 rounded-full text-sm tracking-wide transition-all duration-300"
          >
            Solicitar Orçamento
          </motion.button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/30 z-10"></div>
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
                Cortinados <span className="font-medium">Sob Medida</span> <br className="hidden md:block" />para Espaços Exclusivos
              </h1>
              <p className="text-gray-200 mb-6 md:mb-8 leading-relaxed text-base md:text-lg px-4 md:px-0">
                Elegância discreta e qualidade excepcional. Transforme suas janelas em obras de arte funcional.
              </p>
              <motion.button 
                onClick={scrollToContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block border border-white text-white hover:bg-white/10 px-6 md:px-8 py-2 md:py-3 rounded-full text-sm tracking-wider transition-all duration-300"
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
                className="text-3xl font-light text-gray-800 mb-4"
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
          <section className="bg-gray-800 text-white px-6 py-12 md:py-20 md:px-12 md:w-1/2 flex flex-col justify-center">
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <h3 className="text-xl font-light mb-4 text-gray-800">Obrigado pelo seu interesse!</h3>
                <p className="text-gray-600 mb-6">
                  Recebemos a sua solicitação e entraremos em contacto em breve com o seu orçamento personalizado.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSubmitSuccess(false)}
                  className="border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-6 py-2 rounded-full text-sm tracking-wider transition-all duration-300"
                >
                  Enviar Nova Mensagem
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="height" className="block mb-2 text-sm font-light text-gray-700">
                      Altura (cm)*
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                      required
                      placeholder="Ex: 250"
                    />
                  </div>
                  <div>
                    <label htmlFor="width" className="block mb-2 text-sm font-light text-gray-700">
                      Largura (cm)*
                    </label>
                    <input
                      type="number"
                      id="width"
                      name="width"
                      value={formData.width}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-500 transition-all"
                      required
                      placeholder="Ex: 180"
                    />
                  </div>
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
                    <option value="">Selecione um Tipo</option>
                    {fabrics.map((fabric, index) => (
                      <option key={index} value={fabric.name}>{fabric.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-light py-3 px-6 rounded tracking-wider transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "Solicitar Orçamento"
                    )}
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
<footer className="bg-gray-900 text-gray-400 py-10 md:py-12">
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