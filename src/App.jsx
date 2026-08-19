import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  GlobalStyles,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DiamondIcon from "@mui/icons-material/Diamond";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import HealingIcon from "@mui/icons-material/Healing";
import NightlightIcon from "@mui/icons-material/Nightlight";
import AddIcon from "@mui/icons-material/Add";

// --- Custom Cursors ---
const normalFishCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M6.5 4.5C9 3 13 4 16.5 7.5C20 11 21 15 19.5 17.5C18 20 14 18.5 11.5 15.5C9 12.5 4 8 6.5 4.5Z' fill='%23FFD1DC' stroke='%23FFA2B7' stroke-width='1'/><path d='M6.5 4.5L1.5 1L4 7Z' fill='%23FFA2B7'/></svg>") 4 4, auto`;
const pointerFishCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M6.5 4.5C9 3 13 4 16.5 7.5C20 11 21 15 19.5 17.5C18 20 14 18.5 11.5 15.5C9 12.5 4 8 6.5 4.5Z' fill='%23FFA2B7' stroke='%23FF6B8B' stroke-width='1'/><path d='M6.5 4.5L1.5 1L4 7Z' fill='%23FF6B8B'/></svg>") 4 4, pointer`;

// --- Theme Setup ---
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
      fontWeight: 600,
      letterSpacing: 1,
    },
    body1: { fontFamily: "'Prompt', sans-serif", fontWeight: 400 },
    body2: {
      fontFamily: "'Prompt', sans-serif",
      fontWeight: 300,
      fontSize: "1rem",
    },
    overline: {
      fontFamily: "'Cinzel', 'Playfair Display', serif",
      letterSpacing: 3,
    },
  },
  palette: {
    mode: "dark",
    background: { default: "#030102" },
    primary: { main: "#FFA2B7" },
    secondary: { main: "#FFD1DC" },
    info: { main: "#E5A9B4" },
    error: { main: "#C2185B" },
    text: { primary: "#FFF0F5", secondary: "#E8D8DE" },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
          marginBottom: "8px",
          "&:before": { display: "none" },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 162, 183, 0.05)",
          borderRadius: "12px",
          padding: "0 20px",
          minHeight: "56px",
          border: "1px solid rgba(255, 162, 183, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 162, 183, 0.1)",
            borderColor: "rgba(255, 162, 183, 0.3)",
          },
          "&.Mui-expanded": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottom: "1px solid transparent",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15, 5, 8, 0.6)",
          border: "1px solid rgba(255, 162, 183, 0.1)",
          borderTop: "none",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          padding: "24px",
        },
      },
    },
  },
});

// --- Preloader Shark Component (Crystal Origami Style) ---
const TopDownShark = ({ glowColor, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -6, 0, 6, 0],
      rotate: [-1.5, 1.5, -1.5],
    }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
    style={{ width: "100%", height: "100%", transformOrigin: "center" }}
  >
    <svg
      viewBox="0 0 100 150"
      width="100%"
      height="100%"
      style={{ filter: `drop-shadow(0 0 15px ${glowColor}B0)` }}
    >
      <defs>
        {/* สีตัวฉลามไล่ระดับ (Gradient Body) */}
        <linearGradient
          id={`bodyGrad-${glowColor}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor={glowColor} />
          <stop offset="100%" stopColor="#030102" />
        </linearGradient>
        {/* สีเส้นคริสตัล/โอริกามิ */}
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      {/* 1. ซิลลูเอทตัวฉลามทรงเพรียว (Sleek Base Silhouette) */}
      <path
        d="M 50,0 
           C 58,15 62,30 62,45 
           C 80,48 95,58 98,70 
           C 80,68 70,62 60,65 
           C 58,90 54,110 52,125 
           C 70,132 85,142 90,150 
           C 70,142 55,138 50,135 
           C 45,138 30,142 10,150 
           C 15,142 30,132 48,125 
           C 46,110 42,90 40,65 
           C 30,62 20,68 2,70 
           C 5,58 20,48 38,45 
           C 38,30 42,15 50,0 Z"
        fill={`url(#bodyGrad-${glowColor})`}
        opacity="0.85"
      />

      {/* 2. ลวดลายคริสตัลโอริกามิ (Origami/Crystal Facet Lines) */}
      <g stroke="url(#glassGrad)" strokeWidth="1.2" fill="none" opacity="0.65">
        <path d="M 50,0 L 50,135" /> {/* สันหลังกลาง */}
        <path d="M 50,25 L 62,45" /> {/* รอยพับหัวขวา */}
        <path d="M 50,25 L 38,45" /> {/* รอยพับหัวซ้าย */}
        <path d="M 50,45 L 98,70" /> {/* เส้นเชื่อมครีบขวา */}
        <path d="M 50,45 L 2,70" /> {/* เส้นเชื่อมครีบซ้าย */}
        <path d="M 62,45 L 60,65 L 50,85" /> {/* รอยพับตัวขวา */}
        <path d="M 38,45 L 40,65 L 50,85" /> {/* รอยพับตัวซ้าย */}
        <path d="M 60,65 L 98,70" /> {/* รอยตัดครีบขวาล่าง */}
        <path d="M 40,65 L 2,70" /> {/* รอยตัดครีบซ้ายล่าง */}
        <path d="M 50,85 L 52,125 L 90,150" /> {/* รอยพับหางขวา */}
        <path d="M 50,85 L 48,125 L 10,150" /> {/* รอยพับหางซ้าย */}
        <path d="M 52,125 L 50,135 L 48,125" /> {/* รอยตัดโคนหาง */}
      </g>

      {/* 3. คอร์พลังงานเรืองแสง (Glowing Magic Core) */}
      <circle
        cx="50"
        cy="55"
        r="7"
        fill={glowColor}
        opacity="0.6"
        filter="blur(3px)"
      />
    </svg>
  </motion.div>
);

// 1. Shark Preloader Screen
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const loadBubbles = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2,
        size: Math.random() * 4 + 2,
      })),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#02040A",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-20%",
          left: "0%",
          width: "100vw",
          height: "100vh",
          background:
            "radial-gradient(circle at 50% 0%, rgba(92, 122, 153, 0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {loadBubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.6, 0] }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: "rgba(176, 196, 222, 0.5)",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(176, 196, 222, 0.8)",
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
            initial={{ scale: 0.2, opacity: 0.6 }}
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
              border: "1px solid rgba(176, 196, 222, 0.4)",
              boxShadow: "inset 0 0 20px rgba(176, 196, 222, 0.1)",
            }}
          />
        ))}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          {/* ปรับขนาดกล่องให้พอดีกับ viewBox ใหม่ 100x150 */}
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
            <TopDownShark glowColor="#B0C4DE" delay={0} />
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
            <TopDownShark glowColor="#5C7A99" delay={1.5} />
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
            color: "#E0E6ED",
            mb: 2,
            textShadow: "0 0 25px rgba(92, 122, 153, 0.8)",
            fontFamily: "'Cinzel', serif",
            letterSpacing: 4,
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
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          "แหวกว่ายอย่างโดดเดี่ยว... ในห้วงลึกที่แสงสว่างส่องไม่ถึง"
        </Typography>
      </motion.div>
    </motion.div>
  );
};

// 2. Realistic Crystal Rain & Mist Atmosphere
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
        background: "#030102",
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
            "radial-gradient(ellipse at center, rgba(176, 196, 222, 0.1) 0%, transparent 60%)",
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
            border: "1px solid rgba(240, 248, 255, 0.2)",
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
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
    </Box>
  );
};

// 3. Luxury Card Wrapper
const LuxuryCard = ({ children, sx }) => (
  <Box
    sx={{
      position: "relative",
      borderRadius: "24px",
      background:
        "linear-gradient(145deg, rgba(255, 162, 183, 0.2) 0%, rgba(25, 10, 15, 0.6) 100%)",
      padding: "1px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
      ...sx,
    }}
  >
    <Box
      sx={{
        background:
          "linear-gradient(145deg, rgba(12, 4, 7, 0.95) 0%, rgba(5, 2, 3, 0.98) 100%)",
        backdropFilter: "blur(20px)",
        borderRadius: "23px",
        height: "100%",
        boxShadow: "inset 0 1px 0 rgba(255, 209, 220, 0.05)",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "10%",
          width: "80%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,162,183,0.3) 50%, transparent 100%)",
        }}
      />
      {children}
    </Box>
  </Box>
);

const GradientText = ({ children, sx, variant = "h6" }) => (
  <Typography
    variant={variant}
    sx={{
      background:
        "linear-gradient(90deg, #FFD1DC 0%, #FFA2B7 50%, #FF6B8B 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 2px 10px rgba(255, 162, 183, 0.2)",
      ...sx,
    }}
  >
    {children}
  </Typography>
);

// --- Data ---
const historyAccordions = [
  {
    title: "ปฐมบทแห่งความอัปยศ",
    content:
      "เคียวระ เกิดในตระกูล ฮิซาเมะ ตระกูลเก่าแก่ที่ยึดถือขนบธรรมเนียมอย่างเคร่งครัด พวกเขาภาคภูมิใจในสายเลือดที่เชื่อว่า 'บริสุทธิ์และไร้ที่ติ' ทว่าเบื้องหลังความสง่างามกลับซ่อนความลับอันมืดดำ ในอดีต ทวดของเคียวระเคยเป็น 'ผู้ถูกรับเลือก' ซึ่งนับเป็นความอัปยศสูงสุด เขาถูกขังลืมและปล่อยให้ตายอย่างทนทุกข์ทรมาน โดยที่ตระกูลสั่งปิดข่าวเงียบสนิท",
  },
  {
    title: "คำสาปและการจองจำ",
    content:
      "เมื่อเกิดมาความผิดปกติแรกเริ่มที่ปรากฏคือ ผิวหนังบริเวณคอและเอวแห้งสากปริแตก พ่อแม่มองลูกชายด้วยสายตาที่เต็มไปด้วยความขยะแขยงและปักใจเชื่อว่านี่คือ 'คำสาป' เขาถูกพร่ำสอนว่าตนเองคือความผิดพลาด ถูกบังคับให้เรียนหนัก ห้ามร้องไห้ และห้ามแสดงความอ่อนแอ หากก้าวพลาดจะถูกกักขังในห้องมืดมิดและเย็นชา",
  },
  {
    title: "ความลับใต้เงาดำ",
    content:
      "เขาเยียวยาจิตใจด้วยการพับโอริกามิจากเศษกระดาษและวาดภาพในความมืด เมื่อเวลาผ่านไป ผิวหนังกลายเป็นเหงือกปลาสีซีดสลด ฟันแหลมคมเรียงตัวซ้อนกัน และร่างกายแผ่ไอเย็นจางๆ ตลอดเวลา เขาถูกสั่งห้ามยิ้มและต้องสวมเสื้อคอเต่าแขนยาวเพื่อปกปิด ในวัย 9 ขวบ เขาพบเปียโนหลังเก่า และจะบรรเลงเฉพาะในวันที่ฝนตกหนักเพื่อกลบเสียงเปียโน",
  },
  {
    title: "การหลบหนีสู่ความหวัง",
    content:
      "ในวัย 14 ปี ร่างกายเข้าขั้นวิกฤต ใบหูเปลี่ยนรูป หางปลาใหญ่งอกออก ครีบยาวบางแผ่ขึ้น ตระกูลตัดสินใจกำจัดด้วยการส่งไปห้องขังเดียวกับทวด แต่ในคืนสุดท้ายเขาโกหกครั้งใหญ่ อ้างว่ามีหนังสือตอบรับจากสถาบันการแพทย์ลับที่จะรักษาเขาได้ พ่อกลัวเสียหน้าจึงอนุญาต โดยไม่มีใครรู้เลยว่าปลายทางคือ 'โรงเรียนเวทมนตร์'",
  },
];

const schoolAccordions = [
  {
    title: "กำแพงที่พังทลาย",
    content:
      "ในช่วงแรก เคียวระยังหวาดระแวงพยายามสวมเสื้อแขนยาวมิดชิดเพื่อปกปิด กลัวถูกมองเป็นตัวประหลาด แต่เมื่อเวลาผ่านไปเขาตระหนักว่าโรงเรียนนี้เต็มไปด้วยนักเรียนที่มีความผิดปกติในแบบของตัวเอง ความผิดปกติของเขาจึงไม่ได้แปลกแยกอย่างที่คิด จึงค่อยๆ เลิกหมกมุ่นกับการปกปิดร่างกาย",
  },
  {
    title: "การจัดระเบียบชีวิต",
    content:
      "เขาได้รับเงินสนับสนุนจากตระกูลสม่ำเสมอเพราะที่บ้านเข้าใจว่าเป็นค่ารักษา แต่เขาไม่ฟุ่มเฟือย มักใช้เงินกับของใช้คุณภาพ อุปกรณ์จัดระเบียบ หรือกระดาษโอริกามิ การอยู่หอพักเขาเจ้าระเบียบมาก หากรูมเมทไม่เป็นระเบียบ เขาจะ 'แบ่งเขตพื้นที่' ชัดเจน หากล้ำเขตจะปรายตามองอย่างเย็นชาแล้วจัดให้เรียบร้อยเองเงียบๆ",
  },
  {
    title: "อิสระยามวิกาล",
    content:
      "เขามีปัญหานอนไม่หลับ (Insomnia) มักตื่นกลางคืน หลังจากรูมเมทหลับจะเปิดไฟสลัวๆ พับกระดาษหรือวาดรูป หากรูมเมทขยับตัวจะรีบเก็บแสร้งทำเป็นอ่านหนังสือ บางคืนเขาจะออกไปห้องชมรมดนตรีเพื่อบรรเลงเปียโนในความมืด ซึ่งเป็นช่วงเวลาที่เขารู้สึกเป็นอิสระที่สุด",
  },
];

const normalMagic = [
  {
    n: "สรรค์สร้างเงา (Shadow Creation)",
    d: "ดึงเงาจากวัตถุหรือตัวเองมาปั้นเป็นรูปร่างชั่วคราว สีดำด้าน สลายเมื่อเสียสมดุล ต้องมีแหล่งกำเนิดเงา",
  },
  {
    n: "เคลื่อนที่ผ่านเงา (Shadow Step)",
    d: "จมหายเข้าไปในเงาหนึ่งและปรากฏออกจากอีกเงา ระยะ 3–6 ม. ใช้ต่อเนื่องจะเวียนหัว",
  },
  {
    n: "เย็บเงา (Shadow Stitch)",
    d: "สร้างเข็ม/ลิ่มจากเงา ปักลงบนเงาเป้าหมาย ทำให้ร่างจริงถูกตรึงกับพื้นคล้าย 'ผีอำ'",
  },
  {
    n: "เงาเลียนแบบ (Shadow Clone)",
    d: "สร้างร่างเงาเหมือนตัวเองช่วยทำงานบ้าน เรียกได้สูงสุด 3 ร่าง ใช้พลังเวทค่อนข้างมาก",
  },
  {
    n: "หนามเงา (Shadow Thorn)",
    d: "ควบแน่นเงาเป็นของแหลม แทงเป้าหมายรบกวนการไหลเวียนพลังเวท ทำให้ชาชั่วคราว",
  },
  {
    n: "โล่กลืนมนตรา (Mana Shield)",
    d: "บิดเงาขึ้นเป็นกำแพงป้องกัน กลืนพลังเวทที่โจมตีเข้ามา ป้องกันเวทได้ดีมาก",
  },
];

const personalityDetails = [
  {
    n: "ขี้อาย (ซ่อนรูป)",
    d: "ภายในรู้สึกประหม่าแต่ภายนอกพยายามรักษาสีหน้านิ่งเฉย พูดคุยสุภาพเป็นทางการเกินจำเป็นเพื่อเป็นกำแพงกั้น หลบไปอยู่มุมเงียบๆ เสมอ",
  },
  {
    n: "เจ้าระเบียบ (Perfectionist)",
    d: "ยึดติดความสมบูรณ์แบบ กฎระเบียบ ใช้ความเพียบพร้อมเป็นเกราะป้องกันไม่ให้ใครจับผิด",
  },
  {
    n: "หวาดระแวงการสัมผัส",
    d: "หากมีใครมาตบไหล่หรือกอดแบบไม่ทันตั้งตัว จะชะงัก ชักสีหน้ารังเกียจ หรือปัดมือทิ้งอย่างรวดเร็วจนดูเหมือนหยิ่งยโส",
  },
  {
    n: "โลกส่วนตัวสูง",
    d: "มีพื้นที่ลับที่แทบไม่มีใครเข้าถึง มักพับโอริกามิ วาดรูป หรือเล่นเปียโนตามลำพังเพื่อปลดปล่อยความรู้สึกโดยไม่ต้องปกปิด",
  },
  {
    n: "อ่อนโยน (ซึนเดเระ)",
    d: "ช่วยคนอื่นโดยบ่นว่า 'น่ารำคาญ' แต่ก็ช่วยจนเสร็จ โหยหาความเมตตา เป็นผู้ฟังที่ดีที่จำรายละเอียดคนอื่นได้แม่นยำ",
  },
  {
    n: "ชอบด้อยค่าตัวเอง",
    d: "มองตัวเองเป็นความผิดพลาด โทษตัวเองเสมอ แต่หากได้รับคำชมจะดีใจจนเก็บอาการไม่อยู่ หน้าและหูจะแดงจัด",
  },
  {
    n: "ชอบตัดสินคนอื่น",
    d: "เผลอตัดสินคนที่ไร้ระเบียบ ร่าเริงเกินไป ด้วยสายตาเย็นชา ลึกๆ มาจากความอิจฉาอิสระที่ตนไม่เคยมี",
  },
];

// --- Main Page Component ---
export default function KyoraProfile() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "body, html": {
            cursor: normalFishCursor,
            backgroundColor: "#030102",
          },
          "a, button, [role='button'], .MuiAccordionSummary-root": {
            cursor: pointerFishCursor,
          },
          "::-webkit-scrollbar": { width: "6px" },
          "::-webkit-scrollbar-track": { background: "transparent" },
          "::-webkit-scrollbar-thumb": {
            background: "rgba(255, 162, 183, 0.3)",
            borderRadius: "10px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "rgba(255, 162, 183, 0.6)",
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
          <AbyssalAtmosphere />
          <audio ref={audioRef} src="/Song.mp3" loop autoPlay />

          <IconButton
            onClick={toggleMusic}
            sx={{
              position: "fixed",
              bottom: 30,
              right: 30,
              background:
                "linear-gradient(135deg, rgba(25,10,15,0.9) 0%, rgba(5,2,4,0.95) 100%)",
              border: "1px solid",
              borderColor: isPlaying
                ? "primary.main"
                : "rgba(255, 162, 183, 0.2)",
              color: "primary.main",
              backdropFilter: "blur(10px)",
              boxShadow: isPlaying
                ? "0 0 20px rgba(255, 162, 183, 0.4)"
                : "0 5px 15px rgba(0,0,0,0.5)",
              zIndex: 999,
              p: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                borderColor: "secondary.main",
                color: "secondary.main",
              },
            }}
          >
            <motion.div
              animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
            >
              {isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}
            </motion.div>
          </IconButton>

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4, lg: 6 },
              maxWidth: 1200,
              mx: "auto",
            }}
          >
            {/* Header Hero */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <LuxuryCard sx={{ mb: 5 }}>
                <Box
                  sx={{
                    p: { xs: 4, md: 6 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 4, md: 6 },
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                      padding: 2,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "1px solid rgba(255, 162, 183, 0.1)",
                        borderTop: "2px solid #FFA2B7",
                        borderBottom: "2px solid #FFD1DC",
                        animation: "spin 20s linear infinite",
                        "@keyframes spin": {
                          "100%": { transform: "rotate(360deg)" },
                        },
                      }}
                    />
                    <Avatar
                      src="YOUR_KYORA_IMAGE_URL.jpg"
                      alt="Hisame Kyōra"
                      sx={{
                        width: { xs: 180, md: 240 },
                        height: { xs: 180, md: 240 },
                        border: "4px solid #030102",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "primary.main",
                        display: "block",
                        mb: 1,
                        opacity: 0.8,
                      }}
                    >
                      ✦ จิตวิญญาณแห่งธรรมชาติ ฤดูหนาว「道」 ✦
                    </Typography>
                    <GradientText
                      variant="h2"
                      sx={{ mb: 1, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
                    >
                      氷雨 響羅
                    </GradientText>
                    <Typography
                      variant="h4"
                      sx={{ color: "secondary.main", mb: 4, opacity: 0.9 }}
                    >
                      ฮิซาเมะ เคียวระ (Hisame Kyōra)
                    </Typography>

                    <Grid container spacing={2.5}>
                      {[
                        { label: "AGE", val: "18" },
                        { label: "BIRTHDAY", val: "12 / 06" },
                        { label: "GENDER", val: "ชาย" },
                        { label: "BLOOD TYPE", val: "A" },
                        { label: "W / H", val: "72 kg / 184 cm" },
                        { label: "CLASS", val: "มังไก / 3-B" },
                        { label: "DORM", val: "ฤดูหนาว" },
                        { label: "CLUB", val: "ดนตรีและประสานเสียง" },
                      ].map((info, idx) => (
                        <Grid item xs={6} sm={4} lg={3} key={idx}>
                          <Box
                            sx={{
                              pl: 1.5,
                              borderLeft: "2px solid rgba(255, 162, 183, 0.4)",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary",
                                letterSpacing: 1,
                                fontFamily: "'Cinzel', serif",
                              }}
                            >
                              {info.label}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "primary.main", fontWeight: 400 }}
                            >
                              {info.val}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            pl: 1.5,
                            borderLeft: "2px solid rgba(255, 209, 220, 0.4)",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              letterSpacing: 1,
                              fontFamily: "'Cinzel', serif",
                            }}
                          >
                            ROOMMATES
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "secondary.main", fontWeight: 400 }}
                          >
                            ฮิเมะมิยะ โคยูคิ / คากามิ ริคุ
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </LuxuryCard>
            </motion.div>

            <Grid container spacing={4}>
              <Grid item xs={12} lg={7}>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <LuxuryCard sx={{ mb: 4 }}>
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <MenuBookIcon
                          sx={{ color: "primary.main", fontSize: 28 }}
                        />
                        <GradientText variant="h5">
                          ประวัติความเป็นมา (Biography)
                        </GradientText>
                      </Box>
                      {historyAccordions.map((item, index) => (
                        <Accordion key={index}>
                          <AccordionSummary
                            expandIcon={
                              <AddIcon sx={{ color: "primary.main" }} />
                            }
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "primary.main" }}
                            >
                              {item.title}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                lineHeight: 2,
                                textIndent: "2em",
                              }}
                            >
                              {item.content}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Box>
                  </LuxuryCard>

                  <LuxuryCard sx={{ mb: 4 }}>
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <NightlightIcon
                          sx={{ color: "secondary.main", fontSize: 28 }}
                        />
                        <GradientText variant="h5">
                          ชีวิตในโรงเรียน (School Life)
                        </GradientText>
                      </Box>
                      {schoolAccordions.map((item, index) => (
                        <Accordion key={index}>
                          <AccordionSummary
                            expandIcon={
                              <AddIcon sx={{ color: "secondary.main" }} />
                            }
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "secondary.main" }}
                            >
                              {item.title}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                lineHeight: 2,
                                textIndent: "2em",
                              }}
                            >
                              {item.content}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Box>
                  </LuxuryCard>

                  <LuxuryCard sx={{ mb: 4 }}>
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <AutoAwesomeIcon
                          sx={{ color: "primary.main", fontSize: 28 }}
                        />
                        <GradientText variant="h5">
                          เวทมนตร์วิถีความมืด
                        </GradientText>
                      </Box>
                      <Grid container spacing={2}>
                        {normalMagic.map((magic, i) => (
                          <Grid item xs={12} sm={6} key={i}>
                            <Box
                              sx={{
                                p: 2.5,
                                height: "100%",
                                bgcolor: "rgba(255,162,183,0.03)",
                                border: "1px solid rgba(255, 162, 183, 0.1)",
                                borderRadius: "12px",
                                "&:hover": {
                                  borderColor: "primary.main",
                                  bgcolor: "rgba(255,162,183,0.08)",
                                  transition: "0.3s",
                                },
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{ color: "primary.main", mb: 1 }}
                              >
                                {magic.n}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  lineHeight: 1.7,
                                }}
                              >
                                {magic.d}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>

                      <Divider
                        sx={{ my: 4, borderColor: "rgba(255, 162, 183, 0.1)" }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <WarningIcon
                          sx={{ color: "error.main", fontSize: 26 }}
                        />
                        <Typography variant="h6" sx={{ color: "error.main" }}>
                          พลังซ่อนเร้น (Hidden Abilities)
                        </Typography>
                      </Box>
                      <Grid container spacing={2}>
                        {[
                          {
                            n: "ดึงเงา",
                            d: "ดึงเงาจากสิ่งมีชีวิตมาฟื้นฟูพลัง ลดความเหนื่อยล้า เป้าหมายจะรู้สึกหนาววูบ อ่อนแรง",
                          },
                          {
                            n: "กินเงา",
                            d: "กัดกินความเจ็บปวดจากผู้อื่น โดยกลืนกินเงานั้นเข้าไปบรรเทาอาการ แต่ผู้ใช้จะรับภาระแทน",
                          },
                          {
                            n: "ฝนเขี้ยวเงา",
                            d: "ควบแน่นเงาแตกตัวเป็นเขี้ยวหนามสีดำพุ่งลงมาราวกับฝน โจมตีวงกว้าง สร้างบาดแผลจริง",
                          },
                        ].map((magic, i) => (
                          <Grid item xs={12} key={i}>
                            <Box
                              sx={{
                                p: 2,
                                background:
                                  "linear-gradient(90deg, rgba(194, 24, 91, 0.1) 0%, transparent 100%)",
                                borderLeft: "3px solid",
                                borderColor: "error.main",
                                borderRadius: "0 12px 12px 0",
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{ color: "#FFF", mb: 0.5 }}
                              >
                                {magic.n}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  lineHeight: 1.7,
                                }}
                              >
                                {magic.d}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </LuxuryCard>
                </motion.div>
              </Grid>

              <Grid item xs={12} lg={5}>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <LuxuryCard sx={{ mb: 4 }}>
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <DiamondIcon
                          sx={{ color: "primary.main", fontSize: 26 }}
                        />
                        <GradientText variant="h6">
                          ลักษณะนิสัย (Personality)
                        </GradientText>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        {personalityDetails.map((trait, index) => (
                          <Box
                            key={index}
                            sx={{
                              p: 2,
                              bgcolor: "rgba(255,162,183,0.03)",
                              borderRadius: "12px",
                              border: "1px solid rgba(255,162,183,0.05)",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "primary.main", mb: 0.5 }}
                            >
                              {trait.n}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary", lineHeight: 1.7 }}
                            >
                              {trait.d}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </LuxuryCard>

                  <LuxuryCard sx={{ mb: 4 }}>
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <WaterDropIcon
                          sx={{ color: "info.main", fontSize: 26 }}
                        />
                        <Typography variant="h6" sx={{ color: "info.main" }}>
                          ความผิดปกติ (Anomalies)
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          mb: 4,
                        }}
                      >
                        {[
                          "ผิวหนังคอและเอวพัฒนาเป็นเหงือกปลา",
                          "ปากมีฟันแหลมคมหลายซี่แบบฉลาม",
                          "ร่างกายแผ่ไอเย็นจางๆ ตลอดเวลา",
                          "มีหางปลาขนาดใหญ่และครีบยาวบาง",
                        ].map((item, i) => (
                          <Box
                            key={i}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              p: 1.5,
                              background: "rgba(229,169,180,0.05)",
                              borderRadius: "8px",
                            }}
                          >
                            <Box
                              sx={{
                                minWidth: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: "info.main",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "primary.main" }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <HealingIcon
                          sx={{ color: "secondary.main", fontSize: 26 }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: "secondary.main" }}
                        >
                          โรคประจำตัว
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "rgba(255, 209, 220, 0.05)",
                          border: "1px solid rgba(255, 209, 220, 0.2)",
                          borderRadius: "12px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "secondary.main", mb: 1 }}
                        >
                          Insomnia (ภาวะนอนไม่หลับ)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", lineHeight: 1.6 }}
                        >
                          ไม่ได้เกิดจากร่างกายเพียงอย่างเดียว
                          แต่เป็นผลรวมของความเครียดและสภาพแวดล้อมที่กดดันตั้งแต่วัยเด็ก
                        </Typography>
                      </Box>
                    </Box>
                  </LuxuryCard>

                  <LuxuryCard sx={{ mb: 4 }}>
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 3,
                          textAlign: "center",
                        }}
                      >
                        รสนิยม (Preferences)
                      </Typography>

                      <Typography
                        variant="overline"
                        sx={{
                          color: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <FavoriteIcon fontSize="small" /> Likes
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 4,
                        }}
                      >
                        {[
                          "เสียงฝนตกหนัก",
                          "พื้นที่สลัว",
                          "ความเป็นระเบียบ",
                          "ดนตรีเปียโน",
                          "กลิ่นน้ำเค็ม",
                          "ขนมวากาชิ",
                          "ของน่ารัก",
                        ].map((item, i) => (
                          <Chip
                            key={i}
                            label={item}
                            sx={{
                              bgcolor: "rgba(255, 162, 183, 0.08)",
                              color: "primary.main",
                              border: "1px solid rgba(255, 162, 183, 0.2)",
                            }}
                          />
                        ))}
                      </Box>

                      <Typography
                        variant="overline"
                        sx={{
                          color: "secondary.main",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <MoodBadIcon fontSize="small" /> Dislikes & Fears
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {[
                          "การเป็นจุดสนใจ",
                          "คนไร้ระเบียบ",
                          "ถูกสัมผัสตัว",
                          "สูญเสียการควบคุม",
                          "ถูกครอบครัวจับได้",
                        ].map((item, i) => (
                          <Chip
                            key={i}
                            label={item}
                            sx={{
                              bgcolor: "rgba(255, 209, 220, 0.08)",
                              color: "secondary.main",
                              border: "1px solid rgba(255, 209, 220, 0.2)",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </LuxuryCard>

                  <LuxuryCard>
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <InfoIcon
                          sx={{ color: "primary.main", fontSize: 26 }}
                        />
                        <GradientText variant="h6">
                          เกร็ดเล็กเกร็ดน้อย (Trivia)
                        </GradientText>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        {[
                          "มีฟันฉลามแหลมคม และมักจะเผลอกัดริมฝีปากตัวเองจนเลือดซึมเวลาใช้ความคิด",
                          "ร่างกายแผ่ไอเย็นจางๆ ในช่วงหน้าร้อนมักเป็นที่ชื่นชอบของเพื่อนๆ",
                          "แอบกินวากาชิพรีเมียมตอนดึก บรรจงตักด้วยท่าทางสง่างามแบบคุณชาย",
                          "เมื่อนอนไม่หลับ จะหอบผ้าห่มไปขดตัวในตู้เสื้อผ้าแล้วใช้ 'อาณาเขตเงา' คลุมตัวเองให้รู้สึกปลอดภัย",
                          "ในที่มืด ดวงตาจะสะท้อนแสงวาววับเหมือนตาสัตว์",
                          "หูและเหงือกปลาไวต่อความชื้น สามารถพยากรณ์ล่วงหน้าว่าฝนจะตกได้",
                          "เมื่อเจอของน่ารัก ตาจะเปล่งประกาย ก่อนรีบทำหน้าตาย ถ้าถูกจับได้หูและคอจะแดงจัด",
                          "เวลาดีใจมากๆ หางปลาจะเผลอกระดิกไปมาโดยไม่รู้ตัว",
                        ].map((item, i) => (
                          <Box
                            key={i}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1.5,
                              p: 1,
                              borderBottom: "1px dashed rgba(255,162,183,0.1)",
                            }}
                          >
                            <Box
                              sx={{
                                mt: 1,
                                minWidth: 4,
                                height: 4,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary", lineHeight: 1.6 }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </LuxuryCard>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      )}
    </ThemeProvider>
  );
}
