/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Define status options
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const submit = async (data) => {
    try {
      setError("");
      setLoading(true);

      let postData = {
        title: data.title,
        content: data.content,
        status: data.status,
        featuredImage: post?.featuredImage || "",
      };

      if (data.image && data.image[0]) {
        try {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            postData.featuredImage = file.$id;

            // Delete old image if exists
            if (post?.featuredImage) {
              await appwriteService.deleteFile(post.featuredImage);
            }
          }
        } catch (error) {
          console.error("Image upload failed:", error);
          throw new Error("Image upload failed");
        }
      }

      let response;
      if (post?.$id) {
        // Check if we're editing an existing post
        response = await appwriteService.updatePost(post.$id, postData);
      } else {
        response = await appwriteService.createPost(postData);
      }

      if (response) {
        navigate(`/post/${response.$id}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to process post");
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
      {error && <div className="text-red-600 text-center">{error}</div>}
      <div className="w-full">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        {post && post.featuredImage && (
          <div className="w-full h-32 mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="w-full">
        <Select
          options={statusOptions}
          label="Status"
          className="mb-4"
          {...register("status")}
          value={watch("status")}
          onChange={(value) => setValue("status", value)}
        />
      </div>
      <Button
        type="submit"
        bgColor={post ? "bg-green-500" : undefined}
        className="w-full"
      >
        {loading ? "Processing..." : post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}
