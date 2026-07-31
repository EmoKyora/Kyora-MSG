import React, { useState, useRef, useMemo } from "react";
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
  Collapse,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  GlobalStyles,
} from "@mui/material";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

// --- Custom Fish Cursors (Pink Theme) ---
const normalFishCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M6.5 4.5C9 3 13 4 16.5 7.5C20 11 21 15 19.5 17.5C18 20 14 18.5 11.5 15.5C9 12.5 4 8 6.5 4.5Z' fill='%23FFD1DC' stroke='%23FFA2B7' stroke-width='1'/><path d='M6.5 4.5L1.5 1L4 7Z' fill='%23FFA2B7'/></svg>") 4 4, auto`;
const pointerFishCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M6.5 4.5C9 3 13 4 16.5 7.5C20 11 21 15 19.5 17.5C18 20 14 18.5 11.5 15.5C9 12.5 4 8 6.5 4.5Z' fill='%23FFA2B7' stroke='%23FF6B8B' stroke-width='1'/><path d='M6.5 4.5L1.5 1L4 7Z' fill='%23FF6B8B'/></svg>") 4 4, pointer`;

// --- Theme Setup (Obsidian & Rose Diamond) ---
const theme = createTheme({
  typography: {
    fontFamily: "'Prompt', sans-serif",
    h1: { fontFamily: "'Cinzel', 'Playfair Display', serif", fontWeight: 700 },
    h2: { fontFamily: "'Cinzel', 'Playfair Display', serif", fontWeight: 700 },
    h3: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
    h4: { fontFamily: "'Playfair Display', serif", fontStyle: "italic" },
    h6: {
      fontFamily: "'Cinzel', 'Playfair Display', serif",
      fontWeight: 600,
      letterSpacing: 1.5,
    },
    body1: { fontFamily: "'Prompt', sans-serif", fontWeight: 400 },
    body2: { fontFamily: "'Prompt', sans-serif", fontWeight: 300 },
    overline: {
      fontFamily: "'Cinzel', 'Playfair Display', serif",
      letterSpacing: 3,
    },
  },
  palette: {
    mode: "dark",
    background: { default: "#050103" }, // สีดำสนิทอมชมพูเข้ม
    primary: { main: "#FFA2B7" }, // สีชมพูหลักของคุณ
    secondary: { main: "#FFD1DC" }, // สีชมพูอ่อนแชมเปญ
    info: { main: "#E5A9B4" }, // สีโรสโกลด์หม่น
    error: { main: "#C2185B" }, // สีแดงอมม่วงเข้ม (สำหรับเวทซ่อนเร้น)
    text: { primary: "#FFF0F5", secondary: "#D3C4C9" }, // ข้อความสีขาวอมชมพู เพื่อไม่ให้จืด
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(25, 10, 15, 0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 162, 183, 0.15)",
          borderRadius: "16px !important",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          marginBottom: "12px",
          "&:before": { display: "none" },
          "&:hover": { borderColor: "rgba(255, 162, 183, 0.5)" },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { padding: "0 24px", minHeight: "64px" },
        content: { margin: "16px 0" },
      },
    },
  },
});

// --- Components ---

// 1. Dual Particle System (Pink Rain)
const AbyssalAtmosphere = () => {
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: `rain-${i}`,
        left: `${Math.random() * 100}vw`,
        duration: Math.random() * 1.5 + 1.5,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [],
  );
  const bubbles = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: `bubble-${i}`,
        left: `${Math.random() * 100}vw`,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        size: Math.random() * 4 + 2,
        isPink: Math.random() > 0.5,
      })),
    [],
  );

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        background: "radial-gradient(ellipse at top, #14050A 0%, #030102 80%)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(circle, rgba(255, 162, 183, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle, rgba(255, 107, 139, 0.03) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      {rainDrops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: "-10vh" }}
          animate={{ y: "110vh" }}
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
            height: "12vh",
            background: `linear-gradient(to bottom, transparent, rgba(255, 162, 183, ${drop.opacity}))`,
          }}
        />
      ))}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{
            y: "-10vh",
            x: [0, -20, 20, -10, 10, 0],
            opacity: [0, 0.6, 0.8, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            borderRadius: "50%",
            background: bubble.isPink
              ? "rgba(255, 162, 183, 0.6)"
              : "rgba(255, 209, 220, 0.4)",
            boxShadow: bubble.isPink
              ? "0 0 10px rgba(255, 162, 183, 0.8)"
              : "0 0 10px rgba(255, 209, 220, 0.5)",
          }}
        />
      ))}
    </Box>
  );
};

// 2. Luxury Gradient Obsidian Card (Pink Tone)
const LuxuryCard = ({ children, sx }) => (
  <Box
    sx={{
      position: "relative",
      borderRadius: "24px",
      background: "linear-gradient(145deg, rgba(255, 162, 183, 0.15) 0%, rgba(25, 10, 15, 0.5) 100%)",
      padding: "1px", // Thin elegant border
      boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": { transform: "translateY(-4px)" },
      ...sx,
    }}
  >
    <Box
      sx={{
        background: "linear-gradient(145deg, rgba(15, 5, 8, 0.85) 0%, rgba(5, 2, 3, 0.95) 100%)",
        backdropFilter: "blur(24px)", // เบลอเยอะขึ้นให้ดูแพง
        borderRadius: "23px",
        height: "100%",
        boxShadow: "inset 0 1px 0 rgba(255, 209, 220, 0.1)", // ไฮไลท์ขอบบนนิดๆ
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Subtle Glow at top */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "20%",
          width: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,162,183,0.5) 50%, transparent 100%)",
        }}
      />
      {children}
    </Box>
  </Box>
);

// 3. Glowing Gradient Text (Pink Gold)
const GradientText = ({ children, sx, variant = "h6" }) => (
  <Typography
    variant={variant}
    sx={{
      background:
        "linear-gradient(90deg, #FFD1DC 0%, #FFA2B7 50%, #FF6B8B 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 2px 10px rgba(255, 162, 183, 0.3)",
      ...sx,
    }}
  >
    {children}
  </Typography>
);

// --- Data Preparation for Accordions ---
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
  {
    n: "อคติทางเพศ",
    d: "ผลจากการปลูกฝังของตระกูล ทำให้มองความหลากหลายทางเพศว่าผิดธรรมชาติ ลึกๆ เกิดจากการเกลียด 'ความผิดปกติ' ของตนเอง",
  },
];

// --- Main Page Component ---
export default function KyoraProfile() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Global Style overrides for Custom Cursor & Scrollbar */}
      <GlobalStyles
        styles={{
          "body, html": { cursor: normalFishCursor },
          "a, button, [role='button'], .MuiAccordionSummary-root": {
            cursor: pointerFishCursor,
          },
          "::-webkit-scrollbar": { width: "8px" },
          "::-webkit-scrollbar-track": { background: "#050103" },
          "::-webkit-scrollbar-thumb": {
            background:
              "linear-gradient(180deg, #FFA2B7 0%, #FFD1DC 50%, #FF6B8B 100%)",
            borderRadius: "10px",
            border: "2px solid #050103",
          },
          "::-webkit-scrollbar-thumb:hover": { background: "#FF6B8B" },
        }}
      />

      <AbyssalAtmosphere />
      <audio ref={audioRef} src="YOUR_MUSIC_FILE.mp3" loop />

      {/* Floating Music Button */}
      <IconButton
        onClick={toggleMusic}
        sx={{
          position: "fixed",
          bottom: 40,
          right: 40,
          background:
            "linear-gradient(135deg, rgba(25,10,15,0.8) 0%, rgba(5,2,4,0.9) 100%)",
          border: "1px solid",
          borderColor: isPlaying ? "primary.main" : "rgba(255, 162, 183, 0.3)",
          color: "primary.main",
          backdropFilter: "blur(15px)",
          boxShadow: isPlaying
            ? "0 0 25px rgba(255, 162, 183, 0.6)"
            : "0 5px 15px rgba(0,0,0,0.8)",
          zIndex: 999,
          p: 2,
          transition: "all 0.4s ease",
          "&:hover": {
            transform: "rotate(15deg) scale(1.1)",
            borderColor: "secondary.main",
            color: "secondary.main",
          },
        }}
      >
        <motion.div
          animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
        >
          {isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}
        </motion.div>
      </IconButton>

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4, lg: 8 },
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* Profile Hero Header */}
        <Box sx={{ mb: 6 }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <LuxuryCard>
              <Box
                sx={{
                  p: { xs: 4, md: 6 },
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 4, md: 8 },
                  alignItems: "center",
                }}
              >
                {/* Avatar with Aristocratic Glow */}
<Box sx={{ position: "relative", display: "inline-flex", padding: 2 }}>
  {/* Outer Ring - Slow Rotation */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      border: "1px solid rgba(255, 162, 183, 0.2)",
      borderTop: "2px solid #FFA2B7",
      borderBottom: "2px solid #FFD1DC",
      animation: "spin 30s linear infinite", // หมุนช้าลงให้ดูสง่างาม
      "@keyframes spin": { "100%": { transform: "rotate(360deg)" } },
    }}
  />
  {/* Inner Ring - Static Elegant Border */}
  <Box
    sx={{
      position: "absolute",
      inset: 8,
      borderRadius: "50%",
      border: "1px dashed rgba(255, 209, 220, 0.4)",
    }}
  />
  <Avatar
    src="YOUR_KYORA_IMAGE_URL.jpg"
    alt="Hisame Kyōra"
    sx={{
      width: { xs: 200, md: 260 },
      height: { xs: 200, md: 260 },
      border: "4px solid #14050A", // สีขอบดำสนิทตัดกับภาพ
      boxShadow: "0 15px 35px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)",
      position: "relative",
      zIndex: 2,
    }}
  />
</Box>

                {/* Info Text */}
                <Box
                  sx={{
                    flex: 1,
                    textAlign: { xs: "center", md: "left" },
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      display: "block",
                      mb: 0.5,
                      textShadow: "0 0 15px rgba(255,162,183,0.6)",
                    }}
                  >
                    ✦ จิตวิญญาณแห่งธรรมชาติ ฤดูหนาว「道」 ✦
                  </Typography>
                  <GradientText
                    variant="h2"
                    sx={{ mb: 1, fontSize: { xs: "2.5rem", md: "3.8rem" } }}
                  >
                    氷雨 響羅
                  </GradientText>
                  <Typography
                    variant="h4"
                    sx={{ color: "secondary.main", mb: 4, opacity: 0.9 }}
                  >
                    ฮิซาเมะ เคียวระ (Hisame Kyōra)
                  </Typography>

                  <Grid container spacing={3}>
                    {[
                      { label: "AGE", val: "18" },
                      { label: "BIRTHDAY", val: "12 / 06" },
                      { label: "GENDER", val: "ชาย" },
                      { label: "BLOOD TYPE", val: "A" },
                      { label: "NATIONALITY", val: "ญี่ปุ่น" },
                      { label: "W / H", val: "72 kg / 184 cm" },
                      { label: "CLASS", val: "มังไก / 3-B" },
                      { label: "STUDENT ID", val: "00000" },
                      { label: "DORM", val: "ฤดูหนาว" },
                      { label: "CLUB", val: "ดนตรีและประสานเสียง" },
                    ].map((info, idx) => (
                      <Grid item xs={6} sm={4} lg={3} key={idx}>
                        <Box
                          sx={{
                            position: "relative",
                            pl: 1.5,
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: "10%",
                              height: "80%",
                              width: "2px",
                              background:
                                "linear-gradient(180deg, #FFA2B7 0%, transparent 100%)",
                            },
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              letterSpacing: 1.5,
                              fontFamily: "'Cinzel', serif",
                            }}
                          >
                            {info.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "primary.main", fontWeight: 500 }}
                          >
                            {info.val}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          position: "relative",
                          pl: 1.5,
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "10%",
                            height: "80%",
                            width: "2px",
                            background:
                              "linear-gradient(180deg, #FFD1DC 0%, transparent 100%)",
                          },
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            letterSpacing: 1.5,
                            fontFamily: "'Cinzel', serif",
                          }}
                        >
                          ROOMMATES
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "secondary.main", fontWeight: 500 }}
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
        </Box>

        <Grid container spacing={4}>
          {/* ================= LEFT COLUMN ================= */}
          <Grid item xs={12} lg={7}>
            {/* History Accordions */}
            <LuxuryCard sx={{ mb: 4 }}>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
                >
                  <MenuBookIcon sx={{ color: "primary.main", fontSize: 28 }} />
                  <GradientText variant="h5">
                    ประวัติความเป็นมา (Biography)
                  </GradientText>
                </Box>
                {historyAccordions.map((item, index) => (
                  <Accordion key={index} disableGutters>
                    <AccordionSummary
                      expandIcon={<AddIcon sx={{ color: "primary.main" }} />}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "primary.main", fontWeight: 600 }}
                      >
                        {item.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        borderTop: "1px solid rgba(255,162,183,0.1)",
                        pt: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 2.2,
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

            {/* School Life Accordions */}
            <LuxuryCard sx={{ mb: 4 }}>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
                >
                  <NightlightIcon
                    sx={{ color: "secondary.main", fontSize: 28 }}
                  />
                  <GradientText variant="h5">
                    ชีวิตในโรงเรียน (School Life)
                  </GradientText>
                </Box>
                {schoolAccordions.map((item, index) => (
                  <Accordion key={index} disableGutters>
                    <AccordionSummary
                      expandIcon={<AddIcon sx={{ color: "secondary.main" }} />}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "secondary.main", fontWeight: 600 }}
                      >
                        {item.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        borderTop: "1px solid rgba(255,162,183,0.1)",
                        pt: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 2.2,
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

            {/* Magic Grid */}
            <LuxuryCard sx={{ mb: 4 }}>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
                >
                  <AutoAwesomeIcon
                    sx={{ color: "primary.main", fontSize: 28 }}
                  />
                  <GradientText variant="h5">
                    เวทมนตร์วิถีความมืด (Darkness Path)
                  </GradientText>
                </Box>
                <Grid container spacing={3}>
                  {normalMagic.map((magic, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box
                        sx={{
                          p: 3,
                          height: "100%",
                          background:
                            "linear-gradient(135deg, rgba(255,162,183,0.05) 0%, rgba(0,0,0,0.4) 100%)",
                          border: "1px solid rgba(255, 162, 183, 0.2)",
                          borderRadius: "16px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "primary.main",
                            boxShadow: "0 10px 30px rgba(255, 162, 183, 0.15)",
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "primary.main", mb: 1, fontWeight: 600 }}
                        >
                          {magic.n}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", lineHeight: 1.8 }}
                        >
                          {magic.d}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Divider
                  sx={{ my: 4, borderColor: "rgba(255, 162, 183, 0.15)" }}
                />

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <WarningIcon sx={{ color: "error.main", fontSize: 26 }} />
                  <Typography variant="h6" sx={{ color: "error.main" }}>
                    พลังซ่อนเร้น (Hidden Abilities)
                  </Typography>
                </Box>
                <Grid container spacing={3}>
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
                          p: 2.5,
                          background:
                            "linear-gradient(90deg, rgba(194, 24, 91, 0.15) 0%, transparent 100%)",
                          borderLeft: "3px solid",
                          borderColor: "error.main",
                          borderRadius: "0 16px 16px 0",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#FFF", mb: 0.5, fontWeight: 600 }}
                        >
                          {magic.n}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", lineHeight: 1.7 }}
                        >
                          {magic.d}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </LuxuryCard>
          </Grid>

          {/* ================= RIGHT COLUMN ================= */}
          <Grid item xs={12} lg={5}>
            {/* Personality (Accordions) */}
            <LuxuryCard sx={{ mb: 4 }}>
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <DiamondIcon sx={{ color: "primary.main", fontSize: 26 }} />
                  <GradientText variant="h6">
                    ลักษณะนิสัย (Personality)
                  </GradientText>
                </Box>
                {personalityDetails.map((trait, index) => (
                  <Accordion
                    key={index}
                    disableGutters
                    sx={{ backgroundColor: "rgba(255,162,183,0.03)" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon sx={{ color: "primary.main" }} />
                      }
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "primary.main", fontWeight: 600 }}
                      >
                        {trait.n}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.8 }}
                      >
                        {trait.d}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </LuxuryCard>

            {/* Anomalies & Disease */}
            <LuxuryCard sx={{ mb: 4 }}>
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <WaterDropIcon sx={{ color: "info.main", fontSize: 26 }} />
                  <Typography variant="h6" sx={{ color: "info.main" }}>
                    ความผิดปกติ (Anomalies)
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
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
                        borderRadius: "12px",
                        border: "1px solid rgba(229,169,180,0.1)",
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "info.main",
                          boxShadow: "0 0 10px #E5A9B4",
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
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <HealingIcon sx={{ color: "secondary.main", fontSize: 26 }} />
                  <Typography variant="h6" sx={{ color: "secondary.main" }}>
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

            {/* Preferences (Glossy Chips) */}
            <LuxuryCard sx={{ mb: 4 }}>
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h6"
                  sx={{ color: "primary.main", mb: 3, textAlign: "center" }}
                >
                  Preferences (รสนิยม)
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} lg={12} xl={6}>
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
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
                            bgcolor: "rgba(255, 162, 183, 0.1)",
                            color: "primary.main",
                            border: "1px solid rgba(255, 162, 183, 0.3)",
                            borderRadius: "8px",
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "#000",
                              boxShadow: "0 0 10px #FFA2B7",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={12} xl={6}>
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
                            bgcolor: "rgba(255, 209, 220, 0.1)",
                            color: "secondary.main",
                            border: "1px solid rgba(255, 209, 220, 0.3)",
                            borderRadius: "8px",
                            "&:hover": {
                              bgcolor: "secondary.main",
                              color: "#000",
                              boxShadow: "0 0 10px #FFD1DC",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </LuxuryCard>

            {/* Trivia */}
            <LuxuryCard>
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <InfoIcon sx={{ color: "primary.main", fontSize: 26 }} />
                  <GradientText variant="h6">
                    เกร็ดเล็กเกร็ดน้อย (Trivia)
                  </GradientText>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    "มีฟันฉลามแหลมคม และมักจะเผลอกัดริมฝีปากตัวเองจนเลือดซึมเวลาใช้ความคิด",
                    "ร่างกายแผ่ไอเย็นจางๆ ในช่วงหน้าร้อนมักเป็นที่ชื่นชอบของเพื่อนๆ",
                    "แอบกินวากาชิพรีเมียมตอนดึก บรรจงตักด้วยท่าทางสง่างามแบบคุณชาย",
                    "เมื่อนอนไม่หลับ จะหอบผ้าห่มไปขดตัวในตู้เสื้อผ้าแล้วใช้ 'อาณาเขตเงา' คลุมตัวเองให้รู้สึกปลอดภัย",
                    "ในที่มืด ดวงตาจะสะท้อนแสงวาววับเหมือนตาสัตว์",
                    "หูและเหงือกปลาไวต่อความชื้น สามารถพยากรณ์ล่วงหน้าว่าฝนจะตกได้",
                    "มีพฤติกรรมย้ำคิดย้ำทำ (OCD เล็กๆ) คอยเช็คเครื่องราง 'ฮามากุริ' ตลอดเวลา",
                    "เมื่อเจอของน่ารัก ตาจะเปล่งประกาย ก่อนรีบทำหน้าตาย ถ้าถูกจับได้หูและคอจะแดงจัด",
                    "เวลาดีใจมากๆ หางปลาจะเผลอกระดิกไปมาโดยไม่รู้ตัว",
                  ].map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                        p: 1.5,
                        bgcolor: "rgba(255,255,255,0.02)",
                        borderRadius: "12px",
                      }}
                    >
                      <Box
                        sx={{
                          mt: 1,
                          minWidth: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          boxShadow: "0 0 5px #FFA2B7",
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
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
