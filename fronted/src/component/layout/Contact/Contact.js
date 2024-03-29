import React, { useEffect } from "react";
import "./contact.css";
import { Typography } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CallRoundedIcon from "@material-ui/icons/CallRounded";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { useState } from "react";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, contactUs } from "../../../actions/userAction";
import Loader from "../Loader/Loader";
import { CONTACT_RESET } from "../../../constants/userConstants";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, message } = useSelector((state) => state.contact);

  const submitHandler = (e) => {
    e.preventDefault();

    if(phone.length !== 10){
      alert.error("Phone number must be of 10 digits");
      return;
    }
    const data = {
      name,
      email,
      phone,
      msg,
    };
    console.log(data);

    dispatch(contactUs(data));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      setName("");
      setEmail("");
      setPhone("");
      setMsg("");
      dispatch({ type: CONTACT_RESET });
    }
  }, [dispatch, error, message, alert]);

  return (
    <>
      <MetaData title="Contact-us" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="contactHeading">Feel Free To Contact Us</h1>
          <div className="contactContainer">
            <div
              className="column bb"
              style={{ borderRight: "1px solid lightgrey" }}
            >
              <form onSubmit={submitHandler}>
                <div>
                  <div>
                    <label htmlFor="name">Name : </label>
                    <input
                      type="text"
                      required
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email : </label>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNo">Phone : </label>
                    <input
                      type="contact"
                      name="phoneNo"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </div>
                  <div>
                    <label htmlFor="message">Message :</label>
                    <textarea
                      name="message"
                      cols="40"
                      rows="7"
                      required
                      onChange={(e) => setMsg(e.target.value)}
                      value={msg}
                    />
                  </div>
                </div>
                <div className="btnDiv">
                  <input
                    type="submit"
                    value="Submit"
                    className="contactSubmitBtn"
                  />
                </div>
              </form>
            </div>
            <div className="column col_right">
              <div className="row ContactInfo">
                <div>
                  <MailOutlineIcon />
                  <span>Email : </span>
                  <Typography>pvh.house.test@gmail.com</Typography>
                </div>
                <div>
                  <CallRoundedIcon />
                  <span>Phone : </span>
                  <Typography>+91 9427712770 , 9825348048</Typography>
                </div>
                <div>
                  <LocationOnOutlinedIcon />
                  <span>Address :</span>
                  <Typography>
                    A/62 Jumani Bazar Sindhi Market <br /> Kalupur Ahmedabad
                    380002
                  </Typography>
                </div>
              </div>
              <div className="row contactLocation">
                {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d458.9806559627362!2d72.59831397662965!3d23.02945359502282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8430b8385883%3A0x377614128d05f30!2sJay%20Sindh%20Sales!5e0!3m2!1sen!2sin!4v1675591351297!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Gmap"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2476.30257423354!2d72.5965632676157!3d23.029673535512025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8533d3ce165b%3A0xd74f0346747921bd!2sPadmavati%20Handloom%20House!5e0!3m2!1sen!2sin!4v1682237786495!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowfullscreen={true}
                  title="Gmap"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Contact;
