/* eslint-disable react/prop-types */
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@6.8.3/tinymce.min.js"
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table help wordcount",
              ],
              toolbar: `
                undo redo | blocks | 
                bold italic forecolor | 
                alignleft aligncenter alignright | 
                bullist numlist outdent indent | 
                image link | 
                removeformat | help
              `,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              images_upload_handler: async () => {
                // Add your Appwrite upload logic here
                return "https://dummyimage.com/600x400/000/fff"; // Temporary dummy image
              },
            }}
          />
        )}
      />
    </div>
  );
}
