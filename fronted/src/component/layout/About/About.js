import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import pvhlogo from "../../../images/pvhlogo.png";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";
const About = () => {
  const history = useNavigate();
  const visitHome = () => {
    history("/");
  };
  return (
    <div className="aboutSection">
      <MetaData title="About Us" />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{
                width: "10vmax",
                height: "10vmax",
                margin: "2vmax 0",
                cursor: "pointer",
              }}
              src={pvhlogo}
              alt="Logo"
              onClick={visitHome}
            />
            <Typography>Devang Bhavsar</Typography>
            <Button >Since - 1960</Button>
           
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            
             <span>
              Padmavati Handloom House is your one-stop destination for
              traditional handloom fabrics and clothing. We are committed to
              preserving India's rich cultural heritage by promoting handloom
              fabrics and empowering skilled artisans from across the country.
              Our collection features a range of clothing options like Bedsheets , Blankets , Sofa covers , curtains , Dari  and more,
              all made from high-quality handloom fabrics. We believe in
              providing our customers with not only beautiful and unique
              products but also a memorable shopping experience. Come and visit
              us to discover the beauty and elegance of traditional handloom
              fabrics!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
