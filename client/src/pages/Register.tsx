import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import "../styles/Register.css";
import RegisterFormNextStep from "../components/RegisterFormNextStep";
import type { UserRegister } from "../types/userTypes";

export default function Register() {
  const [nextStep, setNextStep] = useState(false);
  const [userInfos, setUserInfos] = useState<UserRegister>({});

  return (
    <div className="register-container">
      <h1 className="register-title">PayeTacker</h1>
      {!nextStep ? (
        <RegisterForm setNextStep={setNextStep} setUserInfos={setUserInfos} />
      ) : (
        <RegisterFormNextStep userInfos={userInfos} />
      )}
    </div>
  );
}
