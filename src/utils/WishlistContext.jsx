import { createContext, use, useEffect, useState } from "react";

export const WishlistContext = createContext();


const WishlistCon = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        const storeWishlist = JSON.parse(localStorage.getItem("wishlist"));
        if(storeWishlist){
            setWishlist(storeWishlist);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist])
    return (
        <WishlistContext.Provider value={{ wishlist, setWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistCon;