import React from "react";
import Link from "next/link";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [userObj, setUserObj] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUserObj({
      ...userObj,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axiosInstance.post("/api/auth/login", userObj);
    if (res.data.status) {
      toast.success(res.data.message);

      if (res.data.data.token) {
        Cookies.set("token", res.data.data.token);
        router.push("/");
      }

      // Cookies.set('mess_token',res.data.data.token)
      // setTimeout(() => {
      //   router.push('/')
      // }, 2000);
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
                      <span className="d-none d-lg-block">NiceAdmin</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username & password to login
                        </p>
                      </div>

                      <form className="row g-3 needs-validation" novalidate>
                        <div className="col-12">
                          <label for="yourUsername" className="form-label">
                            Email
                          </label>
                          <div className="input-group has-validation">
                            {/* <span className="input-group-text" id="inputGroupPrepend">@</span> */}
                            <input
                              onChange={handleChange}
                              type="text"
                              name="email"
                              className="form-control"
                              id="email"
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter your email.
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
                              type="checkbox"
                              name="remember"
                              value="true"
                              id="rememberMe"
                            />
                            <label
                              className="form-check-label"
                              for="rememberMe"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            onClick={handleSubmit}
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Don't have account?{" "}
                            <Link href="/register">Create an account</Link>
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

export default Login;
