import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Building2, LayoutGrid, Box, FileText, Eye, ShoppingBag, Hammer,
  CheckCircle2, ChevronDown, Phone, MessageCircle, ArrowUpRight,
  Menu, X,
} from 'lucide-react'
import Logo from './components/Logo'

function Instagram(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'О нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Проекты', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
]

const SERVICES = [
  { icon: Home,        title: 'Дизайн жилых интерьеров',      desc: 'Проекты для квартир, домов и апартаментов с учётом образа жизни, планировки и эстетики.' },
  { icon: Building2,   title: 'Дизайн коммерческих помещений', desc: 'Интерьеры для офисов, студий, салонов, кафе и других коммерческих объектов.' },
  { icon: LayoutGrid,  title: 'Планировочное решение',         desc: 'Продуманная организация пространства для удобства, логики и функциональности.' },
  { icon: Box,         title: '3D-визуализация',              desc: 'Наглядная подача будущего интерьера до начала реализации.' },
  { icon: FileText,    title: 'Рабочие чертежи',              desc: 'Полный комплект документации для строителей и подрядчиков.' },
  { icon: Eye,         title: 'Авторское сопровождение',      desc: 'Контроль соответствия реализации проекту, выезды и корректировки по ходу работ.' },
  { icon: ShoppingBag, title: 'Комплектация',                 desc: 'Подбор материалов, мебели, освещения и позиций под бюджет и стиль.' },
  { icon: Hammer,      title: 'Ремонт под ключ',              desc: 'Полный цикл реализации: от проекта до готового пространства.' },
]

const FORMATS = [
  {
    name: 'LIGHT',
    tag: 'Базовый',
    items: ['Планировочное решение', 'Базовые чертежи'],
    note: 'Для тех, кому важно грамотно организовать пространство',
    highlight: false,
  },
  {
    name: 'STANDART',
    tag: 'Популярный',
    items: ['Планировочное решение', '3D-визуализация', 'Рабочие чертежи'],
    note: 'Для полноценной подготовки проекта к реализации',
    highlight: true,
  },
  {
    name: 'PREMIUM',
    tag: 'Полный цикл',
    items: ['Планировочное решение', '3D-визуализация', 'Полный комплект чертежей', 'Комплектация', 'Сопровождение реализации'],
    note: 'Для тех, кто хочет пройти весь путь системно и без стресса',
    highlight: false,
  },
]

const PROCESS = [
  { n: '01', title: 'Знакомство и бриф',            desc: 'Обсуждаем объект, задачу, пожелания, стиль и бюджет.' },
  { n: '02', title: 'Анализ и замеры',              desc: 'Изучаем пространство, исходные данные и технические ограничения.' },
  { n: '03', title: 'Планировочное решение',         desc: 'Разрабатываем удобную и логичную организацию пространства.' },
  { n: '04', title: 'Концепция и визуализация',      desc: 'Формируем стиль, материалы, атмосферу и визуальный образ проекта.' },
  { n: '05', title: 'Подготовка чертежей',           desc: 'Собираем рабочую документацию для реализации.' },
  { n: '06', title: 'Комплектация и сопровождение',  desc: 'Подбор материалов, мебели, освещения и контроль соответствия проекту.' },
  { n: '07', title: 'Реализация',                   desc: 'При необходимости сопровождаем ремонт до готового результата.' },
]

const WHY = [
  'Продуманные решения, а не просто красивая картинка',
  'Современный и аккуратный визуальный подход',
  'Проекты с учётом реального бюджета',
  'Функциональность, эстетика и логика в одном решении',
  'Возможность дальнейшей реализации и сопровождения',
  'Понятная коммуникация и системный подход к работе',
]

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&auto=format&fit=crop&q=80', tall: true },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80', tall: true },
  { src: 'https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=800&auto=format&fit=crop&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&auto=format&fit=crop&q=80', tall: false },
]

const SUPPORT = [
  { title: 'Авторское сопровождение', desc: 'Контроль соответствия реализации дизайн-проекту, выезды на объект, рабочая коммуникация с подрядчиками.' },
  { title: 'Комплектация проекта',    desc: 'Подбор материалов, мебели, освещения и ключевых позиций под концепцию и бюджет проекта.' },
  { title: 'Ремонт под ключ',         desc: 'Полная реализация проекта с вниманием к качеству, срокам и итоговому результату.' },
]

const FAQ = [
  { q: 'Сколько стоит дизайн-проект?',                    a: 'Стоимость зависит от площади объекта, типа помещения и состава проекта. Точную стоимость рассчитываем индивидуально после короткого обсуждения задачи.' },
  { q: 'Можно ли заказать только планировку?',            a: 'Да, при необходимости можно начать только с планировочного решения, а затем расширить проект до полного состава.' },
  { q: 'Вы работаете только с квартирами?',               a: 'Нет, мы работаем как с жилыми, так и с коммерческими помещениями.' },
  { q: 'Сколько времени занимает разработка проекта?',    a: 'Срок зависит от площади, сложности объекта и состава работ. После обсуждения задачи даём ориентир по срокам.' },
  { q: 'Делаете ли вы ремонт под ключ?',                  a: 'Да, мы можем сопровождать реализацию проекта и участвовать в ремонте под ключ.' },
  { q: 'Что входит в полный дизайн-проект?',              a: 'Как правило, в полный проект входят планировка, визуализация, рабочие чертежи и рекомендации по комплектации.' },
  { q: 'Можно ли работать дистанционно?',                 a: 'Да, часть работы можно вести онлайн. При необходимости выезжаем на объект в Алматы.' },
  { q: 'Можно ли сделать проект в рамках конкретного бюджета?', a: 'Да, мы разрабатываем решения с учётом реального бюджета и дальнейшей реализации.' },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="mb-4 text-xs uppercase tracking-[0.38em] text-[#B8A082]">{children}</p>
  )
}

function FAQItem({ q, a, isOpen, toggle }) {
  return (
    <div className="border-b border-[#DDD5C8]">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-5 text-left text-[15px] font-medium text-[#1C1814] transition hover:text-[#7A7068]"
      >
        {q}
        <ChevronDown
          className={`ml-4 h-5 w-5 flex-shrink-0 text-[#B8A082] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#7A7068] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaq, setOpenFaq]       = useState(null)
  const [scrolled, setScrolled]     = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [submitted, setSubmitted]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-[#F7F4EF] text-[#1C1814] overflow-x-hidden">

      {/* ── Nav ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#F7F4EF]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <a
            href="#"
            aria-label="MAG Studio"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-[#1C1814]' : 'text-[#F7F4EF]'
            }`}
          >
            <Logo className="h-9 w-auto" />
          </a>

          <nav className="hidden gap-8 md:flex">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1)
              const baseColor = scrolled ? 'text-[#7A7068]' : 'text-[#C8B8A0]'
              const hoverColor = scrolled ? 'hover:text-[#1C1814]' : 'hover:text-[#F7F4EF]'
              const activeColor = isActive
                ? scrolled ? 'text-[#1C1814] font-semibold' : 'text-[#F7F4EF] font-semibold'
                : ''
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm transition ${baseColor} ${hoverColor} ${activeColor}`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1.5 left-0 right-0 h-px ${
                        scrolled ? 'bg-[#1C1814]' : 'bg-[#F7F4EF]'
                      }`}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <a
            href="https://wa.me/77083460065"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#1C1814] px-5 py-2.5 text-sm text-[#F7F4EF] transition hover:bg-[#2A2420] md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>

          <button onClick={() => setMobileOpen(v => !v)} className="p-2 md:hidden">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#DDD5C8] bg-[#F7F4EF] md:hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base text-[#1C1814]"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://wa.me/77083460065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-medium"
                >
                  <MessageCircle className="h-4 w-4" /> Написать в WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="grid min-h-screen md:grid-cols-[45%_55%]">
        {/* Left dark panel */}
        <div className="relative flex flex-col justify-end bg-[#221E19] px-8 pb-16 pt-32 md:px-14 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <p className="mb-6 text-xs uppercase tracking-[0.42em] text-[#B8A082]">
              Алматы · Казахстан
            </p>

            <h1 className="font-display text-4xl leading-[1.08] text-[#F7F4EF] md:text-5xl lg:text-[56px]">
              Продуманные интерьеры.<br />Реализуемые решения.
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#9A8E80]">
              Дизайн интерьера и ремонт под ключ для жилых и коммерческих
              помещений в Алматы.
            </p>

            <ul className="mt-8 space-y-2.5">
              {[
                'Современный и понятный подход',
                'Интерьеры с учётом бюджета и реальной реализации',
                'Сопровождение от идеи до готового результата',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#C8B8A0]">
                  <span className="h-px w-6 flex-shrink-0 bg-[#B8A082]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-[#F7F4EF] px-7 py-3.5 text-sm font-medium text-[#1C1814] transition hover:bg-white"
              >
                Оставить заявку
              </a>
              <a
                href="https://wa.me/77083460065"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-[#F7F4EF]/25 px-7 py-3.5 text-sm text-[#F7F4EF] transition hover:border-[#F7F4EF]/60"
              >
                <MessageCircle className="h-4 w-4" />
                Написать в WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative h-[55vw] md:h-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&auto=format&fit=crop&q=80"
            alt="Интерьер MAG Studio"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#221E19]/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="mx-auto grid max-w-[1200px] gap-16 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionLabel>О студии</SectionLabel>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            MAG Studio — студия дизайна интерьера и реализации пространства.
          </h2>
          <p className="mt-6 text-[#7A7068] leading-relaxed">
            Мы создаём современные, функциональные и эстетичные решения для
            квартир, домов и коммерческих помещений.
          </p>
          <p className="mt-4 text-[#7A7068] leading-relaxed">
            Для нас важно не просто сделать красивую картинку, а разработать
            проект, который будет удобен в жизни и понятен в реализации.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition hover:text-[#7A7068]"
          >
            Обсудить проект <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1616594039964-3fc0a39f4df4?w=900&auto=format&fit=crop&q=80"
            alt="О студии MAG"
            className="h-[480px] w-full object-cover"
          />
        </motion.div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="bg-[#F0EBE3] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-14">
            <SectionLabel>Услуги</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl">Наши услуги</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="rounded-2xl bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Icon className="mb-5 h-6 w-6 text-[#B8A082]" strokeWidth={1.5} />
                <h3 className="font-medium leading-snug">{title}</h3>
                <p className="mt-3 text-sm text-[#7A7068] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Formats ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-14">
          <SectionLabel>Форматы работы</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl">Выберите формат</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {FORMATS.map(({ name, tag, items, note, highlight }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className={`flex flex-col rounded-2xl p-8 ${
                highlight
                  ? 'bg-[#221E19] text-[#F7F4EF]'
                  : 'border border-[#DDD5C8] bg-white'
              }`}
            >
              <span
                className={`self-start rounded-full px-3 py-1 text-xs uppercase tracking-wider ${
                  highlight
                    ? 'bg-[#B8A082]/20 text-[#B8A082]'
                    : 'bg-[#F0EBE3] text-[#7A7068]'
                }`}
              >
                {tag}
              </span>

              <h3 className={`mt-5 font-display text-3xl ${highlight ? 'text-[#F7F4EF]' : ''}`}>
                {name}
              </h3>

              <ul className="mt-6 flex-1 space-y-3">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#B8A082]"
                      strokeWidth={1.5}
                    />
                    <span className={highlight ? 'text-[#C8B8A0]' : 'text-[#7A7068]'}>{item}</span>
                  </li>
                ))}
              </ul>

              <p className={`mt-6 text-xs leading-relaxed ${highlight ? 'text-[#7A7068]' : 'text-[#7A7068]'}`}>
                {note}
              </p>

              <a
                href="#contact"
                className={`mt-8 inline-block rounded-full px-6 py-3 text-center text-sm transition ${
                  highlight
                    ? 'bg-[#F7F4EF] text-[#1C1814] hover:bg-white'
                    : 'border border-[#1C1814] text-[#1C1814] hover:bg-[#1C1814] hover:text-[#F7F4EF]'
                }`}
              >
                Обсудить
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#7A7068]">
          Стоимость рассчитывается индивидуально в зависимости от площади, задачи и состава проекта.
        </p>
      </section>

      {/* ── Process ── */}
      <section className="bg-[#F0EBE3] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-14">
            <SectionLabel>Как мы работаем</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl">Этапы работы</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PROCESS.map(({ n, title, desc }) => (
              <motion.div
                key={n}
                variants={fadeUp}
                className="rounded-2xl bg-white p-7"
              >
                <span className="font-display text-4xl text-[#DDD5C8]">{n}</span>
                <h3 className="mt-4 font-medium leading-snug">{title}</h3>
                <p className="mt-3 text-sm text-[#7A7068] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <SectionLabel>Почему мы</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl">
              Почему выбирают MAG Studio
            </h2>
            <p className="mt-6 text-[#7A7068] leading-relaxed">
              Мы создаём интерьеры, где визуал и функциональность существуют в
              равновесии — и сопровождаем клиента на каждом шаге.
            </p>
          </motion.div>

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            {WHY.map(item => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-xl border border-[#DDD5C8] bg-white p-5"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8A082]"
                  strokeWidth={1.5}
                />
                <span className="text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="bg-[#F0EBE3] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-10">
            <SectionLabel>Портфолио</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl">Визуальное направление</h2>
            <p className="mt-4 max-w-xl text-[#7A7068]">
              Современные, чистые и продуманные интерьеры с акцентом на эстетику,
              функциональность и реализацию.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 gap-3 md:grid-cols-3"
          >
            {GALLERY.map(({ src }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`overflow-hidden rounded-2xl ${i === 1 || i === 4 ? 'row-span-2' : ''}`}
              >
                <img
                  src={src}
                  alt={`Интерьер ${i + 1}`}
                  loading="lazy"
                  className={`w-full object-cover transition duration-500 hover:scale-105 ${
                    i === 1 || i === 4 ? 'h-full min-h-[300px]' : 'h-52 md:h-60'
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-8 text-center text-sm text-[#7A7068]">
            Мы создаём интерьеры, в которых важны не только визуал и атмосфера,
            но и удобство повседневной жизни.
          </p>
        </div>
      </section>

      {/* ── Support ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-14">
          <SectionLabel>Реализация</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl">Сопровождение реализации</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {SUPPORT.map(({ title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl bg-[#221E19] p-8"
            >
              <h3 className="font-display text-2xl text-[#F7F4EF]">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#8A8078]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[#F0EBE3] py-24 md:py-32">
        <div className="mx-auto max-w-[780px] px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl">Часто задаваемые вопросы</h2>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {FAQ.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <SectionLabel>Заявка</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl">Обсудим ваш проект</h2>
            <p className="mt-5 text-[#7A7068] leading-relaxed">
              Оставьте заявку, и мы свяжемся с вами, чтобы обсудить задачу,
              формат работы и ориентир по стоимости.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:+77083460065"
                className="flex items-center gap-3 text-sm transition hover:text-[#7A7068]"
              >
                <Phone className="h-4 w-4 text-[#B8A082]" />
                +7 708 346 00 65
              </a>
              <a
                href="https://wa.me/77083460065"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition hover:text-[#7A7068]"
              >
                <MessageCircle className="h-4 w-4 text-[#B8A082]" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/magstudio.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition hover:text-[#7A7068]"
              >
                <Instagram className="h-4 w-4 text-[#B8A082]" />
                @magstudio.kz
              </a>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&auto=format&fit=crop&q=80"
                alt="Студия MAG"
                className="h-60 w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {submitted ? (
              <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-[#DDD5C8] bg-white p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-[#B8A082]" strokeWidth={1} />
                <h3 className="mt-5 font-display text-2xl">Спасибо!</h3>
                <p className="mt-3 text-sm text-[#7A7068]">
                  Мы свяжемся с вами в ближайшее время для обсуждения проекта.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#DDD5C8] bg-white p-8 space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-xs text-[#7A7068]">Имя</label>
                  <input
                    required
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full rounded-xl border border-[#DDD5C8] bg-[#F7F4EF] px-4 py-3 text-sm outline-none transition focus:border-[#B8A082]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-[#7A7068]">Телефон</label>
                  <input
                    required
                    type="tel"
                    placeholder="+7 ___ ___ __ __"
                    className="w-full rounded-xl border border-[#DDD5C8] bg-[#F7F4EF] px-4 py-3 text-sm outline-none transition focus:border-[#B8A082]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-[#7A7068]">Тип объекта</label>
                  <select className="w-full rounded-xl border border-[#DDD5C8] bg-[#F7F4EF] px-4 py-3 text-sm text-[#7A7068] outline-none transition focus:border-[#B8A082]">
                    <option value="">Выберите тип</option>
                    <option>Квартира</option>
                    <option>Дом / коттедж</option>
                    <option>Коммерческое помещение</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-[#7A7068]">Комментарий</label>
                  <textarea
                    rows={3}
                    placeholder="Кратко о вашем проекте"
                    className="w-full resize-none rounded-xl border border-[#DDD5C8] bg-[#F7F4EF] px-4 py-3 text-sm outline-none transition focus:border-[#B8A082]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1C1814] py-3.5 text-sm font-medium text-[#F7F4EF] transition hover:bg-[#2A2420]"
                >
                  Оставить заявку
                </button>
                <a
                  href="https://wa.me/77083460065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1C1814] py-3.5 text-sm font-medium transition hover:bg-[#1C1814] hover:text-[#F7F4EF]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Написать в WhatsApp
                </a>

                <p className="text-center text-xs text-[#B8A082]">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="/privacy" className="underline underline-offset-2">
                    Политикой конфиденциальности
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Contacts strip ── */}
      <section className="border-t border-[#DDD5C8] bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#B8A082]">Адрес</p>
              <p className="mt-3 text-sm text-[#7A7068]">Алматы, Казахстан</p>
              <p className="mt-1 text-sm text-[#7A7068]">Работаем по Алматы, онлайн и с выездом на объект.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#B8A082]">Контакты</p>
              <a href="tel:+77083460065" className="mt-3 block text-sm transition hover:text-[#7A7068]">
                +7 708 346 00 65
              </a>
              <a href="https://wa.me/77083460065" target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm transition hover:text-[#7A7068]">
                WhatsApp
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#B8A082]">Соцсети</p>
              <a href="https://instagram.com/magstudio.kz" target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm transition hover:text-[#7A7068]">
                @magstudio.kz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#221E19] py-12">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <Logo className="h-10 w-auto text-[#F7F4EF]" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#8A8078]">
                Современные интерьеры и реализация под ключ для жилых и
                коммерческих пространств.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#B8A082]">Контакты</p>
              <div className="mt-4 space-y-2 text-sm text-[#8A8078]">
                <p>Алматы, Казахстан</p>
                <a href="tel:+77083460065" className="block transition hover:text-[#F7F4EF]">
                  +7 708 346 00 65
                </a>
                <a href="https://instagram.com/magstudio.kz" target="_blank" rel="noopener noreferrer" className="block transition hover:text-[#F7F4EF]">
                  @magstudio.kz
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#B8A082]">Навигация</p>
              <div className="mt-4 space-y-2 text-sm text-[#8A8078]">
                {NAV_LINKS.map(link => (
                  <a key={link.href} href={link.href} className="block transition hover:text-[#F7F4EF]">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#2A2420] pt-6 text-xs text-[#5A5248] md:flex-row">
            <p>© 2026 MAG Studio. Все права защищены.</p>
            <a href="/privacy" className="transition hover:text-[#8A8078]">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp ── */}
      <a
        href="https://wa.me/77083460065"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-110 hover:bg-[#20BD5A]"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>
    </div>
  )
}
