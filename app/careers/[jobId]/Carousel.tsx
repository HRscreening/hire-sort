'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel'
import { Sparkles, Zap, Bot, Mic, BarChart3, CheckCircle2, Star, Quote } from 'lucide-react'

const testimonials = [
    {
        avatar: 'PS',
        name: 'Puneet Sethiya',
        role: 'Co-Founder',
        company: 'Z42 Labs',
        stars: 5,
        text: 'HireSort reduced manual resume screening time while improving evaluation consistency.',
        highlightText: 'streamline our hiring workflow',
    },
    {
        avatar: 'MS',
        name: 'Mohak Sinha',
        role: `Founder's Office Associate`,
        company: 'IQ-Line',
        stars: 5,
        text: 'HireSort helped us shortlist quality candidates much faster with transparent AI scoring.',
        highlightText: 'shortlist quality candidates much faster',
    },

]

interface FeatureItem {
    id: string
    title: string
    category: string
    description: string
    imgSrc: string
    badgeIcon: React.ElementType
}

const features: FeatureItem[] = [
    {
        id: 'jd-gen',
        title: 'Instant AI Job Descriptions',
        category: 'JD Generation',
        description: 'Generate structured, candidate-focused job descriptions tailored to your role in seconds.',
        imgSrc: '/appScreenshots/agentic-jd-generation.png',
        badgeIcon: Sparkles,
    },
    {
        id: 'distribution',
        title: 'Multi-Board Job Distribution',
        category: 'Distribution',
        description: 'Publish job listings seamlessly across global job networks and your custom careers page.',
        imgSrc: '/appScreenshots/automated-job-posting.png',
        badgeIcon: Zap,
    },
    {
        id: 'screening',
        title: 'AI Resume Scoring & Ranking',
        category: 'Smart Screening',
        description: 'Instantly score and rank applicants against custom criteria with transparent evidence breakdowns.',
        imgSrc: '/appScreenshots/ai-resume-screening-table.png',
        badgeIcon: Bot,
    },
    {
        id: 'voice',
        title: 'Autonomous Voice Interviews',
        category: 'Voice AI',
        description: 'Conduct automated initial voice screenings with real-time conversational analysis and transcripts.',
        imgSrc: '/appScreenshots/ai-voice-screening-analysis.png',
        badgeIcon: Mic,
    },
    {
        id: 'funnel',
        title: 'Pipeline & Funnel Analytics',
        category: 'Analytics',
        description: 'Track candidate flow, time-to-hire, and applicant quality metrics across your hiring pipeline.',
        imgSrc: '/appScreenshots/14_Hiring funnel.png',
        badgeIcon: BarChart3,
    },
    {
        id: 'assessment',
        title: 'Deep Candidate Insights',
        category: 'Evaluation',
        description: 'Inspect detailed candidate strengths, key skill matches, and scorecards at a glance.',
        imgSrc: '/appScreenshots/15_candidate assessment.png',
        badgeIcon: CheckCircle2,
    },
]

function FirstIntroTestimonialCard() {
    const [activeReview, setActiveReview] = useState(0)
    const current = testimonials[activeReview]

    return (
        <CarouselItem className="pl-4 basis-full lg:basis-[75%] md:basis-[80%]">
            <div className="relative rounded-2xl border border-white/15 bg-copper p-5 md:p-6 shadow-xl text-white overflow-hidden h-full flex flex-col justify-between">

                {/* Ambient background glow */}
                <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative z-10">

                    {/* Left Side: HireSort Intro */}
                    <div className="md:col-span-6 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-light">
                                <Sparkles className="h-3.5 w-3.5 text-accent-light" />
                                HIRESORT AI PLATFORM
                            </span>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                            Intelligent Screening & Voice AI
                        </h3>
                        <p className="mt-1 text-xs md:text-sm text-white/75 leading-relaxed">
                            HireSort automates candidate ranking, resume evaluation, and AI voice interviews so your hiring team makes confident decisions faster.
                        </p>
                    </div>

                    {/* Right Side: User Review Box */}
                    <div className="md:col-span-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                                <Quote className="h-4 w-4 text-accent-light shrink-0" />
                                <span className="text-[11px] font-bold text-accent-light uppercase tracking-wider">
                                    Verified User Review
                                </span>
                            </div>

                            {/* Review Navigation Dots */}
                            <div className="flex items-center gap-1.5">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveReview(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeReview ? 'w-4 bg-accent' : 'w-1.5 bg-white/30 hover:bg-white/60'
                                            }`}
                                        aria-label={`View review ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="text-xs md:text-sm text-white/90 italic leading-relaxed mb-3">
                            "{current.text}"
                        </p>

                        <div className="flex items-center gap-2.5 border-t border-white/10 pt-2 border-dashed">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-white shrink-0">
                                {current.avatar}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-white truncate leading-none">{current.name}</p>
                                <p className="text-[11px] text-white/60 truncate mt-0.5">{current.role}, {current.company}</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </CarouselItem>
    )
}

export default function FeatureCarousel() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    // Use 5000ms (5 seconds) autoplay delay for a comfortable readable pace
    const autoplayRef = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
    )

    useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap())
        }

        api.on('select', onSelect)
        api.on('reInit', onSelect)

        return () => {
            api.off('select', onSelect)
            api.off('reInit', onSelect)
        }
    }, [api])

    return (
        <section className="w-full bg-linear-to-b from-ivory-light via-ivory to-ivory-light py-8 md:py-10 border-y border-line-soft overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 md:px-6">

                {/* Section Header */}
                <div className="text-center mb-6 max-w-2xl mx-auto">
                    {/* <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent mb-2">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>HIRESORT FEATURE SHOWCASE</span>
                    </div> */}
                    <h2 className="text-xl md:text-2xl font-bold text-charcoal tracking-tight">
                        Hire Smarter. Hire Faster. Stress Less.
                    </h2>
                    <div className='flex flex-col gap-1'>
                        <p className="mt-1 text-xs md:text-sm text-charcoal-md leading-relaxed">
                            HireSort is a new-age recruitment partner that helps you find the right candidates, faster.
                        </p>
                        <p className="mt-1 text-xs md:text-sm text-charcoal-md leading-relaxed">
                            Join a growing list of companies building stronger teams with less effort and zero hiring stress.
                        </p>

                    </div>
                </div>

                {/* Carousel Container with Generous Side Padding for Nav Buttons */}
                <div className="relative px-8 sm:px-14">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            loop: true,
                            align: 'start',
                        }}
                        plugins={[autoplayRef.current]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">

                            {/* Dedicated First Slide: HireSort AI Intro + User Reviews */}
                            <FirstIntroTestimonialCard />

                            {/* Feature Showcase Cards - Wide Horizontal Layout */}
                            {features.map((item) => {
                                const Icon = item.badgeIcon
                                return (
                                    <CarouselItem key={item.id} className="pl-4 basis-full lg:basis-[75%] md:basis-[80%]">
                                        <div className="group relative rounded-2xl border border-line-soft bg-ivory-light p-4 md:p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/30 h-full">

                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">

                                                {/* Left Side: Category, Title, Description */}
                                                <div className="md:col-span-5 flex flex-col justify-center">
                                                    <div className="flex items-center mb-2">
                                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-charcoal/5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-charcoal-md">
                                                            <Icon className="h-3.5 w-3.5 text-accent" />
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-base md:text-lg font-bold text-charcoal tracking-tight group-hover:text-accent transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-1.5 text-xs md:text-sm text-charcoal-md leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Right Side: Image Preview Container (Compact Aspect Ratio) */}
                                                <div className="md:col-span-7">
                                                    <div className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden rounded-xl border border-line-soft bg-ivory-medium shadow-inner">
                                                        <Image
                                                            src={item.imgSrc}
                                                            alt={item.title}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-linear-to-t from-charcoal/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>

                        {/* Navigation Buttons placed comfortably outside without overlapping cards */}
                        <div className="hidden sm:block">
                            <CarouselPrevious className="-left-6 sm:-left-10 border-line bg-ivory-light text-charcoal hover:bg-accent hover:text-white hover:border-accent shadow-md z-20" />
                            <CarouselNext className="-right-6 sm:-right-10 border-line bg-ivory-light text-charcoal hover:bg-accent hover:text-white hover:border-accent shadow-md z-20" />
                        </div>
                    </Carousel>

                    {/* Interactive Dot Indicator for Direct Slide Navigation */}
                    {count > 0 && (
                        <div className="flex items-center justify-center gap-2 mt-5">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${index === current
                                        ? 'w-7 bg-accent shadow-xs'
                                        : 'w-2.5 bg-charcoal/20 hover:bg-charcoal/40'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}






