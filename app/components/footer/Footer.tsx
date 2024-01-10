import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Logo from "../../../public/images/logo.jpg";
import "./styles.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import Image from "next/image";
// import TiktokIcon from '@mui/icons-material/Tiktok';


const Footer = () => {
  return (
    <footer>
      <div className="container">      
        {/* // sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3, */}
        {/* //   "@media (max-width:600px)": { */}
        {/* //     display: "flex",
        //     flexDirection: "column",
        //     fontSize: "1rem",
        //   },
      
      // }} */}
      
        <div className="logo-container"
          // sx={{
          //   my: 3,
          //   "& svg": {
          //     fontSize: "25px",
          //     cursor: "pointer",
          //     mr: 2,
          //   },
          //   "& svg:hover": {
          //     color: "goldenrod",
          //     transform: "translateX(5px)",
          //     transition: "all 400ms",
          //   },
            
          // }}
        >
          {/* icons */}

          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width='150'
            height='150'
            className="relative"
          />
            <p className="school-name"><span>SHEIKH KHALID <br></br></span>GROUP OF SCHOOLS</p>
            <p className="school-motto"> "It's not how you start, it's how you finish."</p>
          <Box
            sx={{
              mt: "20px",
            }}
          >
            <Box className ="social-icons">
              <InstagramIcon />
              <TwitterIcon />
              <YouTubeIcon />
              <FacebookIcon />
            </Box>
          </Box>
        </div>
        <div className="quick-info">
            <h2>CONTACTS INFO</h2>
            <h4>SHEIKH KHALID GROUP OF SCHOOLS </h4>
            <p>P.O Box 00100 NAIROBI </p>
            <p>
              <a href="tel: +254721707044">
              <CallIcon sx={{ color: "green", pt: 1 }} />0721707044</a>
            </p>
            <p>
              <a href="tel: +254721707044">
              <CallIcon sx={{ color: "green", pt: 1 }} />0721707044</a>
            </p>
            <p className="email-link">
              <a href="">
              <MailIcon sx={{ color: "skyblue", pt: 1 }} /> sheikhkhalidgroupofschools@gmail.com</a>
            </p>
        </div>
        <div className="quick-links">
          <h2>Quick links</h2>
          <ul className="link-list">
            <li> <ChevronRightIcon className="icon"/> <a href="/story">Brief History</a></li>
            <li> <ChevronRightIcon className="icon"/> <a href="/curricula-assessment">Curriculum</a></li>
            <li> <ChevronRightIcon className="icon"/> <a href="/admissions">Admision</a></li>
            <li> <ChevronRightIcon className="icon"/> <a href="/blog">Blog</a></li>
            <li> <ChevronRightIcon className="icon"/> <a href="">Administration</a></li>
            <li> <ChevronRightIcon className="icon"/> <a href="">Login</a></li>
            <li> <ChevronRightIcon className="icon"/> <a href="/contacts">Contacts</a></li>
          </ul>
        </div>
        <div className="schedule">
          <h2>OFFICE HOURS</h2> 
          <div className="working-hours">           
            <Typography className="day">
            <span><AccessTimeIcon sx={{ color: "white", pt: 1 }}/> MONDAY - FRIDAY </span><span className="time">8.00am - 5.00pm</span>
            </Typography>
            <Typography className="day">
            <span> <AccessTimeIcon sx={{ color: "white", pt: 1 }}/> SATURDAY </span>  <span className="time">8.00am - 1.00pm</span>
            </Typography>
            <Typography className="day">
              <span><AccessTimeIcon sx={{ color: "white", pt: 1 }}/> SUNDAY </span><span className="time">closed</span>
            </Typography>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
     <Box
      bgcolor= "#1A1A19"
      color= 'white'
      textAlign='center'
      padding='30px'
     >
     <Typography
          // variant="p"
          mt= "20px"
          sx={{
            "@media (max-width:600px)": {
              fontSize: "1rem",
              textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 
            },
          }}
        >
          All Rights Reserved &copy; SHEIKH KHALID GROUP OF SCHOOLS
        </Typography>
     </Box>
    </footer>
  );
};

export default Footer;