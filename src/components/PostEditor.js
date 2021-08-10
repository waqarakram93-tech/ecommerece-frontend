import { Editor } from '@tinymce/tinymce-react';
import imageUploadHandler from '../utils/imageUploadHandler';

const PostEditor = ({ onChange, value }) => {
  const handleEditorChange = newValue => onChange(newValue);
  return (
    <Editor
      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image',
          'charmap print preview anchor help',
          'searchreplace visualblocks code',
          'insertdatetime media table paste wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic emoticons| alignleft aligncenter alignright alignjustify | \bullist numlist outdent indent | help',
        images_upload_handler: imageUploadHandler
      }}
      onEditorChange={handleEditorChange}
      value={value}
    />
  );
};

export default PostEditor;
