import React from "react";
import About from "./pages/home/About";
import Header from "./pages/home/Header";
import Navigation from "./components/Navigation";
import Gallery from "./pages/home/Gallery";

export function Home() {
    return (
        <>
            <Navigation />
            <Header />
            <About />
            <Gallery />
            {/* <HeroSection /> */}
            {/* <Cards /> */}
            {/* <Footer /> */}
        </>
    )
}