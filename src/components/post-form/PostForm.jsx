/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
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

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
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
    <form onSubmit={handleSubmit(submit)} className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Section */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <Input
              label="Title"
              placeholder="Enter post title"
              className="mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="post-url-slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <div className="space-y-2">
              <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="lg:w-80 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Featured Image
                </label>
                <div className="mt-1">
                  <Input
                    type="file"
                    className="w-full"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                  />
                </div>
              </div>

              {post && (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity opacity-0 hover:opacity-100">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-white text-sm">Change Image</span>
                    </div>
                  </div>
                </div>
              )}

              <Select
                options={["active", "inactive"]}
                label="Status"
                className="w-full"
                {...register("status", { required: true })}
              />

              <Button
                type="submit"
                bgColor={post ? "bg-green-500" : "bg-blue-600"}
                className="w-full py-2.5 text-white hover:bg-opacity-90 transition-colors duration-200"
              >
                {post ? "Update Post" : "Publish Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
