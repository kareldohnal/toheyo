import React from 'react';
import { userAtom } from "../../atomStore";
import HeaderLoginForm from "./HeaderLoginForm.tsx";
import { useAtomValue } from "jotai";

type Props = {

};

const Header = ({}: Props) => {
 const user = useAtomValue(userAtom)
 return (
  <div>
   {user
    ? <div>Avatar button</div>
    : <HeaderLoginForm/>
   }
  </div>
 );
};

export default Header;
