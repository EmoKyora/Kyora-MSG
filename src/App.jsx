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
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealingIcon from "@mui/icons-material/Healing";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ShieldIcon from "@mui/icons-material/Shield";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PianoIcon from "@mui/icons-material/Piano";

const normalCraneCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23C5FF75' /%3E%3Cstop offset='100%25' stop-color='%23FF9EE2' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='rgba(197,255,117,0.08)' stroke='url(%23grad3)' stroke-width='4' stroke-linejoin='round' stroke-linecap='round' filter='drop-shadow(0px 0px 4px rgba(197,255,117,0.4))'%3E%3Cpolygon points='40,65 35,25 15,40 28,40' /%3E%3Cpolygon points='40,65 10,55 52,50' /%3E%3Cpolygon points='52,50 75,15 60,70' /%3E%3Cpolygon points='60,70 90,75 52,50' /%3E%3Cpolygon points='40,65 48,85 60,70 52,50' /%3E%3Cline x1='48' y1='85' x2='52' y2='50' /%3E%3C/g%3E%3C/svg%3E") 4 12, auto`;


const pointerCraneCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%239ACD32' /%3E%3Cstop offset='100%25' stop-color='%23FF1493' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='rgba(154,205,50,0.1)' stroke='url(%23grad4)' stroke-width='4.5' stroke-linejoin='round' stroke-linecap='round' filter='drop-shadow(0px 0px 5px rgba(154,205,50,0.45))'%3E%3Cpolygon points='40,65 35,25 15,40 28,40' /%3E%3Cpolygon points='40,65 15,45 52,50' /%3E%3Cpolygon points='52,50 85,25 60,70' /%3E%3Cpolygon points='60,70 90,75 52,50' /%3E%3Cpolygon points='40,65 48,85 60,70 52,50' /%3E%3Cline x1='48' y1='85' x2='52' y2='50' /%3E%3C/g%3E%3C/svg%3E") 4 12, pointer`;

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
    },
    overline: {
      fontFamily: "'Cinzel', 'Playfair Display', serif",
      letterSpacing: 3,
    },
  },
  palette: {
    mode: "dark",
    background: { default: "#040914" }, // สีน้ำเงินเข้มจัดเกือบดำ (Abyss)
    primary: { main: "#B3C6D6" }, // สีเงินประกายฟ้า (Icy Silver)
    secondary: { main: "#5C748A" }, // สีเทาอมฟ้า (Steel Blue)
    info: { main: "#708A9E" }, // สีฟ้าน้ำทะเลลึก
    error: { main: "#7A2A3B" }, // แดงเข้มหม่นๆ (Dark Crimson)
    text: { primary: "#EAEFF5", secondary: "#8A9BB0" }, // ขาวน้ำแข็ง และ เทาเย็น
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

const AbyssalAtmosphere = () => {
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: `rain-${i}`,
        left: `${Math.random() * 100}vw`,
        duration: Math.random() * 0.5 + 0.8,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.2 + 0.05,
        height: `${Math.random() * 15 + 10}vh`,
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
        background: "#040914",
      }}
    >
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
            background: `linear-gradient(to bottom, transparent, rgba(179, 198, 214, ${drop.opacity}))`,
          }}
        />
      ))}
    </Box>
  );
};

const LuxuryCard = ({ children, sx }) => (
  <Box
    sx={{
      borderRadius: "8px",
      background: "rgba(10, 15, 25, 0.6)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(179, 198, 214, 0.1)",
      borderTop: "1px solid rgba(179, 198, 214, 0.2)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
      overflow: "hidden",
      ...sx,
    }}
  >
    {children}
  </Box>
);

const GlassCard = ({ children, sx, hoverEffect = false }) => (
  <Box
    sx={{
      background: "rgba(15, 22, 35, 0.4)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(179, 198, 214, 0.05)",
      borderRadius: "6px",
      p: 3,
      transition: "all 0.3s ease",
      ...(hoverEffect && {
        "&:hover": {
          background: "rgba(22, 32, 50, 0.6)",
          border: "1px solid rgba(179, 198, 214, 0.15)",
        },
      }),
      ...sx,
    }}
  >
    {children}
  </Box>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <Box
    sx={{ mb: 3, borderBottom: "1px solid rgba(179, 198, 214, 0.05)", pb: 2 }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Icon sx={{ color: "primary.main", fontSize: 22 }} />
      <Typography variant="h6" sx={{ color: "#EAEFF5" }}>
        {title}
      </Typography>
    </Box>
    {subtitle && (
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          letterSpacing: 1,
          textTransform: "uppercase",
          ml: 4.2,
          mt: 0.5,
          display: "block",
        }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

const MetallicText = ({ children, sx, variant = "h6" }) => (
  <Typography
    variant={variant}
    sx={{
      background: "linear-gradient(180deg, #FFFFFF 0%, #8A9BB0 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
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
            backgroundColor: "#040914",
          },
          "a, button, [role='button'], .MuiTab-root, .MuiIconButton-root, .MuiButtonBase-root":
            { cursor: `${pointerCraneCursor} !important` },
          "::-webkit-scrollbar": { width: "4px" },
          "::-webkit-scrollbar-track": { background: "transparent" },
          "::-webkit-scrollbar-thumb": {
            background: "rgba(179, 198, 214, 0.15)",
            borderRadius: "10px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "rgba(179, 198, 214, 0.3)",
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

          <Box sx={{ position: "fixed", bottom: 30, right: 30, zIndex: 999 }}>
                <AnimatePresence>
              {isPlaying && (
                <Box
                  component={motion.div}
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0px 0px rgba(255, 162, 183, 0)",
                      "0 0 20px 10px rgba(255, 162, 183, 0.4)",
                      "0 0 0px 0px rgba(255, 162, 183, 0)",
                    ],
                  }}
                  transition={{
                    duration: 1.2,
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
                background: "rgba(10, 15, 25, 0.8)",
                border: "1px solid",
                borderColor: "rgba(179, 198, 214, 0.15)",
                color: isPlaying ? "primary.main" : "text.secondary",
                backdropFilter: "blur(10px)",
                p: 2,
                transition: "all 0.3s ease",
                "&:hover": { background: "rgba(179, 198, 214, 0.1)" },
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
              maxWidth: 1280,
              mx: "auto",
            }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <LuxuryCard sx={{ mb: 6 }}>
                <Box sx={{ p: { xs: 4, md: 6 } }}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-flex",
                          padding: 1,
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            border: "1px solid rgba(179, 198, 214, 0.05)",
                            borderTop: "1px solid #B3C6D6",
                            borderBottom: "1px solid #B3C6D6",
                            opacity: 0.5,
                          }}
                        />
                        <Avatar
                          src="YOUR_KYORA_IMAGE_URL.jpg"
                          alt="Hisame Kyōra"
                          sx={{
                            width: { xs: 160, sm: 200 },
                            height: { xs: 160, sm: 200 },
                            border: "4px solid #040914",
                            filter: "grayscale(30%) contrast(1.1)",
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "text.secondary",
                          display: "block",
                          mb: 1,
                        }}
                      >
                        ✦ จิตวิญญาณแห่งธรรมชาติ ฤดูหนาว「道」 ✦
                      </Typography>
                      <MetallicText
                        variant="h2"
                        sx={{ mb: 1, fontSize: { xs: "2.2rem", md: "3rem" } }}
                      >
                        氷雨 響羅
                      </MetallicText>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "primary.main",
                          mb: 4,
                          opacity: 0.9,
                          fontSize: "1.2rem",
                        }}
                      >
                        ฮิซาเมะ เคียวระ (Hisame Kyōra)
                      </Typography>

                      <Divider
                        sx={{ mb: 4, borderColor: "rgba(179, 198, 214, 0.1)" }}
                      />

                      <Grid container spacing={2}>
                        {[
                          { label: "AGE", val: "18" },
                          { label: "BIRTHDAY", val: "12 / 06" },
                          { label: "GENDER", val: "ชาย" },
                          { label: "BLOOD", val: "A" },
                          { label: "HEIGHT", val: "184 cm" },
                          { label: "WEIGHT", val: "72 kg" },
                          { label: "CLASS", val: "มังไก / 3-B" },
                          { label: "DORM", val: "ฤดูหนาว" },
                          { label: "CLUB", val: "ดนตรีและประสานเสียง" },
                        ].map((info, idx) => (
                          <Grid item xs={6} sm={4} key={idx}>
                            <Box
                              sx={{
                                pl: 1.5,
                                borderLeft:
                                  "2px solid rgba(179, 198, 214, 0.15)",
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  fontFamily: "'Cinzel', serif",
                                }}
                              >
                                {info.label}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#EAEFF5" }}
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

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              <Box sx={{ width: { xs: "100%", md: "240px" }, flexShrink: 0 }}>
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
                      width: { md: "2px" },
                      height: { xs: "2px" },
                    },
                    "& .MuiTab-root": {
                      color: "text.secondary",
                      alignItems: { md: "flex-start" },
                      textAlign: "left",
                      py: 2,
                      px: 3,
                      transition: "all 0.3s",
                      borderBottom: {
                        xs: "1px solid rgba(179, 198, 214, 0.05)",
                        md: "none",
                      },
                      "&.Mui-selected": {
                        color: "primary.main",
                        background: "rgba(179, 198, 214, 0.04)",
                      },
                    },
                  }}
                >
                  <Tab
                    icon={<LocalHospitalIcon sx={{ mr: { md: 1.5 } }} />}
                    label="ความผิดปกติ & สุขภาพ"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<MenuBookIcon sx={{ mr: { md: 1.5 } }} />}
                    label="ประวัติความเป็นมา"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<AutoAwesomeIcon sx={{ mr: { md: 1.5 } }} />}
                    label="เวทมนตร์ & ทักษะ"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<PsychologyIcon sx={{ mr: { md: 1.5 } }} />}
                    label="ลักษณะนิสัย"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<FavoriteIcon sx={{ mr: { md: 1.5 } }} />}
                    label="ความชอบ & ความกลัว"
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <AnimatePresence mode="wait">
                  {activeTab === 0 && (
                    <motion.div
                      key="tab0"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <GlassCard>
                            <SectionHeader
                              icon={WarningAmberIcon}
                              title="ความผิดปกติทางร่างกาย"
                              subtitle="Physical Abnormalities"
                            />
                            <Grid container spacing={2}>
                              {[
                                "ผิวหนังบริเวณคอและเอวฉีกขาดและเปลี่ยนสภาพพัฒนาเป็นเหงือกปลา",
                                "ภายในปากมีฟันแหลมคมหลายซี่แบบฉลาม",
                                "ร่างกายแผ่ไอเย็นจาง ๆ ตลอดเวลา",
                                "ใบหูเริ่มเปลี่ยนรูป",
                                "หางปลาขนาดใหญ่งอกจากกระดูกก้นกบ",
                                "มีครีบยาวบางงอกจากแผ่นหลัง",
                              ].map((text, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                  <Box
                                    sx={{
                                      p: 2,
                                      background: "rgba(179, 198, 214, 0.03)",
                                      borderLeft: "2px solid #B3C6D6",
                                      borderRadius: "0 4px 4px 0",
                                    }}
                                  >
                                    <Typography variant="body2">
                                      {text}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </GlassCard>
                        </Grid>

                        <Grid item xs={12}>
                          <GlassCard>
                            <SectionHeader
                              icon={LocalHospitalIcon}
                              title="โรคประจำตัว"
                              subtitle="Medical Condition"
                            />
                            <Box
                              sx={{
                                p: 3,
                                background: "rgba(0,0,0,0.3)",
                                borderRadius: "4px",
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{ color: "primary.main", mb: 1 }}
                              >
                                Insomnia (ภาวะนอนไม่หลับ)
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                              >
                                ภาวะนอนไม่หลับไม่ได้เกิดจากสภาพร่างกายเพียงอย่างเดียว
                                แต่เป็นผลรวมของความเครียดทางจิตใจ
                                และสภาพแวดล้อมที่กดดันตั้งแต่วัยเด็ก
                              </Typography>
                            </Box>
                          </GlassCard>
                        </Grid>
                      </Grid>
                    </motion.div>
                  )}

                  {activeTab === 1 && (
                    <motion.div
                      key="tab1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GlassCard>
                        <SectionHeader
                          icon={MenuBookIcon}
                          title="ประวัติความเป็นมา"
                          subtitle="Full Biography"
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary", mb: 3 }}
                        >
                          <span
                            style={{
                              color: "#EAEFF5",
                              fontSize: "1.2rem",
                              fontWeight: 500,
                            }}
                          >
                            เ
                          </span>
                          คียวระเกิดใน "ฮิซาเมะ"
                          ตระกูลเก่าแก่ที่มีฐานะร่ำรวยและยึดถือขนบธรรมเนียมอย่างเคร่งครัด
                          พวกเขากำหนดและให้ความสำคัญกับความสมบูรณ์แบบและสายเลือดที่บริสุทธิ์
                          ทว่าเคียวระกลับเกิดมาพร้อมกับความผิดปกติทางร่างกาย
                          ทำให้ครอบครัวมองเขาเป็นความอัปยศ
                          เขาจึงถูกเลี้ยงดูมาภายใต้ความกดดันอย่างหนัก
                          ถูกบังคับให้ต้องเพียบพร้อมในทุกด้านเพื่อชดเชยร่างกายที่ผิดปกติ
                          ต้องสวมเสื้อผ้ามิดชิดเพื่อปกปิดความลับนี้ไว้
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary", mb: 3 }}
                        >
                          จนกระทั่งในวัย 14 ปี
                          ความผิดปกติของเขาแสดงอาการรุนแรงขึ้นจนตระกูลคิดจะกำจัดเขา
                          เคียวระจึงตัดสินใจโกหกครอบครัวว่าได้รับจดหมายเชิญจากสถาบันการแพทย์ลับที่จะช่วยรักษาเขาได้
                          เพื่อใช้เป็นข้ออ้างในการเดินทางมายังโรงเรียนเวทมนตร์แห่งนี้
                        </Typography>
                        <Divider
                          sx={{
                            my: 3,
                            borderColor: "rgba(179, 198, 214, 0.05)",
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary" }}
                        >
                          ปัจจุบันเคียวระอาศัยอยู่ในหอพักของโรงเรียนมัธยมปลายมาโฮชิกิ
                          หลังจากที่ได้เห็นว่าที่นี่มีผู้คนที่มีความผิดปกติมากมาย
                          เขาจึงเริ่มคลายความหวาดระแวง ในด้านฐานะ
                          เคียวระมีสภาพคล่องทางการเงินที่สูงมาก
                          มักจะใช้แต่ข้าวของเครื่องใช้ที่มีคุณภาพสูง
                          และเป็นคนหวงแหนพื้นที่ส่วนตัวและเจ้าระเบียบมาก
                          แบ่งขอบเขตของตัวเองกับรูมเมท (ฮิเมะมิยะ โคยูคิ /
                          คากามิ ริคุ) อย่างชัดเจน
                        </Typography>
                      </GlassCard>
                    </motion.div>
                  )}

                  {activeTab === 2 && (
                    <motion.div
                      key="tab2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <GlassCard>
                            <SectionHeader
                              icon={AutoAwesomeIcon}
                              title="เวทมนตร์พื้นฐาน"
                              subtitle="Shadow Manipulations"
                            />
                            <Grid container spacing={2}>
                              {[
                                {
                                  name: "สรรค์สร้างเงา",
                                  desc: "ดึงเงาจากวัตถุรอบตัวมาปั้นเป็นรูปร่างชั่วคราว เช่น อาวุธ หรือมือเงา",
                                },
                                {
                                  name: "เคลื่อนที่ผ่านเงา",
                                  desc: "จมหายเข้าไปในเงาหนึ่งและปรากฏออกจากอีกเงาหนึ่ง (ระยะ 3-6 เมตร)",
                                },
                                {
                                  name: "เย็บเงา",
                                  desc: "สร้างเข็มปักลงบนเงาเป้าหมาย ตรึงร่างจริงให้ขยับไม่ได้คล้ายผีอำ",
                                },
                                {
                                  name: "เงาเลียนแบบ",
                                  desc: "สร้างร่างเงาเหมือนตัวเองเอามาช่วยทำงานบ้าน ถูกโจมตีครั้งเดียวจะสลาย",
                                },
                                {
                                  name: "หนามเงา",
                                  desc: "แทงเป้าหมายด้วยเงา รบกวนการไหลเวียนพลังเวท ทำให้เป้าหมายชา",
                                },
                                {
                                  name: "อาณาเขตเงา",
                                  desc: "ขยายเงาตัวเองดูดกลืนเสียง สำหรับทำงานเงียบๆ ในพื้นที่เล็กๆ",
                                },
                                {
                                  name: "โล่กลืนมนตรา",
                                  desc: "บิดเงาขึ้นเป็นกำแพงป้องกัน กลืนพลังเวทที่โจมตีเข้ามา",
                                },
                              ].map((spell, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 2,
                                      height: "100%",
                                      background: "rgba(0,0,0,0.3)",
                                      border:
                                        "1px solid rgba(179, 198, 214, 0.05)",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ color: "primary.main", mb: 1 }}
                                    >
                                      {spell.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "text.secondary" }}
                                    >
                                      {spell.desc}
                                    </Typography>
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </GlassCard>
                        </Grid>

                        <Grid item xs={12}>
                          <GlassCard sx={{ borderLeft: "2px solid #5C748A" }}>
                            <SectionHeader
                              icon={ShieldIcon}
                              title="พลังเวทเร้นลับ"
                              subtitle="Hidden & Forbidden Arts"
                            />
                            <Grid container spacing={2}>
                              {[
                                {
                                  name: "ดึงเงา",
                                  desc: "ดึงเงาของวัตถุหรือสิ่งมีชีวิตมาหล่อเลี้ยงพลังเวทตนเองชั่วคราว บรรเทาความเหนื่อยล้า แต่เป้าหมายจะอ่อนแรงลง",
                                },
                                {
                                  name: "กินเงา",
                                  desc: "กัดกินความเจ็บปวดหรือความเหนื่อยล้าจากผู้อื่นโดยดึงออกมาในรูปเงา เป็นการบรรเทาชั่วคราว แต่ทำให้ตัวเองรับภาระแทน",
                                },
                                {
                                  name: "ฝนเขี้ยวเงา",
                                  desc: "สร้างหนามดำจำนวนมากตกลงมาแบบปูพรม สามารถสร้างบาดแผลจริงได้ แต่กินพลังเวทสูง",
                                },
                              ].map((spell, i) => (
                                <Grid item xs={12} key={i}>
                                  <Box
                                    sx={{
                                      p: 2,
                                      borderBottom:
                                        "1px solid rgba(179, 198, 214, 0.05)",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ color: "#EAEFF5", mb: 1 }}
                                    >
                                      {spell.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "text.secondary" }}
                                    >
                                      {spell.desc}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </GlassCard>
                        </Grid>
                      </Grid>
                    </motion.div>
                  )}

                  {activeTab === 3 && (
                    <motion.div
                      key="tab3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Grid container spacing={3}>
                        {[
                          {
                            title: "ขี้อาย (แบบหน้านิ่ง)",
                            desc: "ภายนอกรักษาสีหน้านิ่งเฉย แต่ภายในมักประหม่า ใช้คำสุภาพเป็นกำแพงกั้นบทสนทนาเพื่อหนีไปอยู่คนเดียว",
                          },
                          {
                            title: "เจ้าระเบียบ",
                            desc: "ยึดติดกับความสมบูรณ์แบบเพื่อเป็นเกราะป้องกันไม่ให้ใครกล้าเข้ามาจับผิด",
                          },
                          {
                            title: "หวาดระแวงการสัมผัส",
                            desc: "ระแวงการสัมผัสตัวอย่างรุนแรง หากถูกโดนตัวจะปัดทิ้งอย่างรวดเร็วจนดูเหมือนคนหยิ่งยโส",
                          },
                          {
                            title: "โลกส่วนตัวสูง",
                            desc: "แอบไปพับโอริกามิ หรือเล่นเปียโนในห้องดนตรีเงียบๆ เป็นช่วงเวลาที่ปลดปล่อยความรู้สึกที่แท้จริงออกมา",
                          },
                          {
                            title: "ปากร้ายใจดี (ซึนเดเระ)",
                            desc: "ปากบ่นว่าน่ารำคาญแต่ก็ช่วยจนเสร็จ โหยหาความอ่อนโยน และเป็นผู้ฟังที่ดีที่จำรายละเอียดของคนอื่นได้เสมอ",
                          },
                        ].map((trait, index) => (
                          <Grid item xs={12} md={6} key={index}>
                            <GlassCard hoverEffect sx={{ height: "100%" }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ color: "primary.main", mb: 1 }}
                              >
                                {trait.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                              >
                                {trait.desc}
                              </Typography>
                            </GlassCard>
                          </Grid>
                        ))}
                      </Grid>
                    </motion.div>
                  )}

                  {activeTab === 4 && (
                    <motion.div
                      key="tab4"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <GlassCard sx={{ height: "100%" }}>
                            <SectionHeader
                              icon={FavoriteIcon}
                              title="สิ่งที่ชอบ"
                              subtitle="Likes"
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              {[
                                "เสียงฝนตกหนัก",
                                "พื้นที่สลัว / ร่มเงา",
                                "ความสมบูรณ์แบบ",
                                "เสียงดนตรี",
                                "กลิ่นน้ำเค็ม",
                                "ของน่ารัก",
                                "ขนมวากาชิ",
                              ].map((item, idx) => (
                                <Typography
                                  key={idx}
                                  variant="body2"
                                  sx={{
                                    color: "text.secondary",
                                    p: 1,
                                    borderBottom:
                                      "1px solid rgba(179, 198, 214, 0.03)",
                                  }}
                                >
                                  • {item}
                                </Typography>
                              ))}
                            </Box>
                          </GlassCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <GlassCard sx={{ height: "100%" }}>
                            <SectionHeader
                              icon={CancelIcon}
                              title="สิ่งที่ไม่ชอบ"
                              subtitle="Dislikes"
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              {[
                                "การเป็นจุดสนใจ",
                                "คนที่ไร้ระเบียบ",
                                "การถูกสัมผัสตัวอย่างกะทันหัน",
                                "ความหลากหลายทางเพศ",
                              ].map((item, idx) => (
                                <Typography
                                  key={idx}
                                  variant="body2"
                                  sx={{
                                    color: "text.secondary",
                                    p: 1,
                                    borderBottom:
                                      "1px solid rgba(179, 198, 214, 0.03)",
                                  }}
                                >
                                  • {item}
                                </Typography>
                              ))}
                            </Box>
                          </GlassCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <GlassCard sx={{ height: "100%" }}>
                            <SectionHeader
                              icon={WarningAmberIcon}
                              title="สิ่งที่กลัว"
                              subtitle="Fears"
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              {[
                                "การถูกครอบครัวจับได้",
                                "การถูกมองว่าเป็นความผิดพลาด",
                                "การสูญเสียการควบคุม",
                              ].map((item, idx) => (
                                <Typography
                                  key={idx}
                                  variant="body2"
                                  sx={{
                                    color: "text.secondary",
                                    p: 1,
                                    borderBottom:
                                      "1px solid rgba(179, 198, 214, 0.03)",
                                  }}
                                >
                                  • {item}
                                </Typography>
                              ))}
                            </Box>
                          </GlassCard>
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
