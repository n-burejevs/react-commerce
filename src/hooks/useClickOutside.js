import { useEffect } from 'react';
//taking same code from sidemenu, filters, sort and putting it one place
//allow user to close dropdown lists (sidemenu, filters, sort) by tapping eslewhere
export default function useClickOutside(ref, handler, setHandler) {
  useEffect(() => {
    function listener(event) {
        if(
           ref.current &&
           !ref.current.contains(event.target)
         ) {
             setHandler(false);
           }
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}