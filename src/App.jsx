import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Building2, LayoutGrid, Box, FileText, Eye, ShoppingBag, Hammer,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Phone, ArrowUpRight,
  Menu, X, Calculator,
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
  { label: 'Направления', href: '#about' },
  { label: 'Пакеты услуг', href: '#packages' },
  { label: 'Портфолио', href: '#gallery' },
  { label: 'Этапы реализации', href: '#steps' },
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

const PACKAGES = [
  {
    title: 'Базовый проект',
    price: 'от 6.000 тг/м²',
    subtitle: 'Концепция интерьера + чертежи, без 3D',
    preview: [
      'Выезд на замер и обмерный план',
      'Планировка с расстановкой мебели',
      'До 5 вариантов планировочного решения',
    ],
    extra: [
      'Подбор стилистики, материалов и мебели в формате коллажей',
      'Планы демонтажа и монтажа перегородок',
      'Электрика: розетки, выключатели, выводы',
      'Сценарии освещения для каждой зоны',
      'Размещение сантехнического оборудования',
      'Планы полов и потолков',
      'Ведомость основных материалов и мебели',
    ],
  },
  {
    title: 'Проект с 3D-визуализацией',
    price: 'от 8.000 тг/м²',
    subtitle: 'Индивидуальный проект + чертежи, 3D визуализация',
    preview: [
      'Выезд на замер и обмерный план',
      'Планировка с расстановкой мебели',
      'До 10 вариантов планировочного решения',
    ],
    extra: [
      '3D-визуализация всех помещений',
      'Планы демонтажа и монтажа перегородок',
      'План электрики и освещения',
      'Сценарии освещения по помещениям',
      'План сантехнического оборудования',
      'Планы полов и потолков',
      'Раскладка керамогранита',
      'Ведомость материалов и мебели',
    ],
  },
  {
    title: 'Авторское сопровождение ремонта',
    price: 'от 180.000 тг/месяц',
    subtitle: 'От строительства до готового интерьера',
    preview: [
      'Подбор строительной бригады под ваш бюджет',
      'Подготовка сметы по проекту',
      'Подбор поставщиков материалов, мебели и декора',
    ],
    extra: [
      'Организация тендера среди мебельных компаний',
      'Контроль соответствия мебели проекту',
      'Ведение бюджета и графика закупок',
      'Проверка счетов и контроль поставки материалов',
      'Выезды в салоны и магазины для подбора материалов',
      'Регулярные выезды на объект',
      'Ведение журнала авторского надзора',
      'Фото- и видеоотчёты по ходу работ',
    ],
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

const RENDER_GROUPS = [
  {
    label: 'Кухня',
    images: ['/renders/kitchen-1.jpg', '/renders/kitchen-2.jpg', '/renders/kitchen-3.jpg'],
  },
  {
    label: 'Гостиная',
    images: ['/renders/living-1.jpg', '/renders/living-2.jpg', '/renders/living-3.jpg'],
  },
  {
    label: 'Спальня',
    images: ['/renders/bedroom-1.jpg', '/renders/bedroom-2.jpg', '/renders/bedroom-3.jpg'],
  },
  {
    label: 'Санузел',
    images: ['/renders/bathroom-1.jpg', '/renders/bathroom-2.jpg', '/renders/bathroom-3.jpg'],
  },
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
    <p className="mb-4 text-xs uppercase tracking-[0.38em] text-[#60899b]">{children}</p>
  )
}

function FAQItem({ q, a, isOpen, toggle }) {
  return (
    <div className="border-b border-[#d5d4c8]">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-5 text-left text-[15px] font-medium text-[#1C1814] transition hover:text-[#989898]"
      >
        {q}
        <ChevronDown
          className={`ml-4 h-5 w-5 flex-shrink-0 text-[#60899b] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
            <p className="pb-5 text-sm text-[#989898] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── RenderCarousel ──────────────────────────────────────────────────────────

function RenderCarousel({ label, images }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)
  const touchStartX = useRef(null)
  const onTouchStart = e => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = e => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta < -40) next()
    else if (delta > 40) prev()
    touchStartX.current = null
  }

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#60899b]">{label}</p>
      <div
        className="relative overflow-hidden rounded-2xl bg-[#1C1814] touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={images[idx]}
            src={images[idx]}
            alt={`${label} — рендер ${idx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="h-[340px] w-full object-cover md:h-[480px] select-none"
          />
        </AnimatePresence>

        {/* arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#1C1814]/60 text-white backdrop-blur-sm transition hover:bg-[#1C1814]/90"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#1C1814]/60 text-white backdrop-blur-sm transition hover:bg-[#1C1814]/90"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-[#1C1814]/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {idx + 1} / {images.length}
        </div>
      </div>

      {/* dots */}
      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? 'w-6 bg-[#60899b]' : 'w-1.5 bg-[#d5d4c8]'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileBottomOpen, setMobileBottomOpen] = useState(false)
  const [expandedPkg, setExpandedPkg] = useState({})
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
    <div className="bg-[#f2edea] text-[#1C1814] [overflow-x:clip]">

      {/* ── Nav ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 hidden md:block ${
          scrolled ? 'bg-[#f2edea]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <a
            href="#"
            aria-label="MAG Studio"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-[#1C1814]' : 'text-[#f2edea]'
            }`}
          >
            <Logo className="h-9 w-auto" />
          </a>

          <nav className="hidden gap-8 md:flex">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1)
              const baseColor = scrolled ? 'text-[#989898]' : 'text-[#c4c2aa]'
              const hoverColor = scrolled ? 'hover:text-[#1C1814]' : 'hover:text-[#f2edea]'
              const activeColor = isActive
                ? scrolled ? 'text-[#1C1814] font-semibold' : 'text-[#f2edea] font-semibold'
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
                        scrolled ? 'bg-[#1C1814]' : 'bg-[#f2edea]'
                      }`}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="https://instagram.com/magstudio.kz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1C1814] text-[#f2edea] transition hover:bg-[#2A2420] hover:scale-105"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="tel:+77083460065"
              aria-label="Позвонить"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1C1814] text-[#f2edea] transition hover:bg-[#2A2420] hover:scale-105"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>

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
              className="overflow-hidden border-t border-[#d5d4c8] bg-[#f2edea] md:hidden"
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
                  <img src="/whatsapp.svg" alt="" className="h-4 w-4" /> Написать в WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&auto=format&fit=crop&q=80"
          alt="Интерьер MAG Studio"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C1814]/65" />

        <div className="relative flex min-h-screen items-center justify-center px-8 pb-16 pt-32 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="max-w-3xl text-center"
          >
            <h1 className="font-display text-4xl leading-[1.08] text-[#f2edea] md:text-5xl lg:text-[56px]">
              Дизайн интерьера и ремонт под ключ
            </h1>

            <p className="mx-auto mt-10 max-w-sm text-sm leading-relaxed text-[#c4c2aa]">
              Создаём интерьеры, которые можно реально реализовать: от планировки
              и дизайн-проекта до авторского надзора и ремонта
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="flex items-center gap-2 rounded-full bg-[#f2edea] px-7 py-3.5 text-sm font-medium text-[#1C1814] transition hover:bg-white"
              >
                <Calculator className="h-4 w-4" />
                Рассчитать стоимость
              </a>
              <a
                href="https://wa.me/77083460065"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-[#F7F4EF]/40 bg-[#1C1814]/30 px-7 py-3.5 text-sm text-[#f2edea] backdrop-blur-sm transition hover:border-[#F7F4EF]/70"
              >
                <img src="/whatsapp.svg" alt="" className="h-4 w-4" />
                Написать в WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About / Directions ── */}
      <section id="about" className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl">Наши направления</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: Home,
              title: 'Дизайн жилых помещений',
              desc: 'Квартиры и загородные дома',
            },
            {
              icon: Building2,
              title: 'Дизайн коммерческих помещений',
              desc: 'Офисы, кафе, рестораны и др.',
            },
            {
              icon: LayoutGrid,
              title: 'Архитектура и проектирование',
              desc: 'Архитектурное и инженерное проектирование',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex flex-col items-center text-center rounded-2xl border border-[#d5d4c8] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f2edea]">
                <Icon className="h-7 w-7 text-[#60899b]" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl leading-snug">{title}</h3>
              <p className="mt-3 text-sm text-[#989898] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ── Packages ── */}
      <section id="packages" className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl">Пакеты услуг</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PACKAGES.map(({ title, price, subtitle, preview, extra }, idx) => {
            const open = !!expandedPkg[idx]
            return (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col rounded-2xl bg-[#221E19] p-8 text-[#f2edea]"
              >
                <h3 className="font-display text-3xl leading-tight">{title}</h3>
                <p className="mt-2 text-2xl font-medium text-[#f2edea]">{price}</p>
                <p className="mt-1 text-xs text-[#989898]">[{subtitle}]</p>

                <div className="relative">
                  <ul className="mt-6 space-y-2">
                    {preview.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#c4c2aa]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#60899b]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {!open && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#221E19]" />
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 overflow-hidden space-y-2"
                    >
                      {extra.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#c4c2aa]">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#60899b]" />
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setExpandedPkg(s => ({ ...s, [idx]: !s[idx] }))}
                  className="mt-4 self-start text-sm text-[#989898] transition hover:text-[#f2edea]"
                >
                  {open ? 'Скрыть ↑' : 'Раскрыть ↓'}
                </button>

                <div className="flex-1" />

                <a
                  href="https://wa.me/77083460065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block rounded-xl bg-[#60899b] py-4 text-center text-sm font-semibold text-white transition hover:bg-[#4a7a8a]"
                >
                  Рассчитать стоимость
                </a>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[#989898]">
          Стоимость рассчитывается индивидуально в зависимости от площади, задачи и состава проекта.
        </p>
      </section>



      {/* ── Gallery ── */}
      <section id="gallery" className="py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-14 text-center">
            <h2 className="font-display text-4xl md:text-5xl">Наши проекты</h2>
            <p className="mt-4 text-[#989898]">3D-рендеры реализованных интерьеров</p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            {RENDER_GROUPS.map(group => (
              <RenderCarousel key={group.label} {...group} />
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-16 text-center"
          >
            <a
              href="https://wa.me/77083460065"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#1C1814] px-10 py-4 text-sm font-medium text-[#f2edea] transition hover:bg-[#60899b]"
            >
              Хочу похожий проект
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Support ── */}
      <section id="steps" className="bg-[#e8e7de] py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">

          {/* Этапы реализации проекта */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-14 text-center">
            <h2 className="font-display text-4xl md:text-5xl">Этапы реализации проекта</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {[
              { n: '1', title: 'Заявка',              desc: 'Вы оставляете заявку или пишете нам в WhatsApp.' },
              { n: '2', title: 'Консультация',         desc: 'Обсуждаем объект, площадь, задачи, бюджет и сроки.' },
              { n: '3', title: 'Замер и планировка',   desc: 'Выезжаем на объект и разрабатываем планировочное решение.' },
              { n: '4', title: 'Дизайн-проект',        desc: 'Готовим визуализации, чертежи и подбор материалов.' },
              { n: '5', title: 'Реализация',           desc: 'Сопровождаем ремонт, закупки и работу подрядчиков.' },
            ].map(({ n, title, desc }) => (
              <motion.div
                key={n}
                variants={fadeUp}
                className="flex flex-col items-center text-center rounded-2xl bg-white p-7"
              >
                <span className="font-display text-5xl font-light text-[#60899b] opacity-60">{n}</span>
                <h3 className="mt-4 font-semibold leading-snug">{title}</h3>
                <p className="mt-3 text-sm text-[#989898] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>


      {/* ── Contact ── */}
      <section id="contact" className="mx-auto max-w-[640px] px-6 py-16 md:py-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl">Обсудим ваш проект</h2>
          <p className="mt-5 text-[#989898] leading-relaxed">
            Оставьте заявку, и мы свяжемся с вами, чтобы обсудить задачу,
            формат работы и ориентир по стоимости.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {submitted ? (
              <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-[#d5d4c8] bg-white p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-[#60899b]" strokeWidth={1} />
                <h3 className="mt-5 font-display text-2xl">Спасибо!</h3>
                <p className="mt-3 text-sm text-[#989898]">
                  Мы свяжемся с вами в ближайшее время для обсуждения проекта.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#d5d4c8] bg-white p-8 space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-xs text-[#989898]">Имя</label>
                  <input
                    required
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full rounded-xl border border-[#d5d4c8] bg-[#f2edea] px-4 py-3 text-sm outline-none transition focus:border-[#60899b]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-[#989898]">Телефон</label>
                  <input
                    required
                    type="tel"
                    placeholder="+7 ___ ___ __ __"
                    className="w-full rounded-xl border border-[#d5d4c8] bg-[#f2edea] px-4 py-3 text-sm outline-none transition focus:border-[#60899b]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-[#989898]">Тип объекта</label>
                  <select className="w-full rounded-xl border border-[#d5d4c8] bg-[#f2edea] px-4 py-3 text-sm text-[#989898] outline-none transition focus:border-[#60899b]">
                    <option value="">Выберите тип</option>
                    <option>Квартира</option>
                    <option>Дом / коттедж</option>
                    <option>Коммерческое помещение</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-[#989898]">Комментарий</label>
                  <textarea
                    rows={3}
                    placeholder="Кратко о вашем проекте"
                    className="w-full resize-none rounded-xl border border-[#d5d4c8] bg-[#f2edea] px-4 py-3 text-sm outline-none transition focus:border-[#60899b]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1C1814] py-3.5 text-sm font-medium text-[#f2edea] transition hover:bg-[#2A2420]"
                >
                  Рассчитать стоимость
                </button>
                <a
                  href="https://wa.me/77083460065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1C1814] py-3.5 text-sm font-medium transition hover:bg-[#1C1814] hover:text-[#f2edea]"
                >
                  Написать в WhatsApp
                </a>

                <p className="text-center text-xs text-[#60899b]">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="/privacy" className="underline underline-offset-2">
                    Политикой конфиденциальности
                  </a>
                </p>
              </form>
            )}
          </motion.div>
      </section>


      {/* ── Footer ── */}
      <footer className="bg-[#221E19] py-12">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col items-center text-center gap-6">
            <Logo className="h-10 w-auto text-[#f2edea]" />
            <p className="max-w-xs text-sm leading-relaxed text-[#989898]">
              Современные интерьеры и реализация под ключ для жилых и
              коммерческих пространств.
            </p>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#60899b]">Контакты</p>
              <div className="mt-4 flex flex-col items-center gap-3">
                <a
                  href="tel:+77083460065"
                  className="group inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#60899b]/20 transition duration-300 hover:scale-[1.03]"
                  style={{
                    background: 'linear-gradient(110deg, #2A2420 0%, #60899b 35%, #f2edea 50%, #60899b 65%, #2A2420 100%)',
                    backgroundSize: '300% 100%',
                    animation: 'shimmer 4s linear infinite',
                  }}
                >
                  <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  <span>+7 708 346 00 65</span>
                  <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
                <a
                  href="https://instagram.com/magstudio.kz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#60899b]/20 transition duration-300 hover:scale-[1.03]"
                  style={{
                    background: 'linear-gradient(110deg, #2A2420 0%, #60899b 35%, #f2edea 50%, #60899b 65%, #2A2420 100%)',
                    backgroundSize: '300% 100%',
                    animation: 'shimmer 4s linear infinite',
                  }}
                >
                  <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>@magstudio.kz</span>
                  <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </div>
              <div className="mt-4 text-sm text-[#989898]">
                <p>г. Алматы, Казахстан</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-2 border-t border-[#2A2420] pt-6 text-xs text-[#6b6b6b]">
            <p>© 2026 MAG Studio. Все права защищены.</p>
            <a href="/privacy" className="transition hover:text-[#989898]">
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
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-110 hover:bg-[#1DA851]"
      >
        <img src="/whatsapp.svg" alt="WhatsApp" className="h-8 w-8" />
      </a>

      {/* ── Mobile Top Nav Bar ── */}
      <div className="fixed top-0 inset-x-0 z-50 md:hidden">
        <div className="grid grid-cols-3 items-center border-b border-[#d5d4c8] bg-[#f2edea]/95 backdrop-blur-md px-6 py-3">
          <button
            onClick={() => setMobileBottomOpen(v => !v)}
            aria-label={mobileBottomOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="relative flex h-6 w-7 flex-col items-center justify-center justify-self-start"
          >
            <span
              className={`absolute h-0.5 w-7 bg-[#1C1814] transition-all duration-300 ${
                mobileBottomOpen ? 'rotate-45' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute h-0.5 w-7 bg-[#1C1814] transition-all duration-300 ${
                mobileBottomOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-7 bg-[#1C1814] transition-all duration-300 ${
                mobileBottomOpen ? '-rotate-45' : 'translate-y-2'
              }`}
            />
          </button>
          <a href="#" aria-label="MAG Studio" className="justify-self-center">
            <Logo className="h-7 w-auto" />
          </a>
          <a
            href="tel:+77083460065"
            aria-label="Позвонить"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1C1814] text-[#f2edea] justify-self-end transition active:scale-95"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>

        <AnimatePresence>
          {mobileBottomOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden border-b border-[#d5d4c8] bg-[#f2edea]/95 px-6 py-5"
            >
              <nav className="flex flex-col">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileBottomOpen(false)}
                    className="flex items-center justify-between border-b border-[#d5d4c8] py-3.5 text-base font-medium text-[#1C1814] last:border-0"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-[#989898]" />
                  </a>
                ))}
                <a
                  href="https://wa.me/77083460065"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileBottomOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#60899b] py-3 text-sm font-medium text-white"
                >
                  <img src="/whatsapp.svg" alt="" className="h-5 w-5" />
                  Написать в WhatsApp
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
