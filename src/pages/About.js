import React from "react";
import { StyledImage, AboutContainer, AboutTitle, InfoContainer } from "./AboutStyles";
import Coding from "../assets/coding.svg";

const About = () => {
  return (
    <div>
      <AboutContainer>
        <StyledImage src={Coding} />
        <AboutTitle>
          <h2>
            About Software Developer <span>MEHMET TURKERİ</span>
          </h2>
        </AboutTitle>
        <InfoContainer>
          <h3>
            I'm <span>Mehmet</span>
          </h3>
          <h4>I'm currenctly learning Full-Stack Development Languages.</h4>
          <h4>
            I've already known JS, ReactJS, NodeJS, SQL, Python, HTML,
            CSS, BootStrap, SASS
          </h4>
          <h4>
            <a href="mailto:mehmet_turkeri@gmail.com">Send E-mail</a>:
            mehmet_turkeri@gmail.com
          </h4>
        </InfoContainer>
      </AboutContainer>
    </div>
  );
};

export default About;