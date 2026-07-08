"use client";

import { motion } from "motion/react";
import { statsFallback } from "@/lib/fallback/home";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity.types";

export type StatsData = NonNullable<HOME_PAGE_QUERY_RESULT>["stats"];

export default function StatsBar({ data }: { data?: StatsData | null }) {
  const stats = data?.items?.length ? data.items : statsFallback;

  return (
    <section className="bg-primary text-primary-foreground py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 100 C 300 250, 700 -50, 1100 150 C 1200 200, 1500 100, 1600 80"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat._key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 24,
                mass: 0.8,
              }}
            >
              <p className="text-4xl lg:text-5xl font-extrabold font-heading text-sky-300">
                {stat.value}
              </p>
              <p className="text-sm mt-2 text-sky-100">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
