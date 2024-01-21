import React from "react";
// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
// import "../styles/ContactsStyle.css";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import GoogleMap from "./GoogleMap";
import Form from "./Form";
// import Form  from "./contact/Form";
// import GoogleMap from "./contact/GoogleMap";

const page = () => {
  return (

    <Box>
    
      <Box sx={{ my: 5, ml: 10, "& h4": { fontWeight: "bold", mb: 2 } }}>
        <Typography variant="h4">Contact Us</Typography>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem odio
          beatae ducimus magni nobis culpa praesentium velit expedita quae,
          corrupti, pariatur inventore laboriosam consectetur modi impedit
          error, repudiandae obcaecati doloribus.
        </p>
      </Box>
      <Box
        sx={{
          m: 3,
          width: "600px",
          ml: 10,
          "@media (max-width:600px)": {
            width: "300px",
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="contact table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ bgcolor: "black", color: "white" }}
                  align="center"
                >
                  Contact Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <SupportAgentIcon sx={{ color: "red", pt: 1 }} /> 1800-00-0000
                  (tollfree)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MailIcon sx={{ color: "skyblue", pt: 1 }} /> sheikhkhalidgroupofschools@gmail.com
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <CallIcon sx={{ color: "green", pt: 1 }} /> 1234567890
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box style={{display:'flex', justifyContent:'space-around'}}>
      <Box style={{flexBasis:'60%'}}>
        <GoogleMap/>
      </Box>
      <Box sx={{flexBasis:'35%', border:'1px solid black', m:0}}>
        <Form />
      </Box>
      </Box> 

    </Box>       
        
  );
};

export default page;