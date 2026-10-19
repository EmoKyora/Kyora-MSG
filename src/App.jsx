import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  GlobalStyles,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// --- Icons ---
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ShieldIcon from "@mui/icons-material/Shield";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";

const normalCraneCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23FFD1DC' /%3E%3Cstop offset='100%25' stop-color='%23FFA2B7' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='rgba(255,162,183,0.08)' stroke='url(%23grad3)' stroke-width='4' stroke-linejoin='round' stroke-linecap='round' filter='drop-shadow(0px 0px 4px rgba(255,162,183,0.4))'%3E%3Cpolygon points='40,65 35,25 15,40 28,40' /%3E%3Cpolygon points='40,65 10,55 52,50' /%3E%3Cpolygon points='52,50 75,15 60,70' /%3E%3Cpolygon points='60,70 90,75 52,50' /%3E%3Cpolygon points='40,65 48,85 60,70 52,50' /%3E%3Cline x1='48' y1='85' x2='52' y2='50' /%3E%3C/g%3E%3C/svg%3E") 4 12, auto`;
const pointerCraneCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23FFA2B7' /%3E%3Cstop offset='100%25' stop-color='%23D18CE0' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='rgba(255,162,183,0.1)' stroke='url(%23grad4)' stroke-width='4.5' stroke-linejoin='round' stroke-linecap='round' filter='drop-shadow(0px 0px 5px rgba(255,162,183,0.45))'%3E%3Cpolygon points='40,65 35,25 15,40 28,40' /%3E%3Cpolygon points='40,65 15,45 52,50' /%3E%3Cpolygon points='52,50 85,25 60,70' /%3E%3Cpolygon points='60,70 90,75 52,50' /%3E%3Cpolygon points='40,65 48,85 60,70 52,50' /%3E%3Cline x1='48' y1='85' x2='52' y2='50' /%3E%3C/g%3E%3C/svg%3E") 4 12, pointer`;

const theme = createTheme({
  typography: {
    fontFamily: "'Prompt', sans-serif",
    h1: { fontFamily: "'Cinzel', 'Playfair Display', serif", fontWeight: 700 },
    h2: { fontFamily: "'Cinzel', 'Playfair Display', serif", fontWeight: 700 },
    h3: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
    h4: { fontFamily: "'Playfair Display', serif", fontStyle: "italic" },
    h5: { fontFamily: "'Prompt', sans-serif", fontWeight: 600 },
    h6: {
      fontFamily: "'Prompt', sans-serif",
      fontWeight: 500,
      letterSpacing: 0.5,
    },
    body1: {
      fontFamily: "'Prompt', sans-serif",
      fontWeight: 300,
      lineHeight: 1.8,
    },
    body2: {
      fontFamily: "'Prompt', sans-serif",
      fontWeight: 300,
      fontSize: "0.95rem",
      lineHeight: 1.7,
    },
    overline: {
      fontFamily: "'Prompt', 'Cinzel', serif",
      letterSpacing: 3,
    },
  },
  palette: {
    mode: "dark",
    background: { default: "#0d0023" },  
    primary: { main: "#FFA2B7" }, // สีหลัก FFA2B7
    secondary: { main: "#a6a7b1" }, // สีรองปรับให้อ่านง่ายขึ้นบนพื้นหลังกรมท่า
    info: { main: "#494a52" },
    error: { main: "#B03A58" },
    text: { primary: "#FFFFFF", secondary: "#C4C6DE" },
  },
});

// --- Animations Settings ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// --- Magic Circle Component (วงเวทมนตร์) ---
const ArcaneCircle = ({ size = 300, color = "#FFA2B7", opacity = 0.1, sx }) => (
  <Box
    component={motion.div}
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    sx={{
      position: "absolute",
      width: size,
      height: size,
      opacity,
      pointerEvents: "none",
      zIndex: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...sx,
    }}
  >
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        border: `1px solid ${color}`,
        borderRadius: "50%",
        opacity: 0.5,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        inset: "8%",
        border: `1px dashed ${color}`,
        borderRadius: "50%",
        opacity: 0.8,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        inset: "15%",
        border: `1px solid ${color}`,
        borderRadius: "50%",
        opacity: 0.3,
      }}
    />
    <Box
      component={motion.div}
      animate={{ rotate: -720 }}
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      sx={{
        position: "absolute",
        inset: "22%",
        border: `2px dotted ${color}`,
        borderRadius: "50%",
      }}
    />
    <svg
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.4,
      }}
    >
      <polygon
        points="50,5 65,35 95,50 65,65 50,95 35,65 5,50 35,35"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
      />
      <polygon
        points="50,15 85,85 15,85"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
      />
      <polygon
        points="50,85 15,15 85,15"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  </Box>
);

// --- Decorative Background ---
const PhantomPianoAndCrane = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        opacity: 0.5,
      }}
    >
      <ArcaneCircle size={250} top="-10%" right="-10%" opacity={0.15} />

      {/* Animated Paper Crane */}
      <motion.div
        animate={{
          y: [0, -15, 5, 0],
          x: [0, 10, -5, 0],
          rotate: [-2, 3, -1, -2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: 60,
          height: 60,
          opacity: 0.6,
          filter: "drop-shadow(0px 0px 10px rgba(255, 162, 183, 0.8))",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="url(#craneGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="transparent"
          >
            <polygon points="40,65 35,25 15,40 28,40" />
            <polygon points="40,65 10,55 52,50" />
            <polygon points="52,50 75,15 60,70" />
            <polygon points="60,70 90,75 52,50" />
            <polygon points="40,65 48,85 60,70 52,50" />
            <line x1="48" y1="85" x2="52" y2="50" />
          </g>
          <defs>
            <linearGradient id="craneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA2B7" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Magic Embers */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -50],
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i,
          }}
          style={{
            position: "absolute",
            bottom: `${10 + Math.random() * 30}%`,
            right: `${10 + Math.random() * 40}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "#FFA2B7",
            boxShadow: "0 0 10px 2px rgba(255, 162, 183, 1)",
          }}
        />
      ))}
    </Box>
  );
};

// --- Components ---
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
      animate={{ y: [0, -5, 0, 5, 0], rotate: [-3, 3, -3] }}
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
          animate={{ d: [tailRight, tailLeft, tailRight] }}
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

// --- LOADING SCREEN (คงไว้ตามเดิมทุกประการ 100%) ---
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
          "linear-gradient(to bottom, #170A10 0%, #0A0407 50%, #000000 100%)",
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
            "linear-gradient(180deg, rgba(209, 140, 224, 0.2) 0%, transparent 80%)",
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
            "linear-gradient(180deg, rgba(255, 162, 183, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "rotate(10deg)",
          pointerEvents: "none",
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
            backgroundColor: particle.isBioluminescent ? "#FFA2B7" : "#D4C1C7",
            borderRadius: "50%",
            boxShadow: particle.isBioluminescent
              ? "0 0 12px 2px rgba(255, 162, 183, 0.6)"
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
              border: "1px solid rgba(255, 162, 183, 0.3)",
              boxShadow:
                "inset 0 0 30px rgba(209, 140, 224, 0.15), 0 0 20px rgba(255, 162, 183, 0.1)",
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
            <TopDownShark glowColor="#FFA2B7" delay={0} />
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
            <TopDownShark glowColor="#D18CE0" delay={1.5} />
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
              "0 0 30px rgba(255, 162, 183, 0.7), 0 2px 10px rgba(0,0,0,0.8)",
            fontFamily: "'Cinzel', serif",
            letterSpacing: 6,
          }}
        >
          氷雨 響羅
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#D4C1C7",
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

const MagicalAtmosphere = () => {
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: `rain-${i}`,
        left: `${Math.random() * 100}vw`,
        duration: Math.random() * 0.5 + 0.8,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.3 + 0.1,
        height: `${Math.random() * 15 + 10}vh`,
      })),
    [],
  );

  const manaParticles = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: `mana-${i}`,
        left: `${Math.random() * 100}vw`,
        bottom: `${Math.random() * -20}vh`,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
        size: Math.random() * 4 + 1,
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
        // พื้นหลังแบบทึบตามธีมใหม่ (#060930)
        background:
          "radial-gradient(circle at center, #1E1F42 0%, #060930 100%)",
      }}
    >
      {/* ฝน */}
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
            width: "1px",
            height: drop.height,
            background: `linear-gradient(to bottom, transparent, rgba(255, 162, 183, ${drop.opacity}))`,
          }}
        />
      ))}

      {/* ละอองมานา */}
      {manaParticles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: "-100vh",
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: particle.left,
            bottom: particle.bottom,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            backgroundColor: "#FFA2B7",
            boxShadow: "0 0 10px 1px rgba(255, 162, 183, 0.8)",
            filter: "blur(1px)",
          }}
        />
      ))}
    </Box>
  );
};

const LuxuryCard = ({ children, sx }) => (
  <Box
    sx={{
      borderRadius: "16px",
      background: "#333456", // สีพื้นผิวทึบแทนความโปร่งใส
      border: "1px solid rgba(255, 162, 183, 0.3)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.6)", // เงาหนักขึ้นเพื่อมิติ
      overflow: "hidden",
      position: "relative",
      ...sx,
    }}
  >
    <ArcaneCircle
      size={600}
      top="-150px"
      right="-150px"
      opacity={0.07}
      color="#FFA2B7"
    />

    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, transparent, #FFA2B7, transparent)",
        boxShadow: "0 0 15px #FFA2B7",
      }}
    />
    {children}
  </Box>
);

const MagicalGlassCard = ({
  children,
  sx,
  hoverEffect = false,
  disableDeco = false,
}) => (
  <motion.div variants={staggerItem} style={{ height: "100%" }}>
    <Box
      sx={{
        background: "linear-gradient(135deg, #3D3E61 0%, #333456 100%)", // สีทึบไล่ระดับ
        border: "1px solid rgba(255, 162, 183, 0.2)",
        borderRadius: "12px",
        p: { xs: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
        height: "100%",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        ...(hoverEffect && {
          "&:hover": {
            transform: "translateY(-5px)",
            background: "linear-gradient(135deg, #464870 0%, #393A5E 100%)", // สว่างขึ้นนิดหน่อยตอนโฮเวอร์
            borderColor: "#FFA2B7",
            boxShadow:
              "0 15px 30px rgba(0,0,0,0.6), 0 0 15px rgba(255, 162, 183, 0.3)",
          },
        }),
        ...sx,
      }}
    >
      {!disableDeco && <PhantomPianoAndCrane />}
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  </motion.div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <Box sx={{ mb: 4, position: "relative" }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        position: "relative",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          p: 1.2,
          borderRadius: "10px",
          background: "#060930", // พื้นหลังไอคอนสีทึบ
          border: "1px solid #FFA2B7",
          boxShadow: "0 0 15px rgba(255, 162, 183, 0.4)",
          display: "flex",
        }}
      >
        <Icon
          sx={{
            color: "primary.main",
            fontSize: 26,
            filter: "drop-shadow(0 0 5px #FFA2B7)",
          }}
        />
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            color: "#FFFFFF",
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
            letterSpacing: 1,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: "primary.main",
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: 0.9,
              display: "block",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
    <Box
      sx={{
        mt: 2,
        height: "2px",
        width: "100%",
        background:
          "linear-gradient(90deg, #FFA2B7 0%, #333456 50%, transparent 100%)",
        boxShadow: "0 0 8px rgba(255, 162, 183, 0.5)",
      }}
    />
  </Box>
);

const MysticText = ({ children, sx, variant = "h6" }) => (
  <Typography
    variant={variant}
    sx={{
      background: "linear-gradient(180deg, #FFFFFF 0%, #FFA2B7 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 8px rgba(255, 162, 183, 0.4))",
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default function KyoraProfile() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const audioRef = useRef(null);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    if (!loading && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [loading]);

  const toggleMusic = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "body, html": {
            cursor: `${normalCraneCursor} !important`,
            backgroundColor: "#060930",
          },
          "a, button, [role='button'], .MuiTab-root, .MuiIconButton-root, .MuiButtonBase-root":
            { cursor: `${pointerCraneCursor} !important` },
          "::-webkit-scrollbar": { width: "6px" },
          "::-webkit-scrollbar-track": { background: "#060930" },
          "::-webkit-scrollbar-thumb": {
            background: "#333456",
            borderRadius: "10px",
            border: "1px solid #FFA2B7",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#FFA2B7",
          },
        }}
      />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <MagicalAtmosphere />
          <audio ref={audioRef} src="/Song.mp3" loop autoPlay />

          {/* Music Toggle */}
          <Box sx={{ position: "fixed", bottom: 30, right: 30, zIndex: 999 }}>
            <AnimatePresence>
              {isPlaying && (
                <Box
                  component={motion.div}
                  animate={{
                    scale: [1, 1.4, 1],
                    boxShadow: [
                      "0 0 0px 0px rgba(255, 162, 183, 0)",
                      "0 0 25px 12px rgba(255, 162, 183, 0.4)",
                      "0 0 0px 0px rgba(255, 162, 183, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              )}
            </AnimatePresence>
            <IconButton
              onClick={toggleMusic}
              sx={{
                background: "#333456", // สีทึบ
                border: "1px solid",
                borderColor: "rgba(255, 162, 183, 0.4)",
                color: isPlaying ? "primary.main" : "text.secondary",
                boxShadow: isPlaying
                  ? "0 0 15px rgba(255, 162, 183, 0.4)"
                  : "none",
                p: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#060930",
                  transform: "scale(1.05)",
                  borderColor: "primary.main",
                  boxShadow: "0 0 20px rgba(255, 162, 183, 0.6)",
                },
              }}
            >
              {isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              py: { xs: 4, md: 8 },
              px: { xs: 2, md: 4 },
              maxWidth: 1200,
              mx: "auto",
            }}
          >
            {/* Header Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <LuxuryCard sx={{ mb: 6 }}>
                <Box sx={{ p: { xs: 4, md: 6 } }}>
                  <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                      {/* Magical Avatar Frame */}
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-flex",
                          padding: 1.5,
                        }}
                      >
                        <ArcaneCircle
                          size={240}
                          opacity={0.3}
                          color="#FFA2B7"
                          sx={{ top: -10, left: -10 }}
                        />
                        <Box
                          component={motion.div}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          sx={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            border: "2px solid rgba(255, 162, 183, 0.2)",
                            borderTop: "3px solid #FFA2B7",
                            borderBottom: "3px solid #FFA2B7",
                            boxShadow: "0 0 20px rgba(255, 162, 183, 0.4)",
                            opacity: 0.9,
                          }}
                        />
                        <Avatar
                          src="YOUR_KYORA_IMAGE_URL.jpg"
                          alt="Hisame Kyōra"
                          sx={{
                            width: { xs: 180, sm: 220 },
                            height: { xs: 180, sm: 220 },
                            border: "4px solid #060930", // สีทึบ
                            filter: "grayscale(10%) contrast(1.1)",
                            boxShadow: "0 0 40px rgba(0,0,0,0.9)",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                          opacity: 0.9,
                          textShadow: "0 0 8px rgba(255, 162, 183, 0.5)",
                        }}
                      >
                        <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                        จิตวิญญาณแห่งธรรมชาติ ฤดูหนาว「道」 | วิถี ความมืด
                        <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                      </Typography>
                      <MysticText
                        variant="h2"
                        sx={{
                          mb: 1,
                          fontSize: { xs: "2.5rem", md: "3.5rem" },
                          textShadow: "0 4px 20px rgba(0,0,0,0.9)",
                        }}
                      >
                        氷雨 響羅
                      </MysticText>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "secondary.main",
                          mb: 4,
                          opacity: 0.9,
                          fontSize: "1.3rem",
                        }}
                      >
                        ฮิซาเมะ เคียวระ (Hisame Kyōra)
                      </Typography>

                      <Divider
                        sx={{
                          mb: 4,
                          borderColor: "rgba(255, 162, 183, 0.2)",
                        }}
                      />

                      <Grid container spacing={2}>
                        {[
                          { label: "AGE", val: "18" },
                          { label: "BIRTHDAY", val: "12 / 06" },
                          { label: "GENDER", val: "ชาย" },
                          { label: "BLOOD", val: "A" },
                          { label: "NATIONALITY", val: "ญี่ปุ่น / ญี่ปุ่น" },
                          { label: "WEIGHT / HEIGHT", val: "72 kg / 184 cm" },
                          { label: "CLASS / ROOM", val: "มังไก / 3-B" },
                          { label: "DORM", val: "ฤดูหนาว" },
                          { label: "ROOMMATE", val: "คากามิ ริคุ" },
                          { label: "STUDENT ID", val: "30014" },
                          { label: "CLUB", val: "-" },
                        ].map((info, idx) => (
                          <Grid item xs={6} sm={4} key={idx}>
                            <Box
                              sx={{
                                pl: 2,
                                borderLeft:
                                  "2px solid rgba(255, 162, 183, 0.3)",
                                transition: "all 0.3s",
                                "&:hover": {
                                  borderLeftColor: "primary.main",
                                  textShadow:
                                    "0 0 8px rgba(255, 162, 183, 0.5)",
                                  transform: "translateX(4px)",
                                },
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "secondary.main",
                                  fontFamily: "'Cinzel', serif",
                                  display: "block",
                                  mb: 0.5,
                                  opacity: 0.8,
                                }}
                              >
                                {info.label}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#FFFFFF", fontWeight: 400 }}
                              >
                                {info.val}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </LuxuryCard>
            </motion.div>

            {/* Main Content Area */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 5,
              }}
            >
              {/* Magical Tabs (Spellbook Index) */}
              <Box sx={{ width: { xs: "100%", md: "280px" }, flexShrink: 0 }}>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    orientation={
                      window.innerWidth > 900 ? "vertical" : "horizontal"
                    }
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      "& .MuiTabs-indicator": {
                        backgroundColor: "primary.main",
                        width: { md: "4px" },
                        height: { xs: "4px" },
                        borderRadius: "4px",
                        boxShadow: "0 0 10px rgba(255, 162, 183, 0.8)",
                      },
                      "& .MuiTab-root": {
                        color: "text.secondary",
                        alignItems: { md: "flex-start" },
                        textAlign: "left",
                        py: 2.5,
                        px: 3,
                        transition: "all 0.4s ease",
                        fontSize: "1rem",
                        borderRadius: "10px",
                        mb: { md: 1 },
                        border: "1px solid transparent",
                        "&:hover": {
                          background: "#333456", // สีทึบ
                          color: "#FFFFFF",
                          border: "1px solid rgba(255, 162, 183, 0.2)",
                        },
                        "&.Mui-selected": {
                          color: "primary.main",
                          background: "#333456", // สีทึบ
                          border: "1px solid rgba(255, 162, 183, 0.4)",
                          boxShadow:
                            "inset 4px 0 15px rgba(255, 162, 183, 0.1)",
                          textShadow: "0 0 10px rgba(255, 162, 183, 0.4)",
                        },
                      },
                    }}
                  >
                    <Tab
                      icon={<LocalHospitalIcon sx={{ mr: { md: 2 } }} />}
                      label="ความผิดปกติ & สุขภาพ"
                      iconPosition="start"
                    />
                    <Tab
                      icon={<MenuBookIcon sx={{ mr: { md: 2 } }} />}
                      label="ประวัติความเป็นมา"
                      iconPosition="start"
                    />
                    <Tab
                      icon={<AutoAwesomeIcon sx={{ mr: { md: 2 } }} />}
                      label="ทักษะเวทมนตร์"
                      iconPosition="start"
                    />
                    <Tab
                      icon={<PsychologyIcon sx={{ mr: { md: 2 } }} />}
                      label="ลักษณะนิสัย"
                      iconPosition="start"
                    />
                    <Tab
                      icon={<FavoriteIcon sx={{ mr: { md: 2 } }} />}
                      label="ความชอบ & ความกลัว"
                      iconPosition="start"
                    />
                    <Tab
                      icon={<InfoIcon sx={{ mr: { md: 2 } }} />}
                      label="ข้อมูลอื่นๆ"
                      iconPosition="start"
                    />
                  </Tabs>
                </motion.div>
              </Box>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <AnimatePresence mode="wait">
                  {/* TAB 0: ความผิดปกติ & สุขภาพ */}
                  {activeTab === 0 && (
                    <motion.div
                      key="tab0"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <MagicalGlassCard>
                            <SectionHeader
                              icon={WarningAmberIcon}
                              title="ความผิดปกติทางร่างกาย"
                              subtitle="Physical Abnormalities"
                            />
                            <Grid container spacing={3}>
                              {[
                                "ผิวหนังบริเวณ คอ และ เอว ฉีกขาดและเปลี่ยนสภาพพัฒนาเป็นเหงือกปลา",
                                "ภายในปากมี ฟันแหลมคมหลายซี่",
                                "ร่างกาย แผ่ไอเย็นจาง ๆ ตลอดเวลา",
                                "ใบหูเริ่มเปลี่ยนรูป",
                                "หางปลาขนาดใหญ่ งอกจากกระดูกก้นกบ",
                                "มี ครีบยาวบาง งอกจากแผ่นหลัง",
                              ].map((text, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                  <Box
                                    sx={{
                                      p: 2.5,
                                      background: "#060930", // สีทึบ
                                      borderLeft: "3px solid #FFA2B7",
                                      borderRadius: "0 8px 8px 0",
                                      height: "100%",
                                      transition: "all 0.3s",
                                      "&:hover": {
                                        transform: "translateX(8px)",
                                        background: "#1C1D3A", // สีทึบ
                                        boxShadow:
                                          "inset 10px 0 15px rgba(255, 162, 183, 0.05)",
                                      },
                                    }}
                                  >
                                    <Typography variant="body2">
                                      {text}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </MagicalGlassCard>
                        </Grid>
                        <Grid item xs={12}>
                          <MagicalGlassCard hoverEffect>
                            <SectionHeader
                              icon={LocalHospitalIcon}
                              title="โรคประจำตัว"
                              subtitle="Medical Condition"
                            />
                            <Box
                              sx={{
                                p: 3,
                                background: "#060930", // สีทึบ
                                borderRadius: "10px",
                                border: "1px solid rgba(255, 162, 183, 0.2)",
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              <ArcaneCircle
                                size={150}
                                color="#FFA2B7"
                                opacity={0.1}
                                sx={{ top: -50, right: -50 }}
                              />
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "primary.main",
                                  mb: 1.5,
                                  position: "relative",
                                  zIndex: 1,
                                }}
                              >
                                Insomnia (ภาวะนอนไม่หลับ)
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "text.secondary",
                                  position: "relative",
                                  zIndex: 1,
                                }}
                              >
                                ภาวะนอนไม่หลับไม่ได้เกิดจากสภาพร่างกายเพียงอย่างเดียว
                                แต่เป็นผลรวมของ ความเครียดทางจิตใจ +
                                สภาพแวดล้อมที่กดดันตั้งแต่วัยเด็ก
                              </Typography>
                            </Box>
                          </MagicalGlassCard>
                        </Grid>
                      </Grid>
                    </motion.div>
                  )}

                  {/* TAB 1: ประวัติความเป็นมา */}
                  {activeTab === 1 && (
                    <motion.div
                      key="tab1"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
                      <MagicalGlassCard>
                        <SectionHeader
                          icon={MenuBookIcon}
                          title="ประวัติความเป็นมา"
                          subtitle="Full Biography"
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            color: "text.secondary",
                            mb: 4,
                            textIndent: "40px",
                          }}
                        >
                          <span
                            style={{
                              color: "#FFA2B7",
                              fontSize: "1.8rem",
                              fontWeight: 600,
                              fontFamily: "'Cinzel', serif",
                              lineHeight: 1,
                              textShadow: "0 0 10px rgba(255, 162, 183, 0.6)",
                            }}
                          >
                            เ
                          </span>
                          คียวระเกิดใน "ฮิซาเมะ"
                          ตระกูลเก่าแก่ที่มีฐานะร่ำรวยและยึดถือขนบธรรมเนียมอย่างเคร่งครัด
                          พวกเขาให้ความสำคัญกับความสมบูรณ์แบบและสายเลือดที่บริสุทธิ์
                          ทว่าเคียวระกลับเกิดมาพร้อมกับ "ความผิดปกติ" ทางร่างกาย
                          ทำให้ครอบครัวมองเขาเป็นความอัปยศและความผิดพลาด
                          เขาจึงถูกเลี้ยงดูมาภายใต้ความกดดันอย่างหนัก
                          ถูกบังคับให้ต้องเพียบพร้อมในทุกด้านเพื่อชดเชยร่างกายที่ผิดปกติ
                          เคียวระต้องใช้ชีวิตราวกับนักโทษในบ้านของตัวเอง
                          ต้องสวมเสื้อผ้ามิดชิดเพื่อปกปิดความลับนี้ไว้
                          จนกระทั่งในวัย 14 ปี
                          ความผิดปกติของเขาแสดงอาการรุนแรงขึ้นจนตระกูลคิดจะกำจัดเขา
                          เคียวระจึงตัดสินใจโกหกครอบครัวว่าได้รับจดหมายเชิญจากสถาบันการแพทย์ลับที่จะช่วย
                          "รักษา" เขาได้
                          เพื่อใช้เป็นข้ออ้างในการเดินทางมายังโรงเรียนเวทมนตร์แห่งนี้
                        </Typography>

                        <Box
                          sx={{
                            my: 4,
                            display: "flex",
                            alignItems: "center",
                            opacity: 0.7,
                          }}
                        >
                          <Box
                            sx={{
                              flexGrow: 1,
                              height: "2px",
                              background:
                                "linear-gradient(90deg, transparent, #FFA2B7)",
                            }}
                          />
                          <AutoAwesomeIcon
                            sx={{
                              mx: 2,
                              color: "primary.main",
                              fontSize: 18,
                              filter: "drop-shadow(0 0 5px #FFA2B7)",
                            }}
                          />
                          <Box
                            sx={{
                              flexGrow: 1,
                              height: "2px",
                              background:
                                "linear-gradient(270deg, transparent, #FFA2B7)",
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{
                            color: "text.secondary",
                            mb: 4,
                            textIndent: "40px",
                          }}
                        >
                          ปัจจุบันเคียวระอาศัยอยู่ในหอพักของโรงเรียนมัธยมปลายมาโฮชิกิ
                          หลังจากที่ได้เห็นว่าที่นี่มีผู้คนที่มีความผิดปกติมากมาย
                          เขาจึงเริ่มคลายความหวาดระแวงและเลิกหมกมุ่นกับการปกปิดร่างกายตนเองอย่างที่เคยทำในอดีต
                          ในด้านฐานะ เคียวระมีสภาพคล่องทางการเงินที่สูงมาก
                          เขาได้รับเงินสนับสนุนจากตระกูลอย่างสม่ำเสมอ
                          (เนื่องจากครอบครัวยังคงเชื่อว่าเขากำลังใช้เงินเพื่อรักษาตัวให้กลับมาปกติ)
                          แม้เขาจะไม่ได้มีนิสัยใช้จ่ายฟุ่มเฟือย
                          แต่ด้วยความเคยชิน
                          เขามักจะใช้แต่ข้าวของเครื่องใช้ที่มีคุณภาพสูง
                          สำหรับการใช้ชีวิตในหอพัก
                          เขาเป็นคนหวงแหนพื้นที่ส่วนตัวและเจ้าระเบียบมาก
                          แบ่งขอบเขตของตัวเองกับรูมเมทอย่างชัดเจน
                        </Typography>

                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            background: "#060930", // สีทึบ
                            border: "1px solid #FF4D6D",
                            borderRadius: "8px",
                            px: 2,
                            py: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#FF4D6D",
                              fontWeight: 500,
                              letterSpacing: 1,
                              textShadow: "0 0 8px rgba(255, 77, 109, 0.5)",
                            }}
                          >
                            [ ล็อคข้อมูลเพิ่มเติม ]
                          </Typography>
                        </Box>
                      </MagicalGlassCard>
                    </motion.div>
                  )}

                  {/* TAB 2: เวทมนตร์ */}
                  {activeTab === 2 && (
                    <motion.div
                      key="tab2"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <MagicalGlassCard>
                            <SectionHeader
                              icon={AutoAwesomeIcon}
                              title="เวทมนตร์พื้นฐาน"
                              subtitle="Shadow Manipulations"
                            />
                            <Grid container spacing={3}>
                              {[
                                {
                                  name: "สรรค์สร้างเงา",
                                  desc: "ความสามารถพื้นฐานในการ ดึงเงาจากวัตถุรอบตัวหรือจากร่างกายของตนเอง มาปั้นเป็นรูปร่างชั่วคราว วัตถุมีลักษณะเหมือน ของแข็งสีดำด้าน สลายตัวเมื่อเสียสมดุลหรือถูกโจมตีแรง เช่น อาวุธชั่วคราว เข็ม มีด ลิ่ม, มือเงาขนาดใหญ่สำหรับหยิบจับของ, ร่มเงาสำหรับกันฝน",
                                  bullets: [
                                    "ต้องมี แหล่งกำเนิดเงา ใกล้ตัว",
                                    "แสงสว่างจัดจะทำให้สร้างวัตถุได้ยาก",
                                    "วัตถุขนาดใหญ่ใช้พลังเวทมาก",
                                  ],
                                },
                                {
                                  name: "เคลื่อนที่ผ่านเงา",
                                  desc: "สามารถเคลื่อนที่ระยะสั้นผ่านเงาได้โดยการจมหายเข้าไปในเงาหนึ่งและปรากฏออกจากอีกเงาหนึ่ง",
                                  bullets: [
                                    "ระยะประมาณ 3–6 เมตร",
                                    "ต้องมีเงาทั้งต้นทางและปลายทาง",
                                    "ใช้ต่อเนื่องหลายครั้งจะทำให้เวียนหัว",
                                    "ไม่สามารถพาคนอื่นไปด้วย",
                                  ],
                                },
                                {
                                  name: "เย็บเงา",
                                  desc: "สร้างเข็มหรือลิ่มจากเงา แล้วปาให้ปักลงบนเงาของเป้าหมาย ทำให้ร่างจริงถูกตรึงกับพื้น คล้ายอาการ “ผีอำ” เป้าหมายขยับไม่ได้แต่ยังพูดได้",
                                  bullets: [
                                    "ต้องเห็นเงาของเป้าหมายชัดเจน",
                                    "หากเงาถูกทำลาย (เช่นแสงเปลี่ยน) จะหลุด",
                                    "ใช้กับหลายคนพร้อมกันยาก",
                                  ],
                                },
                                {
                                  name: "เงาเลียนแบบ",
                                  desc: "สามารถสร้าง ร่างเงาที่มีรูปร่างเหมือนตัวเอง เอามาช่วยทำงานบ้าน",
                                  bullets: [
                                    "ถูกโจมตีครั้งเดียวก็สลาย",
                                    "ใช้พลังเวทค่อนข้างมาก",
                                    "เรียกออกมาได้แบบมีประสิทธิภาพมากสุด ได้แค่ 3 ร่าง",
                                  ],
                                },
                                {
                                  name: "หนามเงา",
                                  desc: "ควบแน่นเงาเป็นของแหลมพอดีมือ แทงใส่เป้าหมาย ไม่ทำให้เกิดบาดแผลจริงแต่ รบกวนการไหลเวียนพลังเวท ส่วนที่ถูกแทงจะ ชาและขยับไม่ได้ชั่วคราว",
                                  bullets: ["ระยะโจมตีสั้น", "ผลอยู่ไม่นาน"],
                                },
                                {
                                  name: "อาณาเขตเงา",
                                  desc: "ขยายเงาของตัวเองเป็น อาณาเขตเงาขนาดเล็ก ดูดกลืนเสียง ลดการสะท้อนแสง คนในพื้นที่แทบไม่ถูกสังเกต ส่วนมากไว้ใช้ สำหรับทำงานเงียบๆ อ่านหนังสือ งานอดิเรก",
                                  bullets: [
                                    "พื้นที่เล็ก (ประมาณโต๊ะหรือห้องเล็ก)",
                                    "ใช้พลังเวทต่อเนื่อง",
                                    "หากแสงสว่างมากอาณาเขตจะอ่อนลง",
                                  ],
                                },
                                {
                                  name: "โล่กลืนมนตรา",
                                  desc: "บิดเงาของตัวเองขึ้นเป็น กำแพงเงาป้องกัน กลืนพลังเวทที่โจมตีเข้ามา ลดความเสียหายเวทมนตร์",
                                  bullets: [
                                    "ป้องกันเวทได้ดีกว่าการโจมตีทางกายภาพ",
                                    "ใช้ต่อเนื่องทำให้พลังเวทหมดเร็ว",
                                    "พลังในส่วนนี้เป็นสิ่งที่เคียวระไม่ค่อยใช้ มีแค่ส่วนน้อยที่รู้ว่าเขาทำได้ (น้อยมาก!)",
                                  ],
                                },
                              ].map((spell, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 3,
                                      height: "100%",
                                      background: "#060930", // สีทึบ
                                      border:
                                        "1px solid rgba(255, 162, 183, 0.2)",
                                      borderRadius: "10px",
                                      transition: "all 0.3s",
                                      position: "relative",
                                      overflow: "hidden",
                                      "&:hover": {
                                        background: "#1A1B38", // สีทึบสว่างขึ้น
                                        borderColor: "primary.main",
                                        boxShadow:
                                          "0 0 15px rgba(255, 162, 183, 0.2)",
                                        transform: "translateY(-3px)",
                                      },
                                    }}
                                  >
                                    <ArcaneCircle
                                      size={100}
                                      color="#FFA2B7"
                                      opacity={0.05}
                                      sx={{ top: -20, right: -20 }}
                                    />
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        color: "primary.main",
                                        mb: 1.5,
                                        fontWeight: 600,
                                        textShadow:
                                          "0 0 8px rgba(255, 162, 183, 0.3)",
                                      }}
                                    >
                                      {spell.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "text.secondary",
                                        mb: 2,
                                        position: "relative",
                                        zIndex: 1,
                                      }}
                                    >
                                      {spell.desc}
                                    </Typography>
                                    {spell.bullets && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: 1.2,
                                          position: "relative",
                                          zIndex: 1,
                                        }}
                                      >
                                        {spell.bullets.map((bullet, idx) => (
                                          <Typography
                                            key={idx}
                                            variant="body2"
                                            sx={{
                                              color: "text.secondary",
                                              pl: 2,
                                              borderLeft: "2px solid #FFA2B7",
                                            }}
                                          >
                                            <span
                                              style={{
                                                color: "#FFA2B7",
                                                marginRight: "4px",
                                              }}
                                            >
                                              ✦
                                            </span>{" "}
                                            {bullet}
                                          </Typography>
                                        ))}
                                      </Box>
                                    )}
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </MagicalGlassCard>
                        </Grid>

                        <Grid item xs={12}>
                          <MagicalGlassCard
                            sx={{ borderLeft: "4px solid #FFA2B7" }}
                          >
                            <SectionHeader
                              icon={ShieldIcon}
                              title="ทักษะเวทมนตร์อื่นๆ"
                              subtitle="Advanced & Special Arts"
                            />
                            <Grid container spacing={3}>
                              {[
                                {
                                  name: "ดึงเงา",
                                  desc: "ดึงเงาของวัตถุหรือสิ่งมีชีวิตรอบตัวมาหล่อเลี้ยงพลังเวทของตนเองชั่วคราว พลังที่ได้รับจะไม่ถาวร เป็นการฟื้นฟูพลังเวท ลดความเหนื่อยล้า บรรเทาความเจ็บปวดให้กับผู้ใช้ ถ้าเป็นสิ่งมีชีวิตจะให้ผลดีมากกว่า ผลที่ส่งกับสิ่งมีชีวิต คือ รู้สึกอ่อนแรงเล็กน้อย หนาววูบเหมือนพลังบางส่วนถูกดึงออก รวมถึงอาจรู้สึกว่างเปล่าหรือเฉื่อยชาในช่วงเวลาสั้น ๆ",
                                  bullets: [
                                    "พลังที่ดึงมา ไม่ถาวร และจะค่อย ๆ สลายไป",
                                    "ไม่สามารถดึงพลังจำนวนมากจากเป้าหมายเดียวได้",
                                    "หากใช้ต่อเนื่องมากเกินไป ผู้ใช้จะเกิดอาการ เวียนหัว คลื่นไส้ เสียสมาธิ",
                                  ],
                                },
                                {
                                  name: "กินเงา",
                                  desc: "สามารถ กัดกินอาการผิดปกติจากผู้อื่น ไม่ว่าจะเป็นความเจ็บปวด ความเหนื่อยล้า หรือความปั่นป่วนทางจิตใจ โดยดึงสิ่งเหล่านั้นออกมาในรูปของเงา แล้วให้ความมืดของตนเองกลืนกินเข้าไป เมื่อเงาของอาการเหล่านั้นถูกดึงออก เป้าหมายจะรู้สึกว่าภาระบางอย่างถูกปลดปล่อยออกจากร่างกายและจิตใจ บรรเทาความเจ็บปวดทางร่างกาย ลดความเหนื่อยล้าและความอ่อนแรง ทำให้จิตใจสงบลง โดยปกติ เงาของเคียวระจะเป็นผู้กลืนกินเงาของอาการผิดปกติแทน ราวกับมีชีวิตของตัวเอง แต่หากเคียวระเป็นผู้กัดกินเงานั้นด้วยตนเองโดยตรง ผลของการบรรเทาจะมีประสิทธิภาพมากกว่า",
                                  bullets: [
                                    "การรักษาเป็นเพียง การบรรเทาชั่วคราว",
                                    "หากมากเกินไป เคียวระอาจเกิดอาการ เวียนหัว อ่อนล้า เสียสมาธิ",
                                    "การกินเงาจากผู้อื่นต้องใช้พลังเวทมากกว่าการรักษาตัวเอง",
                                    "ไม่สามารถลบล้างอาการรุนแรงหรือใช้ติดต่อกันหลายครั้งในเวลาใกล้กันได้",
                                  ],
                                },
                                {
                                  name: "ฝนเขี้ยวเงา",
                                  desc: "ควบแน่นเงารอบตัวให้แตกตัวเป็น เขี้ยวหนามสีดำจำนวนมาก ก่อนจะปล่อยให้พุ่งลงมาจากอากาศราวกับฝน เขี้ยวเงาเหล่านี้จะตกลงใส่พื้นที่เป้าหมายอย่างรวดเร็ว หนามเงาเหล่านี้มีความหนาแน่นสูงพอที่จะ สร้างบาดแผลจริงต่อร่างกาย เมื่อกระทบเป้าหมาย ทำให้พื้นที่ที่ถูกโจมตีกลายเป็นบริเวณอันตรายที่ยากต่อการเคลื่อนไหว เมื่อหนามเงาปักลงพื้น มันจะคงสภาพอยู่เพียงชั่วครู่ก่อนจะสลายไป",
                                  bullets: [
                                    "ต้องมีเงาในพื้นที่จึงจะสร้างหนามจำนวนมากได้",
                                    "ใช้พลังเวทค่อนข้างมาก",
                                    "เป็นการโจมตีแบบพื้นที่ ความแม่นยำจึงไม่สูง เน้นจำนวน",
                                    "หากแสงสว่างจัด จำนวนและความแข็งของหนามเงาจะลดลง",
                                  ],
                                },
                              ].map((spell, i) => (
                                <Grid item xs={12} key={i}>
                                  <Box
                                    sx={{
                                      p: 3,
                                      background: "#060930", // สีทึบ
                                      borderRadius: "10px",
                                      border:
                                        "1px solid rgba(255, 162, 183, 0.3)",
                                      position: "relative",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <ArcaneCircle
                                      size={200}
                                      color="#FFA2B7"
                                      opacity={0.05}
                                      sx={{ top: -50, right: -50 }}
                                    />
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        color: "primary.main",
                                        mb: 1.5,
                                        position: "relative",
                                        zIndex: 1,
                                        textShadow:
                                          "0 0 5px rgba(255,162,183,0.3)",
                                      }}
                                    >
                                      {spell.name}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        color: "text.secondary",
                                        mb: 2,
                                        position: "relative",
                                        zIndex: 1,
                                      }}
                                    >
                                      {spell.desc}
                                    </Typography>
                                    {spell.bullets && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: 1.5,
                                          mt: 2,
                                          position: "relative",
                                          zIndex: 1,
                                        }}
                                      >
                                        {spell.bullets.map((bullet, idx) => (
                                          <Typography
                                            key={idx}
                                            variant="body2"
                                            sx={{
                                              color: "text.secondary",
                                              pl: 2,
                                              borderLeft: "2px solid #FFA2B7",
                                            }}
                                          >
                                            <span
                                              style={{
                                                color: "#FFA2B7",
                                                marginRight: "6px",
                                              }}
                                            >
                                              ✧
                                            </span>{" "}
                                            {bullet}
                                          </Typography>
                                        ))}
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </MagicalGlassCard>
                        </Grid>
                      </Grid>
                    </motion.div>
                  )}

                  {/* TAB 3: ลักษณะนิสัย */}
                  {activeTab === 3 && (
                    <motion.div
                      key="tab3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
                      <Grid container spacing={4}>
                        {[
                          {
                            title: "ขี้อาย",
                            desc: "เขาไม่ได้เป็นคนขี้อายแบบหลบหน้าหลบตา แม้ภายในจะรู้สึกประหม่า ภายนอกเขาก็ยังคงพยายามรักษาสีหน้านิ่งเฉยเอาไว้ เขาสามารถพูดคุยกับผู้อื่นได้ตามปกติ แต่จะใช้ถ้อยคำที่สุภาพและเป็นทางการเกินจำเป็นเป็นเหมือนกำแพงกั้นไม่ให้ใครเข้ามาใกล้ชิดมากนัก เขาหลีกเลี่ยงการสบตากับผู้อื่นเป็นเวลานาน และมักตอบคำถามสั้น ๆ ได้ใจความ เพื่อให้บทสนทนาจบลงโดยเร็วที่สุด เมื่อสิ้นสุดบทสนทนา เขามักจะหลบไปอยู่ในมุมเงียบ ๆ ตามลำพังทันที",
                          },
                          {
                            title: "เจ้าระเบียบ",
                            desc: "แรงกดดันจากครอบครัวทำให้เขายึดติดกับความสมบูรณ์แบบ กฎระเบียบ ความเรียบร้อย และความรับผิดชอบอย่างมาก ขาใช้ความเพียบพร้อมนี้เป็นเกราะป้องกันไม่ให้ใครกล้าเข้ามาจับผิดหรือตั้งคำถามถึงตัวตนของเขา",
                          },
                          {
                            title: "หวาดระแวงการสัมผัส",
                            desc: "ระแวงการสัมผัสตัวอย่างรุนแรง หากมีใครมาตบไหล่หรือพยายามสวมกอด แบบไม่ทันตั้งตัว เขาจะชะงัก เผลอชักสีหน้ารังเกียจ หรือปัดมือทิ้งอย่างรวดเร็วจนดูเหมือนคนหยิ่งยโส",
                          },
                          {
                            title: "โลกส่วนตัวสูง",
                            desc: "เขามีพื้นที่ส่วนตัวที่แทบไม่มีใครเข้าถึงได้ และมักจะเก็บมันไว้เป็นความลับที่ไม่ต้องการให้ใครรับรู้ เมื่อรู้สึกเครียด เขาทำงานอดิเรก ตามลำพัง",
                          },
                          {
                            title: "อ่อนโยน(?) ซึนแหละ",
                            desc: "เป็นคนที่แสดงความใส่ใจต่อผู้อื่นผ่านการกระทำมากกว่าคำพูด หากเห็นใครกำลังลำบาก เขามักจะเข้าไปช่วยโดยไม่พูดอะไรนัก สีหน้ามักยังคงเรียบนิ่ง หรือบ่นพึมพำว่า “น่ารำคาญ” เหมือนฝืนใจช่วย แต่สุดท้ายก็ช่วยจนเสร็จอยู่ดี แม้ภายนอกจะดูเย็นชาและเข้มงวด ทว่าลึก ๆ แล้วเขาโหยหาความเมตตาและความอ่อนโยนจากผู้อื่น หากพบเห็นคนหรือสัตว์ที่กำลังเดือดร้อน เขามักอดไม่ได้ที่จะยื่นมือเข้าไปช่วย ถึงจะยังคงทำหน้าตายหรือบ่นอุบอิบเหมือนเดิมก็ตาม เป็นผู้ฟังที่ดี แม้ภายนอกจะทำท่าทีเหมือนไม่ได้สนใจบทสนทนา แต่เขากลับจดจำรายละเอียดเล็ก ๆ น้อย ๆ ของคนรอบตัวได้เสมอ และมักนำสิ่งเหล่านั้นไปช่วยเหลือผู้อื่นอย่างเงียบ ๆ โดยที่แทบไม่พูดถึงมันเลย",
                          },
                        ].map((trait, index) => (
                          <Grid item xs={12} md={6} key={index}>
                            <MagicalGlassCard
                              hoverEffect
                              sx={{ height: "100%", p: 3 }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "primary.main",
                                  mb: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                  textShadow:
                                    "0 0 5px rgba(255, 162, 183, 0.3)",
                                }}
                              >
                                <Box
                                  component={motion.div}
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 1, 0.7],
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  sx={{
                                    width: "8px",
                                    height: "8px",
                                    background: "#FFA2B7",
                                    borderRadius: "50%",
                                    boxShadow: "0 0 8px #FFA2B7",
                                  }}
                                />
                                {trait.title}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ color: "text.secondary" }}
                              >
                                {trait.desc}
                              </Typography>
                            </MagicalGlassCard>
                          </Grid>
                        ))}
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              background: "#060930", // สีทึบ
                              border: "1px solid #FF4D6D",
                              borderRadius: "8px",
                              px: 2,
                              py: 1,
                              mt: 2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#FF4D6D",
                                fontWeight: 500,
                                letterSpacing: 1,
                                textShadow: "0 0 8px rgba(255, 77, 109, 0.5)",
                              }}
                            >
                              [ ล็อคข้อมูลเพิ่มเติม ]
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </motion.div>
                  )}

                  {/* TAB 4: สิ่งที่ชอบ ไม่ชอบ กลัว */}
                  {activeTab === 4 && (
                    <motion.div
                      key="tab4"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                          <MagicalGlassCard sx={{ height: "100%" }}>
                            <SectionHeader
                              icon={FavoriteIcon}
                              title="สิ่งที่ชอบ"
                              subtitle="Likes"
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                              }}
                            >
                              {[
                                "เสียงฝนตกหนัก",
                                "พื้นที่สลัว / ร่มเงา",
                                "ความสมบูรณ์แบบและความเป็นระเบียบ",
                                "กลิ่นน้ำเค็มและเสียงคลื่นทะเล",
                                "ขนมวากาชิ / พาร์เฟต์",
                                "ของน่ารัก",
                                "อุซากี้ เป็นเพียงการ์ตูนในโลกมนุษย์",
                              ].map((item, idx) => (
                                <Box
                                  key={idx}
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 1.5,
                                    p: 1.5,
                                    borderRadius: "8px",
                                    border: "1px solid transparent",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                      background: "#1E1F42", // สีทึบ
                                      borderColor: "rgba(255, 162, 183, 0.4)",
                                    },
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "#FFA2B7",
                                      marginTop: "2px",
                                      textShadow: "0 0 5px #FFA2B7",
                                    }}
                                  >
                                    ✦
                                  </span>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                  >
                                    {item}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#FF4D6D",
                                mt: 3,
                                fontWeight: 500,
                                textShadow: "0 0 5px rgba(255, 77, 109, 0.5)",
                              }}
                            >
                              [ล็อค]
                            </Typography>
                          </MagicalGlassCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <MagicalGlassCard sx={{ height: "100%" }}>
                            <SectionHeader
                              icon={CancelIcon}
                              title="สิ่งที่ไม่ชอบ"
                              subtitle="Dislikes"
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                              }}
                            >
                              {[
                                "การเป็นจุดสนใจ",
                                "คนที่ทำตัวตามใจชอบ ไร้ระเบียบ หรือร่าเริงเกินเหตุ",
                                "การถูกสัมผัสตัวอย่างกะทันหัน",
                              ].map((item, idx) => (
                                <Box
                                  key={idx}
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 1.5,
                                    p: 1.5,
                                    borderRadius: "8px",
                                    border: "1px solid transparent",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                      background: "#1E1F42", // สีทึบ
                                      borderColor: "rgba(255, 162, 183, 0.4)",
                                    },
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "#FFA2B7",
                                      marginTop: "2px",
                                      textShadow: "0 0 5px #FFA2B7",
                                    }}
                                  >
                                    ✦
                                  </span>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                  >
                                    {item}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#FF4D6D",
                                mt: 3,
                                fontWeight: 500,
                                textShadow: "0 0 5px rgba(255, 77, 109, 0.5)",
                              }}
                            >
                              [ล็อค]
                            </Typography>
                          </MagicalGlassCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <MagicalGlassCard sx={{ height: "100%" }}>
                            <SectionHeader
                              icon={WarningAmberIcon}
                              title="สิ่งที่กลัว"
                              subtitle="Fears"
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#FF4D6D",
                                mt: 2,
                                fontWeight: 500,
                                p: 2.5,
                                background: "#060930", // สีทึบ
                                border: "1px solid #FF4D6D",
                                borderRadius: "8px",
                                textShadow: "0 0 5px rgba(255, 77, 109, 0.5)",
                              }}
                            >
                              [ ล็อคข้อมูล ]
                            </Typography>
                          </MagicalGlassCard>
                        </Grid>
                      </Grid>
                    </motion.div>
                  )}

                  {/* TAB 5: ข้อมูลอื่นๆ */}
                  {activeTab === 5 && (
                    <motion.div
                      key="tab5"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <MagicalGlassCard>
                            <SectionHeader
                              icon={InfoIcon}
                              title="อื่น ๆ"
                              subtitle="Additional Informations"
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                              }}
                            >
                              {[
                                "CV : toi kuji scenes (sarazanmai) / 内山昂輝 Koki Uchiyama",
                                "Theme Song : truth, violence, warmth",
                                "มีฟันฉลาม",
                                "ร่างกายของเขาแผ่ไอเย็นจางๆ ออกมาตลอดเวลา ทำให้คนที่อยู่ใกล้อาจรู้สึกเย็นวาบ ในช่วงหน้าร้อน เขาอาจจะเป็นที่ชื่นชอบของเพื่อนๆ ที่ร้อนโดยไม่รู้ตัว",
                                "ครอบครัวส่งเงินมาให้เยอะมาก เขาจึงมักใช้ของแบรนด์เนมหรือของที่มีคุณภาพสูงมากโดยไม่รู้ตัว",
                                "เขามักจะแอบซื้อขนมหวานมากินคนเดียวในห้องตอนดึก และด้วยความเจ้าระเบียบ เขาจะค่อยๆ บรรจงตักกินด้วยท่วงท่าที่สง่างามและคุณชายสุดๆ",
                                "ชอบแอบไปซื้อขนมวากาชิพรีเมียมจาก ย่านการค้า",
                                "มักจะไปเดินเล่นที่ ชายหาดมิโอริ ในตอนกลางคืน",
                                "เมื่อใช้ความคิดหนักหรือรู้สึกกดดันมากๆ เขาจะเผลอกัดริมฝีปากตัวเองโดยไม่รู้ตัว และด้วยฟันฉลาม มักจะทำให้ริมฝีปากเขามีแผลเลือดซึมเล็กๆ อยู่บ่อยครั้ง",
                                "ชอบแต่งตัวเรียบร้อยและถูกระเบียบเสมอ เพราะเขาคุ้นชินกับการต้องทำทุกอย่างให้สมบูรณ์แบบ เพื่อไม่ให้โดนตำหนิ",
                                "เมื่ออาการนอนไม่หลับกำเริบหนัก เสียงรูมเมทขยับตัวทำให้เขากังวล เขาจะไม่นอนบนเตียง แต่จะหอบผ้าห่มไปขดตัวนอนในตู้เสื้อเก็บของหรือมุดลงไปนอนใต้โต๊ะ แล้วใช้เวทอาณาเขตเงาคลุมตัวเองไว้ ความแคบ มืด และการตัดเสียงรบกวน ทำให้เขารู้สึกปลอดภัย",
                                "ในที่มืดดวงตาของเคียวระจะสะท้อนแสงวาววับเหมือนตาสัตว์",
                                "มีเซนส์เรื่องฝน หูและเหงือกปลาของเขาไวต่อความชื้นในอากาศมาก เขาสามารถพยากรณ์ได้ล่วงหน้าว่าฝนกำลังจะตก",
                                "นอกจากไอเย็นแล้ว ตัวเขามักจะมีกลิ่นหอมจางๆ คล้ายกลิ่นอายทะเล Sea breeze ผสมกับกลิ่นกระดาษเก่าๆ",
                                "เขาอาจมีพฤติกรรมย้ำคิดย้ำทำ ในการเช็คว่าเครื่องรางฮามากุริยังอยู่กับตัวหรือไม่",
                                "เก็บอาการเก่งแค่ไหน แต่เมื่อเขาได้รับคำชมจนรู้สึกดีใจอย่างมาก อาจจะเผลอกวัดแกว่งหรือกระดิกหางปลาไปมาตามอารมณ์ความรู้สึกโดยที่เจ้าตัวไม่ทันสังเกตเห็น",
                                "เมื่อเจอของน่ารัก ดวงตาของเขาจะเบิกกว้างและเปล่งประกายวาววับขึ้นมาแวบหนึ่ง ก่อนจะรีบกระแอมไอ ดึงสติกลับมาทำหน้าตาย แล้วเดินจากไป (และแอบเดินกลับมาดูอีกทีตอนไม่มีคนเห็น)",
                                "เมื่อถูกจับได้ว่าใช้ของน่ารัก เขาจะตีหน้านิ่งและหาข้ออ้างด้วยน้ำเสียงจริงจัง แต่ใบหูและหลังคอของเขาจะเปลี่ยนเป็นสีแดงจัดจนจับสังเกตได้ง่ายๆ",
                              ].map((item, idx) => (
                                <Box
                                  key={idx}
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    p: 2.5,
                                    background: "#060930", // สีทึบ
                                    border:
                                      "1px solid rgba(255, 162, 183, 0.2)",
                                    borderRadius: "12px",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                      background: "#1A1B38", // สีทึบสว่างขึ้น
                                      borderColor: "primary.main",
                                      boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
                                      transform: "translateX(5px)",
                                    },
                                  }}
                                >
                                  <Box sx={{ minWidth: 24, pt: 0.5 }}>
                                    <Box
                                      component={motion.div}
                                      animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 1, 0.5],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: idx * 0.1,
                                      }}
                                      sx={{
                                        display: "inline-block",
                                        width: "8px",
                                        height: "8px",
                                        background: "#FFA2B7",
                                        borderRadius: "50%",
                                        boxShadow: "0 0 8px #FFA2B7",
                                      }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="body1"
                                    sx={{ color: "text.secondary" }}
                                  >
                                    {item}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </MagicalGlassCard>
                        </Grid>
                      </Grid>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Box>
          </Box>
        </motion.div>
      )}
    </ThemeProvider>
  );
}
