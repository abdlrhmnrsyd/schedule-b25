"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import supabase client (keeping original data connection)
import { supabase } from "@/lib/supabaseClient";

type Jadwal = {
  id: number;
  hari: string;
  matkul: string;
  dosen: string;
  lokasi: string;
  jam_mulai: string;
  jam_selesai: string;
};

// Pixel Font Text Component
const PixelText = ({ children, className = "", size = "text-4xl", color = "text-white" }: { children: React.ReactNode; className?: string; size?: string; color?: string }) => {
  return (
    <motion.div
      className={`relative ${size} ${color} ${className}`}
      style={{
        fontFamily: '"Courier New", monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: `
          2px 0 0 #000,
          -2px 0 0 #000,
          0 2px 0 #000,
          0 -2px 0 #000,
          2px 2px 0 #000,
          -2px -2px 0 #000,
          2px -2px 0 #000,
          -2px 2px 0 #000
        `,
        imageRendering: 'pixelated'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

// Pixel Button Component
const PixelButton = ({ children, active, onClick, className = "" }: { children: React.ReactNode; active: boolean; onClick: () => void; className?: string }) => {
  return (
    <motion.button
      className={`relative px-4 py-2 text-sm font-bold ${className}`}
      style={{
        fontFamily: '"Courier New", monospace',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        backgroundColor: active ? '#00ff00' : '#333333',
        color: active ? '#000000' : '#ffffff',
        border: '3px solid',
        borderColor: active ? '#00ff00' : '#666666',
        borderRadius: '0px',
        boxShadow: active ? '-2px -2px 0px #00cc00, 2px 2px 0px #00cc00' : '-2px -2px 0px #333333, 2px 2px 0px #333333',
        textShadow: 'none',
        imageRendering: 'pixelated',
        cursor: 'pointer'
      }}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: active ? '#44ff44' : '#555555'
      }}
      whileTap={{ 
        scale: 0.95,
        y: 2
      }}
    >
      {children}
    </motion.button>
  );
};

// Pixel Stars Background
const PixelStars = () => {
  const [stars, setStars] = useState<{
    id: number;
    x: number;
    y: number;
    size: number;
    twinkle: boolean;
  }[]>([]);

  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() > 0.8 ? 3 : 2,
        twinkle: Math.random() > 0.7
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            imageRendering: 'pixelated'
          }}
          animate={star.twinkle ? {
            opacity: [1, 0.3, 1],
          } : {}}
          transition={star.twinkle ? {
            duration: 2 + Math.random() * 2,
            repeat: Infinity
          } : {}}
        />
      ))}
    </div>
  );
};

// Pixel Moon
const PixelMoon = () => {
  return (
    <motion.div
      className="fixed top-10 right-10 pointer-events-none z-10"
      animate={{
        rotate: [0, 360],
        y: [-5, 5, -5]
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        y: { duration: 4, repeat: Infinity }
      }}
    >
      <div className="relative w-16 h-16">
        {/* Moon Body */}
        <div 
          className="w-16 h-16 bg-gray-300"
          style={{
            borderRadius: '0px',
            background: `
              linear-gradient(45deg, 
                #e5e7eb 0%, #e5e7eb 25%, 
                #d1d5db 25%, #d1d5db 50%,
                #e5e7eb 50%, #e5e7eb 75%,
                #d1d5db 75%, #d1d5db 100%
              )`,
            backgroundSize: '4px 4px',
            imageRendering: 'pixelated',
            boxShadow: '2px 2px 0px #999999'
          }}
        />
        {/* Moon Craters */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-gray-400" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute top-8 right-3 w-3 h-3 bg-gray-400" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute bottom-2 left-4 w-2 h-2 bg-gray-400" style={{ imageRendering: 'pixelated' }} />
      </div>
    </motion.div>
  );
};

// Pixel Rocket
const PixelRocket = () => {
  return (
    <motion.div
      className="fixed bottom-20 left-10 pointer-events-none z-10"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
    >
      <motion.div
        animate={{
          y: [-2, 2, -2],
          x: [-1, 1, -1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity
        }}
      >
        <div className="relative w-12 h-20">
          {/* Rocket Body */}
          <div 
            className="w-8 h-16 mx-auto bg-gray-400"
            style={{
              background: `
                linear-gradient(0deg, 
                  #9ca3af 0%, #9ca3af 25%, 
                  #d1d5db 25%, #d1d5db 50%,
                  #9ca3af 50%, #9ca3af 75%,
                  #d1d5db 75%, #d1d5db 100%
                )`,
              backgroundSize: '2px 2px',
              imageRendering: 'pixelated'
            }}
          />
          {/* Rocket Nose */}
          <div 
            className="w-4 h-4 mx-auto bg-red-500"
            style={{ 
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              imageRendering: 'pixelated'
            }}
          />
          {/* Rocket Wings */}
          <div className="absolute bottom-0 left-0 w-2 h-4 bg-yellow-500" style={{ imageRendering: 'pixelated' }} />
          <div className="absolute bottom-0 right-0 w-2 h-4 bg-yellow-500" style={{ imageRendering: 'pixelated' }} />
          {/* Rocket Fire */}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity
            }}
          >
            <div className="w-2 h-3 bg-red-500" style={{ imageRendering: 'pixelated' }} />
            <div className="w-1 h-2 mx-auto bg-yellow-500" style={{ imageRendering: 'pixelated' }} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Pixel Planet
const PixelPlanet = () => {
  return (
    <motion.div
      className="fixed top-1/3 left-5 pointer-events-none z-5"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{
        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity }
      }}
    >
      <div className="relative w-12 h-12">
        {/* Planet Body */}
        <div 
          className="w-12 h-12 bg-blue-500"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, #3b82f6 0%, #1e40af 70%)
            `,
            imageRendering: 'pixelated',
            clipPath: 'circle(50% at 50% 50%)'
          }}
        />
        {/* Planet Rings */}
        <div 
          className="absolute inset-0 border-2 border-purple-400 opacity-50"
          style={{
            borderRadius: '50%',
            transform: 'scaleX(2) rotateZ(15deg)',
            imageRendering: 'pixelated'
          }}
        />
        <div 
          className="absolute inset-1 border border-purple-300 opacity-30"
          style={{
            borderRadius: '50%',
            transform: 'scaleX(2.5) rotateZ(15deg)',
            imageRendering: 'pixelated'
          }}
        />
      </div>
    </motion.div>
  );
};

// Pixel UFO
const PixelUFO = ({ mounted }: { mounted: boolean }) => {
  return (
    <motion.div
      className="fixed top-16 pointer-events-none z-10"
      initial={{ x: -100 }}
      animate={{ x: mounted ? window.innerWidth + 100 : -100 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        animate={{
          y: [-3, 3, -3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative w-16 h-8">
          {/* UFO Bottom */}
          <div 
            className="w-16 h-4 bg-gray-500"
            style={{
              background: `
                linear-gradient(90deg, 
                  #6b7280 0%, #9ca3af 50%, #6b7280 100%
                )`,
              clipPath: 'ellipse(50% 100% at 50% 100%)',
              imageRendering: 'pixelated'
            }}
          />
          {/* UFO Top */}
          <div 
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-cyan-400"
            style={{
              clipPath: 'ellipse(50% 100% at 50% 0%)',
              imageRendering: 'pixelated'
            }}
          />
          {/* UFO Lights */}
          <div className="absolute bottom-0 flex justify-between w-full px-1">
            <motion.div 
              className="w-1 h-1 bg-red-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ imageRendering: 'pixelated' }}
            />
            <motion.div 
              className="w-1 h-1 bg-green-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
              style={{ imageRendering: 'pixelated' }}
            />
            <motion.div 
              className="w-1 h-1 bg-blue-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.5 }}
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Pixel Satellite
const PixelSatellite = () => {
  return (
    <motion.div
      className="fixed top-1/4 right-1/4 pointer-events-none z-5"
      animate={{
        rotate: [0, 360],
        x: [0, 20, 0],
        y: [0, -10, 0]
      }}
      transition={{
        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        x: { duration: 5, repeat: Infinity },
        y: { duration: 3, repeat: Infinity }
      }}
    >
      <div className="relative w-8 h-8">
        {/* Satellite Body */}
        <div 
          className="w-6 h-6 mx-auto bg-gray-600"
          style={{ imageRendering: 'pixelated' }}
        />
        {/* Solar Panels */}
        <div className="absolute top-1 -left-2 w-2 h-4 bg-blue-600" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute top-1 -right-2 w-2 h-4 bg-blue-600" style={{ imageRendering: 'pixelated' }} />
        {/* Antenna */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-yellow-500" style={{ imageRendering: 'pixelated' }} />
        {/* Signal */}
        <motion.div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400"
          animate={{
            opacity: [1, 0, 1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [jadwal, setJadwal] = useState<Jadwal[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const [allRandomChars, setAllRandomChars] = useState<string[][]>([]);

  const dayOrder: Record<string, number> = useMemo(
    () => ({ senin: 1, selasa: 2, rabu: 3, kamis: 4, jumat: 5 }),
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const newAllRandomChars = Array.from({ length: 10 }, () =>
        Array.from({ length: 20 }, () =>
          ['★', '◆', '◇', '▲', '▼', '●', '◯', '■', '□'][Math.floor(Math.random() * 9)]
        )
      );
      setAllRandomChars(newAllRandomChars);
    }
  }, [mounted]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("jadwal").select("*");
      if (error) console.error(error);
      else {
        console.log("Data dari database:", data);
        setJadwal(data || []);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  const getDayName = (date: Date) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[date.getDay()];
  };

  const currentDayName = mounted ? getDayName(currentTime) : "";
  const nowTimeInMinutes = mounted
    ? currentTime.getHours() * 60 + currentTime.getMinutes()
    : 0;

  const toMinutes = (t: string) => {
    const [h, m] = t.slice(0, 5).split(":").map(Number);
    return h * 60 + m;
  };

  const isClassActive = (jadwal: Jadwal) => {
    if (!mounted || currentDayName.toLowerCase() !== jadwal.hari.toLowerCase()) return false;
    
    const classStart = toMinutes(jadwal.jam_mulai);
    const classEnd = toMinutes(jadwal.jam_selesai);
    
    return nowTimeInMinutes >= classStart && nowTimeInMinutes <= classEnd;
  };

  const { nextClass, timeUntilNextClass, currentClass } = useMemo(() => {
    if (!mounted) return { nextClass: null as Jadwal | null, timeUntilNextClass: "", currentClass: null as Jadwal | null };
    
    const todayList = [...jadwal]
      .filter((j) => j.hari?.toLowerCase() === currentDayName.toLowerCase())
      .sort((a, b) => toMinutes(a.jam_mulai) - toMinutes(b.jam_mulai));

    // Check for current class
    const current = todayList.find(j => isClassActive(j));

    for (const j of todayList) {
      const classStart = toMinutes(j.jam_mulai);
      if (classStart > nowTimeInMinutes) {
        const diff = classStart - nowTimeInMinutes;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        return {
          nextClass: j,
          timeUntilNextClass: `${h > 0 ? `${h}H ` : ""}${m}M`,
          currentClass: current || null
        };
      }
    }
    return { nextClass: null, timeUntilNextClass: "", currentClass: current || null };
  }, [mounted, jadwal, currentDayName, nowTimeInMinutes]);

  const filteredJadwal = useMemo(() => {
    const base = selectedDay
      ? jadwal.filter((j) => j.hari?.toLowerCase() === selectedDay.toLowerCase())
      : jadwal;

    return [...base].sort((a, b) => {
      const dayA = dayOrder[a.hari?.toLowerCase() || ""] ?? 99;
      const dayB = dayOrder[b.hari?.toLowerCase() || ""] ?? 99;
      if (dayA !== dayB) return dayA - dayB;
      return toMinutes(a.jam_mulai) - toMinutes(b.jam_mulai);
    });
  }, [jadwal, selectedDay, dayOrder]);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, #000011 0%, #000033 50%, #001122 100%)
        `,
        imageRendering: 'pixelated'
      }}
    >
      <PixelStars />
      <PixelMoon />
      <PixelRocket />
      <PixelPlanet />
      <PixelUFO mounted={mounted} />
      <PixelSatellite />
      
      {/* Pixel Grid Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
          imageRendering: 'pixelated'
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 p-8">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <PixelText size="text-6xl" color="text-cyan-400" className="mb-4">
            TRPL 1B SCHEDULE
          </PixelText>
          
          
          {/* Pixel Border */}
          <motion.div
            className="h-4 w-96 mx-auto mt-6"
            style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  #00ff00 0px, #00ff00 8px,
                  #ff00ff 8px, #ff00ff 16px,
                  #00ffff 16px, #00ffff 24px
                )
              `,
              imageRendering: 'pixelated',
              border: '2px solid #ffffff'
            }}
            animate={{
              opacity: [1, 0.7, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Mission Control Display */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-2xl mx-auto relative">
            <div 
              className="p-8 relative"
              style={{
                backgroundColor: '#001122',
                border: '4px solid #00ff00',
                imageRendering: 'pixelated',
                boxShadow: `
                   -4px -4px 0px #00cc00,
                   4px 4px 0px #00cc00,
                   0 0 20px rgba(0, 255, 0, 0.5),
                   inset 0 0 20px rgba(0, 255, 0, 0.1)
                 `
               }}
            >
              {/* Corner Pixels */}
              <div className="absolute top-0 left-0 w-4 h-4 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />
              <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />

              {/* Mission Clock */}
              <motion.div
                className="text-5xl mb-6"
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontWeight: 'bold',
                  color: '#00ff00',
                  textShadow: `
                    2px 0 0 #000,
                    -2px 0 0 #000,
                    0 2px 0 #000,
                    0 -2px 0 #000,
                    0 0 10px #00ff00
                  `,
                  imageRendering: 'pixelated'
                }}
                animate={{
                  textShadow: [
                    '2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 0 0 10px #00ff00',
                    '2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 0 0 20px #ffff00',
                    '2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 0 0 10px #00ff00'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {mounted
                  ? currentTime.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "••:••:••"}
              </motion.div>

              {/* Mission Status */}
              {mounted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {currentClass ? (
                    <div 
                      className="p-4 mb-4"
                      style={{
                        backgroundColor: '#220000',
                        border: '3px solid #ff0000',
                        imageRendering: 'pixelated'
                      }}
                    >
                      <PixelText size="text-lg" color="text-red-400" className="mb-2">
                        ⚠ ACTIVE CLASS ⚠
                      </PixelText>
                      <PixelText size="text-xl" color="text-white">
                        {currentClass.matkul}
                      </PixelText>
                      <div 
                        className="text-sm mt-2"
                        style={{
                          fontFamily: '"Courier New", monospace',
                          color: '#cccccc'
                        }}
                      >
                        ROOM: {currentClass.lokasi} | ENDS: {currentClass.jam_selesai.slice(0, 5)}
                      </div>
                      {nextClass && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <PixelText size="text-md" color="text-yellow-400" className="mb-1">
                            → UP NEXT
                          </PixelText>
                          <div 
                            className="text-sm"
                            style={{
                              fontFamily: '"Courier New", monospace',
                              color: '#ffffff'
                            }}
                          >
                            {nextClass.matkul} at {nextClass.jam_mulai.slice(0, 5)} ({timeUntilNextClass})
                          </div>
                        </div>
                      )}
                    </div>
                  ) : nextClass ? (
                    <div>
                      <PixelText size="text-lg" color="text-cyan-400" className="mb-2">
                        → NEXT CLASS
                      </PixelText>
                      <PixelText size="text-xl" color="text-yellow-400">
                        {nextClass.matkul}
                      </PixelText>
                      <div 
                        className="text-sm mt-2"
                        style={{
                          fontFamily: '"Courier New", monospace',
                          color: '#cccccc'
                        }}
                      >
                        START AT: {nextClass.jam_mulai.slice(0, 5)} ({timeUntilNextClass})
                      </div>
                    </div>
                  ) : (
                    <PixelText size="text-lg" color="text-gray-400">
                      NO ACTIVE MISSIONS
                    </PixelText>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Day Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-wrap gap-2 md:gap-4">
            <PixelButton
              active={selectedDay === ""}
              onClick={() => setSelectedDay("")}
              className="text-xs md:text-sm"
            >
              ★ ALL DAYS ★
            </PixelButton>
            {daysOfWeek.map((day) => (
              <PixelButton
                key={day}
                active={selectedDay === day}
                onClick={() => setSelectedDay(day)}
                className="text-xs md:text-sm"
              >
                {day}
              </PixelButton>
            ))}
          </div>
        </motion.div>

        {/* Mission Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <AnimatePresence mode="wait">
            {filteredJadwal.length > 0 ? (
              filteredJadwal.map((j, index) => (
                <motion.div
                  key={j.id}
                  className="relative"
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5
                  }}
                >
                  <div 
                    className="p-6 h-full relative"
                    style={{
                      backgroundColor: isClassActive(j) ? '#220011' : '#001122',
                      border: `4px solid ${isClassActive(j) ? '#ff0000' : '#00ffff'}`,
                      imageRendering: 'pixelated',
                      boxShadow: isClassActive(j) 
                        ? '-3px -3px 0px #cc0000, 3px 3px 0px #cc0000, 0 0 20px rgba(255, 0, 0, 0.6), inset 0 0 10px rgba(255, 0, 0, 0.2)'
                        : '-3px -3px 0px #00cccc, 3px 3px 0px #00cccc, 0 0 15px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.1)'
                    }}
                  >
                    {/* Corner Decorative Pixels */}
                    <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />
                    <div className="absolute bottom-1 left-1 w-2 h-2 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />

                    {/* Mission Header */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className="px-2 py-1 text-xs font-bold"
                        style={{
                          backgroundColor: '#00ff00',
                          color: '#000000',
                          fontFamily: '"Courier New", monospace',
                          border: '2px solid #ffffff',
                          imageRendering: 'pixelated'
                        }}
                        whileHover={{ 
                          backgroundColor: '#44ff44',
                          scale: 1.1
                        }}
                      >
                        {j.hari.toUpperCase()}
                      </motion.div>
                      
                      <motion.div 
                        className="px-2 py-1 text-xs"
                        style={{
                          backgroundColor: '#ff00ff',
                          color: '#ffffff',
                          fontFamily: '"Courier New", monospace',
                          border: '2px solid #ffffff',
                          imageRendering: 'pixelated'
                        }}
                        whileHover={{ 
                          backgroundColor: '#ff44ff',
                          scale: 1.1
                        }}
                      >
                        {j.jam_mulai.slice(0, 5)}-{j.jam_selesai.slice(0, 5)}
                      </motion.div>
                    </div>

                    {/* Mission Title */}
                    <motion.h2
                      className="text-lg font-bold mb-4"
                      style={{
                        fontFamily: '"Courier New", monospace',
                        color: isClassActive(j) ? '#ff4444' : '#ffffff',
                        textShadow: `
                          1px 0 0 #000,
                          -1px 0 0 #000,
                          0 1px 0 #000,
                          0 -1px 0 #000,
                          0 0 8px ${isClassActive(j) ? '#ff0000' : '#00ffff'}
                        `,
                        imageRendering: 'pixelated',
                        lineHeight: '1.2'
                      }}
                      animate={isClassActive(j) ? {
                        textShadow: [
                          '1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 0 0 8px #ff0000',
                          '1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 0 0 16px #ff4444',
                          '1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 0 0 8px #ff0000'
                        ]
                      } : {}}
                      transition={{ duration: 1, repeat: isClassActive(j) ? Infinity : 0 }}
                    >
                      {j.matkul}
                    </motion.h2>

                    {/* Mission Details */}
                    <div className="space-y-2">
                      <div 
                        className="text-sm"
                        style={{
                          fontFamily: '"Courier New", monospace',
                          color: '#cccccc'
                        }}
                      >
                        <span className="text-cyan-400 font-bold">DOSEN:</span> {j.dosen}
                      </div>
                      <div 
                        className="text-sm"
                        style={{
                          fontFamily: '"Courier New", monospace',
                          color: '#cccccc'
                        }}
                      >
                        <span className="text-cyan-400 font-bold">RUANGAN:</span> {j.lokasi}
                      </div>
                    </div>

                    {/* Active Mission Indicator */}
                    {isClassActive(j) && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div 
                          className="w-6 h-6 bg-red-500 relative"
                          style={{ imageRendering: 'pixelated' }}
                        >
                          <motion.div 
                            className="absolute inset-1 bg-red-300"
                            animate={{
                              opacity: [1, 0.3, 1]
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                            style={{ imageRendering: 'pixelated' }}
                          />
                          <div className="absolute inset-2 bg-white" style={{ imageRendering: 'pixelated' }} />
                        </div>
                      </motion.div>
                    )}

                    {/* Scanning Animation */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.8) 50%, transparent 100%)',
                        height: '2px',
                        width: '100%'
                      }}
                      animate={{
                        y: [0, 150, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <PixelText size="text-2xl" color="text-gray-400" className="mb-4">
                  ★ NO MISSIONS DETECTED ★
                </PixelText>
                <div 
                  className="text-sm"
                  style={{
                    fontFamily: '"Courier New", monospace',
                    color: '#666666'
                  }}
                >
                  [ CHECK TRANSMISSION OR ADJUST PARAMETERS ]
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Space Station Footer */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div 
            className="mb-4"
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '10px',
              color: '#666666',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            ★ ONLINE SCHEDULE | @SCRIPTB25 ★
          </div>
          
          {/* System Status */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <motion.div
              className="w-2 h-2 bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ imageRendering: 'pixelated' }}
            />
            <span 
              className="text-green-400 text-xs"
              style={{ fontFamily: '"Courier New", monospace' }}
            >
              SYSTEMS_ONLINE
            </span>
            <motion.div
              className="w-2 h-2 bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* Animated Rocket Footer */}
          <motion.div
            className="text-2xl"
            animate={{
              y: [-3, 3, -3],
              rotate: [-2, 2, -2]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="relative w-8 h-12 mx-auto">
              {/* Simple Pixel Rocket */}
              <div 
                className="w-6 h-10 mx-auto bg-gray-400"
                style={{
                  background: `
                    linear-gradient(0deg, 
                      #9ca3af 0%, #9ca3af 30%, 
                      #d1d5db 30%, #d1d5db 70%,
                      #9ca3af 70%, #9ca3af 100%
                    )`,
                  imageRendering: 'pixelated'
                }}
              />
              <div 
                className="w-3 h-3 mx-auto bg-red-500"
                style={{ 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  imageRendering: 'pixelated'
                }}
              />
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
              >
                <div className="w-2 h-2 bg-red-500" style={{ imageRendering: 'pixelated' }} />
                <div className="w-1 h-1 mx-auto bg-yellow-500" style={{ imageRendering: 'pixelated' }} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Floating Pixel Elements */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden opacity-20">
        {allRandomChars.map((row, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400"
            style={{
              left: `${10 + i * 10}%`,
              fontFamily: '"Courier New", monospace',
              fontSize: '12px'
            }}
            initial={{ y: -50 }}
            animate={{ y: mounted ? window.innerHeight + 50 : -50 }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
          >
            {row.map((char, j) => (
              <div key={j} className="leading-4" style={{ imageRendering: 'pixelated' }}>
                {char}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Pixel Scan Line */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-15"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.1) 49%, rgba(0, 255, 255, 0.3) 50%, rgba(0, 255, 255, 0.1) 51%, transparent 100%)',
          height: '2px',
          width: '100%',
          imageRendering: 'pixelated'
        }}
        animate={{ y: mounted ? [0, window.innerHeight, 0] : [0, 0, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}