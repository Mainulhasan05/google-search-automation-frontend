import React, { useState } from "react";
import Link from "next/link";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [userObj, setUserObj] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    setUserObj({
      ...userObj,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userObj.phone.length !== 11) {
      toast.error("Phone number must be 11 digit");
      return;
    }
    setLoading(true);
    const res = await axios.post("/api/auth/register", userObj);
    if (res.data.status) {
      toast.success(res.data.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.error(res.data.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">MessManagement</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Create an Account
                        </h5>
                        <p className="text-center small">
                          Enter your personal details to create account
                        </p>
                      </div>

                      <form className="row g-3 needs-validation" novalidate>
                        <div className="col-12">
                          <label for="yourName" className="form-label">
                            Your Name
                          </label>
                          <input
                            onChange={handleChange}
                            value={userObj.name}
                            type="text"
                            name="name"
                            className="form-control"
                            id="yourName"
                            required
                          />
                          <div className="invalid-feedback">
                            Please, enter your name!
                          </div>
                        </div>

                        <div className="col-12">
                          <label for="yourEmail" className="form-label">
                            Your Email
                          </label>
                          <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            className="form-control"
                            id="yourEmail"
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a valid Email adddress!
                          </div>
                        </div>

                        <div className="col-12">
                          <label for="yourUsername" className="form-label">
                            Phone
                          </label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              +88
                            </span>
                            <input
                              type="text"
                              onChange={handleChange}
                              name="phone"
                              className="form-control"
                              id="yourPhone"
                              required
                            />
                            <div className="invalid-feedback">
                              Please choose a Phone.
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label for="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              name="terms"
                              type="checkbox"
                              value=""
                              id="acceptTerms"
                              required
                            />
                            <label
                              className="form-check-label"
                              for="acceptTerms"
                            >
                              I agree and accept the{" "}
                              <a href="#">terms and conditions</a>
                            </label>
                            <div className="invalid-feedback">
                              You must agree before submitting.
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            {loading ? "Loading..." : "Create Account"}
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account?{" "}
                            <Link href="/login">Log in</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Register;
