import React from "react";
import "./about.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-text-container">
        <h1>inside pullup</h1>
        <h2>made my artists, for artists</h2>
        <br />
        <h3>for the artists</h3>
        <p>
          pullup aims to empower local artists to build their careers through
          connecting them with audience members and venues. Our platform
          supports a multidisiplinary range of artforms and welcomes artists of
          all demographics to profit off their passions.
        </p>
        {/* render info cards */}
        <h3>the tech behind it</h3>
        <p>
          event-driven machine learning services to analyze event data and help
          artists, musicians, creatives and more better organize their events,
          nurture a community, sell tickets, and build a following. We help
          event organizers better understand their event space, and provide
          many areas for both event organizers and attendees to rate the venue,
          understand whether the venue was under or over-utilized (ex: over
          capacity causing crowd control issues). We measure events, help
          organizers collect data and build valuable customer lists, and we use
          collected data associated with events to improve our ability to help
          users better plan new events, link up with likeminded people, and
          take advantage of all of the tools that pullUp provides the artist,
          event organizer, musician, performer, and more organize events,
          understand past events, and provide powerful analytics capabilities to
          artists live during the event both to understand and measure the
          performance, understand and measure the audience and audience
          reaction, mood, sentiment, gender distribution, age distribution,
          activity / energy level, and visualize this information in a way that
          makes sense for artists, performers, organizers, and more.
        </p>
      </div>
    </div>
  );
}

export default About;