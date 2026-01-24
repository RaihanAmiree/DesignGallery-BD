import React from "react";
import CommentBox from "../Components/CommentBox";
import Title from "../Components/Title";

const Comment = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 select-none">
      <Title title='What our Customers Say' subtitle='Our customers are our most valuable assets. See how our customers’ experiences shape what we do'></Title>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CommentBox
          name="Mamun Rohan"
          msg="MD Jewel is an outstanding graphic designer. His creativity helped my brand grow fast."
          occupation="Business Owner"
        />

        <CommentBox
          name="Raihan Amiree"
          msg="Very professional and talented designer. Highly recommended for modern branding."
          occupation="Frontend Developer"
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
