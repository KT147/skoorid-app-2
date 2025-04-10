import { IonButton, IonInput, IonTitle } from "@ionic/react";
import React, { useState, useEffect } from "react";

const PasswordPrompt = ({
  onPasswordSubmit,
}: {
  onPasswordSubmit: () => void;
}) => {
  const [password, setPassword] = useState(""); 
  const [passwordEntered, setPasswordEntered] = useState(false);

  useEffect(() => {
    if (passwordEntered) {
      if (password === "asaspa") {
        localStorage.setItem("isLoggedIn", "true");
        onPasswordSubmit();
      } else {
        alert("Vale parool!")
      }
    }
  }, [passwordEntered, password, onPasswordSubmit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordEntered(true); 
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <IonTitle size="large">Äppi sisenemiseks sisesta parool</IonTitle>
      <form onSubmit={handleSubmit}>
        <IonInput
          className="center-input"
          type="text"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)} 
          label="Sisesta parool"
          labelPlacement="floating"
          fill="outline"
          required
        />
        <br />
        <IonButton type="submit">Sisesta</IonButton>
      </form>
    </div>
  );
};

export default PasswordPrompt;
