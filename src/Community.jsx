import React from 'react';
import './Community.css';

const Community = () => {
  return (
    <div className="community">
      <h1 className="community-title">Community - pullUP</h1>
      <p>
        Welcome to the pullUP Community! Our mission is to empower a
        multidisciplinary range of artists to grow independently through our
        growing community.
      </p>

      <h2 className="section-title">Features:</h2>
      <ol className="feature-list">
        <li>User Login/Logout: We have implemented a secure login feature for both artists and attendees. Sign up and start exploring our vibrant community!</li>
        <li>Profile Pages: Personalize your experience with different features for artists and attendees. Showcase your work, discover new talents, and connect with others who share your interests.
        </li>
        <li>Event Management: Artists can easily create, edit, and delete their event listings. Promote your performances and reach a wider audience!
        </li>
        <li>Real-Time Chat: Connect with fellow artists and attendees through our real-time chat feature. Share ideas, collaborate on projects, and build lasting relationships.
        </li>
        <li>Location-Based Event Discovery: Our integrated Maps API allows users to easily discover events near them, while our search filter lets you find events based on type, age restrictions, and more.
        </li>
        <li>Media Upload: Seamlessly upload and showcase your photos and videos. Our system integrates with Google Cloud services to ensure a smooth and secure experience.
        </li>
        <li>AI-powered Content Generation: Need help writing a press release or blog post? Our integration with ChatGPT can help generate content for you, making promotion easier than ever.
        </li>
        <li>Notifications and Social Features: Stay informed about new content from the users you follow and receive notifications for updates.
        </li>
        <li>Featured Artists: Pay for a featured spot on our platform and gain extra visibility for your work. We also spotlight exceptional artists on a regular basis.
        </li>
        <li>Monetization Opportunities: Explore various options for generating revenue, such as ticket resale, data sales, and merchandising.
        </li>

      </ol>

      <p>
        Join the pullUP community today and take your artistic journey to new
        heights!
      </p>
    </div>
  );
};

export default Community;


// import React from "react";

// function Community () {
//     return(
//         <div>
//             <h1>connect & collaborate</h1>
//             <h2>no one ever made it big all on their own</h2>
//             <h4>this is the place to be for artists of all disicplins to come together to connect, collaborate, and share your experiences and tips for success. Whether you're a painter, musician, writer, or any other type of artist, this community is for all of us. Here you can network with other artists, find collaborators for your next project, or simply share your knowledge and learn from others.</h4>
//             <h4>not an artist but more of an appreciator? Our community is inclusive and supportive, and we believe that by sharing our stories and experiences, we can all grow and succeed together. So join the conversation and become part of our thriving artist community!</h4>

//             {/* FeaturedBlogs "post-grad" we should discuss the types of text formats that  we'll have*/}
//             {/* BlogPosts */}
//             {/* BlogPost */}
//             {/* BlogSubmit */}
//             {/* Channels */}
//         </div>
//     )
// }

// export default Community;