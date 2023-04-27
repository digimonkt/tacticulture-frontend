import React, { useState } from "react";
import Layout from "../layout";
import { LabeledInput } from "@/component/input";
import { SVG } from "@/assets/svg";

import styles from "../auth.module.css";
import { FilledButton } from "@/component/buttons";

function VerifyEmailComponent() {
  const [name, setName] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <Layout title="">
      <>
        <div>
          <h1>
            Check your email
            <br /> for a code
          </h1>
          <p>
            We’ve sent a 6 digit code to <b> Kris@kristopherray.com.</b> The
            code expires shortly so please enter it soon.
          </p>
          <div className={`${styles.checkIocn}`}>
            <LabeledInput placeholder="" className="" onChange={onChange} />
            {name ? <SVG.CheckIcon /> : ""}
          </div>

          <div className={`${styles.signupBtn}`}>
            <FilledButton>Continue</FilledButton>
          </div>
          <div className={`${styles.socialIcon}`}>
            <h3>
              <span>
                <SVG.GoogleIcon />
              </span>
              Open Gmail
            </h3>
            <h3>
              <span>
                <SVG.WindowIcon />
              </span>
              Open Outlook
            </h3>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default VerifyEmailComponent;
