import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Box,
  Typography, 
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline, 
  GlobalStyles,
  Grid,
  Chip,
  Avatar,
  Tab,
  Tabs,
  Paper,
  Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff"; 
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DarknessIcon from "@mui/icons-material/NightsStay";
import ShieldIcon from "@mui/icons-material/Shield";
import WaterIcon from "@mui/icons-material/WaterDrop";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import PianoIcon from "@mui/icons-material/Piano";

// 1. เมาส์ตอนปกติ (เขียวอ่อน -> ชมพูอ่อน / ไม่มีสีเหลือง / สบายตา)
const normalCraneCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23C5FF75' /%3E%3Cstop offset='100%25' stop-color='%23FF9EE2' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='rgba(197,255,117,0.08)' stroke='url(%23grad3)' stroke-width='4' stroke-linejoin='round' stroke-linecap='round' filter='drop-shadow(0px 0px 4px rgba(197,255,117,0.4))'%3E%3Cpolygon points='40,65 35,25 15,40 28,40' /%3E%3Cpolygon points='40,65 10,55 52,50' /%3E%3Cpolygon points='52,50 75,15 60,70' /%3E%3Cpolygon points='60,70 90,75 52,50' /%3E%3Cpolygon points='40,65 48,85 60,70 52,50' /%3E%3Cline x1='48' y1='85' x2='52' y2='50' /%3E%3C/g%3E%3C/svg%3E") 4 12, auto`;

// 2. เมาส์ตอนชี้ (เขียวสด -> ชมพูเข้ม / ปีกกระพือ / แสงไม่จ้าเกินไป)
const pointerCraneCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%239ACD32' /%3E%3Cstop offset='100%25' stop-color='%23FF1493' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='rgba(154,205,50,0.1)' stroke='url(%23grad4)' stroke-width='4.5' stroke-linejoin='round' stroke-linecap='round' filter='drop-shadow(0px 0px 5px rgba(154,205,50,0.45))'%3E%3Cpolygon points='40,65 35,25 15,40 28,40' /%3E%3Cpolygon points='40,65 15,45 52,50' /%3E%3Cpolygon points='52,50 85,25 60,70' /%3E%3Cpolygon points='60,70 90,75 52,50' /%3E%3Cpolygon points='40,65 48,85 60,70 52,50' /%3E%3Cline x1='48' y1='85' x2='52' y2='50' /%3E%3C/g%3E%3C/svg%3E") 4 12, pointer`;

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8DF9FF" },
    secondary: { main: "#FF9EE2" },
    background: { default: "#071324", paper: "rgba(7, 19, 36, 0.7)" },
    text: { primary: "#E2F1FF", secondary: "#A9BCD0" },
  },
  typography: {
    fontFamily: "'Sarabun', 'Cinzel', sans-serif",
  },
});

const TopDownShark = ({ glowColor, fillCol = "#FFFFFF", delay = 0 }) => {
  const swimTransition = {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  };

  const tailRight =
    "M 50,1 C 57,2 67,18 68,40 C 78,50 84,65 82,75 C 76,70 70,62 64,60 C 64,75 64,85 64,95 C 66,98 68,101 68,105 C 64,107 64,112 66,120 C 80,130 96,140 98,148 C 84,140 74,136 68,136 C 55,136 45,142 38,148 C 45,138 52,130 56,120 C 52,112 52,107 50,105 C 52,101 54,98 52,95 C 46,85 44,75 40,60 C 32,62 24,70 18,75 C 16,65 22,50 32,40 C 33,18 43,2 50,2 Z";

  const tailLeft =
    "M 50,1 C 57,2 67,18 68,40 C 78,50 84,65 82,75 C 76,70 70,62 64,60 C 60,75 56,85 54,95 C 52,98 52,101 54,105 C 48,107 48,112 44,120 C 52,130 60,138 66,148 C 58,142 46,136 34,136 C 26,136 14,140 2,148 C 6,140 22,130 36,120 C 40,112 40,107 36,105 C 36,101 38,98 42,95 C 40,85 38,75 36,60 C 32,62 24,70 18,75 C 16,65 22,50 32,40 C 33,18 43,2 50,2 Z";
  return (
    <motion.div
      animate={{
        y: [0, -5, 0, 5, 0],
        rotate: [-3, 3, -3],
      }}
      transition={swimTransition}
      style={{ width: "100%", height: "100%", transformOrigin: "center" }}
    >
      <svg
        viewBox="0 0 100 150"
        width="100%"
        height="100%"
        style={{
          filter: glowColor ? `drop-shadow(0 0 12px ${glowColor})` : "none",
        }}
      >
        <motion.path
          animate={{
            d: [tailRight, tailLeft, tailRight],
          }}
          transition={swimTransition}
          fill={fillCol}
          opacity="0.9"
        />
        <path
          d="M 50,42 C 55,52 55,68 50,78 C 45,68 45,52 50,42 Z"
          fill="#000000"
          opacity="0.25"
        />
      </svg>
    </motion.div>
  );
};

// 1. Shark Preloader Screen (Deep Sea Edition)
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const loadParticles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 3,
        size: Math.random() * 3 + 1,
        isBioluminescent: Math.random() > 0.7,
      })),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "linear-gradient(to bottom, #071324 0%, #02050A 50%, #000000 100%)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{
          opacity: [0.15, 0.25, 0.15],
          transform: [
            "rotate(-15deg) translateX(-5%)",
            "rotate(-15deg) translateX(5%)",
            "rotate(-15deg) translateX(-5%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          left: "-20%",
          width: "150vw",
          height: "100vh",
          background:
            "linear-gradient(180deg, rgba(64, 115, 184, 0.2) 0%, transparent 80%)",
          filter: "blur(50px)",
          transformOrigin: "top center",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "80vw",
          height: "90vh",
          background:
            "linear-gradient(180deg, rgba(82, 142, 204, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "rotate(10deg)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          width: "80vw",
          height: "40vh",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(30, 80, 110, 0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {loadParticles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{
            y: "-10vh",
            x: [0, Math.random() * 30 - 15, Math.random() * -30 + 15, 0],
            opacity: [0, particle.isBioluminescent ? 0.8 : 0.4, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: particle.left,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.isBioluminescent ? "#8DF9FF" : "#B0C4DE",
            borderRadius: "50%",
            boxShadow: particle.isBioluminescent
              ? "0 0 12px 2px rgba(141, 249, 255, 0.6)"
              : "none",
            filter: particle.isBioluminescent ? "blur(0.5px)" : "blur(1px)",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 1.2] }}
        transition={{
          duration: 4.8,
          times: [0, 0.2, 0.8, 1],
          ease: "easeInOut",
        }}
        style={{ position: "absolute", width: 280, height: 280 }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: i * 1.1,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 160,
              height: 160,
              marginLeft: -80,
              marginTop: -80,
              borderRadius: "50%",
              border: "1px solid rgba(141, 249, 255, 0.3)",
              boxShadow:
                "inset 0 0 30px rgba(82, 142, 204, 0.15), 0 0 20px rgba(141, 249, 255, 0.1)",
            }}
          />
        ))}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -30,
              left: "50%",
              width: 75,
              height: 112,
              transform: "translateX(-50%) rotate(90deg)",
            }}
          >
            <TopDownShark glowColor="#8DF9FF" delay={0} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              left: "50%",
              width: 75,
              height: 112,
              transform: "translateX(-50%) rotate(-90deg)",
            }}
          >
            <TopDownShark glowColor="#3A6D8C" delay={1.5} />
          </Box>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [30, 0, 0, -30],
          filter: ["blur(15px)", "blur(0px)", "blur(0px)", "blur(15px)"],
        }}
        transition={{
          duration: 4.8,
          times: [0, 0.25, 0.75, 1],
          ease: "easeInOut",
        }}
        style={{ textAlign: "center", zIndex: 10, pointerEvents: "none" }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#FFFFFF",
            mb: 2,
            textShadow:
              "0 0 30px rgba(141, 249, 255, 0.7), 0 2px 10px rgba(0,0,0,0.8)",
            fontFamily: "'Cinzel', serif",
            letterSpacing: 6,
          }}
        >
          氷雨 響羅
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#A9BCD0",
            fontStyle: "italic",
            opacity: 0.9,
            letterSpacing: 2,
            textShadow: "0 2px 5px rgba(0,0,0,0.9)",
          }}
        >
          "แหวกว่ายอย่างโดดเดี่ยว... ในห้วงลึกที่แสงสว่างส่องไม่ถึง"
        </Typography>
      </motion.div>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </motion.div>
  );
};

// 2. Realistic Crystal Rain & Mist Atmosphere (Updated to blend with deep sea gradient)
const AbyssalAtmosphere = () => {
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => ({
        id: `rain-${i}`,
        left: `${Math.random() * 100}vw`,
        duration: Math.random() * 0.5 + 0.6,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.4 + 0.1,
        height: `${Math.random() * 15 + 10}vh`,
        width: Math.random() > 0.8 ? "1.5px" : "1px",
      })),
    [],
  );
  const ripples = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: `ripple-${i}`,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        delay: Math.random() * 5,
        duration: Math.random() * 2 + 2,
      })),
    [],
  );
  const sparkles = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: `sparkle-${i}`,
        left: `${Math.random() * 100}vw`,
        bottom: `${Math.random() * 30}vh`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        size: Math.random() * 2.5 + 1,
      })),
    [],
  );

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        background: "linear-gradient(to bottom, #071324 0%, #02050A 50%, #000000 100%)", // นำ Gradient จาก Loading มาใช้
      }}
    >
      <motion.div
        animate={{ x: ["-5%", "5%", "-5%"], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "5%",
          left: "-10%",
          width: "120vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse at center, rgba(141, 249, 255, 0.08) 0%, transparent 60%)", // เปลี่ยนแสงหมอกให้เหลือบ Cyan เบาๆ
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ x: ["5%", "-5%", "5%"], opacity: [0.03, 0.1, 0.03] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "100vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />

      {rainDrops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: "-20vh" }}
          animate={{ y: "120vh" }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: drop.left,
            width: drop.width,
            height: drop.height,
            background: `linear-gradient(to bottom, transparent, rgba(240, 248, 255, ${drop.opacity}))`,
            borderRadius: "4px",
          }}
        />
      ))}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0.5, 0.2, 0] }}
          transition={{
            duration: ripple.duration,
            delay: ripple.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            left: ripple.left,
            top: ripple.top,
            width: "50px",
            height: "25px",
            borderRadius: "50%",
            border: "1px solid rgba(141, 249, 255, 0.3)", // เปลี่ยนคลื่นน้ำเป็นสีฟ้า Cyan
            transform: "rotateX(60deg)",
          }}
        />
      ))}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{
            y: "-15vh",
            x: [0, 10, -10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: sparkle.left,
            bottom: sparkle.bottom,
            width: sparkle.size,
            height: sparkle.size,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 0 8px rgba(141, 249, 255, 0.8)", // เปล่งแสง Cyan
          }}
        />
      ))}
    </Box>
  );
};

// --- Custom Reusable Glass Card Component ---
const GlassCard = ({ children, sx = {}, ...props }) => (
  <Paper
    elevation={0}
    sx={{
      background: "rgba(11, 25, 44, 0.55)", // สีน้ำเงินเข้มโปร่งแสง กลมกลืนกับพื้นหลัง
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(141, 249, 255, 0.15)",
      borderRadius: "20px",
      padding: { xs: "20px", md: "28px" },
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(141, 249, 255, 0.03)", // เพิ่ม inner glow เล็กน้อย
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      "&:hover": {
        borderColor: "rgba(141, 249, 255, 0.4)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 25px rgba(141, 249, 255, 0.08)",
      },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Paper>
);

// --- Custom Section Header Component ---
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
    {Icon && (
      <Box
        sx={{
          p: 1,
          borderRadius: "12px",
          background: "rgba(141, 249, 255, 0.1)",
          color: "#8DF9FF",
          display: "flex",
          boxShadow: "0 0 15px rgba(141, 249, 255, 0.2)", // ให้ไอคอนหัวข้อเรืองแสง
        }}
      >
        <Icon fontSize="medium" />
      </Box>
    )}
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: 1,
          fontFamily: "'Cinzel', 'Sarabun', serif",
          textShadow: "0 0 10px rgba(141, 249, 255, 0.4)",
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" sx={{ color: "#94A3B8" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

// --- Main Page Component ---
export default function KyoraProfile() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!loading && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.log("Autoplay prevented. User interaction required.", error);
          setIsPlaying(false);
        });
    }
  }, [loading]);

  const toggleMusic = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "body, html": {
            cursor: `${normalCraneCursor} !important`,
            background: "#02050A", // เผื่อ Fallback 
            overflowX: "hidden",
          },
          "a, button, [role='button'], .MuiAccordionSummary-root, .MuiIconButton-root, .MuiButtonBase-root":
            {
              cursor: `${pointerCraneCursor} !important`,
            },
          "::-webkit-scrollbar": { width: "6px" },
          "::-webkit-scrollbar-track": { background: "transparent" },
          "::-webkit-scrollbar-thumb": {
            background: "rgba(141, 249, 255, 0.3)",
            borderRadius: "10px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "rgba(141, 249, 255, 0.6)",
            boxShadow: "0 0 10px rgba(141, 249, 255, 0.5)",
          },
        }}
      />

      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=rain-and-nostalgia-11234.mp3"
      />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ position: "relative", zIndex: 2, minHeight: "100vh" }}
        >
          <AbyssalAtmosphere />

          {/* Floating Music Control Button */}
          <Box
            sx={{
              position: "fixed",
              top: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <IconButton
              onClick={toggleMusic}
              sx={{
                background: "rgba(10, 20, 35, 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(141, 249, 255, 0.4)",
                color: isPlaying ? "#8DF9FF" : "#FF9EE2",
                boxShadow: "0 0 20px rgba(141, 249, 255, 0.3)",
                p: 1.5,
                "&:hover": {
                  background: "rgba(20, 35, 60, 0.9)",
                  transform: "scale(1.08)",
                  boxShadow: "0 0 25px rgba(141, 249, 255, 0.5)",
                },
              }}
            >
              {isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}
            </IconButton>
          </Box>

          {/* Main Layout Container */}
          <Box
            sx={{
              maxWidth: "1280px",
              margin: "0 auto",
              px: { xs: 2, sm: 4, md: 6 },
              py: { xs: 4, md: 8 },
            }}
          >
            {/* HERO SECTION / PROFILE HEADER */}
            <GlassCard sx={{ mb: 4, p: { xs: 3, md: 5 } }}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      sx={{
                        width: { xs: 130, md: 170 },
                        height: { xs: 130, md: 170 },
                        margin: "0 auto",
                        border: "3px solid rgba(141, 249, 255, 0.8)",
                        boxShadow: "0 0 35px rgba(141, 249, 255, 0.5)",
                        background:
                          "linear-gradient(135deg, #071324 0%, #1A365D 100%)",
                        fontSize: "3rem",
                        color: "#8DF9FF",
                        fontFamily: "'Cinzel', serif",
                      }}
                    >
                      響
                    </Avatar>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 10,
                        background: "rgba(3, 1, 2, 0.9)",
                        border: "1px solid #8DF9FF",
                        boxShadow: "0 0 10px rgba(141, 249, 255, 0.6)",
                        borderRadius: "50%",
                        p: 0.8,
                        display: "flex",
                      }}
                    >
                      <WaterIcon sx={{ color: "#8DF9FF", fontSize: 20 }} />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={9}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <Chip
                      icon={<AcUnitIcon sx={{ color: "#8DF9FF !important" }} />}
                      label="จิตวิญญาณแห่งธรรมชาติ: ฤดูหนาว「道」"
                      sx={{
                        background: "rgba(141, 249, 255, 0.15)",
                        color: "#8DF9FF",
                        borderColor: "rgba(141, 249, 255, 0.4)",
                        boxShadow: "0 0 10px rgba(141, 249, 255, 0.2)",
                      }}
                      variant="outlined"
                    />
                    <Chip
                      icon={<DarknessIcon sx={{ color: "#A9BCD0 !important" }} />}
                      label="วิถี: ความมืด"
                      sx={{
                        background: "rgba(169, 188, 208, 0.15)",
                        color: "#A9BCD0",
                        borderColor: "rgba(169, 188, 208, 0.3)",
                      }}
                      variant="outlined"
                    />
                    <Chip
                      icon={<HomeIcon sx={{ color: "#FF9EE2 !important" }} />}
                      label="หอพักฤดูหนาว"
                      sx={{
                        background: "rgba(255, 158, 226, 0.15)",
                        color: "#FF9EE2",
                        borderColor: "rgba(255, 158, 226, 0.3)",
                        boxShadow: "0 0 10px rgba(255, 158, 226, 0.15)",
                      }}
                      variant="outlined"
                    />
                  </Box>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: "#FFFFFF",
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: 2,
                      fontSize: { xs: "2.2rem", md: "3rem" },
                      textShadow: "0 0 30px rgba(141, 249, 255, 0.7), 0 2px 10px rgba(0,0,0,0.8)", // เรืองแสงแบบ Loading Screen
                    }}
                  >
                    氷雨 響羅
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#8DF9FF",
                      mb: 2,
                      fontStyle: "italic",
                      fontWeight: 400,
                      textShadow: "0 0 15px rgba(141, 249, 255, 0.4)",
                    }}
                  >
                    Hisame Kyōra (ฮิซาเมะ เคียวระ)
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#A9BCD0",
                      lineHeight: 1.8,
                      maxWidth: "800px",
                    }}
                  >
                    นักเรียนชั้นปีมังไก ห้อง 3-B แห่งสถาบันเวทมนตร์มาโฮชิกิ ผู้แบกรับสายเลือดตระกูลใหญ่และความลับอันโดดเดี่ยวใต้เงามืดและกลิ่นไอเย็น
                  </Typography>
                </Grid>
              </Grid>
            </GlassCard>

            {/* TAB NAVIGATION */}
            <Box sx={{ mb: 4 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#8DF9FF",
                    height: "3px",
                    borderRadius: "3px",
                    boxShadow: "0 0 12px #8DF9FF, 0 0 4px #8DF9FF",
                  },
                  "& .MuiTab-root": {
                    color: "#94A3B8",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    py: 1.5,
                    px: 3,
                    borderRadius: "12px 12px 0 0",
                    "&.Mui-selected": {
                      color: "#8DF9FF",
                      background: "rgba(141, 249, 255, 0.08)",
                      textShadow: "0 0 10px rgba(141, 249, 255, 0.5)",
                    },
                  },
                }}
              >
                <Tab icon={<BadgeIcon />} label="ข้อมูลทั่วไป & บัตร" iconPosition="start" />
                <Tab icon={<LocalHospitalIcon />} label="ความผิดปกติ & สุขภาพ" iconPosition="start" />
                <Tab icon={<MenuBookIcon />} label="ประวัติความเป็นมา" iconPosition="start" />
                <Tab icon={<AutoAwesomeIcon />} label="เวทมนตร์ & ทักษะ" iconPosition="start" />
                <Tab icon={<PsychologyIcon />} label="ลักษณะนิสัย" iconPosition="start" />
                <Tab icon={<FavoriteIcon />} label="ความชอบ & ความกลัว" iconPosition="start" />
              </Tabs>
            </Box>

            {/* TAB CONTENT PANELS */}
            <AnimatePresence mode="wait">
              {/* TAB 0: GENERAL INFO & STUDENT CARD */}
              {activeTab === 0 && (
                <motion.div
                  key="tab0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Grid container spacing={3}>
                    {/* Student ID Card Graphic */}
                    <Grid item xs={12} md={5}>
                      <GlassCard
                        sx={{
                          background:
                            "linear-gradient(145deg, rgba(15, 30, 55, 0.8) 0%, rgba(5, 12, 22, 0.9) 100%)",
                          border: "1px solid rgba(141, 249, 255, 0.4)",
                          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(141, 249, 255, 0.1)",
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            borderBottom: "1px solid rgba(141, 249, 255, 0.25)",
                            pb: 1.5,
                          }}
                        >
                          <Typography
                            variant="overline"
                            sx={{ color: "#8DF9FF", letterSpacing: 2, fontWeight: 700, textShadow: "0 0 8px rgba(141, 249, 255, 0.4)" }}
                          >
                            MAHOSHIKI ACADEMY CARD
                          </Typography>
                          <Chip
                            label="มีบัตรนักเรียน"
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ boxShadow: "0 0 10px rgba(141, 249, 255, 0.2)" }}
                          />
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 80,
                              height: 100,
                              borderRadius: "8px",
                              border: "1px solid rgba(141, 249, 255, 0.5)",
                              background: "rgba(0,0,0,0.6)",
                              color: "#8DF9FF",
                              fontSize: "2rem",
                              boxShadow: "0 0 15px rgba(141, 249, 255, 0.25)",
                            }}
                          >
                            響
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                              เลขประจำตัว / ID
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#FFFFFF",
                                fontFamily: "monospace",
                                letterSpacing: 3,
                                fontWeight: 700,
                                textShadow: "0 0 10px rgba(255,255,255,0.4)",
                              }}
                            >
                              00000
                            </Typography>

                            <Typography variant="body2" sx={{ color: "#94A3B8", mt: 1 }}>
                              ชื่อ-นามสกุล
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#E2F1FF", fontWeight: 600 }}>
                              ฮิซาเมะ เคียวระ
                            </Typography>
                          </Box>
                        </Box>

                        <Divider sx={{ borderColor: "rgba(141,249,255,0.15)", mb: 2 }} />

                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                              ชั้นปี:
                            </Typography>{" "}
                            <Typography variant="body2" component="span" sx={{ color: "#E2F1FF" }}>
                              มังไก
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                              ห้อง:
                            </Typography>{" "}
                            <Typography variant="body2" component="span" sx={{ color: "#E2F1FF" }}>
                              3-B
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                              ชมรม:
                            </Typography>{" "}
                            <Typography variant="body2" component="span" sx={{ color: "#E2F1FF" }}>
                              ชมรมดนตรีและประสานเสียง
                            </Typography>
                          </Grid>
                        </Grid>
                      </GlassCard>
                    </Grid>

                    {/* Detailed Stats */}
                    <Grid item xs={12} md={7}>
                      <GlassCard>
                        <SectionHeader
                          icon={BadgeIcon}
                          title="ข้อมูลส่วนตัวนักเรียน"
                          subtitle="Personal Profile Data"
                        />
                        <Grid container spacing={2}>
                          {[
                            { label: "นามสกุล-ชื่อ (ภาษาญี่ปุ่น)", val: "氷雨 響羅 (Hisame Kyōra)" },
                            { label: "นามสกุล-ชื่อ (ภาษาไทย)", val: "ฮิซาเมะ เคียวระ" },
                            { label: "วันเกิด", val: "12 / 06" },
                            { label: "อายุ", val: "18 ปี" },
                            { label: "เพศ", val: "ชาย" },
                            { label: "หมู่เลือด", val: "A" },
                            { label: "สัญชาติ / เชื้อชาติ", val: "ญี่ปุ่น / ญี่ปุ่น" },
                            { label: "น้ำหนัก / ส่วนสูง", val: "72 กก. / 184 ซม." },
                          ].map((item, idx) => (
                            <Grid item xs={12} sm={6} key={idx}>
                              <Box
                                sx={{
                                  p: 1.5,
                                  borderRadius: "10px",
                                  background: "rgba(255, 255, 255, 0.03)",
                                  border: "1px solid rgba(255, 255, 255, 0.08)",
                                  transition: "background 0.3s ease",
                                  "&:hover": {
                                    background: "rgba(141, 249, 255, 0.06)",
                                    borderColor: "rgba(141, 249, 255, 0.2)",
                                  }
                                }}
                              >
                                <Typography variant="caption" sx={{ color: "#94A3B8", display: "block" }}>
                                  {item.label}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#FFFFFF", fontWeight: 600 }}>
                                  {item.val}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>

                        <Divider sx={{ my: 3, borderColor: "rgba(141,249,255,0.1)" }} />

                        {/* Dorm & Roommates */}
                        <SectionHeader
                          icon={GroupsIcon}
                          title="หอพัก & เพื่อนร่วมห้อง"
                          subtitle="Dormitory & Roommates"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <HomeIcon sx={{ color: "#8DF9FF", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: "#A9BCD0" }}>
                              <strong style={{ color: "#FFF", textShadow: "0 0 5px rgba(255,255,255,0.3)" }}>หอพัก:</strong> ฤดูหนาว
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <GroupsIcon sx={{ color: "#FF9EE2", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: "#A9BCD0" }}>
                              <strong style={{ color: "#FFF", textShadow: "0 0 5px rgba(255,255,255,0.3)" }}>รูมเมท:</strong> ฮิเมะมิยะ โคยูคิ / คากามิ ริคุ
                            </Typography>
                          </Box>
                        </Box>
                      </GlassCard>
                    </Grid>
                  </Grid>
                </motion.div>
              )}

              {/* TAB 1: ABNORMALITIES & MEDICAL */}
              {activeTab === 1 && (
                <motion.div
                  key="tab1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Grid container spacing={3}>
                    {/* Physical Abnormalities */}
                    <Grid item xs={12} md={7}>
                      <GlassCard>
                        <SectionHeader
                          icon={WarningAmberIcon}
                          title="ความผิดปกติทางร่างกาย"
                          subtitle="Physical Abnormalities & Alterations"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {[
                            "ผิวหนังบริเวณ คอ และ เอว ฉีกขาดและเปลี่ยนสภาพพัฒนาเป็นเหงือกปลา",
                            "ภายในปากมี ฟันแหลมคมหลายซี่",
                            "ร่างกาย แผ่ไอเย็นจาง ๆ ตลอดเวลา",
                            "ใบหูเริ่มเปลี่ยนรูป",
                            "หางปลาขนาดใหญ่ งอกจากกระดูกก้นกบ",
                            "มี ครีบยาวบาง งอกจากแผ่นหลัง",
                          ].map((text, index) => (
                            <Box
                              key={index}
                              sx={{
                                p: 2,
                                borderRadius: "12px",
                                background: "rgba(141, 249, 255, 0.05)",
                                borderLeft: "4px solid #8DF9FF",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  backgroundColor: "#8DF9FF",
                                  boxShadow: "0 0 10px #8DF9FF, 0 0 20px #8DF9FF",
                                }}
                              />
                              <Typography variant="body1" sx={{ color: "#E2F1FF", fontWeight: 500 }}>
                                {text}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </GlassCard>
                    </Grid>

                    {/* Medical Conditions */}
                    <Grid item xs={12} md={5}>
                      <GlassCard
                        sx={{
                          background:
                            "linear-gradient(160deg, rgba(30, 15, 35, 0.6) 0%, rgba(10, 15, 30, 0.8) 100%)",
                          border: "1px solid rgba(255, 158, 226, 0.3)",
                          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 158, 226, 0.05)",
                        }}
                      >
                        <SectionHeader
                          icon={LocalHospitalIcon}
                          title="โรคประจำตัว"
                          subtitle="Medical Condition"
                        />
                        <Box
                          sx={{
                            p: 2.5,
                            borderRadius: "14px",
                            background: "rgba(255, 158, 226, 0.08)",
                            border: "1px solid rgba(255, 158, 226, 0.2)",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "#FF9EE2", fontWeight: 700, mb: 1, textShadow: "0 0 10px rgba(255, 158, 226, 0.4)" }}
                          >
                            Insomnia (ภาวะนอนไม่หลับ)
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#CBD5E1", lineHeight: 1.8 }}>
                            ภาวะนอนไม่หลับไม่ได้เกิดจากสภาพร่างกายเพียงอย่างเดียว
                            แต่เป็นผลรวมของ{" "}
                            <strong style={{ color: "#FF9EE2" }}>
                              ความเครียดทางจิตใจ + สภาพแวดล้อมที่กดดันตั้งแต่วัยเด็ก
                            </strong>
                          </Typography>
                        </Box>
                      </GlassCard>
                    </Grid>
                  </Grid>
                </motion.div>
              )}

              {/* TAB 2: BIOGRAPHY */}
              {activeTab === 2 && (
                <motion.div
                  key="tab2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard>
                    <SectionHeader
                      icon={MenuBookIcon}
                      title="ประวัติความเป็นมา"
                      subtitle="Full Character Biography"
                    />
                    <Box sx={{ color: "#E2F1FF", lineHeight: 2, display: "flex", flexDirection: "column", gap: 2.5 }}>
                      <Typography variant="body1">
                        เคียวระเกิดใน{" "}
                        <strong style={{ color: "#8DF9FF", textShadow: "0 0 8px rgba(141,249,255,0.5)" }}>"ฮิซาเมะ"</strong>{" "}
                        ตระกูลเก่าแก่ที่มีฐานะร่ำรวยและยึดถือขนบธรรมเนียมอย่างเคร่งครัด
                        พวกเขากำหนดและให้ความสำคัญกับความสมบูรณ์แบบและสายเลือดที่บริสุทธิ์
                        ทว่าเคียวระกลับเกิดมาพร้อมกับ "ความผิดปกติ" ทางร่างกาย
                        ทำให้ครอบครัวมองเขาเป็นความอัปยศและความผิดพลาด
                        เขาจึงถูกเลี้ยงดูมาภายใต้ความกดดันอย่างหนัก
                        ถูกบังคับให้ต้องเพียบพร้อมในทุกด้านเพื่อชดเชยร่างกายที่ผิดปกติ
                        เคียวระต้องใช้ชีวิตราวกับนักโทษในบ้านของตัวเอง
                        ต้องสวมเสื้อผ้ามิดชิดเพื่อปกปิดความลับนี้ไว้
                        จนกระทั่งในวัย 14 ปี
                        ความผิดปกติของเขาแสดงอาการรุนแรงขึ้นจนตระกูลคิดจะกำจัดเขา
                        เคียวระจึงตัดสินใจโกหกครอบครัวว่าได้รับจดหมายเชิญจากสถาบันการแพทย์ลับที่จะช่วย
                        "รักษา" เขาได้ เพื่อใช้เป็นข้ออ้างในการเดินทางมายังโรงเรียนเวทมนตร์แห่งนี้
                      </Typography>

                      <Divider sx={{ borderColor: "rgba(141, 249, 255, 0.15)" }} />

                      <Typography variant="body1">
                        ปัจจุบันเคียวระอาศัยอยู่ในหอพักของโรงเรียนมัธยมปลายมาโฮชิกิ
                        หลังจากที่ได้เห็นว่าที่นี่มีผู้คนที่มีความผิดปกติมากมาย
                        เขาจึงเริ่มคลายความหวาดระแวงและเลิกหมกมุ่นกับการปกปิดร่างกายตนเองอย่างที่เคยทำในอดีต
                        ในด้านฐานะ เคียวระมีสภาพคล่องทางการเงินที่สูงมาก
                        เขาได้รับเงินสนับสนุนจากตระกูลอย่างสม่ำเสมอ
                        (เนื่องจากครอบครัวยังคงเชื่อว่าเขากำลังใช้เงินเพื่อรักษาตัวให้กลับมาปกติ)
                        แม้เขาจะไม่ได้มีนิสัยใช้จ่ายฟุ่มเฟือย แต่ด้วยความเคยชิน
                        เขาจึงมักจะใช้แต่ข้าวของเครื่องใช้ที่มีคุณภาพสูง
                        สำหรับการใช้ชีวิตในหอพัก
                        เขาเป็นคนหวงแหนพื้นที่ส่วนตัวและเจ้าระเบียบมาก
                        แบ่งขอบเขตของตัวเองกับรูมเมทอย่างชัดเจน
                      </Typography>
                    </Box>
                  </GlassCard>
                </motion.div>
              )}

              {/* TAB 3: MAGIC & ABILITIES */}
              {activeTab === 3 && (
                <motion.div
                  key="tab3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Grid container spacing={3}>
                    {/* Primary Magic */}
                    <Grid item xs={12}>
                      <GlassCard>
                        <SectionHeader
                          icon={AutoAwesomeIcon}
                          title="ลักษณะเวทมนตร์ที่ตัวละครถนัด (เวทมนตร์พื้นฐาน)"
                          subtitle="Standard Magic & Shadow Manipulations"
                        />
                        <Grid container spacing={2}>
                          {[
                            {
                              name: "สรรค์สร้างเงา",
                              desc: "ความสามารถพื้นฐานในการ ดึงเงาจากวัตถุรอบตัวหรือจากร่างกายของตนเอง มาปั้นเป็นรูปร่างชั่วคราว วัตถุมีลักษณะเหมือน ของแข็งสีดำด้าน สลายตัวเมื่อเสียสมดุลหรือถูกโจมตีแรง เช่น อาวุธชั่วคราว เข็ม มีด ลิ่ม, มือเงาขนาดใหญ่สำหรับหยิบจับของ ,ร่มเงาสำหรับกันฝน",
                              limit: "ต้องมี แหล่งกำเนิดเงา ใกล้ตัว / แสงสว่างจัดจะทำให้สร้างวัตถุได้ยาก / วัตถุขนาดใหญ่ใช้พลังเวทมาก",
                            },
                            {
                              name: "เคลื่อนที่ผ่านเงา",
                              desc: "สามารถเคลื่อนที่ระยะสั้นผ่านเงาได้โดยการจมหายเข้าไปในเงาหนึ่งและปรากฏออกจากอีกเงาหนึ่ง",
                              limit: "ระยะประมาณ 3–6 เมตร / ต้องมีเงาทั้งต้นทางและปลายทาง / ใช้ต่อเนื่องหลายครั้งจะทำให้เวียนหัว / ไม่สามารถพาคนอื่นไปด้วย",
                            },
                            {
                              name: "เย็บเงา",
                              desc: "สร้างเข็มหรือลิ่มจากเงา แล้วปาให้ปักลงบนเงาของเป้าหมาย ทำให้ร่างจริงถูกตรึงกับพื้น คล้ายอาการ “ผีอำ” เป้าหมายขยับไม่ได้แต่ยังพูดได้",
                              limit: "ต้องเห็นเงาของเป้าหมายชัดเจน / หากเงาถูกทำลาย (เช่นแสงเปลี่ยน) จะหลุด / ใช้กับหลายคนพร้อมกันยาก",
                            },
                            {
                              name: "เงาเลียนแบบ",
                              desc: "สามารถสร้าง ร่างเงาที่มีรูปร่างเหมือนตัวเอง เอามาช่วยทำงานบ้าน",
                              limit: "ถูกโจมตีครั้งเดียวก็สลาย / ใช้พลังเวทค่อนข้างมาก / เรียกออกมาได้แบบมีประสิทธิภาพมากสุด ได้แค่ 3 ร่าง",
                            },
                            {
                              name: "หนามเงา",
                              desc: "ควบแน่นเงาเป็นของแหลมพอดีมือ แทงใส่เป้าหมาย ไม่ทำให้เกิดบาดแผลจริงแต่ รบกวนการไหลเวียนพลังเวท ส่วนที่ถูกแทงจะ ชาและขยับไม่ได้ชั่วคราว",
                              limit: "ระยะโจมตีสั้น / ผลอยู่ไม่นาน",
                            },
                            {
                              name: "อาณาเขตเงา",
                              desc: "ขยายเงาของตัวเองเป็น อาณาเขตเงาขนาดเล็ก ดูดกลืนเสียง ลดการสะท้อนแสง คนในพื้นที่แทบไม่ถูกสังเกต ส่วนมากไว้ใช้ สำหรับทำงานเงียบๆ อ่านหนังสือ งานอดิเรก",
                              limit: "พื้นที่เล็ก (ประมาณโต๊ะหรือห้องเล็ก) / ใช้พลังเวทต่อเนื่อง / หากแสงสว่างมากอาณาเขตจะอ่อนลง",
                            },
                            {
                              name: "โล่กลืนมนตรา",
                              desc: "บิดเงาของตัวเองขึ้นเป็น กำแพงเงาป้องกัน กลืนพลังเวทที่โจมตีเข้ามา ลดความเสียหายเวทมนตร์",
                              limit: "ป้องกันเวทได้ดีกว่าการโจมตีทางกายภาพ / ใช้ต่อเนื่องทำให้พลังเวทหมดเร็ว",
                            },
                          ].map((spell, i) => (
                            <Grid item xs={12} md={6} key={i}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2.5,
                                  height: "100%",
                                  background: "rgba(10, 20, 35, 0.7)",
                                  border: "1px solid rgba(141, 249, 255, 0.2)",
                                  borderRadius: "14px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  transition: "background 0.3s ease",
                                  "&:hover": { background: "rgba(15, 30, 50, 0.8)" }
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "#8DF9FF", fontWeight: 700, mb: 1, textShadow: "0 0 8px rgba(141,249,255,0.3)" }}
                                  >
                                    {spell.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "#E2F1FF", mb: 2, lineHeight: 1.7 }}
                                  >
                                    {spell.desc}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    p: 1.5,
                                    borderRadius: "8px",
                                    background: "rgba(0,0,0,0.5)",
                                    border: "1px solid rgba(141, 249, 255, 0.1)",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#FF9EE2", fontWeight: 600, display: "block" }}
                                  >
                                    ข้อจำกัด / เงื่อนไข:
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                                    {spell.limit}
                                  </Typography>
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </GlassCard>
                    </Grid>

                    {/* Hidden / Rare Magic */}
                    <Grid item xs={12}>
                      <GlassCard
                        sx={{
                          background:
                            "linear-gradient(135deg, rgba(20, 10, 35, 0.75) 0%, rgba(5, 5, 20, 0.9) 100%)",
                          border: "1px solid rgba(255, 158, 226, 0.4)",
                          boxShadow: "0 0 35px rgba(255, 158, 226, 0.15), inset 0 0 20px rgba(255, 158, 226, 0.05)",
                        }}
                      >
                        <SectionHeader
                          icon={ShieldIcon}
                          title="พลังเวทเร้นลับ (พลังในส่วนนี้เป็นสิ่งที่เคียวระไม่ค่อยใช้ มีแค่ส่วนน้อยที่รู้ว่าเขาทำได้)"
                          subtitle="Hidden & Forbidden Arts"
                        />
                        <Grid container spacing={2}>
                          {[
                            {
                              name: "ดึงเงา",
                              desc: "ดึงเงาของวัตถุหรือสิ่งมีชีวิตรอบตัวมาหล่อเลี้ยงพลังเวทของตนเองชั่วคราว พลังที่ได้รับจะไม่ถาวร เป็นการฟื้นฟูพลังเวท ลดความเหนื่อยล้า บรรเทาความเจ็บปวดให้กับผู้ใช้\n\nถ้าเป็นสิ่งมีชีวิตจะให้ผลดีมากกว่า ผลที่ส่งกับสิ่งมีชีวิต คือ รู้สึกอ่อนแรงเล็กน้อย หนาววูบเหมือนพลังบางส่วนถูกดึงออก รวมถึงอาจรู้สึกว่างเปล่าหรือเฉื่อยชาในช่วงเวลาสั้น ๆ",
                              limit: "พลังที่ดึงมา ไม่ถาวร และจะค่อย ๆ สลายไป / ไม่สามารถดึงพลังจำนวนมากจากเป้าหมายเดียวได้ / หากใช้ต่อเนื่องมากเกินไป ผู้ใช้จะเกิดอาการ เวียนหัว คลื่นไส้ เสียสมาธิ",
                            },
                            {
                              name: "กินเงา",
                              desc: "สามารถ กัดกินอาการผิดปกติจากผู้อื่น ไม่ว่าจะเป็นความเจ็บปวด ความเหนื่อยล้า หรือความปั่นป่วนทางจิตใจ โดยดึงสิ่งเหล่านั้นออกมาในรูปของเงา แล้วให้ความมืดของตนเองกลืนกินเข้าไป เมื่อเงาของอาการเหล่านั้นถูกดึงออก เป้าหมายจะรู้สึกว่าภาระบางอย่างถูกปลดปล่อยออกจากร่างกายและจิตใจ บรรเทาความเจ็บปวดทางร่างกาย ลดความเหนื่อยล้าและความอ่อนแรง ทำให้จิตใจสงบลง\n\nโดยปกติ เงาของเคียวระจะเป็นผู้กลืนกินเงาของอาการผิดปกติแทน ราวกับมีชีวิตของตัวเอง แต่หากเคียวระ เป็นผู้กัดกินเงานั้นด้วยตนเองโดยตรง ผลของการบรรเทาจะมีประสิทธิภาพมากกว่า",
                              limit: "การรักษาเป็นเพียง การบรรเทาชั่วคราว / หากมากเกินไป เคียวระอาจเกิดอาการ เวียนหัว อ่อนล้า เสียสมาธิ / การกินเงาจากผู้อื่นต้องใช้พลังเวทมากกว่าการรักษาตัวเอง / ไม่สามารถลบล้างอาการรุนแรงหรือใช้ติดต่อกันหลายครั้งในเวลาใกล้กันได้",
                            },
                            {
                              name: "ฝนเขี้ยวเงา",
                              desc: "ควบแน่นเงารอบตัวให้แตกตัวเป็น เขี้ยวหนามสีดำจำนวนมาก ก่อนจะปล่อยให้พุ่งลงมาจากอากาศราวกับฝน เขี้ยวเงาเหล่านี้จะตกลงใส่พื้นที่เป้าหมายอย่างรวดเร็ว หนามเงาเหล่านี้มีความหนาแน่นสูงพอที่จะ สร้างบาดแผลจริงต่อร่างกาย เมื่อกระทบเป้าหมาย ทำให้พื้นที่ที่ถูกโจมตีกลายเป็นบริเวณอันตรายที่ยากต่อการเคลื่อนไหว เมื่อหนามเงาปักลงพื้น มันจะคงสภาพอยู่เพียงชั่วครู่ก่อนจะสลายไป",
                              limit: "ต้องมีเงาในพื้นที่จึงจะสร้างหนามจำนวนมากได้ / ใช้พลังเวทค่อนข้างมาก / เป็นการโจมตีแบบพื้นที่ ความแม่นยำจึงไม่สูง เน้นจำนวน / หากแสงสว่างจัด จำนวนและความแข็งของหนามเงาจะลดลง",
                            },
                          ].map((spell, i) => (
                            <Grid item xs={12} key={i}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 3,
                                  background: "rgba(10, 5, 20, 0.7)",
                                  border: "1px solid rgba(255, 158, 226, 0.25)",
                                  borderRadius: "14px",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{ color: "#FF9EE2", fontWeight: 700, mb: 1.5, textShadow: "0 0 10px rgba(255,158,226,0.3)" }}
                                >
                                  {spell.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#E2F1FF",
                                    mb: 2,
                                    lineHeight: 1.8,
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {spell.desc}
                                </Typography>
                                <Box
                                  sx={{
                                    p: 1.5,
                                    borderRadius: "8px",
                                    background: "rgba(0,0,0,0.6)",
                                    borderLeft: "4px solid #FF9EE2",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#FF9EE2", fontWeight: 600, display: "block" }}
                                  >
                                    ข้อจำกัด & ผลข้างเคียง:
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                                    {spell.limit}
                                  </Typography>
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </GlassCard>
                    </Grid>
                  </Grid>
                </motion.div>
              )}

              {/* TAB 4: PERSONALITY */}
              {activeTab === 4 && (
                <motion.div
                  key="tab4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Grid container spacing={3}>
                    {[
                      {
                        title: "ขี้อาย",
                        desc: "เขาไม่ได้เป็นคนขี้อายแบบหลบหน้าหลบตา แม้ภายในจะรู้สึกประหม่า ภายนอกเขาก็ยังคงพยายามรักษาสีหน้านิ่งเฉยเอาไว้ เขาสามารถพูดคุยกับผู้อื่นได้ตามปกติ แต่จะใช้ถ้อยคำที่สุภาพและเป็นทางการเกินจำเป็นเป็นเหมือนกำแพงกั้นไม่ให้ใครเข้ามาใกล้ชิดมากนัก เขาหลีกเลี่ยงการสบตากับผู้อื่นเป็นเวลานาน และมักตอบคำถามสั้น ๆ ได้ใจความ เพื่อให้บทสนทนาจบลงโดยเร็วที่สุด เมื่อสิ้นสุดบทสนทนา เขามักจะหลบไปอยู่ในมุมเงียบ ๆ ตามลำพังทันที",
                      },
                      {
                        title: "เจ้าระเบียบ",
                        desc: "แรงกดดันจากครอบครัวทำให้เขายึดติดกับความสมบูรณ์แบบ กฎระเบียบ ความเรียบร้อย และความรับผิดชอบอย่างมาก ใช้ความเพียบพร้อมนี้เป็นเกราะป้องกันไม่ให้ใครกล้าเข้ามาจับผิดหรือตั้งคำถามถึงตัวตนของเขา",
                      },
                      {
                        title: "หวาดระแวงการสัมผัส",
                        desc: "ระแวงการสัมผัสตัวอย่างรุนแรง หากมีใครมาตบไหล่หรือพยายามสวมกอด แบบไม่ทันตั้งตัว เขาจะชะงัก เผลอชักสีหน้ารังเกียจ หรือปัดมือทิ้งอย่างรวดเร็วจนดูเหมือนคนหยิ่งยโส",
                      },
                      {
                        title: "โลกส่วนตัวสูง",
                        desc: "เขามีพื้นที่ส่วนตัวที่แทบไม่มีใครเข้าถึงได้ และมักจะเก็บมันไว้เป็นความลับที่ไม่ต้องการให้ใครรับรู้ เมื่อรู้สึกเครียด เขามักจะพับโอริกามิหรือวาดรูปเงียบ ๆ ตามลำพัง บางครั้งก็แอบไปที่ห้องดนตรีเพื่อเล่นเปียโน โดยเลือกช่วงเวลาที่ไม่มีใครอยู่ เพราะไม่ต้องการให้ใครเห็นด้านนี้ของเขา ท่วงทำนองที่บรรเลงไพเราะ แต่แฝงด้วยความหนาวเย็นและความโดดเดี่ยว และนั่นก็เป็นหนึ่งในไม่กี่ช่วงเวลาที่เขาปลดปล่อยความรู้สึกที่แท้จริงออกมา โดยไม่ต้องพยายามปกปิดมันจากสายตาของผู้อื่น",
                        icon: PianoIcon,
                      },
                      {
                        title: "อ่อนโยน(?) ซึนแหละ",
                        desc: "เป็นคนที่แสดงความใส่ใจต่อผู้อื่นผ่านการกระทำมากกว่าคำพูด หากเห็นใครกำลังลำบาก เขามักจะเข้าไปช่วยโดยไม่พูดอะไรนัก สีหน้ามักยังคงเรียบนิ่ง หรือบ่นพึมพำว่า “น่ารำคาญ” เหมือนฝืนใจช่วย แต่สุดท้ายก็ช่วยจนเสร็จอยู่ดี\n\nแม้ภายนอกจะดูเย็นชาและเข้มงวด ทว่าลึก ๆ แล้วเขาโหยหาความเมตตาและความอ่อนโยนจากผู้อื่น หากพบเห็นคนหรือสัตว์ที่กำลังเดือดร้อน เขามักอดไม่ได้ที่จะยื่นมือเข้าไปช่วย ถึงจะยังคงทำหน้าตายหรือบ่นอุบอิบเหมือนเดิมก็ตาม\n\nเป็นผู้ฟังที่ดี แม้ภายนอกจะทำท่าทีเหมือนไม่ได้สนใจบทสนทนา แต่เขากลับจดจำรายละเอียดเล็ก ๆ น้อย ๆ ของคนรอบตัวได้เสมอ และมักนำสิ่งเหล่านั้นไปช่วยเหลือผู้อื่นอย่างเงียบ ๆ โดยที่แทบไม่พูดถึงมันเลย",
                      },
                    ].map((trait, index) => (
                      <Grid item xs={12} key={index}>
                        <GlassCard>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#8DF9FF",
                              fontWeight: 700,
                              mb: 1.5,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              textShadow: "0 0 10px rgba(141,249,255,0.3)",
                            }}
                          >
                            {trait.icon && <trait.icon sx={{ color: "#FF9EE2", filter: "drop-shadow(0 0 5px rgba(255,158,226,0.5))" }} />}
                            {trait.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#E2F1FF",
                              lineHeight: 1.8,
                              whiteSpace: "pre-line",
                            }}
                          >
                            {trait.desc}
                          </Typography>
                        </GlassCard>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              )}

              {/* TAB 5: LIKES, DISLIKES & FEARS */}
              {activeTab === 5 && (
                <motion.div
                  key="tab5"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Grid container spacing={3}>
                    {/* Likes */}
                    <Grid item xs={12} md={4}>
                      <GlassCard sx={{ height: "100%" }}>
                        <SectionHeader
                          icon={FavoriteIcon}
                          title="สิ่งที่ชอบ"
                          subtitle="Preferences & Pleasures"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          {[
                            "เสียงฝนตกหนัก",
                            "พื้นที่สลัว / ร่มเงา",
                            "ความสมบูรณ์แบบและความเป็นระเบียบ",
                            "เสียงดนตรี",
                            "กลิ่นน้ำเค็มและเสียงคลื่นทะเล",
                            "ขนมวากาชิ / พาร์เฟต์",
                            "ของน่ารัก",
                            "อุซากี้ (การ์ตูนในโลกมนุษย์)",
                          ].map((item, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                p: 1.5,
                                borderRadius: "10px",
                                background: "rgba(141, 249, 255, 0.08)",
                                border: "1px solid rgba(141, 249, 255, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              <FavoriteIcon sx={{ color: "#8DF9FF", fontSize: 16 }} />
                              <Typography variant="body2" sx={{ color: "#E2F1FF" }}>
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </GlassCard>
                    </Grid>

                    {/* Dislikes */}
                    <Grid item xs={12} md={4}>
                      <GlassCard sx={{ height: "100%" }}>
                        <SectionHeader
                          icon={CancelIcon}
                          title="สิ่งที่ไม่ชอบ"
                          subtitle="Dislikes & Aversions"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          {[
                            "การเป็นจุดสนใจ",
                            "คนที่ทำตัวตามใจชอบ ไร้ระเบียบ หรือร่าเริงเกินเหตุ",
                            "การถูกสัมผัสตัวอย่างกะทันหัน",
                            "ความหลากหลายทางเพศ",
                          ].map((item, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                p: 1.5,
                                borderRadius: "10px",
                                background: "rgba(255, 158, 226, 0.08)",
                                border: "1px solid rgba(255, 158, 226, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              <CancelIcon sx={{ color: "#FF9EE2", fontSize: 16 }} />
                              <Typography variant="body2" sx={{ color: "#E2F1FF" }}>
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </GlassCard>
                    </Grid>

                    {/* Fears */}
                    <Grid item xs={12} md={4}>
                      <GlassCard
                        sx={{
                          height: "100%",
                          background:
                            "linear-gradient(160deg, rgba(35, 10, 20, 0.6) 0%, rgba(10, 20, 35, 0.7) 100%)",
                          border: "1px solid rgba(255, 99, 132, 0.3)",
                        }}
                      >
                        <SectionHeader
                          icon={WarningAmberIcon}
                          title="สิ่งที่กลัว"
                          subtitle="Deepest Fears & Phobias"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          {[
                            "การถูกครอบครัวจับได้",
                            "การถูกมองว่าเป็นความผิดพลาด",
                            "การสูญเสียการควบคุม",
                          ].map((item, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                p: 2,
                                borderRadius: "12px",
                                background: "rgba(255, 99, 132, 0.12)",
                                borderLeft: "4px solid #FF6384",
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              <WarningAmberIcon sx={{ color: "#FF6384", fontSize: 18 }} />
                              <Typography variant="body2" sx={{ color: "#E2F1FF", fontWeight: 600 }}>
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </GlassCard>
                    </Grid>
                  </Grid>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </motion.div>
      )}
    </ThemeProvider>
  );
}