import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PhishingIcon from "@mui/icons-material/Phishing";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HealingIcon from "@mui/icons-material/Healing";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import InfoIcon from "@mui/icons-material/Info";

// --- Theme Setup (Deep Sea & Magic) ---
const theme = createTheme({
  typography: {
    fontFamily: "'Prompt', 'Kanit', sans-serif",
  },
  palette: {
    mode: "dark",
    background: {
      default: "#020308", // Black Ocean
    },
    primary: {
      main: "#FFA2B7", // Kyōra's Pink (Accent)
    },
    secondary: {
      main: "#00E5FF", // Cyan (Water/Magic)
    },
    text: {
      primary: "#FFF",
      secondary: "grey.400",
    },
  },
});

// --- Components ---

// 1. Redesigned Aesthetic Loading Screen
const SharkLoading = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500); // Animation duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "#020308",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 150,
          height: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Pulsing ripples */}
        <motion.div
          animate={{ scale: [1, 1.5, 2.2], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "2px solid rgba(0, 229, 255, 0.4)",
            borderRadius: "50%",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1.9], opacity: [0.4, 0, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.25,
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "2px solid rgba(255, 162, 183, 0.4)",
            borderRadius: "50%",
          }}
        />

        {/* Animated Elegant Shark Fin & Waves */}
        <svg
          viewBox="0 0 100 100"
          width="100"
          height="100"
          style={{ zIndex: 1 }}
        >
          <defs>
            <linearGradient id="finGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA2B7" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
          <motion.path
            d="M50 20 Q 65 60 85 80 Q 50 75 15 80 Q 35 60 50 20 Z"
            fill="url(#finGrad)"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <motion.path
            d="M5 80 Q 25 70 50 80 T 95 80"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.path
            d="M15 90 Q 35 85 50 90 T 85 90"
            fill="none"
            stroke="#FFA2B7"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          />
        </svg>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        style={{ textAlign: "center" }}
      >
        <Typography
          variant="body1"
          sx={{ color: "#00E5FF", letterSpacing: 3, mb: 1, opacity: 0.8 }}
        >
          กำลังดำดิ่งสู่โลกของ...
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "#FFA2B7",
            fontWeight: 600,
            textShadow: "0 0 15px rgba(255,162,183,0.6)",
          }}
        >
          ฮิซาเมะ เคียวระ
        </Typography>
      </motion.div>
    </Box>
  );
};
 
// 2. Enhanced Ocean Background (Bubbles & Swimming Fish)
const OceanBackground = () => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 5 + 3,
        left: `${Math.random() * 100}vw`,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 8,
        isPink: Math.random() > 0.8, // 20% are Kyora's Pink
      })),
    []
  );

  const fish = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        width: Math.random() * 40 + 20,
        top: `${Math.random() * 80 + 10}vh`,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 10,
        fromLeft: Math.random() > 0.5,
      })),
    []
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
      }}
    >
      {/* Dynamic Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, b.isPink ? 0.7 : 0.4, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: b.left,
            width: b.size,
            height: b.size,
            backgroundColor: b.isPink ? "#FFA2B7" : "#00E5FF",
            borderRadius: "50%",
            boxShadow: `0 0 10px ${
              b.isPink
                ? "rgba(255, 162, 183, 0.4)"
                : "rgba(0, 229, 255, 0.4)"
            }`,
          }}
        />
      ))}

      {/* Dynamic Swimming Fish */}
      {fish.map((f) => (
        <motion.div
          key={f.id}
          initial={{ x: f.fromLeft ? "-20vw" : "120vw" }}
          animate={{ x: f.fromLeft ? "120vw" : "-20vw" }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: f.top,
            width: f.width,
            height: f.width * 0.4,
            opacity: 0.15,
            // แก้ไขตรงนี้: ใช้ scaleX ของ Framer Motion โดยตรง จะไม่โดนทับ
            scaleX: f.fromLeft ? -1 : 1, 
          }}
        >
          {/* Simple stylized fish shape */}
          <svg viewBox="0 0 100 40" width="100%" height="100%">
            <path
              d="M10,20 Q50,0 90,20 Q50,40 10,20 Z" // Fish body
              fill="#00E5FF"
            />
            <path
              d="M90,20 Q100,10 100,20 Q100,30 90,20 Z" // Tail fin
              fill="#00E5FF"
            />
          </svg>
        </motion.div>
      ))}
    </Box>
  );
};

// 3. Decorative Heading
const DecorativeHeading = ({ icon, text }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 3,
      borderBottom: "2px solid rgba(255,162,183,0.3)",
      pb: 1,
    }}
  >
    {icon}
    <Typography
      variant="h5"
      sx={{
        color: "#FFA2B7",
        letterSpacing: 2,
        fontWeight: 600,
        textShadow: "0 0 10px rgba(255, 162, 183, 0.4)",
      }}
    >
      {text}
    </Typography>
  </Box>
);

// Framer Motion variant for scrolling reveals
const scrollRevealConfig = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.8, ease: "easeOut" },
};

export default function KyoraProfile() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence>
        {!loadingComplete && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <SharkLoading onComplete={() => setLoadingComplete(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      {loadingComplete && <OceanBackground />}

      <audio ref={audioRef} src="YOUR_MUSIC_FILE.mp3" loop />

      {loadingComplete && (
        <IconButton
          onClick={toggleMusic}
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            bgcolor: "rgba(255, 162, 183, 0.15)",
            border: "1px solid #FFA2B7",
            color: "#FFA2B7",
            backdropFilter: "blur(10px)",
            zIndex: 999,
            boxShadow: "0 0 15px rgba(255, 162, 183, 0.4)",
            "&:hover": { bgcolor: "rgba(255, 162, 183, 0.3)" },
          }}
        >
          <motion.div
            animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
            transition={{
              duration: isPlaying ? 1 : 0,
              repeat: isPlaying ? Infinity : 0,
            }}
          >
            {isPlaying ? (
              <MusicNoteIcon fontSize="large" />
            ) : (
              <MusicOffIcon fontSize="large" />
            )}
          </motion.div>
        </IconButton>
      )}

      {loadingComplete && (
        <Box
          sx={{
            minHeight: "100vh",
            position: "relative",
            zIndex: 1,
            py: 8,
            px: { xs: 2, md: 6, lg: 10 },
            maxWidth: 1400,
            mx: "auto",
          }}
        >
          {/* Header & Character Info */}
          <Paper
            component={motion.div}
            {...scrollRevealConfig}
            elevation={8}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: "rgba(10, 15, 30, 0.3)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 162, 183, 0.2)",
              borderRadius: 6,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#FFA2B7",
                  letterSpacing: 4,
                  mb: 1,
                  fontStyle: "italic",
                }}
              >
                ✦ 道 วิถีแห่งความมืด ✦
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "#FFF",
                  textShadow: "0px 0px 20px rgba(255, 162, 183, 0.5)",
                  mb: 1,
                }}
              >
                氷雨 響羅 Hisame Kyōra
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "grey.400", fontWeight: 300 }}
              >
                ฮิซาเมะ เคียวระ
              </Typography>
            </Box>

            <Grid container spacing={5} alignItems="center">
              {/* Profile Picture */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  style={{ position: "relative" }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "120%",
                      height: "120%",
                      background:
                        "radial-gradient(circle, rgba(255,162,183,0.3) 0%, transparent 65%)",
                      zIndex: 0,
                    }}
                  />
                  <Avatar
                    src="YOUR_KYORA_IMAGE_URL.jpg"
                    alt="Hisame Kyōra"
                    variant="rounded"
                    sx={{
                      width: { xs: 260, md: 320 },
                      height: { xs: 340, md: 420 },
                      zIndex: 1,
                      boxShadow:
                        "0 0 30px rgba(0,0,0,0.9), 0 0 15px rgba(255,162,183,0.6)",
                      border: "3px solid rgba(255,162,183,0.4)",
                      background:
                        "linear-gradient(180deg, #0A0F1A 0%, #020308 100%)",
                    }}
                  >
                    <Typography variant="h1" color="rgba(255,162,183,0.4)">
                      氷
                    </Typography>
                  </Avatar>
                </motion.div>
              </Grid>

              {/* Personal Data & Flippable Card */}
              <Grid item xs={12} md={7}>
                <DecorativeHeading
                  icon={<AccountCircleIcon sx={{ color: "#FFA2B7" }} />}
                  text="ข้อมูลส่วนตัวนักเรียน"
                />

                <Card
                  sx={{
                    bgcolor: "rgba(10, 20, 35, 0.4)",
                    borderRadius: 3,
                    border: "1px solid rgba(0, 229, 255, 0.15)",
                    mb: 4,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          วันเกิด:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>12/06</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          อายุ:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>18</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          เพศ:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>ชาย</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          หมู่เลือด:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>A</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          สัญชาติ/เชื้อชาติ:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>
                          ญี่ปุ่น/ญี่ปุ่น
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          น้ำหนัก/ส่วนสูง:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>72/184</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          ชั้นปี:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>มังไก</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          ห้อง:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>3-B</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          หอพัก:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>ฤดูหนาว</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          รูมเมท:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>
                          ฮิเมะมิยะ โคยูคิ / คากามิ ริคุ
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          เลขประจำตัว:
                        </Typography>
                        <Typography sx={{ color: "#FFA2B7", letterSpacing: 2 }}>
                          00000
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: "#00E5FF" }}>
                          ชมรม:
                        </Typography>
                        <Typography sx={{ color: "#FFF" }}>
                          ดนตรีและประสานเสียง
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Flippable ID Card */}
                <Box
                  sx={{
                    perspective: 1000,
                    width: "100%",
                    maxWidth: 480,
                    height: 280,
                    cursor: "pointer",
                    mx: "auto",
                  }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{
                      duration: 0.8,
                      type: "spring",
                      stiffness: 70,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Front of Card */}
                    <Card
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        background:
                          "linear-gradient(135deg, rgba(15,25,45,0.95) 0%, rgba(5,10,20,0.9) 100%)",
                        border: "1px solid rgba(0, 229, 255, 0.4)",
                        borderRadius: 5,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.9)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderBottom: "1px solid rgba(255,162,183,0.4)",
                          pb: 1,
                        }}
                      >
                        <Typography
                          sx={{ color: "#00E5FF", fontWeight: "bold" }}
                        >
                          STUDENT ID CARD
                        </Typography>
                        <Typography sx={{ color: "#FFA2B7", letterSpacing: 2 }}>
                          00000
                        </Typography>
                      </Box>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="grey.500">
                            ชั้นปี/ห้อง
                          </Typography>
                          <Typography sx={{ color: "#FFF" }}>
                            มังไก / 3-B
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="grey.500">
                            หอพัก
                          </Typography>
                          <Typography sx={{ color: "#FFF" }}>
                            ฤดูหนาว
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="grey.500">
                            ชมรม
                          </Typography>
                          <Typography sx={{ color: "#FFF" }}>
                            ดนตรี&ประสานเสียง
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="grey.500">
                            วันเกิด
                          </Typography>
                          <Typography sx={{ color: "#FFF" }}>12/06</Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(255,255,255,0.4)",
                          textAlign: "center",
                          display: "block",
                          mt: 2,
                        }}
                      >
                        - แตะเพื่อพลิกบัตร -
                      </Typography>
                    </Card>

                    {/* Back of Card */}
                    <Card
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background:
                          "linear-gradient(135deg, rgba(5,10,20,0.95) 0%, rgba(15,5,15,0.9) 100%)",
                        border: "1px solid rgba(255, 162, 183, 0.5)",
                        borderRadius: 5,
                        p: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <motion.div
                          animate={{ rotate: isFlipped ? 360 : 0 }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                        >
                          <WaterDropIcon
                            sx={{
                              fontSize: 70,
                              color: "rgba(0, 229, 255, 0.25)",
                              mb: 1,
                            }}
                          />
                        </motion.div>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#FFA2B7",
                            fontFamily: "serif",
                            fontStyle: "italic",
                            textShadow: "0 0 10px rgba(255,162,183,0.5)",
                          }}
                        >
                          Hisame Kyōra
                        </Typography>
                        <Box
                          sx={{
                            width: "60px",
                            height: "1px",
                            bgcolor: "#FFA2B7",
                            mx: "auto",
                            mt: 1.5,
                            opacity: 0.6,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: "#FFF", mt: 1, display: "block" }}
                        >
                          วิถี ความมืด
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Anomalies & Health */}
          <Paper
            component={motion.div}
            {...scrollRevealConfig}
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: "rgba(20, 5, 15, 0.5)",
              border: "1px solid rgba(255, 162, 183, 0.25)",
              borderRadius: 4,
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <DecorativeHeading
                  icon={<PhishingIcon sx={{ color: "#FFA2B7" }} />}
                  text="ความผิดปกติทางร่างกาย"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    pl: 2,
                    borderLeft: "2px solid rgba(255,162,183,0.3)",
                  }}
                >
                  {[
                    "ผิวหนังบริเวณ คอ และ เอว ฉีกขาดและเปลี่ยนสภาพพัฒนาเป็นเหงือกปลา",
                    "ภายในปากมี ฟันแหลมคมหลายซี่ (ฟันฉลาม)",
                    "ร่างกาย แผ่ไอเย็นจาง ๆ ตลอดเวลา",
                    "ใบหูเริ่มเปลี่ยนรูป",
                    "หางปลาขนาดใหญ่ งอกจากกระดูกก้นกบ",
                    "มี ครีบยาวบาง งอกจากแผ่นหลัง",
                  ].map((item, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{ color: "grey.300" }}
                    >
                      • {item}
                    </Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <DecorativeHeading
                  icon={<HealingIcon sx={{ color: "#00E5FF" }} />}
                  text="โรคประจำตัว"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    pl: 2,
                    borderLeft: "2px solid rgba(0, 229, 255, 0.3)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#FFF" }}>
                    Insomnia (ภาวะนอนไม่หลับ)
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "grey.400", lineHeight: 1.8 }}
                  >
                    ไม่ใช่แค่เรื่องสภาพร่างกาย แต่เป็นผลรวมของความเครียดทางจิตใจ
                    และสภาพแวดล้อมที่กดดันตั้งแต่วัยเด็ก
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* History */}
          <Paper
            component={motion.div}
            {...scrollRevealConfig}
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: "rgba(5, 10, 25, 0.5)",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              borderRadius: 4,
            }}
          >
            <DecorativeHeading
              icon={<HistoryEduIcon sx={{ color: "#FFA2B7" }} />}
              text="ประวัติ"
            />
            {[
              "เกิดในตระกูลฮิซาเมะ ตระกูลเก่าแก่ที่ยึดถือขนบธรรมเนียมอย่างเคร่งครัด ภาคภูมิใจในสายเลือดบริสุทธิ์และไร้ที่ติ ทว่าเบื้องหลัง ทวดเคยเป็น 'ผู้ถูกรับเลือก' นับเป็นความอัปยศสูงสุด ถูกขังลืมและปล่อยให้ตายอย่างทนทุกข์ ตระกูลสั่งปิดข่าวเงียบ",
              "เมื่อเกิดมา ความผิดปกติแรกเริ่มที่ปรากฏคือ ผิวหนังบริเวณคอและเอวแห้งสาก ผิวปริแตกจนเลือดซึม พ่อแม่ที่เคยตั้งความหวังไว้สูงกลับรู้สึกเหมือนถูกผลักตกเหว มองด้วยสายตาที่เต็มไปด้วยความขยะแขยงและอับอาย ปักใจเชื่อว่าเป็น 'คำสาป' เคียวระถูกปฏิบัติราวกับเป็นสิ่งของที่ชำรุด",
              "ถูกพร่ำสอนว่าตนคือ 'ความผิดพลาด' และต้อง 'สมบูรณ์แบบ' ในทุกๆ ด้านเพื่อชดเชย ถูกบังคับให้เรียนหนัก มารยาท และการวางตัวอย่างบ้าคลั่ง ห้ามร้องไห้ ห้ามแสดงความอ่อนแอ หากพลาดจะถูกกักขังในห้องมืด โตมาโดยไร้อ้อมกอด ไร้คำชม มีเพียงสายตาเย็นชา",
              "เยียวยาจิตใจด้วยการพับโอริกามิจากเศษกระดาษที่แอบฉีกมา วาดภาพในความมืด และต้องทำลายทิ้งทันทีหลังทำเสร็จ เมื่อเวลาผ่านไป ความผิดปกติเด่นชัด ผิวฉีกขาดเป็น เหงือกปลา, มี ฟันแหลมคม, ร่างกาย แผ่ไอเย็น",
              "ถูกสั่งห้ามยิ้มและต้องสวมคอเต่าแขนยาวเพื่อปกปิด ทำให้กลายเป็นเด็กขี้อาย เก็บตัว และหวาดระแวงตลอดเวลา ในวัย 9 ขวบ พบห้องเก็บของเก่าที่มีเปียโนเก่า เริ่มแอบฝึกฝนเปียโนด้วยตัวเอง",
              "จะบรรเลงเปียโนเฉพาะในวันที่ฝนตกหนักเพื่อให้เสียงฝนกลบเสียงเปียโน ท่ามกลางห้องสลัว เสียงดนตรีเป็นเหมือนเสียงกอดปลอบตัวเอง",
              "ถูกประกาศหมั้นกับบุตรสาวญาติเพื่อผลประโยชน์ทางธุรกิจ เคียวระต่อต้านในใจแต่ไม่กล้าปฏิเสธ เพราะเชื่อว่าตัวเขาที่มีสภาพเป็น 'สัตว์ประหลาด' ไม่มีสิทธิ์เรียกร้องอะไร",
              "ทว่าในวัย 14 ปี ร่างกายเข้าขั้นวิกฤต ใบหูเปลี่ยนรูป, มี หางปลา, มี ครีบยาว, พลังเวทควบคุมไม่ได้ ตระกูลตัดสินใจกำจัดด้วยการส่งไปยังห้องขังเดียวกับที่ทวดเคยตาย",
              "ในคืนสุดท้าย เคียวระผู้ซึ่งเคยสยบยอมมาตลอดกลับตัดสินใจโกหกครั้งใหญ่ ใช้ไหวพริบเข้าพบพ่อพร้อมจดหมาย อ้างว่าคือ หนังสือตอบรับจากสถาบันการแพทย์ลับ ที่เชี่ยวชาญการรักษาความผิดปกติพันธุกรรมและโรคประหลาด ยืนยันว่าสามารถรักษาให้เขากลับมา ปกติ ได้ และหากไม่ส่ง อาจบานปลายถึงชื่อเสียงตระกูล",
              "คนในตระกูลไม่มีใครล่วงรู้เลยว่า สถานที่ปลายทางที่แท้จริงคือ โรงเรียนเวทมนตร์ ไม่ใช่สถาบันการแพทย์ตามที่อ้างไว้แม้แต่น้อย",
            ].map((p, i) => (
              <Typography
                key={i}
                paragraph
                sx={{
                  color: "grey.300",
                  lineHeight: 2,
                  textIndent: "2em",
                  borderLeft:
                    i % 2 === 0
                      ? "2px solid rgba(255, 162, 183, 0.15)"
                      : "2px solid rgba(0, 229, 255, 0.15)",
                  pl: 2,
                }}
              >
                {p}
              </Typography>
            ))}
          </Paper>

          {/* School Life & Dorm Life */}
          <Paper
            component={motion.div}
            {...scrollRevealConfig}
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: "rgba(15, 20, 30, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 4,
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <DecorativeHeading
                  icon={<AccountCircleIcon sx={{ color: "#FFA2B7" }} />}
                  text="หลังจากมาถึงโรงเรียน"
                />
                <Typography
                  paragraph
                  sx={{ color: "grey.400", lineHeight: 1.9, textIndent: "2em" }}
                >
                  ในช่วงแรกๆ หวาดระแวงร่างกายของตนเองมาก
                  พยายามสวมเสื้อแขนยาวและแต่งตัวมิดชิดเพื่อปกปิด
                  กลัวคนอื่นเห็นมองเป็นตัวประหลาด
                </Typography>
                <Typography
                  paragraph
                  sx={{ color: "grey.400", lineHeight: 1.9, textIndent: "2em" }}
                >
                  แต่เมื่อเวลาผ่านไป
                  ตระหนักว่าโรงเรียนแห่งนี้เต็มไปด้วยนักเรียนที่มี ความผิดปกติ
                  ความผิดปกติของเขาจึงไม่ได้แปลกแยกอย่างที่เคยคิด จึงค่อยๆ
                  เลิกหมกมุ่นปกปิดร่างกาย
                  แม้จะยังแผ่ไอเย็นแต่สำหรับคนที่คุ้นเคยก็กลายเป็นเพียงลักษณะเฉพาะตัว
                </Typography>
                <Typography
                  paragraph
                  sx={{ color: "grey.400", lineHeight: 1.9, textIndent: "2em" }}
                >
                  ยังคงได้รับเงินสนับสนุนจากตระกูลเพราะเขาโกหกที่บ้านเรื่องการรักษา
                  ครอบครัวเข้าใจว่าเงินที่ส่งมาเป็นค่ารักษาและค่าครองชีพที่ต้องเก็บเป็นความลับ
                  แม้มีเงินใช้ไม่ขาดมือแต่ก็ไม่ใช่คนใช้จ่ายฟุ่มเฟือยด้วยนิสัยเจ้าระเบียบ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <DecorativeHeading
                  icon={<FingerprintIcon sx={{ color: "#00E5FF" }} />}
                  text="การใช้ชีวิตในหอพัก"
                />
                <Typography
                  paragraph
                  sx={{ color: "grey.400", lineHeight: 1.9, textIndent: "2em" }}
                >
                  ไม่ใช่เรื่องง่ายเพราะเขาเจ้าระเบียบมากและยึดติดกับความสมบูรณ์แบบพอสมควร
                  หากรูมเมทมีนิสัยไม่เป็นระเบียบ
                  เขาจะรู้สึกหงุดหงิดแต่เพราะไม่ชอบการเผชิญหน้าจึงไม่พูดตรงๆ
                </Typography>
                <Typography
                  paragraph
                  sx={{ color: "grey.400", lineHeight: 1.9, textIndent: "2em" }}
                >
                  วิธีที่เขาใช้คือการ แบ่งเขตพื้นที่ ของตัวเองอย่างชัดเจน
                  ฝั่งของเขาจะสะอาดและเป็นระเบียบเสมอ หากรูมเมทล้ำเข้ามา
                  เขาจะดันของกลับไปจัดใหม่เงียบๆ มีปัญหาเรื่องการนอนไม่หลับ
                  ทำให้ตื่นในช่วงกลางคืน
                </Typography>
                <Typography
                  paragraph
                  sx={{ color: "grey.400", lineHeight: 1.9, textIndent: "2em" }}
                >
                  หลังจากรูมเมทหลับสนิท เขาจะเปิดโคมไฟสลัวๆ
                  แล้วนั่งพับกระดาษหรือวาดรูปเงียบๆ
                  หากรูมเมทเริ่มขยับตัวจะรีบเก็บของทันที
                  บางคืนจะออกไปแอบเล่นเปียโนที่ห้องชมรมดนตรีในความมืด
                  เป็นหนึ่งในไม่กี่ช่วงเวลาที่รู้สึกว่าตัวเองได้หายใจอย่างเป็นอิสระ
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Magic */}
          <Paper
            component={motion.div}
            {...scrollRevealConfig}
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: "rgba(10, 15, 30, 0.4)",
              border: "2px solid rgba(0, 229, 255, 0.3)",
              borderRadius: 5,
            }}
          >
            <DecorativeHeading
              icon={<AutoAwesomeIcon sx={{ color: "#00E5FF" }} />}
              text="เวทมนตร์ จิตวิญญาณแห่งธรรมชาติ ฤดูหนาว「道」"
            />
            <Typography variant="h6" sx={{ color: "#00E5FF", mb: 2, pl: 2 }}>
              วิถี ความมืด
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  n: "สรรค์สร้างเงา",
                  d: "สร้างเงาเป็นของแข็งรูปร่างชั่วคราว (อาวุธ, ลิ่ม, มีด, ร่ม, มือยักษ์)",
                },
                {
                  n: "เคลื่อนที่ผ่านเงา",
                  d: "จมหายเข้าเงาและปรากฏออกจากอีกเงา (ระยะ 3-6 เมตร)",
                },
                {
                  n: "เย็บเงา",
                  d: "สร้างเข็มลิ่มเงาปักบนเงาเป้าหมาย ตรึงร่างไว้คล้ายผีอำ",
                },
                {
                  n: "เงาเลียนแบบ",
                  d: "สร้างร่างเงาช่วยงานบ้าน (สูงสุด 3 ร่าง)",
                },
                {
                  n: "หนามเงา",
                  d: "ควบแน่นเงาแทงเป้าหมาย รบกวนพลังเวท ทำให้ชาชั่วคราว",
                },
                {
                  n: "อาณาเขตเงา",
                  d: "ขยายเงาเป็นอาณาเขต ดูดกลืนเสียง สำหรับอ่านหนังสือ",
                },
                {
                  n: "โล่กลืนมนตรา",
                  d: "บิดเงาขึ้นเป็นกำแพงป้องกัน กลืนพลังเวทที่โจมตีเข้ามา",
                },
              ].map((magic, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "rgba(0,0,0,0.5)",
                      borderLeft: "3px solid #00E5FF",
                      borderRadius: 1.5,
                    }}
                  >
                    <Typography sx={{ color: "#FFF", fontWeight: "bold" }}>
                      {magic.n}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "grey.400", mt: 0.5 }}
                    >
                      {magic.d}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 4, borderColor: "rgba(255,162,183,0.2)" }} />
            <Typography variant="h6" sx={{ color: "#FFA2B7", mb: 2, pl: 2 }}>
              พลังซ่อนเร้น (ไม่ค่อยใช้)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography sx={{ color: "#FFF" }}>ดึงเงา</Typography>
                <Typography variant="caption" sx={{ color: "grey.500" }}>
                  ดึงพลังจากสิ่งมีชีวิตมาฟื้นฟูตัวเอง
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography sx={{ color: "#FFF" }}>กินเงา</Typography>
                <Typography variant="caption" sx={{ color: "grey.500" }}>
                  กลืนกินความเจ็บปวด/เหนื่อยล้าของผู้อื่นเพื่อบรรเทา
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography sx={{ color: "#FFF" }}>ฝนเขี้ยวเงา</Typography>
                <Typography variant="caption" sx={{ color: "grey.500" }}>
                  โจมตีวงกว้างด้วยฝนหนามเงาสีดำจำนวนมาก
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Personality & Extra */}
          <Paper
            component={motion.div}
            {...scrollRevealConfig}
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: "rgba(20, 5, 10, 0.4)",
              border: "1px solid rgba(255, 162, 183, 0.2)",
              borderRadius: 4,
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <DecorativeHeading
                  icon={<FingerprintIcon sx={{ color: "#FFA2B7" }} />}
                  text="ลักษณะนิสัย"
                />
                {[
                  "ขี้อาย (ภายในประหม่าแต่ภายนอกพยายามรักษาสีหน้านิ่ง, พูดคุยตามปกติแต่สุภาพเกินจำเป็น)",
                  "เจ้าระเบียบ (ยึดติดกับความสมบูรณ์แบบ กฎระเบียบ ความเรียบร้อย)",
                  "หวาดระแวงการสัมผัส (ระแวงการสัมผัสตัวอย่างรุนแรง หากมีใครมาตบไหล่ปัดมือทิ้งอย่างรวดเร็ว)",
                  "โลกส่วนตัวสูง (มีพื้นที่ส่วนตัวที่แทบไม่มีใครเข้าถึงได้ และมักเก็บมันไว้เป็นความลับ)",
                  "อ่อนโยน(?) ซึนแหละ (แสดงความใส่ใจต่อผู้อื่นผ่านการกระทำมากกว่าคำพูด สีหน้ายังเรียบนิ่ง)",
                  "ด้อยค่าตัวเอง (แม้สมบูรณ์แบบภายนอกแต่ภายในมองตัวเองเป็นสัตว์ประหลาด, โทษตัวเองก่อน)",
                  "ชอบตัดสินคนอื่น (Judgemental, มองคนที่ดูไร้ระเบียบด้วยสายตาเย็นชา)",
                  "อคติทางเพศและโฮโมโฟบ (ต้านความหลากหลายทางเพศ, รังเกียจความสัมพันธ์ระหว่างเพศเดียวกัน)",
                ].map((item, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{
                      color: "grey.300",
                      mb: 1,
                      pl: 2,
                      borderLeft: "2px solid rgba(255,162,183,0.3)",
                    }}
                  >
                    • {item}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <DecorativeHeading
                      icon={<ThumbsUpDownIcon sx={{ color: "#00E5FF" }} />}
                      text="สิ่งที่ชอบ"
                    />
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "rgba(10,25,30,0.5)",
                        borderRadius: 2,
                      }}
                    >
                      {[
                        "เสียงฝนตกหนัก",
                        "พื้นที่สลัว / ร่มเงา",
                        "ความสมบูรณ์แบบและความเป็นระเบียบ",
                        "เสียงดนตรี",
                        "กลิ่นน้ำเค็มและเสียงคลื่นทะเล",
                        "ขนมวากาชิ / พาร์เฟต์",
                        "ของน่ารัก",
                        "อุซากี้ เป็นเพียงการ์ตูนในโลกมนุษย์",
                      ].map((t, i) => (
                        <Typography
                          key={i}
                          variant="caption"
                          sx={{ color: "grey.400", display: "block" }}
                        >
                          - {t}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <DecorativeHeading
                      icon={<MoodBadIcon sx={{ color: "#F44336" }} />}
                      text="ไม่ชอบ / กลัว"
                    />
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "rgba(30,10,10,0.5)",
                        borderRadius: 2,
                      }}
                    >
                      <Typography sx={{ color: "#FFF", mb: 1 }}>
                        ไม่ชอบ
                      </Typography>
                      {[
                        "การเป็นจุดสนใจ",
                        "คนที่ทำตัวตามใจชอบ ไร้ระเบียบ",
                        "การถูกสัมผัสตัวอย่างกะทันหัน",
                        "ความหลากหลายทางเพศ",
                      ].map((t, i) => (
                        <Typography
                          key={i}
                          variant="caption"
                          sx={{ color: "grey.400", display: "block" }}
                        >
                          - {t}
                        </Typography>
                      ))}
                      <Divider
                        sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }}
                      />
                      <Typography sx={{ color: "#FFF", mb: 1 }}>
                        กลัว
                      </Typography>
                      {[
                        "การถูกครอบครัวจับได้",
                        "การถูกมองว่าเป็นความผิดพลาด",
                        "การสูญเสียการควบคุม",
                      ].map((t, i) => (
                        <Typography
                          key={i}
                          variant="caption"
                          sx={{ color: "grey.400", display: "block" }}
                        >
                          - {t}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* Misc */}
          <Paper
            component={motion.div}
            {...scrollRevealConfig}
            elevation={4}
            sx={{
              p: 4,
              bgcolor: "rgba(5, 5, 5, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 3,
            }}
          >
            <DecorativeHeading
              icon={<InfoIcon sx={{ color: "#FFF" }} />}
              text="อื่น ๆ"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {[
                  "CV : toi kuji scenes (sarazanmai)",
                  "Theme Song : truth, violence, warmth",
                  "มีฟันฉลาม",
                  "ร่างกายแผ่ไอเย็นจางๆ (อาจเป็นที่ชื่นชอบของเพื่อนๆ ในหน้าร้อนโดยไม่รู้ตัว)",
                  "มักใช้ของแบรนด์เนมหรือของที่มีคุณภาพสูงมากโดยไม่รู้ตัว",
                  "แอบซื้อขนมหวานมากินคนเดียวในห้องตอนดึก บรรจงตักกินด้วยท่วงท่าที่สง่างาม",
                  "ชอบแอบไปซื้อขนมวากาชิพรีเมียมจาก ย่านการค้า",
                  "มักจะไปเดินเล่นที่ ชายหาดมิโอริ ในตอนกลางคืน",
                  "เมื่อใช้ความคิดหนัก มักกัดริมฝีปากตัวเอง จนริมฝีปากเขามีแผลเลือดซึม",
                  "ชอบแต่งตัวเรียบร้อยและถูกระเบียบเสมอ",
                ].map((item, i) => (
                  <Typography
                    key={i}
                    variant="caption"
                    sx={{ color: "grey.400", display: "block", mb: 1 }}
                  >
                    • {item}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                {[
                  "เมื่อนอนไม่หลับจะไม่นอนบนเตียง แต่หอบผ้าห่มไปขดตัวนอนในตู้เสื้อเก็บของหรือใต้โต๊ะ ใช้เวทอาณาเขตเงาคลุมตัวเอง",
                  "ในที่มืดดวงตาจะสะท้อนแสงวาววับเหมือนตาสัตว์",
                  "มีเซนส์เรื่องฝน เหงือกปลาไวต่อความชื้น",
                  "ตัวมักมีกลิ่นหอมจางๆ คล้ายกลิ่นอายทะเล Sea breeze ผสมกลิ่นกระดาษเก่าๆ",
                  "มีพฤติกรรมย้ำคิดย้ำทำ เช็คเครื่องรางฮามากุริ",
                  "เมื่อได้รับคำชมจนดีใจมาก อาจเผลอกวัดแกว่งหรือกระดิกหางปลา",
                  "เมื่อเจอของน่ารัก ดวงตาจะเบิกกว้างเปล่งประกาย ก่อนจะรีบทำหน้าตาย",
                  "เมื่อถูกจับได้ว่าใช้ของน่ารัก จะตีหน้านิ่งหาข้ออ้างด้วยน้ำเสียงจริงจัง แต่ใบหูและหลังคอจะเปลี่ยนเป็นสีแดงจัด",
                ].map((item, i) => (
                  <Typography
                    key={i}
                    variant="caption"
                    sx={{ color: "grey.400", display: "block", mb: 1 }}
                  >
                    • {item}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </ThemeProvider>
  );
}
