import React, { useState } from 'react';
import { FiScissors, FiSliders, FiUser, FiPhone, FiMail, FiHome, FiArrowRight } from 'react-icons/fi';
import { FaLeaf, FaShieldAlt, FaCloud, FaSun, FaWeightHanging, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
    {
      name: "Linho Natural",
      description: "Tecido respirável com acabamento delicado e textura suave.",
      icon: <FaLeaf className="w-10 h-10 text-amber-600 mx-auto" />,
      features: ["Hipoalergênico", "Confortável", "Durabilidade"]
    },
    {
      name: "Veludo Suave",
      description: "Tecido aveludado com ótima retenção de calor.",
      icon: <FaWeightHanging className="w-10 h-10 text-amber-600 mx-auto" />,
      features: ["Toque agradável", "Isolamento", "Elegância"]
    },
    {
      name: "Blackout",
      description: "Bloqueio de luz com proteção térmica.",
      icon: <FaShieldAlt className="w-10 h-10 text-amber-600 mx-auto" />,
      features: ["Opacidade", "Economia energética", "Privacidade"]
    },
    {
      name: "Algodão",
      description: "Fios naturais para um drapeado perfeito.",
      icon: <FaCloud className="w-10 h-10 text-amber-600 mx-auto" />,
      features: ["Maciez", "Resistência", "Fácil manutenção"]
    },
    {
      name: "Seda Sintética",
      description: "Brilho discreto e fluidez no caimento.",
      icon: <FaSun className="w-10 h-10 text-amber-600 mx-auto" />,
      features: ["Brilho suave", "Conforto", "Bom custo-benefício"]
    },
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

  return (
    <div className="font-sans antialiased text-gray-800 bg-amber-50">
      {/* Cabeçalho */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <FiScissors className="w-5 h-5 text-amber-600" />
            <h1 className="text-xl font-medium">LÚCIA DECOR</h1>
          </motion.div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <motion.li whileHover={{ scale: 1.05 }}>
                <a href="#destaques" className="hover:text-amber-600 transition-colors">
                  Início
                </a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <a href="#contacto" className="bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
                  Orçamento
                </a>
              </motion.li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="destaques" className="relative h-auto md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-800/10 backdrop-blur-sm z-10"></div>
        <div className="absolute inset-0">
          <img
            src="/images/foto.jpeg"
            alt="Cortinados de qualidade"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-0 z-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl backdrop-blur-xs bg-white/70 p-8 md:p-12 rounded-xl shadow-xl border border-white/20"
          >
            <h1 className="text-3xl md:text-4xl font-medium mb-4 text-gray-800 leading-tight">
              Cortinados <span className="text-amber-600">Sob Medida</span> para o Seu Lar
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Soluções personalizadas para todas as janelas, combinando funcionalidade e estilo. 
              Transforme seus ambientes com cortinas que se adaptam ao seu gosto e necessidades.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <motion.a 
                href="#contacto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center overflow-hidden group"
              >
                <span className="relative z-10">Solicitar Orçamento</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.a>
              
              <motion.a 
                href="#tecidos"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-transparent border border-amber-600 text-amber-600 font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center group"
              >
                <span className="relative z-10 flex items-center">
                  Saber Mais
                  <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Diferenciais */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FiScissors className="w-6 h-6 text-amber-700" />,
                title: "Corte Preciso",
                desc: "Medição profissional para perfeito ajuste às suas janelas"
              },
              {
                icon: <FiSliders className="w-6 h-6 text-amber-700" />,
                title: "Variedade",
                desc: "Diversas opções de tecidos, cores e estilos"
              },
              {
                icon: <FiUser className="w-6 h-6 text-amber-700" />,
                title: "Atendimento",
                desc: "Orientações personalizadas para sua escolha"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-amber-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-amber-100"
              >
                <div className="bg-amber-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 text-gray-800 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção Tecidos */}
      <section id="tecidos" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-medium text-gray-800 mb-3">
              Nossos Tecidos Premium
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {fabrics.map((fabric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-6 flex flex-col items-center h-full">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {fabric.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-800 text-center">
                    {fabric.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center mb-4">{fabric.description}</p>
                  
                  <ul className="space-y-2 text-sm text-gray-700 mt-auto">
                    {fabric.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Contacto */}
      <section id="contacto" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl overflow-hidden border border-amber-100"
          >
            <div className="md:flex">
              <div className="md:w-2/5 bg-amber-600 p-8 md:p-10 text-white">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-medium mb-6"
                >
                  Solicite Seu Orçamento
                </motion.h2>
                

            </div>
              
              <div className="md:w-3/5 p-8 md:p-10">
                {submitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-lg text-center"
                  >
                    <h3 className="text-xl font-medium mb-2">Mensagem Enviada com Sucesso!</h3>
                    <p className="mb-4">
                      Obrigado pelo seu interesse. Entraremos em contato em breve com seu orçamento personalizado.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
                    >
                      Enviar Nova Mensagem
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="height" className="block mb-2 text-sm font-medium">
                          Altura (cm)*
                        </label>
                        <input
                          type="number"
                          id="height"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          required
                          placeholder="Ex: 250"
                        />
                      </div>
                      <div>
                        <label htmlFor="width" className="block mb-2 text-sm font-medium">
                          Largura (cm)*
                        </label>
                        <input
                          type="number"
                          id="width"
                          name="width"
                          value={formData.width}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          required
                          placeholder="Ex: 180"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fabric" className="block mb-2 text-sm font-medium">
                        Tipo de Tecido*
                      </label>
                      <select
                        id="fabric"
                        name="fabric"
                        value={formData.fabric}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                        required
                      >
                        <option value="">Selecione um tecido</option>
                        {fabrics.map((fabric, index) => (
                          <option key={index} value={fabric.name}>{fabric.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Nome Completo*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                          Telefone*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          required
                          placeholder="+351 ..."
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                          E-mail*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          required
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processando...
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
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center space-x-3 mb-5"
              >
                <FiScissors className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl font-medium text-white">LÚCIA DECOR</h3>
              </motion.div>
              <p className="mb-6">
                Especialistas em cortinados sob medida que combinam funcionalidade e estilo para todos os tipos de residências.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <FaInstagram className="w-5 h-5" />, url: "https://instagram.com" },
                  { icon: <FaFacebookF className="w-5 h-5" />, url: "https://facebook.com" },
                  { icon: <FaLinkedinIn className="w-5 h-5" />, url: "https://linkedin.com" }
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, color: "#D97706" }}
                    className="bg-gray-800 hover:bg-amber-600 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Links Rápidos</h4>
              <ul className="space-y-3">
                {[
                  { label: "Início", href: "#destaques" },
                  { label: "Tecidos", href: "#tecidos" },
                  { label: "Orçamento", href: "#contacto" },
                  { label: "Termos", href: "#" }
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href={link.href} className="hover:text-amber-500 transition-colors flex items-center">
                      <FiArrowRight className="mr-2 text-xs" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Contato</h4>
              <ul className="space-y-4">
                {[
                  { icon: <FiMail className="w-4 h-4" />, text: "contato@luciadecor.pt" },
                  { icon: <FiPhone className="w-4 h-4" />, text: "+351 123 456 789" },
                  { icon: <FiHome className="w-4 h-4" />, text: "Lisboa, Portugal" }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <span className="text-amber-500 mt-0.5 mr-3">{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="border-t border-gray-800 pt-8 text-center text-sm"
          >
            <p>
              &copy; {new Date().getFullYear()} Lúcia Decor. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default App;