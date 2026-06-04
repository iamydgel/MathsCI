"use client";

import { cn } from "@/lib/utils";
import {
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    Video,
    Globe,
} from "lucide-react";

export interface BentoItem {
    title: React.ReactNode;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items?: BentoItem[];
}

const itemsSample: BentoItem[] = [
    {
        title: "Analytics Dashboard",
        meta: "v2.4.1",
        description:
            "Real-time metrics with AI-powered insights and predictive analytics",
        icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
        status: "Live",
        tags: ["Statistics", "Reports", "AI"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Task Manager",
        meta: "84 completed",
        description: "Automated workflow management with priority scheduling",
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
        status: "Updated",
        tags: ["Productivity", "Automation"],
    },
    {
        title: "Media Library",
        meta: "12GB used",
        description: "Cloud storage with intelligent content processing",
        icon: <Video className="w-4 h-4 text-purple-500" />,
        tags: ["Storage", "CDN"],
        colSpan: 2,
    },
    {
        title: "Global Network",
        meta: "6 regions",
        description: "Multi-region deployment with edge computing",
        icon: <Globe className="w-4 h-4 text-sky-500" />,
        status: "Beta",
        tags: ["Infrastructure", "Edge"],
    },
];

function BentoGrid({ items = itemsSample }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-xl overflow-hidden transition-all duration-300",
                        "border border-gray-200/80 bg-white",
                        "hover:shadow-lg hover:border-ci-orange/25",
                        "hover:-translate-y-0.5 will-change-transform",
                        item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                        {
                            "shadow-lg -translate-y-0.5 border-ci-orange/20":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    <div
                        className={`absolute inset-0 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.015)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    <div className="relative flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-ci-green-light text-ci-green group-hover:bg-ci-orange/10 group-hover:text-ci-orange transition-all duration-300">
                                {item.icon}
                            </div>
                            <span
                                className={cn(
                                    "text-[10px] font-semibold px-2.5 py-1 rounded-md tracking-wider uppercase",
                                    "bg-ci-cream border border-gray-200/50 text-ci-gray",
                                    "transition-colors duration-300 group-hover:bg-ci-orange/5 group-hover:text-ci-orange"
                                )}
                            >
                                {item.status || "Active"}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-poppins font-semibold text-ci-dark tracking-tight text-[16px]">
                                {item.title}
                                <span className="ml-2 text-xs text-ci-gray font-normal font-tabular">
                                    {item.meta}
                                </span>
                            </h3>
                            <p className="text-sm text-ci-gray leading-relaxed font-light font-inter">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100/60">
                            <div className="flex items-center space-x-2 text-[10px] font-medium text-ci-gray">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 rounded-md bg-ci-sand/60 text-ci-gray transition-all duration-200 hover:bg-ci-orange/10 hover:text-ci-orange"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-xs font-semibold text-ci-orange opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                                {item.cta || "En savoir plus →"}
                            </span>
                        </div>
                    </div>

                    <div
                        className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-ci-orange/10 to-transparent ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    />
                </div>
            ))}
        </div>
    );
}

export { BentoGrid };
