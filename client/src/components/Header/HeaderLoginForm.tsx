import React, { FormEvent, useState } from "react";
import { loginUserWithUsernameAndPassword } from "../../api/user.ts";
import { TokenEntity } from "../../models/entities.ts";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atomStore.ts";

type Props = {};

const HeaderLoginForm = ({}: Props) => {
  const [disableFields, setDisableFields] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const [token, setToken] = useAtom(tokenAtom)

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setDisableFields(true)
    loginUserWithUsernameAndPassword(e.target.username.value, e.target.password.value)
      .then((response: TokenEntity) => {
        setToken(response)
      })
      .catch((error: string) => {
        setError(error)
      })
      .finally(() => setDisableFields(false))
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor={"username"}>Username:</label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor={"password"}>Password:</label>
        <input type="password" id="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  )
    ;
};

export default HeaderLoginForm;
