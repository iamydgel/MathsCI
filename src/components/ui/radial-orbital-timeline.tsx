"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.15) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220; // Increased radius to give nodes more space
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "bg-ci-green-light text-ci-green border-ci-green/20";
      case "in-progress":
        return "bg-ci-orange/10 text-ci-orange border-ci-orange/20 animate-pulse";
      case "pending":
        return "bg-ci-sand/60 text-ci-gray border-gray-200";
      default:
        return "bg-ci-sand/60 text-ci-gray border-gray-200";
    }
  };

  if (!mounted) {
    return (
      <div className="w-full h-[640px] flex items-center justify-center bg-transparent" />
    );
  }

  return (
    <div
      className="w-full h-[640px] flex flex-col items-center justify-center bg-transparent overflow-hidden select-none relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Glowing orbital center (Math & CI themed) */}
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-ci-orange via-ci-green to-ci-orange-soft animate-pulse flex items-center justify-center z-10 shadow-lg shadow-ci-orange/10">
            <div className="absolute w-18 h-18 rounded-full border border-ci-orange/10 animate-ping opacity-60"></div>
            <div
              className="absolute w-22 h-22 rounded-full border border-ci-green/10 animate-ping opacity-40"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center font-bold text-xs text-ci-green font-space-grotesk">
              π
            </div>
          </div>

          {/* Central orbit ring */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-ci-orange/15 pointer-events-none"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer flex flex-col items-center justify-center"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Dynamic Energy Wave around nodes */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,122,0,0.15) 0%, rgba(255,122,0,0) 70%)`,
                    width: `${item.energy * 0.4 + 40}px`,
                    height: `${item.energy * 0.4 + 40}px`,
                    left: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* The Node Icon Circle */}
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-ci-orange text-white shadow-lg shadow-ci-orange/30 border-ci-orange"
                      : isRelated
                      ? "bg-ci-green text-white border-ci-green"
                      : "bg-white text-ci-green hover:text-ci-orange border-gray-200"
                  }
                  border-2 
                  ${
                    isRelated && !isExpanded ? "animate-pulse" : ""
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125" : "hover:scale-110"}
                `}
                >
                  <Icon size={16} />
                </div>

                {/* Node Title Label */}
                <div
                  className={`
                  absolute top-11 whitespace-nowrap
                  text-[10px] font-bold tracking-wider uppercase font-poppins
                  transition-all duration-300
                  ${isExpanded ? "text-ci-orange scale-110 font-bold" : "text-ci-dark/80"}
                `}
                >
                  {item.title}
                </div>

                {/* Popup Details Card */}
                {isExpanded && (
                  <Card className="absolute top-16 w-80 bg-white border border-gray-200/80 shadow-2xl shadow-ci-dark/5 overflow-visible select-text text-left">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-ci-orange/30"></div>
                    
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center gap-3">
                        <Badge
                          variant="orange"
                          className={`shrink-0 whitespace-nowrap px-2.5 py-0.5 text-[8px] font-bold tracking-wider rounded-md border ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "OPÉRATIONNEL"
                            : item.status === "in-progress"
                            ? "EN ÉVOLUTION"
                            : "PRÉVU"}
                        </Badge>
                        <span className="text-[10px] font-bold text-ci-gray text-right truncate">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm font-poppins font-semibold text-ci-dark mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-0 text-xs text-ci-gray leading-relaxed font-light font-inter">
                      <p>{item.content}</p>

                      {/* Energy/Integration Level bar */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center text-[10px] mb-1 text-ci-dark font-medium">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1 text-ci-orange" />
                            Taux d'Intégration
                          </span>
                          <span className="font-bold font-tabular">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-ci-green to-ci-orange"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Related connected nodes links */}
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center mb-2 text-ci-dark font-medium">
                            <LinkIcon size={10} className="text-ci-green mr-1" />
                            <h4 className="text-[9px] uppercase tracking-wider font-bold">
                              Domaines Connectés
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0.5 text-[9px] rounded-md border-ci-green/10 bg-transparent text-ci-green hover:bg-ci-green-light hover:text-ci-green transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-ci-green/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
