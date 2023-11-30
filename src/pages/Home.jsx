import React, { useEffect } from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import BlogPostCard from "../components/BlogPostCard";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <HeroSection />
      <BlogPostCard />
    </Layout>
  );
}

export default Home;
