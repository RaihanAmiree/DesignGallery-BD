import React from "react";
import CommentBox from "../Components/CommentBox";
import Title from "../Components/Title";

const Comment = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 select-none">
      {/* Section Title */}
      <Title title='What our Customers Say' subtitle='hytvi boyutgvbiu biuyfgv biuyt i '></Title>

      {/* Comment Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CommentBox 
          name="Mamun Rohan" 
          msg="MD Jewel is an outstanding graphic designer. His creativity helped my brand grow fast." 
          occupation="Business Owner" 
        />

        <CommentBox 
          name="Tanvir Hasan" 
          msg="Very professional and talented designer. Highly recommended for modern branding." 
          occupation="Startup Founder" 
        />

        <CommentBox 
          name="Nusrat Jahan" 
          msg="Amazing design quality and fast delivery. I will definitely work with him again." 
          occupation="Marketing Manager" 
        />
      </div>
    </div>
  );
};

export default Comment;
