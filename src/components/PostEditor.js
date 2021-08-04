import { Editor } from '@tinymce/tinymce-react';

const PostEditor = ({ onChange, initialvalue }) => {
  const handleEditorChange = newValue => onChange(newValue);
  return (
    <Editor
      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image',
          'charmap print preview anchor help',
          'searchreplace visualblocks code',
          'insertdatetime media table paste wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic | alignleft aligncenter alignright | \bullist numlist outdent indent | help'
      }}
      onEditorChange={handleEditorChange}
      initialValue={initialvalue}
    />
  );
};

export default PostEditor;
