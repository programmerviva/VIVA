/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative rounded-lg border border-gray-300 shadow-sm">
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
                  undo redo | formatselect | 
                  bold italic forecolor backcolor | 
                  alignleft aligncenter alignright alignjustify | 
                  bullist numlist outdent indent | 
                  image link media | table | 
                  removeformat | help
                `,
                content_style: `
                  body {
                    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    padding: 1rem;
                  }
                  p { margin: 0 0 1rem 0; }
                  img { max-width: 100%; height: auto; }
                `,
                skin: "oxide",
                content_css: "default",
                browser_spellcheck: true,
                contextmenu: false,
                branding: false,
                resize: false,
                statusbar: true,
                min_height: 300,
                max_height: 800,
                autoresize_bottom_margin: 20,
                images_upload_handler: async (blobInfo) => {
                  // Add your Appwrite upload logic here
                  return "https://dummyimage.com/600x400/000/fff";
                },
                setup: (editor) => {
                  editor.on("init", () => {
                    editor.getContainer().style.borderRadius = "0.5rem";
                  });
                },
              }}
              className="prose max-w-none"
            />
          )}
        />
      </div>
    </div>
  );
}