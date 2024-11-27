import React, { useState } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import axios from 'axios';
import '../stylesheets/Modal.css'

const ModalPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleSignIn = () => {
    setIsModalVisible(true);
    setSignIn(true);
  }

  const handleSignUp = () => {
    setIsModalVisible(true);
    setSignUp(true);
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneno: '',
    },
    onSubmit: values => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('phoneno', values.phoneno);

      console.log(formData);
      axios.post("http://localhost:8000/signUp", formData, {headers: {
        "Content-Type": "application/json"}})
        .then((response) => (console.log(response)))
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="display-flex">
        <button className="button" onClick={() => handleSignIn()}> SignIn </button>
        <button className="button" onClick={() => handleSignUp()}> SignUp </button>
      </div>
      <Modal title={signIn ? "Sign In" : "SignUp"}
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
          setSignIn(false);
          setSignUp(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
          setSignIn(false);
          setSignUp(false);
        }}
        width={350}
      >
        <form onSubmit={formik.handleSubmit} className="display-flex" style={{ flexDirection: 'column' }}>
          {signUp && (
            <div className="flex-column">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="input"
              />
            </div>
          )}

          <div className="flex-column">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="input"
            />
          </div>

          <div className="flex-column">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="input"
            />
          </div>
          {signUp && (
            <div className="flex-column">
              <label htmlFor="phoneno">Phone Number</label>
              <input
                id="phoneno"
                name="phoneno"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneno}
                className="input"
              />
            </div>
          )
          }

          <button className="submit-button" type="submit">Submit</button>
        </form>

      </Modal>
    </>
  )
}

export default ModalPage;