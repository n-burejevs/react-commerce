import { useEffect } from 'react';
//taking same code from sidemenu, filters, sort and putting it one place
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